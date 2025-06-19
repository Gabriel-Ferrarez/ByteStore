import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

export function Header() {
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
            <li><Link to="/categorias">CATEGORIAS</Link></li>
            <li>|</li>
            <li><Link to="#">QUEM SOMOS NÓS</Link></li> {}
          </ul>

          <div className="flex gap-4 ml-6">
            <Link to="/login"><FaUser size={24} className="text-white" /></Link>
            <Link to="/carrinho"><FaShoppingCart size={28} className="text-white" /></Link>
          </div>
        </nav>
      </div>
    </header>
  );
}