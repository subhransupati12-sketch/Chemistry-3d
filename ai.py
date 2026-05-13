import json

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from server.models.schemas import TutorRequest
from server.services.action_sync import infer_visual_action
from server.services.tutor import tutor_service

router = APIRouter()


@router.post("/stream")
async def stream_tutor_answer(request: TutorRequest) -> StreamingResponse:
    async def event_stream():
        full_text = ""
        try:
            async for chunk in tutor_service.stream_answer("http-session", request.message, request.molecule_id, request.provider):
                full_text += chunk
                yield f"data: {chunk}\n\n"
            action = infer_visual_action(full_text, request.molecule_id)
            if action:
                yield f"event: action\ndata: {json.dumps(action)}\n\n"
        except Exception as exc:
            yield f"event: error\ndata: {str(exc)}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@router.post("/complete")
async def complete_tutor_answer(request: TutorRequest) -> dict:
    try:
        parts = []
        async for chunk in tutor_service.stream_answer("http-session", request.message, request.molecule_id, request.provider):
            parts.append(chunk)
        content = "".join(parts)
        return {"content": content, "action": infer_visual_action(content, request.molecule_id)}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
