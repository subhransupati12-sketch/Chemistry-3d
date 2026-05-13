import json


def dumps(value: object) -> str:
    return json.dumps(value, separators=(",", ":"))
