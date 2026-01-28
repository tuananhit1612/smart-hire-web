# Master Design System

**Target:** SmartHire - Recruitment Platform
**Domain:** Job Board/Recruitment
**Style:** Soft UI Evolution

## 1. Core Principles
-   **Soft Depth:** Use subtle multi-layer shadows instead of harsh borders.
-   **Rounded Aesthetic:** Radius 10px-12px for modern, friendly feel.
-   **Accessibility First:** WCAG AA+ contrast ratio (4.5:1 min).
-   **Motion:** Smooth 200-300ms transitions for all interactions.

## 2. Color Palette (Recruitment/Professional)
| Token | Hex | Role |
| :--- | :--- | :--- |
| **Primary** | `#0369A1` | Brand identity, primary buttons |
| **Secondary** | `#0EA5E9` | Accents, secondary actions |
| **Success/CTA**| `#22C55E` | "Apply Now", "Hired", Success states |
| **Background** | `#F8FAFC` | Main app background (Slate-50) |
| **Surface** | `#FFFFFF` | Card backgrounds |
| **Text Main** | `#0F172A` | Primary text (Slate-900) |
| **Text Muted** | `#64748B` | Secondary text (Slate-500) |

## 3. Typography
-   **Font Family:** `Geist Sans` (System), `Geist Mono` (Code)
-   **Scale:**
    -   H1: `2.5rem` (40px) / Bold
    -   H2: `2rem` (32px) / Semibold
    -   Body: `1rem` (16px) / Regular

## 4. Effects
-   **Shadows:**
    -   `shadow-sm`: `0 2px 4px rgba(0,0,0,0.05)`
    -   `shadow-md`: `0 4px 6px -1px rgba(0,0,0,0.1)`
    -   `shadow-soft`: `0 10px 15px -3px rgba(0,0,0,0.08)`
-   **Radius:**
    -   Cards: `rounded-xl` (12px)
    -   Buttons: `rounded-lg` (8px)

## 5. Anti-Patterns (Avoid)
-   Total Flat Design (needs subtle depth)
-   Harsh black borders (use Slate-200)
-   Slow animations (>400ms)
-   System alerts for non-critical errors (use Toasts)
