# Dentist League

React/Vite frontend для турнира «Лига Дока».

## Запуск

```bash
npm install
npm run dev
```

## Связь с FastAPI

Фронт ждёт данные от backend:

```txt
GET http://localhost:8000/api/tournament
```

Настройка адреса API находится здесь:

```txt
public/api-config.js
```

По умолчанию данные обновляются каждые 30 секунд.

Если сервер недоступен, фронт покажет demo-данные из `public/data.js`, чтобы дизайн не ломался.

Полный контракт данных смотри в файле:

```txt
API_CONTRACT.md
```
