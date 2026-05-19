from app.services.activity_config import ACTIVITIES, CATEGORIES


def normalize_id(value) -> str:
    value = str(value).strip()

    if not value or value.lower() == "none":
        return ""

    if value.startswith("P-"):
        number = value.replace("P-", "").strip()

        if number.isdigit():
            return f"P-{int(number):03d}"

        return value

    if value.isdigit():
        return f"P-{int(value):03d}"

    try:
        number = int(float(value))
        return f"P-{number:03d}"
    except:
        return value


def safe_float(value) -> float:
    try:
        return float(value)
    except:
        return 0.0


def find_participant(participants: list[dict], participant_id: str) -> dict | None:
    target_id = normalize_id(participant_id)

    for participant in participants:
        current_id = normalize_id(participant.get("id"))

        if current_id == target_id:
            return participant

        number = participant.get("number")

        if number is not None and normalize_id(number) == target_id:
            return participant

    return None


def get_category_label(category_id: str) -> str:
    for category in CATEGORIES:
        if category["id"] == category_id:
            return category["label"]

    return category_id


def get_activity_category_by_column(column_name: str) -> str:
    clean_column_name = str(column_name).strip()

    for activity in ACTIVITIES:
        clean_columns = [str(col).strip() for col in activity["columns"]]

        if clean_column_name in clean_columns:
            return activity["category"]

    return "other"


def has_first_bonus(points: float) -> bool:
    points = safe_float(points)

    decimal = round(points - int(points), 2)

    return decimal == 0.1


def build_activity_list(participant: dict) -> list[dict]:
    activities = participant.get("activities", {})

    result = []

    for activity_name, points in activities.items():
        points = safe_float(points)

        if points <= 0:
            continue

        category_id = get_activity_category_by_column(activity_name)

        result.append({
            "name": activity_name,
            "points": round(points, 2),
            "categoryId": category_id,
            "category": get_category_label(category_id),
            "firstBonus": has_first_bonus(points),
        })

    result.sort(
        key=lambda item: item["points"],
        reverse=True
    )

    return result


def build_category_stats(participant: dict) -> dict:
    activities = participant.get("activities", {})

    stats = {}

    for activity_name, points in activities.items():
        points = safe_float(points)

        if points <= 0:
            continue

        category_id = get_activity_category_by_column(activity_name)
        # category_label = get_category_label(category_id)

        if category_id not in stats:
            stats[category_id] = 0

        stats[category_id] += points

    return {
        category: round(points, 2)
        for category, points in stats.items()
    }


def build_participant_profile(
    participants: list[dict],
    participant_id: str,
) -> dict:
    participant = find_participant(participants, participant_id)

    if participant is None:
        raise ValueError(f"Участник не найден: {participant_id}")

    activities = build_activity_list(participant)
    print(activities)
    category_stats = build_category_stats(participant)

    return {
        "id": normalize_id(participant.get("id") or participant.get("number")),
        "number": participant.get("number"),
        "nickname": participant.get("nickname"),
        "rank": participant.get("rank"),
        "score": safe_float(participant.get("score", 0)),
        "completedActivities": (
            participant.get("completedActivities")
            or participant.get("completed")
            or 0
        ),
        "firstBonuses": (
            participant.get("firstBonuses")
            or participant.get("firsts")
            or 0
        ),
        "type": participant.get("account_type", "shard"),
        "canReceivePrize": participant.get("canReceivePrize", True),

        "activities": activities,
        "categoryStats": category_stats,

        "heroes": [],
    }
