---
name: GharSeva Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  price-card:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style
The design system establishes an architectural, high-fidelity aesthetic for the modern Indian residential leasing market. It balances institutional trust with consumer velocity, eliminating the friction and opacity historically associated with home rentals.

### Brand Personality & Target Audience
- **Target Audience:** Urban renters, relocating tech and corporate professionals, NRI property owners, and independent homeowners across Tier-1 and Tier-2 Indian hubs (Bengaluru, Mumbai, MMR, NCR, Pune, Hyderabad).
- **Tone:** Authoritative, transparent, welcoming, and rigorously structured.
- **Emotional Response:** Certainty, clarity of financial terms, relief from broker friction, and effortless security.

### Design Movement: Modern Structuralism & Crisp High-Fidelity
The visual style draws from **Modern Corporate Minimalism** punctuated by **high-clarity tactile cues**. It avoids ornamental clutter in favor of strict vertical alignment, crisp surface definitions, subtle atmospheric depth, and purposeful status accents. Critical transaction metrics—such as security deposits, maintenance inclusions, and verified owner credentials—are elevated with deliberate typographic contrast.

## Colors
The palette leverages a high-contrast base designed to anchor financial credibility, offset by verdant utility accents signaling authenticity and verified statuses.

### Palette Architecture
- **Primary Navy (`#0F172A`, `#1E293B`):** Represents security, institutional reliability, structural boundaries, headings, and dominant navigation chrome.
- **Secondary Teal (`#0D9488`):** Drives primary transactional actions, focused interactive states, and search activation.
- **Tertiary Emerald (`#10B981`):** Reserved exclusively for positive verification indicators: "Verified Owner", "Zero Brokerage", and operational safety tokens.
- **Utility Gold (`#F59E0B`):** Expresses high performance, premium property badges ("Featured", "GharSeva Prime"), and user review metrics.
- **Neutrals & Surfaces:**
  - `Surface Base`: Pure White (`#FFFFFF`) for card containment and elevated interactive components.
  - `Surface Subdued`: Slate Wash (`#F8FAFC`, `#F1F5F9`) for systemic canvas backdrops, contrast breaks, and input fills.
  - `Borders & Rules`: Hairline Slate (`#E2E8F0`, `#CBD5E1`) for structural definition without visual drag.
  - `Text System`: Slate Deep (`#0F172A`) for primary legibility, Muted Charcoal (`#475569`, `#64748B`) for secondary metadata, furnishing states, and terms.

## Typography
Plus Jakarta Sans serves as the single typographic family across display, body, and tabular instances to guarantee crisp geometric clarity and optical balance.

### Typographic Implementation Rules
- **Monetary Representation (INR):** The Indian Rupee symbol (`₹`) must inherit the exact weight of the accompanying numeral sequence (`font-variant-numeric: tabular-nums`). For property rental figures, use the format `₹45,000 / mo` with the unit labeled in `body-md` slate.
- **Hierarchy of Context:** BHK definitions and society names must prioritize medium-to-bold weights over pure scale increases to preserve scanning cadence in high-density listings.
- **Case Conventions:** Status markers, property classifications (e.g., `SEMI-FURNISHED`, `GATED SOCIETY`), and micro-tags utilize uppercase formatting paired with `label-sm` tracking.

## Layout & Spacing
The layout follows a responsive 12-column fluid grid system pinned to a maximum desktop container width of 1280px.

### Breakpoint Matrix
- **Mobile (< 768px):** 4 columns, `margin-mobile` (20px), `gutter-mobile` (16px). Single-column card stacking with persistent sticky action footer.
- **Tablet (768px - 1024px):** 8 columns, `margin-tablet` (32px), `gutter` (24px). Dual-column feed or master-detail split.
- **Desktop (> 1024px):** 12 columns, `margin` (48px), `gutter` (24px). Flexible multi-column listing grids (3-column listing feed, 4-column search results split with map).

### Layout Rules
- **Horizontal Listing Cards:** Spans 12 columns on mobile, 6 columns on tablet, and 4 columns on standard desktop views.
- **Search Hero Canvas:** Elevated container bridging the masthead, spanning full 12 columns desktop with internal horizontal 3-way split (Location, BHK/Type, Budget Range) collapsing vertically on mobile.

## Elevation & Depth
Elevation is rendered strictly through structured border definitions combined with ultra-diffused atmospheric ambient shadows. The system avoids muddy or dramatic drops, maintaining an immaculate daylight feel.

