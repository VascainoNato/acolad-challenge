# ID Wallet

Digital identity wallet for professional interpreters, inspired by the European
digital identity framework (EU eIDAS 2.0). Interpreters get a single, portable
place to hold their verified profile, professional credentials and work history,
plus an AI assistant (IDA — Identity Digital Assistant) that explains and
summarizes that data in plain language, grounded strictly in the wallet's own data.

The project is a monorepo with two independent applications:

- **`frontend/`** — React + TypeScript single-page app (PWA, installable, offline-capable).
- **`backend/`** — Node.js + TypeScript REST and streaming API, with a wallet-grounded AI assistant.

## Live demo and video

- **Live version:** (https://acolad-challenge-czbz.vercel.app/)
- **Video walkthrough:** (https://vimeo.com/1203133508?share=copy&fl=sv&fe=ci#t=0)

> The links above will be filled in once the deployment is published and the demo
> video is recorded.

## About this challenge

This project was built for the **Acolad Frontend Technical Challenge — Interpreter
Digital Identity Wallet (eIDAS 2.0 Inspired)**, a take-home assessment combining EU
Digital Identity Wallet concepts with AI-assisted user experiences. The brief asks
for a responsive React application that lets an interpreter connect a digital identity
wallet, view verified professional credentials, and interact with an AI assistant,
with an emphasis on architecture, UX, and code quality over raw completeness.

Beyond the mandatory three screens and the required design-system primitives, every
optional bonus challenge in the brief has been implemented, and the work is delivered
as a full monorepo: a polished PWA frontend and a real streaming backend that grounds
the AI strictly in the interpreter's wallet data.

## Requirements coverage

The table below maps the challenge brief to what was actually built.

| Challenge requirement | Status | Where / how |
| --------------------- | ------ | ----------- |
| **Screen 1 — Identity Wallet:** digital identity card | Done | `Wallet` screen with an EU Digital Identity wallet card |
| Verified interpreter credential | Done | Credentials list with status and trust level per credential |
| Connect Wallet action | Done | Connect flow with connection state and toast feedback |
| View Credentials action | Done | Lazy-loaded credentials list, toggled from the wallet |
| **Screen 2 — Dashboard:** interpreter profile summary | Done | `Dashboard` profile card with role, languages and verification |
| Recent jobs list | Done + extended | Jobs split into Upcoming and Recent, each with a detail modal |
| Qualification summaries | Done | Credential cards and detail modal with issuer, dates, trust |
| AI-generated profile summary | Done | AI summary generated on demand in the profile history modal |
| **Screen 3 — AI Assistant:** chat-style interface | Done + extended | Streaming chat (SSE), desktop sidebar and mobile `/ai` route |
| **Design system primitives:** Button, Card, Badge, Stat, Modal | Done + extended | Plus Avatar, Detail, Spinner, TypingDots, CloseButton, Toaster |
| Mobile (~390px), Tablet, Desktop responsive | Done | Mobile-first layouts with `lg:` desktop enhancements |
| Accessibility | Done | Focus trap, Escape-to-close, ARIA live regions, keyboard nav |
| Loading states | Done | Spinner and TypingDots across data fetches and streaming |
| Empty states | Done | Empty-state messaging in lists and the chat greeting |
| **Bonus —** AI explanation of credential trust | Done | "Why is this trusted?" streamed explanation per credential |
| **Bonus —** Credential verification timeline | Done | Date-sorted timeline merging credentials and jobs |
| **Bonus —** AI-generated professional profile | Done | Dedicated AI profile-summary endpoint and UI |
| **Bonus —** Dark mode | Done | System-aware theme with no-flash inline script |
| **Bonus —** Offline-first wallet view | Done | PWA with stale-while-revalidate caching of wallet data |

All five bonus challenges are implemented.

## Architecture

```
idwallet/
├── frontend/   React 19 + Vite + Tailwind PWA  (UI, port 5173)
└── backend/    Express 5 + OpenAI API          (REST + SSE, port 3333)
```

The frontend talks to the backend over HTTP. In development, Vite proxies every
request from `/api` to the backend at `http://localhost:3333`, so the two run as a
single experience without any CORS configuration on the client side.

- The backend exposes **REST endpoints** for the profile, credentials and jobs, plus
  **streaming AI endpoints over Server-Sent Events (SSE)**.
- The frontend consumes those endpoints, streams the AI responses in real time, and
  caches read data with a service worker for offline use.

The split is deliberate: deterministic wallet data is served as plain REST and cached
for offline reads, while AI responses are streamed token-by-token over SSE for a
responsive chat experience.

## Tech stack

| Layer    | Technologies                                                                              |
| -------- | ---------------------------------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Zustand, Axios, react-hot-toast, vite-plugin-pwa |
| Backend  | Node.js, TypeScript, Express 5, OpenAI SDK (gpt-4o), dotenv, cors                          |

## Frontend features

Three screens, served via React Router:

- **Dashboard (`/`)** — profile card with stats (total jobs, average rating, member
  since), jobs split into Upcoming and Recent, and a profile history timeline that
  merges credentials and jobs into a single date-sorted view with an AI-generated
  summary.
- **Wallet (`/wallet`)** — an EU Digital Identity wallet card with connect flow, plus
  a lazy-loaded list of verified credentials, each opening a detail modal.
- **AI Assistant (`/ai`)** — a full-screen chat on mobile; on desktop the same chat
  lives in a right-hand sidebar.

Other highlights:

- **Design-system UI primitives** in `src/components/ui/`: Button (multiple variants),
  Card, Badge, Stat, Modal, plus Avatar, Detail, Spinner, TypingDots, CloseButton and
  an app-wide Toaster.
- **Credential detail modal** with an inline, AI-powered "Why is this trusted?"
  explanation, streamed live.
- **AI chat** with streaming responses, suggested starter prompts, auto-appearing
  follow-up suggestions, a new-chat reset, and a disabled/offline state.
- **State management** — Zustand `chatStore` for the conversation; React Context for
  cross-cutting Theme and Connection concerns; custom hooks for data fetching and
  caching (`useProfile`, `useCredentials`, `useJobs`, and more).
- **PWA / offline-first** — installable (standalone) app with a Workbox service
  worker. Wallet reads (`/api/profile`, `/api/credentials`, `/api/jobs`) use a
  stale-while-revalidate strategy, so the wallet is viewable offline. An offline
  banner and reconnection toasts keep the user informed; AI features are disabled
  while offline.
- **Dark mode** — system-preference aware, persisted to `localStorage`, with an
  inline script in `index.html` that applies the theme before React mounts to avoid
  a flash of the wrong theme.
- **Accessibility** — focus trap and focus restoration in dialogs, Escape-to-close,
  ARIA live regions for connection status, and full keyboard navigation.
- **Loading, empty and error states** throughout (Spinner for fetches, TypingDots for
  streaming, empty-state messaging in lists and the chat greeting).

## Backend features

A Node.js + Express + OpenAI API serving the interpreter's wallet.

**REST endpoints** (base URL `http://localhost:3333/api`):

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/health`          | Service status and uptime                    |
| GET    | `/profile`         | Interpreter profile, stats and verification  |
| GET    | `/credentials`     | All credentials with trust levels and validity |
| GET    | `/jobs`            | Full work history                            |
| GET    | `/jobs/:id`        | A single job by id (404 if not found)        |

**AI streaming endpoints** (Server-Sent Events):

| Method | Endpoint               | Purpose                                                |
| ------ | ---------------------- | ----------------------------------------------------- |
| POST   | `/ai/chat`             | Conversational assistant (IDA), full message history  |
| POST   | `/ai/profile`          | AI-generated professional profile summary             |
| POST   | `/ai/credential-trust` | Plain-language explanation of a credential's trust level |

AI responses stream as JSON chunks in SSE format — `data: {"delta":"..."}` per token,
terminated by `data: [DONE]`, with `data: {"error":"..."}` on failure.

Other highlights:

- **Grounded AI assistant (IDA)** — powered by `gpt-4o`. A wallet-scoped system prompt
  injects the profile, credentials and jobs, and enforces hard guardrails: the
  assistant only discusses the interpreter's identity, credentials, trust levels,
  validity and work history, warmly redirects off-topic requests, never invents data,
  and always responds in English regardless of the user's input language.
- **eIDAS-inspired model** — credentials carry trust levels (High / Medium / Low),
  issued/expiry dates and a verified issuer, mirroring the eIDAS 2.0 assurance
  framework. Trust-level explanations are grounded in that framework.
- **Mock wallet data** — a realistic interpreter (Maria Rossi, Certified Medical
  Interpreter, Italian/English): four credentials (High and Medium trust, one
  expiring) and 22 jobs spanning Healthcare, Legal and Government.
- **Infrastructure** — global error-handling middleware, CORS, and environment-based
  configuration via `dotenv`.

## State management approach

State is intentionally kept lightweight and layered. The AI conversation lives in a
Zustand store (`chatStore`), which handles streaming by appending SSE chunks to the
last message. Cross-cutting concerns — theme and online/offline connection — are
provided via React Context. Wallet data is fetched and cached through dedicated hooks,
and the service worker adds a stale-while-revalidate layer so reads survive going
offline. No heavyweight global store is used; each concern owns the smallest tool that
fits it.

## AI integration approach

All OpenAI calls happen server-side, so the API key never reaches the client. The
backend builds a system prompt that grounds the model strictly in the wallet's data
and streams the model's output over SSE; the frontend renders those tokens as they
arrive. There are three distinct AI surfaces — a conversational chat, an on-demand
professional profile summary, and per-credential trust explanations — all sharing the
same grounded, English-only, guardrailed behavior.

## Prerequisites

- Node.js 20 or higher
- npm
- An OpenAI API key (for the backend's AI features)

## Getting started

The backend and frontend are started separately, each in its own terminal. Start
the backend first, since the frontend depends on it.

### 1. Backend

```bash
cd backend
npm install
# create a .env file with OPENAI_API_KEY (and optionally PORT=3333)
npm run dev
```

The API runs at `http://localhost:3333`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies `/api` to the backend.

## Project structure

```
idwallet/
├── frontend/   React 19 + Vite + Tailwind PWA — screens, design system, hooks, stores
└── backend/    Express 5 + OpenAI API — REST endpoints, SSE AI controllers, mock data
```

Each application keeps its own detailed structure documented in its README.

## Trade-offs and future improvements

- **Mock data, not live issuers** — wallet data is served from local JSON. A real
  deployment would integrate with actual credential issuers and verifiable-credential
  formats.
- **Single interpreter, no auth** — the app models one interpreter and has no
  authentication or multi-user support; both would be needed for production.
- **AI requires an OpenAI key** — AI features depend on a valid `OPENAI_API_KEY`;
  without it, the wallet still works but the assistant is unavailable.
- **Automated tests not yet implemented** — the architecture (typed services, hooks,
  pure utilities) is test-friendly, but a unit/integration suite is future work.

## Documentation

Each application has its own README with detailed setup, scripts and structure:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
