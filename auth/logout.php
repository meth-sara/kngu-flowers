<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/helpers.php';

unset($_SESSION['user'], $_SESSION['admin']);
session_regenerate_id(true);

if (isset($_GET['redirect']) && $_GET['redirect'] === 'admin') {
    header('Location: ../admin/secure-panel/login.php');
    exit;
}

header('Location: ../index.php');
exit;
