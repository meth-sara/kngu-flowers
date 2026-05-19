# KNGU Flowers PHP/MySQL Setup

1. Copy the `kngu-flowers` folder into your XAMPP/WAMP web root.
   - XAMPP example: `C:\xampp\htdocs\kngu-flowers`

2. Start Apache and MySQL.

3. Open phpMyAdmin and import:
   - `database/schema.sql`

4. Check database credentials in:
   - `config/database.php`

5. Open the storefront:
   - `http://localhost/kngu-flowers/index.php`

6. Open the admin panel:
   - `http://localhost/kngu-flowers/secure-panel/login.php`
   - Email: `admin@kngu.test`
   - Password: `admin123`

The default admin account is created automatically the first time the admin login page is loaded if no admin exists.
