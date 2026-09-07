const rankings = {
	month: [
		{ name: 'EA Sports FC 26', platform: 'PlayStation', genre: 'Deportes', sales: 1840, initials: 'FC' },
		{ name: 'Mario Kart World', platform: 'Nintendo', genre: 'Carreras', sales: 1625, initials: 'MK' },
		{ name: 'Minecraft', platform: 'Xbox', genre: 'Aventura', sales: 1480, initials: 'MC' },
		{ name: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', sales: 1290, initials: 'BG' },
		{ name: 'The Legend of Zelda', platform: 'Nintendo', genre: 'Aventura', sales: 1115, initials: 'ZL' },
		{ name: 'Elden Ring', platform: 'PlayStation', genre: 'Accion', sales: 980, initials: 'ER' },
		{ name: 'Forza Horizon 5', platform: 'Xbox', genre: 'Carreras', sales: 840, initials: 'FH' },
		{ name: 'Stardew Valley', platform: 'PC', genre: 'Simulacion', sales: 720, initials: 'SV' }
	],
	year: [
		{ name: 'Minecraft', platform: 'Xbox', genre: 'Aventura', sales: 16800, initials: 'MC' },
		{ name: 'EA Sports FC 26', platform: 'PlayStation', genre: 'Deportes', sales: 15400, initials: 'FC' },
		{ name: 'The Legend of Zelda', platform: 'Nintendo', genre: 'Aventura', sales: 13900, initials: 'ZL' },
		{ name: 'Baldur\'s Gate 3', platform: 'PC', genre: 'RPG', sales: 12100, initials: 'BG' },
		{ name: 'Elden Ring', platform: 'PlayStation', genre: 'Accion', sales: 10900, initials: 'ER' },
		{ name: 'Mario Kart World', platform: 'Nintendo', genre: 'Carreras', sales: 10200, initials: 'MK' },
		{ name: 'Forza Horizon 5', platform: 'Xbox', genre: 'Carreras', sales: 8900, initials: 'FH' },
		{ name: 'Stardew Valley', platform: 'PC', genre: 'Simulacion', sales: 7400, initials: 'SV' }
	]
};

let selectedPeriod = 'month';
const rankingList = document.getElementById('ranking-list');
const platformFilter = document.getElementById('platform-filter');
const template = document.getElementById('ranking-template');

function formatSales(sales) {
	return sales.toLocaleString('es-CL');
}

function renderRanking() {
	const platform = platformFilter.value;
	const games = rankings[selectedPeriod].filter((game) => platform === 'all' || game.platform === platform);
	const highestSales = rankings[selectedPeriod][0].sales;

	rankingList.innerHTML = '';
	if (games.length === 0) {
		rankingList.innerHTML = '<p class="empty-ranking">No hay juegos para esta plataforma.</p>';
		return;
	}

	games.forEach((game, index) => {
		const item = template.content.cloneNode(true);
		const position = index + 1;
		const positionElement = item.querySelector('.position');
		positionElement.textContent = position < 4 ? ['01', '02', '03'][index] : position;
		positionElement.classList.toggle('podium', position < 4);
		item.querySelector('.game-cover').classList.add(`cover-${position}`);
		item.querySelector('.game-initials').textContent = game.initials;
		item.querySelector('h3').textContent = game.name;
		item.querySelector('.platform').textContent = game.platform;
		item.querySelector('.game-meta').textContent = game.genre;
		item.querySelector('.sales strong').textContent = formatSales(game.sales);
		item.querySelector('.progress-bar').style.width = `${Math.round((game.sales / highestSales) * 100)}%`;
		rankingList.appendChild(item);
	});

	document.getElementById('ranking-summary').textContent = selectedPeriod === 'month'
		? 'Los mas comprados durante este mes'
		: 'Los mas comprados durante este ano';
}

document.querySelectorAll('.filter-button').forEach((button) => {
	button.addEventListener('click', () => {
		selectedPeriod = button.dataset.period;
		document.querySelectorAll('.filter-button').forEach((filter) => filter.classList.remove('active'));
		button.classList.add('active');
		renderRanking();
	});
});

platformFilter.addEventListener('change', renderRanking);
renderRanking();
