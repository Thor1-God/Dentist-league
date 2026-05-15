/* Mock data simulating Google Sheets feed */

const ACTIVITIES = [
	// Подземелья
	{
		id: "campaign",
		category: "dungeons",
		name: "Адская кампания",
		short: "Hellish Campaign",
	},
	{
		id: "citadel",
		category: "dungeons",
		name: "Цитадели красок",
		short: "Citadels",
	},
	{
		id: "twoface",
		category: "dungeons",
		name: "Двуликий страж",
		short: "Two-Faced",
	},
	{ id: "dragon", category: "dungeons", name: "Дракон", short: "Dragon" },
	{ id: "spider", category: "dungeons", name: "Паук", short: "Spider" },
	{
		id: "icegolem",
		category: "dungeons",
		name: "Ледяной голем",
		short: "Ice Golem",
	},
	{ id: "lava", category: "dungeons", name: "Лава", short: "Magma" },
	{ id: "alname", category: "dungeons", name: "Альнаме", short: "Alname" },
	{ id: "shogun", category: "dungeons", name: "Сегун", short: "Shogun" },

	// Арена и миссии
	{
		id: "arena",
		category: "arena",
		name: "Арена — голд V",
		short: "Arena Gold V",
		pts: 1,
	},
	{
		id: "platinum",
		category: "arena",
		name: "Вход в платину",
		short: "Platinum",
		pts: 2,
	},
	{
		id: "plat-top",
		category: "arena",
		name: "Сундук платины / TOP-500",
		short: "Plat Chest",
		pts: 5,
	},
	{
		id: "arbiter",
		category: "arena",
		name: "Получение Арбитра",
		short: "Arbiter",
		pts: 5,
	},

	// Босс
	{
		id: "cb-impossible",
		category: "cb",
		name: "Невозможный, макс. сундук, 1 ключ",
		short: "Impossible CB",
		pts: 1,
	},
	{
		id: "cb-hellish",
		category: "cb",
		name: "Адский, макс. сундук, 1 ключ",
		short: "Hellish CB",
		pts: 3,
	},
	{
		id: "cb-uh-2",
		category: "cb",
		name: "Ультраадский, 2 ключа",
		short: "UH 2-key",
		pts: 4,
	},
	{
		id: "cb-uh-1",
		category: "cb",
		name: "Ультраадский, 1 ключ",
		short: "UH 1-key",
		pts: 6,
	},

	// Гидра
	{ id: "hydra", category: "hydra", name: "Гидра", short: "Hydra" },

	// Химера
	{ id: "chimera", category: "chimera", name: "Химера", short: "Chimera" },

	// Мрачный лес
	{
		id: "forest",
		category: "forest",
		name: "Мрачный лес",
		short: "Doom Tower Forest",
	},

	// Башня
	{
		id: "tower",
		category: "tower",
		name: "Роковая башня",
		short: "Doom Tower",
	},

	// Войны фракций
	{
		id: "factions",
		category: "factions",
		name: "Войны фракций",
		short: "Faction Wars",
		pts: 5,
	},
];

const CATEGORIES = [
	{
		id: "dungeons",
		label: "Подземелья",
		glyph: "⛧",
		desc: "Кампания, Дракон, Паук, Голем, Лава, Альнаме и др.",
	},
	{
		id: "arena",
		label: "Арена и миссии",
		glyph: "⚔",
		desc: "Голд V, Платина, Топ-500, Арбитр",
	},
	{
		id: "cb",
		label: "Клан-Босс",
		glyph: "☥",
		desc: "Невозможный, Адский, Ультраадский",
	},
	{ id: "hydra", label: "Гидра", glyph: "✶", desc: "Обычный → Адский" },
	{
		id: "chimera",
		label: "Химера",
		glyph: "☄",
		desc: "Простой → Ультраадский",
	},
	{
		id: "forest",
		label: "Мрачный лес",
		glyph: "♆",
		desc: "Лешун, приспешники, мимики, фиолетовые этажи",
	},
	{
		id: "tower",
		label: "Роковая башня",
		glyph: "✦",
		desc: "Обычный, Хард 80–120",
	},
	{
		id: "factions",
		label: "Войны фракций",
		glyph: "✠",
		desc: "63 звезды по любой фракции",
	},
];

