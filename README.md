# aurorus

Lorem ipsum dolor sit amet

# Tailwind CSS Usage Guidelines

## Overview

This document outlines the Tailwind CSS 4 usage patterns and best practices as implemented in our Catalyst UI component library. Catalyst UI leverages advanced Tailwind CSS 4 features to create a cohesive, accessible, and performant design system.

## Key Dependencies

- **Tailwind CSS**: `^4.1.10`
- **@tailwindcss/vite**: `^4.1.10`
- **@headlessui/react**: `^2.2.4` (for accessible primitives)
- **clsx**: `^2.1.1` (for conditional class merging)
- **framer-motion**: `^12.18.1` (for animations)

## Core Patterns

### 1. Structured Style Objects

Catalyst components organize styles into structured objects for maintainability and clarity:

```typescript
const styles = {
  base: [
    // Base styles
    "relative isolate inline-flex items-baseline justify-center gap-x-2",
    // Sizing
    "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)]",
    // Focus management
    "focus:not-data-focus:outline-hidden data-focus:outline-2",
  ],
  solid: [/* variant styles */],
  outline: [/* variant styles */],
  colors: {
    "dark/zinc": [/* color variant */],
    blue: [/* color variant */],
    // ... more colors
  }
};
```

**Benefits:**
- Clear separation of concerns
- Easy maintenance and updates
- Consistent styling patterns
- Better code organization

### 2. Advanced Tailwind CSS 4 Features

#### CSS Custom Properties Integration
```css
/* Tailwind CSS 4 allows seamless CSS variable integration */
"[--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90"
"before:bg-(--btn-bg)"
```

#### Arbitrary Value Calculations
```css
/* Complex calculations for precise spacing */
"px-[calc(--spacing(3.5)-1px)]"
"py-[calc(--spacing(2.5)-1px)]"
"before:rounded-[calc(var(--radius-lg)-1px)]"
```

#### Advanced Selectors
```css
/* Complex pseudo-element and data attribute selectors */
"*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5"
"has-[[data-slot=icon]:first-child]:[&_input]:pl-10"
"sm:*:data-[slot=icon]:size-4"
```

### 3. Dark Mode Implementation

Catalyst implements a systematic approach to dark mode:

```typescript
// Light mode base, dark mode override
"bg-white dark:bg-zinc-900"
"text-zinc-950 dark:text-white"
"border-zinc-950/10 dark:border-white/10"

// Opacity variations for subtle effects
"bg-zinc-950/5 dark:bg-white/5"
"hover:bg-zinc-950/10 dark:hover:bg-white/10"
```

**Best Practices:**
- Always provide dark mode variants for background and text colors
- Use opacity modifiers for subtle effects (`/5`, `/10`, `/15`)
- Maintain consistent opacity scales across components
- Test contrast ratios in both modes

### 4. Component State Management

Catalyst uses Headless UI's data attributes for state management:

```typescript
// Hover states
"data-hover:bg-zinc-950/5"
"group-data-hover:bg-red-500/25"

// Active/pressed states
"data-active:bg-zinc-950/5"

// Disabled states
"data-disabled:opacity-50"
"has-data-disabled:opacity-50"

// Current/selected states
"data-current:*:data-[slot=icon]:fill-zinc-950"

// Focus states
"data-focus:outline-2 data-focus:outline-offset-2"
```

### 5. Responsive Design Patterns

Mobile-first approach with systematic breakpoint usage:

```typescript
// Mobile base, desktop override
"px-4 sm:px-3"
"py-2.5 sm:py-2"
"text-base/6 sm:text-sm/6"
"*:data-[slot=icon]:size-6 sm:*:data-[slot=icon]:size-5"
```

**Responsive Strategy:**
- Default styles target mobile (`base`)
- `sm:` prefix for tablet/desktop (`640px+`)
- Consistent scaling ratios between breakpoints
- Typography scales appropriately with breakpoints

### 6. Accessibility-First Design

Strong focus on accessibility patterns:

```typescript
// Focus management
"focus:outline-hidden" // Hide default focus
"data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500"

// Touch targets
"size-[max(100%,2.75rem)]" // Minimum 44px touch target

// Screen reader support
"forced-colors:outline" // High contrast mode support
"forced-colors:[--btn-icon:ButtonText]"

// Semantic attributes
'aria-hidden="true"'
'data-slot="control"'
```

### 7. Component Composition Patterns

