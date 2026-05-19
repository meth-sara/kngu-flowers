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
('Spring Snowflake', 'A soft seasonal arrangement with light blooms and delicate greens.', 5700, 'src/assets/images/regenerated_image_1779162810748.jpg', 'Spring', 0, 1, 1),
('Rock Soapwort', 'Minimal pink bloom arranged for elegant gifting.', 15000, 'src/assets/images/regenerated_image_1779162833379.jpg', 'Roses', 18, 1, 0),
('Scarlet Sage', 'Bright floral vase with rich color and boutique wrapping.', 11700, 'src/assets/images/regenerated_image_1779162845121.jpg', 'Vase', 20, 1, 1),
('Foxglove Flower', 'Purple tulips styled in a cheerful yellow pot.', 23700, 'src/assets/images/regenerated_image_1779162857259.jpg', 'Tulips', 15, 0, 1),
('Lity Majesty Palm', 'A single dramatic stem for modern floral styling.', 5700, 'src/assets/images/regenerated_image_1779162781667.jpg', 'Single Stem', 14, 1, 0),
('Wild Roses', 'A romantic rose cluster with lush texture.', 5700, 'src/assets/images/regenerated_image_1779162876478.jpg', 'Roses', 22, 1, 1),
('Summer Savory', 'Purple summer stem for clean, minimal interiors.', 12000, 'src/assets/images/regenerated_image_1779162891138.jpg', 'Summer', 12, 0, 1),
('Majesty Palm', 'Fresh purple tulips with green leaves and graceful shape.', 19700, 'src/assets/images/regenerated_image_1779162774035.png', 'Tulips', 10, 0, 0)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  price_lkr = VALUES(price_lkr),
  image = VALUES(image),
  category = VALUES(category),
  stock = VALUES(stock),
  is_featured = VALUES(is_featured),
  is_best_seller = VALUES(is_best_seller);
