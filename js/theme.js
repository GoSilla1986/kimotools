/* =============================================================
   KImotools — Theme Toggle
   Order of theme resolution:
   1. localStorage('theme') if set ('light' | 'dark')
   2. prefers-color-scheme media query
   3. fallback: 'light'

   The initial resolution happens in an inline <script> in <head>
   to avoid FOUC. This file only handles the toggle interaction
   and live system-preference changes.
   ============================================================= */
(function () {
    'use strict';

    var STORAGE_KEY = 'theme';
    var root = document.documentElement;

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            /* private mode / disabled storage — ignore */
        }
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
    }

    function toggleTheme() {
        var current = root.dataset.theme === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        setStoredTheme(next);
    }

    function init() {
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                toggleTheme();
            });
        }

        // Re-apply on system preference change *only* if the user hasn't
        // chosen explicitly — i.e. nothing is in localStorage.
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            var listener = function (e) {
                if (!getStoredTheme()) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            };
            if (mq.addEventListener) mq.addEventListener('change', listener);
            else if (mq.addListener) mq.addListener(listener);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
