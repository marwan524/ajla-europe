# AJLA Europe website

Static site (HTML, CSS, JS). No build step.

## Pages
- `index.html` – main one-page site: Home, What We Supply, Who We Work With, Why AJLA Europe, How It Works, Contact (form)
- `products.html` – Products page (with "Back to site" link)
- `about.html` – About page and contact details (with "Back to site" link)
- `privacy.html` – privacy policy draft (EN/PL), must be reviewed by a lawyer

## Run
Open the whole folder in VS Code, install **Live Server**, right-click `index.html` > *Open with Live Server*.
Keep the folder structure intact (`css/` and `js/` next to the HTML files).

## Fill in the client details in ONE place: `js/site.js`
Legal name, address, phone, email, NIP, KRS, VAT EU, and the optional form endpoint.
They replace every `[PLACEHOLDER]` on all pages, switch on the header phone number, and set the tel/mailto links.
(Any `[...]` still visible after that was not filled in.)

## Other files
- `js/i18n.js` – English/Polish toggle; add `"English text": "Polish text"` to translate more
- `js/main.js` – mobile menu and enquiry form
- `og-image.png`, `favicon.svg`, `robots.txt`, `sitemap.xml`

## Before launch
- [ ] Fill `js/site.js` and complete `privacy.html` placeholders (provider names, retention period); legal review
- [ ] Replace the placeholder leaf (`<symbol id="leaf">` in each HTML file) and `favicon.svg` with the official logo
- [ ] Form delivery: set `email` (opens visitor's email app) or `formEndpoint` (e.g. Formspree) in `js/site.js`
- [ ] Add confirmed certifications in `about.html` (see the comment marked QUALITY PROOF)
- [ ] Native Polish review of `js/i18n.js`
- [ ] If the domain is not `www.ajlaeurope.com`, change it in the HTML files (canonical, og:url), `robots.txt`, `sitemap.xml`
- [ ] Cygre font: add `@font-face` in `css/style.css` if licensed (otherwise Poppins is used)

## Deploy
Netlify / Cloudflare Pages: drag and drop the folder. Vercel: run `vercel` in the folder. GitHub Pages: push and enable Pages.
Upload the whole folder, not just `index.html`.
