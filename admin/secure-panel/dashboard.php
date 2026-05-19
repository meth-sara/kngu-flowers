<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';
require_once __DIR__ . '/partials.php';

require_admin_page();

$totalOrders = (int) $pdo->query('SELECT COUNT(*) FROM orders')->fetchColumn();
$totalRevenue = (float) $pdo->query("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE order_status <> 'Cancelled'")->fetchColumn();
$totalUsers = (int) $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'user'")->fetchColumn();
$lowStock = (int) $pdo->query('SELECT COUNT(*) FROM products WHERE stock <= 5')->fetchColumn();
$recentOrders = $pdo->query(
    'SELECT o.id, o.total_amount, o.order_status, o.created_at, u.full_name, u.email
     FROM orders o INNER JOIN users u ON u.id = o.user_id
     ORDER BY o.created_at DESC LIMIT 8'
)->fetchAll();
$topProducts = $pdo->query(
    'SELECT p.title, COALESCE(SUM(oi.quantity), 0) AS sold
     FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id
     GROUP BY p.id ORDER BY sold DESC LIMIT 5'
)->fetchAll();

admin_header('Dashboard');
?>
<div class="d-flex justify-content-between align-items-center mb-4">
  <div>
    <p class="eyebrow mb-1">Overview</p>
    <h1 class="h3 fw-bold">Admin Dashboard</h1>
  </div>
  <a href="orders.php" class="btn btn-dark rounded-pill">Manage Orders</a>
</div>

<div class="row g-3 mb-4">
  <div class="col-md-3"><div class="metric-card"><span>Total Orders</span><strong><?= $totalOrders ?></strong></div></div>
  <div class="col-md-3"><div class="metric-card"><span>Total Revenue</span><strong>LKR <?= number_format($totalRevenue, 2) ?></strong></div></div>
  <div class="col-md-3"><div class="metric-card"><span>Total Users</span><strong><?= $totalUsers ?></strong></div></div>
  <div class="col-md-3"><div class="metric-card"><span>Low Stock</span><strong><?= $lowStock ?></strong></div></div>
</div>

<div class="row g-4">
  <div class="col-lg-8">
    <div class="panel">
      <h2 class="h5 fw-bold mb-3">Recent Orders</h2>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
          <?php foreach ($recentOrders as $order): ?>
            <tr>
              <td>#<?= (int) $order['id'] ?></td>
              <td><?= e($order['full_name']) ?><br><small class="text-muted"><?= e($order['email']) ?></small></td>
              <td>LKR <?= number_format((float) $order['total_amount'], 2) ?></td>
              <td><span class="status-pill"><?= e($order['order_status']) ?></span></td>
              <td><?= e($order['created_at']) ?></td>
            </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-lg-4">
    <div class="panel">
      <h2 class="h5 fw-bold mb-3">Product Analytics</h2>
      <?php foreach ($topProducts as $product): ?>
        <div class="d-flex justify-content-between border-bottom py-2">
          <span><?= e($product['title']) ?></span>
          <strong><?= (int) $product['sold'] ?> sold</strong>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
<?php admin_footer(); ?>
