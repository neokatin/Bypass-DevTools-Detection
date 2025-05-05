# Bypass DevTools Detection

Tampermonkey userscript that prevents websites from detecting when browser Developer Tools (DevTools) are open. This script is useful for developers, researchers, or curious users who want to inspect web pages without triggering anti-debugging mechanisms.

---

## ⚠️ Disclaimer

> **This script is intended for educational and ethical use only.**  
> Do not use this script to bypass protections on websites where such behavior violates terms of service or laws. Always respect the rights of content owners and follow legal and ethical guidelines.

---

## 🧩 Features

- Blocks `debugger` statements from executing
- Prevents interception of DevTools hotkeys (F12, Ctrl+Shift+I, etc.)
- Fakes window dimensions to fool screen size checks
- Overrides console logging traps
- Blocks image-based inspection detection
- Prevents detection via `performance.navigation` reload tracking

---

## 🚀 Installation

1. **Install Tampermonkey** (if you haven't already):
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/djjkfojkkfjpjjhchjlgcndkdnedjklp)

2. **Install the script** via Tampermonkey:
   - Copy the script from `bypass-devtools-detection.user.js`
   - Paste it into a new Tampermonkey script tab
   - Save and enable

---

## 📜 Script Metadata

```javascript
// @name         Bypass DevTools Detection
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prevent websites from detecting DevTools (Inspect Element) is open
// @author       Serial Desegnation J
// @match        *://*/*
// @grant        none
