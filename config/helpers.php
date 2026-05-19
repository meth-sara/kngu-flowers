<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function current_user(): ?array
{
    return $_SESSION['user'] ?? null;
}

function require_login(): array
{
    if (empty($_SESSION['user'])) {
        json_response(['success' => false, 'message' => 'Please login first.'], 401);
    }
    return $_SESSION['user'];
}

function require_admin_page(): void
{
    if (empty($_SESSION['admin']) || ($_SESSION['admin']['role'] ?? '') !== 'admin') {
        header('Location: login.php');
        exit;
    }
}

function require_admin_api(): array
{
    if (empty($_SESSION['admin']) || ($_SESSION['admin']['role'] ?? '') !== 'admin') {
        json_response(['success' => false, 'message' => 'Admin login required.'], 403);
    }
    return $_SESSION['admin'];
}

function ensure_default_admin(PDO $pdo): void
{
    $stmt = $pdo->prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    $stmt->execute();
    if ($stmt->fetch()) {
        return;
    }

    $password = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute(['admin@kngu.test']);
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $pdo->prepare('UPDATE users SET full_name = ?, password = ?, role = ? WHERE id = ?');
        $stmt->execute(['KNGU Admin', $password, 'admin', $existing['id']]);
        return;
    }

    $stmt = $pdo->prepare('INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)');
    $stmt->execute(['KNGU Admin', 'admin@kngu.test', $password, 'admin']);
}

function post_string(string $key, int $max = 255): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    return substr($value, 0, $max);
}
