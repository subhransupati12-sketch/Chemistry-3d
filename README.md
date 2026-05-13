# Chemistry Vision AI

Production-oriented futuristic chemistry learning platform with a React Three Fiber molecular engine, realtime WebSocket AI tutoring, LiveKit/Pipecat voice sessions, and local SQLite session memory.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Drei.
- Backend: Python 3.11, FastAPI, WebSockets, async HTTP streaming, Pipecat.
- AI voice: LiveKit -> Deepgram STT -> Groq or Gemini -> ElevenLabs TTS -> LiveKit.
- Storage: local SQLite via `SESSION_DB_PATH`; no cloud database is required.

## Features

- Cinematic molecule viewer with glowing atoms, dynamic bonds, labels, electron orbits, bloom, particle systems, and smooth camera motion.
- Chemistry modules for molecular viewing, reactions, periodic table, electron shells, orbitals, stoichiometry, quizzes, and lab simulation.
- Realtime AI tutor over WebSocket with streamed responses and session memory.
- AI-to-visual synchronization for atom highlighting, bond animation, molecule rotation, reaction particles, and holographic cards.
- Voice paths for browser dictation, LiveKit microphone publishing, Pipecat voice bot sessions, Deepgram transcription, and ElevenLabs playback.

## Project Structure

```text
frontend/
  src/
    animations/    AI-to-visual action inference
    chemistry/     molecule, reaction, periodic, and shell data
    components/    dashboard, tutor, simulation, and UI components
    hooks/         WebSocket, browser voice, LiveKit, and waveform hooks
    lib/           API and websocket clients
    pages/         dashboard page
    store/         Zustand app state
    styles/        Tailwind globals
    three/         React Three Fiber molecular engine

backend/
  server/
    models/        Pydantic schemas
    pipelines/     Pipecat LiveKit voice pipeline
    routes/        FastAPI routes
    services/      Groq, Gemini, Deepgram, ElevenLabs, LiveKit, SQLite memory
    websocket/     realtime tutor socket
    utils/         shared utilities
```

## Local Setup

Use Node.js 20 and Python 3.11.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
```

Open `http://localhost:5173`.

## Environment Variables

Backend:

```text
APP_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
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

Frontend:

```text
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

## Realtime Architecture

```text
Typed or browser-recognized question
  -> React WebSocket client
  -> FastAPI /ws/tutor
  -> Groq or Gemini streamed completion
  -> visual action inference
  -> Zustand chemistry store
  -> React Three Fiber animation controller
```

Voice pipeline:

```text
User microphone
  -> LiveKit room
  -> Pipecat LiveKit transport
  -> Deepgram STT
  -> Groq or Gemini LLM
  -> ElevenLabs TTS
  -> LiveKit audio output
```

## Local Persistence

The backend automatically creates a SQLite database at `SESSION_DB_PATH`.

```text
tutor_messages(id, session_id, role, content, created_at)
```

The browser stores a stable `chemistry-vision-session-id` in `localStorage`, and the backend uses it to load recent tutor context.

## API Overview

- `GET /api/health` checks backend and provider configuration.
- `POST /api/ai/complete` returns a full AI tutor answer.
- `POST /api/ai/stream` streams an AI tutor answer over SSE.
- `WS /ws/tutor` streams tutor chunks and synchronized visual actions.
- `POST /api/voice/tts` returns ElevenLabs MP3 audio.
- `POST /api/voice/transcribe` transcribes uploaded audio through Deepgram.
- `POST /api/voice/session` starts the Pipecat LiveKit voice bot.
- `POST /api/livekit/token` creates a LiveKit participant token.
- `GET /api/sessions/{session_id}/messages` reads recent local session memory.

The app boots without provider secrets. Provider-backed AI and voice calls return clear errors until the matching keys are configured.
