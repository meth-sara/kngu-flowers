<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';

require_admin_page();

$id = (int) ($_POST['id'] ?? 0);
$title = post_string('title', 160);
$description = post_string('description', 2000);
$price = max(0, (float) ($_POST['price_lkr'] ?? 0));
$stock = max(0, (int) ($_POST['stock'] ?? 0));
$category = post_string('category', 80);
$image = post_string('existing_image', 255);
$isFeatured = isset($_POST['is_featured']) ? 1 : 0;
$isBestSeller = isset($_POST['is_best_seller']) ? 1 : 0;

if (!empty($_FILES['image']['name']) && is_uploaded_file($_FILES['image']['tmp_name'])) {
    $extension = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (in_array($extension, $allowed, true)) {
        $fileName = 'product-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $extension;
        $target = __DIR__ . '/../../uploads/products/' . $fileName;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            $image = 'uploads/products/' . $fileName;
        }
    }
}

if ($id > 0) {
    $stmt = $pdo->prepare(
        'UPDATE products
         SET title = ?, description = ?, price_lkr = ?, image = ?, category = ?, stock = ?, is_featured = ?, is_best_seller = ?
         WHERE id = ?'
    );
    $stmt->execute([$title, $description, $price, $image, $category, $stock, $isFeatured, $isBestSeller, $id]);
} else {
    $stmt = $pdo->prepare(
        'INSERT INTO products (title, description, price_lkr, image, category, stock, is_featured, is_best_seller)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$title, $description, $price, $image, $category, $stock, $isFeatured, $isBestSeller]);
}

header('Location: products.php');
exit;
