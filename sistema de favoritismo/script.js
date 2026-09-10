const products = [
	{ code: 'JM001', category: 'Juegos de Mesa', name: 'Catan', price: 29990, desc: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar la isla de Catan.' },
	{ code: 'JM002', category: 'Juegos de Mesa', name: 'Carcassonne', price: 24990, desc: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje medieval.' },
	{ code: 'AC001', category: 'Accesorios', name: 'Controlador Inalámbrico Xbox Series X', price: 59990, desc: 'Ofrece experiencia cómoda con botones mapeables y respuesta táctil mejorada.' },
	{ code: 'AC002', category: 'Accesorios', name: 'Auriculares Gamer HyperX Cloud II', price: 79990, desc: 'Sonido envolvente de calidad con micrófono desmontable y almohadillas confortables.' },
	{ code: 'CO001', category: 'Consolas', name: 'PlayStation 5', price: 549990, desc: 'Consola de última generación de Sony con gráficos impresionantes y carga ultrarrápida.' },
	{ code: 'CG001', category: 'Computadores Gamers', name: 'PC Gamer ASUS ROG Strix', price: 1299990, desc: 'Potente equipo para gamers exigentes equipado con los últimos componentes.' },
	{ code: 'SG001', category: 'Sillas Gamers', name: 'Silla Gamer Secretlab Titan', price: 349990, desc: 'Máximo confort y soporte ergonómico para largas sesiones de juego.' },
	{ code: 'MS001', category: 'Mouse', name: 'Mouse Gamer Logitech G502 HERO', price: 49990, desc: 'Sensor de alta precisión y botones personalizables para un control exacto.' },
	{ code: 'MP001', category: 'Mousepad', name: 'Mousepad Razer Goliathus Extended Chroma', price: 29990, desc: 'Área de juego amplia con iluminación RGB personalizable.' },
	{ code: 'PP001', category: 'Poleras Personalizadas', name: 'Polera Gamer Personalizada Level-Up', price: 149990, desc: 'Camiseta cómoda con opción de personalización con tu Gamer Tag.' }
];

const favoritesList = document.getElementById('favorites-list');
const favoritesSummary = document.getElementById('favorites-summary');

function getFavoriteCodes() {
	try {
		return JSON.parse(localStorage.getItem('level-up-favoritos') || '[]');
	} catch {
		return [];
	}
}

function formatPrice(price) {
	return `$${price.toLocaleString('es-CL')} CLP`;
}

function renderFavorites() {
	const favoriteCodes = getFavoriteCodes();
	const favorites = products.filter((product) => favoriteCodes.includes(product.code));
	favoritesList.innerHTML = '';
	favoritesSummary.textContent = `${favorites.length} ${favorites.length === 1 ? 'producto guardado' : 'productos guardados'}`;

	if (favorites.length === 0) {
		favoritesList.innerHTML = '<p class="empty-ranking">Todavía no tienes productos favoritos. Guarda alguno desde el catálogo.</p>';
		return;
	}

	favorites.forEach((product) => {
		const item = document.createElement('article');
		item.className = 'favorite-item';
		item.innerHTML = `
			<div class="favorite-details">
				<span class="favorite-category">${product.category}</span>
				<h3>${product.name}</h3>
				<p>${product.desc}</p>
				<strong>${formatPrice(product.price)}</strong>
			</div>
			<button class="remove-favorite" type="button" aria-label="Quitar ${product.name} de favoritos">Quitar</button>
		`;
		item.querySelector('.remove-favorite').addEventListener('click', () => removeFavorite(product.code));
		favoritesList.appendChild(item);
	});
}

function removeFavorite(code) {
	const favoriteCodes = getFavoriteCodes().filter((favoriteCode) => favoriteCode !== code);
	localStorage.setItem('level-up-favoritos', JSON.stringify(favoriteCodes));
	renderFavorites();
}

window.addEventListener('storage', renderFavorites);
renderFavorites();
