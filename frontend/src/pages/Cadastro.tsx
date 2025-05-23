export function Cadastro() {
    return (
        <div className="flex flex-1 h-screen w-screen items-center justify-center bg-zinc-100">

            <div className="flex flex-col items-center w-200 rounded-lg shadow-xl h-fit bg-white p-8">
                <h2 className="text-4xl font-bold">Cadastro Byte Store</h2>
                <form id="cadastroForm" className="flex flex-col items-center mt-4">
                    <div className="grid grid-cols-2 gap-2">

                        <div className="flex flex-col">
                            <label>Nome Completo</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="nome" placeholder="Nome Completo" max="80" required />
                        </div>

                        <div className="flex flex-col">
                            <label>CPF</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="CPF" placeholder="CPF" max="14" required />
                        </div>

                        <div className="flex flex-col">
                            <label>E-mail</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="email" id="email" placeholder="E-mail" max="80" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Data de Nascimento</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="date" id="nascimento" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Endereço</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="endereco" placeholder="Endereço" max="75" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Número</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" id="numero" placeholder="Número" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Complemento</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="complemento" placeholder="Complemento" max="25
                        </div>" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Bairro</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="bairro" placeholder="Bairro" max="50" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Cidade</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="cidade" placeholder="Cidade" max="50" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Estado</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="text" id="estado" placeholder="Estado" max="2" required />
                        </div>

                        <div className="flex flex-col">
                            <label>Senha</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="password" id="senha" placeholder="Senha" max="20" required />
                        </div>
                        <div className="flex flex-col">
                            <label>Confirmar senha</label>
                            <input className="w-60 border-1 border-zinc-200 p-2 rounded-md" type="password" id="confirmarSenha" placeholder="Confirmar senha" max="
                        </div>20" required />
                        </div>

                    </div>
                    <button type="submit" className="w-[50%] bg-blue-500 p-2 rounded-md mt-2">Cadastrar</button>
                </form>
                <button id="loginRedirect" className="w-[50%] bg-blue-100 p-2 rounded-md mt-2 text-sm underline">Já possui conta? Clique aqui</button>
            </div>

        </div>


    )
}