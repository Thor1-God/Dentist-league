/* eslint-disable */
const { useState, useMemo } = React;
const D = window.LIGADOK || {};

const Icon = {
	search: () => (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2">
			<circle cx="11" cy="11" r="7" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	),
	close: () => (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2">
			<path d="M6 6l12 12M18 6 6 18" />
		</svg>
	),
	ext: () => (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2">
			<path d="M7 17 17 7M7 7h10v10" />
		</svg>
	),
	arrow: () => (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2">
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	),
	filter: () => (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2">
			<path d="M3 5h18M6 12h12M10 19h4" />
		</svg>
	),
	yt: () => (
		<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
			<path d="M23 7.5s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.1-1C16.9 4 12 4 12 4s-4.9 0-8 .2c-.4.1-1.3.1-2.1 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.8.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.9 0 8-.2c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4C23.2 9.4 23 7.5 23 7.5zM9.7 14.6V8.4l5.4 3.1-5.4 3.1z" />
		</svg>
	),
};

const fmt = {
	num(n, dp = 0) {
		const value = Number(n || 0);
		return value.toLocaleString("ru-RU", {
			minimumFractionDigits: dp,
			maximumFractionDigits: dp,
		});
	},
	rub(n) {
		return Number(n || 0).toLocaleString("ru-RU") + " ₽";
	},
};

function getParticipants() {
	return Array.isArray(D.PARTICIPANTS) ? D.PARTICIPANTS : [];
}

function getTournament() {
	return D.TOURNAMENT || {};
}

function getActivities() {
	return Array.isArray(D.ACTIVITIES) ? D.ACTIVITIES : [];
}

function getCategories() {
	return Array.isArray(D.CATEGORIES) ? D.CATEGORIES : [];
}

function getActivityResults() {
	return D.ACTIVITY_RESULTS || {};
}

function getScoring() {
	return D.SCORING || {};
}

function daysLeft(end) {
	const date =
		end instanceof Date ? end : new Date(end || "2026-06-10T12:00:00+03:00");
	const now = new Date();
	return Math.max(0, Math.ceil((date - now) / (1000 * 60 * 60 * 24)));
}

function podiumClass(i) {
	return i === 0 ? "gold" : i === 1 ? "silver" : i === 2 ? "bronze" : "";
}

function podiumLabel(i) {
	return i === 0 ? "I" : i === 1 ? "II" : i === 2 ? "III" : String(i + 1);
}

function Header({ onJump }) {
	return (
		<header className="header">
			<div className="container header-inner">
				<a
					className="brand"
					onClick={() => onJump("hero")}
					style={{ cursor: "pointer" }}>
					<span className="brand-mark">Ⅱ</span>
					Лига&nbsp;Дока
				</a>
				<nav className="nav">
					<a onClick={() => onJump("leaderboard")}>Рейтинг</a>
					<a onClick={() => onJump("activities")}>Активности</a>
					<a onClick={() => onJump("rules")}>Правила</a>
					<a onClick={() => onJump("prize")}>Призовой фонд</a>
					<a onClick={() => onJump("sponsors")}>Спонсоры</a>
					<a onClick={() => onJump("contacts")}>Контакты</a>
				</nav>
				<div className="header-cta">
					<span className="badge badge--blood">
						<span className="dot" /> 2 СЕЗОН • LIVE
					</span>
					<button className="btn btn--primary btn--sm">Участвовать</button>
				</div>
			</div>
		</header>
	);
}

