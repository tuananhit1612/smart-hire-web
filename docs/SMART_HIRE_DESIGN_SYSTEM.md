# SmartHire Design System

---
### 🎯 Nguyên Tắc Chung

1. **Mỗi animation phải có mục đích** — Dẫn dắt mắt người dùng hoặc truyền tải thông tin
2. **Subtle > Flashy** — Premium = tinh tế, không phô trương
3. **Performance first** — Ưu tiên `transform` và `opacity` (GPU-accelerated), tránh animate `width`/`height`/`top`/`left`
4. **Consistent timing** — Dùng cùng easing curve xuyên suốt app, tránh mix nhiều kiểu
5. **Design sáng tạo** - Không rập khuôn, hãy sáng tạo nhưng vẫn đảm bảo tính thẩm mỹ và chuyên nghiệp, người dùng nhìn vào đủ wow, smart và không biết sử dụng AI. 
6. **Animation & Design & UI/UX must be same as the design system** - Tuyệt đối không được làm khác với design system, nếu không biết cách làm thì hỏi lại, không được tự ý làm khác đi.
7. **Animation & Design & UI/UX phải hiện đại, sáng tạo, mới mẻ, theo xu hướng 2026** - tuyệt đôi không dùng các animation cũ kỹ, nhàm chán, lỗi thời.
8. **Hạn chế dùng icon** - Chỉ dùng icon khi thật sự cần thiết, ưu tiên dùng hình ảnh,gif (có thể để trống nhắc coder tự thêm vào) + text để thể hiện thông tin.

## 1. Color Tokens

### 1.1 Core Palette

| Token | Light Mode | Dark Mode | Usage |
|:---|:---|:---|:---|
| **Page Background** | `#FFFFFF` (transparent — particle bg shows through) | `#141A21` (transparent — particle bg shows through) | Root page background. Sections leave this transparent. |
| **Heading** | `#1C252E` | `#FFFFFF` | H1, H2, H3, card titles, bold stats |
| **Body Text** | `#637381` | `#C4CDD5` | Paragraphs, descriptions, feature text |
| **Muted Text** | `#919EAB` | `#637381` | Captions, labels, metadata |
| **Ultra Muted** | `#C4CDD5` | `#919EAB` | Footnotes, role labels, ratings text |

### 1.2 Accent Colors

| Token | Value | Usage |
|:---|:---|:---|
| **Primary Green** | `#22C55E` | Brand accent — badges, step numbers, icon highlights, hover states, gradient start |
| **Green Dark** | `#16A34A` / `#118D57` | Gradient end for badges, stat highlight text in light mode |
| **Green Mid** | `#10B981` | Secondary gradient stop in hero text, CTA buttons |
| **Yellow Accent** | `#FFAB00` | Star ratings, warm accent, hero gradient end, CTA section decoration |
| **Yellow Light** | `#FFD666` | Gradient end for yellow icon backgrounds |

### 1.3 Surface & Border Colors

| Token | Light Mode | Dark Mode | Usage |
|:---|:---|:---|:---|
| **Card Background** | `bg-white` or `bg-white/70` (glassmorphism) | `bg-[#1C252E]` or `bg-white/[0.04]` (glassmorphism) | Card surfaces |
| **Card Border** | `border-[rgba(145,158,171,0.12)]` | `border-white/[0.08]` or `border-[rgba(145,158,171,0.12)]` | Card borders |
| **Card Border Hover** | `border-[rgba(145,158,171,0.32)]` or `border-[#22C55E]/30` | `border-[rgba(145,158,171,0.32)]` or `border-[#22C55E]/20` | Card hover state |
| **Subtle BG** | `bg-[rgba(145,158,171,0.04)]` / `bg-[#F4F6F8]` | `bg-[rgba(145,158,171,0.08)]` | Badges, stat icon containers, subtle areas |
| **Divider** | `border-[rgba(145,158,171,0.2)]` | `border-[rgba(145,158,171,0.2)]` / `border-white/10` | Horizontal dividers |

