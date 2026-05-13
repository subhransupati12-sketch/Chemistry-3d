from __future__ import annotations

from server.config import settings
from server.models.schemas import ProviderName


class ChemistryPipecatPipeline:
    """LiveKit voice bot pipeline: LiveKit -> Deepgram STT -> Groq/Gemini LLM -> ElevenLabs TTS."""

    def __init__(self, provider: ProviderName = "groq") -> None:
        self.provider = provider

    async def start(self, room: str, bot_identity: str = "chemistry-tutor-bot") -> None:
        missing = [
            name
            for name, value in {
                "LIVEKIT_URL": settings.livekit_url,
                "LIVEKIT_API_KEY": settings.livekit_api_key,
                "LIVEKIT_API_SECRET": settings.livekit_api_secret,
                "DEEPGRAM_API_KEY": settings.deepgram_api_key,
                "ELEVENLABS_API_KEY": settings.elevenlabs_api_key,
            }.items()
            if not value
        ]
        if self.provider == "groq" and not settings.groq_api_key:
            missing.append("GROQ_API_KEY")
        if self.provider == "gemini" and not settings.gemini_api_key:
            missing.append("GEMINI_API_KEY")
        if missing:
            raise RuntimeError(f"Missing voice pipeline environment variables: {', '.join(missing)}")

        try:
            from pipecat.frames.frames import EndFrame
            from pipecat.pipeline.pipeline import Pipeline
            from pipecat.pipeline.runner import PipelineRunner
            from pipecat.pipeline.task import PipelineParams, PipelineTask
            from pipecat.processors.aggregators.openai_llm_context import OpenAILLMContext
            from pipecat.services.deepgram import DeepgramSTTService
            from pipecat.services.elevenlabs import ElevenLabsTTSService
            from pipecat.services.gemini import GeminiLLMService
            from pipecat.services.groq import GroqLLMService
            from pipecat.transports.services.livekit import LiveKitParams, LiveKitTransport
        except Exception as exc:
            raise RuntimeError(
                "Pipecat voice dependencies are not importable. Install requirements.txt in the backend environment."
            ) from exc

        transport = LiveKitTransport(
            url=settings.livekit_url,
            token=self._bot_token(room, bot_identity),
            room_name=room,
            params=LiveKitParams(audio_in_enabled=True, audio_out_enabled=True, vad_enabled=True),
        )
        stt = DeepgramSTTService(api_key=settings.deepgram_api_key, model="nova-3")
        llm = (
            GeminiLLMService(api_key=settings.gemini_api_key, model=settings.gemini_model)
            if self.provider == "gemini"
            else GroqLLMService(api_key=settings.groq_api_key, model=settings.groq_model)
        )
        tts = ElevenLabsTTSService(api_key=settings.elevenlabs_api_key, voice_id=settings.elevenlabs_voice_id)
        context = OpenAILLMContext(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Chemistry Vision AI, a realtime chemistry professor. Explain molecular structure, "
                        "bonding, reactions, equations, orbitals, lab simulations, and safety conversationally."
                    ),
                }
            ]
        )
        context_aggregator = llm.create_context_aggregator(context)
        pipeline = Pipeline(
            [
                transport.input(),
                stt,
                context_aggregator.user(),
                llm,
                tts,
                transport.output(),
                context_aggregator.assistant(),
            ]
        )
        task = PipelineTask(pipeline, params=PipelineParams(allow_interruptions=True, enable_metrics=True))
        runner = PipelineRunner()
        await runner.run(task)
        await task.queue_frame(EndFrame())

    @staticmethod
    def _bot_token(room: str, identity: str) -> str:
        from livekit import api

        return (
            api.AccessToken(settings.livekit_api_key, settings.livekit_api_secret)
            .with_identity(identity)
            .with_name("Chemistry Vision Tutor")
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=room,
                    can_publish=True,
                    can_subscribe=True,
                    can_publish_data=True,
                )
            )
            .to_jwt()
        )
