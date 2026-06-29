# Atomo Website Audit — Current State (June 2026)

## Executive Summary

The current atomo.in website positions Atomo as an **IoT/smart-device company** selling Electron, Proton, Neutron, AtomicOS, and Airowl. It does not communicate Atomo as a **global Edge AI Infrastructure platform**. The strategic PDF confirms this is a positioning problem, not a technology problem.

## Technology Stack (Current)

| Layer | Technology |
|-------|------------|
| Architecture | Static HTML pages with client-side JS |
| Styling | Custom CSS per page + shared navbar CSS |
| Fonts | Inter (Google Fonts + rsms.me duplicate load) |
| Video | WebM autoplay on homepage |
| Forms | reCAPTCHA, email notification modals |
| SEO | Basic meta tags, Organization schema on homepage |
| Analytics | Not detected in crawl |
| CMS | None — static HTML |
| News/Blogs | JS-loaded content (news appears empty; blogs placeholder) |

## Pages Discovered (14 crawlable HTML pages)

| URL | Title | Primary H1 | Issues |
|-----|-------|------------|--------|
| `/` & `/index.html` | Atomo Innovation \| Intelligent Edge Devices | Electron | Duplicate URL; product-led not platform-led |
| `/electron_page/electron.html` | Electron \| Industrial IoT Edge Computing Device | Electron | Poor copy: "Designed to be perform", "best device in the world" |
| `/proton_page/proton.html` | Proton \| Smart Home Hub & Automation | Proton | Smart-home positioning conflicts with enterprise pivot |
| `/neutron_page/neutron.html` | Neutron \| Smart Home Voice Assistant | Neutron | Consumer/smart-home focus |
| `/atomicos_page/atomicos.html` | AtomicOS \| IoT Operating System | AtomicOS | "Powerfull as atom" grammar; IoT not Edge AI |
| `/atomo-int_page/int.html` | Smart Devices & IoT Solutions | Atomic Intelligence | ASNN/SDK content buried under "A.I" nav label |
| `/airowl_page/airowl.html` | Airowl Air Quality Monitoring | Airowl | Consumer product; not in new IA |
| `/about_page/about.html` | About Atomo Innovation | About Atomo | Mixed smart-home + edge messaging |
| `/presskit_page/press.html` | Press Kit | Press and Media | Downloads marked "Coming Soon" |
| `/carrier_page/carrier.html` | Careers | Join the Atomo Team | Typo in URL (carrier vs careers) |
| `/support_page/support.html` | Support | Contact Us | Environmental monitoring use cases only |
| `/blogs/blogs.html` | Blogs | Generic placeholder | No real articles; "Coming Soon" |
| `/news/index.html` | News | Atomo News | Dynamic loader; no articles visible |

## Canonical URL Mismatches

| Page | Canonical Tag | Actual URL |
|------|-----------------|------------|
| Electron | `https://atomo.in/electron.html` | `/electron_page/electron.html` |
| Proton | `https://atomo.in/proton.html` | `/proton_page/proton.html` |
| Neutron | `https://atomo.in/neutron.html` | `/neutron_page/neutron.html` |
| AtomicOS | `https://atomo.in/atomicos.html` | `/atomicos_page/atomicos.html` |
| About | `https://atomo.in/about.html` | `/about_page/about.html` |
| Press | `https://atomo.in/press.html` | `/presskit_page/press.html` |
| Careers | `https://atomo.in/carrier.html` | `/carrier_page/carrier.html` |

## Weak Messaging (Must Rewrite)

- "Hello, Industries !" / "Built to outsmart !" / "Smart made simple !"
- "Designed to be perform"
- "Why electron is the best of device in the world"
- "Powerfull as atom, Light as a feather"
- "Design to be future of smart living"
- "Innovating the future of smart living" (footer tagline)
- Meta description emphasizes "smart living" and "IoT solutions"

## Duplicate Content

- `/` and `/index.html` — identical
- Homepage meta reused on `/news/index.html`
- Footer block duplicated on every page
- Office addresses duplicated (Kudasan + GIFT City)

## Outdated / Placeholder Content