### 1.4 Footer Colors (Always Dark)

| Element | Value |
|:---|:---|
| **Footer BG** | `bg-[#141A21]` (solid dark in both modes) |
| **Logo / Brand** | `text-white` |
| **Column Headers** | `text-white/40` `uppercase tracking-wider text-xs` |
| **Links** | `text-white/80` → hover `text-white` |
| **Copyright** | `text-white/40` |
| **Social Icons** | `text-white/40` → hover `text-white` |
| **Border** | `border-white/10` |

---

## 2. Typography

### 2.1 Font Family
- **Body font**: `font-body` (defined in CSS / Tailwind config)
- **Fallback**: System default sans-serif stack

### 2.2 Heading Hierarchy

| Element | Size | Weight | Example Classes |
|:---|:---|:---|:---|
| **H1 (Hero)** | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | `font-bold` | `tracking-tight leading-[1.15]` |
| **H2 (Section)** | `text-3xl md:text-4xl` or `text-3xl md:text-5xl` | `font-bold` | `mb-4` |
| **H3 (Card Title)** | `text-lg` to `text-xl` | `font-semibold` or `font-bold` | — |
| **H4 (Subsection)** | `text-sm` or `text-xs` | `font-semibold` or `font-bold` | `uppercase tracking-wider` |

### 2.3 Body Text

| Type | Size | Color | Example |
|:---|:---|:---|:---|
| **Large body** | `text-lg md:text-xl` | `text-[#637381] dark:text-[#C4CDD5]` | Section subtitles |
| **Normal body** | `text-base` or `text-sm` | `text-[#637381] dark:text-[#C4CDD5]` | Card descriptions |
| **Small / Caption** | `text-xs` | `text-[#C4CDD5]` | Labels, metadata |
| **Overline / Tag** | `text-[11px]` or `text-sm` | `text-[#22C55E]` | `font-bold tracking-wider uppercase` — above section headings |

### 2.4 Hero Gradient Text
```css
/* Gradient text for hero accent line */
bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#FFAB00]
bg-clip-text text-transparent
```

---

## 3. Buttons

### 3.1 Primary CTA (Inverted Between Modes)

| Mode | Background | Text | Hover |
|:---|:---|:---|:---|
| **Light** | `bg-[#1C252E]` | `text-white` | `hover:bg-[#1C252E]/90` |
| **Dark** | `bg-white` | `text-[#1C252E]` | `hover:bg-white/90` |

```jsx
<Button className="h-14 px-8 text-base bg-[#1C252E] dark:bg-white text-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none border-0" />
```

### 3.2 Outline/Secondary CTA

```jsx
<Button className="h-14 px-8 text-base border border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:bg-[rgba(145,158,171,0.08)]" />
```

### 3.3 Green Gradient CTA (CTA Section Only)

```jsx
<Button className="h-14 px-8 bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#10b981] hover:to-[#22c55e] shadow-lg shadow-green-500/25 hover:shadow-green-500/40" />
```

### 3.4 Outline with Green Hover (Resume Builder)

```jsx
<Button className="h-12 text-base font-semibold border-[rgba(145,158,171,0.32)] text-[#1C252E] dark:text-white hover:text-[#22c55e] hover:border-[#22c55e]" />
```

### 3.5 Header CTA (Smaller)

```jsx
<Button size="sm" className="bg-[#1C252E] text-white dark:bg-white dark:text-[#1C252E] hover:bg-[#1C252E]/90 dark:hover:bg-white/90 shadow-none" />
```

### 3.6 Common Button Sizes

| Size | Height | Padding |
|:---|:---|:---|
| `sm` | Default | Default |
| `lg` | `h-14` | `px-8` |
| `default` | `h-12` | `px-8` |

---

## 4. Cards

### 4.1 Standard Card (Features, Testimonials)

