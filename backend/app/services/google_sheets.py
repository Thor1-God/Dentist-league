import pandas as pd
import requests
from io import StringIO


SHEETS_ID = "1hxcUv8jMKoXd0Hc5jZ5mdrtDCljGN5tsOF9YuJtL2cI"
# GID = "1727518929"
GID = "0"

CSV_URL = (
    f"https://docs.google.com/spreadsheets/d/{SHEETS_ID}/export"
    f"?format=csv&gid={GID}"
)

def google_sheets_df() -> pd.DataFrame:
    response = requests.get(CSV_URL, timeout=15)
    response.raise_for_status()

    response.encoding = "utf-8"

    df = pd.read_csv(StringIO(response.text))

    # df = df.dropna(axis=1, how="all")

    df.columns = [
        str(col)
        .replace("\ufeff", "")
        .replace("\xa0", " ")
        .strip()
        for col in df.columns
    ]

    if "№" not in df.columns:
        raise ValueError(f"В таблице не найдена колонка '№'. Колонки: {df.columns.tolist()}")

    start_indx = df.columns.get_loc("№")

    df = df.iloc[:, start_indx:].copy()
    df = df.reset_index(drop=True)

    # print("COLUMNS AFTER CUT:", df.columns.tolist())

    return df
# response = requests.get(CSV_URL, timeout=15)
# response.raise_for_status()
#
# response.encoding = "utf-8"
#
# df = pd.read_csv(StringIO(response.text))
# print([repr(col) for col in df.columns])