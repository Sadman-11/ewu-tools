# EWU Portal Userscripts

A collection of small, single‑purpose userscripts for enhancing your day‑to‑day experience on East West University’s web portal ([https://portal.ewubd.edu](https://portal.ewubd.edu)). The scripts are designed for use with **[Tampermonkey](https://www.tampermonkey.net/)** (or any compatible userscript manager) in Chrome, Firefox, Edge, or Chromium‑based browsers.

> **Disclaimer**
> These scripts are provided for **educational purposes only**.
> Use them at your own risk. East West University may prohibit or penalise the use of automation on its systems, and the author accepts **no responsibility** for any policy violations, account lock‑outs, or data loss.

---

## At a glance

| Script                            | File                         | What it does                                                                                                                                     |
| --------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Unhide Faculty Info**           | `unhideFacultyInfo.user.js`     | Reveals hidden faculty profile details (e‑mail, Faculty Name, initial, ) that the portal conceals with CSS or conditional HTML. |
| **Auto Login (+ Captcha Solver)** | `autoCaptchaSolver.user.js` | Fills in your student credentials and automatically solves the arithmetic captcha, allowing one‑click sign‑in.          |

---

## 1  Unhide Faculty Info

\### How it works

The EWU portal often hides portions of a faculty profile behind CSS classes such as `d‑none` or `ng-hide`. This script:

1. Waits for the page to finish loading.
2. Locates "hidden" elements inside any element with the CSS selector `.table td.ng-hide, .table th.ng-hide`.
3. Removes the hiding attributes (`ng-hide`).

No requests are sent to third‑party servers; everything runs locally in your browser.

\### Usage

* **Install** the script (see *Installation* below).
* Navigate to My Class Schedule page.
* Hidden contact info, Faculty Name, Initial should now appear automatically.

---

## 2  Auto Login (+ Captcha Solver)

\### What problem does it solve?
EWU’s login form shows two random single‑digit numbers (e.g. **3** + **7**) and asks you to type the sum. Typing this every time—especially on a slow connection—is tedious. This script handles the arithmetic for you **and** pre‑fills your student ID and password.

\### How it works (code walkthrough)

```javascript
const firstNo  = parseInt(document.getElementById("lblFirstNo").textContent.trim());
const secondNo = parseInt(document.getElementById("lblSecondNo").textContent.trim());
const answer   = firstNo + secondNo;

// Insert the answer & optionally your credentials
captchaBox.value = answer;
username.value  = "2025-1-60-"; // <- change this
password.value  = "";           // <- change this
```

Everything executes **once**, right after the page finishes loading (`window.addEventListener('load', …)`).

\### Setup instructions

1. **Edit your credentials** – open the script in a text editor and replace:

   ```javascript
   username.value = "2025-1-60-";
   password.value = "YOUR_PASSWORD_HERE";
   ```
2. **Save** the file.
3. **Install** it (see next section).

> **Security note:** Your credentials are stored locally in the script.
> They are **never** transmitted anywhere except the EWU login form, but anyone with access to your browser profile could read them. Consider this before use on a shared computer.

---

## Installation (both scripts)

1. **Install Tampermonkey**

   * Chrome/Edge: [https://chrome.google.com/webstore/detail/tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey)
   * Firefox: [https://addons.mozilla.org/firefox/addon/tampermonkey/](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. **Add the script**

   * Click the Tampermonkey icon → *Create a new script* → paste the code, or
   * Drag‑and‑drop the `.user.js` file into your browser, or
   * Click the raw file on GitHub → **Install** when Tampermonkey prompts you.
3. **Enable** the script(s) if they are not already enabled.

\### Script priority
If you use *both* scripts together, Tampermonkey’s default order is usually fine. The Auto Login script runs only on the login page `/portal.ewubd.edu`, while Unhide Faculty Info targets profile pages, so there is no conflict.

---

## Frequently asked questions

| Question                                             | Answer                                                                                                                                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Will this get me banned?**                         | Unknown. Many students use helper extensions without issue, but the university could change its policy at any time.                             |
| **The captcha stopped solving after a site update.** | Check the element IDs (`lblFirstNo`, `lblSecondNo`, `lblcaptchaAnswer`). If they changed, update the selectors in the script.                   |
| **Nothing happens on the faculty page.**             | Press **F12** → *Console* to see if any errors are printed. The most common cause is that the site switched to a new CSS class to hide details. |
| **Can I use this on mobile?**                        | Yes, with a browser that supports userscripts (e.g. Kiwi Browser + Tampermonkey on Android).                                                    |

---

## Contributing

Pull requests are welcome! If EWU rolls out changes that break either script, please

1. Fork the repo.
2. Fix the selectors / logic.
3. Submit a PR with a clear description of what changed.

---

## Licence

MIT License — see [`LICENSE`](LICENSE) for details.

---

Happy scripting — and may your portal trips be just a little bit shorter!
