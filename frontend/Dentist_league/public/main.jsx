/* eslint-disable */
const { useState, useEffect } = React;

const {
	Header,
	Hero,
	Leaderboard,
	Activities,
	ActivityModal,
	ParticipantModal,
} = window.LDComponents;

const LDIcon = window.LDIcon;

function normalizeTournamentPayload(payload) {
	const base = window.LIGADOK || {};
	const next = payload && payload.data ? payload.data : payload;

	if (!next || typeof next !== "object") return base;

	const tournament = next.TOURNAMENT || next.tournament || {};

	const merged = {
		...base,
		...next,
		TOURNAMENT: {
			...(base.TOURNAMENT || {}),
			...tournament,
		},
	};

	if (next.activities) merged.ACTIVITIES = next.activities;
	if (next.categories) merged.CATEGORIES = next.categories;
	if (next.accountTypes) merged.ACCT_TYPE = next.accountTypes;
	if (next.account_types) merged.ACCT_TYPE = next.account_types;
	if (next.scoring) merged.SCORING = next.scoring;
	if (next.activityResults) merged.ACTIVITY_RESULTS = next.activityResults;
	if (next.activity_results) merged.ACTIVITY_RESULTS = next.activity_results;

	if (next.leaderboard) {
		merged.PARTICIPANTS = next.leaderboard.map((p) => {
			// Определяем тип: сначала смотрим account_type, потом type
			let accountType = p.account_type || p.type || "shard";

			// Маппинг для отображения на фронтенде
			const typeMapping = {
				Шард: "shard",
				Свой: "own",
				шард: "shard",
				свой: "own",
			};

			// Преобразуем в ключ для ACCT_TYPE
			let typeKey = typeMapping[accountType] || accountType;

			return {
				...p,
				id:
					p.id ||
					p.participantId ||
					`P-${String(p.number || 0).padStart(3, "0")}`,
				nickname: p.nickname || "Без имени",
				score: Number(p.score ?? 0),
				completed: p.completed ?? p.completedActivities ?? 0,
				firsts: p.firsts ?? p.firstBonuses ?? 0,
				type: typeKey, // Используем преобразованный тип
				account_type: accountType, // Сохраняем оригинал для отладки
				bought: p.bought ?? typeKey !== "shard",
				lastUpdate: p.lastUpdate || tournament.updatedAt || "—",
			};
		});
	}
	if (
		merged.TOURNAMENT?.endDate &&
		!(merged.TOURNAMENT.endDate instanceof Date)
	) {
		merged.TOURNAMENT.endDate = new Date(merged.TOURNAMENT.endDate);
	}

	if (
		merged.TOURNAMENT?.startDate &&
		!(merged.TOURNAMENT.startDate instanceof Date)
	) {
		merged.TOURNAMENT.startDate = new Date(merged.TOURNAMENT.startDate);
	}

	if (next.leaderboard) {
		delete merged.buildParticipantDetail;
	}

	return merged;
}

async function loadTournamentFromApi({ signal } = {}) {
	const baseUrl = window.DENTIST_API_BASE_URL || "";
	const endpoint =
		window.DENTIST_API_ENDPOINTS?.tournament || "/api/tournament";
	const url = `${baseUrl}${endpoint}`;

	const res = await fetch(url, {
		method: "GET",
		headers: { Accept: "application/json" },
		cache: "no-store",
		signal,
	});

	if (!res.ok) {
		throw new Error(`API вернул ${res.status}: ${res.statusText}`);
	}

	const payload = await res.json();
	const normalized = normalizeTournamentPayload(payload);

	if (!window.LIGADOK) window.LIGADOK = {};

	Object.keys(window.LIGADOK).forEach((k) => delete window.LIGADOK[k]);
	Object.assign(window.LIGADOK, normalized);

	return payload;
}

