-- Create database and tables for Travel App
CREATE DATABASE IF NOT EXISTS travel_app;
USE travel_app;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  country VARCHAR(100),
  price INT
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  destination_id INT,
  date DATE,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(destination_id) REFERENCES destinations(id)
);

INSERT INTO destinations (name, country, price) VALUES
('Bali', 'Indonesia', 25000),
('Dubai', 'UAE', 45000),
('Paris', 'France', 70000);
