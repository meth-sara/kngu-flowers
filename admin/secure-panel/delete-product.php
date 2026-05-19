<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';

require_admin_page();

$id = (int) ($_POST['id'] ?? 0);
if ($id > 0) {
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
    try {
        $stmt->execute([$id]);
    } catch (PDOException $exception) {
        // Products referenced by orders are intentionally protected by FK constraints.
    }
}

header('Location: products.php');
exit;
