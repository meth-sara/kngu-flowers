const money = new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' });
let currentUser = null;
let products = [];
let activeFeaturedFilter = '';

const el = (id) => document.getElementById(id);
const formData = (form) => new FormData(form);

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const alertBox = (target, type, message) => {
  target.innerHTML = `<div class="alert alert-${type} mb-0">${escapeHtml(message)}</div>`;
};

async function api(url, options = {}) {
  const response = await fetch(url, { credentials: 'same-origin', ...options });
  const data = await response.json();
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
}

async function loadMe() {
  const data = await api('auth/me.php');
  currentUser = data.user;
  renderUser();
  if (currentUser) {
    await loadCart();
  }
}

function renderUser() {
  const profile = el('profileBadge');
  const login = el('authButton');
  const logout = el('logoutButton');

  if (currentUser) {
    profile.textContent = currentUser.full_name;
    profile.classList.remove('d-none');
    login.classList.add('d-none');
    logout.classList.remove('d-none');
    return;
  }

  profile.classList.add('d-none');
  login.classList.remove('d-none');
  logout.classList.add('d-none');
  el('cartCount').textContent = '0';
  el('cartItems').innerHTML = '<p class="text-muted">Login to view your cart.</p>';
  el('cartTotal').textContent = money.format(0);
}

async function loadProducts() {
  const params = new URLSearchParams({ search: el('productSearch').value });
  const data = await api(`api/get-products.php?${params}`);
  products = data.products;
  renderProductSections();
}

function productCard(product, index) {
  const price = Number(product.price_lkr);
  const oldPrice = index % 2 === 0 ? price * 1.18 : null;
  const badge = Number(product.stock) <= 0
    ? '<span class="sale-badge sold">Soldout</span>'
    : (product.is_best_seller == 1 || index % 3 === 0 ? '<span class="sale-badge">-35%</span>' : '');

  return `
    <div class="col-6 col-lg-3">
      <article class="product-card">
        <div class="product-media">
          ${badge}
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}">
          <button class="quick-add" onclick="addToCart(${Number(product.id)})" ${Number(product.stock) <= 0 ? 'disabled' : ''}>Add to Cart</button>
        </div>
        <div class="rating">☆☆☆☆☆</div>
        <h3>${escapeHtml(product.title)}</h3>
        <div class="price">
          ${money.format(price)}
          ${oldPrice ? `<del>${money.format(oldPrice)}</del>` : ''}
        </div>
        <div class="stock-note">${Number(product.stock)} stems in stock</div>
      </article>
    </div>
  `;
}

function renderProductSections() {
  const newGrid = el('newProductsGrid');
  const featuredGrid = el('featuredProductsGrid');
  const newItems = products.slice(0, 4);
  const featuredItems = products.filter((product) => {
    if (activeFeaturedFilter === 'featured') return Number(product.is_featured) === 1;
    if (activeFeaturedFilter === 'best-sellers') return Number(product.is_best_seller) === 1;
    return true;
  });

  newGrid.innerHTML = newItems.length
    ? newItems.map(productCard).join('')
    : '<div class="col-12"><div class="text-center text-muted">No products found.</div></div>';

  featuredGrid.innerHTML = featuredItems.length
    ? featuredItems.map(productCard).join('')
    : '<div class="col-12"><div class="text-center text-muted">No products found.</div></div>';
}

async function addToCart(productId) {
  if (!currentUser) {
    bootstrap.Modal.getOrCreateInstance(el('authModal')).show();
    return;
  }

  await api('api/add-to-cart.php', {
    method: 'POST',
    body: new URLSearchParams({ product_id: productId, quantity: 1 }),
  });
  await loadCart();
  bootstrap.Offcanvas.getOrCreateInstance(el('cartDrawer')).show();
}

async function loadCart() {
  if (!currentUser) return;

  const data = await api('api/cart.php');
  const count = data.items.reduce((sum, item) => sum + Number(item.quantity), 0);
  el('cartCount').textContent = count;
  el('cartTotal').textContent = money.format(data.total);

  el('cartItems').innerHTML = data.items.length ? data.items.map((item) => `
    <div class="d-flex gap-3 align-items-center">
      <img class="cart-thumb" src="${escapeHtml(item.image)}" alt="">
      <div class="flex-grow-1">
        <strong>${escapeHtml(item.title)}</strong>
        <div class="small text-muted">${money.format(item.price_lkr)}</div>
        <input class="form-control form-control-sm mt-2" type="number" min="1" max="${Number(item.stock)}" value="${Number(item.quantity)}" onchange="updateCart(${Number(item.cart_id)}, this.value)">
      </div>
      <button class="btn btn-sm btn-outline-danger" onclick="removeCart(${Number(item.cart_id)})">Remove</button>
    </div>
  `).join('') : '<p class="text-muted">Your cart is empty.</p>';
}

async function updateCart(cartId, quantity) {
  await api('api/update-cart.php', {
    method: 'POST',
    body: new URLSearchParams({ cart_id: cartId, quantity }),
  });
  await loadCart();
}

async function removeCart(cartId) {
  await api('api/remove-cart.php', {
    method: 'POST',
    body: new URLSearchParams({ cart_id: cartId }),
  });
  await loadCart();
}

el('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await api('auth/login.php', { method: 'POST', body: formData(event.target) });
    currentUser = data.user;
    renderUser();
    await loadCart();
    bootstrap.Modal.getInstance(el('authModal')).hide();
    el('authAlert').innerHTML = '';
  } catch (error) {
    alertBox(el('authAlert'), 'danger', error.message);
  }
});

el('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await api('auth/register.php', { method: 'POST', body: formData(event.target) });
    currentUser = data.user;
    renderUser();
    await loadCart();
    bootstrap.Modal.getInstance(el('authModal')).hide();
    el('authAlert').innerHTML = '';
  } catch (error) {
    alertBox(el('authAlert'), 'danger', error.message);
  }
});

el('logoutButton').addEventListener('click', () => {
  window.location.href = 'auth/logout.php';
});

el('checkoutForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) {
    bootstrap.Modal.getOrCreateInstance(el('authModal')).show();
    return;
  }

  try {
    const data = await api('api/place-order.php', { method: 'POST', body: formData(event.target) });
    alertBox(el('checkoutAlert'), 'success', `Order #${data.order_id} placed successfully.`);
    event.target.reset();
    await loadCart();
    await loadProducts();
  } catch (error) {
    alertBox(el('checkoutAlert'), 'danger', error.message);
  }
});

el('newsletterForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await api('api/subscribe.php', { method: 'POST', body: formData(event.target) });
    alertBox(el('newsletterAlert'), 'success', data.message);
    event.target.reset();
  } catch (error) {
    alertBox(el('newsletterAlert'), 'danger', error.message);
  }
});

el('productSearch').addEventListener('input', () => loadProducts().catch(console.error));

document.querySelectorAll('.tab-line button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-line button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFeaturedFilter = button.dataset.filter || '';
    renderProductSections();
  });
});

loadMe().catch(() => renderUser());
loadProducts().catch((error) => {
  el('newProductsGrid').innerHTML = `<div class="col-12"><div class="alert alert-danger">${escapeHtml(error.message)}</div></div>`;
  el('featuredProductsGrid').innerHTML = '';
});
