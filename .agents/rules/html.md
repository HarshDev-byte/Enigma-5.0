---
trigger: always_on
---

# HTML & Web Experience Standards

## Core Principle

Build websites that feel **premium, modern, immersive, intentional, memorable, and conversion-focused**. Balance visual impact with accessibility, SEO, performance, responsiveness, maintainability, and usability.

Target quality: **hackathons, startups, SaaS, product launches, agencies, AI/tech showcases, portfolios, and premium business websites.**

**Advanced does not mean excessive. Every visual, animation, and interaction must have a purpose.**

## Semantic HTML5

* Always prefer semantic HTML5 for accessibility, SEO, and structure.
* Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<details>`, and `<summary>` where appropriate.
* Prefer semantic elements over unnecessary `<div>` elements.
* Use `<button>` for actions and `<a>` for navigation.
* Never use `<div>` or `<span>` as interactive elements when native HTML is appropriate.
* Maintain a logical `<h1>`–`<h6>` hierarchy.
* Choose elements based on meaning, not styling.
* Use ARIA only when native HTML cannot provide the required semantics.
* All interactive elements must be keyboard accessible and have meaningful accessible names.

## Accessibility

Advanced visuals must **never compromise accessibility**.

Ensure:

* Keyboard navigation and logical tab order
* Visible focus states
* Sufficient color contrast
* Meaningful image `alt` text
* Accessible forms, buttons, and links
* Screen-reader-friendly content
* No essential information conveyed only through animation
* No important content hidden exclusively behind motion

Prefer native HTML accessibility over unnecessary ARIA.

**Accessibility is mandatory.**

## Reduced Motion

**Every animation and motion effect MUST respect `prefers-reduced-motion`.**

When reduced motion is enabled, disable or significantly simplify:

* Parallax
* Large transforms
* Zooming
* Spinning
* Cursor-following effects
* Scroll-linked animations
* Animated backgrounds
* Excessive transitions
* Auto-playing motion

Preserve all content and functionality. Never hide important content behind animation.

Use:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

JavaScript motion must also check:

```js
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

Do not execute motion-heavy effects when `reducedMotion` is true.

This applies to CSS, JavaScript, Canvas, WebGL, third-party animation libraries, cursor effects, parallax, video-driven motion, and backgrounds.

## Visual Experience

Create strong visual hierarchy using:

* Large confident typography
* Clear hierarchy
* Intentional whitespace
* Strong contrast
* Consistent spacing
* Distinct sections
* High-quality imagery and graphics
* Consistent border-radius language
* Subtle depth, gradients, shadows, lighting, layering, and perspective

Avoid generic templates and repetitive card grids unless they improve usability.

Every major section must have a **clear visual purpose**.

## Eye Attraction & Visual Hierarchy

Guide attention naturally using:

* Strong focal points
* Contrast shifts
* Scale changes
* Motion hierarchy
* Directional cues
* Progressive disclosure
* Strategic whitespace
* Dynamic typography
* Image/text relationships
* Lighting and layered backgrounds
* Depth and perspective
* Visual rhythm

Primary CTA must stand out without feeling spammy.

Design the journey as:

**Attention → Curiosity → Understanding → Trust → Action**

Prioritize:

1. Primary content
2. Supporting content
3. Secondary interactions
4. Decorative elements

Do not make every element compete for attention.

## Scroll-Driven Experiences

Use scrolling as an **interaction and storytelling mechanism**.

Where appropriate, implement:

* Scroll-triggered reveals
* Fade/slide animations
* Staggered entrances
* Parallax
* Sticky/pinned storytelling
* Scroll-progress indicators
* Horizontal scrolling
* Image/text transformations
* Scale and opacity transitions
* Layered depth
* Sequential storytelling
* Scroll-aware navigation

Motion must feel coherent and intentional.

**Do not animate everything.**

Motion should guide attention and communicate hierarchy.

## Premium Motion & Micro-Interactions

Prefer:

* `transform`
* `opacity`
* GPU-friendly properties
* Smooth easing
* Spring-like motion where appropriate
* Short transitions
* Staggered animations
* Carefully timed section transitions

Avoid excessive duration, bouncing, spinning, constant movement, distracting effects, and animations that delay content access.

Use micro-interactions where they improve usability or feedback:

* Button hover/press states
* Responsive or magnetic CTAs where appropriate
* Navigation transitions
* Card depth
* Image hover effects
* Icon transformations
* Input focus states
* Cursor interactions
* Loading/success/error feedback
* Scroll-aware navigation

Interactions should feel responsive without becoming distracting.

## Hero Sections

Immediately communicate:

1. What the product/company/project is
2. Why it matters
3. What the user should do next

Where appropriate use:

* Large typography
* Strong composition
* Animated visuals
* Interactive demonstrations
* Dynamic backgrounds
* 3D/pseudo-3D
* Video
* Scroll cues
* Layering
* Strong CTA hierarchy

Create an immediate impression **without sacrificing clarity or performance**.

## Storytelling

For products, startups, and hackathons, structure the page as a visual story:

**Hook → Problem → Insight → Solution → How It Works → Technology → Evidence → Impact → CTA**

Use transitions to connect sections into one narrative.

Avoid making every section an isolated card.

## Interactive Sections

