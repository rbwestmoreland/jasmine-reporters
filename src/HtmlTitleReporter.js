/*jslint browser: true */
(function () {
    'use strict';

    if (!window) {
        return;
    }

    var settings, state, utils, title, favicon;

    settings = {
        title: true,
        favicon: true,
        apply: function (options) {
            if (options) {
                settings.title = options.title === true;
                settings.favicon = options.favicon === true;
            }
        }
    };

    state = {
        finished: false,
        specs: {
            total: 0,
            passed: 0,
            failed: 0
        }
    };

    utils = {
        debounce: function (func, wait) {
            var timeout;
            return function () {
                var context = this, args = arguments,
                    later = function () {
                        timeout = null;
                        func.apply(context, args);
                    };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    title = {
        update: function () {
            var head, titles, titleEl;

            //insert <title>, if none
            titles = window.document.getElementsByTagName('title');
            if (titles.length === 0) {
                head = window.document.getElementsByTagName('head')[0];
                head.appendChild(window.document.createElement('title'));
            }

            //find <title> tag
            titleEl = window.document.getElementsByTagName('title')[0];

            //set text of <title> tag
            titleEl.innerText = state.specs.total + ' specs, ' + state.specs.failed + ' failure';
        }
    };

    favicon = {
        removeAll: function () {
            //find all <link> tags
            var i,
                links = window.document.getElementsByTagName('link');

            //remove each <link rel="icon"> tag
            for (i = 0; i < links.length; i += 1) {
                if (links[i].rel && links[i].rel.match('icon')) {
                    links[i].parentNode.removeChild(links[i]);
                }
            }
        },
        add: function () {
            var text = state.specs.failed > 0 ? state.specs.failed : state.specs.total,
                color = state.finished === false ? '#bababa' : state.specs.failed > 0 ? '#b03911' : '#a6b779',
                font = text > 99 ? '17px sans-serif' : '22px sans-serif',
                x = text > 99 ? 1 : text > 9 ? 4 : 10,
                y = text > 99 ? 22 : 24,
                canvas,
                ctx,
                link;

            //favicon
            canvas = window.document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;

            //ensure browser supports <canvas> tag
            if (!canvas.getContext) {
                return;
            }

            ctx = canvas.getContext('2d');

            //favicon - background
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(16, 16, 16, 0, 2 * Math.PI);
            ctx.fill();

            //favicon - text
            ctx.font = font;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x, y);

            //create <link> tag
            link = document.createElement('link');
            link.type = 'image/png';
            link.rel = 'icon';
            link.href = canvas.toDataURL("image/png");

            //insert <link> tag into <head>
            window.document.getElementsByTagName('head')[0].appendChild(link);
        },
        update: function () {
            favicon.removeAll();
            favicon.add();
        }
    };

    function update() {
        if (settings.title) {
            title.update();
        }
        if (settings.favicon) {
            favicon.update();
        }
    }

    window.jasmineReporters = window.jasmineReporters || {};
    window.jasmineReporters.HtmlTitleReporter = function (options) {
        settings.apply(options);
        update = utils.debounce(update, 200);
        return {
            jasmineStarted: function () {
                state.finished = false;
                update();
            },
            jasmineDone: function () {
                state.finished = true;
                update();
            },
            specStarted: function () {
                state.specs.total += 1;
                update();
            },
            specDone: function (result) {
                if (result.status === 'passed') {
                    state.specs.passed += 1;
                }
                if (result.status === 'failed') {
                    state.specs.failed += 1;
                }
                update();
            }
        };
    };

}());