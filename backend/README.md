# ID Wallet — Backend

REST and streaming API for the ID Wallet, a digital identity wallet for
professional interpreters. The backend serves the interpreter's verified profile,
professional credentials and work history, and powers the AI assistant that
explains and summarizes that data.

The concept is inspired by the European digital identity wallet (EU eIDAS 2.0):
credentials issued by trusted authorities, with assurance/trust levels and
validity periods, exposed through a clean API and grounded in real wallet data.

## Stack

- **Node.js** with **TypeScript**
- **Express 5** as the HTTP framework
- **OpenAI SDK** for the AI assistant (streaming completions)
- **dotenv** for environment configuration
- **cors** for cross-origin access
- **ts-node** and **nodemon** for development

## Prerequisites

- Node.js 20 or higher
- npm
- An OpenAI API key

## Environment variables

Create a `.env` file in the `backend/` root:

```bash
OPENAI_API_KEY=your-openai-key
PORT=3333
```

`PORT` is optional and defaults to `3333` — the port the frontend proxy expects.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server (auto-reloads on changes):

```bash
npm run dev
```

The API runs at `http://localhost:3333`.

## Available scripts

| Command         | Description                                            |
| --------------- | ------------------------------------------------------ |
| `npm run dev`   | Development server with auto-reload (nodemon + ts-node) |
| `npm run build` | Compile TypeScript to `dist/`                          |
| `npm run start` | Run the compiled server from `dist/`                   |

## Project structure

```
src/
├── controllers/    Request handlers, one per resource
│   ├── healthController.ts      Health check
│   ├── profileController.ts     Interpreter profile
│   ├── jobController.ts         Work history
│   ├── credentialController.ts  Professional credentials
│   └── aiController.ts          AI streaming endpoints
├── routes/         Route definitions mounted under /api
├── lib/            Shared building blocks
│   ├── openai.ts        OpenAI client and model configuration
│   └── systemPrompt.ts  System prompt and instructions, grounded in wallet data
├── middleware/     Express middleware (centralized error handling)
├── data/           Wallet data source (profile, credentials, jobs as JSON)
└── index.ts        Application entry point and server bootstrap
```

## API

All routes are mounted under the `/api` prefix.

| Method | Endpoint                  | Description                                          |
| ------ | ------------------------- | ---------------------------------------------------- |
| GET    | `/api/health`             | Service status and uptime                            |
| GET    | `/api/profile`            | Interpreter profile and statistics                   |
| GET    | `/api/jobs`               | Full work history                                    |
| GET    | `/api/jobs/:id`           | A single job by id                                   |
| GET    | `/api/credentials`        | Professional credentials with status and trust level |
| POST   | `/api/ai/chat`            | Conversational assistant (streamed)                  |
| POST   | `/api/ai/profile`         | AI-generated profile summary (streamed)              |
| POST   | `/api/ai/credential-trust`| Plain-language explanation of a credential's trust level (streamed) |

### AI endpoints

The AI endpoints stream their responses using Server-Sent Events. Each chunk is
emitted as `data: {"delta":"..."}` and the stream is terminated with
`data: [DONE]`. On failure, an `data: {"error":"..."}` event is sent before the
stream closes, so the client can fail gracefully.

The assistant (IDA — Identity Digital Assistant) is grounded exclusively in the
wallet data under `src/data/`: it answers only about the interpreter's identity,
credentials, trust levels, validity and work history, and is instructed never to
invent facts that are not present in that context.

- `POST /api/ai/chat` — expects `{ "messages": [{ "role": "user", "content": "..." }] }`.
- `POST /api/ai/profile` — no body; generates a profile summary from the wallet data.
- `POST /api/ai/credential-trust` — expects `{ "credentialId": "..." }`.

## Data

The wallet data lives in `src/data/` as JSON (`profile.json`, `credentials.json`,
`jobs.json`). It serves both the REST endpoints and the context injected into the
AI system prompt, keeping every answer consistent with what the wallet actually
holds.

## Production build

```bash
npm run build
npm run start
```

`build` compiles the TypeScript sources into `dist/`, and `start` runs the
compiled server.
