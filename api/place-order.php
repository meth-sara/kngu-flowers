<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Invalid request.'], 405);
}

$user = require_login();
$address = post_string('delivery_address', 1000);
$paymentMethod = post_string('payment_method', 60);

if ($address === '' || $paymentMethod === '') {
    json_response(['success' => false, 'message' => 'Delivery address and payment method are required.'], 422);
}

$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        'SELECT c.id AS cart_id, c.product_id, c.quantity, p.price_lkr, p.stock, p.title
         FROM cart c
         INNER JOIN products p ON p.id = c.product_id
         WHERE c.user_id = ?
         FOR UPDATE'
    );
    $stmt->execute([$user['id']]);
    $items = $stmt->fetchAll();

    if (!$items) {
        throw new RuntimeException('Your cart is empty.');
    }

    $total = 0.0;
    foreach ($items as $item) {
        if ((int) $item['quantity'] > (int) $item['stock']) {
            throw new RuntimeException($item['title'] . ' does not have enough stock.');
        }
        $total += (float) $item['price_lkr'] * (int) $item['quantity'];
    }

    $stmt = $pdo->prepare(
        'INSERT INTO orders (user_id, total_amount, payment_method, delivery_address, order_status)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$user['id'], $total, $paymentMethod, $address, 'Pending']);
    $orderId = (int) $pdo->lastInsertId();

    $itemStmt = $pdo->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    $stockStmt = $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

    foreach ($items as $item) {
        $itemStmt->execute([$orderId, $item['product_id'], $item['quantity'], $item['price_lkr']]);
        $stockStmt->execute([$item['quantity'], $item['product_id']]);
    }

    $stmt = $pdo->prepare('DELETE FROM cart WHERE user_id = ?');
    $stmt->execute([$user['id']]);

    $pdo->commit();
    json_response(['success' => true, 'message' => 'Order placed successfully.', 'order_id' => $orderId]);
} catch (Throwable $exception) {
    $pdo->rollBack();
    json_response(['success' => false, 'message' => $exception->getMessage()], 422);
}
