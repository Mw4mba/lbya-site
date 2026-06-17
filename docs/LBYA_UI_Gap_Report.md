# LBYA Website UI and Information-Gap Report

**Path 2 deliverable. Reviewer stance: information architect and UI lead.**
**Goal:** evaluate the current project structure, surface the information gaps the product-led pivot exposes, and plan a concrete way to fill each one using existing patterns wherever possible.
**Status:** evaluation only. No code changed. Filenames are relative to the repo root.

---

## 1. Information-architecture gap table

Current state (verified in the codebase) versus the target from brief §2, §12, and §14.

| Area | Current | Target (brief) | Gap |
| --- | --- | --- | --- |
| Top nav (`src/app/components/Navbar.tsx`, `menuItems`) | Solutions, About, Insights, Careers, Contact, Privacy | Products, Services, Industries, Insights, About, Contact | No Products. No Services index. "Solutions" label competes with the new model. Order wrong. |
| Products | None | `/products` + MCT + NBC pages | Entire product surface missing. This is the core of the pivot. |
| Services | `/services/[slug]` only (no index); slugs are the old engineering services | `/services` index with four advisory categories | No index page; categories differ; framing is "primary offer" not "support". |
| Industries | None | Construction/BIM, Transport/Logistics, African Market, Digital Transformation | Missing. Lower priority per brief (not in §15 High). |
| Footer (`src/app/components/Footer.tsx`) | Shortcuts, Our Solutions (old services), Contact, Logo | Products, Services (new), Company, Calls to action | No Products column; service links outdated; no CTA column. |
| Homepage (`src/app/page.tsx`) | Hero → Services → Insights → Projects → CTA | Hero → Problem → Answer → Products → Why → Services → Insights → Final CTA | No problem/answer framing; no product cards; section order and message are service-led. |
| Contact (`src/app/contact/page.tsx`) | Name/Email/Company/Message | Add 8 inquiry types | No inquiry-type selector. |
| About (`src/app/about/page.tsx`) | Sustainability story | Product-led story | Copy and section order off-strategy. |
| Insights categories (`src/app/insights/page.tsx`) | Climate, Innovation, Technology, Sustainability | BIM Control, African Logistics, Digital Control Platforms, Product Updates, Founder Notes | Categories do not match the new direction. |

---

## 2. Routing plan

All under `src/app/` (App Router). New routes:

| Route | File | Source content |
| --- | --- | --- |
| `/products` | `products/page.tsx` | Products overview; two product cards linking to detail pages (brief §3 cards, §14). |
| `/products/malaika-control-tower` | `products/malaika-control-tower/page.tsx` | MCT page (brief §4–§7). |
| `/products/nayeli-bim-control` | `products/nayeli-bim-control/page.tsx` | NBC page (brief §8). |
| `/services` | `services/page.tsx` | Services index, four advisory categories (brief §9). |

Deferred (brief "Later", explicitly out of scope for Stage B): `/security` (trust page) and `/partners` (partner program). Noted so they are not forgotten, not built now.

**Decision on the old surface.** Per the approved full-pivot decision:
- `/solutions` is retired from navigation. Its sustainable-architecture/structural/BIM/IT content is repositioned: BIM and structural fold into the new Services categories; the rest is dropped from the primary IA. Keep the route returning content (or redirect to `/services`) rather than 404 to avoid breaking existing inbound links.
- `/services/[slug]` (old engineering slugs) is superseded by the `/services` index. Keep the dynamic route working during transition; retarget its data to the four new categories or redirect to `/services`. Final disposition is a Stage B implementation choice, flagged here so links and SEO are handled deliberately, not abruptly deleted.

---

## 3. Missing UI components

None of these exist today. The design system (Tailwind v4 tokens in `src/app/globals.css`, GSAP ScrollTrigger entrance pattern used across `components/*Section.tsx`) supports all of them without refactoring.

| Component | Purpose | Build approach |
| --- | --- | --- |
| `ProductCard` | MCT/NBC cards on home and `/products` | Extend the card pattern in `src/app/components/InsightsSection.tsx` (image, badge, title, excerpt, link). |
| `PackageTierCard` | The four MCT tiers (Basic, Professional, Premium, Enterprise) | New, built on the same base card (`bg-white p-8 rounded-sm shadow-lg`), with a feature `<ul>` and a single CTA. No price slot. |
| `FeatureMatrix` | The §7 comparison table | New responsive table: `overflow-x-auto` wrapper, sticky first column, cards-first on mobile per the §7 developer note. |
| `ProblemAnswer` (section) | Homepage problem → answer, and MCT problems table | Reuse the alternating two-column pattern from `src/app/solutions/page.tsx`. |
| `ModuleList` (section) | MCT modules (§5) | Reuse the `ITServicesSection.tsx` three-column card/grid pattern. |
| `ProductHero` | MCT/NBC and `/products` heroes | Reuse the solutions-page hero (two-column headline + tagline) or `components/HeroSection.tsx` for the home hero. |

