from collections.abc import AsyncIterator

from server.models.schemas import ProviderName
from server.services.gemini import GeminiService
from server.services.groq import GroqService
from server.services.prompts import build_messages
from server.services.session_store import session_store


class TutorService:
    def __init__(self) -> None:
        self.memory: dict[str, list[dict[str, str]]] = {}

    async def stream_answer(
        self,
        session_id: str,
        message: str,
        molecule_id: str,
        provider: ProviderName = "groq",
    ) -> AsyncIterator[str]:
        memory = self.memory.get(session_id)
        if memory is None:
            memory = await session_store.recent_messages(session_id)
            self.memory[session_id] = memory
        messages = build_messages(message, molecule_id, memory)
        service = GeminiService() if provider == "gemini" else GroqService()
        response_parts: list[str] = []
        async for chunk in service.stream_chat(messages):
            response_parts.append(chunk)
            yield chunk
        memory.extend(
            [
                {"role": "user", "content": message},
                {"role": "assistant", "content": "".join(response_parts)},
            ]
        )
        del memory[:-20]
        await session_store.record_message(session_id, "user", message)
        await session_store.record_message(session_id, "assistant", "".join(response_parts))


tutor_service = TutorService()
