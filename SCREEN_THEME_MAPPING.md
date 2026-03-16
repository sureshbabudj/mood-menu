# MoodMenu Screen + Theme Mapping (from `new.html`)

This file maps each App Router screen in `app/` to the corresponding design section in `new.html` and defines the shared theme system.

## Theme Mapping

### Global Theme Tokens
Use these shared tokens from the `new.html` visual language across all screens:

- Primary brand: warm green (`primary`) for actions and highlights
- Surface light: `background-light` (soft off-white)
- Surface dark: `background-dark` (deep green/charcoal)
- Text light mode: slate scale (`slate-900`, `slate-500`)
- Text dark mode: slate inverted (`slate-100`, `slate-400`)
- Border style: low-contrast tinted borders (`border-primary/10`, `border-slate-200`)
- Radius language: rounded-xl/2xl cards and pill chips
- Typography: `Plus Jakarta Sans` style display hierarchy

### Shared UI Motifs

- Sticky translucent top bars: `bg-*/80` + `backdrop-blur-md`
- Elevated CTA buttons with soft shadow: `shadow-primary/20`
- Image-led cards with rounded corners and subtle overlays
- Bottom navigation on mobile, sticky/fixed with blur background
- Chips for mood/cuisine/filter states

## Route-to-Screen Mapping

### 1) Home Discovery

- Route: `app/(main)/page.tsx`
- View: `views/home.tsx`
- `new.html` source: `Home / Mood Discovery` (mobile) and `Home / Mood Discovery (Desktop)`
- Mapping:
  - Hero prompt: "How are you feeling today?"
  - Mood selector tiles (Energetic, Relaxed, Adventurous, Comforted)
  - Cuisine and dietary preferences block
  - Primary CTA: search/discover recipes
  - Mobile bottom nav and desktop top navigation split

### 2) Recipe Results

- Route: `app/(main)/recipes/page.tsx`
- View: `views/recipes.tsx`
- `new.html` source: `Recipe Results`
- Mapping:
  - Sticky header with back action + page title
  - Horizontal filter chip row
  - "Curated for your mood" intro copy section
  - Two-column recipe card grid
  - "Load More Recipes" button
  - Fixed bottom mobile nav

### 3) Recipe Details

- Route: `app/(main)/recipes/[id]/page.tsx`
- View: `views/recipe.tsx` + `components/recipe-details.tsx`
- `new.html` source: `Recipe Details`
- Mapping:
  - Large hero image with top controls overlay
  - Category/difficulty pills on image
  - Recipe title + rating + kcal metadata row
  - Ingredient checklist cards
  - Step-by-step instructions timeline
  - Sticky bottom action button

### 4) Favorites

- Route: `app/(main)/favorites/page.tsx`
- View: `views/favorites.tsx`
- `new.html` source: `Favorites`
- Mapping:
  - Sticky simple header
  - "Your Favorites" intro block
  - Vertical list of image cards with mood/time metadata
  - Empty/end states with icon illustration and exploration CTA
  - Mobile bottom nav with Favorites active

### 5) Login

- Route: `app/auth/login/page.tsx`
- View: `views/login.tsx`
- `new.html` source: `Login`
- Mapping:
  - Top compact brand bar
  - Hero image banner with welcome message
  - Email/password form with large inputs
  - Forgot password link
  - Primary sign-in CTA
  - Social auth row and legal microcopy

### 6) Register

- Route: `app/auth/register/page.tsx`
- View: `views/register.tsx`
- `new.html` source: `Sign Up`
- Mapping:
  - Sticky auth header with back affordance
  - Hero visual block with onboarding message
  - Full name + email + password form
  - Primary create account CTA
  - Social sign-up row
  - Link to existing account login

### 7) Account

- Route: `app/(main)/account/page.tsx`
- View: `views/account.tsx`
- `new.html` source: no exact dedicated account page
- Mapping approach:
  - Reuse `Favorites` and `Login` design language
  - Keep card sections for profile/security actions
  - Use same spacing, rounded-xl card style, and tinted surfaces

### 8) Information / Legal

- Route: `app/info/page.tsx`
- View: `views/info.tsx`
- `new.html` source: no exact dedicated info page
- Mapping approach:
  - Reuse light article layout with sticky compact header
  - Keep readable content width and section cards
  - Apply shared typography and border styles

### 9) Reset Password

- Route: `app/reset-password/page.tsx`
- View: `views/reset-password.tsx`
- `new.html` source: closest to `Login` and `Sign Up`
- Mapping approach:
  - Reuse auth shell from Login/Sign Up
  - Keep two password fields + primary CTA

### 10) Forgot Password Success

- Route: `app/auth/forgot-password-success/page.tsx`
- View: `views/forgot-password-success.tsx`
- `new.html` source: no exact dedicated success page
- Mapping approach:
  - Reuse auth shell visual language with concise success state

## Layout Shell Mapping

### Main App Shell

- Files: `app/(main)/layout.tsx`, `components/layout.tsx`, `components/header.tsx`, `components/bottom-nav-bar.tsx`
- `new.html` source: Home/Results/Favorites top bars + bottom navigation
- Mapping:
  - Sticky top bars with translucent background
  - Mobile fixed bottom navigation
  - Desktop navigation in hero/top header context

### Auth Shell

- Files: `app/auth/layout.tsx`, `components/auth-layout.tsx`
- `new.html` source: Login and Sign Up shells
- Mapping:
  - Centered mobile-first card stack
  - Strong hero visual block + clean form region

## Quick Implementation Order

1. Align global theme tokens and fonts.
2. Apply shell updates (`layout`, `header`, `bottom-nav`, `auth-layout`).
3. Update core screens in order: Home -> Results -> Details -> Favorites.
4. Update auth screens: Login -> Register -> Reset Password -> Success.
5. Apply fallback style alignment for Account and Information.

## Definition of Done

- Each route above visually matches the mapped `new.html` section.
- Shared theme tokens are consistent in light/dark modes.
- Mobile and desktop layouts both render without overflow/broken spacing.
- Existing app behavior (search, favorites, auth flows) remains functional.
