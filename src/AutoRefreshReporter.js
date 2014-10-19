/*jslint browser: true */
(function () {
    'use strict';

    if (!window) {
        return;
    }

    var settings = {
        timeout: 5000,
        apply: function (options) {
            if (options) {
                if (Number.isInteger(options.timeout) && options.timeout > 0) {
                    settings.timeout = options.timeout;
                }
            }
        }
    };

    function isHidden() {
        return window.document.hidden === true;
    }

    function refresh() {
        window.document.location.reload();
    }

    function refreshWhileHidden() {
        setInterval(function () {
            if (isHidden()) {
                refresh();
            }
        }, settings.timeout);
    }

    window.jasmineReporters = window.jasmineReporters || {};
    window.jasmineReporters.AutoRefreshReporter = function (options) {
        settings.apply(options);
        return {
            jasmineDone: function () {
                refreshWhileHidden();
            }
        };
    };

}());