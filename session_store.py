from __future__ import annotations

import asyncio
import sqlite3
from pathlib import Path

from server.config import settings


class SessionStore:
    """Small SQLite session memory store used instead of a cloud database."""

    def __init__(self, db_path: Path = settings.session_db_path) -> None:
        self.db_path = db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._initialize()

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        return connection

    def _initialize(self) -> None:
        with self._connect() as connection:
            connection.execute(
                """
                create table if not exists tutor_messages (
                    id integer primary key autoincrement,
                    session_id text not null,
                    role text not null check (role in ('user', 'assistant', 'system')),
                    content text not null,
                    created_at datetime not null default current_timestamp
                )
                """
            )
            connection.execute(
                "create index if not exists idx_tutor_messages_session_created on tutor_messages(session_id, created_at)"
            )

    async def record_message(self, session_id: str, role: str, content: str) -> None:
        if not content.strip():
            return
        await asyncio.to_thread(self._record_message_sync, session_id, role, content)

    def _record_message_sync(self, session_id: str, role: str, content: str) -> None:
        with self._connect() as connection:
            connection.execute(
                "insert into tutor_messages(session_id, role, content) values (?, ?, ?)",
                (session_id, role, content),
            )

    async def recent_messages(self, session_id: str, limit: int = 10) -> list[dict[str, str]]:
        return await asyncio.to_thread(self._recent_messages_sync, session_id, limit)

    def _recent_messages_sync(self, session_id: str, limit: int) -> list[dict[str, str]]:
        with self._connect() as connection:
            rows = connection.execute(
                """
                select role, content
                from tutor_messages
                where session_id = ?
                order by id desc
                limit ?
                """,
                (session_id, limit),
            ).fetchall()
        return [{"role": row["role"], "content": row["content"]} for row in reversed(rows)]


session_store = SessionStore()
