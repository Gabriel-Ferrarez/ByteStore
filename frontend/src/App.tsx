import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cadastro } from "./pages/Cadastro";
import {Login} from "./pages/Login";
import {Carrinho} from "./pages/Carrinho"

export function App() {
  return <Carrinho/>;(
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
