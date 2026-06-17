# LBYA Website Content Critique

**Path 1 deliverable. Reviewer stance: strict website critic.**
**Scope:** how textual information is conveyed across the product-led pivot. Source material is the proposed copy in `LBYA_Website_Update_Brief_MCT_NBC.docx.md` plus the existing on-site copy in `src/app/i18n/translations.ts` that survives the pivot.
**Status:** evaluation only. No code changed. Section 6 (the clean copy deck) is the single source of truth for Stage B implementation once approved.

---

## 1. Method and severity scale

Each finding is tagged:

- **Blocker** — must not ship. Factually risky, off-brand, or breaks the reader's trust.
- **Improve** — ships poorly as written. Hurts clarity, flow, or credibility.
- **Nit** — polish. Minor wording or rhythm.

Copy is judged on five axes: **accuracy** (claims we can defend), **clarity** (one idea per sentence, plain words), **flow** (each paragraph earns the next), **altitude** (right level of abstraction for the reader and the page), and **distinctiveness** (does it sound like LBYA, or like any control-platform brochure).

---

## 2. Editorial conventions ruling

One standard, applied everywhere. Mixing conventions is the single most common credibility leak on multi-author sites.

| Decision | Ruling | Reason |
| --- | --- | --- |
| Spelling | **British English** (organise, optimise, modelling, behaviour, centre, licence) | The brief is already British, the company is Swedish-registered (`.se`), and the European market reads British more naturally. |
| Em dashes | **None.** Use a colon, a full stop, a comma, or parentheses. | Hard rule from the brief owner. The codebase currently contains zero em dashes (verified), so this is about holding the line, not cleaning up. |
| En dashes | Only in true numeric ranges (Mon–Fri, 9–6). Never as a sentence break. | Keeps the no-dash rule unambiguous. |
| Numerals | Spell out one to nine, numerals for 10+. Always numerals for package tiers, versions, and counts. | Standard editorial convention. |
| Product names | **Malaika Control Tower (MCT)** and **Nayeli BIM Control (NBC)**. Introduce the full name once per page, then the acronym. | The brief flags that "MC" has drifted to "MCT". Lock it. |
| Sentence case | Headings and CTAs in sentence case, not Title Case. | Matches the calm, plain tone the products are selling. |
| Voice | Second person for the visitor ("you", "your team"), third person for LBYA. Active voice. | "We help you control transport" beats "transport coordination is enabled". |

---

## 3. Hard rules checklist (claims discipline)

These phrases or their paraphrases **must not appear** anywhere on the site (brief §13). This is a trust and legal-exposure issue, not a style preference.

- [ ] No "guaranteed customs clearance" or "guaranteed border crossing".
- [ ] No "guaranteed transporter availability".
- [ ] No "fully automated logistics platform".
- [ ] No "certified compliance platform".
- [ ] No "real-time GPS tracking" or "live tracking" unless an integration is actually live.
- [ ] No "official government verification" unless wired to an official source.
- [ ] No "replaces Autodesk / Solibri / BIMcollab / transporters / freight forwarders".
- [ ] No readiness percentages ("90 per cent ready"). Use "entering early-access and pilot phase".
- [ ] No prices anywhere. Packages use CTAs only ("Request early access", "Book a demo", "Discuss enterprise needs").

Approved vocabulary to lean on: control platform, coordination workflow, verification support, document control, evidence and traceability, decision readiness, early access, pilot phase, designed to integrate with existing tools.

---

## 4. Cross-cutting issues

These recur across the brief copy. Fixing them once in the copy deck prevents them everywhere.

### 4.1 Enumeration fatigue — *Improve, recurring*
The brief lists the same chain of nouns repeatedly: "requests, transporters, truck documents, quotes, communication, shipment status, and decision evidence" appears in near-identical form in the MCT hero, "What MCT is", and the problems table. Long noun-chains read as a feature dump, not a value proposition, and the repetition makes the page feel padded.

