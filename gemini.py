from collections.abc import AsyncIterator

import httpx

from server.config import settings


class GeminiService:
    def __init__(self, api_key: str | None = settings.gemini_api_key, model: str = settings.gemini_model):
        self.api_key = api_key
        self.model = model

    def _endpoint(self) -> str:
        if not self.api_key:
            raise RuntimeError("GEMINI_API_KEY is not configured")
        return f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:streamGenerateContent?alt=sse&key={self.api_key}"

    @staticmethod
    def _convert_messages(messages: list[dict[str, str]]) -> dict:
        system_parts = [message["content"] for message in messages if message["role"] == "system"]
        contents = []
        for message in messages:
            if message["role"] == "system":
                continue
            role = "model" if message["role"] == "assistant" else "user"
            contents.append({"role": role, "parts": [{"text": message["content"]}]})
        return {
            "systemInstruction": {"parts": [{"text": "\n\n".join(system_parts)}]},
            "contents": contents,
            "generationConfig": {"temperature": 0.45, "maxOutputTokens": 900},
        }

    async def stream_chat(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
            async with client.stream("POST", self._endpoint(), json=self._convert_messages(messages)) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if not line.startswith("data: "):
                        continue
                    try:
                        payload = httpx.Response(200, content=line.removeprefix("data: ").strip()).json()
                        for candidate in payload.get("candidates", []):
                            for part in candidate.get("content", {}).get("parts", []):
                                text = part.get("text")
                                if text:
                                    yield text
                    except Exception:
                        continue