Prefer meaningful interactive demonstrations over static explanations where appropriate:

* Product previews
* Before/after comparisons
* Dashboards
* Architecture diagrams
* Data visualizations
* Feature explorers
* Maps
* Timelines
* 3D product views
* AI workflow visualizations
* Hover-based discovery

**Never add interaction solely because it looks impressive.**

## Navigation

Navigation must remain intuitive and usable.

Consider:

* Sticky navigation
* Transparent-to-solid transitions
* Scroll-aware navigation
* Active section indicators
* Smooth anchors
* Mobile navigation animations
* Compact scrolled states

All navigation must remain keyboard accessible.

## Responsive Design

Create excellent experiences across mobile, tablet, laptop, desktop, and large displays.

Do not simply shrink desktop layouts.

Adapt:

* Layout
* Typography
* Spacing
* Interactions
* Animations
* Navigation
* Images
* Content density

Complex desktop interactions should have simpler mobile equivalents.

**Mobile is a first-class experience.**

## 8px Spacing System

Use an **8px grid system throughout the website**.

Preferred values:

`8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px, 128px`

Apply consistently to margins, padding, sections, gaps, typography, buttons, cards, navigation, and forms.

Avoid arbitrary values such as `13px`, `19px`, `27px`, or `37px` unless technically or visually necessary.

Use `4px` only for fine details such as icon alignment, borders, and micro-spacing.

Maintain consistent vertical rhythm and reuse spacing tokens.

```css
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-7: 56px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 96px;
  --space-11: 128px;
}
```

**If a value can use the 8px grid, use it instead of inventing a new value.**

## CSS Variables & Theme System

**All colors MUST use CSS custom properties.**

Never scatter hardcoded colors throughout components. Use semantic tokens.

```css
:root {
  --color-background: #fff;
  --color-surface: #f8f9fa;
  --color-surface-elevated: #fff;
  --color-text-primary: #111;
  --color-text-secondary: #666;
  --color-text-muted: #888;
  --color-border: #e5e5e5;
  --color-primary: #000;
  --color-primary-hover: #222;
  --color-accent: #6366f1;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-overlay: rgb(0 0 0 / 50%);
}
```

Use:

```css
.card {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

Themes must be switchable through design tokens:

```css
[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-surface: #141414;
  --color-surface-elevated: #1c1c1c;
  --color-text-primary: #fff;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-border: #27272a;
}
```

Rules:

* Use semantic names such as `--color-text-primary`, not `--black`.
* Centralize colors.
* Ensure sufficient contrast in every theme.
* Reuse existing tokens before creating new ones.
* Add genuinely new colors to the token system.
* Use variables for gradients and colored shadows where practical.
* Keep hover, focus, active, disabled, loading, success, warning, and error states consistent.

**Changing the theme should require changing design tokens, not component styles.**

## Performance

Advanced design must remain fast.

Prioritize:

* Fast initial rendering
* Optimized/lazy-loaded images
* Efficient animations
* Minimal layout shifts
* GPU-friendly transforms
* Code splitting where appropriate
* Minimal unnecessary JavaScript
* Efficient event handling

Prefer:

* `IntersectionObserver`
* `requestAnimationFrame`
* CSS animations/transitions
* GPU-friendly transforms

Avoid expensive scroll handlers and continuously running effects when elements are not visible.

## SEO

Use semantic HTML to create a clear document structure.

Ensure:

* One meaningful primary `<h1>`
* Logical heading hierarchy
* Descriptive `<title>`
* Useful meta description
* Descriptive link text
* Meaningful `alt` attributes
* Crawlable navigation
* Descriptive URLs where applicable
* Structured data where appropriate

Never sacrifice semantic structure for visual styling.

## Design Quality

Before implementation, identify:

* Visual identity
* Primary focal point
* User journey
* Most important interaction
* Primary CTA
* Sections that deserve animation
* Sections that should remain static for contrast
* Core storytelling moments

Use **visual restraint**.

A premium website is not one with the most effects. It is one where **every animation, transition, interaction, and visual element has a reason to exist.**

## Final Quality Checklist

Before completion verify:

* [ ] First 5 seconds are visually compelling
* [ ] Purpose is immediately understandable
* [ ] Semantic HTML5 is used correctly
* [ ] Heading hierarchy is logical
* [ ] Interactive elements are accessible
* [ ] Keyboard navigation works
* [ ] Focus states are visible
* [ ] Contrast is sufficient
* [ ] Scrolling feels intentional
* [ ] Motion guides attention
* [ ] Visual hierarchy is clear
* [ ] Site feels distinctive, not template-based
* [ ] Interactions feel responsive
* [ ] 8px spacing system is followed
* [ ] Colors use CSS variables
* [ ] Theme switching uses design tokens
* [ ] Performance is acceptable
* [ ] Mobile experience is excellent
* [ ] Reduced-motion mode works
* [ ] Scroll animations simplify/disable with reduced motion
* [ ] Content remains usable without animation
* [ ] SEO fundamentals are implemented
* [ ] CTA is clear and natural

# Final Standard

The website should feel:

**Premium + Immersive + Fast + Accessible + Responsive + Memorable + Conversion-focused**

Create an **award-level, technically polished experience** without sacrificing accessibility, semantics, performance, usability, or maintainability for visual effects.
