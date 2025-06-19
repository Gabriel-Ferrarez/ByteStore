import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    navigate('/'); 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[350px] text-center">
        <h1 className="text-xl font-bold mb-8">BYTE STORE</h1>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            className="border-b border-gray-400 p-2 focus:outline-none bg-transparent"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border-b border-gray-400 p-2 focus:outline-none bg-transparent"
          />
          <div className="text-sm text-gray-600 text-left">
            Não possui conta?{' '}
            <a href="/cadastro" className="font-semibold text-black">Crie uma</a>
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 mt-4"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
