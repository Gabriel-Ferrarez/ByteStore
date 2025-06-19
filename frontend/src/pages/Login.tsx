import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(event: React.FormEvent) {
  event.preventDefault();
  setErro('');

  try {
    const response = await axios.post('http://localhost:3001/login', {
      email,
      senha
    });

    if (response.data.success) {
      // Salva o usuário e o token no localStorage
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      localStorage.setItem('token', response.data.token); // Você precisará implementar JWT no backend
      navigate('/');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setErro(error.response?.data.error || 'Erro ao fazer login');
    } else {
      setErro('Erro desconhecido');
    }
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[350px] text-center">
        <h1 className="text-xl font-bold mb-8">BYTE STORE</h1>

        {erro && <div className="text-red-500 mb-4">{erro}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            className="border-b border-gray-400 p-2 focus:outline-none bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="border-b border-gray-400 p-2 focus:outline-none bg-transparent"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
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