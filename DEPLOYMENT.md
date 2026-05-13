# Deployment Guide

## Frontend on Vercel

1. Create a Vercel project with root directory:

```text
frontend
```

2. Use:

```bash
npm install
npm run build
```

3. Set the output directory:

```text
dist
```

4. Add frontend environment variables:

```text
VITE_API_BASE_URL=https://your-railway-service.up.railway.app
VITE_WS_BASE_URL=wss://your-railway-service.up.railway.app
```

## Backend on Railway

1. Create a Railway service with root directory:

```text
backend
```

2. Use Python 3.11 and install:

```bash
pip install -r requirements.txt
```

3. Use this start command:

```bash
uvicorn server.main:app --host 0.0.0.0 --port $PORT
```

4. Add backend environment variables:

```text
APP_ENV=production
ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
SESSION_DB_PATH=data/chemistry_sessions.sqlite3
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
DEEPGRAM_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=
```

5. Deploy and confirm:

```text
GET /api/health
```

## LiveKit and Pipecat

Use LiveKit Cloud or a self-hosted LiveKit server. The frontend requests participant tokens from the backend, so `LIVEKIT_API_SECRET` stays server-side.

The frontend LiveKit button calls:

```text
POST /api/livekit/token
POST /api/voice/session
```

The backend starts:

```text
LiveKit transport -> Deepgram STT -> Groq/Gemini LLM -> ElevenLabs TTS -> LiveKit transport
```

Run at least one Railway replica with enough memory for Pipecat and provider SDKs.

## Persistence

The backend uses SQLite at `SESSION_DB_PATH`. On ephemeral hosts, Railway redeploys may clear local disk unless you attach a persistent volume. The app still works without a volume, but long-term tutor history will reset.

## Production Checklist

- Lock `ALLOWED_ORIGINS` to the deployed Vercel domain.
- Keep all provider keys only in Railway environment variables.
- Rotate any keys that were ever committed or pasted into examples.
- Attach a Railway volume if you want persistent SQLite history.
- Enable LiveKit usage monitoring for billed voice sessions.
- Add observability for WebSocket disconnects, provider latency, and Pipecat session startup failures.
