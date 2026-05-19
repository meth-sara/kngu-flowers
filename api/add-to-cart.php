<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Invalid request.'], 405);
}

$user = require_login();
$productId = (int) ($_POST['product_id'] ?? 0);
$quantity = max(1, (int) ($_POST['quantity'] ?? 1));

$stmt = $pdo->prepare('SELECT stock FROM products WHERE id = ? LIMIT 1');
$stmt->execute([$productId]);
$product = $stmt->fetch();

if (!$product || (int) $product['stock'] <= 0) {
    json_response(['success' => false, 'message' => 'Product is out of stock.'], 422);
}

$stmt = $pdo->prepare(
    'INSERT INTO cart (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = LEAST(quantity + VALUES(quantity), ?)'
);
$stmt->execute([$user['id'], $productId, $quantity, (int) $product['stock']]);

json_response(['success' => true, 'message' => 'Added to cart.']);
