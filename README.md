Jasmine Reporters
===

Jasmine Reporters is a collection of reporters for the [Jasmine](http://jasmine.github.io) BDD testing Framework.

:notebook: All reporters are built for [Jasmine](http://jasmine.github.io) 2.x.  
:notebook: All reporters are registered on the `window.jasmineReporters` object.  

HtmlTitleReporter
---

Report test results to the browser's title bar.

    //minimal
    var htmlTitleReporter = new jasmineReporters.HtmlTitleReporter();

    //verbose
    var htmlTitleReporter = new jasmineReporters.HtmlTitleReporter({
        title: true, //default: true - update the <title> tag with test results
        favicon: true //default: true - update the favicon with test results
    });

    jasmine.getEnv().addReporter(htmlTitleReporter);

[Live Example](https://rbwestmoreland.github.com/jasmine-reporters/releases/HtmlTitleReporter/1.0.0/HtmlTitleReporter.html) | [Download](./releases/HtmlTitleReporter/)  


AutoRefreshReporter
---

Automatically refresh the browser so that your tests are always running.
  
Refreshes only occur when the page is not the active page. It doesn't refresh the page when you are looking at it. That would be really annoying.

    //minimal
    var autoRefreshReporter = new jasmineReporters.AutoRefreshReporter();

    //verbose
    var autoRefreshReporter = new jasmineReporters.AutoRefreshReporter({
        timeout: 1000 //default: 5000 - the number of ms refresh, after all tests complete
    });

    jasmine.getEnv().addReporter(autoRefreshReporter);

[Live Example](https://rbwestmoreland.github.com/jasmine-reporters/releases/AutoRefreshReporter/1.0.0/AutoRefreshReporter.html) | [Download](./releases/AutoRefreshReporter/)  

Versioning
---

This project follows [Semantic Versioning](http://semver.org).

Given a version number `MAJOR.MINOR.PATCH`, we increment the:

* `MAJOR` version when we make incompatible API changes,
* `MINOR` version when we add functionality in a backwards-compatible manner, and
* `PATCH` version when we make backwards-compatible bug fixes.

License
---

Copyright (c) 2014 Bates Westmoreland. This software is licensed under the 
[MIT License](./LICENSE.txt).
