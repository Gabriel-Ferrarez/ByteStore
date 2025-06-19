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
        <Route path="/quemsomosnos" element={<Quemsomos />} />
        <Route path="/perfil" element={<Perfil />} />

         <Route path="/mouse" element={<Mouse />} />
         <Route path="/teclado" element={<Teclado />} />
         <Route path="/monitor" element={<Monitor />} />
        
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