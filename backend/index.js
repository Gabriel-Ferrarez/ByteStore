const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados (agora usando variáveis de ambiente)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Teste de conexão
db.connect(err => {
  if (err) {
    console.error('Erro na conexão:', err);
  } else {
    console.log('Conectado ao banco de dados!');
  }
});

app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Usando a porta do .env ou 3001 como fallback
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});