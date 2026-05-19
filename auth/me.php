<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/helpers.php';

json_response([
    'success' => true,
    'user' => current_user(),
]);