```jsx
className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl p-6 hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all"
```

- **Border radius**: `rounded-2xl` (16px)
- **Padding**: `p-6`
- **Hover**: border lightens + `shadow-lg`
- **Transition**: `transition-all` or `transition-colors duration-300`

### 4.2 Premium Glassmorphism Card (How It Works)

```jsx
{/* Glow behind card */}
<div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E]/20 via-[#22C55E]/10 to-[#22C55E]/20 rounded-[28px] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

{/* Card */}
<div className="relative backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-white/50 dark:border-white/[0.08] rounded-3xl p-8 md:p-10 text-center transition-all duration-500 group-hover:border-[#22C55E]/30 dark:group-hover:border-[#22C55E]/20 group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)] group-hover:-translate-y-1" />
```

- **Backdrop blur**: `backdrop-blur-xl`
- **Background**: `bg-white/70` (light) / `bg-white/[0.04]` (dark)
- **Border radius**: `rounded-3xl` (24px)
- **Hover**: green glow + green border + translate up

### 4.3 Highlight Feature Card (with Image)

```jsx
className="bg-white dark:bg-[#1C252E] border border-[rgba(145,158,171,0.12)] rounded-2xl overflow-hidden hover:border-[rgba(145,158,171,0.32)] hover:shadow-lg transition-all"
```

- Card header: icon + title + description
- Card body: image with browser chrome dots (red/yellow/green)
- Image hover: `group-hover:scale-[1.02]`

### 4.4 Social Proof Badge (Hero)

```jsx
className="bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.08)] border border-[rgba(145,158,171,0.12)] px-4 py-2 rounded-full"
```

### 4.5 CTA Section Card

```jsx
className="bg-gradient-to-br from-[#22c55e]/10 via-[#10b981]/5 to-[#FFAB00]/10 border border-[#22c55e]/20 rounded-3xl p-12 text-center relative overflow-hidden"
```

- Background blur orbs: `bg-[#22c55e]/10 rounded-full blur-3xl`

---

## 5. Icons

### 5.1 Icon Library
- **Primary**: `lucide-react`
- Common icons: `Search`, `FileText`, `Target`, `MessageSquare`, `Users`, `Rocket`, `Briefcase`, `ArrowRight`, `Star`, `Brain`, `Zap`, `Layers`, `CheckCheck`, `CheckCircle`, `TrendingUp`, `Sparkles`, `Menu`, `X`

### 5.2 Icon Containers

| Variant | Size | Background | Icon Size |
|:---|:---|:---|:---|
| **Green gradient** | `w-12 h-12` | `bg-gradient-to-br from-[#22c55e] to-[#10b981]` + `shadow-lg shadow-green-500/25` | `w-6 h-6 text-white` |
| **Yellow gradient** | `w-12 h-12` | `bg-gradient-to-br from-[#FFAB00] to-[#FFD666]` + `shadow-lg shadow-yellow-500/25` | `w-6 h-6 text-white` |
| **Neutral** | `w-12 h-12` or `w-14 h-14` | `bg-[#F4F6F8] dark:bg-[rgba(145,158,171,0.08)]` | `w-6 h-6 text-[#1C252E] dark:text-white` |
| **Green subtle** | `w-8 h-8` | `bg-[#22c55e]/10` | `w-4 h-4 text-[#22c55e]` |
| **Stat icon** | `w-12 h-12` | `bg-[rgba(145,158,171,0.06)] dark:bg-[rgba(145,158,171,0.1)]` | `w-6 h-6 text-[#1C252E] dark:text-white` |

### 5.3 Border Radius for Icon Containers
- `rounded-xl` (12px) — most common
- `rounded-2xl` (16px) — larger containers
- `rounded-lg` (8px) — small containers

---

## 6. Layout System

### 6.1 Page Structure

