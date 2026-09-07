// Base de datos de productos según requerimientos
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

let cart = [];
let hasDuocDiscount = false;
let showingFavorites = false;
let favoriteCodes = JSON.parse(localStorage.getItem('level-up-favoritos') || '[]');

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  updateFavoriteCount();
  renderProducts(products);
  
  // Event Listeners para Filtros
  document.getElementById('search-input').addEventListener('input', filterProducts);
  document.getElementById('category-filter').addEventListener('change', filterProducts);
  document.getElementById('favorites-filter').addEventListener('click', toggleFavoritesView);
  document.getElementById('favorites-toggle').addEventListener('click', showFavoritesView);
  
  // Event Listener Formulario
  document.getElementById('register-form').addEventListener('submit', handleRegister);
});

// Función para renderizar los productos
function renderProducts(items) {
  const grid = document.getElementById('product-grid');
  const emptyMessage = document.getElementById('favorites-empty');
  grid.innerHTML = '';
  emptyMessage.hidden = true;

  if (items.length === 0) {
    emptyMessage.hidden = false;
    emptyMessage.textContent = showingFavorites
      ? 'No tienes productos favoritos todavía.'
      : 'No se encontraron productos.';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const isFavorite = favoriteCodes.includes(product.code);
    card.innerHTML = `
      <div>
        <div class="product-card-topline">
          <span class="category-badge">${product.category}</span>
          <button class="favorite-button ${isFavorite ? 'is-favorite' : ''}" type="button" aria-label="${isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}" title="${isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${isFavorite ? '♥' : '♡'}</button>
        </div>
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
        <p>${product.desc}</p>
      </div>
      <button class="btn btn-primary" onclick="addToCart('${product.code}')">Agregar al Carrito</button>
    `;
    card.querySelector('.favorite-button').addEventListener('click', () => toggleFavorite(product.code));
    grid.appendChild(card);
  });
}

// Filtrar Productos
function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(query) || product.desc.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    const matchesFavorites = !showingFavorites || favoriteCodes.includes(product.code);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  renderProducts(filtered);
}

// Manejar Registro y Validaciones
function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('reg-email').value;
  const dob = new Date(document.getElementById('reg-dob').value);
  const msg = document.getElementById('register-message');

  // Validar Edad (Mayor a 18 años)
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 18) {
    msg.style.color = 'red';
    msg.textContent = 'Error: Debes ser mayor de 18 años para registrarte.';
    return;
  }

  // Verificar si es correo Duoc
  if (email.endsWith('@duocuc.cl') || email.endsWith('@profesor.duoc.cl')) {
    hasDuocDiscount = true;
    msg.style.color = '#39FF14';
    msg.textContent = '¡Registro exitoso! Se ha activado tu descuento del 20% de por vida por ser de la comunidad Duoc UC.';
  } else {
    hasDuocDiscount = false;
    msg.style.color = '#1E90FF';
    msg.textContent = '¡Registro exitoso! Bienvenido a Level-Up Gamer.';
  }

  updateCartUI();
}

// Añadir al carrito
function addToCart(code) {
  const product = products.find(p => p.code === code);
  if (product) {
    cart.push(product);
    updateCartUI();
  }
}

// Eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Actualizar UI del Carrito
function updateCartUI() {
  const cartContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <span>${item.name} - $${item.price.toLocaleString('es-CL')} CLP</span>
        <button class="btn" style="background-color:red; color:white; padding: 2px 8px;" onclick="removeFromCart(${index})">X</button>
      `;
      cartContainer.appendChild(itemEl);
    });
  }

  // Cálculos de Totales
  const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
  const discount = hasDuocDiscount ? subtotal * 0.20 : 0;
  const total = subtotal - discount;

  document.getElementById('cart-subtotal').textContent = `$${subtotal.toLocaleString('es-CL')} CLP`;
  document.getElementById('cart-discount').textContent = `-$${discount.toLocaleString('es-CL')} CLP`;
  document.getElementById('cart-total').textContent = `$${total.toLocaleString('es-CL')} CLP`;
}

function toggleFavorite(code) {
  favoriteCodes = favoriteCodes.includes(code)
    ? favoriteCodes.filter(favoriteCode => favoriteCode !== code)
    : [...favoriteCodes, code];
  localStorage.setItem('level-up-favoritos', JSON.stringify(favoriteCodes));
  updateFavoriteCount();
  filterProducts();
}

function updateFavoriteCount() {
  document.getElementById('favorite-count').textContent = favoriteCodes.length;
}

function toggleFavoritesView() {
  showingFavorites = !showingFavorites;
  const button = document.getElementById('favorites-filter');
  button.textContent = showingFavorites ? '♡ Ver todo el catálogo' : '♡ Ver favoritos';
  button.classList.toggle('active', showingFavorites);
  filterProducts();
}

function showFavoritesView(event) {
  event.preventDefault();
  if (!showingFavorites) {
    toggleFavoritesView();
  }
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}