#### Using clsx for Conditional Classes
```typescript
const classes = clsx(
  className, // Allow external overrides
  styles.base,
  outline ? styles.outline : styles.solid,
  !outline && !plain && styles.colors[color ?? "dark/zinc"]
);
```

#### Slot-based Architecture
```typescript
// Components use data-slot for styling hooks
'data-slot="control"'
'data-slot="icon"'
'data-slot="text"'

// Parent components can target slots
"*:data-[slot=icon]:size-5"
"has-[[data-slot=icon]:first-child]:[&_input]:pl-10"
```

### 8. Color System

Catalyst uses a systematic color approach:

```typescript
const colors = {
  // Semantic colors with opacity variations
  red: "bg-red-500/15 text-red-700 group-data-hover:bg-red-500/25",
  // Dark mode variants
  red: "dark:bg-red-500/10 dark:text-red-400 dark:group-data-hover:bg-red-500/20",
  // Neutral colors
  zinc: "bg-zinc-600/10 text-zinc-700 dark:bg-white/5 dark:text-zinc-400"
};
```

**Color Guidelines:**
- Use opacity modifiers for background colors (`/10`, `/15`, `/20`)
- Maintain 3:1 contrast ratio minimum
- Provide both light and dark variants
- Use semantic color names when possible

## Best Practices

### 1. Class Organization
```typescript
// Organize classes logically
const classes = clsx(
  // External classes first
  className,
  
  // Base layout and structure
  "relative flex items-center",
  
  // Typography
  "text-base/6 font-medium",
  
  // Colors and backgrounds
  "bg-white text-zinc-950",
  
  // Borders and shadows
  "border border-zinc-950/10 shadow-sm",
  
  // States (hover, focus, etc.)
  "hover:bg-zinc-50 focus:outline-2",
  
  // Responsive overrides
  "sm:text-sm/6 sm:px-3",
  
  // Dark mode
  "dark:bg-zinc-900 dark:text-white"
);
```

### 2. Performance Considerations
- Use CSS custom properties for theming values that change
- Leverage Tailwind's CSS variable integration
- Minimize class string concatenation in render loops
- Use `clsx` for conditional classes

### 3. Maintainability
- Group related styles in arrays within style objects
- Use descriptive comments for complex selectors
- Extract reusable patterns into shared constants
- Maintain consistent naming conventions

### 4. TypeScript Integration
```typescript
// Define prop types that align with style variants
type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & { className?: string; children: React.ReactNode };
```

## Common Patterns by Component Type

### Form Controls
```css
/* Input styling pattern */
"relative block w-full appearance-none rounded-lg"
"px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)]"
"border border-zinc-950/10 bg-transparent"
"focus:outline-hidden"
"data-invalid:border-red-500"
"dark:border-white/10 dark:bg-white/5"
```

### Interactive Elements
```css
/* Button/clickable styling pattern */
"relative inline-flex items-center justify-center gap-2"
"rounded-lg border px-4 py-2 text-sm font-medium"
"focus:outline-2 focus:outline-offset-2"
"data-hover:bg-opacity-90 data-active:scale-95"
"disabled:opacity-50 disabled:cursor-not-allowed"
```

### Layout Components
```css
/* Container/layout pattern */
"flex min-h-0 flex-col"
"border-zinc-950/5 dark:border-white/5"
"[&>[data-slot=section]+[data-slot=section]]:mt-8"
```

## Migration Guidelines

When creating new components following Catalyst patterns:

1. **Start with structure**: Define the component's layout and spacing
2. **Add typography**: Set appropriate text sizing and line heights
3. **Implement color system**: Use the established color patterns
4. **Add state management**: Include hover, focus, and disabled states
5. **Ensure accessibility**: Add proper focus management and ARIA attributes
6. **Test dark mode**: Verify appearance in both light and dark themes
7. **Validate responsiveness**: Test across different screen sizes
8. **Optimize performance**: Use CSS variables for dynamic values

## Troubleshooting

### Common Issues
1. **Focus rings not appearing**: Ensure `data-focus` attribute is properly set
2. **Dark mode inconsistencies**: Always provide dark mode variants
3. **Touch targets too small**: Use TouchTarget component for interactive elements
4. **Class conflicts**: Use clsx for proper conditional merging
5. **Performance issues**: Avoid dynamic class generation in render loops

This guideline serves as the foundation for maintaining consistency and quality in our Tailwind CSS implementation with Catalyst UI components. 
