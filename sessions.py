from fastapi import APIRouter

from server.services.session_store import session_store

router = APIRouter()


@router.get("/{session_id}/messages")
async def get_session_messages(session_id: str, limit: int = 20) -> dict:
    messages = await session_store.recent_messages(session_id, limit=max(1, min(limit, 100)))
    return {"session_id": session_id, "messages": messages}
