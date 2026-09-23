# Glam by Elaf Shah — Vite + React + TypeScript

Bilingual English/Arabic makeup-artist website built from the supplied brand assets.

## Features
- English / Arabic language toggle with RTL support
- Brand-matched ivory, burgundy/plum and dusty rose palette
- Editorial + script typography matching the supplied visual identity
- Responsive hero, services, artist, portfolio and social sections
- Booking calendar with selectable date/time
- WhatsApp booking message generation
- One dynamic QR code that points back to the deployed site's social section
- Mobile navigation and responsive layouts

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Important customization
In `src/App.tsx`, set:
```ts
const WHATSAPP_NUMBER = '9665XXXXXXXX'
```
Use digits only, with country code and no `+` sign. If left blank, WhatsApp opens with the prepared booking message and lets the visitor choose a recipient.

Replace the Instagram URL in the `#socials` section when the final profile URL is available.

## Design notes
The project follows a hero-centric, premium beauty-service layout with accessible contrast, clear CTAs, responsive interaction states, reduced-motion support, and a conversion path from portfolio → calendar → WhatsApp.
