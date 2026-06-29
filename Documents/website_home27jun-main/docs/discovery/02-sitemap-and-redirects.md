# Sitemap & Redirect Map

## Existing Sitemap (atomo.in)

```
/
/index.html                          → duplicate of /
/electron_page/electron.html
/proton_page/proton.html
/neutron_page/neutron.html
/atomicos_page/atomicos.html
/atomo-int_page/int.html
/airowl_page/airowl.html
/about_page/about.html
/presskit_page/press.html
/carrier_page/carrier.html
/support_page/support.html
/blogs/blogs.html
/news/index.html
/news/news-article.html              → template only, no articles
```

## Proposed Final Sitemap

```
/                                    Homepage
/platform                            Platform overview
/platform/atomicos                   AtomicOS
/platform/asnn-sdk                   ASNN SDK
/platform/atomic-center              Device deployment & management
/platform/edge-hardware              Edge hardware overview
/platform/security                   Security, privacy & trust
/solutions                           Solutions overview
/solutions/manufacturing
/solutions/smart-cities
/solutions/construction
/solutions/critical-infrastructure
/solutions/transportation
/solutions/utilities
/solutions/defence-aerospace
/products                            Products overview
/products/electron
/products/proton
/products/neutron
/products/compare
/developers                           Developer overview
/developers/documentation
/developers/ai-engineer-program
/developers/remote-access
/support                             Support hub
/company                             Company overview
/company/about
/company/founder-vision
/company/leadership
/company/advisors
/company/governance
/company/recognition
/company/careers
/resources                           Resource overview
/resources/case-studies
/resources/case-studies/[slug]
/resources/insights
/resources/insights/[slug]
/resources/videos
/newsroom
/newsroom/[slug]
/press-kit
/contact
/privacy
/terms
/cookies
/sitemap.xml
/robots.txt
/rss.xml
/llms.txt
/manifest.webmanifest
```

## 301 Redirect Map

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/` | `/` | Same |
| `/index.html` | `/` | Consolidate |
| `/electron_page/electron.html` | `/products/electron` | Primary product redirect |
| `/electron.html` | `/products/electron` | Canonical mismatch fix |
| `/proton_page/proton.html` | `/products/proton` | |
| `/proton.html` | `/products/proton` | |
| `/neutron_page/neutron.html` | `/products/neutron` | |
| `/neutron.html` | `/products/neutron` | |
| `/atomicos_page/atomicos.html` | `/platform/atomicos` | Platform not product |
| `/atomicos.html` | `/platform/atomicos` | |
| `/atomo-int_page/int.html` | `/platform/asnn-sdk` | AI/ASNN content |
| `/airowl_page/airowl.html` | `/contact` | Discontinued product; contact for legacy |
| `/about_page/about.html` | `/company/about` | |
| `/about.html` | `/company/about` | |
| `/presskit_page/press.html` | `/press-kit` | |
| `/press.html` | `/press-kit` | |
| `/carrier_page/carrier.html` | `/company/careers` | Fix typo URL |
| `/carrier.html` | `/company/careers` | |
| `/careers/` | `/company/careers` | OG URL mismatch |
| `/support_page/support.html` | `/contact` | Support → contact hub |
| `/blogs/blogs.html` | `/resources/insights` | Blog → insights |
| `/news/index.html` | `/newsroom` | |
| `/news/` | `/newsroom` | |

## User Journeys

### Enterprise Customer
Home → Problem/Platform → Industry Solution → Product → Case Study → Contact (Plan a Deployment)

### Investor
Home → Vision → Platform → Proof → Founder Vision → Recognition → Contact (Discover the Vision)

### Developer
Home → Platform → ASNN SDK → Documentation → AI Engineer Program → Contact (Build with Atomo)

### Partner / SI
Home → Platform → Solutions → Products → Contact (Partner with Atomo)

### Candidate
Home → Founder/Leadership → Careers → Contact (Join the Mission)

### Media
Home → Newsroom → Press Kit → Contact (Media inquiry)
