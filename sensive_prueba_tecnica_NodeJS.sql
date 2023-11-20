drop database sensive_prueba_tecnica_NodeJS;
CREATE DATABASE sensive_prueba_tecnica_NodeJS;
USE sensive_prueba_tecnica_NodeJS;

CREATE TABLE  contactos (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL , 
    address VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);

CREATE TABLE  user (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE, 
    password VARCHAR(150) NOT NULL
);
INSERT INTO sensive_prueba_tecnica_NodeJS.user (name, lastname, email, password) VALUES
    ('John', 'Doe', 'john@example.com', 'hashed_password')
    ;
    INSERT INTO sensive_prueba_tecnica_NodeJS.user (name, lastname, email, password) VALUES
    ('John', 'Doe', 'paco@paco.com', 'hashed_password')
    ;
SELECT * FROM sensive_prueba_tecnica_NodeJS.user;

