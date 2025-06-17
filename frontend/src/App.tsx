import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cadastro } from "./pages/Cadastro";
import {Login} from "./pages/Login";
import {Produto} from "./pages/Produto"
import { Carrinho } from "./pages/Carrinho";
import { Pagamento } from "./pages/Pagamento";
import { Endereco } from "./pages/Endereco";

export function App() {
  return <Endereco/>;(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </BrowserRouter>
  )
}
