# MoodMenu Web App

A modern recipe discovery platform that helps users find recipes based on their mood, cuisine preferences, and dietary needs. Built with Next.js and Firebase.

## 🎯 Overview

MoodMenu reduces decision fatigue by providing emotionally-guided recipe suggestions. Users select their mood and preferences, discover relevant recipes, and save their favorites to their account.

## ✨ Features

- **Mood-Driven Discovery**: Select your mood, cuisine, and dietary preferences to get personalized recipe suggestions
- **Recipe Browsing**: Browse featured recipes with beautiful cards and load more functionality
- **Recipe Details**: View complete recipe information including ingredients, step-by-step instructions, and media
- **Favorites Management**: Save and manage your favorite recipes (authenticated users only)
- **User Authentication**: Secure email/password and social login support
- **Account Management**: Update profile settings and manage password
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **SEO Optimized**: Built with Next.js Metadata API for search engine optimization
- **Accessible UI**: Keyboard navigable controls with visible focus states

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **Database**: Firebase Firestore
- **Recipe Data**: [TheMealDB API](https://www.themealdb.com/)
- **Linting**: ESLint

## 📁 Project Structure

```
moodmenu/
├── app/                          # Next.js App Router pages
│   ├── (main)/                   # Main authenticated routes
│   │   ├── account/              # Account settings
│   │   ├── favorites/            # User's saved recipes
│   │   ├── recipes/              # Recipe listing and details
│   │   └── page.tsx              # Home page
│   ├── auth/                     # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   ├── info/                     # Information/legal pages
│   ├── layout.tsx                # Root layout
│   └── styles.css                # Global styles
├── components/                   # Reusable React components
│   ├── ui/                       # Base UI components (shadcn/ui)
│   ├── auth-provider.tsx         # Firebase auth context
│   ├── auth-layout.tsx           # Auth page layout
│   ├── protected-route.tsx       # Route protection wrapper
│   ├── recipe-list.tsx           # Recipe grid component
│   ├── recipe-details.tsx        # Recipe detail view
│   ├── hot-recipes.tsx           # Featured recipes section
│   └── ...                       # Other feature components
├── hooks/                        # Custom React hooks
│   └── use-toast.ts              # Toast notification hook
├── lib/                          # Utilities and helpers
│   ├── firebaseClient.ts         # Firebase configuration
│   ├── data.ts                   # Data fetching utilities
│   ├── store.ts                  # State management
│   └── utils.ts                  # General utilities
├── orm/                          # Data models
│   └── recipe.collection.ts      # Recipe data model
├── public/                       # Static assets
├── views/                        # Page view components (legacy)
├── assets/                       # Image and media assets
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project credentials
- TheMealDB API access (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   cd moodmenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with your Firebase and TheMealDB credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Home Page
1. Select your current mood from the available options
2. Choose a cuisine type (optional)
3. Select any dietary preferences
4. Submit to view matching recipes

### Recipe Discovery
- Browse recipe cards with images and summaries
- Click "Load More" to see additional recipes
- Click a recipe card to view full details

### Recipe Details
- View complete ingredient list
- Read step-by-step cooking instructions
- Watch embedded YouTube videos (if available)
- Save recipe to favorites (authenticated users)

### Favorites
- Sign in to your account
- Save recipes you'd like to revisit
- Access all favorites from the Favorites page
- Remove recipes from favorites anytime

### Account Settings
- Update your display name
- Change your password (email auth)
- View and manage your profile
- Sign out

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Quality

The project uses ESLint for code quality and TypeScript for type safety. All code must pass lint checks before deployment.

## 📊 Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s on primary pages
- **Interaction Latency**: < 200ms for route transitions
- **Mobile-First**: Optimized for mobile devices with graceful desktop enhancement

## ♿ Accessibility

- Full keyboard navigation support
- Visible focus states on all interactive elements
- Respects reduced-motion preferences
- Semantic HTML and ARIA attributes
- Color contrast compliance

## 🔐 Security

- Firebase authentication with industry-standard security
- No secrets exposed in client-side code
- Secure password reset flow
- Protected routes with authentication checks

## 📱 Responsive Design

The app is fully responsive across:
- Mobile phones (320px and up)
- Tablets (768px and up)
- Desktop displays (1024px and up)

## 🌍 SEO

- Next.js Metadata API for all routes
- Dynamic metadata for recipe listing and detail pages
- Canonical URLs for improved search indexing
- Open Graph and Twitter card support

## 🐛 Error Handling

- User-friendly toast notifications for errors
- Graceful fallbacks for API failures
- Comprehensive error boundary coverage
- Detailed error messages for debugging

## 📈 Analytics & Success Metrics

### Primary KPIs
- Recipe Result View Rate
- Recipe Detail Click-Through Rate
- Favorite Save Rate
- Weekly Returning Users

### Secondary KPIs
- Average Session Duration
- Pages per Session
- Error Rate on Core Flows

## 🗺 Roadmap

### Future Enhancements
- Personalized recipe recommendations based on browsing history
- Nutrition and allergen filtering
- Weekly meal planner and shopping list export
- Multi-language support and region-specific cuisines
- Offline-first PWA capabilities with service workers

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run lint and type checks: `npm run lint && npm run type-check`
4. Submit a pull request with a clear description

## 📄 License

[Add your license information here]

## 🙋 Support

For issues, feature requests, or questions, please open an issue in the repository.

---

**Version**: v1.0  
**Last Updated**: March 2026
