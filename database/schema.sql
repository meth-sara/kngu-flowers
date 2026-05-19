CREATE DATABASE IF NOT EXISTS flower_shop_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE flower_shop_db;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT,
  price_lkr DECIMAL(10,2) NOT NULL DEFAULT 0,
  image VARCHAR(255),
  category VARCHAR(80) NOT NULL DEFAULT 'Bouquets',
  stock INT NOT NULL DEFAULT 0,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_best_seller TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_product_title (title)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cart (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  UNIQUE KEY unique_cart_item (user_id, product_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(60) NOT NULL,
  delivery_address TEXT NOT NULL,
  order_status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO products (title, description, price_lkr, image, category, stock, is_featured, is_best_seller)
VALUES
('Blush Rose Bouquet', 'Soft pink roses arranged with seasonal greens for romantic gifting.', 14500, 'src/assets/images/regenerated_image_1779162781667.jpg', 'Roses', 20, 1, 1),
('Luxury Lily Basket', 'Premium lilies in an elegant hand-woven basket.', 18500, 'src/assets/images/regenerated_image_1779162810748.jpg', 'Lilies', 15, 1, 0),
('Designer Choice Vase', 'A florist-curated arrangement made fresh each morning.', 22500, 'src/assets/images/regenerated_image_1779162774035.png', 'Designer', 12, 1, 1),
('Orchid Grace', 'Minimal orchid arrangement for refined spaces and special occasions.', 26500, 'src/assets/images/regenerated_image_1779162833379.jpg', 'Orchids', 10, 0, 1),
('Sunshine Garden Mix', 'Bright seasonal blooms crafted for birthdays and celebrations.', 12800, 'src/assets/images/regenerated_image_1779162845121.jpg', 'Mixed', 24, 0, 0),
('Wedding White Classic', 'White roses and delicate fillers for bridal and formal gifting.', 32000, 'src/assets/images/regenerated_image_1779162857259.jpg', 'Wedding', 8, 1, 0)
ON DUPLICATE KEY UPDATE title = VALUES(title);
