# LBYA i18n Evaluation and URL-Locale Architecture

**Path 3 deliverable.**
**Goal:** assess how comprehensive the current internationalisation is, surface its failure points, and design a URL-based locale system (`/en`, `/sv`, `/fr`, `/de`) that switches language immediately from the address bar, without depending on a component-level switcher.
**Status:** evaluation and recommendation. No i18n code changed in this document.

---

## 1. Current architecture (verified)

- **Mechanism:** a custom React context, `src/app/i18n/I18nContext.tsx`, holding `language` state and a `t` object. No third-party i18n library.
- **Storage:** the chosen language is read from and written to `localStorage` only. Default is `EN`.
- **Switcher:** component-level, in `src/app/components/Navbar.tsx` (EN / FR / SV buttons plus a dropdown). Switching calls `setLanguage`, which updates React state and `localStorage`.
- **Strings:** one monolithic `src/app/i18n/translations.ts`, typed `Record<Language, Translations>`, with `EN`, `FR`, `SV`.
- **Routing:** no locale in the URL. No `middleware.ts`. No `app/[locale]/` segment. `next.config.ts` has no `i18n` block. Every language renders at the same path (`/about` is the same URL in all three languages).

---

## 2. Comprehensiveness audit

| Surface | Localised today | Notes |
| --- | --- | --- |
| Navbar, Footer chrome | Yes (EN/FR/SV) | via `t.*` |
| Original homepage sections (legacy hero/services/insights/projects copy in `translations.ts`) | Yes | but much of it is now replaced by the product-led pivot |
| **New product content** (MCT, NBC, services, homepage showcase, case studies, vision, contact, about) | **No** | English-first content layer `src/app/content/*.ts` is English-only and bypasses the catalogue entirely |
| about, contact, careers pages | No | hardcoded English JSX |
| `services/[slug]` legacy detail pages | No | hardcoded English data |
| `CookieConsent.tsx` | No | hardcoded English |
| `<head>` metadata (`layout.tsx`, per-page) | No | English only, not locale-aware |
| German (DE) | No | not implemented anywhere |

**Net:** after the Stage B pivot, the visible, high-value surface (the product story) is **English-only**, because the new copy deliberately lives in the English-first content layer. The catalogue (`translations.ts`) still holds FR/SV, but much of what it translates is legacy or no longer shown. So real-world coverage of the *current* site in FR/SV has gone **down**, by design, pending this phase.

---

## 3. Failure points (ranked)

1. **No URL locale (blocker for the stated goal).** Language lives in `localStorage`, so it cannot be linked, shared, or addressed. `lbya.se/fr/...` does not exist. This is exactly what the request asks to fix.
2. **No SEO for languages.** Search engines see one URL per page and one language. No `hreflang`, no localised `<title>`/description. A multilingual company is invisible in non-English search.
3. **New product content is unreachable in any non-English language.** The content layer is not wired to the catalogue or any locale.
4. **Hard refresh / first paint.** Because the provider defers to a `mounted` flag and reads `localStorage` in `useEffect`, the first server render is always `EN`; a non-English user sees an English flash, and direct entries to deep links start in English.
5. **No missing-key fallback.** `t` indexes the catalogue directly; a missing nested key throws at runtime rather than falling back to English.
6. **DE absent.** The request lists German; it does not exist.
7. **Switcher coupling.** Language only changes through the Navbar component. There is no way to set it from a link, a marketing campaign, or a server redirect.

---

## 4. A real pitfall in the requested codes: `/se`

The request lists `/en, /se, /fr, /de`. The BCP-47 **language** subtag for Swedish is **`sv`**, not `se`. `se` is the ISO country code for Sweden *and* the language code for Northern Sami. Search engines and `hreflang` expect language codes, so the locale segment should be **`/sv`**. The current app already uses `SV` internally, which is consistent with `sv`.

**Recommendation:** use `/en`, `/sv`, `/fr`, `/de`. If `/se` is wanted for brand or familiarity reasons, add it as a 301 alias to `/sv` rather than the canonical locale. This avoids `hreflang` and analytics confusion.

---

## 5. Recommended architecture

**Adopt `next-intl` with an `app/[locale]/` segment and locale middleware.** It is the de-facto standard for Next.js App Router i18n and removes most of the failure points above directly.

Why `next-intl` over keeping the custom context:
- Middleware negotiates locale from the URL, then the `Accept-Language` header, then a cookie, and redirects `/` to the best match, so the address bar drives language with no flash.
- Works in Server Components, so metadata and `hreflang` become locale-aware and SEO-correct.
- Built-in fallback for missing keys, plus a typed message catalogue per locale.
- A locale switch becomes a normal link that swaps the path segment, so no component-level state is required (meets the core ask).

### Target shape
```
src/
  middleware.ts                      // next-intl locale negotiation + redirects
  i18n/
    routing.ts                       // locales: ['en','sv','fr','de'], default 'en'
    request.ts                       // loads messages per request
  messages/
    en.json  sv.json  fr.json  de.json
  app/
    [locale]/
      layout.tsx                     // NextIntlClientProvider + locale <html lang>
      page.tsx                       // home
      products/...  services/...  about/  contact/  insights/ ...
```

### Migration steps (phased, each independently shippable)
1. **Install and scaffold.** Add `next-intl`, create `i18n/routing.ts`, `middleware.ts`, and `i18n/request.ts`. Decide locales `['en','sv','fr','de']`, default `en`.
2. **Move routes under `app/[locale]/`.** Relocate the current `app/*` routes beneath the segment. Add `generateStaticParams` for the four locales. Update internal links to be locale-aware (next-intl `Link`).
3. **Consolidate strings into messages.** Migrate `translations.ts` and the English-first content layer (`content/*.ts`) into `messages/en.json` as the source of truth, keyed by namespace (home, products, mct, nbc, services, case-studies, contact, about, footer, nav, cookie).
4. **Translate.** Produce `fr.json`, `sv.json`, `de.json` from `en.json`. Flag machine vs reviewed translations; product and legal copy should get a human pass before launch.
5. **Localise metadata and `hreflang`.** Per-page `generateMetadata` reading the locale; emit `alternates.languages` for the four locales.
6. **Replace the switcher.** Swap the Navbar buttons for locale links that change only the path segment and preserve the current route.
7. **Retire the custom context** (`I18nContext.tsx`, `providers` wiring) and the `localStorage` mechanism. Keep a cookie only as a negotiation hint.
8. **Close the hardcoded gaps** found in section 2 (about, contact, careers, `services/[slug]`, `CookieConsent`).

### Lighter alternative (no dependency)
A custom `app/[locale]/` segment plus a small `middleware.ts` that redirects `/` and rewrites locale-less paths, with the existing context refactored to read the locale from route params instead of `localStorage`. Less code to adopt, but you re-implement negotiation, fallback, and SEO helpers by hand. Recommended only if avoiding the dependency is a hard requirement.

---

## 6. Effort, risk, and decision

- **Effort:** medium-large. The structural move (`app/[locale]/`) touches every route; the string consolidation and four-locale translation (including new DE) is the bulk of the content work.
- **Risk:** medium. Route relocation and link updates are mechanical but wide; do it on a branch with the build as the gate. Translation quality is the main launch risk, not code.
- **Decision needed before building:**
  1. `next-intl` (recommended) vs custom `[locale]` + middleware.
  2. Canonical Swedish code `/sv` (recommended) vs `/se` alias.
  3. Whether FR/SV/DE launch as machine translations (fast) or wait for a human pass (slower, safer for product and legal copy).

On your go-ahead and these three answers, this becomes a concrete implementation branch.
