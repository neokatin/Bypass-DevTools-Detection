// ==UserScript==
// @name         Bypass DevTools Detection
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prevent websites from detecting DevTools (Inspect Element) is open
// @author       Serial Desegnation J
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Override debugger
    window.debugger = function() {};

    // Prevent debugger; from stopping execution
    const originalDebugger = Function.prototype.constructor;
    Function.prototype.constructor = new Proxy(originalDebugger, {
        apply(target, thisArg, args) {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('debugger')) {
                args[0] = args[0].replace(/debugger/g, '');
            }
            return Reflect.apply(target, thisArg, args);
        }
    });

    // Override console.log time traps
    const originalLog = console.log;
    console.log = function (...args) {
        for (const arg of args) {
            if (arg instanceof Image) return;
        }
        return originalLog.apply(console, args);
    };

    // Override window size detection
    Object.defineProperty(window, 'outerWidth', {
        get: () => window.innerWidth
    });
    Object.defineProperty(window, 'outerHeight', {
        get: () => window.innerHeight
    });

    // Disable key traps (F12, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', function (e) {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
            (e.ctrlKey && e.key.toUpperCase() === 'U')
        ) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }, true);

    // Prevent detection via image get traps (used in object inspection)
    const imageProto = Object.getPrototypeOf(new Image());
    if (imageProto) {
        Object.defineProperty(imageProto, 'id', {
            get: function () {
                return null;
            }
        });
    }

    // Prevent performance-based reload detection
    try {
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            Object.defineProperty(performance, 'getEntriesByType', {
                value: () => [{ type: "navigate" }]
            });
        }
    } catch (e) {}

    console.log('[Tampermonkey] DevTools detection blocked.');
})();
