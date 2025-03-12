# Ping Indicator

A GNOME Shell extension that periodically pings a specified IP/host and updates an icon in the top bar to reflect connectivity status. A green icon indicates a successful ping; red indicates failure.

## Description

- **Asynchronous ping checks** using `Gio.Subprocess` to avoid blocking GNOME Shell.
- **Configurable** ping interval (`_intervalSeconds`) and host (`_hostToPing`).
- By default, this pings `10.12.1.9` every 5 minutes. Icons switch between `icon-green.png` and `icon-red.png`.

**File Structure:**
pingindicator@myextension 
├── extension.js
├── metadata.json 
├── icon-green.png 
└── icon-red.png

## Installation

1. **Clone or Download** this repository into your local GNOME Shell Extensions directory. Typically: `~/.local/share/gnome-shell/extensions/`.
Ensure the folder name matches the extension UUID in `metadata.json`. For example: `pingindicator@myextension mv pingindicator@myextension ~/.local/share/gnome-shell/extensions/`
If you already have the files, confirm they are in: `~/.local/share/gnome-shell/extensions/pingindicator@myextension`

2. **Enable the Extension** by running: `gnome-extensions enable pingindicator@myextension`

If you see an error or the extension doesn’t appear, try restarting GNOME Shell or logging out/in, then run the enable command again.

3. **Restart GNOME Shell** if needed:
- On **X11**: Press `Alt + F2`, type `r`, then press Enter.
- On **Wayland**: Log out and log back in.

You should now see a green or red circle icon in the top bar. The color will change based on the ping result.





