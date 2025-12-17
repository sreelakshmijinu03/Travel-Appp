CREATE DATABASE IF NOT EXISTS travel_app;
USE travel_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  is_admin TINYINT(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(100),
  price INT,
  days INT,
  details TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  destination_id INT,
  date DATE,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(destination_id) REFERENCES destinations(id)
);

INSERT INTO destinations (name, country, price, days, details) VALUES
('Bali', 'Indonesia', 25000, 5, 'Enjoy beaches, temples, and rice terraces.'),
('Dubai', 'UAE', 45000, 4, 'Experience skyscrapers, desert safari, and shopping.'),
('Paris', 'France', 70000, 6, 'Visit Eiffel Tower, Louvre, and charming streets.');
