<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';
require_once __DIR__ . '/partials.php';

require_admin_page();

$editId = (int) ($_GET['edit'] ?? 0);
$editing = null;
if ($editId > 0) {
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
    $stmt->execute([$editId]);
    $editing = $stmt->fetch();
}

$products = $pdo->query('SELECT * FROM products ORDER BY created_at DESC, id DESC')->fetchAll();
admin_header('Products');
?>
<div class="row g-4">
  <div class="col-lg-4">
    <div class="panel sticky-lg-top product-form-panel">
      <p class="eyebrow mb-1">Inventory</p>
      <h1 class="h4 fw-bold mb-3"><?= $editing ? 'Edit Product' : 'Add Product' ?></h1>
      <form method="post" action="save-product.php" enctype="multipart/form-data" class="vstack gap-3">
        <input type="hidden" name="id" value="<?= (int) ($editing['id'] ?? 0) ?>">
        <input type="hidden" name="existing_image" value="<?= e($editing['image'] ?? '') ?>">
        <div>
          <label class="form-label">Title</label>
          <input name="title" class="form-control" value="<?= e($editing['title'] ?? '') ?>" required>
        </div>
        <div>
          <label class="form-label">Description</label>
          <textarea name="description" rows="3" class="form-control"><?= e($editing['description'] ?? '') ?></textarea>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <label class="form-label">Price LKR</label>
            <input name="price_lkr" type="number" step="0.01" min="0" class="form-control" value="<?= e((string) ($editing['price_lkr'] ?? '')) ?>" required>
          </div>
          <div class="col-6">
            <label class="form-label">Stock</label>
            <input name="stock" type="number" min="0" class="form-control" value="<?= e((string) ($editing['stock'] ?? '')) ?>" required>
          </div>
        </div>
        <div>
          <label class="form-label">Category</label>
          <input name="category" class="form-control" value="<?= e($editing['category'] ?? 'Bouquets') ?>" required>
        </div>
        <div>
          <label class="form-label">Image</label>
          <input name="image" type="file" accept="image/*" class="form-control">
          <?php if (!empty($editing['image'])): ?><small class="text-muted">Current: <?= e($editing['image']) ?></small><?php endif; ?>
        </div>
        <div class="d-flex gap-3">
          <label class="form-check"><input class="form-check-input" name="is_featured" type="checkbox" value="1" <?= !empty($editing['is_featured']) ? 'checked' : '' ?>> Featured</label>
          <label class="form-check"><input class="form-check-input" name="is_best_seller" type="checkbox" value="1" <?= !empty($editing['is_best_seller']) ? 'checked' : '' ?>> Best seller</label>
        </div>
        <button class="btn btn-dark rounded-pill py-2"><?= $editing ? 'Update Product' : 'Add Product' ?></button>
        <?php if ($editing): ?><a class="btn btn-outline-secondary rounded-pill" href="products.php">Cancel edit</a><?php endif; ?>
      </form>
    </div>
  </div>
  <div class="col-lg-8">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <p class="eyebrow mb-1">Catalog</p>
        <h2 class="h4 fw-bold">Product Management</h2>
      </div>
      <a href="dashboard.php" class="btn btn-outline-dark rounded-pill">Dashboard</a>
    </div>
    <div class="panel">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
          <tbody>
          <?php foreach ($products as $product): ?>
            <tr>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <img src="../../<?= e($product['image']) ?>" class="admin-product-thumb" alt="">
                  <strong><?= e($product['title']) ?></strong>
                </div>
              </td>
              <td><?= e($product['category']) ?></td>
              <td>LKR <?= number_format((float) $product['price_lkr'], 2) ?></td>
              <td><?= (int) $product['stock'] ?></td>
              <td class="text-end">
                <a class="btn btn-sm btn-outline-dark" href="products.php?edit=<?= (int) $product['id'] ?>">Edit</a>
                <form method="post" action="delete-product.php" class="d-inline" onsubmit="return confirm('Delete this product?')">
                  <input type="hidden" name="id" value="<?= (int) $product['id'] ?>">
                  <button class="btn btn-sm btn-outline-danger">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<?php admin_footer(); ?>