```
<div className="relative min-h-screen font-body overflow-x-hidden">
  {/* Fixed particle background */}
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <ParticleBackground showRings={true} />
  </div>

  <main className="flex flex-col items-center w-full relative z-10">
    <HeroSection />
    <FeaturesSection />
    <HighlightFeaturesSection />
    <HowItWorksSection />
    <ResumeBuilderSection />
    <TestimonialsSection />
    <StatsSection />
  </main>
</div>
```

### 6.2 Section Pattern

```jsx
<section className="py-24 relative overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    {/* Section header */}
    <motion.div className="text-center mb-16">
      <h2>...</h2>
      <p>...</p>
    </motion.div>
    {/* Content grid */}
    <div className="grid md:grid-cols-3 gap-6">
      ...
    </div>
  </div>
</section>
```

- **Vertical padding**: `py-24` (standard), `py-16` (compact for stats)
- **Container**: `container mx-auto px-4`
- **Max width**: `max-w-6xl` (for tight sections), default container width otherwise
- **Background**: **transparent** — sections do NOT set their own background (except Footer). Particle background shows through.

### 6.3 Grid Patterns

| Layout | Grid Classes | Usage |
|:---|:---|:---|
| **4-column** | `grid md:grid-cols-2 lg:grid-cols-4 gap-6` | Features |
| **3-column** | `grid md:grid-cols-3 gap-6` or `gap-8` | HowItWorks, Testimonials, Highlights |
| **2-column** | `flex flex-col lg:flex-row items-center gap-12 lg:gap-20` | Resume Builder, Features Grid |
| **4-column stats** | `grid grid-cols-2 md:grid-cols-4 gap-8` | Stats |

### 6.4 Spacing Scale

| Token | Value | Usage |
|:---|:---|:---|
| Section vertical | `py-24` (96px) | Between major sections |
| Section header → content | `mb-16` (64px) or `mb-20` (80px) | Gap after section title |
| Card padding | `p-6` (24px) or `p-8` (32px) | Internal card padding |
| Grid gap | `gap-6` (24px) or `gap-8` (32px) | Between grid cards |
| Text gap | `mb-4` (16px) | Between heading and body text |

---

## 7. Header

### 7.1 Structure

```jsx
<motion.header className="fixed top-0 inset-x-0 z-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      {/* Logo | Nav Links | ThemeToggle + Auth Buttons */}
    </div>
  </div>
</motion.header>
```

### 7.2 Header Behavior
- **Fixed on top**, hides on scroll down, shows on scroll up
- **Auto-show** when scroll position < 50px
- Uses `framer-motion` `useMotionValueEvent` + `useScroll`

### 7.3 Logo

```jsx
<div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
  <span className="text-white font-bold text-lg">S</span>
</div>
<span className="text-[#1C252E] dark:text-white font-bold text-xl">SmartHire</span>
```

### 7.4 Nav Link Styles

| State | Classes |
|:---|:---|
| **Default** | `text-sm font-medium text-[#637381] dark:text-[#919EAB]` |
| **Hover** | `hover:text-[#1C252E] dark:hover:text-white transition-colors` |

### 7.5 Mobile Menu

```jsx
className="bg-white/95 dark:bg-[#141A21]/95 backdrop-blur-xl border-t border-[rgba(145,158,171,0.2)]"
```

---

## 8. Dark / Light Mode

### 8.1 Mode Toggle
- Component: `<ThemeToggle />` in the header
- Mechanism: Tailwind `dark:` class variant (class-based dark mode)

### 8.2 Key Mode Inversions

| Element | Light | Dark |
|:---|:---|:---|
| **Heading text** | `#1C252E` | `white` |
| **Body text** | `#637381` | `#C4CDD5` |
| **Card bg** | `white` | `#1C252E` |
| **Primary CTA bg** | `#1C252E` | `white` |
| **Primary CTA text** | `white` | `#1C252E` |
| **Header backdrop** | `white/95` | `#141A21/95` |
| **Subtle backgrounds** | `rgba(145,158,171,0.04)` | `rgba(145,158,171,0.08)` |
| **Borders** | `rgba(145,158,171,0.12)` | `rgba(145,158,171,0.12)` or `white/[0.08]` |

