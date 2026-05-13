import os
from livekit.api import AccessToken, VideoGrants


from server.config import settings


class LiveKitService:
    def create_token(self, identity: str, room: str) -> tuple[str, str]:
        if not settings.livekit_api_key or not settings.livekit_api_secret or not settings.livekit_url:
            raise RuntimeError("LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and LIVEKIT_URL are required")
        token = (
            AccessToken(settings.livekit_api_key, settings.livekit_api_secret)
            .with_identity(identity)
            .with_name(identity)
            .with_grants(
                VideoGrants(
                    room_join=True,
                    room=room,
                    can_publish=True,
                    can_subscribe=True,
                    can_publish_data=True,
                )
            )
            .to_jwt()
        )
        return token, settings.livekit_url
