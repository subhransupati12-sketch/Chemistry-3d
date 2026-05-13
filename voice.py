from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import Response

from server.models.schemas import TTSRequest, VoiceSessionRequest
from server.pipelines.pipecat_chemistry_pipeline import ChemistryPipecatPipeline
from server.services.deepgram import DeepgramService
from server.services.elevenlabs import ElevenLabsService

router = APIRouter()


@router.post("/tts")
async def text_to_speech(request: TTSRequest) -> Response:
    try:
        audio = await ElevenLabsService().synthesize(request.text)
        return Response(content=audio, media_type="audio/mpeg")
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)) -> dict:
    try:
        content = await audio.read()
        transcript = await DeepgramService().transcribe_prerecorded(content, audio.content_type or "audio/webm")
        return {"transcript": transcript}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc


@router.post("/session")
async def start_voice_session(request: VoiceSessionRequest) -> dict:
    try:
        await ChemistryPipecatPipeline(provider=request.provider).start(room=request.room, bot_identity=request.identity)
        return {"status": "started", "room": request.room, "identity": request.identity}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