**Rule for the copy deck:** state the full chain **once** (on the MCT page, in "What MCT is"). Elsewhere, name two or three concrete items and stop. Vary the examples so each section teaches something new.

### 4.2 Abstraction overload — *Improve*
Strings like "transform fragmented information into structured, traceable, and reliable decisions" stack three abstract adjectives onto an abstract noun. One concrete image beats three abstractions. Pair every abstract promise with a tangible "instead of X, you get Y".

### 4.3 Internal notes leaking into copy — *Blocker*
The brief contains editorial asides that are **not website copy** and must be stripped:
- NBC "Short meaning: I love Building Information Modelling Control." This is a backronym gloss for internal use. It is off-tone for a B2B product page and must never render.
- "MCT is 90 per cent ready" framing.
- Bracketed instruction blocks ("Navigation instruction", "Pricing instruction", "Developer note"). These are guidance to the developer, not visitor copy.

### 4.4 Hedging that undercuts confidence — *Improve*
Phrases like "where technically available", "to be evaluated per client need", and "options" are correct for legal caution but, stacked together, they make the product sound tentative. Keep the caution, but move it to one honest line per page ("MCT is in early access; capabilities expand as integrations are verified") rather than hedging every bullet.

### 4.5 "Services" naming collision — *Improve*
The site already has `/solutions` and `/services/[slug]`. The brief introduces a `/services` index with four new categories. The word "solutions" now competes with "services" and "products". Recommend retiring the "Solutions" label from navigation and folding that content into Products (for MCT/NBC) and Services (for advisory). Resolved in detail in the UI Gap Report; flagged here because it is a content-clarity problem, not only an IA one.

---

## 5. Per-section critique

### 5.1 Core message / homepage hero
**Brief:** Headline "Digital control platforms for connected industries." Subheadline "LBYA develops intelligent software solutions that help teams control information, coordinate operations, verify data, and make better decisions across construction, BIM, logistics, and African market ecosystems."

- *Improve* — "intelligent software solutions" is filler. Every vendor says "intelligent". Cut it; let the verbs ("control, coordinate, verify, decide") carry the meaning.
- *Improve* — the subheadline runs four verb-phrases plus a four-item domain list in one breath. It is grammatical but breathless. Split into two sentences.
- *Nit* — "connected industries" is good and ownable. Keep it.

> **Before:** LBYA develops intelligent software solutions that help teams control information, coordinate operations, verify data, and make better decisions across construction, BIM, logistics, and African market ecosystems.
> **After:** LBYA builds digital platforms that help teams control information, coordinate work, and verify what matters. We work across construction, BIM, and African logistics, where clear decisions depend on trustworthy data.

### 5.2 Homepage problem and answer
**Brief problem:** "fragmented information, disconnected tools, weak verification, and unclear responsibility."

- *Improve* — this is a strong, concrete list. But as a standalone fragment it has no verb. Give it a lead-in sentence so the section has a spine.
- *Improve* — the "LBYA answer" ("software platforms that connect data, people, documents, responsibilities, and decisions") is another five-item chain (see 4.1). Trim to three and make them human.

> **After (problem):** Most teams lose time in the gaps between tools. Information is scattered, ownership is unclear, and there is rarely a reliable record of what was checked or decided.
> **After (answer):** LBYA closes those gaps. Our platforms connect the people, documents, and decisions that move work forward, so nothing important lives only in a chat thread or a spreadsheet.

### 5.3 Homepage product cards
**Brief MCT card:** "MCT gives African logistics teams a clearer way to control transport coordination. Instead of losing requests, documents, quotes, and decisions across chats and spreadsheets, teams can manage each step of the process through a structured workflow with verification support, evidence, and operational visibility."

- *Improve* — the "instead of X" construction is good and should be the model for both cards. But the sentence is 40-plus words. Break it.
- *Nit* — "verification support, evidence, and operational visibility" is a three-abstraction tail (4.2). Keep one.

