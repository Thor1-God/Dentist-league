// Настройки связи с backend.
// Если FastAPI запущен отдельно: http://localhost:8000
// Если фронт и backend на одном домене через proxy/nginx, можно оставить пустую строку.
window.DENTIST_API_BASE_URL = "";
window.DENTIST_API_ENDPOINTS = {
	tournament: "/api/tournament",
};
// Как часто обновлять данные на фронте.
window.DENTIST_REFRESH_MS = 30000;
