# ID Wallet

Digital identity wallet for professional interpreters, inspired by the European
digital identity framework (EU eIDAS 2.0). Interpreters get a single, portable
place to hold their verified profile, professional credentials and work history,
plus an AI assistant that explains and summarizes that data in plain language.

The project is a monorepo with two independent applications:

- **`frontend/`** — React + TypeScript single-page app (PWA, installable, offline-capable).
- **`backend/`** — Node.js + TypeScript REST and streaming API, with an AI assistant.

## Concept

Credentials are issued by trusted authorities and carry a trust/assurance level
(High / Medium / Low) and a validity period, mirroring the eIDAS 2.0 model. The
wallet presents these credentials, the interpreter's profile and their interpreting
history, and an assistant (IDA — Identity Digital Assistant) that answers questions
grounded strictly in the wallet's own data.

## Architecture

```
idwallet/
├── frontend/   React 19 + Vite + Tailwind PWA  (UI, port 5173)
└── backend/    Express 5 + OpenAI API          (REST + SSE, port 3333)
```

The frontend talks to the backend over HTTP. In development, Vite proxies every
request from `/api` to the backend at `http://localhost:3333`, so the two run as a
single experience without any CORS configuration on the client side.

- The backend exposes REST endpoints for the profile, credentials and jobs, plus
  streaming AI endpoints over Server-Sent Events.
- The frontend consumes those endpoints, streams the AI responses in real time, and
  caches read data for offline use.

## Tech stack

| Layer    | Technologies                                                        |
| -------- | ------------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Zustand, Axios, vite-plugin-pwa |
| Backend  | Node.js, TypeScript, Express 5, OpenAI SDK, dotenv, cors            |

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

## Documentation

Each application has its own README with detailed setup, scripts and structure:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
