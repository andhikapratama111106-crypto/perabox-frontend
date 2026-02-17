# PERABOX Animation System Guide

## Quick Start

```bash
npm install   # Install framer-motion & lenis
npm run dev   # Visit http://localhost:3000/animations for demo
```

## When to Use What

| Component | When |
|-----------|------|
| `<Reveal>` | Scroll-triggered fade/slide for any section |
| `<ServiceCard>` | Service listing with hover lift + staggered reveal |
| `<ParallaxImage>` | Background images with depth effect |
| `<AnimatedHero>` | Hero section with split-line headlines |
| `<AnimatedNavbar>` | Sticky navbar with blur-on-scroll |
| `<BtnPrimary>` | CTA buttons with ripple + press animation |

## Adding a New Animated Section

```tsx
import { Reveal } from '@/components/Reveal/Reveal';

function NewSection() {
  return (
    <section className="py-20">
      <Reveal direction="up">
        <h2>Title</h2>
      </Reveal>
      <Reveal direction="up" delay={0.15}>
        <p>Description text</p>
      </Reveal>
    </section>
  );
}
```

### Staggered Grid

```tsx
{items.map((item, i) => (
  <Reveal key={i} direction="up" staggerDelay={100} staggerIndex={i}>
    <Card {...item} />
  </Reveal>
))}
```

## Reduced Motion Support

All components auto-detect `prefers-reduced-motion: reduce`. When active:
- Reveal: instant fade (no movement)
- Parallax: disabled (static image)
- Ripple: hidden
- Navbar: no blur transition

### Manual Override
Add `data-no-animations` attribute to any parent element:

```html
<div data-no-animations>
  <Reveal>This will appear instantly</Reveal>
</div>
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| **Jank on scroll** | Ensure only `transform`+`opacity` animated. Check DevTools → Rendering → Paint flashing |
| **CLS from reveals** | Set explicit `min-height` on containers or use `once={true}` |
| **Flash of unstyled** | Hero image: `loading="eager"` + `priority`. Fonts: `display: 'swap'` |
| **Parallax flicker** | Increase `clamp` range or reduce `multiplier` |
| **Hydration error** | Ensure hooks use `typeof window !== 'undefined'` guard |

## Accessibility Checklist

- [x] `prefers-reduced-motion` respected in all components
- [x] `data-no-animations` override available
- [x] Button ripple uses `aria-hidden="true"`
- [x] Buttons have `aria-pressed` when toggleable
- [x] `focus-visible` ring visible (2px, primary color, offset)
- [x] Contrast ratio ≥ 4.5:1 for focus indicators
- [x] Mobile menu: focus trap + Escape to close
- [x] Hamburger: `aria-expanded` + `aria-controls`
- [x] Images have `alt` text; decorative images use `aria-hidden`
- [x] No content hidden behind animations without JS fallback
