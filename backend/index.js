// app.js ou index.js
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens são permitidas'));
  }
}).single('imagem');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/produtos/destaque', async (req, res) => {
  try {
    const [produtos] = await db.query('SELECT * FROM produtos LIMIT 10');
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [produtos] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (produtos.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produtos[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const { q } = req.query;
    let query = 'SELECT * FROM produtos';
    const params = [];

    if (q) {
      query += ' WHERE nome LIKE ? OR descricao LIKE ?';
      params.push(`%${q}%`, `%${q}%`);
    }

    const [produtos] = await db.query(query, params);
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/produtos', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { nome, marca, descricao, preco } = req.body;
      const imagem = req.file ? req.file.filename : null;

      if (!nome || !marca || !descricao || !preco) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
      }

      const [result] = await db.query(
        'INSERT INTO produtos (nome, imagem, marca, descricao, preco) VALUES (?, ?, ?, ?, ?)',
        [nome, imagem, marca, descricao, parseFloat(preco)]
      );

      res.json({ success: true, id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
  });
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [admins] = await db.query('SELECT * FROM administradores WHERE email = ?', [email]);
    if (admins.length > 0 && senha === admins[0].senha) {
      return res.json({ success: true, usuario: { ...admins[0], tipo: 'administrador' } });
    }

    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0 || !(await bcrypt.compare(senha, users[0].senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({ success: true, usuario: { ...users[0], tipo: 'cliente' } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.post('/cadastro', async (req, res) => {
  try {
    const { email, senha, nome, cpf, data_nascimento, cep, estado, cidade, bairro, rua, numero, complemento } = req.body;

    const [existingUser] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
      const [usuarioResult] = await conn.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
      );

      const usuarioId = usuarioResult.insertId;
      await conn.query(
        `INSERT INTO clientes (usuario_id, cpf, data_nascimento, cep, estado, cidade, bairro, rua, numero, complemento)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [usuarioId, cpf, data_nascimento, cep, estado, cidade, bairro, rua, numero, complemento]
      );

      await conn.commit();
      conn.release();

      res.json({ success: true });
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: 'Acesso negado' });

  try {
    const { id } = req.params;
    const [produto] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (produto.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });

    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

app.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [usuario] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (usuario.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

    const [cliente] = await db.query('SELECT * FROM clientes WHERE usuario_id = ?', [id]);
    const response = { ...usuario[0], cliente: cliente.length > 0 ? cliente[0] : null };
    delete response.senha;

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

app.get('/usuario/:id/pedidos', async (req, res) => {
  try {
    const { id } = req.params;
    const [pedidos] = await db.query(`
      SELECT p.id, p.data_pedido, p.status, p.forma_pagamento, p.endereco_entrega
      FROM pedidos p WHERE p.usuario_id = ?
      ORDER BY p.data_pedido DESC LIMIT 5`, [id]);

    for (const pedido of pedidos) {
      const [itens] = await db.query(`
        SELECT pi.quantidade, pi.preco_unitario, pr.nome 
        FROM pedido_itens pi
        JOIN produtos pr ON pi.produto_id = pr.id
        WHERE pi.pedido_id = ?`, [pedido.id]);

      pedido.valor_total = itens.reduce((total, item) => total + item.preco_unitario * item.quantidade, 0);
      pedido.itens = itens;
    }

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

app.post('/pedidos', async (req, res) => {
  try {
    const { usuario_id, itens, endereco_entrega, forma_pagamento } = req.body;
    if (!usuario_id || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: 'Dados do pedido inválidos' });
    }

    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
      const enderecoEntregaStr = JSON.stringify(endereco_entrega);

      const [pedidoResult] = await conn.query(
        `INSERT INTO pedidos (usuario_id, endereco_entrega, forma_pagamento, status) 
         VALUES (?, ?, ?, 'pendente')`,
        [usuario_id, enderecoEntregaStr, forma_pagamento]
      );

      const pedido_id = pedidoResult.insertId;
      let valor_total = 0;

      for (const item of itens) {
        await conn.query(
          `INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario) 
           VALUES (?, ?, ?, ?)`,
          [pedido_id, item.id, item.quantidade, item.valor]
        );
        valor_total += item.valor * item.quantidade;
      }

      await conn.query(
        `UPDATE pedidos SET valor_total = ? WHERE id = ?`,
        [valor_total, pedido_id]
      );

      await conn.commit();
      conn.release();

      res.json({ success: true, pedido_id, valor_total });
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});
app.post('/cadastro', async (req, res) => {
  try {
    const {
      email, senha, nome,
      cpf, data_nascimento, cep,
      estado, cidade, bairro,
      rua, numero, complemento
    } = req.body;
    
    // Verifica se usuário já existe
    const [existingUser] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    
    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);
    
    // Inicia transação
    const conn = await db.getConnection();
    await conn.beginTransaction();
    
    try {
      // Insere usuário
      const [usuarioResult] = await conn.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
      );
      
      const usuarioId = usuarioResult.insertId;
      
      // Insere cliente
      await conn.query(
        `INSERT INTO clientes 
        (usuario_id, cpf, data_nascimento, cep, estado, cidade, bairro, rua, numero, complemento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [usuarioId, cpf, data_nascimento, cep, estado, cidade, bairro, rua, numero, complemento]
      );
      
      await conn.commit();
      conn.release();
      
      res.json({ success: true });
      
    } catch (error) {
      await conn.rollback();
      conn.release();
      throw error;
    }
    
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});
