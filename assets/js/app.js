const money = new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' });
let currentUser = null;
let products = [];

const el = (id) => document.getElementById(id);
const alertBox = (target, type, message) => {
  target.innerHTML = `<div class="alert alert-${type} mb-0">${message}</div>`;
};
const formData = (form) => new FormData(form);

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
  } else {
    profile.classList.add('d-none');
    login.classList.remove('d-none');
    logout.classList.add('d-none');
    el('cartCount').textContent = '0';
    el('cartItems').innerHTML = '<p class="text-muted">Login to view your cart.</p>';
    el('cartTotal').textContent = money.format(0);
  }
}

async function loadProducts() {
  const params = new URLSearchParams({
    search: el('productSearch').value,
    category: el('categoryFilter').value,
    filter: el('typeFilter').value,
  });
  const data = await api(`api/get-products.php?${params}`);
  products = data.products;
  renderProducts();
  renderCategories(data.products);
}

function renderCategories(list) {
  const select = el('categoryFilter');
  const selected = select.value;
  const categories = [...new Set(list.map((product) => product.category).filter(Boolean))];
  if (selected && !categories.includes(selected)) categories.push(selected);
  select.innerHTML = '<option value="">All Categories</option>' + categories.map((category) => `<option value="${category}">${category}</option>`).join('');
  select.value = selected;
}

function renderProducts() {
  const grid = el('productGrid');
  if (!products.length) {
    grid.innerHTML = '<div class="col-12"><div class="panel text-center text-muted">No products found.</div></div>';
    return;
  }
  grid.innerHTML = products.map((product) => `
    <div class="col-sm-6 col-lg-4">
      <article class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <div class="p-3">
          <div class="d-flex justify-content-between gap-2 mb-2">
            <span class="badge rounded-pill">${product.category}</span>
            <small class="text-muted">${product.stock} in stock</small>
          </div>
          <h3 class="h5 fw-bold">${product.title}</h3>
          <p class="text-muted small">${product.description || ''}</p>
          <div class="d-flex justify-content-between align-items-center">
            <strong>${money.format(product.price_lkr)}</strong>
            <button class="btn btn-dark btn-sm rounded-pill" onclick="addToCart(${product.id})" ${Number(product.stock) <= 0 ? 'disabled' : ''}>Add</button>
          </div>
        </div>
      </article>
    </div>
  `).join('');
}

async function addToCart(productId) {
  if (!currentUser) {
    bootstrap.Modal.getOrCreateInstance(el('authModal')).show();
    return;
  }
  await api('api/add-to-cart.php', { method: 'POST', body: new URLSearchParams({ product_id: productId, quantity: 1 }) });
  await loadCart();
}

async function loadCart() {
  if (!currentUser) return;
  const data = await api('api/cart.php');
  el('cartCount').textContent = data.items.reduce((sum, item) => sum + Number(item.quantity), 0);
  el('cartTotal').textContent = money.format(data.total);
  el('cartItems').innerHTML = data.items.length ? data.items.map((item) => `
    <div class="d-flex gap-3 align-items-center">
      <img class="cart-thumb" src="${item.image}" alt="">
      <div class="flex-grow-1">
        <strong>${item.title}</strong>
        <div class="small text-muted">${money.format(item.price_lkr)}</div>
        <input class="form-control form-control-sm mt-2" type="number" min="1" max="${item.stock}" value="${item.quantity}" onchange="updateCart(${item.cart_id}, this.value)">
      </div>
      <button class="btn btn-sm btn-outline-danger" onclick="removeCart(${item.cart_id})">Remove</button>
    </div>
  `).join('') : '<p class="text-muted">Your cart is empty.</p>';
}

async function updateCart(cartId, quantity) {
  await api('api/update-cart.php', { method: 'POST', body: new URLSearchParams({ cart_id: cartId, quantity }) });
  await loadCart();
}

async function removeCart(cartId) {
  await api('api/remove-cart.php', { method: 'POST', body: new URLSearchParams({ cart_id: cartId }) });
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

['productSearch', 'categoryFilter', 'typeFilter'].forEach((id) => {
  el(id).addEventListener('input', () => loadProducts().catch(console.error));
});

loadMe().catch(() => renderUser());
loadProducts().catch((error) => {
  el('productGrid').innerHTML = `<div class="col-12"><div class="alert alert-danger">${error.message}</div></div>`;
});