> **After (MCT card):** MCT gives African logistics teams a clearer way to coordinate transport. Instead of losing requests, documents, and quotes across chats and spreadsheets, your team runs each step through one structured workflow with built-in verification support.

**Brief NBC card:** "NBC helps BIM teams move beyond model checking into stronger information control. It connects requirements, model quality, issue responsibility, evidence, and decision readiness, enabling teams to act with greater clarity, accountability, and trust."

- *Improve* — "move beyond model checking into stronger information control" is the sharpest idea NBC has. Lead with it, then stop adding nouns.
- *Improve* — the closing "clarity, accountability, and trust" triad is generic. Replace with a concrete payoff.

> **After (NBC card):** NBC takes BIM teams beyond model checking into real information control. It links requirements, model quality, and issue ownership, so teams know what is resolved, what is not, and who is responsible.

### 5.4 MCT page hero and "What MCT is"
**Brief hero paragraph** is strong but is the worst offender for enumeration fatigue (4.1): it lists seven item types, then "What MCT is" lists eight, then the problems table lists them again.

- *Blocker (cumulative)* — across the MCT page the same noun-chain appears at least three times. A reader feels they are reading the same sentence repeatedly. This actively lowers perceived product quality.
- *Improve* — the hero should sell the outcome (order, trust, visibility). Save the full inventory for "What MCT is", and say it once there.

> **After (MCT hero):** MCT brings order, trust, and visibility to complex transport coordination. It turns scattered messages and documents into one structured workflow built for African logistics, so every request has a clear status, an owner, and a record you can stand behind.

### 5.5 "What MCT is not" — *keep, light edit*
This section is excellent and rare: a product page that states its limits builds more trust than one that does not. Keep all four points. Only edit for the dash rule and to soften "from day one" (which implies a roadmap promise).

- *Nit* — "It is not presented as a full ERP, accounting system, or global transport management system from day one." Drop "from day one"; it hints at a commitment. Use "today".

### 5.6 "Who MCT is for" — *keep*
Clear, well-segmented, concrete. No changes beyond convention. One nit: "LBYA internal operations" as a public audience bullet is slightly odd on a marketing page; consider moving it to an internal doc, or reframing as "Operators running coordination on behalf of clients".

### 5.7 Problems MCT addresses (table) — *Improve*
The two-column problem/response table is a strong format. But the "MCT response" cells repeat the noun-chain (4.1) and several start with "MCT" (monotone rhythm). Vary openings; reference only the items relevant to that row.

> **Example row — Before:** "MCT keeps transporter profiles, truck packs, document status, expiry dates, and verification evidence in one place."
> **After:** "Transporter profiles, truck packs, and document expiry dates live in one place, with verification notes attached to each."

### 5.8 MCT modules (§5) — *Improve*
Ten modules, each with a one-line explanation, is the right altitude for a product page. Two issues:
- *Improve* — "Future integrations" lists nine possible integrations. This reads as a wish-list and weakens the page. Cut to "such as GPS/telematics, accounting, and ERP/TMS systems" and stop.
- *Nit* — "Partner and client portal" says "For higher packages". Avoid pricing-tier language inside a feature description; that belongs in the package matrix.

### 5.9 MCT packages (§6 and §7) — *Improve*
- *Improve* — the four positioning paragraphs are well differentiated (essentials → control → oversight → enterprise). Keep that arc. But each is one very long sentence; split each into two.
- *Blocker* — confirm **no prices** render and every card has a CTA, not a price. The brief is explicit; the risk is a developer dropping in a price placeholder.
- *Nit* — feature-matrix cells mix value words ("Advanced", "Custom") with feature names. Keep cells short and parallel; never let a cell become a sentence.

