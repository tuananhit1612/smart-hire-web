# SmartHire Design Standard (UI/UX Pro Max - ULTRA TIER)

> **Status:** **ULTRA PREMIUM** (Official Design Guide - v2.0)
> **Standard:** **Future-Tech Minimalism** (Exaggerated Minimalism + Holographic AI + Luxury)
> **Goal:** Create a platform that feels like it's from 2030. "Wow" at every interaction.

---

## 1. Design Philosophy: "Holographic Intelligence"

We are moving beyond standard "clean SaaS" to an **Immersive AI Experience**. The interface should feel alive, intelligent, and breathable.

**Core Aesthetic:** **Exaggerated Minimalism + Holographic Touches**
-   **Structure:** Massive whitespace, oversized typography (Heading-first), Micro-interactions everywhere.
-   **AI Identity:** Use **"Holographic/Cyberpunk"** aesthetics for AI features (gradients of Violet/Cyan/Deep Blue) against a clean backdrops.
-   **Anti-Pattern:** No dense tables. No "boring" inputs. Everything must have a state transition.

---

## 2. Ultra-Premium Prompts for Developers

Use these prompts to force the AI/Dev to generate top-tier code.

### The "Ultra" Prompt Template
```text
Build a [Page/Component Name] for a distinct AI-Recruitment Platform called "SmartHire Ultra".
Style: Exaggerated Minimalism, Holographic Glassmorphism, Future-Tech.
Stack: React 19, Tailwind CSS 4, Framer Motion (Advanced Stagger/LayoutId), Lucide Icons.
Rules:
1. "Wow" Factor: Use heavy gradients for accents, deep animated shadows, and glass blur.
2. Typography: Massive headings (clamp functions). High contrast.
3. Interaction: Everything reacts to mouse cursor.
4. AI: Use "magical" visual metaphors (glowing borders, animated gradients) for AI sections.
Requirement: [Specific Requirements].
```

### Specific Feature Prompts (Ultra Tier)

| Feature | Ultra Prompt Strategy |
| :--- | :--- |
| **Auth** | "Create a split-screen 'Portal' entrance. Left: Ultra-minimal form with floating labels. Right: Interactive 3D/WebGL-style abstract background (using CSS gradients/blur) that follows mouse movement." |
| **AI Resume** | "Build a 'Holographic Scanner' effect. The resume analysis should feel like a sci-fi scan—progress bars filling with liquid gradients, skills popping with neon badges." |
| **Job Feed** | "Design a 'Flow State' job feed. Cards should have deep glass layers (`backdrop-blur-xl`), tilt effects on hover (`preserve-3d`), and reveal detailed AI matches only on hover." |

---

## 3. Visual Identity (The "Luxury Fintech" Palette)

We are darkening the "Blue" to be more serious and introducing a vibrant "Holographic" spectrum.

### 3.1. Colors

| Role | Hex | Tailwind | Context |
| :--- | :--- | :--- | :--- |
| **Ultra Primary** | `#4F46E5` | `indigo-600` | Deep, confident primary action. |
| **Secondary** | `#6366F1` | `indigo-500` | Hover states, softened accents. |
| **Holographic** | `Gradient` | `from-indigo-500 via-purple-500 to-pink-500` | AI features, "Magic" buttons. |
| **Dark Surface** | `#0B0F19` | `gray-950` | Rich dark mode background (not just black). |
| **Light Surface** | `#F8FAFC` | `slate-50` | Clean, crisp light mode background. |
| **Glass** | `#FFFFFF` | `bg-white/60` | Higher transparency, higher blur (`backdrop-blur-xl`). |

### 3.2. Typography (Impactful)

**Font Pair:** **Orbitron** (for AI efficiency stats) + **Plus Jakarta Sans** (Primary).

-   **Hero Heading:** `text-6xl` to `text-8xl`, `font-bold`, `tracking-tighter`.
-   **Section Title:** `text-3xl`, `tracking-tight`.
-   **Detail:** `text-xs`, `uppercase`, `tracking-widest`, `opacity-60`.

### 3.3. "Pro Max" Effects

**1. The "Deep Glass" Card**
```tsx
className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl"
```

**2. The "Holographic" Border**
```tsx
className="relative p-[1px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
{/* Inner content needs its own bg to mask the center */}
```

**3. The "Aurora" Background (CSS)**
Use generous, blurred blobs of color (`blue-400`, `purple-400`, `pink-400`) fixed in the background with `blur-[100px]` and `opacity-30` to create a moving aurora effect.

---

## 4. Interaction Rules (Make it Alive)

1.  **Parallax effects:** Elements should move at slightly different speeds on scroll.
2.  **Magnetic Buttons:** Buttons should slightly "stick" to the cursor (optional advanced implementation).
3.  **Skeleton Loading:** NEVER show a spinner. Show a shimmering skeleton UI (`animate-pulse` on steroids).

---

## 5. Implementation Checklist (Ultra Tier)

-   [ ] **No boring borders:** Use gradients or subtle shadows instead of harsh 1px gray lines.
-   [ ] **Motion First:** Does the element animate in? Does it animate out?
-   [ ] **Noise/Texture:** Add subtle grain texture (`opacity-5`) to backgrounds for a premium feel.
-   [ ] **Glows:** Key actions must have a subtle glow (`shadow-indigo-500/50`).
-   [ ] **Typography:** Check letter-spacing (`tracking-tight` for headings, `tracking-wide` for captions).
