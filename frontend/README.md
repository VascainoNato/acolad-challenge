# ID Wallet — Frontend

Web application for the ID Wallet, a digital identity wallet for professional
interpreters. The interface lets the interpreter view their verified profile,
manage professional credentials, track their work history, and chat with an AI
assistant — all with offline support through a PWA.

The concept is inspired by the European digital identity wallet (EU eIDAS 2.0):
credentials issued by trusted authorities, with trust levels and validity periods,
presented in a single, portable place.

## Stack

- **React 19** with **TypeScript**
- **Vite** as the bundler and development server
- **Tailwind CSS 4** for styling
- **React Router** for navigation
- **Zustand** for global state (the assistant conversation)
- **Axios** for REST requests
- **vite-plugin-pwa** (Workbox) for installability and offline support

## Prerequisites

- Node.js 20 or higher
- npm
- The backend running (the app consumes the API at `/api`, proxied to
  `http://localhost:3333`)

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app is available at `http://localhost:5173`. Requests to `/api` are
automatically proxied to the backend at `http://localhost:3333`.

## Available scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Development server with HMR                             |
| `npm run build`   | Type check (`tsc -b`) and production build             |
| `npm run preview` | Local server to inspect the production build           |
| `npm run lint`    | Static analysis with ESLint                            |

## Project structure

```
src/
├── components/      UI components
│   ├── Screens/     Main screens (Dashboard, Wallet, AI)
│   ├── Sections/    Content blocks (lists, chat, sidebar menu)
│   ├── Cards/       Credential, job and wallet cards
│   ├── Modal/       Modal dialogs (profile, credential, history)
│   ├── Pages/       Layout structure (header, content, banners)
│   ├── Buttons/     Standalone actions (theme, connection, avatar)
│   ├── Icons/       SVG icons as React components
│   └── ui/          Reusable primitives (Button, Card, Modal, etc.)
├── context/         Theme and connection-state contexts
├── hooks/           Data and UI-control hooks
├── services/        API access layer (REST and SSE streaming)
├── stores/          Global state with Zustand
├── types/           Types and data contracts
├── lib/             Utility functions
├── routes.ts        Declarative route definitions
├── App.tsx          Layout composition and routing
└── main.tsx         Entry point and providers
```

## Architecture

The interface is organized into three screens, declared in `src/routes.ts`:

- **Dashboard** — overview of the profile, statistics and work history.
- **Wallet** — professional credentials with status (verified, expiring, expired)
  and trust level (high, medium, low).
- **AI Assistant** — chat with the assistant, featured in mobile navigation.

Data access is centralized in the `services/` layer. Common queries use Axios over
the REST API (`/api/profile`, `/api/credentials`, `/api/jobs`). The AI features use
streaming over Server-Sent Events, consuming the response in real time as the model
generates text (chat, profile generation, and credential trust explanations).

State is kept close to where it is used: dedicated hooks encapsulate loading each
resource, theme and connection live in React Context, and the assistant
conversation lives in a Zustand store so it persists across screens.

## Light and dark theme

The theme is selected automatically from the system preference and can be toggled
by the user. The choice is stored in `localStorage` and applied before render (an
inline script in `index.html`) to avoid the wrong-theme flash.

## Offline support (PWA)

The app is installable and works offline. Static assets are precached, and the
responses from `/api/profile`, `/api/credentials` and `/api/jobs` follow a
stale-while-revalidate strategy, allowing the data to be read even without a
network. A connection indicator and a banner inform the user when the backend is
unreachable, checking availability through a periodic probe to the API.

## Production build

```bash
npm run build
npm run preview
```

`build` runs the type check before generating the optimized files in `dist/`.
`preview` serves that build locally, also proxying the API.