const PARTICIPANTS = [
	{
		id: "P-001",
		nickname: "ВеспераТень",
		type: "shard",
		bought: false,
		score: 184.4,
		firsts: 7,
		completed: 38,
		lastUpdate: "08.06.2026",
	},
	{
		id: "P-002",
		nickname: "ИкарусБлэйд",
		type: "void",
		bought: true,
		score: 178.1,
		firsts: 4,
		completed: 41,
		lastUpdate: "09.06.2026",
	},
	{
		id: "P-003",
		nickname: "Вирмфолл",
		type: "shard",
		bought: false,
		score: 171.25,
		firsts: 5,
		completed: 36,
		lastUpdate: "07.06.2026",
	},
	{
		id: "P-004",
		nickname: "ХладКоронован",
		type: "raidbar",
		bought: true,
		score: 162.75,
		firsts: 3,
		completed: 34,
		lastUpdate: "09.06.2026",
	},
	{
		id: "P-005",
		nickname: "ОбсидианЧасовой",
		type: "shard",
		bought: false,
		score: 154.2,
		firsts: 6,
		completed: 32,
		lastUpdate: "06.06.2026",
	},
	{
		id: "P-006",
		nickname: "ПепелКлинок",
		type: "shard",
		bought: false,
		score: 142.05,
		firsts: 2,
		completed: 31,
		lastUpdate: "08.06.2026",
	},
	{
		id: "P-007",
		nickname: "СтальнаяСова",
		type: "void",
		bought: true,
		score: 136.5,
		firsts: 1,
		completed: 30,
		lastUpdate: "07.06.2026",
	},
	{
		id: "P-008",
		nickname: "Ноктурн.7",
		type: "shard",
		bought: false,
		score: 128.9,
		firsts: 3,
		completed: 28,
		lastUpdate: "05.06.2026",
	},
	{
		id: "P-009",
		nickname: "Гримхольд",
		type: "raidbar",
		bought: true,
		score: 121.15,
		firsts: 0,
		completed: 27,
		lastUpdate: "08.06.2026",
	},
	{
		id: "P-010",
		nickname: "СереброБой",
		type: "shard",
		bought: false,
		score: 117.3,
		firsts: 2,
		completed: 25,
		lastUpdate: "06.06.2026",
	},
	{
		id: "P-011",
		nickname: "БаронКрови",
		type: "shard",
		bought: false,
		score: 109.55,
		firsts: 1,
		completed: 23,
		lastUpdate: "07.06.2026",
	},
	{
		id: "P-012",
		nickname: "ТьмаШепчет",
		type: "void",
		bought: true,
		score: 102.4,
		firsts: 0,
		completed: 22,
		lastUpdate: "08.06.2026",
	},
	{
		id: "P-013",
		nickname: "Веригарт",
		type: "shard",
		bought: false,
		score: 94.85,
		firsts: 1,
		completed: 19,
		lastUpdate: "04.06.2026",
	},
	{
		id: "P-014",
		nickname: "АшерКаст",
		type: "shard",
		bought: false,
		score: 88.1,
		firsts: 0,
		completed: 18,
		lastUpdate: "05.06.2026",
	},
	{
		id: "P-015",
		nickname: "ЛезвиеЗари",
		type: "raidbar",
		bought: true,
		score: 76.45,
		firsts: 1,
		completed: 16,
		lastUpdate: "07.06.2026",
	},
	{
		id: "P-016",
		nickname: "Меркор-77",
		type: "shard",
		bought: false,
		score: 64.2,
		firsts: 0,
		completed: 14,
		lastUpdate: "03.06.2026",
	},
	{
		id: "P-017",
		nickname: "ВойдВоин",
		type: "void",
		bought: true,
		score: 52.65,
		firsts: 0,
		completed: 11,
		lastUpdate: "06.06.2026",
	},
	{
		id: "P-018",
		nickname: "ЧерныйОбсидиан",
		type: "shard",
		bought: false,
		score: 41.3,
		firsts: 0,
		completed: 9,
		lastUpdate: "02.06.2026",
	},
];

