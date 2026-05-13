from fastapi import APIRouter

from server.models.schemas import ChemistryAction

router = APIRouter()

LATEST_ACTION: ChemistryAction | None = None


@router.post("/action")
async def receive_action(action: ChemistryAction) -> dict:
    global LATEST_ACTION
    LATEST_ACTION = action
    return {"ok": True, "action": action.model_dump()}


@router.get("/action")
async def latest_action() -> dict:
    return {"action": LATEST_ACTION.model_dump() if LATEST_ACTION else None}