Shared conventions to follow so new components match: brand tokens (`--forest-green #2E7D32`, `--charcoal #37474F`, `--earth-beige #F5F5DC`, `--sage #A5D6A7`), the `max-w-7xl mx-auto px-6 lg:px-12` container, `py-24` section rhythm, `.btn-slide-fill` for primary CTAs, and the `gsap.context` + ScrollTrigger entrance pattern.

---

## 4. Information gaps the pivot exposes, and how to fill them

These are the gaps that only become visible once you try to tell the product-led story with the current structure. Each maps to a fill plan.

1. **No place to explain what a product *is and is not*.** The brief's "What MCT is not" (§4) is a trust asset with nowhere to live. **Fill:** a dedicated two-column "Is / Is not" block on the MCT page, built from the `ProblemAnswer` pattern.
2. **No package comprehension surface.** A buyer cannot self-qualify without seeing tiers. **Fill:** `PackageTierCard` row plus `FeatureMatrix`, cards-first on mobile.
3. **No verification/trust story.** MCT's differentiator is evidence-based verification, but there is no UI for it. **Fill:** a "verification and evidence" callout on the MCT page (the truck-pack trust line from the copy deck) and a deferred `/security` page noted for enterprise sales.
4. **No product-vs-service distinction.** Today everything is a "service". **Fill:** the Products-first nav and homepage product cards establish products as primary; the `/services` index reframes services as support, with a lead-in line that says so.
5. **Contact cannot route intent.** A pilot-partner enquiry and a job enquiry land in the same free-text box. **Fill:** the eight-option inquiry-type `<select>` (see §6).
6. **Insights cannot speak to the new audience.** Categories are climate/sustainability. **Fill:** retag categories to BIM Control, African Logistics, Digital Control Platforms, Product Updates, Founder Notes. Content migration is incremental; the category taxonomy changes first.
7. **Industries has no home.** The brief lists four industries but they appear nowhere. **Fill:** lower priority. Either a light `/industries` page or industry tags on product pages. Recommend deferring to after the High-priority §15 items.

---

## 5. Data-model proposal

Drive product and package content from typed data files, mirroring the existing `servicesData` object in `src/app/services/[slug]/page.tsx` (a record keyed by slug, each value an object with title, hero, sections, key points). This keeps copy out of JSX and ready for translation.

Proposed shape (illustrative, not final):

- `src/app/products/productData.ts` — record keyed by product slug (`malaika-control-tower`, `nayeli-bim-control`) with: title, tagline, hero, `isList` / `isNotList`, audiences, problems (array of `{problem, response}`), modules (array of `{name, explanation}`).
- `src/app/products/mctPackages.ts` — array of four tiers, each `{ name, bestFor, positioning, features: string[], cta: string }`, plus a matrix definition `{ feature, basic, professional, premium, enterprise }[]`.

English-first wiring: the short, reused strings (nav, hero, card copy, footer) go into the `Translations` interface and `EN` record in `src/app/i18n/translations.ts`. Because that file is typed `Record<Language, Translations>`, the new keys must also exist in `FR` and `SV`; populate those with the EN text as clearly-marked placeholders for Phase 3. The longer product/package bodies live in the data files above (not yet localised; Phase 3 decides whether to localise the data layer or move it into the message catalogue).

---

## 6. Contact form gap (detail)

Current form in `src/app/contact/page.tsx` is uncontrolled with four fields and no submit handler. Minimal change for Stage B:
- Add an **Inquiry type** `<select>` with the eight options from the copy deck §6.8, placed above Message.
- Keep Name, Email, Company, Message.
- Submission wiring (endpoint/email) is not specified in the brief; flag as a follow-up decision (static form, API route, or third-party such as Formspree). Do not invent a backend silently.

---

## 7. Build order recommendation (maps to brief §15 priorities)

High priority first, matching the brief's own checklist:

1. Nav reorder + add Products/Services (`Navbar.tsx`). Products before Services.
2. `ProductCard`, `ProductHero`, and the `/products` overview.
3. MCT page (hero, is/is-not, who, problems, modules, packages, matrix, CTAs, no prices) with `PackageTierCard` and `FeatureMatrix`.
4. NBC page.
5. Footer rebuild (`Footer.tsx`): Products, Services (new), Company, CTAs.
6. Homepage reorder and new sections (`page.tsx` and section components).

Medium:
7. `/services` index and services repositioning.
8. Contact inquiry-type selector.
9. About copy and section order.
10. Insights category taxonomy.

Later (deferred): Industries page, `/security` trust page, `/partners` program page.

---

## 8. Risks and watch-items

- **Link and SEO continuity.** Retiring `/solutions` and old `/services/[slug]` must use redirects, not deletions, to protect existing inbound links and search rankings.
- **i18n type pressure.** Adding keys to a `Record<Language, Translations>` forces all three locales to compile. English-first placeholders are required to keep the build green until Phase 3.
- **No price leakage.** `PackageTierCard` must have no price prop or slot, so a price can never be added by accident.
- **Mobile matrix.** The §7 table must collapse to cards-first on mobile, or it becomes an unreadable horizontal scroll.
- **Form backend undecided.** The contact selector ships, but where submissions go is an open decision to confirm with the owner.
