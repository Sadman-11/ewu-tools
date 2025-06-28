// ==UserScript==
// @name         Show Hidden Faculty Info
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Unhide Faculty Info columns in class schedule table and in Offered Courses on EWU portal
// @match        https://portal.ewubd.edu/Home/OfferedCoursesStudent
// @match        https://portal.ewubd.edu/Home/ClassSchedule
// @author       Sadman-11
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const path = location.pathname;

    // ------------------------------------
    // ✅ FEATURE 1: Unhide Faculty Info (OfferedCoursesStudent)
    // ------------------------------------
    if (path === "/Home/OfferedCoursesStudent") {
        function waitForAngularAndStart() {
            const injector = angular.element(document.body).injector();
            if (!injector) return setTimeout(waitForAngularAndStart, 300);

            const $timeout = injector.get('$timeout');
            const $rootScope = injector.get('$rootScope');
            $rootScope.$applyAsync(() => {
                $timeout(() => {
                    replaceHeader();
                    injectShortNames();
                    observeTableChanges();
                }, 300);
            });
        }

        function replaceHeader() {
            const table = document.querySelector('#tblData');
            if (table?.rows?.length > 0) {
                const headerCell = table.rows[0].cells[4];
                if (headerCell && headerCell.innerText.toLowerCase().includes('dedicated')) {
                    headerCell.innerHTML = "<b>Faculty</b>";
                }
            }
        }

        function injectShortNames() {
            const rows = document.querySelectorAll('tr[ng-repeat]');
            rows.forEach(row => {
                const scope = angular.element(row).scope();
                if (scope?.c?.ShortName) {
                    row.cells[4].innerText = scope.c.ShortName;
                }
            });
        }

        function observeTableChanges() {
            const table = document.querySelector('#tblData tbody') || document.querySelector('#tblData');
            if (!table) return;

            const observer = new MutationObserver(() => {
                setTimeout(() => {
                    replaceHeader();
                    injectShortNames();
                }, 100);
            });
            observer.observe(table, {
                childList: true,
                subtree: true
            });
            console.log("👀 Watching OfferedCoursesStudent table for changes...");
        }
        waitForAngularAndStart();
    }

    // ------------------------------------
    // ✅ FEATURE 2: Unhide Faculty Info (ClassSchedule)
    // ------------------------------------
    if (path === "/Home/ClassSchedule") {
        function unhideFacultyInfo() {
            const hiddenElements = document.querySelectorAll('.table td.ng-hide, .table th.ng-hide');
            hiddenElements.forEach(el => el.classList.remove('ng-hide'));
        }
        unhideFacultyInfo();
        const observer = new MutationObserver(() => {
            unhideFacultyInfo();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        console.log("✅ Faculty info auto-unhider is active on ClassSchedule");
    }
})();
