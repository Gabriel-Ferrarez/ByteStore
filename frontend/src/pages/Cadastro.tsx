export function Cadastro() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-5xl">
        <h1 className="text-xl font-bold text-center mb-10">BYTE STORE</h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="E-mail"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="password"
              placeholder="Senha"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="password"
              placeholder="Confirme sua senha"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="Bairro"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="Rua"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="Número"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Complemento"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="Cidade"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="Estado"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="CEP"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="text"
              placeholder="CPF"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
            />
            <input
              type="date"
              placeholder="Nascimento"
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2 text-gray-500"
            />
          </div>
        </form>

        <div className="flex justify-between items-center mt-10">
          <p className="text-sm text-gray-500">
            Já possui uma conta?{' '}
            <span className="font-semibold cursor-pointer hover:underline text-black">Faça Login</span>
          </p>
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800"
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