const ACCT_TYPE = {
	shard: {
		label: "Шардовый, 500 ₽",
		prize: true,
		badge: "blood",
		short: "ШАРД",
	},
	// void: { label: "void.store", prize: false, badge: "steel", short: "VOID" },
	// raidbar: { label: "raid.bar", prize: false, badge: "steel", short: "RAID" },
	own: {
		label: "Собственный аккаунт",
		prize: false,
		badge: "steel",
		short: "СВОЙ",
	},
};

// Stage scoring tables (for activity modal)
const SCORING = {
	dragon: [
		{ stage: "20 этаж", pts: 1 },
		{ stage: "25 этаж", pts: 2 },
		{ stage: "1 хард", pts: 3 },
		{ stage: "6 хард", pts: 4 },
		{ stage: "10 хард", pts: 6 },
	],
	spider: [
		{ stage: "20 этаж", pts: 1 },
		{ stage: "25 этаж", pts: 2 },
		{ stage: "1 хард", pts: 3 },
		{ stage: "6 хард", pts: 4 },
		{ stage: "10 хард", pts: 6 },
	],
	campaign: [{ stage: "Полное прохождение", pts: 6 }],
	citadel: [
		{ stage: "1 хард", pts: 3 },
		{ stage: "6 хард", pts: 4 },
		{ stage: "10 хард", pts: 6 },
	],
	twoface: [{ stage: "Полный сундук", pts: 4 }],
	icegolem: [
		{ stage: "20 этаж", pts: 1 },
		{ stage: "25 этаж", pts: 2 },
		{ stage: "10 хард", pts: 6 },
	],
	lava: [
		{ stage: "1 хард", pts: 3 },
		{ stage: "2 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "3 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "4 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "5 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "6 хард", pts: 4 },
		{ stage: "7 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "8 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "9 хард", pts: 0.25, note: "без бонуса +0.1" },
		{ stage: "10 хард", pts: 6 },
	],
	alname: [{ stage: "Полное прохождение", pts: 5 }],
	shogun: [{ stage: "Полное прохождение", pts: 5 }],
	hydra: [
		{ stage: "Обычный", pts: 1 },
		{ stage: "Трудный", pts: 4 },
		{ stage: "Невозможный", pts: 5 },
		{ stage: "Адский", pts: 7 },
	],
	chimera: [
		{ stage: "Простой", pts: 1 },
		{ stage: "Обычный", pts: 2 },
		{ stage: "Трудный", pts: 4 },
		{ stage: "Невозможный", pts: 5 },
		{ stage: "Адский", pts: 7 },
		{ stage: "Ультраадский", pts: 9 },
	],
	tower: [
		{ stage: "Обычный — полное", pts: 3 },
		{ stage: "Хард 80", pts: 1 },
		{ stage: "Хард 90", pts: 1 },
		{ stage: "Хард 100", pts: 1 },
		{ stage: "Хард 110", pts: 1 },
		{ stage: "Хард 120", pts: 5 },
	],
	forest: [
		{ stage: "Обычный — Лешун", pts: 3 },
		{ stage: "Обычный — приспешник", pts: 0.5 },
		{ stage: "Обычный — корона", pts: 1 },
		{ stage: "Хард — корона", pts: 2 },
		{ stage: "Хард — приспешник", pts: 1 },
		{ stage: "Хард — Лешун", pts: 9 },
		{ stage: "Хард — мимик", pts: 0.5 },
		{ stage: "Хард — фиолетовый этаж после Лешуна", pts: 3 },
	],
	factions: [{ stage: "63 звезды по любой фракции", pts: 5 }],
};

