from datetime import datetime

from app.services.google_sheets import google_sheets_df
from app.services.leaderboard_builder import build_leaderboard
from app.services.parser import parser_df
from app.services.activity_builder import (
    build_activities,
    build_categories,
    build_activity_results
)

def calculate_active_participants(participants: list[dict]) -> int:
    return (len([
        participant
        for participant in participants
        if participant["score"] > 0
    ]))

def calculate_total_completed(participants: list[dict]) -> int:
    return sum(
        participant["completedActivities"]
        for participant in participants
    )

def build_tournament_stats(participants: list[dict]) -> dict:
    return {
        "participants": len(participants),

        "activeParticipants": calculate_active_participants(participants),

        "totalCompletedActivities": calculate_total_completed(participants),

        "prizeFundUsd": 430,

        "updatedAt": datetime.now().isoformat(),
    }

def build_tournament() -> dict:
    df = google_sheets_df()
    participants = parser_df(df)

    leaderboard = build_leaderboard(participants)

    tournament_stats = build_tournament_stats(participants)

    return {
        "tournament": tournament_stats,
        "leaderboard": participants,

        "activities": build_activities(),

        "categories": build_categories(),

        "activityResults": build_activity_results(participants),
        "participants": participants,
    }




