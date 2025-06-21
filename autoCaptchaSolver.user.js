// ==UserScript==
// @name         EWU Login Captcha Solver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically solve ewu login captcha and fill user id and password
// @author       SadmanAnik-11
// @match        https://portal.ewubd.edu
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function () {
        try {
            const firstNo = parseInt(document.getElementById("lblFirstNo").textContent.trim());
            const secondNo = parseInt(document.getElementById("lblSecondNo").textContent.trim());
            const answer = firstNo + secondNo;

            const captchaBox = document.getElementById("lblcaptchaAnswer");
            const username = document.getElementById("username");
            const password = document.getElementById("pass");
            if (captchaBox && username && password) {
                captchaBox.value = answer;
                username.value = "2025-1-60-"; // Student ID
                password.value = ""; // Password
            }
        } catch (e) {
            console.error("Captcha Solve error:", e);
        }
    });
})();