// Per-activity sample leaderboards (rendered in activity modal)
const ACTIVITY_RESULTS = {
	dragon: [
		{ pid: "P-001", stage: "10 хард", pts: 6, first: true, date: "12.05.2026" },
		{
			pid: "P-002",
			stage: "10 хард",
			pts: 6,
			first: false,
			date: "14.05.2026",
		},
		{ pid: "P-005", stage: "6 хард", pts: 4, first: false, date: "16.05.2026" },
		{ pid: "P-003", stage: "6 хард", pts: 4, first: false, date: "18.05.2026" },
		{ pid: "P-004", stage: "1 хард", pts: 3, first: false, date: "11.05.2026" },
		{
			pid: "P-006",
			stage: "25 этаж",
			pts: 2,
			first: false,
			date: "13.05.2026",
		},
		{
			pid: "P-008",
			stage: "25 этаж",
			pts: 2,
			first: false,
			date: "20.05.2026",
		},
		{
			pid: "P-010",
			stage: "20 этаж",
			pts: 1,
			first: false,
			date: "21.05.2026",
		},
	],
	spider: [
		{ pid: "P-002", stage: "10 хард", pts: 6, first: true, date: "13.05.2026" },
		{
			pid: "P-001",
			stage: "10 хард",
			pts: 6,
			first: false,
			date: "15.05.2026",
		},
		{ pid: "P-003", stage: "6 хард", pts: 4, first: false, date: "17.05.2026" },
		{ pid: "P-005", stage: "6 хард", pts: 4, first: false, date: "19.05.2026" },
		{ pid: "P-004", stage: "1 хард", pts: 3, first: false, date: "13.05.2026" },
		{
			pid: "P-007",
			stage: "25 этаж",
			pts: 2,
			first: false,
			date: "14.05.2026",
		},
	],
	hydra: [
		{ pid: "P-001", stage: "Адский", pts: 7, first: true, date: "20.05.2026" },
		{
			pid: "P-002",
			stage: "Невозможный",
			pts: 5,
			first: false,
			date: "22.05.2026",
		},
		{
			pid: "P-003",
			stage: "Невозможный",
			pts: 5,
			first: false,
			date: "23.05.2026",
		},
		{
			pid: "P-005",
			stage: "Трудный",
			pts: 4,
			first: false,
			date: "21.05.2026",
		},
		{
			pid: "P-007",
			stage: "Обычный",
			pts: 1,
			first: false,
			date: "19.05.2026",
		},
	],
	chimera: [
		{
			pid: "P-002",
			stage: "Ультраадский",
			pts: 9,
			first: true,
			date: "25.05.2026",
		},
		{ pid: "P-001", stage: "Адский", pts: 7, first: false, date: "27.05.2026" },
		{
			pid: "P-003",
			stage: "Невозможный",
			pts: 5,
			first: false,
			date: "26.05.2026",
		},
		{
			pid: "P-004",
			stage: "Трудный",
			pts: 4,
			first: false,
			date: "28.05.2026",
		},
	],
	tower: [
		{
			pid: "P-001",
			stage: "Хард 120",
			pts: 5,
			first: true,
			date: "29.05.2026",
		},
		{
			pid: "P-002",
			stage: "Хард 110",
			pts: 1,
			first: false,
			date: "30.05.2026",
		},
		{
			pid: "P-003",
			stage: "Хард 100",
			pts: 1,
			first: false,
			date: "30.05.2026",
		},
		{
			pid: "P-005",
			stage: "Обычный",
			pts: 3,
			first: false,
			date: "27.05.2026",
		},
	],
	forest: [
		{
			pid: "P-005",
			stage: "Хард — Лешун",
			pts: 9,
			first: true,
			date: "01.06.2026",
		},
		{
			pid: "P-001",
			stage: "Хард — Лешун",
			pts: 9,
			first: false,
			date: "02.06.2026",
		},
		{
			pid: "P-002",
			stage: "Обычный — Лешун",
			pts: 3,
			first: false,
			date: "31.05.2026",
		},
		{
			pid: "P-003",
			stage: "Хард — корона",
			pts: 2,
			first: false,
			date: "01.06.2026",
		},
	],
	campaign: [
		{
			pid: "P-001",
			stage: "Полное прохождение",
			pts: 6,
			first: true,
			date: "10.05.2026",
		},
		{
			pid: "P-002",
			stage: "Полное прохождение",
			pts: 6,
			first: false,
			date: "11.05.2026",
		},
		{
			pid: "P-003",
			stage: "Полное прохождение",
			pts: 6,
			first: false,
			date: "11.05.2026",
		},
		{
			pid: "P-004",
			stage: "Полное прохождение",
			pts: 6,
			first: false,
			date: "12.05.2026",
		},
	],
	arbiter: [
		{
			pid: "P-001",
			stage: "Получение Арбитра",
			pts: 5,
			first: true,
			date: "06.06.2026",
			bonus: "+10$",
		},
		{
			pid: "P-002",
			stage: "Получение Арбитра",
			pts: 5,
			first: false,
			date: "07.06.2026",
		},
	],
};

