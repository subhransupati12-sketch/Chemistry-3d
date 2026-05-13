import httpx

from server.config import settings


class ElevenLabsService:
    def __init__(
        self,
        api_key: str | None = settings.elevenlabs_api_key,
        voice_id: str = settings.elevenlabs_voice_id,
    ):
        self.api_key = api_key
        self.voice_id = voice_id

    async def synthesize(self, text: str) -> bytes:
        if not self.api_key:
            raise RuntimeError("ELEVENLABS_API_KEY is not configured")
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{self.voice_id}/stream"
        payload = {
            "text": text,
            "model_id": "eleven_flash_v2_5",
            "voice_settings": {"stability": 0.48, "similarity_boost": 0.72, "style": 0.18, "use_speaker_boost": True},
        }
        headers = {"xi-api-key": self.api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"}
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            return response.content
