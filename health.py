from fastapi import APIRouter

from server.config import settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict:
    return {
        "status": "ok",
        "environment": settings.app_env,
        "providers": {
            "groq": bool(settings.groq_api_key),
            "gemini": bool(settings.gemini_api_key),
            "deepgram": bool(settings.deepgram_api_key),
            "elevenlabs": bool(settings.elevenlabs_api_key),
            "livekit": bool(settings.livekit_api_key and settings.livekit_api_secret and settings.livekit_url),
            "local_session_store": str(settings.session_db_path),
        },
    }