// Per-participant category distribution + activity history (deterministic)
function buildParticipantDetail(p) {
	const seed = parseInt(p.id.replace(/\D/g, ""), 10) || 1;
	const rng = (n) => ((seed * (n + 7) * 9301 + 49297) % 233280) / 233280;
	const split = {
		dungeons: 0.36,
		arena: 0.1,
		cb: 0.12,
		hydra: 0.08,
		chimera: 0.07,
		forest: 0.1,
		tower: 0.09,
		factions: 0.05,
		other: 0.03,
	};
	const dist = {};
	let total = 0;
	Object.entries(split).forEach(([k, w], i) => {
		const wobble = 0.85 + rng(i) * 0.3;
		dist[k] = Math.round(p.score * w * wobble * 10) / 10;
		total += dist[k];
	});
	// Normalize roughly
	const factor = p.score / total;
	Object.keys(dist).forEach(
		(k) => (dist[k] = Math.round(dist[k] * factor * 10) / 10)
	);

	const activitySamples = [
		{
			aid: "dragon",
			stage: "10 хард",
			pts: 6,
			first: rng(1) > 0.7,
			date: "12.05.2026",
		},
		{
			aid: "spider",
			stage: "6 хард",
			pts: 4,
			first: false,
			date: "15.05.2026",
		},
		{
			aid: "hydra",
			stage: "Невозможный",
			pts: 5,
			first: rng(2) > 0.85,
			date: "21.05.2026",
		},
		{
			aid: "chimera",
			stage: "Адский",
			pts: 7,
			first: false,
			date: "26.05.2026",
		},
		{
			aid: "tower",
			stage: "Хард 100",
			pts: 1,
			first: false,
			date: "29.05.2026",
		},
		{
			aid: "forest",
			stage: "Хард — Лешун",
			pts: 9,
			first: rng(3) > 0.75,
			date: "01.06.2026",
		},
		{ aid: "lava", stage: "6 хард", pts: 4, first: false, date: "18.05.2026" },
		{
			aid: "cb-uh-2",
			stage: "УХ за 2 ключа",
			pts: 4,
			first: false,
			date: "13.05.2026",
		},
		{
			aid: "factions",
			stage: "63★ Знание",
			pts: 5,
			first: false,
			date: "23.05.2026",
		},
		{
			aid: "arena",
			stage: "Платина",
			pts: 2,
			first: false,
			date: "11.05.2026",
		},
	].slice(0, 6 + Math.floor(rng(4) * 4));

	return { dist, activitySamples };
}

// Tournament-wide
const TOURNAMENT = {
	fund: 87500, // ₽
	participants: PARTICIPANTS.length,
	shardCount: PARTICIPANTS.filter((p) => p.type === "shard").length,
	boughtCount: PARTICIPANTS.filter((p) => p.type !== "shard").length,
	closedActivities: 142,
	endDate: new Date("2026-06-10T12:00:00+03:00"),
	startDate: new Date("2026-05-11T00:00:00+03:00"),
	shardOpening: ["8 мая", "9 мая", "10 мая"],
};

window.LIGADOK = {
	ACTIVITIES,
	CATEGORIES,
	PARTICIPANTS,
	ACCT_TYPE,
	SCORING,
	ACTIVITY_RESULTS,
	TOURNAMENT,
	buildParticipantDetail,
};
