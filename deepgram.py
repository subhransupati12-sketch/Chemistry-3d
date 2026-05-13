import httpx

from server.config import settings


class DeepgramService:
    def __init__(self, api_key: str | None = settings.deepgram_api_key):
        self.api_key = api_key

    async def transcribe_prerecorded(self, audio: bytes, mimetype: str = "audio/webm") -> str:
        if not self.api_key:
            raise RuntimeError("DEEPGRAM_API_KEY is not configured")
        params = {"model": "nova-3", "smart_format": "true", "punctuate": "true"}
        headers = {"Authorization": f"Token {self.api_key}", "Content-Type": mimetype}
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
            response = await client.post("https://api.deepgram.com/v1/listen", params=params, headers=headers, content=audio)
            response.raise_for_status()
            payload = response.json()
            return payload["results"]["channels"][0]["alternatives"][0].get("transcript", "")