function Rules() {
	return (
		<section className="section" id="rules">
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">04 / УЧАСТИЕ</div>
						<h2>Правила турнира</h2>
					</div>
					<div
						className="ink-2"
						style={{ fontSize: 13, maxWidth: 360, textAlign: "right" }}>
						Два варианта участия. Один путь — к денежному призу, второй — к
						битве за славу.
					</div>
				</div>

				<div className="rule-grid">
					<div className="rule-card tier-a">
						<div className="label">Вариант I · Шардовый аккаунт</div>
						<div className="heading">Взнос 500 ₽ — путь к главному призу</div>
						<div className="price">500 ₽</div>
						<ul>
							<li>Участник получает аккаунт с осколками</li>
							<li>Можно претендовать на главный денежный приз</li>
							<li>Можно пользоваться всеми героями</li>
						</ul>
					</div>

					<div className="rule-card tier-b">
						<div className="label">Вариант II · Купленный аккаунт</div>
						<div className="heading">void.store или raid.bar — скидка 20%</div>
						<div className="price">−20%</div>
						<ul>
							<li>Участник попадает в общую таблицу</li>
							<li>Играет без права на денежный приз</li>
							<li>10% от цены аккаунта идёт в призовой фонд</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

function PrizeFund() {
	const D = window.LIGADOK || {};
	const fund = D.TOURNAMENT?.prizeFundRub ?? D.TOURNAMENT?.prizeFundUsd ?? 0;

	return (
		<section className="section" id="prize">
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">05 / ПРИЗОВОЙ ФОНД</div>
						<h2>Награды и распределение</h2>
					</div>
				</div>

				<div className="prize-grid">
					<div className="fund-card">
						<div className="eyebrow">Текущий фонд</div>
						<div className="fund-amt">
							{Number(fund || 0).toLocaleString("ru-RU")}&nbsp;
							<span style={{ fontSize: "0.4em", color: "var(--ink-2)" }}>
								$
							</span>
						</div>

						<div className="fund-bar">
							<span className="gold" style={{ width: "60%" }} />
							<span className="silver" style={{ width: "25%" }} />
							<span className="bronze" style={{ width: "15%" }} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Reporting() {
	return (
		<section className="section" id="reporting" style={{ paddingTop: 0 }}>
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">06 / ОТЧЁТНОСТЬ</div>
						<h2>Подтверждение результатов</h2>
					</div>
				</div>
			</div>
		</section>
	);
}

function Sponsors() {
	return (
		<section className="section" id="sponsors">
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">07 / СПОНСОРЫ</div>
						<h2>Партнёры турнира</h2>
					</div>
				</div>
			</div>
		</section>
	);
}


function Contacts() {
	return (
		<section className="section" id="contacts">
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">08 / КОНТАКТЫ</div>
						<h2>Связь с организаторами</h2>
					</div>
				</div>

				{/* Контакты */}
				<div className="contacts-grid">
					{/* Telegram */}
					<a
						href="https://t.me/dentistrecords"
						target="_blank"
						rel="noopener noreferrer"
						className="contact-card">
						<div className="contact-icon">📱</div>
						<div className="contact-info">
							<span className="contact-label">Telegram</span>
							<span className="contact-value">@dentistrecords</span>
						</div>
						<div className="contact-arrow">→</div>
					</a>

					{/* VK */}
					<a
						href="https://vk.com/id111508584"
						target="_blank"
						rel="noopener noreferrer"
						className="contact-card">
						<div className="contact-icon">📘</div>
						<div className="contact-info">
							<span className="contact-label">ВКонтакте</span>
							<span className="contact-value">vk.com/id111508584</span>
						</div>
						<div className="contact-arrow">→</div>
					</a>

					{/* Max */}
					<a
						href="https://max.ru/u/f9LHodD0cOIlqI6KTYgk5dtS3UY6wlHBxGRQmpvCR8h5YCmYrjeEjKTvHCk"
						target="_blank"
						rel="noopener noreferrer"
						className="contact-card">
						<div className="contact-icon">🚀</div>
						<div className="contact-info">
							<span className="contact-label">Max</span>
							<span className="contact-value">max.ru/u/...</span>
						</div>
						<div className="contact-arrow">→</div>
					</a>
				</div>
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="footer">
			<div className="container row between wrap">
				<div className="row gap-2 center">
					<span className="brand-mark" style={{ width: 24, height: 24 }}>
						Ⅱ
					</span>
					<span
						className="display"
						style={{ fontSize: 13, letterSpacing: ".18em" }}>
						ЛИГА ДОКА · СЕЗОН II
					</span>
				</div>
			</div>
		</footer>
	);
}

function App() {
	const [openParticipant, setOpenParticipant] = useState(null);
	const [openActivity, setOpenActivity] = useState(null);
	const [dataVersion, setDataVersion] = useState(0);

	const [apiState, setApiState] = useState({
		loading: true,
		error: null,
		updatedAt: null,
	});

	useEffect(() => {
		let alive = true;
		const controller = new AbortController();

		const sync = async () => {
			try {
				await loadTournamentFromApi({ signal: controller.signal });

				if (!alive) return;

				setDataVersion((v) => v + 1);
				setApiState({
					loading: false,
					error: null,
					updatedAt: new Date(),
				});
			} catch (err) {
				if (!alive || err.name === "AbortError") return;

				console.error("Не удалось загрузить данные турнира", err);

				setApiState({
					loading: false,
					error: err.message,
					updatedAt: null,
				});
			}
		};

		sync();

		const timer = setInterval(sync, window.DENTIST_REFRESH_MS || 30000);

		return () => {
			alive = false;
			controller.abort();
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		const open = openParticipant || openActivity;
		document.body.style.overflow = open ? "hidden" : "";
	}, [openParticipant, openActivity]);

	useEffect(() => {
		const h = (e) => {
			if (e.key === "Escape") {
				setOpenParticipant(null);
				setOpenActivity(null);
			}
		};

		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, []);

	const jumpTo = (id) => {
		const el = document.getElementById(id);
		if (!el) return;

		const top = el.getBoundingClientRect().top + window.scrollY - 64;
		window.scrollTo({ top, behavior: "smooth" });
	};

	if (apiState.loading) {
		return (
			<div className="shell">
				<Header onJump={() => {}} />
				<div
					className="container"
					style={{ paddingTop: 100, minHeight: "60vh" }}>
					<span className="badge badge--warn">
						Загрузка данных с сервера...
					</span>
				</div>
			</div>
		);
	}

	if (apiState.error) {
		return (
			<div className="shell">
				<Header onJump={() => {}} />
				<div
					className="container"
					style={{ paddingTop: 100, minHeight: "60vh" }}>
					<span className="badge badge--blood">
						API недоступен: {apiState.error}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="shell">
			<Header onJump={jumpTo} />

			<div
				className="container"
				style={{ paddingTop: 14, position: "relative", zIndex: 3 }}>
				<span className="badge badge--ok">
					Данные обновлены: {apiState.updatedAt?.toLocaleTimeString("ru-RU")}
				</span>
			</div>

			<Hero onJump={jumpTo} dataVersion={dataVersion} />

			<Leaderboard onOpen={setOpenParticipant} dataVersion={dataVersion} />

			<Activities
				onOpenActivity={setOpenActivity}
				onOpenCategory={() => {}}
				dataVersion={dataVersion}
			/>

			<Rules />
			<PrizeFund />
			{/* <Reporting /> */}
			{/* <Sponsors /> */}
			<Contacts />
			<Footer />

			{openActivity && (
				<ActivityModal
					aid={openActivity}
					onClose={() => setOpenActivity(null)}
					onOpenParticipant={(pid) => {
						setOpenActivity(null);
						setOpenParticipant(pid);
					}}
					dataVersion={dataVersion}
				/>
			)}

			{openParticipant && (
				<ParticipantModal
					pid={openParticipant}
					onClose={() => setOpenParticipant(null)}
					onOpenActivity={(aid) => {
						setOpenParticipant(null);
						setOpenActivity(aid);
					}}
					dataVersion={dataVersion}
				/>
			)}
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
