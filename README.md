# Lecturer Dashboard - STES

A professional, scalable lecturer dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
│
├── app/
│   ├── layout.tsx        → Root layout with metadata
│   ├── page.tsx          → Main landing/dashboard page
│
├── components/
│   ├── ui/               → Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── IconButton.tsx
│   │   └── SearchBar.tsx
│   ├── common/           → Shared layout components
│   │   └── Header.tsx
│
├── layouts/
│   └── MainLayout.tsx    → Main layout wrapper with Header
│
├── assets/
│   ├── images/           → Image assets (to be added)
│   └── icons/            → Icon/SVG assets (to be added)
│
├── data/
│   └── dummyData.ts      → Static placeholder data
│
├── styles/
│   └── globals.css       → Global Tailwind styles
│
├── types/
│   └── index.ts          → TypeScript interfaces and types
│
└── utils/
    └── helpers.ts        → Utility functions (to be added)
```

## 🎨 Features Implemented

### Header Component ✅
- **Logo Section**: Graduation cap icon with "Lecturer Dashboard" branding
- **Search Bar**: Full-width search with keyboard shortcut indicator (⌘K)
- **Notifications**: Bell icon with badge counter
- **Help Icon**: Quick access to help/support
- **User Profile**: Name, role, and avatar with initials

### UI Components ✅
- **Avatar**: Customizable size, shows initials or image
- **IconButton**: Reusable button with badge support
- **SearchBar**: Interactive search with focus states

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## 🎯 Design Principles

- ✨ Clean, professional UI matching Figma designs
- 🎨 Consistent visual hierarchy and spacing
- 🖱️ Smooth hover effects and transitions
- 📱 Responsive for laptop and desktop screens
- ♿ Accessible and user-friendly interactions

## 📝 Next Steps

The application is ready to receive additional design sections:
- Sidebar navigation
- Top content area
- Main page body/sections
- Bottom section
- Footer

Each section will be incrementally added while maintaining the existing structure and design consistency.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

Private project for STES Lecturer Dashboard.
