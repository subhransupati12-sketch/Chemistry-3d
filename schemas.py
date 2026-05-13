from typing import Literal

from pydantic import BaseModel, Field


ProviderName = Literal["groq", "gemini"]


class TutorRequest(BaseModel):
    message: str = Field(min_length=1, max_length=5000)
    molecule_id: str = Field(default="methane")
    provider: ProviderName = "groq"
    message_id: str | None = None


class TutorResponse(BaseModel):
    content: str
    action: dict | None = None


class TTSRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)


class LiveKitTokenRequest(BaseModel):
    identity: str = Field(min_length=1, max_length=128)
    room: str = Field(min_length=1, max_length=128)


class LiveKitTokenResponse(BaseModel):
    token: str
    url: str
    room: str


class ChemistryAction(BaseModel):
    type: str
    moleculeId: str | None = None
    atomIds: list[str] | None = None
    bondIds: list[str] | None = None
    label: str | None = None
    intensity: float | None = None
    durationMs: int | None = None


class VoiceSessionRequest(BaseModel):
    room: str
    identity: str = "chemistry-tutor-bot"
    provider: ProviderName = "groq"
