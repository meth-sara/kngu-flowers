<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Invalid request.'], 405);
}

$user = require_login();
$cartId = (int) ($_POST['cart_id'] ?? 0);
$quantity = max(1, (int) ($_POST['quantity'] ?? 1));

$stmt = $pdo->prepare(
    'UPDATE cart c
     INNER JOIN products p ON p.id = c.product_id
     SET c.quantity = LEAST(?, p.stock)
     WHERE c.id = ? AND c.user_id = ?'
);
$stmt->execute([$quantity, $cartId, $user['id']]);

json_response(['success' => true, 'message' => 'Cart updated.']);
