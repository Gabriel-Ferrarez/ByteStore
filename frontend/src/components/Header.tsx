import logo from '/public/logo.jpg'

export function Header() {
    return (
        <div className="flex flex-col bg-blue-500 items-center gap-2 py-2 w-full">
            <div className="logo">
                <img src={logo} alt="Logo" className="size-15"/>
            </div>
            <div className="flex h-10 bg-zinc-100 w-100 rounded-lg">
                <input type="text" id="search" placeholder="Buscar produtos..." className="px-4"/>
            </div>
            <nav>
                <ul className="flex gap-2 text-md font-semibold text-white">
                    <li><a href="#">Categoria</a></li>
                    <p>|</p>
                    <li><a href="#">Quem somos nós</a></li>
                    <p>|</p>
                    <li><a href="#">Perfil</a></li>
                </ul>
            </nav>
        </div>
    )
}