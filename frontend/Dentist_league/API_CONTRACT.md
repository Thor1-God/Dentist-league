# Dentist League — API contract для FastAPI

Фронт загружает данные с backend по адресу:

```txt
GET http://localhost:8000/api/tournament
```

Адрес можно изменить в файле:

```txt
public/api-config.js
```

По умолчанию фронт обновляет данные каждые 30 секунд.

---

## 1. Главный endpoint

```http
GET /api/tournament
```

Ответ должен быть JSON:

```json
{
  "TOURNAMENT": {
    "fund": 87500,
    "participants": 18,
    "shardCount": 11,
    "boughtCount": 7,
    "closedActivities": 142,
    "startDate": "2026-05-11T00:00:00+03:00",
    "endDate": "2026-06-10T12:00:00+03:00",
    "shardOpening": ["8 мая", "9 мая", "10 мая"],
    "updatedAt": "2026-05-09T12:00:00+03:00"
  },
  "PARTICIPANTS": [
    {
      "id": "P-001",
      "nickname": "ВеспераТень",
      "type": "shard",
      "bought": false,
      "score": 184.4,
      "firsts": 7,
      "completed": 38,
      "lastUpdate": "08.06.2026"
    }
  ],
  "ACTIVITIES": [
    {
      "id": "dragon",
      "category": "dungeons",
      "name": "Дракон",
      "short": "Dragon"
    }
  ],
  "CATEGORIES": [
    {
      "id": "dungeons",
      "label": "Подземелья",
      "glyph": "⛧",
      "desc": "Кампания, Дракон, Паук, Голем, Лава, Альнаме и др."
    }
  ],
  "ACCT_TYPE": {
    "shard": {
      "label": "Шардовый, 500 ₽",
      "prize": true,
      "badge": "blood",
      "short": "ШАРД"
    },
    "void": {
      "label": "void.store",
      "prize": false,
      "badge": "steel",
      "short": "VOID"
    },
    "raidbar": {
      "label": "raid.bar",
      "prize": false,
      "badge": "steel",
      "short": "RAID"
    }
  },
  "SCORING": {
    "dragon": [
      { "stage": "20 этаж", "pts": 1 },
      { "stage": "25 этаж", "pts": 2 },
      { "stage": "1 хард", "pts": 3 },
      { "stage": "6 хард", "pts": 4 },
      { "stage": "10 хард", "pts": 6 }
    ]
  },
  "ACTIVITY_RESULTS": {
    "dragon": [
      {
        "pid": "P-001",
        "stage": "10 хард",
        "pts": 6,
        "first": true,
        "date": "12.05.2026",
        "proofUrl": "https://example.com/screenshot.png"
      }
    ]
  }
}
```

Фронт также понимает camelCase/snake_case:

```json
{
  "tournament": {},
  "participants": [],
  "activities": [],
  "categories": [],
  "accountTypes": {},
  "account_types": {},
  "scoring": {},
  "activityResults": {},
  "activity_results": {}
}
```

---

## 2. Важные поля

### PARTICIPANTS

| Поле | Тип | Для чего |
|---|---|---|
| id | string | ID участника. Должен совпадать с `pid` в результатах активностей |
| nickname | string | Ник участника |
| type | string | `shard`, `void`, `raidbar` |
| bought | boolean | Купленный аккаунт или нет |
| score | number | Общий балл |
| firsts | number | Количество первых закрытий |
| completed | number | Количество закрытых активностей |
| lastUpdate | string | Дата последнего обновления |

### ACTIVITY_RESULTS

Ключ объекта — это `id` активности.

```json
{
  "dragon": [
    {
      "pid": "P-001",
      "stage": "10 хард",
      "pts": 6,
      "first": true,
      "date": "12.05.2026",
      "bonus": "+0.1",
      "proofUrl": "https://..."
    }
  ]
}
```

---

## 3. Как связать с Google Sheets

Рекомендуемая схема:

```txt
Google Sheets → FastAPI → React frontend
```

Фронт НЕ должен напрямую ходить в Google Sheets. Лучше, чтобы FastAPI:

1. Забирал таблицу через Google Sheets API.
2. Преобразовывал строки таблицы в JSON нужного формата.
3. Кэшировал результат в памяти на 30–60 секунд.
4. Отдавал фронту готовый JSON через `/api/tournament`.

Так сайт будет быстрее, стабильнее и проще защищать.

---

## 4. Минимальный пример FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/tournament")
def get_tournament():
    return {
        "TOURNAMENT": {
            "fund": 87500,
            "participants": 1,
            "shardCount": 1,
            "boughtCount": 0,
            "closedActivities": 1,
            "startDate": "2026-05-11T00:00:00+03:00",
            "endDate": "2026-06-10T12:00:00+03:00",
            "shardOpening": ["8 мая", "9 мая", "10 мая"],
            "updatedAt": datetime.now().isoformat(),
        },
        "PARTICIPANTS": [
            {
                "id": "P-001",
                "nickname": "ВеспераТень",
                "type": "shard",
                "bought": False,
                "score": 184.4,
                "firsts": 7,
                "completed": 38,
                "lastUpdate": "08.06.2026",
            }
        ],
        "ACTIVITIES": [
            {"id": "dragon", "category": "dungeons", "name": "Дракон", "short": "Dragon"}
        ],
        "CATEGORIES": [
            {"id": "dungeons", "label": "Подземелья", "glyph": "⛧", "desc": "Дракон, Паук, Голем"}
        ],
        "ACCT_TYPE": {
            "shard": {"label": "Шардовый, 500 ₽", "prize": True, "badge": "blood", "short": "ШАРД"},
            "void": {"label": "void.store", "prize": False, "badge": "steel", "short": "VOID"},
            "raidbar": {"label": "raid.bar", "prize": False, "badge": "steel", "short": "RAID"},
        },
        "SCORING": {
            "dragon": [
                {"stage": "20 этаж", "pts": 1},
                {"stage": "25 этаж", "pts": 2},
                {"stage": "1 хард", "pts": 3},
                {"stage": "6 хард", "pts": 4},
                {"stage": "10 хард", "pts": 6},
            ]
        },
        "ACTIVITY_RESULTS": {
            "dragon": [
                {"pid": "P-001", "stage": "10 хард", "pts": 6, "first": True, "date": "12.05.2026"}
            ]
        },
    }
```

---

## 5. Запуск связки

Backend:

```bash
uvicorn main:app --reload --port 8000
```

Frontend:

```bash
npm install
npm run dev
```

Фронт будет обращаться сюда:

```txt
http://localhost:8000/api/tournament
```

Если API недоступен, сайт не падает: он показывает demo-данные из `public/data.js`.
