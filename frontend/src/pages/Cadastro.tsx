import './Cadastro.css'

export function Cadastro() {
    return (
        <div className="container">
            <h2>Cadastro Byte Store</h2>
            <form id="cadastroForm">
                <div className="form-grid">
                    <input type="text" id="nome" placeholder="Nome Completo" max="80" required/>
                        <input type="text" id="CPF" placeholder="CPF" max="14" required/>
                            <input type="email" id="email" placeholder="E-mail" max="80" required/>

                                <div className="input-wrapper">
                                    <input type="date" id="nascimento" required/>
                                        <label className="active">Data de nascimento</label>
                                </div>

                                <input type="text" id="endereco" placeholder="Endereço" max="75" required />
                                <input type="number" id="numero" placeholder="Número" max="999" required />
                                <input type="text" id="complemento" placeholder="Complemento" max="25" required />
                                <input type="text" id="bairro" placeholder="Bairro" max="50" required />
                                <input type="text" id="cidade" placeholder="Cidade" max="50" required />
                                <input type="text" id="estado" placeholder="Estado" max="2" required />
                                <input type="password" id="senha" placeholder="Senha" max="20" required />
                                <input type="password" id="confirmarSenha" placeholder="Confirmar senha" max="20" required />
                            </div>
                            <button type="submit">Cadastrar</button>
                        </form>
                        <button id="loginRedirect" className="secondary-button">Já possui conta? Clique aqui</button>
                </div>


                )
}