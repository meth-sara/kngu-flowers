<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

$search = trim((string) ($_GET['search'] ?? ''));
$category = trim((string) ($_GET['category'] ?? ''));
$filter = trim((string) ($_GET['filter'] ?? ''));
$params = [];
$where = [];

if ($search !== '') {
    $where[] = '(title LIKE ? OR description LIKE ?)';
    $params[] = "%{$search}%";
    $params[] = "%{$search}%";
}

if ($category !== '') {
    $where[] = 'category = ?';
    $params[] = $category;
}

if ($filter === 'featured') {
    $where[] = 'is_featured = 1';
}

if ($filter === 'best-sellers') {
    $where[] = 'is_best_seller = 1';
}

$sql = 'SELECT id, title, description, price_lkr, image, category, stock, is_featured, is_best_seller FROM products';
if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}
$sql .= ' ORDER BY created_at DESC, id DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

json_response(['success' => true, 'products' => $stmt->fetchAll()]);
