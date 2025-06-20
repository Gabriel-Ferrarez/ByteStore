import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Produto } from './pages/Produto';
import { Login } from './pages/Login';
import { Carrinho } from './pages/Carrinho';
import { Cadastro } from './pages/Cadastro';
import { Quemsomos } from './pages/Quemsomos';
import { Perfil } from './pages/Perfil';
import { Mouse } from './pages/Mouse';
import { Teclado } from './pages/Teclados';
import { Monitor } from './pages/Monitor';
import { CadastroProduto } from './pages/CadastroProduto';
import { AdminRoute } from './components/AdminRoute';
import { Pagamento } from './pages/Pagamento';
import { Endereco } from './pages/Endereco';
import { Comprovante } from './pages/Comprovante';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SearchResults } from './pages/SearchResults';

function AppRoutes() {
  const location = useLocation();

  const hideHeaderRoutes = ['/login', '/cadastro'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-produto" element={
          <AdminRoute>
            <CadastroProduto />
          </AdminRoute>
        } />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/quemsomosnos" element={<Quemsomos />} />
        <Route path="/perfil" element={
            <ProtectedRoute>
            <Perfil />
            </ProtectedRoute>
        } />
        <Route path="/mouse" element={<Mouse />} />
        <Route path="/teclado" element={<Teclado />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/endereco" element={<Endereco />} />
        <Route path="/comprovante" element={<Comprovante />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}