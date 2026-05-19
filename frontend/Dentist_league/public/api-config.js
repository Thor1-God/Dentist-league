const isDev =
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1";

window.DENTIST_API_BASE_URL = isDev ? "http://localhost:8001" : "";
window.DENTIST_API_ENDPOINTS = {
	tournament: "/api/tournament",
};
window.DENTIST_REFRESH_MS = 30000;
