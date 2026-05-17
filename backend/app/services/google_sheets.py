import pandas as pd
import requests
from io import StringIO


SHEETS_ID = "11YysJwXdnipOAAbBglNRa7868zTkK2arF4V01Ry4y0w"
GID = "1727518929"
# GID = "0"

CSV_URL = (
    f"https://docs.google.com/spreadsheets/d/{SHEETS_ID}/export"
    f"?format=csv&gid={GID}"
)
#
# def google_sheets_df() -> pd.DataFrame:
#     response = requests.get(CSV_URL, timeout=15)
#     response.raise_for_status()
#
#     response.encoding = "utf-8"
#
#     df = pd.read_csv(StringIO(response.text))
#
#     # df = df.dropna(axis=1, how="all")
#
#     df.columns = [
#         str(col)
#         .replace("\ufeff", "")
#         .replace("\xa0", " ")
#         .strip()
#         for col in df.columns
#     ]
#
#     if "№" not in df.columns:
#         raise ValueError(f"В таблице не найдена колонка '№'. Колонки: {df.columns.tolist()}")
#
#     price_pool_index = df.columns.get_loc("Баксы Доната")
#     start_indx = df.columns.get_loc("Тип Аккаунта")
#     old_df = df
#     df = df.iloc[:, start_indx:].copy()
#     df.incert(0, "Баксы Доната", old_df.iloc[start_indx: start_indx+1])
#     df = df.reset_index(drop=True)
#
#     # print("COLUMNS AFTER CUT:", df.columns.tolist())
#
#     return df
def google_sheets_df() -> pd.DataFrame:
    response = requests.get(CSV_URL, timeout=15)
    response.raise_for_status()
    response.encoding = "utf-8"

    df = pd.read_csv(StringIO(response.text))

    # Очистка названий колонок
    df.columns = [
        str(col).replace("\ufeff", "").replace("\xa0", " ").strip()
        for col in df.columns
    ]

    if "№" not in df.columns:
        raise ValueError(f"В таблице не найдена колонка '№'. Колонки: {df.columns.tolist()}")

    # Просто переупорядочиваем колонки
    cols = df.columns.tolist()



    if "Баксы Доната" in cols:
        cols.remove("Баксы Доната")

    # Находим индекс колонки "№"
    if "№" in cols:
        nr_index = cols.index("№")
        # Вставляем "Баксы Доната" ПОСЛЕ "№"
        cols.insert(nr_index + 1, "Баксы Доната")
    else:
        # Если "№" нет, вставляем в начало
        cols.insert(0, "Баксы Доната")

    # Обрезаем до нужного порядка
    df = df[cols]
    # print(f"Test df\n{df.head()}")
    # Обрезаем от "Тип Аккаунта" (по вашему желанию)
    if "Тип Аккаунта" in df.columns:
        start_idx = df.columns.get_loc("Тип Аккаунта")
        df = df.iloc[:, start_idx:]

    df = df.reset_index(drop=True)
    # print(f"Конец df\n{df.head()}")
    return df