import pandas as pd


REQUIRED_COLUMNS = [
    "№",
    "Участник",
    "Общее количество очков",
    "Тип Аккаунта",
]


META_COLUMNS = [
    "№",
    "Участник",
    "Общее количество очков",
    "Тип Аккаунта",
]

def parse_number(value) -> float:
    if pd.isna(value):
        return 0.0

    value = str(value).strip()

    if not value:
        return 0.0

    value = value.replace(",", ".")

    try:
        return float(value)
    except:
        return 0.0


def make_participant_id(number: int) -> str:
    return f"P-{number:03d}"

def has_first_bonus(points: float) -> bool:
    decimal = round(points - int(points), 2)
    return decimal == 0.1


def validate_columns(df: pd.DataFrame) -> None:
    missing = []

    for column in REQUIRED_COLUMNS:
        if column not in df.columns:
            missing.append(column)

    if missing:
        raise ValueError(
            f"В таблице нет обязательных колонок: {missing}. "
            f"Есть колонки: {df.columns.tolist()}"
        )
def get_total_prize_pool(df: pd.DataFrame) -> float:
    # print(df.iloc[0, 2])
    return parse_number(df.iloc[0, 2])


def parser_df(df: pd.DataFrame) -> list[dict]:
    validate_columns(df)

    participants = []

    activity_columns = [
        column for column in df.columns
        if column not in META_COLUMNS
    ]



    for _, row in df.iterrows():
        nickname = str(row["Участник"]).strip()
        number = parse_number(row["№"])
        score = parse_number(row["Общее количество очков"])


        account_type = str(row["Тип Аккаунта"]).strip() if "Тип Аккаунта" in df.columns else "unknown"
        if account_type.lower() == "nan" or not account_type:
            account_type = "unknown"

        if not nickname or nickname.lower() == "nan":
            continue

        number = int(number) if number else len(participants) + 1

        activities = {}
        completed_activities = 0
        first_bonuses = 0

        for column in activity_columns:
            points = parse_number(row[column])

            if points <= 0:
                continue

            activities[column] = points
            completed_activities += 1
            if has_first_bonus(points):
                first_bonuses += 1

        participant = {
            "id": make_participant_id(int(number)),
            "number": int(number),
            "nickname": nickname,
            "score": score,
            "account_type": account_type,
            "activities": activities,
            "completedActivities": completed_activities,
            "firstBonuses": first_bonuses,

        }

        participants.append(participant)

    return participants



