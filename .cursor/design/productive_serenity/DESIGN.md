---
name: Productive Serenity
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#424754'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 12px
---

## Brand & Style
The brand personality is rooted in **clutter-free productivity** and **calm efficiency**. It targets professionals and students who require a mental "external hard drive" that feels organized and quiet, rather than loud or demanding. 

This design system utilizes a **Modern Minimalist** style. It focuses on functional clarity, high-quality typography, and purposeful whitespace. The emotional response should be one of "reduced cognitive load"—the user should feel in control of their tasks the moment the app opens. Visual noise is eliminated by replacing heavy borders with soft tonal shifts and subtle elevation.

## Colors
The palette is centered around a **Calming Blue** primary, used for critical actions and progress indicators. A secondary **Indigo** is reserved for subtle accents or categorized tags to provide depth without breaking the calm aesthetic.

- **Primary (#3B82F6):** Used for the main Call-to-Action (CTA), active states, and primary brand moments.
- **Surface (#F9FAFB):** The global background color, providing a soft, non-reflective canvas that reduces eye strain.
- **On-Surface (#111827):** High-contrast "Near-Black" for primary text to ensure maximum legibility.
- **Muted (#6B7280):** A mid-tone gray for secondary metadata, timestamps, and placeholder text.

## Typography
The system uses **Inter** exclusively to leverage its systematic, utilitarian nature and exceptional legibility at small sizes. 

- **Headlines:** Use a slightly tighter letter-spacing (`-0.01em` to `-0.02em`) to give titles a more "designed" and modern feel.
- **Body:** Standard spacing for maximum readability.
- **Labels:** Used for task categories or status badges, utilizing a medium weight and slight tracking to differentiate them from body text.

## Layout & Spacing
This design system uses a **Fluid Grid** model with a specific focus on vertical rhythm. 

- **Mobile Layout:** A 4-column grid with 20px side margins. 
- **Spacing Logic:** All spacing must be a multiple of 4px. Use `md` (16px) for standard internal padding within cards and `lg` (24px) for separating logical sections.
- **Kanban Horizontal Spacing:** On mobile, Kanban columns should use a "peek-ahead" layout where the next column is partially visible (12px-16px offset) to indicate horizontal scrollability.

## Elevation & Depth
Hierarchy is established through **Ambient Shadows** and **Tonal Layers** rather than heavy lines.

- **Level 0 (Flat):** The main background (`#F9FAFB`).
- **Level 1 (Low Elevation):** Kanban cards and list items. Use a very soft shadow: `0 2px 4px rgba(17, 24, 39, 0.05)`.
- **Level 2 (Floating):** Primary CTAs (like "Add Task") and active Modals. Use a more pronounced but still diffused shadow: `0 10px 15px rgba(17, 24, 39, 0.1)`.
- **Visual Distinction:** Surfaces use white (`#FFFFFF`) against the off-white background to create a subtle "lift" effect.

## Shapes
The shape language is **Rounded**, conveying a friendly and approachable feel. 

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) radius.
- **Container Elements:** Cards, Kanban boards, and Modals use a `rounded-lg` (16px) radius to create a soft, contained look.
- **Selection Indicators:** Checkboxes use a slightly softened corner (4px) rather than a sharp square to remain consistent with the overall system.

## Components

### Buttons
- **Primary:** Solid `#3B82F6` with white text. 16px corner radius.
- **Ghost:** No background, primary color text. Used for secondary actions like "Cancel" or "Clear all".

### Cards & Kanban
- **Task Cards:** White background, Level 1 shadow, 16px padding. 
- **Kanban Columns:** Background color should be slightly darker than the main surface (e.g., `#F3F4F6`) with a 16px corner radius to group tasks visually.

### Form Inputs
- **Text Fields:** Subtle light gray border (`#E5E7EB`) that transitions to Primary Blue on focus. 
- **Checkboxes:** Custom styled. When checked, they should fill with the Primary color and trigger a slight strikethrough on the associated task text.

### Feedback & Chips
- **Status Chips:** Small, rounded pills with low-opacity background tints (e.g., a "High Priority" chip with a light red background and dark red text).
- **Empty States:** Use center-aligned typography with muted gray colors and plenty of whitespace to maintain the "calm" brand promise.