### Surface Elevation Levels
- **Level 0 (Flat/Base):** `background-color: #F8FAFC`. Zero elevation, relied upon for page canvas and section divides.
- **Level 1 (Card & Content Containment):** `background-color: #FFFFFF`, `border: 1px solid #E2E8F0`, `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`. Standard state for property listing cards, trust criteria panels, and standard inputs.
- **Level 2 (Hover & Interactive Focus):** `border-color: #CBD5E1`, `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`. Activated when hovering property cards, interactive trust badges, or active filter flyouts.
- **Level 3 (Search Hero & Overlays):** `border: 1px solid #E2E8F0`, `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Applied to sticky headers, search modules, and verification modal dialogs.

## Shapes
A unified radius strategy softens the structural rigidity of property metadata grids while preserving architectural poise.

### Curvature Geometry
- **Components & Form Elements (Radius 2 - 8px):** Form fields, action buttons, BHK selection toggles, and contextual menu dropdowns.
- **Listing Containers & Modules (`rounded-xl` - 16px):** Property listing cards, visual media wrappers, and hero search consoles.
- **Featured Banners & Modal Viewports (`rounded-2xl` - 24px):** Gated society highlight clusters, trust guarantee banners, and verification overview sheets.
- **Badges & Metadata Tags (Fully Rounded / Pill):** Verification markers, "Zero Brokerage" tags, furnishing statuses, and rating badges use full pill radiuses (`rounded-full`) to differentiate metadata from actionable rectangular triggers.

## Components

### 1. Property Listing Cards
- **Structural Blueprint:** Top edge carries a 16:10 aspect-ratio media viewer with absolute-positioned status badges ("Zero Brokerage" on top-left in Emerald; "Verified Owner" on top-right in Navy/Teal).
- **Body Hierarchy:**
  - Row 1: Price (`price-card`, `#0F172A`) formatted as `₹[Amount] / month`, with right-aligned maintenance status (`body-md`, e.g., "Incl. Maintenance").
  - Row 2: Title (`title-md`) defining inventory (e.g., "3 BHK Semi-Furnished Flat").
  - Row 3: Society and geography indicator with SVG pin icon (`body-md`, `#475569`, e.g., "Prestige Falcon City, Kanakapura Road").
  - Row 4: Property attribute chip array (Carpet Area, Floor level, Gated Society status).
  - Footer: Security deposit requirement (`label-md`, `#64748B`, e.g., "Deposit: 2 Months") paired with a high-contrast "Contact Owner" button.

### 2. Search Hero Bar
- A monolithic floating console spanning across the primary viewport header.
- **Field Splits:** Segmented into three distinct interactive chambers via subtle vertical dividers (`#E2E8F0`):
  1. *Location*: Auto-complete search with city anchor selector (e.g., "Bengaluru").
  2. *BHK Configuration*: Multi-select toggle chips (1 RK, 1 BHK, 2 BHK, 3+ BHK).
  3. *Budget Slider / Tiers*: Dual-point selector with preset min-max boundaries.
- **Execution:** Concludes with an integrated accent action button (`#0D9488`) displaying an icon-label pair ("Search Rentals").

### 3. Verification & Trust Chips
- **Zero Brokerage Badge:** Emerald background tint (`rgba(16, 185, 129, 0.1)`), Emerald text (`#047857`), pill-shaped, leading checkmark icon.
- **Verified Owner Chip:** Deep Navy background (`#0F172A`), White text (`#FFFFFF`), micro-shield icon in Vibrant Teal (`#0D9488`).
- **Gated Society & Furnishing Tag:** Slate Wash (`#F1F5F9`), Slate Deep text (`#334155`), `0.5rem` radius, crisp hairline border (`#E2E8F0`).

### 4. Interactive Form Elements & Inputs
- **Text & Dropdown Inputs:** `48px` minimum height, `#FFFFFF` background, `#E2E8F0` resting border, shifting to `#0D9488` with a 2px outer ambient ring on focus.
- **BHK Segmented Control:** Segmented pill container (`#F1F5F9`) with individual tab items that invert to Navy (`#0F172A`) with white text upon selection.
- **Checkboxes & Radios:** Teal-filled (`#0D9488`) checked states with absolute white tick marks; border radius of `4px` for checkboxes and circular for radios.

### 5. Buttons & Triggers
- **Primary Transactional:** Base `#0F172A`, text `#FFFFFF`, hovering to `#1E293B`. Used for critical paths: "Schedule Visit", "Contact Owner".
- **Secondary Action:** Base `#0D9488`, text `#FFFFFF`, hovering to `#0F766E`. Used for search triggers and lease agreement workflows.
- **Tertiary / Outline:** Base transparent, 1px border `#CBD5E1`, text `#0F172A`, hover background `#F8FAFC`. Used for secondary filtering, sharing, and bookmarking.