### 5.10 NBC page (§8) — *Improve, one Blocker*
- *Blocker* — remove "Short meaning: I love Building Information Modelling Control" (4.3). It must not render.
- *Improve* — the positioning statement ("Most BIM platforms help teams create, coordinate, or review models. NBC focuses on the critical layer between those steps...") is the best paragraph in the whole brief. Promote it to the hero or directly beneath it. Do not bury it.
- *Improve* — NBC copy is more abstract than MCT copy because the product is earlier. That is acceptable, but add one concrete example of "controlling information" so it is not pure abstraction (4.2).

### 5.11 Services repositioning (§9) — *keep, light edit*
Clear and on-strategy. The four categories read well. One nit: "Eurocode-oriented design documentation where relevant" and "IFC/BCF/IDS-oriented workflows" are jargon that the BIM audience will value but that a general visitor will not parse. Acceptable on a services page; just ensure the category title and first sentence are plain before the jargon appears.

### 5.12 About page (§10) — *keep, light edit*
The "everything is connected: people, nature, infrastructure, information, and markets" opening is distinctive and on-brand. Keep it. One improve: the second paragraph again lists products and four domains in one sentence; split so the product names land with weight.

### 5.13 Contact page (§11) — *keep*
Headline "Let's build connected digital control systems together." is good. The eight inquiry types are well-chosen and map cleanly to a select field. No content changes; this is mostly a UI gap (see Gap Report §6).

### 5.14 Footer (§12) — *keep*
Maps directly to the copy deck below. No prose issues.

---

## 6. Clean copy deck (single source of truth for Stage B)

British English, em-dash-free, claims-compliant. These are the strings to wire into `src/app/i18n/translations.ts` (EN) and the product data files. Where the brief copy was already clean, it is reproduced; where it was edited above, the edited version is used.

### 6.1 Navigation labels
`Products` · `Services` · `Industries` · `Insights` · `About` · `Contact`

### 6.2 Homepage
- **Hero headline:** Digital control platforms for connected industries.
- **Hero subheadline:** LBYA builds digital platforms that help teams control information, coordinate work, and verify what matters. We work across construction, BIM, and African logistics, where clear decisions depend on trustworthy data.
- **Slogan:** Rooted in Nature, Designed for the Future.
- **Primary CTAs:** Explore MCT · Discover Nayeli BIM Control
- **Secondary CTA:** Partner with LBYA
- **Problem section:** Most teams lose time in the gaps between tools. Information is scattered, ownership is unclear, and there is rarely a reliable record of what was checked or decided.
- **Answer section:** LBYA closes those gaps. Our platforms connect the people, documents, and decisions that move work forward, so nothing important lives only in a chat thread or a spreadsheet.
- **Why it matters:** Clarity, traceability, and decision readiness. Teams act faster when they can trust the record in front of them.
- **MCT card:** MCT gives African logistics teams a clearer way to coordinate transport. Instead of losing requests, documents, and quotes across chats and spreadsheets, your team runs each step through one structured workflow with built-in verification support. _(CTA: Explore MCT / Request early access)_
- **NBC card:** NBC takes BIM teams beyond model checking into real information control. It links requirements, model quality, and issue ownership, so teams know what is resolved, what is not, and who is responsible. _(CTA: Discover NBC / Join early access)_
- **Final CTA:** Become a pilot partner, book a demo, or talk to LBYA.

