// Parte do backend (Node.js + Express + MySQL)

import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do pool de conexão MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "0000",
    database: process.env.DB_NAME || "tribodev",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Buscar todos os posts
app.get("/api/posts", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).json({ error: "Erro ao buscar posts" });
    }
});

// Buscar um post específico
app.get("/api/posts/:id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Post não encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar post:", error);
        res.status(500).json({ error: "Erro ao buscar post" });
    }
});

// Criar um novo post
app.post("/api/posts", async (req, res) => {
    try {
        const { title, body, author } = req.body;

        const [result] = await pool.query(
            "INSERT INTO posts (title, body, author, created_at) VALUES (?, ?, ?, NOW())",
            [title, body, author]
        );

        res.status(201).json({
            id: result.insertId,
            title,
            body,
            author,
        });
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ error: "Erro ao criar post" });
    }
});

// Deletar um post
app.delete("/api/posts/:id", async (req, res) => {
  try {
      const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
      
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Post não encontrado" });
      }
      
      res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
      console.error("Erro ao deletar post:", error);
      res.status(500).json({ error: "Erro ao deletar post" });
  }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
