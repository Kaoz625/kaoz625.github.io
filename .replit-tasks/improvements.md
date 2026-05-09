# Replit Agent Task: kaoz625.github.io

## Goal
Upgrade the existing portfolio hub (already has a dark theme and client site grid) into a polished, professional design portfolio that showcases all client sites with real screenshots, adds a personal brand/design portfolio section, and positions NYC Tailblazers as a serious web agency.

## Tasks
1. Audit the existing index.html — it already has a client site grid with cards; identify what's working and what needs upgrading (screenshot placeholders, missing sites, layout issues)
2. **Add real screenshot images**: for each client site card (Titan Renovations, C Painting Services, Green Lantern Ink, Royal Kims, AFU Social Club, Gentleman Brand, Luxe & Co Hair, Peak Pro HVAC, Clarity Coaching Pro), generate or link a screenshot. Use a screenshot service URL format: `https://api.screenshotone.com/take?url={site_url}&viewport_width=1280&viewport_height=800` as a placeholder `<img>` src (or use `https://shot.screenshotapi.net/screenshot?url={url}&width=1280&height=800` — free tier). Update all card images.
3. **Design Portfolio section**: below the client grid, add a "Design Work" section showcasing 4–6 individual UI components or design decisions (e.g., "Titan Renovations — before/after nav redesign", "AFU Social Club — event card system") with a split comparison or single mockup image + 2-sentence explanation
4. **Agency "About" section**: short paragraph about NYC Tailblazers ("Building digital presence for NYC small businesses"), 3 differentiators (Speed, Local Knowledge, Affordable), and a "Work With Us" CTA button (mailto:admin@nyctailblazers.com)
5. **Filter enhancement**: the existing filter buttons (All / Client Sites / Apps / AI Tools) work — ensure all new entries have correct `cat` values and that the filter JS correctly hides/shows them; add a new "Design" category for the design portfolio items
6. **Stats bar**: add a banner row with animated counters: "12+ Client Sites", "5 NYC Boroughs", "100% On-Time Delivery" — use IntersectionObserver to trigger count-up animation when visible
7. **Footer**: add NYC Tailblazers branding, GitHub link (github.com/Kaoz625), email, and copyright 2026
8. **Performance**: lazy-load all card images, ensure the Cloudflare Worker (cloudflare-worker.js + wrangler.toml already present) is documented in README for any dynamic features
9. **Mobile**: ensure the card grid is 1-column on mobile, 2-column on tablet, 3-column on desktop; filter buttons wrap correctly on small screens
10. Update the `<title>` to "NYC Tailblazers | Web Design Portfolio — NYC Small Business Sites"

## Tech Stack
- Vanilla HTML5 / CSS3 / JavaScript (existing stack — keep it, no framework needed)
- Cloudflare Worker (existing wrangler.toml — document its purpose in README)
- Screenshot API for card thumbnails
- IntersectionObserver for counter animation

## Deploy Target
GitHub Pages (this IS the github.io repo — push to main, it auto-deploys). Note: this is the one exception to the Cloudflare Pages rule since it's a GitHub Pages portfolio domain.

## Done When
- [ ] All existing client site cards have screenshot images (not blank boxes)
- [ ] Design Portfolio section has 4+ items with images and descriptions
- [ ] Agency About section with "Work With Us" CTA present
- [ ] Animated stats counter triggers on scroll
- [ ] Filter system includes "Design" category and works for all items
- [ ] Footer has GitHub link, email, copyright
- [ ] Mobile layout is clean at 375px (1-column grid, wrapping filter buttons)
- [ ] Page title updated to reflect agency positioning
