# Design Guidelines: Zodiac Record Label Social Platform

## Design Approach

**Hybrid Approach: Mystical Luxury Meets Social Utility**

This application combines the mystical, celestial aesthetic of zodiac culture with the professional polish of a music industry platform. Drawing inspiration from Spotify's dark interface, Discord's community features, and luxury brand aesthetics, we create a unique identity that feels both exclusive and accessible.

**Core Principles:**
- Mystical luxury through gold/celestial color palette
- Trust and safety through verified user status indicators
- Community connection through prominent avatar displays
- Professional credibility for record label context

## Color Palette

**Primary Colors (Dark Mode Foundation):**
- Deep Amber Background: `30 60% 8%` - Rich, warm darkness
- Primary Gold: `45 100% 50%` - Vibrant accent for CTAs and highlights
- Muted Gold: `38 90% 45%` - Secondary buttons and borders
- Warm Bronze: `35 70% 35%` - Card backgrounds and elevated surfaces

**Neutral Colors:**
- Light Text: `0 0% 88%` - Primary text
- Muted Text: `0 0% 60%` - Secondary information
- Dark Surface: `30 50% 12%` - Cards and containers
- Subtle Border: `35 60% 25%` - Dividers and outlines

**Accent Colors:**
- Zodiac Purple: `270 75% 60%` - For special zodiac-related features
- Success Green: `142 76% 36%` - Compatibility matches and approvals
- Warning Amber: `38 92% 50%` - Pending verifications
- Danger Red: `0 84% 60%` - Incompatibility warnings

**Semantic Usage:**
- Use Primary Gold for main CTAs, active states, and premium features
- Use Zodiac Purple for zodiac council, sign badges, and mystical elements
- Use Success Green for verified checkmarks and compatible matches
- Use transparent overlays with backdrop-blur for glassmorphic cards

## Typography

**Font System:**
- Primary: 'Inter' (Google Fonts) - Clean, professional sans-serif
- Accent: 'Cinzel' (Google Fonts) - Elegant serif for zodiac titles and headers
- Monospace: System mono - For user IDs and technical information

**Type Scale:**
- Display (Cinzel): text-5xl font-bold - Hero titles, zodiac names
- Heading 1: text-3xl font-bold - Section headers
- Heading 2: text-2xl font-semibold - Card titles
- Body: text-base - Primary content
- Small: text-sm - Metadata, timestamps
- Tiny: text-xs - User IDs, legal text

## Layout System

**Spacing Primitives (Tailwind):**
Core spacing units: 2, 4, 8, 12, 16, 24 (p-2, m-4, gap-8, etc.)
- Tight spacing (2-4): Within components, icon gaps
- Medium spacing (8-12): Between related elements
- Generous spacing (16-24): Between sections, major layout gaps

**Layout Structure:**
- Fixed sidebar (right): 200px default, 500px expanded on hover
- Main viewport: Full-screen video background with overlay controls
- Floating panels: Glassmorphic cards with backdrop-blur-xl
- Grid system: 3-4 columns for zodiac council display

## Component Library

**Navigation & Structure:**
- Floating sidebar with glassmorphic background (backdrop-blur-lg, bg-opacity-50)
- Sticky top bar for critical actions (logout, settings)
- Breadcrumb navigation with gold chevrons

**User Profiles:**
- Large circular avatars (150px) with thick gold borders (border-4)
- Zodiac sign badge overlay (top-right corner)
- Verification checkmark (Success Green) for approved users
- Status indicator (dot) showing online/offline state
- Name display with Inter Bold, zodiac sign with Cinzel

**Video Chat Component:**
- Full-viewport background video for immersive experience
- Picture-in-picture thumbnail (200x200) for secondary participant
- Control bar with glassmorphic background at bottom
- Mute, camera, end call buttons with gold hover states
- Connection quality indicator (top-right)

**Chat Interface:**
- Scrollable message container (max-h-96)
- User messages: Right-aligned, gold background (#8c6f1a)
- AI messages: Left-aligned, muted gold background (#4f4520)
- Avatar thumbnails (32px) next to each message
- Timestamp in text-xs below messages
- Input bar with send button (Primary Gold)

**Zodiac Council Grid:**
- 4-column grid on desktop, 2-column on tablet, 1-column mobile
- Circular avatars with zodiac symbol overlays
- Edit button (top-right) with pencil icon on hover
- Zodiac name in Cinzel below avatar
- Compatibility indicator (heart icon) when clicked

**Form Elements:**
- Dark inputs with gold borders (focus: ring-2 ring-gold)
- Birthdate picker with calendar icon
- Dropdown selects with custom gold arrow
- Primary buttons: Gradient gold background, black text
- Secondary buttons: Outline gold, gold text
- All inputs: rounded-lg, p-3 for comfortable touch targets

**Status Cards:**
- Birthdate verification card: Warning Amber border when pending
- Compatibility status: Success Green border when matched
- Profile completion: Progress bar in Primary Gold
- Glassmorphic background with 20% opacity

**Badges & Tags:**
- Pill-shaped (rounded-full)
- Small text (text-xs font-semibold)
- Verified: Success Green background
- Pending: Warning Amber background
- Incompatible: Subtle red with low opacity

## Images

**Hero Section:**
Full-viewport video background showing celestial/zodiac animations or starry night sky. This creates immediate mystical atmosphere. Video should be subtle, slow-moving to avoid distraction.

**Avatar Images:**
- User avatars: AI-generated based on zodiac sign characteristics
- Zodiac Council: 12 unique circular icons representing each sign with symbolic imagery
- Profile headers: Optional constellation patterns as subtle backgrounds

**Placement:**
- Background: Full-screen video (zodiac animations)
- Sidebar: User avatars and Zodiac Council grid
- Chat: Small avatar thumbnails (32px) next to messages
- Profile cards: Large hero avatar (150px) centered

## Accessibility & Polish

- Maintain WCAG AA contrast ratios (gold on dark backgrounds)
- Focus indicators: 3px gold ring on all interactive elements
- Hover states: Slight scale (scale-105) and opacity changes
- Loading states: Gold spinning constellation icon
- Error messages: Inline below inputs with Danger Red text
- Success confirmations: Toast notifications with Success Green
- Smooth transitions: transition-all duration-300 ease-in-out
- Glassmorphic effects: backdrop-blur-lg for depth and premium feel