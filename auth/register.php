<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Invalid request.'], 405);
}

$fullName = post_string('full_name', 120);
$email = strtolower(post_string('email', 190));
$password = (string) ($_POST['password'] ?? '');
$confirmPassword = (string) ($_POST['confirm_password'] ?? '');

if ($fullName === '' || $email === '' || $password === '' || $confirmPassword === '') {
    json_response(['success' => false, 'message' => 'All fields are required.'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['success' => false, 'message' => 'Please enter a valid email address.'], 422);
}

if (strlen($password) < 6) {
    json_response(['success' => false, 'message' => 'Password must be at least 6 characters.'], 422);
}

if ($password !== $confirmPassword) {
    json_response(['success' => false, 'message' => 'Passwords do not match.'], 422);
}

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    json_response(['success' => false, 'message' => 'This email is already registered.'], 409);
}

$stmt = $pdo->prepare('INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)');
$stmt->execute([$fullName, $email, password_hash($password, PASSWORD_DEFAULT), 'user']);

$_SESSION['user'] = [
    'id' => (int) $pdo->lastInsertId(),
    'full_name' => $fullName,
    'email' => $email,
    'role' => 'user',
];

json_response(['success' => true, 'message' => 'Registration successful.', 'user' => $_SESSION['user']]);
