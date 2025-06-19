import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Produto } from './pages/Produto';
import { Login } from './pages/Login';
import { Carrinho } from './pages/Carrinho';
import { Cadastro } from './pages/Cadastro';

function AppRoutes() {
  const location = useLocation();

  // Rotas onde o Header não deve aparecer
  const hideHeaderRoutes = ['/login', '/cadastro'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Produto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/carrinho" element={<Carrinho />} />
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