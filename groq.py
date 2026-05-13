from collections.abc import AsyncIterator

import httpx

from server.config import settings


class GroqService:
    endpoint = "https://api.groq.com/openai/v1/chat/completions"

    def __init__(self, api_key: str | None = settings.groq_api_key, model: str = settings.groq_model):
        self.api_key = api_key
        self.model = model

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            raise RuntimeError("GROQ_API_KEY is not configured")
        return {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}

    async def stream_chat(self, messages: list[dict[str, str]]) -> AsyncIterator[str]:
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.45,
            "max_tokens": 900,
            "stream": True,
        }
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0)) as client:
            async with client.stream("POST", self.endpoint, headers=self._headers(), json=payload) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if not line.startswith("data: "):
                        continue
                    data = line.removeprefix("data: ").strip()
                    if data == "[DONE]":
                        break
                    try:
                        chunk = httpx.Response(200, content=data).json()
                        content = chunk["choices"][0].get("delta", {}).get("content")
                        if content:
                            yield content
                    except Exception:
                        continue
