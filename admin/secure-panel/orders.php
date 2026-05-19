<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';
require_once __DIR__ . '/partials.php';

require_admin_page();

$orders = $pdo->query(
    'SELECT o.*, u.full_name, u.email
     FROM orders o INNER JOIN users u ON u.id = o.user_id
     ORDER BY o.created_at DESC'
)->fetchAll();

$itemsStmt = $pdo->prepare(
    'SELECT oi.*, p.title
     FROM order_items oi INNER JOIN products p ON p.id = oi.product_id
     WHERE oi.order_id = ?'
);

admin_header('Orders');
?>
<div class="d-flex justify-content-between align-items-center mb-4">
  <div>
    <p class="eyebrow mb-1">Fulfillment</p>
    <h1 class="h3 fw-bold">Order Management</h1>
  </div>
  <a href="dashboard.php" class="btn btn-outline-dark rounded-pill">Dashboard</a>
</div>

<?php foreach ($orders as $order): ?>
  <?php $itemsStmt->execute([$order['id']]); $items = $itemsStmt->fetchAll(); ?>
  <div class="panel mb-3">
    <div class="row g-3 align-items-start">
      <div class="col-lg-3">
        <h2 class="h5 fw-bold mb-1">Order #<?= (int) $order['id'] ?></h2>
        <p class="text-muted mb-0"><?= e($order['created_at']) ?></p>
      </div>
      <div class="col-lg-3">
        <strong><?= e($order['full_name']) ?></strong><br>
        <small class="text-muted"><?= e($order['email']) ?></small>
        <p class="small mt-2 mb-0"><?= e($order['delivery_address']) ?></p>
      </div>
      <div class="col-lg-3">
        <?php foreach ($items as $item): ?>
          <div class="small"><?= e($item['title']) ?> x <?= (int) $item['quantity'] ?></div>
        <?php endforeach; ?>
        <strong class="d-block mt-2">LKR <?= number_format((float) $order['total_amount'], 2) ?></strong>
        <small class="text-muted"><?= e($order['payment_method']) ?></small>
      </div>
      <div class="col-lg-3">
        <form method="post" action="update-order-status.php" class="d-flex gap-2">
          <input type="hidden" name="order_id" value="<?= (int) $order['id'] ?>">
          <select name="order_status" class="form-select">
            <?php foreach (['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as $status): ?>
              <option value="<?= $status ?>" <?= $order['order_status'] === $status ? 'selected' : '' ?>><?= $status ?></option>
            <?php endforeach; ?>
          </select>
          <button class="btn btn-dark">Save</button>
        </form>
      </div>
    </div>
  </div>
<?php endforeach; ?>
<?php admin_footer(); ?>
