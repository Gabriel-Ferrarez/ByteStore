# ByteStore - E-commerce de Hardware

## 📋 Índice
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [⚙️ Pré-requisitos](#-pré-requisitos)
- [🚀 Como Configurar e Executar o Projeto](#-como-configurar-e-executar-o-projeto)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [🧪 Contas de Teste](#-contas-de-teste)
- [👥 Equipe de Desenvolvimento](#-equipe-de-desenvolvimento)
- [📜 Licença](#-licença)

---

## 🛠 Tecnologias Utilizadas

### Frontend

| Tecnologia     | Versão |
|----------------|--------|
| React          | 18+    |
| TypeScript     | 4.9+   |
| Tailwind CSS   | 3.3+   |
| React Router   | 6.8+   |
| Axios          | 1.3+   |

### Backend

| Tecnologia     | Versão |
|----------------|--------|
| Node.js        | 16+    |
| Express        | 4.18+  |
| MySQL          | 8.0+   |
| JWT            | 9.0+   |

---

## ⚙️ Pré-requisitos

- Node.js v16+
- MySQL Server 8.0+
- Yarn ou npm
- Git

---

## 🚀 Como Configurar e Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ByteStore.git
cd ByteStore
```

### 2. Configuração do Banco de Dados

Execute o script SQL:

```bash
mysql -u root -p < database/byteStore.sql
```

Crie e configure o arquivo `.env`:

```bash
cp backend/.env.example backend/.env
```

Edite o arquivo `.env` com suas credenciais do banco.

### 3. Iniciar o Backend

```bash
cd backend
yarn install
yarn start
```

### 4. Iniciar o Frontend

```bash
cd frontend
yarn install
yarn dev
```

---

## 📂 Estrutura do Projeto

```bash
byteStore/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── database/
│   └── uploads/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── styles/
└── README.md
```

---

## 🔧 Funcionalidades Implementadas

| Área       | Funcionalidades                         |
|------------|------------------------------------------|
| 👤 Usuário  | Cadastro, Login, Perfil, Carrinho        |
| 🛍️ Produtos | Busca, Listagem, Detalhes               |
| 🛠️ Admin    | CRUD de Produtos                         |

---

## 🧪 Contas de Teste

### Cliente Padrão:

- **Email:** cliente@teste.com  
- **Senha:** 123456

### Administrador:

- **Email:** admin@teste.com  
- **Senha:** admin123

---

## 👥 Equipe de Desenvolvimento

| Nome                                |
|-------------------------------------|
| Gabriel Antônio Ferrarez Oliveira   | 
| Ana Júlia Ferreira Rodrigues        | 
| Eduardo Gibertoni Camillo           | 
| Guilherme Laurindo de Souza Silva   | 
| Miguel Luperi Victoriano Soares     |

---

## 📜 Licença

MIT License - Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
