# Innerlog - Mindful Self-Discovery App

A clean, minimalist app for self-reflection with AI coaching features built with React Native and Expo.

## Features

- **Innerlogs Feed**: Browse your previous Innerlogs with mood indicators
- **AI Coach**: Get personalized psychological insights and actionable guidance
- **Insights Dashboard**: Track mood trends, streaks, and common themes
- **Profile & Settings**: Manage preferences and view your Innerlog statistics

## Design Philosophy

- Calm, intelligent, and premium feel
- Soft color palette with balanced whitespace
- Rounded cards and elegant typography
- Smooth animations and transitions
- Subtle psychological insights without academic jargon

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- Expo Go app installed on your mobile device
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Expo Linear Gradient** - Gradient backgrounds
- **React Native Chart Kit** - Charts and analytics
- **Expo Vector Icons** - Icon library

## Navigation Structure

The app uses bottom tab navigation with three main screens:

1. **Innerlogs** - Home screen with Innerlog list and new Innerlog creation
2. **Insights** - Analytics dashboard with mood trends and statistics
3. **Profile** - User profile, settings, and preferences

## AI Coach Features

The AI Coach provides three types of insights:

1. **Pattern Recognition** - Identifies themes across recent Innerlogs
2. **Deeper Insight** - Offers psychological perspective on emotions and behaviors
3. **Actionable Guidance** - Suggests specific practices and exercises

All insights are designed to feel like natural wisdom rather than academic analysis.

## Project Structure

```
├── App.tsx                 # Main navigation setup
├── screens/
│   ├── Home.tsx           # Journal feed and entry list
│   ├── JournalEntry.tsx   # Entry creation with AI coach
│   ├── Insights.tsx       # Analytics and insights dashboard
│   └── Profile.tsx        # User profile and settings
├── package.json
├── app.json               # Expo configuration
└── README.md
```

## Color Palette

- **Primary**: `#a5b4fc` (Soft lavender)
- **Backgrounds**: Gradient from `#f8f9fe` → `#faf5ff` → `#f0fdf9`
- **Text**: `#1f2937` (Dark gray)
- **Muted**: `#6b7280` (Medium gray)
- **Accents**: Lavender, mint, cream, soft blue

## Running on Device

This app is optimized for **Expo Go**. Simply:

1. Run `npm start`
2. Open Expo Go on your device
3. Scan the QR code from the terminal
4. The app will load on your device

## Notes

- All data is currently mock data for demonstration
- AI insights are generated locally based on entry content
- Premium features are UI-only (no payment integration)
- Export functionality is placeholder

## License

Private project - All rights reserved
