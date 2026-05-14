from collections import defaultdict
from app.services.activity_config import ACTIVITIES, CATEGORIES



def build_activities():
    return [
        {
            "id": a["id"],
            "category": a["category"],
            "name": a["name"],
        }
        for a in ACTIVITIES
    ]

def build_categories():
    return CATEGORIES


def build_activity_results(participants: list[dict]):
    results = {}

    for activity in ACTIVITIES:
        activity_id = activity["id"]
        activity_results = []

        for participant in participants:
            total_points = 0
            best_stage = None

            participant_activities = participant.get("activities", {})

            for column in activity["columns"]:
                value = participant_activities.get(column, 0)

                try:
                    value = float(value)
                except:
                    value = 0

                if value > 0:
                    total_points += value
                    best_stage = column

            if total_points > 0:
                activity_results.append({
                    "pid": participant["id"],
                    "stage": best_stage,
                    "pts": round(total_points, 2),
                    "first": False,
                    "date": participant.get("lastUpdate", "—")
                })

        activity_results.sort(
            key=lambda x: x["pts"],
            reverse=True
        )

        results[activity_id] = activity_results

    return results
