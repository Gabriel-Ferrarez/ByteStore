import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Dropdown } from '../components/Dropdown';

export function Header() {
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  return (
    <header className="bg-blue-500 w-full py-4">
      <div className="mx-auto px-4 flex items-center justify-between h-16">

        <div>
          <h1 className="text-white text-2xl font-bold">BYTE STORE</h1>
        </div>

        <div className="flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="px-4 py-2 w-full rounded-lg bg-zinc-100 text-black shadow"
          />
        </div>

        <nav className="flex items-center">
          <ul className="flex gap-4 text-sm font-semibold text-white items-center">
            <li><Link to="/">INÍCIO</Link></li>
            <li>|</li>
            <li><Dropdown /></li>
            <li>|</li>
            <li><Link to="/quemsomosnos">QUEM SOMOS NÓS</Link></li>

            {usuario?.tipo === 'administrador' && (
              <>
                <li>|</li>
                <li><Link to="/cadastro-produto">CADASTRAR PRODUTO</Link></li>
              </>
            )}
          </ul>

          <div className="flex gap-4 ml-6">
            <Link to="/perfil"><FaUser size={24} className="text-white" /></Link>
            <Link to="/carrinho"><FaShoppingCart size={28} className="text-white" /></Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
