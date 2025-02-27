CREATE DATABASE IF NOT EXISTS tribodev;
USE tribodev;

CREATE TABLE IF NOT EXISTS posts (
--   userId INT NOT NULL,   Isso será implementado após a criação de login e registro no site
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  author VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dados apenas para teste
-- INSERT INTO posts (userID, title, body, author) VALUES
-- (1, 'Introdução ao React', 'React é uma biblioteca JavaScript para construção de interfaces...', 'João Silva'),
-- (2, 'Trabalhando com Tailwind CSS', 'Tailwind é um framework CSS utilitário que permite...', 'Maria Santos'),
-- (3, 'Node.js e MySQL', 'Aprenda como conectar sua aplicação Node.js com MySQL...', 'Pedro Oliveira');

INSERT INTO posts (title, body, author) VALUES
('Introdução ao React', 'React é uma biblioteca JavaScript para construção de interfaces...', 'João Silva'),
('Trabalhando com Tailwind CSS', 'Tailwind é um framework CSS utilitário que permite...', 'Maria Santos'),
('Node.js e MySQL', 'Aprenda como conectar sua aplicação Node.js com MySQL...', 'Pedro Oliveira');