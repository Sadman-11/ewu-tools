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
            if (!table || table.rows.length === 0) return;

            const headerRow = table.rows[0];

            // Changing Table Headers
            if (headerRow.cells[2]) {
                headerRow.cells[2].innerHTML = "<b>Faculty</b>";
            }

            if (headerRow.cells[3]) {
                headerRow.cells[3].innerHTML = "<b>Capacity</b>";
            }

            if (headerRow.cells[4]?.innerText.toLowerCase().includes('dedicated')) {
                headerRow.cells[4].innerHTML = "<b>Timing</b>";
            }

            if (headerRow.cells[5]) {
                headerRow.cells[5].innerHTML = "<b>Room No</b>";
            }
        }

        function injectShortNames() {
            const rows = document.querySelectorAll('tr[ng-repeat]');
            rows.forEach(row => {
                const scope = angular.element(row).scope();
                if (scope?.c) {
                    row.cells[2].innerText = scope.c.ShortName || "";
                    row.cells[3].innerText = scope.c.SeatTaken + "/" + scope.c.SeatCapacity || ""; // Seat info
                    row.cells[4].innerText = scope.c.TimeSlotName || "";
                    row.cells[5].innerText = scope.c.RoomCode || "";
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
