<?php
declare(strict_types=1);

require_once __DIR__ . '/config/helpers.php';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KNGU Flowers | Premium Floral Boutique</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/css/styles.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg bg-floral sticky-top shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold brand" href="#home">KNGU Flowers</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#shop">Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="#checkout">Checkout</a></li>
        </ul>
        <div class="d-flex align-items-center gap-2">
          <span id="profileBadge" class="small text-muted d-none"></span>
          <button id="authButton" class="btn btn-outline-dark rounded-pill" data-bs-toggle="modal" data-bs-target="#authModal">Login</button>
          <button id="logoutButton" class="btn btn-link text-dark d-none">Logout</button>
          <button class="btn btn-dark rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer">Cart <span id="cartCount" class="badge text-bg-light">0</span></button>
        </div>
      </div>
    </div>
  </nav>

  <header id="home" class="hero-section">
    <div class="container py-5">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <p class="eyebrow">Luxury Floral Studio</p>
          <h1 class="display-2 fw-bold lh-1">Handcrafted <span class="serif">Elegance</span></h1>
          <p class="lead text-muted my-4">Fresh floral arrangements, curated gifts, and premium delivery with a boutique touch.</p>
          <a href="#shop" class="btn btn-dark btn-lg rounded-pill px-5">Shop Collection</a>
        </div>
        <div class="col-lg-6">
          <img class="hero-image" src="src/assets/images/regenerated_image_1779162774035.png" alt="Floral arrangement">
        </div>
      </div>
    </div>
  </header>

  <section id="shop" class="py-5">
    <div class="container">
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <p class="eyebrow mb-1">Fresh Catalog</p>
          <h2 class="fw-bold">Shop Flowers</h2>
        </div>
        <div class="d-flex flex-wrap gap-2 controls">
          <input id="productSearch" class="form-control" placeholder="Search flowers">
          <select id="categoryFilter" class="form-select">
            <option value="">All Categories</option>
          </select>
          <select id="typeFilter" class="form-select">
            <option value="">Newest</option>
            <option value="featured">Featured</option>
            <option value="best-sellers">Best Sellers</option>
          </select>
        </div>
      </div>
      <div id="productGrid" class="row g-4"></div>
    </div>
  </section>

  <section id="checkout" class="checkout-band py-5">
    <div class="container">
      <div class="row g-4 align-items-start">
        <div class="col-lg-5">
          <p class="eyebrow">Secure Checkout</p>
          <h2 class="fw-bold">Complete Your Order</h2>
          <p class="text-muted">Login, review your cart, add delivery details, and submit. New orders appear in the admin panel immediately.</p>
        </div>
        <div class="col-lg-7">
          <form id="checkoutForm" class="panel vstack gap-3">
            <div>
              <label class="form-label">Delivery Address</label>
              <textarea name="delivery_address" class="form-control" rows="3" required></textarea>
            </div>
            <div>
              <label class="form-label">Payment Method</label>
              <select name="payment_method" class="form-select" required>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Card Payment">Card Payment</option>
              </select>
            </div>
            <button class="btn btn-dark rounded-pill py-3">Place Order</button>
            <div id="checkoutAlert"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section class="newsletter py-5">
    <div class="container text-center">
      <p class="eyebrow">Floral Notes</p>
      <h2 class="fw-bold">Join the Newsletter</h2>
      <form id="newsletterForm" class="mx-auto mt-3 newsletter-form d-flex gap-2">
        <input name="email" type="email" class="form-control" placeholder="Email address" required>
        <button class="btn btn-dark rounded-pill px-4">Subscribe</button>
      </form>
      <div id="newsletterAlert" class="mt-3"></div>
    </div>
  </section>

  <footer class="footer py-4">
    <div class="container d-flex flex-column flex-md-row justify-content-between gap-2">
      <span>KNGU Flowers Boutique</span>
      <a class="text-white" href="admin/secure-panel/login.php">Admin Portal</a>
    </div>
  </footer>

  <div class="modal fade" id="authModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content auth-card">
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold">Account Access</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-pills mb-3" role="tablist">
            <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#loginPane" type="button">Login</button></li>
            <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#registerPane" type="button">Register</button></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="loginPane">
              <form id="loginForm" class="vstack gap-3">
                <input name="email" type="email" class="form-control" placeholder="Email" required>
                <input name="password" type="password" class="form-control" placeholder="Password" required>
                <button class="btn btn-dark rounded-pill py-2">Login</button>
              </form>
            </div>
            <div class="tab-pane fade" id="registerPane">
              <form id="registerForm" class="vstack gap-3">
                <input name="full_name" class="form-control" placeholder="Full name" required>
                <input name="email" type="email" class="form-control" placeholder="Email" required>
                <input name="password" type="password" class="form-control" placeholder="Password" required>
                <input name="confirm_password" type="password" class="form-control" placeholder="Confirm password" required>
                <button class="btn btn-dark rounded-pill py-2">Create Account</button>
              </form>
            </div>
          </div>
          <div id="authAlert" class="mt-3"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="cartDrawer">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title fw-bold">Your Cart</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <div id="cartItems" class="vstack gap-3 flex-grow-1"></div>
      <div class="border-top pt-3">
        <div class="d-flex justify-content-between h5"><span>Total</span><strong id="cartTotal">LKR 0.00</strong></div>
        <a href="#checkout" class="btn btn-dark rounded-pill w-100 mt-2" data-bs-dismiss="offcanvas">Checkout</a>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>
