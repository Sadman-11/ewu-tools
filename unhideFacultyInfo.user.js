// ==UserScript==
// @name         Show Hidden Faculty Info
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Unhide Faculty Info columns in class schedule table on EWU portal
// @match        https://portal.ewubd.edu/Home/ClassSchedule
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function unhideFacultyInfo() {
        const hiddenElements = document.querySelectorAll('.table td.ng-hide, .table th.ng-hide');
        hiddenElements.forEach(el => el.classList.remove('ng-hide'));
    }
    unhideFacultyInfo();
    const observer = new MutationObserver(() => {
        unhideFacultyInfo();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
