<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$user = require_login();

$stmt = $pdo->prepare(
    'SELECT c.id AS cart_id, c.quantity, p.id, p.title, p.price_lkr, p.image, p.stock
     FROM cart c
     INNER JOIN products p ON p.id = c.product_id
     WHERE c.user_id = ?
     ORDER BY c.id DESC'
);
$stmt->execute([$user['id']]);
$items = $stmt->fetchAll();
$total = array_reduce($items, fn ($sum, $item) => $sum + ((float) $item['price_lkr'] * (int) $item['quantity']), 0.0);

json_response(['success' => true, 'items' => $items, 'total' => $total]);