### 6.3 MCT page
- **Page title:** Malaika Control Tower
- **Tagline:** Transport and logistics control for connected African trade.
- **Hero:** MCT brings order, trust, and visibility to complex transport coordination. It turns scattered messages and documents into one structured workflow built for African logistics, so every request has a clear status, an owner, and a record you can stand behind.
- **Primary CTA:** Request early access · **Secondary CTA:** Book a product discussion
- **What MCT is:** MCT is a practical control platform for transport coordination in the African market. It replaces scattered communication with one structured way to manage requests, transporters, truck documents, quotes, shipment status, and decision evidence. The result is a professional coordination environment where each request, document, and decision can be tracked, reviewed, and trusted.
- **What MCT is not** (keep all four brief points, "from day one" → "today", dashes removed).
- **Who MCT is for** (keep brief's six segments; reframe the internal-operations bullet as "Operators running coordination on behalf of clients").
- **Problems table** (keep format; apply 5.7 varied openings; state items once per row).
- **Modules** (keep the ten; trim "Future integrations" to three examples; remove tier language from "Partner and client portal").
- **Honest-status line (new, one place):** MCT is in early access. Capabilities expand as integrations are formally implemented and verified.
- **Truck-pack trust line:** MCT emphasises official verification and evidence-based document control. If documents do not match the official portal or QR verification, the status is treated as unresolved until corrected.

### 6.4 MCT packages
Positioning paragraphs (each split into two sentences), feature lists, and the feature matrix as in brief §6 and §7, with: no prices, one CTA per tier (Request early access · Book a demo · Request premium access · Discuss enterprise needs), and parallel, short matrix cells.

### 6.5 NBC page
- **Page title:** Nayeli BIM Control
- **Tagline:** BIM control built with care, clarity, and trust.
- **Hero (promoted positioning statement):** Most BIM platforms help teams create, coordinate, or review models. Nayeli BIM Control focuses on the critical layer between those steps: controlling information, responsibilities, and quality evidence, so BIM becomes more accountable and easier to act on.
- **Supporting paragraph:** NBC gives project teams a clearer way to control BIM information from requirements to decision readiness. It brings model quality, issue ownership, and evidence into one structured workflow, so teams reduce uncertainty and move forward with confidence.
- **Primary CTA:** Join the early access list · **Secondary CTA:** Request a BIM control discussion
- **Sections:** Why BIM needs a control layer · From model checking to BIM governance · Connecting requirements, issues, and decision readiness · Designed to work alongside your existing BIM tools · Early access and partnership
- **Removed:** the "I love Building Information Modelling Control" gloss.

### 6.6 Services (index)
Four categories with the brief's explanations (jargon kept but plain-first): BIM and Digital Construction Advisory · Structural/BIM Engineering Support · Software/API Integration · African Market and Operations Advisory. Lead-in line: Expert services that help teams adopt our products and modernise how they work.

### 6.7 About
Two-paragraph brief copy, second paragraph split so MCT and NBC land separately. Section order per brief §10.

### 6.8 Contact
- **Headline:** Let's build connected digital control systems together.
- **Paragraph:** Contact LBYA to discuss MCT, Nayeli BIM Control, product partnerships, pilot projects, digital transformation support, or strategic collaboration.
- **Inquiry types (select):** I want to learn about MCT · I want to learn about Nayeli BIM Control · I want to become a pilot partner · I need BIM or digital construction support · I need African market or logistics support · I want to discuss software or API integration · I want to discuss investment or partnership · Other

### 6.9 Footer
- **Products:** Malaika Control Tower (MCT) · Nayeli BIM Control (NBC)
- **Services:** BIM and Digital Construction Advisory · Structural/BIM Engineering Support · Software/API Integration · African Market and Operations Advisory
- **Company:** About · Insights · Careers · Contact · Privacy
- **Calls to action:** Request MCT access · Join NBC early access · Partner with LBYA

### 6.10 SEO titles and meta (brief §14)
Use as given; verified claims-compliant. Titles in the form "Page name | Descriptor". Meta descriptions under 160 characters, no banned claims.

---

## 7. Summary of blockers (must clear before Stage B copy is final)

1. Remove the "I love Building Information Modelling Control" gloss (5.10).
2. Remove all readiness percentages; use early-access framing (3, 4.3).
3. Eliminate the repeated MCT noun-chain so it appears once on the page (4.1, 5.4).
4. Confirm zero prices and a CTA on every package (5.9).
5. Strip every bracketed internal instruction block from rendered copy (4.3).
