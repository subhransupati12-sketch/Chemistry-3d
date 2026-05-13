from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.config import settings
from server.routes import ai, chemistry, health, livekit, sessions, voice
from server.websocket.tutor import router as tutor_ws_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="Chemistry Vision AI API",
    description="Realtime AI chemistry tutor, 3D action synchronization, and voice pipeline orchestration.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])
app.include_router(voice.router, prefix="/api/voice", tags=["voice"])
app.include_router(livekit.router, prefix="/api/livekit", tags=["livekit"])
app.include_router(chemistry.router, prefix="/api/chemistry", tags=["chemistry"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(tutor_ws_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=settings.app_env == "development")
