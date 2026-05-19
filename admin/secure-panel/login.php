<?php
declare(strict_types=1);

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/helpers.php';

ensure_default_admin($pdo);
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = strtolower(post_string('email', 190));
    $password = (string) ($_POST['password'] ?? '');

    $stmt = $pdo->prepare("SELECT id, full_name, email, password, role FROM users WHERE email = ? AND role = 'admin' LIMIT 1");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password'])) {
        session_regenerate_id(true);
        $_SESSION['admin'] = [
            'id' => (int) $admin['id'],
            'full_name' => $admin['full_name'],
            'email' => $admin['email'],
            'role' => $admin['role'],
        ];
        header('Location: dashboard.php');
        exit;
    }

    $error = 'Incorrect admin credentials.';
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Login | KNGU Flowers</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="../../assets/css/styles.css" rel="stylesheet">
</head>
<body class="admin-login">
  <main class="container min-vh-100 d-flex align-items-center justify-content-center">
    <form method="post" class="auth-card p-4 p-md-5">
      <p class="eyebrow mb-2">Secure Panel</p>
      <h1 class="h3 fw-bold mb-3">Admin Login</h1>
      <?php if ($error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endif; ?>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input name="email" type="email" class="form-control" value="admin@kngu.test" required>
      </div>
      <div class="mb-4">
        <label class="form-label">Password</label>
        <input name="password" type="password" class="form-control" value="admin123" required>
      </div>
      <button class="btn btn-dark w-100 rounded-pill py-3">Login</button>
      <a class="d-block text-center mt-3 text-muted" href="../../index.php">Back to shop</a>
    </form>
  </main>
</body>
</html>
