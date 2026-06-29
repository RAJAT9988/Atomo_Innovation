# Design System Direction

## Visual Identity

Premium, minimal, global deep-tech aesthetic inspired by Apple-style design discipline without copying proprietary layouts.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary midnight | `#071A35` | Dark sections, headers |
| Near black | `#03070D` | Hero, footer |
| Primary white | `#F7F9FC` | Light sections |
| Electric cyan | `#00E5FF` | Accents, CTAs, eyebrows |
| Bright purple | `#7B61FF` | Secondary accents |
| Technical silver | `#BFC9D9` | Supporting text on dark |
| Dark panel | `#0C203D` | Cards on dark backgrounds |
| Muted light | `#E8EDF5` | Light card backgrounds |

Cyan and purple used selectively — not a neon site.

### Typography (Inter only)

- **Font:** Inter via `next/font/google`, variable font
- **Weights:** 400 (body), 500 (nav), 600 (headings/buttons), 700 (exceptional emphasis)
- **Desktop body:** 18px / 1.65 / -0.01em
- **Tablet body:** 17px / 1.65
- **Mobile body:** 16px / 1.6
- **Hero:** clamp(3rem, 7vw, 7.5rem), weight 600
- **Section headline:** clamp(2.4rem, 5vw, 5.5rem)

### Spacing Scale

4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160px

### Grid

- Max content: 1280px
- Editorial: 900px
- Text: ~720px
- Side padding: 16–64px responsive

### Components

Implemented in `src/app/globals.css` (@layer components) and React components under `src/components/`.

### Motion

- Micro: 120–220ms
- Section: 350–650ms
- `prefers-reduced-motion` respected globally

## Homepage Wireframe (Text)

```
[HEADER — transparent → opaque on scroll]
  Platform | Solutions | Products | Developers | Company | Resources | [Talk to Atomo]

[HERO — near-black]
  Eyebrow: Edge AI Infrastructure
  H1: Intelligence Should Live Where Decisions Are Made
  Supporting copy (850px max)
  [Explore the Platform] [Talk to Atomo]
  Product image (Electron APUs)

[PROBLEM — white]
  Eyebrow: The next computing transition
  H2: The Cloud Cannot Power the Physical World Alone.
  4 challenge cards: Latency | Connectivity | Privacy | Bandwidth
  Comparison: Cloud-only flow vs Atomo edge flow

[WHY NOW — midnight]
  H2: The Next Decade Will Be Defined by Intelligent Infrastructure.
  Systems becoming intelligent (6 items)
  Journey: Observe → Understand → Decide → Act

[PLATFORM — white]
  H2: One Platform. Intelligence at Every Layer.
  Vertical stack diagram (7 layers, keyboard accessible)

[WHY ATOMO — midnight]
  H2: Built for the Edge from Day One.
  6 differentiator cards with outcomes

[INDUSTRIES — white]
  H2: Intelligence for the Systems the World Depends On.
  7 alternating editorial layouts with challenge/outcome/CTA

[PROOF — near-black]
  H2: Built in India. Validated Across the World.
  Approved metrics strip only

[PRODUCTS — white]
  H2: Purpose-Built Edge Hardware.
  Electron | Proton | Neutron cards (not catalogue-first)

[ATOMICOS — midnight full-width]
  H2: The Edge Starts with AtomicOS.
  Capability grid + CTA

[SECURITY — white]
  H2: Private by Architecture. Resilient by Design.
  Principles grid + CTA

[FOUNDER — midnight]
  Portrait + statement (draft until approved)
  Leadership preview CTAs

[RECOGNITION — white]
  Contextual recognition items (not logo wall)

[INSIGHTS — near-black]
  Thought leadership topic cards

[FINAL CTA — midnight]
  H2: Bring Intelligence Closer to Action.
  Audience-specific action cards

[FOOTER]
  Mission + columns + addresses + social
```

## Content Requiring Approval

See `docs/discovery/03-approval-checklist.md`
