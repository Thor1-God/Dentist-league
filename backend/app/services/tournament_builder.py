from datetime import datetime

import pandas as pd
from app.services.google_sheets import google_sheets_df
from app.services.leaderboard_builder import build_leaderboard
from app.services.parser import parser_df, get_total_prize_pool
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

def build_tournament_stats(participants: list[dict], df:pd.DataFrame) -> dict:

    prize = get_total_prize_pool(df)
    return {
        "participants": len(participants),

        "activeParticipants": calculate_active_participants(participants),

        "totalCompletedActivities": calculate_total_completed(participants),

        "prizeFundUsd": prize,

        "updatedAt": datetime.now().isoformat(),
    }

def build_tournament() -> dict:
    df = google_sheets_df()
    participants = parser_df(df)

    leaderboard = build_leaderboard(participants)
    # print(f"Leaderboard: {leaderboard}")

    tournament_stats = build_tournament_stats(participants, df)

    return {
        "tournament": tournament_stats,
        "leaderboard": participants,

        "activities": build_activities(),

        "categories": build_categories(),

        "activityResults": build_activity_results(participants),
        "participants": participants,
    }




