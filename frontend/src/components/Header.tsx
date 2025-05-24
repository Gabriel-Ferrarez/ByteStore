import { FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

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

        <nav className="flex items-center ">
          {/* Links (Início, Categorias, Quem Somos Nós) */}
          <ul className="flex gap-4 text-sm font-semibold text-white items-center ">
            <li><a href="#">INÍCIO</a></li>
            <li>|</li>
            <li><a href="#">CATEGORIAS</a></li>
            <li>|</li>
            <li><a href="#">QUEM SOMOS NÓS</a></li>
          </ul>

          <div className="flex gap-4 ml-6">
            <a href="#"><FaUser size={24} className="text-white" /></a>
            <a href="#"><FaShoppingCart size={28} className="text-white" /></a>
          </div>
        </nav>
      </div>
    </header>
  );
}