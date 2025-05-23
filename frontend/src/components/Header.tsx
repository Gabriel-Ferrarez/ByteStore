export function Header() {
    return (
        <header className="bg-blue-500 w-full pl-1 pr-4 py-4">

            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Título à esquerda */}
                <h1 className="text-white text-2xl font-bold">BYTE STORE</h1>

                {/* Conteúdo central (busca e menu) */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        className="px-3 py-2 w-full max-w-md rounded-lg bg-zinc-100 text-black mb-2"
                    />
                    <nav>
                        <ul className="flex gap-3 text-sm font-semibold text-white">
                            <li><a href="#">CATEGORIA</a></li>
                            <li>|</li>
                            <li><a href="#">QUEM SOMOS NÓS</a></li>
                            <li>|</li>
                            <li><a href="#">PERFIL</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
