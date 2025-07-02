# XSwarm Design System

## Overview

The XSwarm Design System defines the visual language, writing style, and design principles that create a cohesive experience across all touchpoints. Our aesthetic blends cyberpunk futurism with developer pragmatism—think "Blade Runner meets Stack Overflow."

## Visual Design

### Color System

#### Brand Colors
```css
--brand-primary: 59 130 246;    /* Blue 500 - Primary actions, links */
--brand-secondary: 139 92 246;  /* Purple 500 - Secondary elements */
--brand-accent: 99 102 241;     /* Indigo 500 - Accent highlights */
```

#### Cyberpunk Terminal Palette
```css
--terminal-green: light-dark(rgb(0 180 0), rgb(0 255 0));
--terminal-amber: light-dark(rgb(200 140 0), rgb(255 176 0));
--terminal-cyan: light-dark(rgb(0 180 180), rgb(0 255 255));
--terminal-magenta: light-dark(rgb(200 0 200), rgb(255 0 255));
--terminal-red: light-dark(rgb(200 0 32), rgb(255 0 64));
--terminal-blue: light-dark(rgb(0 100 200), rgb(0 128 255));
--terminal-purple: light-dark(rgb(120 0 200), rgb(157 0 255));
--terminal-yellow: light-dark(rgb(200 200 0), rgb(255 255 0));
```

