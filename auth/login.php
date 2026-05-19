<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Invalid request.'], 405);
}

$email = strtolower(post_string('email', 190));
$password = (string) ($_POST['password'] ?? '');

if ($email === '' || $password === '') {
    json_response(['success' => false, 'message' => 'Email and password are required.'], 422);
}

$stmt = $pdo->prepare('SELECT id, full_name, email, password, role FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    json_response(['success' => false, 'message' => 'Incorrect email or password.'], 401);
}

session_regenerate_id(true);
$_SESSION['user'] = [
    'id' => (int) $user['id'],
    'full_name' => $user['full_name'],
    'email' => $user['email'],
    'role' => $user['role'],
];

json_response(['success' => true, 'message' => 'Login successful.', 'user' => $_SESSION['user']]);
