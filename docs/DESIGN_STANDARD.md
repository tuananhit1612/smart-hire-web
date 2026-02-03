# SmartHire Design Standard (Friendly/Modern)

> **Philosophy:** "Friendly Intelligence."
> SmartHire is approachable, optimistic, and human-centric. We use AI to connect people, not just process data.
> Our design should feel **alive** (animations), **trustworthy** (blue/white), and **growing** (green).

---

## 1. Visual Identity

### Color Palette (Single Theme: Light/White)
| Role | Color | Hex | Tailwind | Usage |
|:---|:---|:---|:---|:---|
| **Primary** | **Sky Blue** | `#0369A1` | `bg-sky-700` | Headlines, trust indicators, primary links. |
| **Secondary** | **Light Sky** | `#0EA5E9` | `bg-sky-500` | Gradients, hover states, secondary actions. |
| **Accent / CTA** | **Growth Green** | `#22C55E` | `bg-green-500` | **Primary Buttons**, "New" badges, success states. |
| **Background** | **Pure White** | `#FFFFFF` | `bg-white` | **Strictly White** page backgrounds. |
| **Text** | **Deep Sky** | `#0C4A6E` | `text-sky-900` | High contrast text (No Slate/Gray). |

### Typography (Localized)
-   **Primary Font:** `Be Vietnam Pro` (Optimized for Vietnamese & readability).
    -   *Usage:* All UI text, headings, body.
    -   *Variable:* `var(--font-be-vietnam)` / `font-sans`.
-   **Display Font:** `Orbitron` (Tech/AI/Numbers).
    -   *Usage:* Large numbers (`1M+`), AI badges.
    -   *Variable:* `var(--font-orbitron)`.

### Global Animation
-   **Particle Background:** A site-wide `<ParticleBackground />` component resides in `layout.tsx`.
    -   *Effect:* Floating colorful confetti/particles.
    -   *Rule:* Backgrounds must be `transparent` or `bg-white` (solid) where necessary. **Do NOT use dark backgrounds.**

---

## 2. Component Guidelines

### Buttons
-   **Shape:** Fully rounded (`rounded-full`).
-   **Primary:** Gradient Blue/Sky or Solid Green. Shadow `shadow-lg`.
-   **Hover:** SCALE UP (`hover:scale-105`) to feel tactile.
-   **Secondary:** White background with Sky border (`border-sky-200`).

### Cards & Containers
-   **Shape:** Softer corners (`rounded-2xl` or `rounded-3xl`).
-   **Material:** Glassmorphism or Solid White.
    -   *Style:* `bg-white/80 backdrop-blur-xl border-white/40` OR `bg-white border-sky-100`.
-   **Shadow:** Soft, diffuse shadows (`shadow-xl shadow-blue-900/5`).
-   **NO DARK MODE:** Do not implementations `dark:` modifiers. The site is strictly light.

---

## 3. Localization (Vietnamese)
-   **Tone:** Professional but friendly (Thân thiện, Chuyên nghiệp).
-   **Formatting:** Use sentence case for headers.
-   **Terms:**
    -   *AI Matching* -> "Kết nối AI" or keep "AI Matching".
    -   *Hiring* -> "Tuyển Dụng".
    -   *Get Started* -> "Bắt Đầu Ngay".

---

## 4. Developer Rules
1.  **Z-Index:** The Particle Background is `z-0`. Content must be `z-10` or higher.
2.  **No Sharps:** Avoid sharp corners (`rounded-none` or `rounded-sm`). Use `rounded-lg` minimum.
3.  **Alive:** Every interactive element should have a micro-interaction (hover scale, color shift, or glow).

---

## 5. Animation & Dynamics (High Priority)
> **Goal:** The website must feel **"Alive"** and **"Wow"**. Static interfaces are unacceptable.

### Principles
-   **Prioritize Movement:** Prefer animated transitions over static displays.
-   **Canvas First:** Use HTML5 Canvas for complex backgrounds or high-performance effects (like the Global Particles).
-   **Libraries:**
    -   Use **Framer Motion** for UI transitions (fade-in, slide-up, stagger).
    -   Use **Three.js / React Three Fiber** if 3D elements are required.
-   **Micro-interactions:** Buttons, cards, and links **MUST** react to user input (Hover, Click, Focus).
-   **Flow:** Data and gradients should appearing to be "flowing" or "breathing" to represent AI intelligence.
