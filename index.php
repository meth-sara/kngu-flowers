<?php
declare(strict_types=1);

require_once __DIR__ . '/config/helpers.php';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kngu Flowers | Floral Boutique</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/css/styles.css" rel="stylesheet">
</head>
<body>
  <div class="promo-bar">
    <span>All featured product 50% Off Shop Now</span>
    <button type="button" aria-label="Close announcement">x</button>
  </div>

  <nav class="navbar navbar-expand-lg main-nav sticky-top">
    <div class="container">
      <a class="navbar-brand logo-mark" href="#home">
        <span class="logo-icon">K</span>
        <span>Kngu.</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto nav-menu">
          <li class="nav-item"><a class="nav-link active" href="#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#shop">Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="#blog">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="#experts">Pages</a></li>
          <li class="nav-item"><a class="nav-link" href="#footer">Contact</a></li>
        </ul>
        <div class="nav-actions">
          <input id="productSearch" class="store-search" placeholder="Search our store">
          <span id="profileBadge" class="profile-badge d-none"></span>
          <button id="authButton" class="icon-btn text-btn" data-bs-toggle="modal" data-bs-target="#authModal">Login</button>
          <button id="logoutButton" class="icon-btn text-btn d-none">Logout</button>
          <button class="icon-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer" aria-label="Open cart">
            <span>Cart</span>
            <sup id="cartCount">0</sup>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <header id="home" class="hero-slider">
    <button class="slider-arrow left" type="button" aria-label="Previous slide">&#8249;</button>
    <div class="container">
      <div class="row align-items-center min-vh-hero">
        <div class="col-lg-5 hero-copy">
          <p class="hero-kicker">20% Off For<br>New Members</p>
          <h1>Happy Mother's Day!</h1>
          <p>Bouquets your mom will love!</p>
          <a href="#shop" class="btn btn-coral rounded-pill">Start Shopping</a>
        </div>
        <div class="col-lg-7">
          <img class="hero-flower" src="src/assets/images/regenerated_image_1779162774035.png" alt="Tulips and gift box">
        </div>
      </div>
    </div>
    <button class="slider-arrow right" type="button" aria-label="Next slide">&#8250;</button>
  </header>

  <section class="service-strip">
    <div class="container">
      <div class="row g-3">
        <div class="col-6 col-lg-3">
          <div class="service-item red"><span>01</span><div><strong>Free Delivery</strong><p>Free shipping around the world for all orders over $120.</p></div></div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="service-item green"><span>02</span><div><strong>Online Order</strong><p>Don't worry you can order online by our site.</p></div></div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="service-item purple"><span>03</span><div><strong>Freshness</strong><p>You have freshness flowers every single order.</p></div></div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="service-item lime"><span>04</span><div><strong>Made By Artists</strong><p>World for all made by artists orders over now.</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <section id="shop" class="section-space">
    <div class="container">
      <div class="section-title">
        <h2>New Products</h2>
        <p>A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.</p>
      </div>
      <div id="newProductsGrid" class="row g-4 product-grid"></div>
    </div>
  </section>

  <section class="valentine-band">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000" alt="Florist table with flowers">
        </div>
        <div class="col-lg-6">
          <h2>Suprise Your Valentine! Let us arrange a smile For Her.</h2>
          <p>Where flowers are our inspiration to create lasting memories. Whatever the occasion inspiration to create lasting memories...</p>
          <ul>
            <li>Hand picked just for you.</li>
            <li>Hand picked just for you.</li>
            <li>Hand picked just for you.</li>
          </ul>
          <button class="btn btn-coral rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer">More Details</button>
        </div>
      </div>
    </div>
  </section>

  <section class="section-space">
    <div class="container">
      <div class="section-title">
        <h2>Featured Items</h2>
        <p>A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.</p>
      </div>
      <div class="tab-line">
        <button class="active" data-filter="">New</button>
        <button data-filter="featured">Featured</button>
        <button data-filter="best-sellers">Best Sellers</button>
      </div>
      <div id="featuredProductsGrid" class="row g-4 product-grid"></div>
    </div>
  </section>

  <section class="testimonial-band">
    <div class="container text-center">
      <p>Felis eu pede mollis pretium. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus lingua. felis eu pede mollis pretium.</p>
      <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200" alt="Customer">
      <strong>TORVI / COO</strong>
    </div>
  </section>

  <section id="experts" class="section-space">
    <div class="container">
      <div class="section-title">
        <h2>Flower Experts</h2>
        <p>A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.</p>
      </div>
      <div class="row g-4 expert-row">
        <div class="col-6 col-lg-3"><article><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" alt="Marcos Alonso"><h3>Marcos Alonso</h3><p>Biologist</p></article></div>
        <div class="col-6 col-lg-3"><article><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" alt="Shara friken"><h3>Shara friken</h3><p>Photographer</p></article></div>
        <div class="col-6 col-lg-3"><article><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400" alt="Torvi greac"><h3>Torvi greac</h3><p>Founder</p></article></div>
        <div class="col-6 col-lg-3"><article><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" alt="Alonso Gomej"><h3>Alonso Gomej</h3><p>Florist</p></article></div>
      </div>
    </div>
  </section>

  <section id="blog" class="section-space blog-section">
    <div class="container">
      <div class="section-title">
        <h2>From Our Blog</h2>
        <p>A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.</p>
      </div>
      <div class="row g-4 blog-row">
        <div class="col-lg-4"><article><img src="https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?auto=format&fit=crop&q=80&w=600" alt="Flower Beauty"><h3>Flower Beauty</h3><p>By Shopify Team HasTheme / August 12, 2022</p><span>Continue Reading</span></article></div>
        <div class="col-lg-4"><article><img src="https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?auto=format&fit=crop&q=80&w=600" alt="Local Florists"><h3>Local Florists</h3><p>By Shopify Team HasTheme / August 14, 2022</p><span>Continue Reading</span></article></div>
        <div class="col-lg-4"><article><img src="src/assets/images/regenerated_image_1779162891138.jpg" alt="Flower Power"><h3>Flower Power</h3><p>By Shopify Team HasTheme / August 16, 2022</p><span>Continue Reading</span></article></div>
      </div>
    </div>
  </section>

  <section class="newsletter-block">
    <div class="container text-center">
      <h2>Join The Colorful Bunch!</h2>
      <form id="newsletterForm" class="newsletter-form">
        <input name="email" type="email" placeholder="Your email address" required>
        <button>Subscribe</button>
      </form>
      <div id="newsletterAlert" class="mt-3"></div>
    </div>
  </section>

  <footer id="footer" class="footer-main">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-3">
          <a class="logo-mark footer-logo" href="#home"><span class="logo-icon">K</span><span>Kngu.</span></a>
          <p>A perfect blend of creativity, energy, communication, happiness and love. Let us arrange a smile for you.</p>
          <div class="socials"><span>f</span><span>x</span><span>p</span><span>in</span></div>
        </div>
        <div class="col-6 col-lg-2"><h3>Information</h3><a href="#shop">Search Terms</a><a href="#shop">Advanced Search</a><a href="#shop">Helps & FAQs</a><a href="#footer">Store Location</a><a href="#cartDrawer" data-bs-toggle="offcanvas">Orders & Returns</a></div>
        <div class="col-6 col-lg-2"><h3>My Account</h3><a href="#cartDrawer" data-bs-toggle="offcanvas">Delivery</a><a href="#footer">Legal Notice</a><a href="#footer">Secure Payment</a><a href="#footer">Sitemap</a><a href="#footer">About us</a></div>
        <div class="col-6 col-lg-2"><h3>Help</h3><a href="#footer">FAQs</a><a href="#footer">Pricing Plans</a><a href="#cartDrawer" data-bs-toggle="offcanvas">Track</a><a href="#cartDrawer" data-bs-toggle="offcanvas">Your Order</a><a href="#footer">Returns</a></div>
        <div class="col-6 col-lg-3"><h3>Customer Service</h3><a href="admin/secure-panel/login.php">Admin Portal</a><a href="#footer">Terms of Use</a><a href="#cartDrawer" data-bs-toggle="offcanvas">Deliveries & Returns</a><a href="#footer">Gift card</a><a href="#footer">Legal Notice</a></div>
      </div>
      <div class="footer-bottom">
        <span>Copyright 2026. All Rights Reserved</span>
        <span class="payments">VISA&nbsp;&nbsp;MASTER&nbsp;&nbsp;AMEX&nbsp;&nbsp;PAYPAL</span>
      </div>
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
      <form id="checkoutForm" class="checkout-mini">
        <label>Delivery Address</label>
        <textarea name="delivery_address" rows="3" required></textarea>
        <label>Payment Method</label>
        <select name="payment_method" required>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card Payment">Card Payment</option>
        </select>
        <div class="d-flex justify-content-between h5 mt-3"><span>Total</span><strong id="cartTotal">LKR 0.00</strong></div>
        <button class="btn btn-coral rounded-pill w-100 mt-2">Place Order</button>
        <div id="checkoutAlert" class="mt-3"></div>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>
