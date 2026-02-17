# PERABOX Performance Guide

## Target Metrics (Lighthouse)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **LCP** | < 2.5s | Lighthouse → Performance → Largest Contentful Paint |
| **CLS** | < 0.1 | Lighthouse → Performance → Cumulative Layout Shift |
| **TBT** | < 150ms | Lighthouse → Performance → Total Blocking Time |
| **FCP** | < 1.8s | Lighthouse → Performance → First Contentful Paint |

## How to Measure

```bash
# Chrome DevTools
1. Open DevTools → Lighthouse tab
2. Select "Performance" category
3. Choose "Mobile" device
4. Click "Analyze page load"

# CLI (headless)
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse.json
```

## Optimization Checklist

### Images
- [x] Use `next/image` with automatic `srcset` generation
- [x] Set `loading="lazy"` on below-fold images
- [x] Set `loading="eager"` + `priority` on hero/LCP image
- [x] Use WebP/AVIF via Next.js automatic optimization
- [x] Set explicit `width`/`height` or `fill` to prevent CLS

### Fonts
- [x] Use `next/font/google` with `display: 'swap'`
- [x] Preload critical fonts (`preload: true`)
- [x] Subset: `subsets: ['latin']` only
- [x] Preconnect to font origins in `<head>`

### Animations
- [x] Use `transform` + `opacity` only (GPU-composited)
- [x] Set `will-change: transform` only during animation
- [x] Remove `will-change` after animation completes
- [x] Use `requestAnimationFrame` for parallax (no layout thrash)
- [x] Use `passive: true` on scroll listeners
- [x] IntersectionObserver for reveals (no continuous JS offscreen)
- [x] `prefers-reduced-motion` respected everywhere

### Bundle
- [x] Framer Motion: ~40KB gzipped (tree-shakeable)
- [x] Lenis: ~3KB gzipped (dynamically imported)
- [x] Animation logic target: < 80KB gzipped total
- [x] Code-split: Lenis loaded via `import()` only when enabled

## GSAP vs Framer Motion

| | Framer Motion | GSAP |
|---|---|---|
| **Size** | ~40KB gz | ~25KB gz |
| **React ergonomics** | ★★★★★ | ★★★ |
| **Timeline complexity** | ★★★ | ★★★★★ |
| **Best for** | Component-level animations | Cinematic sequences |

Recommendation: Use **Framer Motion** for PERABOX (React-first, declarative API). Consider GSAP only if timeline-heavy marketing pages are needed.