### 8.3 Elements That Stay Same in Both Modes

| Element | Value |
|:---|:---|
| **Green accent** | `#22C55E` |
| **Yellow accent** | `#FFAB00` |
| **Star fill** | `fill-[#FFAB00] text-[#FFAB00]` |
| **Footer** | Always `bg-[#141A21]` with white text |

---

## 9. Animations & Motion

### 9.1 Library
- **`framer-motion`** for all scroll-triggered and entrance animations

### 9.2 Standard Entrance Animation

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
/>
```

### 9.3 Premium Entrance (Scale + Translate)

```jsx
<motion.div
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
/>
```

### 9.4 Hero Animation

```jsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

- Staggered children with `delay: 0.1`, `0.15`, `0.25`, `0.35`

### 9.5 Scroll Indicator (Bouncing Dot)

```jsx
<motion.div
  animate={{ y: [0, 12, 0] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"
/>
```

### 9.6 Hover Micro-Animations

| Effect | Classes |
|:---|:---|
| **Card lift** | `group-hover:-translate-y-1 transition-all duration-500` |
| **Icon scale** | `group-hover:scale-110 transition-transform duration-500` |
| **Border glow** | `group-hover:border-[#22C55E]/30` |
| **Shadow glow** | `group-hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)]` |
| **Badge rotation** | `rotate-3 group-hover:rotate-6 transition-transform duration-500` |
| **Image zoom** | `group-hover:scale-[1.02] transition-transform duration-500` |
| **Text color on card hover** | `group-hover:text-[#22c55e] transition-colors` |

### 9.7 Easing Presets

| Name | Value | Usage |
|:---|:---|:---|
| **Smooth decel** | `[0.16, 1, 0.3, 1]` | Hero entrance, mockup reveals |
| **Premium spring** | `[0.22, 1, 0.36, 1]` | Card entrances |
| **Default** | `easeInOut` | Background orb pulsing |

---

## 10. Background System

### 10.1 Particle Background (Primary)

- **Component**: `<ParticleBackground showRings={true} />`
- **Position**: `fixed inset-0 -z-10` on the page root
- **Effect**: Animated particles + ring overlays
- **All sections are transparent** — the particle background shows through everywhere except the footer.

### 10.2 Landing Background (Alternative — Not Currently Used)

- **Component**: `<LandingBackground />`
- **Elements**:
  - Base: `bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#0B1120]`
  - Green orb: `rgba(34,197,94,0.12)` — top center, 800px, pulses
  - Blue orb: `rgba(59,130,246,0.08)` — left, 600px, floats
  - Purple orb: `rgba(139,92,246,0.08)` — right, 500px, floats
  - Warm orb: `rgba(251,191,36,0.06)` — bottom, 400px, drifts
  - Dot grid: 32px spacing, opacity 3%
  - Noise SVG overlay: opacity 1.5%
  - Top/bottom vignettes: gradient to `#0B1120`

---

## 11. Shadows

| Token | Value | Usage |
|:---|:---|:---|
| **Card default** | None or `shadow-sm` | Resting state |
| **Card hover** | `shadow-lg` | Standard card hover |
| **Green glow** | `shadow-lg shadow-green-500/25` | Green gradient icon containers |
| **Yellow glow** | `shadow-lg shadow-yellow-500/25` | Yellow gradient icon containers |
| **Premium card glow** | `shadow-[0_20px_60px_-15px_rgba(34,197,94,0.15)]` | Glassmorphism card hover |
| **Mockup shadow** | `shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]` (light) / `rgba(0,0,0,0.4)` (dark) | Resume mockup, persona card |
| **Green step badge** | `shadow-[0_8px_30px_-5px_rgba(34,197,94,0.3)]` | Green gradient number badges |
| **Logo** | `shadow-lg shadow-emerald-500/25` | Header logo box |

