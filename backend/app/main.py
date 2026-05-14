from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.tournament_builder import build_tournament
from app.cache.memory import get_cache, set_cache, clear_cache
from app.services.participant_builder import build_participant_profile



app = FastAPI(title="Dentist League API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/tournament")
def get_tournament():
    cached = get_cache()

    if cached is not None:
        return cached

    data = build_tournament()
    set_cache(data)
    return data

@app.get("/api/participants/{participant_id}")
def get_participant(participant_id: str):
    cached = get_cache()

    if cached is None:
        cached = build_tournament()
        set_cache(cached)

    participants = cached.get("participants", [])

    if not participants:
        participants = cached.get("leaderboard", [])

    try:
        return build_participant_profile(participants, participant_id)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))


@app.get("/cache/clear")
def clear_tournament_cache():
    clear_cache()
    return {
        "status": "cache cleared"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }
