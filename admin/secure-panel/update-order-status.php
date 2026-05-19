<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';

require_admin_page();

$orderId = (int) ($_POST['order_id'] ?? 0);
$status = (string) ($_POST['order_status'] ?? '');
$allowed = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

if ($orderId > 0 && in_array($status, $allowed, true)) {
    $stmt = $pdo->prepare('UPDATE orders SET order_status = ? WHERE id = ?');
    $stmt->execute([$status, $orderId]);
}

header('Location: orders.php');
exit;