---

## 12. Border Radius Scale

| Token | Value | Usage |
|:---|:---|:---|
| `rounded-full` | 9999px | Avatars, pill badges, social proof |
| `rounded-3xl` | 24px | Premium cards, CTA section |
| `rounded-2xl` | 16px | Standard cards, mockups |
| `rounded-xl` | 12px | Icon containers, small cards |
| `rounded-lg` | 8px | Logo box, small elements |
| `rounded-[28px]` | 28px | Card glow overlay (slightly smaller than card) |

---

## 13. Component Catalog

### 13.1 Section Components

| Component | File | Description |
|:---|:---|:---|
| `HeroSection` | `home-page-sections.tsx` | Full-viewport hero with gradient text, CTA buttons, social proof, scroll indicator |
| `FeaturesSection` | `home-page-sections.tsx` | 4-column grid of feature cards with gradient icon containers |
| `HowItWorksSection` | `home-page-sections.tsx` | 3-column grid with glassmorphism cards, green number badges, arrow connectors |
| `HighlightFeaturesSection` | `highlight-features-section.tsx` | 3-column card grid with images + browser chrome dots |
| `ResumeBuilderSection` | `resume-builder-section.tsx` | 2-column layout: text+checklist left, animated resume mockup right |
| `TestimonialsSection` | `home-page-sections.tsx` | 3-column testimonial cards with avatar and stats |
| `StatsSection` | `home-page-sections.tsx` | 4-column stat counters with icon containers |
| `CTASection` | `home-page-sections.tsx` | Gradient CTA card with decorative blur orbs |
| `Footer` | `home-page-sections.tsx` | Always-dark footer with links grid + social icons |

### 13.2 Shared Components

| Component | File | Description |
|:---|:---|:---|
| `Header` | `Header.tsx` | Fixed auto-hide header with logo, nav, theme toggle, auth buttons |
| `ParticleBackground` | `ParticleBackground.tsx` | Animated particle + rings background effect |
| `LandingBackground` | `landing-background.tsx` | Gradient orbs + dot grid background (alternative) |
| `ThemeToggle` | `theme-toggle.tsx` | Dark/Light mode switch |
| `Button` | `ui/button.tsx` | shadcn/ui Button with `primary` and `outline` variants |

---

## 14. Overline / Section Caption Pattern

Used to label sections with a green tag above the H2:

```jsx
<span className="inline-block text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4">
  Quy Trình
</span>
```

Or:

```jsx
<span className="text-[#22c55e] font-bold tracking-wider uppercase text-[11px] mb-3">
  Gây ấn tượng với nhà tuyển dụng
</span>
```

---

## 15. Browser Chrome Decoration

Used inside image containers to simulate a browser window:

```jsx
<div className="h-7 bg-[rgba(145,158,171,0.08)] backdrop-blur-sm border-b border-[rgba(145,158,171,0.12)] flex items-center px-3 gap-1.5 z-10">
  <div className="w-2 h-2 rounded-full bg-red-400/60" />
  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
  <div className="w-2 h-2 rounded-full bg-green-400/60" />
</div>
```

---

## 16. Avatar / Initial Circle Pattern

```jsx
<div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/25">
  T
</div>
```

---

## 17. Skill / Tech Tags

```jsx
<span className="px-2 py-0.5 bg-sky-900/30 text-sky-400 border border-sky-800/50 text-[10px] font-bold uppercase rounded">
  React
</span>
<span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 text-[10px] font-bold uppercase rounded">
  Node.js
</span>
```

---

## 18. Responsive Breakpoints

Uses Tailwind's default breakpoints:

| Prefix | Min Width | Usage |
|:---|:---|:---|
| `sm:` | 640px | — |
| `md:` | 768px | Grid columns, nav visibility |
| `lg:` | 1024px | 4-column grids, 2-column layouts |
| `xl:` | 1280px | — |