function Hero({ onJump }) {
	const T = getTournament();
	const days = daysLeft(T.endDate);

	return (
		<section className="hero" id="hero">
			<div className="hero-bg" />
			<div className="container hero-inner">
				<div className="rise">
					<div className="row gap-2 ink-2" style={{ marginBottom: 8 }}>
						<span className="eyebrow">Сезон II</span>
						<span style={{ color: "var(--line-2)" }}>·</span>
						<span className="eyebrow blood-text">RAID-челлендж</span>
						<span style={{ color: "var(--line-2)" }}>·</span>
						<span className="eyebrow">DentistRecords</span>
					</div>

					<h1>
						Турнир Лиги&nbsp;Дока —{" "}
						<span className="accent">Рейд у нас в крови</span>
					</h1>

					<p className="subtitle">
						2-й сезон челленджа по RAID: Shadow Legends. Закрывай контент,
						собирай баллы за этапы, бери первые закрытия и борись за приз.
					</p>

					<div className="hero-meta">
						<div className="hero-meta-card">
							<div className="lbl">Открытие осколков</div>
							<div className="val">8–10 мая</div>
						</div>
						<div className="hero-meta-card live">
							<div className="lbl">Старт турнира</div>
							<div className="val">11 мая 2026</div>
						</div>
						<div className="hero-meta-card">
							<div className="lbl">Финиш</div>
							<div className="val">10 июня · 12:00 МСК</div>
						</div>
					</div>

					<div className="hero-ctas">
						<button
							className="btn btn--primary"
							onClick={() => onJump("leaderboard")}>
							Смотреть рейтинг <Icon.arrow />
						</button>
						<button className="btn btn--gold" onClick={() => onJump("rules")}>
							Правила турнира
						</button>
						<a
							className="btn btn--ghost"
							href="https://www.youtube.com/@DentistRecords"
							target="_blank"
							rel="noreferrer">
							<Icon.yt /> YouTube DentistRecords <Icon.ext />
						</a>
					</div>
				</div>

				<div className="emblem rise" style={{ animationDelay: ".1s" }}>
					<div className="emblem-core">
						<div className="roman">II</div>
						<div className="label">Sezona · Anno 2026</div>
					</div>
				</div>
			</div>

			<div
				className="container"
				style={{ marginTop: 40, position: "relative", zIndex: 2 }}>
				<TournamentStats days={days} />
			</div>
		</section>
	);
}

function TournamentStats({ days }) {
	const T = getTournament();
	const participants = getParticipants();
	const leader = participants[0] || {};

	const fund = T.fund ?? T.prizeFundRub ?? T.prizeFundUsd ?? 0;
	const count = T.participants ?? participants.length;
	const closed = T.closedActivities ?? T.totalCompletedActivities ?? 0;
	const shardCount =
		T.shardCount ?? participants.filter((p) => p.type === "shard").length;
	const boughtCount =
		T.boughtCount ??
		participants.filter((p) => p.type && p.type !== "shard").length;

	const items = [
		{
			lbl: "Призовой фонд",
			val: fmt.rub(fund),
			sub: "Обновляется автоматически",
			kind: "accent",
		},
		{
			lbl: "Участников",
			val: fmt.num(count),
			sub: `Шард: ${shardCount} · Куплен: ${boughtCount}`,
		},
		{
			lbl: "Лидер",
			val: leader.nickname || "—",
			sub: `${fmt.num(leader.score || 0, 2)} баллов · ${
				leader.firsts || 0
			} первых закрытий`,
			kind: "blood",
		},
		{
			lbl: "Активностей закрыто",
			val: fmt.num(closed),
			sub: "По данным Google Sheets",
		},
		{ lbl: "Дней до финиша", val: String(days), sub: "10 июня · 12:00 МСК" },
		{
			lbl: "Шардовые акк.",
			val: String(shardCount),
			sub: "Право на ден. приз",
		},
		{
			lbl: "Купленные акк.",
			val: String(boughtCount),
			sub: "void.store / raid.bar",
		},
		{ lbl: "Сезон", val: "II", sub: "Турнир активен", kind: "accent" },
	];

	return (
		<div className="stat-grid">
			{items.map((s, i) => (
				<div
					key={i}
					className={`stat ${
						s.kind === "accent"
							? "stat--accent"
							: s.kind === "blood"
							? "stat--blood"
							: ""
					} rise`}
					style={{ animationDelay: `${0.04 * i}s` }}>
					<div className="lbl">
						<span className="dot" style={{ background: "var(--blood-l)" }} />
						{s.lbl}
					</div>
					<div
						className="val"
						style={{ fontSize: s.lbl === "Лидер" ? "22px" : undefined }}>
						{s.val}
					</div>
					<div className="sub">{s.sub}</div>
				</div>
			))}
		</div>
	);
}