- All product "Buy" buttons trigger email waitlist modals
- Press kit downloads show "Coming Soon"
- Blog articles are placeholders
- News page shows "Loading latest news..." with no content
- Atomic Intelligence page: "Coming Soon ! We're working on this feature"
- Careers values section uses generic Apple-inspired copy

## Missing Metadata / SEO Gaps

- No sitemap.xml (returns 500)
- No RSS feed
- No llms.txt
- No BreadcrumbList schema
- No Product schema on product pages
- No FAQ schema
- Inconsistent canonical URLs
- Twitter cards use `property=` instead of `name=` (minor)
- No hreflang for international positioning

## Verified Company Facts (Approved for Use)

- **Legal name:** Atomo Innovation Pvt. Ltd. / Atomo Innovation PVT. LTD.
- **Email:** hello@atomo.in
- **Address 1:** W-406 4th Floor, Siddhraj Z Square, Near Landmark Mall, Kudasan, Gandhinagar 382421, India
- **Address 2:** AI Center of Excellence, 13th Floor, Gift Tower One, GIFT City, Gandhinagar, Gujarat 382355
- **Social:** Facebook, X (@AtomoHQ), Instagram (@atomo.in), LinkedIn (company/atomo-in)

## Verified Product Specs (Electron — from current site)

| Spec | Value | Status |
|------|-------|--------|
| CPU | 2.4 GHz hex-core | approved |
| NPU | 5 TOPS | approved |
| RAM | 16GB DDR4 | approved |
| Storage | 128GB / 256GB eMMC | approved |
| Power | 5V 3A Type-C | approved |
| Ethernet | 1 Gbps | approved |
| Wi-Fi | 802.11ac RSDB | approved |
| Bluetooth | v5.0 | approved |
| Thread | Compatible | approved |
| I/O | GPIO, UART, I2C, SPI, USB, RS-485 | approved |

## Verified Product Specs (Proton — from current site)

| Spec | Value | Status |
|------|-------|--------|
| CPU | 2.0 GHz Quad-core | approved |
| NPU | 1.2 TOPS | approved |
| RAM | 4GB DDR4 | approved |
| Storage | 64/128GB eMMC | approved |
| Power | 5V 3A Type-C | approved |
| Protocols | AtomoLink, Thread, Zigbee, WiFi, BLE, RF, IR | approved |

## Verified Product Specs (Neutron — from current site)

| Spec | Value | Status |
|------|-------|--------|
| CPU | 1.2 GHz Quad-core Cortex-A7 | approved |
| NPU | Not compatible | approved |
| RAM | 2GB DDR4 | approved |
| Storage | 64GB eMMC | approved |
| Power | 5V 2A Type-C | approved |
| Ethernet | 10/100 Mbps RJ45 | approved |
| Wi-Fi | 802.11 b/g/n | approved |

## Recognition Logos Found (About Page)

- GTU Ventures, iHub, NASSCOM, NIDHI Prayas, PDEU IIC (require verification before display)

## Asset Inventory Summary

~195 first-party assets on atomo.in including:
- Product renders (Electron, Proton, Neutron)
- Homepage video (compressed_HomeFinal.webm)
- AtomicOS icons and visuals
- ASNN SDK icons
- AI demo videos (fire detection, crowd detection, etc.)
- Domain/industry icons
- Partner logos (Alexa, Apple Home — third-party, use cautiously)
- Founder/team press kit references (download links non-functional)

## Broken Links / Issues

- sitemap.xml returns 500
- Canonical URLs point to non-existent paths (e.g. `/electron.html`)
- Press kit ZIP downloads non-functional ("Coming Soon")
- News articles use template URLs (`news-article.html?id=${item.id}`) — no articles loaded

## Functionality to Preserve

- Contact/support form (fields: name, company, email, phone, city, country, use case)
- Product email waitlist modals (migrate to contact flow)
- Press kit download structure (when assets available)
- Social media links
- Office addresses and contact email

## Content Requiring Management Approval

- Founder statement and portrait
- Leadership team profiles
- Advisor profiles
- Deployment metrics and proof numbers
- Case studies and customer names
- Awards and recognition details with dates
- Security certifications (none verified on current site)
- Atomic Center product details (not on current public site)
- Market statistics
