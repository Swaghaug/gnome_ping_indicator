'use strict';

const { GObject, St, Gio, GLib } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;

var Me;
var pingIndicator;

var PingIndicator = GObject.registerClass(
class PingIndicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, 'Ping Indicator', false);
        this._hostToPing = '10.12.1.9';
        this._intervalSeconds = 300;
        this._icon = new St.Icon({
            gicon: Gio.icon_new_for_string(Me.dir.get_path() + '/icon-red.png'),
            style_class: 'system-status-icon'
        });
        this.add_child(this._icon);
        this._pingIntervalId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            this._intervalSeconds,
            () => {
                this._runPingAsync();
                return GLib.SOURCE_CONTINUE;
            }
        );
        this._runPingAsync();
    }

    _runPingAsync() {
        let subprocess = new Gio.Subprocess({
            argv: ['ping', '-c1', '-W2', this._hostToPing],
            flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
        });
        subprocess.init(null);
        subprocess.communicate_utf8_async(null, null, (proc, res) => {
            let [ok, stdout, stderr] = proc.communicate_utf8_finish(res);
            let success = proc.get_successful();
            if (success) {
                this._icon.gicon = Gio.icon_new_for_string(Me.dir.get_path() + '/icon-green.png');
            } else {
                this._icon.gicon = Gio.icon_new_for_string(Me.dir.get_path() + '/icon-red.png');
            }
        });
    }

    destroy() {
        if (this._pingIntervalId) {
            GLib.source_remove(this._pingIntervalId);
            this._pingIntervalId = null;
        }
        super.destroy();
    }
});

function init() {
    Me = ExtensionUtils.getCurrentExtension();
}

function enable() {
    pingIndicator = new PingIndicator();
    Main.panel.addToStatusArea('ping-indicator', pingIndicator, 1, 'right');
}

function disable() {
    if (pingIndicator) {
        pingIndicator.destroy();
        pingIndicator = null;
    }
}
