from fastapi import APIRouter, HTTPException

from server.models.schemas import LiveKitTokenRequest, LiveKitTokenResponse
from server.services.livekit_service import LiveKitService

router = APIRouter()


@router.post("/token", response_model=LiveKitTokenResponse)
async def create_livekit_token(request: LiveKitTokenRequest) -> LiveKitTokenResponse:
    try:
        token, url = LiveKitService().create_token(request.identity, request.room)
        return LiveKitTokenResponse(token=token, url=url, room=request.room)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