---

## 19. Key Design Principles

1. **Monochrome foundation** — `#1C252E` ↔ `#FFFFFF` as the primary axis; all supporting text uses the `#637381` / `#919EAB` / `#C4CDD5` gray scale.
2. **Green accent used sparingly** — Only for badges, step numbers, overlines, icon backgrounds, hover states, and gradients. Never as a large surface color.
3. **Yellow as warm secondary** — Star ratings, hero gradient endpoint, warm decorative orbs. Even more sparingly than green.
4. **CTA buttons invert between modes** — Dark bg + white text in light mode, white bg + dark text in dark mode.
5. **Transparent section backgrounds** — Sections don't set their own background. The global particle/gradient background shows through, creating visual unity.
6. **Footer is always dark** — `bg-[#141A21]` regardless of mode.
7. **Glassmorphism for premium cards** — `backdrop-blur-xl` + semi-transparent background + green glow on hover.
8. **Consistent hover patterns** — Border brightening, shadow deepening, subtle translate-y lift, icon scale.
9. **Scroll-triggered animations** — Every section uses `whileInView` with staggered delays. `viewport={{ once: true }}` so animations only play once.
10. **Premium micro-interactions** — Rotating badges, scaling icons, color-shifting borders, gradient glows.

---

## 20. Animation Philosophy — Note for AI

> [!IMPORTANT]
> **SmartHire phải luôn sử dụng animation sáng tạo, mới mẻ, hiện đại theo xu hướng 2026.**
> Tuyệt đối KHÔNG dùng các animation cũ kỹ, nhàm chán, lỗi thời.
> Mục tiêu: người dùng phải cảm thấy "wow" ngay từ lần đầu nhìn thấy trang.

### ✅ KHUYẾN KHÍCH (Modern 2026)

- **Scroll-driven animations** — Sections reveal, parallax layers, progress-based transforms
- **Spring physics** — Natural easing với `[0.22, 1, 0.36, 1]` hoặc framer-motion spring config
- **Staggered orchestration** — Children animate tuần tự với delay tăng dần (`delay: index * 0.1`)
- **Glassmorphism hover effects** — Glow blur, border color shift, subtle lift (`-translate-y-1`)
- **Micro-interactions** — Icon scale on hover, badge rotation, shimmer overlays, gradient shifts
- **Animated gradients** — Background gradient positions that shift subtly over time
- **Morphing shapes** — Blob transforms, organic curves, dynamic SVG paths
- **3D perspective transforms** — `rotateX`, `rotateY` with `perspective` for card depth
- **Text reveal animations** — Character-by-character, word-by-word, line-by-line reveals
- **Magnetic/cursor-following effects** — Elements that subtly react to mouse position
- **Scroll progress indicators** — Lines, dots, or bars that show scroll position
- **Animated counters** — Numbers that count up when scrolled into view
- **Particle effects** — Subtle floating elements that add depth and movement
- **Lottie/Rive animations** — For complex illustrated animations when needed

### ❌ KHÔNG SỬ DỤNG (Outdated)

- ~~Simple `fadeIn` / `fadeOut` without any other transform~~ — Quá đơn giản, nhàm chán
- ~~`bounce` effect~~ — Lỗi thời, thiếu chuyên nghiệp
- ~~`flash` / `shake` / `pulse` kiểu jQuery~~ — Phong cách 2015
- ~~CSS `@keyframes` spin liên tục cho loader~~ — Thay bằng skeleton hoặc shimmer
- ~~Slide-in từ ngoài viewport mà không có opacity~~ — Trông rẻ tiền
- ~~Animation duration > 1s cho entrance~~ — Quá chậm, gây khó chịu
- ~~Quá nhiều animation cùng lúc~~ — Gây rối mắt, mất focus
- ~~Animation không có `viewport={{ once: true }}`~~ — Replay trông unprofessional

