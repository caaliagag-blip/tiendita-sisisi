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

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  
  // Event Listeners para Filtros
  document.getElementById('search-input').addEventListener('input', filterProducts);
  document.getElementById('category-filter').addEventListener('change', filterProducts);
  
  // Event Listener Formulario
  document.getElementById('register-form').addEventListener('submit', handleRegister);
});

// Función para renderizar los productos
function renderProducts(items) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div>
        <span class="category-badge">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
        <p>${product.desc}</p>
      </div>
      <button class="btn btn-primary" onclick="addToCart('${product.code}')">Agregar al Carrito</button>
    `;
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
    return matchesSearch && matchesCategory;
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