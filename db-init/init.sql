CREATE DATABASE IF NOT EXISTS capizoo;

USE capizoo;

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON capizoo.* TO 'user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS animalRecords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animalSpecies VARCHAR(255) NOT NULL, 
  animalName VARCHAR(255) NOT NULL,
  animalAge VARCHAR(255) NOT NULL, 
  animalWeight VARCHAR(255) NOT NULL,
  animalHealth VARCHAR(255) NOT NULL, 
  animalHabitat VARCHAR(255) NOT NULL,
  animalBehavior VARCHAR(255) NOT NULL,
  animalDiet VARCHAR(255) NOT NULL,
  observations VARCHAR(255) NOT NULL, 
  animalPictures TEXT NOT NULL,
  modificationDate VARCHAR(255) NOT NULL,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);
