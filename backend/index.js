const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); // Remova a segunda declaração
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configuração do Multer (movida para cima)
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

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ... (mantenha suas rotas existentes de login e cadastro aqui)

// Rotas de produtos
app.get('/produtos/destaque', async (req, res) => {
  try {
    const [produtos] = await db.query('SELECT * FROM produtos LIMIT 10');
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
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
    console.error('Erro ao buscar produto:', error);
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
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/produtos', (req, res) => {
  // Verificação de autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Acesse os campos do formulário corretamente
      const { nome, marca, descricao, preco } = req.body;
      const imagem = req.file ? req.file.filename : null;

      // Validação básica
      if (!nome || !marca || !descricao || !preco) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
      }

      const [result] = await db.query(
        'INSERT INTO produtos (nome, imagem, marca, descricao, preco) VALUES (?, ?, ?, ?, ?)',
        [nome, imagem, marca, descricao, parseFloat(preco)]
      );

      res.json({ 
        success: true,
        id: result.insertId
      });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
  });
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota de Login
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Primeiro verifica na tabela de administradores
    const [admins] = await db.query('SELECT * FROM administradores WHERE email = ?', [email]);
    
    if (admins.length > 0) {
      const admin = admins[0];
      
      if (senha === admin.senha) {
        return res.json({ 
          success: true,
          usuario: {
            id: admin.id,
            email: admin.email,
            nome: admin.nome,
            tipo: 'administrador',
            funcao: admin.funcao
          }
        });
      }
    }
    
    // Se não encontrou como admin, verifica na tabela de usuários
    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const user = users[0];
    // Aqui você deve usar bcrypt.compare() na prática
    const senhaValida = await bcrypt.compare(senha, user.senha);
    
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    res.json({ 
      success: true,
      usuario: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        tipo: 'cliente'
      }
    });
    
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
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

app.delete('/produtos/:id', async (req, res) => {
  // Verificação de autenticação
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  try {
    const { id } = req.params;
    
    // Verifique se o produto existe
    const [produto] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (produto.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Exclua o produto
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

app.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Busca dados básicos do usuário
    const [usuario] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    
    if (usuario.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Busca dados adicionais do cliente (se existirem)
    const [cliente] = await db.query('SELECT * FROM clientes WHERE usuario_id = ?', [id]);
    
    const response = {
      ...usuario[0],
      cliente: cliente.length > 0 ? cliente[0] : null
    };
    
    // Remove a senha antes de enviar
    delete response.senha;
    
    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});