def sort_participants(participants: list[dict]) -> list[dict]:
    return sorted(
        participants,
        key=lambda participant: (
            participant["score"],
            participant["completedActivities"],
            participant["firstBonuses"],
        ),
        reverse=True
    )


def add_ranks(participants: list[dict]) -> list[dict]:
    for index, participant in enumerate(participants, start=1):
        participant["rank"] = index

    return participants


def build_leaderboard_entry(participant: dict) -> dict:
    return {
        "rank": participant["rank"],

        "id": participant["id"],

        "number": participant["number"],

        "nickname": participant["nickname"],

        "score": participant["score"],

        "completedActivities": participant["completedActivities"],

        "firstBonuses": participant["firstBonuses"],
        "type": participant.get("account_type", "unknown"),

        "bought": False,

        "canReceivePrize": True,

        "lastUpdate": None,
    }


def build_leaderboard(participants: list[dict]) -> list[dict]:
    participants = sort_participants(participants)

    participants = add_ranks(participants)

    leaderboard = []

    for participant in participants:
        entry = build_leaderboard_entry(participant)

        leaderboard.append(entry)

    return leaderboard