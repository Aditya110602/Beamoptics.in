# BeamOptics Off-Page SEO Playbook

This checklist covers the non-code work that drives real Google ranking after the technical SEO setup.

## 1) Google Search Console (required)

1. Open: https://search.google.com/search-console
2. Add property as `https://beamoptics.in` (URL prefix).
3. Choose verification method `HTML tag`.
4. Copy the token value (content field only).
5. Add token to `.env.local`:

```bash
GOOGLE_SITE_VERIFICATION=your_google_token_here
```

6. Restart app and deploy.
7. In Search Console, click `Verify`.
8. Submit sitemap URL:
   `https://beamoptics.in/sitemap.xml`

## 2) Bing Webmaster Tools (recommended)

1. Open: https://www.bing.com/webmasters
2. Add site and choose meta tag verification.
3. Add token to `.env.local`:

```bash
BING_SITE_VERIFICATION=your_bing_token_here
```

4. Redeploy and verify.

## 3) Backlink acquisition (authority growth)

Use the `/press` page as the canonical citation source:
`https://beamoptics.in/press`

Priority targets:
- Indian diagnostics and medtech directories
- Dairy and food safety associations
- Pharmaceutical QA and lab communities
- Startup ecosystem profiles (incubators, grant pages, partners)

Link requirement for all submissions:
- Link to your most relevant page, not only homepage
- Example deep links:
  - `https://beamoptics.in/services`
  - `https://beamoptics.in/industries/pharmaceutical`
  - `https://beamoptics.in/insights/ftir-milk-adulteration-testing-guide`

## 4) Ongoing content publishing (topical authority)

Publish on `/insights` every month:
- 2 deployment guides
- 1 industry case-study style article

Each article should include:
- One clear primary keyword in title and first paragraph
- Internal links to `/services` and one industry page
- Practical metrics/checklists (higher linkability)

## 5) Monthly operating routine

1. Publish 2-3 insights posts.
2. Add new URLs to outreach submissions.
3. Check Search Console:
   - Indexing > Pages
   - Performance > Queries
   - Core Web Vitals
4. Improve pages with high impressions but low CTR:
   - Rewrite title/meta
   - Improve first 120 words for intent match

## 6) KPI targets (first 90 days)

- Indexed pages: 100% of sitemap URLs
- Referring domains: +20 quality domains
- Non-brand impressions: +100% month-over-month trend
- Top pages CTR: above 2.5% baseline and rising
