## claude-nyc-info — 2026-05-07

Working on: Trapables cannabis storefront — all pages built, mascot + accessibility + chatbot added

Last action: Added mascot to hero (index.html), accessibility widget (contrast/font/TTS), and flow-based chatbot assistant to all 8 pages via shared CSS/JS

Next step:
  1. **MARKUS ACTION REQUIRED — Mascot photo:**
     Save the skeleton mascot photo as:
     `Projects/websites/kaoz625.github.io/trapables/images/mascot.jpg`
     It will auto-appear in: hero section (right side, floating), chat widget avatar, all pages.
     The site already has a 💀 emoji fallback if the file is missing.

  2. **MARKUS ACTION REQUIRED — Venmo handle:**
     Replace `@Trapables` in `order.html` line ~175 with the real Venmo handle when confirmed.

  3. **MARKUS ACTION REQUIRED — Deploy to GitHub:**
     ```bash
     cd "Projects/websites/kaoz625.github.io"
     git add trapables/
     git commit -m "feat: Trapables PWA — full site with mascot, a11y widget, chatbot"
     git push
     ```
     Then: GitHub → repo Settings → Pages → custom domain: trapables.nyctailblazers.com

  4. **OPTIONAL — Generate mascot variants:**
     Can't auto-generate AI images. Options:
     - Use the real packaging photo as-is (already wired up)
     - Commission a digital artist to trace the skeleton for vector assets
     - Use Canva/Adobe Firefly to generate similar skeleton illustrations

Key files:
  - `trapables/index.html` — hero with mascot slot
  - `trapables/css/styles.css` — mascot + a11y + chatbot CSS (appended at end)
  - `trapables/js/main.js` — initMascot() + initA11y() + initChatbot() (appended at end)
  - `trapables/manifest.json` + `service-worker.js` — PWA support
  - `trapables/tailblazers.html` — agency about page

Site status: COMPLETE — all pages built, PWA-ready, widgets live
Blockers: Mascot photo file, Venmo handle, GitHub push (all need Markus)