#### Semantic Colors
All colors use CSS `light-dark()` function for automatic theme switching:
- **Backgrounds**: Deep blacks (#030712) with subtle gradients
- **Surfaces**: Elevated panels with hover/active states
- **Text**: High contrast with primary/secondary/muted hierarchy
- **Borders**: Subtle dividers that glow on interaction

### Typography

#### Font Families
- **Headlines**: `Orbitron` - Futuristic, uppercase, wide tracking
- **Body Text**: System fonts - Clean, readable, performant
- **Code/Terminal**: `ui-monospace` stack - Authentic terminal feel

#### Type Scale
```css
/* Responsive sizing with clamp() */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.45rem + 0.25vw, 1.875rem);
--text-3xl: clamp(1.875rem, 1.825rem + 0.25vw, 2.25rem);
--text-4xl: clamp(2.25rem, 2.2rem + 0.25vw, 3rem);
```

### Visual Effects

#### Neon Glow System
```css
--glow-intensity: light-dark(0 0 2px, 0 0 10px);
--glow-intense: light-dark(0 0 4px, 0 0 20px);
--glow-extreme: light-dark(0 0 6px, 0 0 30px);
```

#### Signature Effects
- **Glitch Text**: Data corruption aesthetic for emphasis
- **Scanlines**: Animated CRT monitor effect
- **Matrix Rain**: Falling code background animation
- **Circuit Patterns**: SVG textures for depth
- **Holographic Shimmer**: Iridescent gradient overlays

### Component Patterns

#### Trading Cards (Agent Cards)
- **Dimensions**: 280px base width, expandable on hover
- **Structure**: 
  - Cyberpunk portrait with circuit texture
  - Role badge with icon
  - Expandable description
  - MCP tools reveal on interaction
- **Effects**: Z-index management for hover states, neon borders

#### Terminal Windows
```
┌─────────────────────────────────┐
│ ● ● ●          Terminal         │
├─────────────────────────────────┤
│ $ command prompt                │
│ > output with color coding      │
│ _ blinking cursor               │
└─────────────────────────────────┘
```

#### Interactive Elements
- **Buttons**: 3 variants (primary/secondary/ghost) with scale transform
- **Links**: Cyan with magenta hover transition
- **Focus States**: 2px outline with 2px offset
- **Loading**: Skeleton screens with gradient animation

## Writing Style Guide

### Voice & Tone

#### Core Characteristics
- **Brutally Honest**: No marketing fluff, just technical truth
- **Battle-Tested**: Stories from the trenches, not theory
- **Conversational**: Like your smartest dev friend explaining
- **Slightly Cynical**: Acknowledges industry pain points
- **Solution-Focused**: Always leads to actionable insights

#### What We Are
- Technical but accessible
- Experienced but not condescending  
- Honest about AI limitations
- Focused on real developer problems
- Occasionally funny (dry humor)

#### What We're Not
- Sales-pitchy or promotional
- Overly academic or theoretical
- Hype-driven or buzzword-heavy
- Dismissive of alternatives
- Trying too hard to be cool

### Content Structure

#### Blog Post Formula
1. **Hook**: Relatable pain point or bold claim
2. **War Story**: Personal anecdote that illustrates the problem
3. **Deep Dive**: Technical explanation with examples
4. **Practical Solution**: How XSwarm addresses it
5. **Call to Action**: Clear next step

#### Example Opening
```markdown
I just opened my latest Claude API bill and nearly choked on 
my synth-coffee. $892.31. For a month. Building a simple 
e-commerce site.

The worst part? My git history shows 47 different 
implementations of the same email validation function.
```

### Technical Writing Standards

#### Code Examples
- Always show bad pattern first, then improvement
- Include realistic variable names and comments
- Highlight the specific lines that matter
- Keep examples under 20 lines when possible

#### Comparisons
- Use side-by-side layouts
- Highlight key differences visually
- Include metrics (time, cost, lines of code)
- Show realistic scenarios, not toy examples

## Image & Media Guidelines

### Blog Hero Images

#### Specifications
- **Dimensions**: 1200x630px (optimized from 1792x1024)
- **Style**: Studio Ghibli × Cyberpunk × Architectural
- **Mood**: Dramatic, technical, slightly dystopian
- **Format**: WebP with JPEG fallback

#### Visual Elements
- **Lighting**: Blue/purple dominant with neon accents
- **Composition**: Wide cinematic shots, rule of thirds
- **Elements**: 
  - Holographic UI overlays
  - Circuit board patterns
  - Data visualization streams
  - Translucent geometric shapes
  - Floating code snippets
- **Atmosphere**: Misty, depth through layers

#### Generation Prompt Template
```
"[Scene description] in the style of Studio Ghibli meets 
cyberpunk meets architectural visualization. Wide cinematic 
shot with dramatic blue and purple lighting, holographic 
UI elements floating in space, circuit patterns, data streams, 
misty atmospheric depth, translucent geometric shapes. 
Technical and futuristic but with artistic sensibility. 
Dark background with neon accents."
```

### Agent Avatars

#### Character Design
- **Style**: Cyberpunk professionals
- **Distinguishing Features**:
  - Unique hair colors per role
  - Tech accessories (AR glasses, neural interfaces)
  - Professional attire with futuristic elements
- **Pose**: Upper body, slight angle, confident
- **Background**: Abstract tech environment

#### Consistency Rules
- Same lighting setup across all agents
- Consistent eye level and framing
- Matching color temperature
- Unified rendering style

### Icons & Graphics

#### Icon Style
- **Type**: Outlined, 24px base grid
- **Weight**: 2px stroke
- **Style**: Geometric, minimal
- **Effects**: Subtle glow on hover

#### Diagrams
- **Colors**: Limited to brand palette
- **Style**: Technical but approachable
- **Annotations**: Clear, concise labels
- **Animation**: Subtle reveals on scroll

## Design Principles

### 1. Cyberpunk Pragmatism
Futuristic aesthetics grounded in developer reality. Every visual element should feel both high-tech and functional.

### 2. Information Hierarchy
Critical information stands out through contrast, size, and effects. Terminal colors indicate importance levels.

### 3. Motion with Purpose
Animations enhance understanding, not distract. Every transition should feel responsive and intentional.

### 4. Accessible Contrast
All text meets WCAG AA standards. Interactive elements have clear focus states. Color is never the only indicator.

### 5. Performance First
Visual effects use CSS where possible. Images are optimized and lazy-loaded. Animations respect prefers-reduced-motion.

### 6. Consistent Components
Reusable patterns across all interfaces. Components compose predictably. Variations follow clear rules.

### 7. Responsive Scaling
Mobile-first with desktop enhancements. Touch targets meet accessibility standards. Layouts reflow gracefully.

## Implementation Notes

### CSS Architecture
- CSS custom properties for all values
- Tailwind utilities for rapid development
- Component-scoped styles in Astro files
- Semantic color naming (no dark: prefixes)

### Asset Optimization
- WebP for photos with JPEG fallback
- SVG for icons and simple graphics
- Lazy loading for below-fold images
- Responsive images with srcset

### Theme System
- Automatic light/dark via `light-dark()`
- CSS-only implementation (no JS)
- Respects system preferences
- Smooth color transitions

### Performance Budget
- First paint under 1.5s
- Full load under 3s
- 90+ Lighthouse score
- Smooth 60fps animations

## Maintenance

This design system is a living document. Update it when:
- Adding new component patterns
- Changing brand colors or typography
- Evolving the writing voice
- Discovering new best practices

Remember: The goal is consistency without rigidity. The system should enable creativity while maintaining cohesion.