function Avatar({ name = "?", size = "md", podium = "" }) {
	const initials =
		String(name)
			.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "")
			.slice(0, 2)
			.toUpperCase() || "?";

	return (
		<div className={`avatar av-skel ${size === "lg" ? "lg" : ""} ${podium}`}>
			{initials}
		</div>
	);
}

function TypePill({ type }) {
	const accountTypes = D.ACCT_TYPE || {};
	const t = accountTypes[type] || {
		label: "Не указан",
		prize: true,
		badge: "mute",
		short: "—",
	};

	return <span className={`badge badge--${t.badge}`}>{t.short}</span>;
}

function Leaderboard({ onOpen, dataVersion = 0 }) {
	const [q, setQ] = useState("");
	const [sortBy, setSortBy] = useState("score");
	const [sortDir, setSortDir] = useState("desc");
	const [filterType, setFilterType] = useState("all");
	const [prizeOnly, setPrizeOnly] = useState(false);

	const rows = useMemo(() => {
		let arr = getParticipants().slice();

		if (q) {
			const Q = q.toLowerCase();
			arr = arr.filter(
				(p) =>
					String(p.nickname || "")
						.toLowerCase()
						.includes(Q) ||
					String(p.id || "")
						.toLowerCase()
						.includes(Q)
			);
		}

		if (filterType !== "all") {
			arr = arr.filter((p) => (p.type || "shard") === filterType);
		}

		if (prizeOnly) {
			arr = arr.filter((p) => (p.type || "shard") === "shard");
		}

		arr.sort((a, b) => {
			let A;
			let B;

			if (sortBy === "score") {
				A = Number(a.score || 0);
				B = Number(b.score || 0);
			} else if (sortBy === "closed") {
				A = Number(a.completed || a.completedActivities || 0);
				B = Number(b.completed || b.completedActivities || 0);
			} else if (sortBy === "firsts") {
				A = Number(a.firsts || a.firstBonuses || 0);
				B = Number(b.firsts || b.firstBonuses || 0);
			} else if (sortBy === "date") {
				A = String(a.lastUpdate || "");
				B = String(b.lastUpdate || "");
			} else if (sortBy === "rank") {
				A = Number(a.rank || 9999);
				B = Number(b.rank || 9999);
			} else {
				A = String(a.nickname || "");
				B = String(b.nickname || "");
			}

			if (typeof A === "string") {
				return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
			}

			const d = sortDir === "asc" ? A - B : B - A;

			if (d === 0) {
				return String(a.lastUpdate || "").localeCompare(
					String(b.lastUpdate || "")
				);
			}

			return d;
		});

		return arr;
	}, [q, sortBy, sortDir, filterType, prizeOnly, dataVersion]);

	const sort = (key) => {
		if (key === sortBy) {
			setSortDir(sortDir === "asc" ? "desc" : "asc");
		} else {
			setSortBy(key);
			setSortDir(key === "nickname" ? "asc" : "desc");
		}
	};

	const arrow = (k) => (sortBy === k ? (sortDir === "desc" ? " ↓" : " ↑") : "");

	return (
		<section className="section" id="leaderboard">
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">02 / ОБЩИЙ РЕЙТИНГ</div>
						<h2>Турнирная таблица</h2>
					</div>
					<div
						className="ink-2"
						style={{ fontSize: 13, maxWidth: 360, textAlign: "right" }}>
						Сортировка по баллам · при равенстве выше тот, кто закрыл контент
						раньше
					</div>
				</div>

				<div className="filter-bar">
					<div className="input">
						<Icon.search />
						<input
							value={q}
							onChange={(e) => setQ(e.target.value)}
							placeholder="Поиск по нику или номеру участника"
						/>
					</div>

					<select
						className="select"
						value={filterType}
						onChange={(e) => setFilterType(e.target.value)}>
						<option value="all">Все типы</option>
						<option value="shard">Шардовые</option>
						<option value="void">void.store</option>
						<option value="raidbar">raid.bar</option>
					</select>

					<select
						className="select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}>
						<option value="score">По баллам</option>
						<option value="closed">По закрытым активностям</option>
						<option value="firsts">По первым закрытиям</option>
						<option value="date">По дате последнего результата</option>
						<option value="nickname">По нику</option>
					</select>

					<button
						className={`btn btn--sm ${
							prizeOnly ? "btn--primary" : "btn--ghost"
						}`}
						onClick={() => setPrizeOnly((v) => !v)}>
						<Icon.filter /> Только приз
					</button>

					<div
						className="ink-2"
						style={{
							marginLeft: "auto",
							fontSize: 12,
							fontFamily: "var(--f-mono)",
						}}>
						{rows.length} / {getParticipants().length}
					</div>
				</div>

				<div className="panel" style={{ padding: 0, overflow: "hidden" }}>
					<div className="tbl-wrap">
						<table className="tbl">
							<thead>
								<tr>
									<th
										onClick={() => sort("rank")}
										className={sortBy === "rank" ? "sorted" : ""}
										style={{ width: 70 }}>
										Место
									</th>
									<th>Участник</th>
									<th>Тип</th>
									<th
										onClick={() => sort("score")}
										className={sortBy === "score" ? "sorted" : ""}>
										Балл{arrow("score")}
									</th>
									<th
										onClick={() => sort("closed")}
										className={sortBy === "closed" ? "sorted" : ""}>
										Закрыто{arrow("closed")}
									</th>
									<th
										onClick={() => sort("firsts")}
										className={sortBy === "firsts" ? "sorted" : ""}>
										Бонусы +0.1{arrow("firsts")}
									</th>
									<th>Приз</th>
									<th
										onClick={() => sort("date")}
										className={sortBy === "date" ? "sorted" : ""}>
										Обновлено{arrow("date")}
									</th>
									<th></th>
								</tr>
							</thead>

							<tbody>
								{rows.length === 0 && (
									<tr>
										<td colSpan="9">
											<div className="empty">
												Ничего не найдено · попробуй другой запрос
											</div>
										</td>
									</tr>
								)}

								{rows.map((p, i) => {
									const rankIndex = Number(p.rank || i + 1) - 1;
									const pcls = podiumClass(rankIndex);
									const type = p.type || "shard";
									const completed = p.completed ?? p.completedActivities ?? 0;
									const firsts = p.firsts ?? p.firstBonuses ?? 0;

									return (
										<tr
											key={p.id || `${p.nickname}-${i}`}
											className={`row-podium-${
												rankIndex + 1 <= 3 ? rankIndex + 1 : ""
											}`}
											onClick={() => onOpen(p.id)}
											style={{ cursor: "pointer" }}>
											<td className={`rank-cell ${pcls}`}>
												{podiumLabel(rankIndex)}
											</td>

											<td>
												<div className="row gap-2 center">
													<Avatar name={p.nickname || "?"} podium={pcls} />
													<div className="col" style={{ gap: 2 }}>
														<div
															style={{
																color: "var(--ink-0)",
																fontWeight: 600,
																fontFamily: "var(--f-display)",
																letterSpacing: ".02em",
															}}>
															{p.nickname || "Без имени"}
														</div>
														<div
															className="mono ink-2"
															style={{ fontSize: 11 }}>
															{p.id || "—"}
														</div>
													</div>
												</div>
											</td>

											<td>
												<TypePill type={type} />
											</td>

											<td
												className="num"
												style={{
													color: "var(--ink-0)",
													fontFamily: "var(--f-display)",
													fontSize: 16,
												}}>
												{fmt.num(p.score || 0, 2)}
											</td>

											<td className="num">{completed}</td>

											<td>
												{firsts > 0 ? (
													<span className="chip-first">+0.1 × {firsts}</span>
												) : (
													<span className="ink-2 mono" style={{ fontSize: 11 }}>
														—
													</span>
												)}
											</td>

											<td>
												{type === "shard" ? (
													<span className="badge badge--ok">
														<span className="dot" /> МОЖЕТ
													</span>
												) : (
													<span className="badge badge--mute">БЕЗ ПРАВА</span>
												)}
											</td>

											<td className="mono ink-2" style={{ fontSize: 12 }}>
												{p.lastUpdate || "—"}
											</td>

											<td>
												<button className="btn btn--sm btn--ghost">
													Подробнее <Icon.arrow />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}

function Activities({ onOpenActivity }) {
	const activities = getActivities();
	const categories = getCategories();
	const activityResults = getActivityResults();

	const stats = (aid) => {
		const r = activityResults[aid] || [];
		if (!Array.isArray(r) || r.length === 0)
			return { count: 0, max: "—", leader: "—" };

		const top = r[0];
		const leader = getParticipants().find(
			(p) => p.id === top.pid || p.id === top.participantId
		);

		return {
			count: r.length,
			max: top.stage || "—",
			leader: leader ? leader.nickname : "—",
		};
	};

	const repActivity = {
		dungeons: "dragon",
		arena: "arbiter",
		cb: null,
		hydra: "hydra",
		chimera: "chimera",
		forest: "forest",
		tower: "tower",
		factions: null,
	};

	const byCat = (cat) => activities.filter((a) => a.category === cat);

	return (
		<section className="section" id="activities" style={{ paddingTop: 40 }}>
			<div className="container">
				<div className="section-head">
					<div>
						<div className="num-mark">03 / РЕЙТИНГИ ПО АКТИВНОСТЯМ</div>
						<h2>Активности и категории</h2>
					</div>
					<div
						className="ink-2"
						style={{ fontSize: 13, maxWidth: 360, textAlign: "right" }}>
						Восемь категорий · каждый этап даёт баллы · бонус +0.1 за первое
						закрытие
					</div>
				</div>

				{categories.length === 0 && (
					<div className="empty">Активности ещё не загружены с сервера</div>
				)}

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: 18,
					}}
					className="cat-grid">
					{categories.map((c, i) => {
						const acts = byCat(c.id);
						const rep = repActivity[c.id];

						return (
							<div
								key={c.id}
								className="cat rise"
								style={{ animationDelay: `${0.05 * i}s` }}>
								<div className="cat-head">
									<div className="cat-icon">
										<span style={{ fontSize: 22, lineHeight: 1 }}>
											{c.glyph || "✦"}
										</span>
									</div>
									<div className="flex-1">
										<div className="cat-title">{c.label || c.name || c.id}</div>
										<div className="cat-meta">{c.desc || ""}</div>
									</div>

									{rep && (
										<button
											className="btn btn--sm btn--ghost"
											onClick={() => onOpenActivity(rep)}>
											Рейтинг <Icon.arrow />
										</button>
									)}
								</div>

								{acts.length > 0 ? (
									acts.slice(0, 6).map((a) => {
										const s = stats(a.id);
										const opens = activityResults[a.id];

										return (
											<div className="act-row" key={a.id}>
												<div className="name">
													<span
														className="mono ink-2"
														style={{ fontSize: 11, width: 24 }}>
														•
													</span>
													{a.name}
													{a.pts && (
														<span className="chip-bonus">{a.pts} бал.</span>
													)}
												</div>

												<span className="meta-num">×{s.count}</span>
												<span className="meta-num gold-text">{s.max}</span>

												{opens ? (
													<button onClick={() => onOpenActivity(a.id)}>
														Рейтинг
													</button>
												) : (
													<span className="meta-num ink-2">— нет данных</span>
												)}
											</div>
										);
									})
								) : (
									<div className="empty" style={{ padding: 12 }}>
										Этапы появятся при первом закрытии
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<style>{`
				@media (max-width: 920px) { .cat-grid { grid-template-columns: 1fr !important; } }
			`}</style>
		</section>
	);
}

function ActivityModal({ aid, onClose, onOpenParticipant }) {
	if (!aid) return null;

	const activities = getActivities();
	const categories = getCategories();
	const activityResults = getActivityResults();
	const scoring = getScoring();

	const a = activities.find((x) => x.id === aid);

	if (!a) {
		return (
			<div className="modal-overlay" onClick={onClose}>
				<div className="modal" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<div className="display" style={{ fontSize: 22 }}>
							Активность не найдена
						</div>
						<button className="modal-close" onClick={onClose}>
							<Icon.close />
						</button>
					</div>
				</div>
			</div>
		);
	}

	const cat = categories.find((c) => c.id === a.category) || {};
	const rules = scoring[aid] || scoring[a.category] || [];
	const results = (activityResults[aid] || [])
		.slice()
		.sort((x, y) => Number(y.pts || 0) - Number(x.pts || 0));

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-head">
					<div className="row gap-3">
						<div
							className="cat-icon"
							style={{ width: 38, height: 38, fontSize: 18 }}>
							{cat.glyph || "✦"}
						</div>
						<div>
							<div className="eyebrow">
								Рейтинг активности · {cat.label || a.category}
							</div>
							<div className="display" style={{ fontSize: 22, marginTop: 2 }}>
								{a.name}
							</div>
						</div>
					</div>

					<div className="row gap-2">
						<span className="badge badge--blood">
							×{results.length} участников
						</span>
						<button className="modal-close" onClick={onClose}>
							<Icon.close />
						</button>
					</div>
				</div>

				<div className="modal-body">
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 320px",
							gap: 24,
						}}
						className="act-mod-grid">
						<div>
							<div className="panel" style={{ padding: 0, overflow: "hidden" }}>
								<table className="tbl">
									<thead>
										<tr>
											<th style={{ width: 60 }}>#</th>
											<th>Участник</th>
											<th>Этап</th>
											<th>Баллы</th>
											<th>Бонус</th>
											<th>Дата</th>
											<th>Скрин</th>
										</tr>
									</thead>

									<tbody>
										{results.length === 0 && (
											<tr>
												<td colSpan="7">
													<div className="empty">
														Нет данных · ждём первое закрытие
													</div>
												</td>
											</tr>
										)}

										{results.map((r, i) => {
											const pid = r.pid || r.participantId;
											const p = getParticipants().find((x) => x.id === pid);

											return (
												<tr
													key={`${pid}-${i}`}
													className={i < 3 ? `row-podium-${i + 1}` : ""}
													onClick={() => onOpenParticipant(pid)}
													style={{ cursor: "pointer" }}>
													<td className={`rank-cell ${podiumClass(i)}`}>
														{podiumLabel(i)}
													</td>

													<td>
														<div className="row gap-2 center">
															<Avatar
																name={p ? p.nickname : "??"}
																podium={podiumClass(i)}
															/>
															<div className="col" style={{ gap: 2 }}>
																<div
																	style={{
																		color: "var(--ink-0)",
																		fontFamily: "var(--f-display)",
																	}}>
																	{p ? p.nickname : "—"}
																</div>
																<div
																	className="mono ink-2"
																	style={{ fontSize: 11 }}>
																	{pid || "—"}
																</div>
															</div>
														</div>
													</td>

													<td
														className="mono gold-text"
														style={{ fontSize: 13 }}>
														{r.stage || "—"}
													</td>
													<td
														className="num"
														style={{
															color: "var(--ink-0)",
															fontFamily: "var(--f-display)",
															fontSize: 16,
														}}>
														{fmt.num(r.pts || r.points || 0, 2)}
													</td>

													<td>
														{r.first ? (
															<span className="chip-first">+0.1 первое</span>
														) : (
															<span
																className="ink-2 mono"
																style={{ fontSize: 11 }}>
																—
															</span>
														)}
													</td>

													<td className="mono ink-2" style={{ fontSize: 12 }}>
														{r.date || "—"}
													</td>

													<td>
														<div
															className="slot"
															style={{ width: 62, height: 38, fontSize: 9 }}>
															SCREEN&nbsp;{i + 1}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<div className="col gap-3">
							<div className="panel panel-pad">
								<div className="eyebrow">Шкала баллов</div>
								<div className="col" style={{ gap: 8, marginTop: 10 }}>
									{rules.map((r, i) => (
										<div
											key={i}
											className="row between"
											style={{
												borderBottom: "1px dashed var(--line-1)",
												paddingBottom: 8,
											}}>
											<div className="col" style={{ gap: 2 }}>
												<span style={{ color: "var(--ink-0)", fontSize: 13 }}>
													{r.stage}
												</span>
												{r.note && (
													<span className="ink-2 mono" style={{ fontSize: 10 }}>
														{r.note}
													</span>
												)}
											</div>
											<span
												className="display gold-text"
												style={{ fontSize: 16 }}>
												{fmt.num(r.pts, r.pts < 1 ? 2 : 0)}&nbsp;
												<span style={{ fontSize: 10, color: "var(--ink-2)" }}>
													БАЛ.
												</span>
											</span>
										</div>
									))}

									{rules.length === 0 && (
										<div className="ink-2" style={{ fontSize: 12 }}>
											Шкала индивидуальна — см. правила.
										</div>
									)}
								</div>
							</div>

							<div className="panel panel-pad">
								<div className="eyebrow">Правила бонуса</div>
								<p
									style={{
										fontSize: 13,
										color: "var(--ink-1)",
										margin: "10px 0 0",
									}}>
									Бонус <span className="chip-first">+0.1</span> начисляется
									участнику, кто первым закрыл этап.
								</p>
							</div>
						</div>
					</div>
				</div>

				<style>{`
					@media (max-width: 880px) {
						.act-mod-grid { grid-template-columns: 1fr !important; }
					}
				`}</style>
			</div>
		</div>
	);
}

function ParticipantModal({ pid, onClose }) {
	if (!pid) return null;

	const p = getParticipants().find((x) => x.id === pid);

	if (!p) {
		return (
			<div className="modal-overlay" onClick={onClose}>
				<div className="modal" onClick={(e) => e.stopPropagation()}>
					<div className="modal-head">
						<div className="display" style={{ fontSize: 22 }}>
							Участник не найден
						</div>
						<button className="modal-close" onClick={onClose}>
							<Icon.close />
						</button>
					</div>
				</div>
			</div>
		);
	}

	const idx = getParticipants().indexOf(p);
	const type = p.type || "shard";
	const t = (D.ACCT_TYPE || {})[type] || { label: "Не указан" };

	const fallbackDetail = {
		dist: {},
		activitySamples: [],
	};

	const detail =
		typeof D.buildParticipantDetail === "function"
			? D.buildParticipantDetail(p)
			: fallbackDetail;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-head">
					<div className="row gap-3 center">
						<Avatar name={p.nickname} size="lg" podium={podiumClass(idx)} />
						<div>
							<div className="eyebrow">Профиль участника</div>
							<div className="display" style={{ fontSize: 28, marginTop: 4 }}>
								{p.nickname}
							</div>

							<div className="row gap-2" style={{ marginTop: 6 }}>
								<span className="mono ink-2" style={{ fontSize: 11 }}>
									{p.id}
								</span>
								<TypePill type={type} />
								{type === "shard" ? (
									<span className="badge badge--ok">
										<span className="dot" /> МОЖЕТ ПОЛУЧИТЬ ПРИЗ
									</span>
								) : (
									<span className="badge badge--mute">БЕЗ ПРАВА НА ПРИЗ</span>
								)}
							</div>
						</div>
					</div>

					<button className="modal-close" onClick={onClose}>
						<Icon.close />
					</button>
				</div>

				<div className="modal-body">
					<div className="profile-grid">
						<div className="col gap-3">
							<div className="profile-side">
								<div className="eyebrow">Сводка</div>

								<div style={{ marginTop: 12 }}>
									<div className="profile-stat-row">
										<span className="k">Место</span>
										<span className="v">
											{podiumLabel(idx)} / {getParticipants().length}
										</span>
									</div>
									<div className="profile-stat-row">
										<span className="k">Общий балл</span>
										<span className="v gold-text">
											{fmt.num(p.score || 0, 2)}
										</span>
									</div>
									<div className="profile-stat-row">
										<span className="k">Закрыто активностей</span>
										<span className="v">
											{p.completed ?? p.completedActivities ?? 0}
										</span>
									</div>
									<div className="profile-stat-row">
										<span className="k">Первых закрытий</span>
										<span className="v blood-text">
											{p.firsts ?? p.firstBonuses ?? 0}
										</span>
									</div>
									<div className="profile-stat-row">
										<span className="k">Тип аккаунта</span>
										<span className="v" style={{ fontSize: 12 }}>
											{t.label}
										</span>
									</div>
									<div className="profile-stat-row">
										<span className="k">Обновлено</span>
										<span className="v mono" style={{ fontSize: 12 }}>
											{p.lastUpdate || "—"}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="col gap-3">
							<div className="cat-bars">
								<div className="row between center">
									<div className="eyebrow">
										Распределение баллов по категориям
									</div>
									<div className="ink-2 mono" style={{ fontSize: 11 }}>
										всего {fmt.num(p.score || 0, 2)}
									</div>
								</div>

								{Object.keys(detail.dist || {}).length === 0 && (
									<div className="empty" style={{ padding: 16 }}>
										Нет детализации по категориям
									</div>
								)}

								{Object.entries(detail.dist || {})
									.filter(([k]) => k !== "other")
									.map(([k, v]) => {
										const cat = getCategories().find((c) => c.id === k);
										const max = Math.max(
											...Object.values(detail.dist || { x: 1 }),
											1
										);

										return (
											<div key={k} className="cat-bar-row">
												<span className="k">{cat ? cat.label : k}</span>
												<div className="bar">
													<span style={{ width: `${(v / max) * 100}%` }} />
												</div>
												<span className="v">{fmt.num(v, 1)}</span>
											</div>
										);
									})}
							</div>

							<div>
								<div className="eyebrow">История начисления баллов</div>
								<div className="history">
									{(detail.activitySamples || []).length === 0 && (
										<div className="empty" style={{ padding: 18 }}>
											История пока не загружена
										</div>
									)}

									{(detail.activitySamples || []).map((s, i) => {
										const a = getActivities().find((x) => x.id === s.aid);

										return (
											<div key={i} className="history-row">
												<span className="when">{s.date || "—"}</span>
												<div className="col" style={{ gap: 2 }}>
													<span className="what">{a ? a.name : s.aid}</span>
													<span className="ink-2 mono" style={{ fontSize: 11 }}>
														{s.stage}
													</span>
												</div>
												<div>
													{s.first && (
														<span className="chip-first">+0.1 первый</span>
													)}
												</div>
												<span className="pts">+{fmt.num(s.pts || 0, 2)}</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

window.LDComponents = {
	Header,
	Hero,
	Leaderboard,
	Activities,
	ActivityModal,
	ParticipantModal,
};

window.LDIcon = Icon;
window.LDFmt = fmt;
