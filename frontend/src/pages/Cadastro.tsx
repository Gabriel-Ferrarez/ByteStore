import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function Cadastro() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    confirmarSenha: '',
    nome: '',
    cpf: '',
    data_nascimento: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleCadastro(event: React.FormEvent) {
    event.preventDefault();
    setErro('');

    // Validação simples
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/cadastro', {
        email: formData.email,
        senha: formData.senha,
        nome: formData.nome,
        cpf: formData.cpf,
        data_nascimento: formData.data_nascimento,
        cep: formData.cep,
        estado: formData.estado,
        cidade: formData.cidade,
        bairro: formData.bairro,
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento
      });

      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErro(error.response?.data.error || 'Erro ao cadastrar');
      } else {
        setErro('Erro desconhecido');
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-5xl">
        <h1 className="text-xl font-bold text-center mb-10">BYTE STORE</h1>

        {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCadastro}>
          <div className="flex flex-col gap-4">
            <input type="email" name="email" placeholder="E-mail" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.email} onChange={handleChange} required />
            
            <input type="password" name="senha" placeholder="Senha" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.senha} onChange={handleChange} required />
            
            <input type="password" name="confirmarSenha" placeholder="Confirme sua senha" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.confirmarSenha} onChange={handleChange} required />
            
            <input type="text" name="nome" placeholder="Nome Completo" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.nome} onChange={handleChange} required />
            
            <input type="text" name="bairro" placeholder="Bairro" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.bairro} onChange={handleChange} required />
            
            <input type="text" name="rua" placeholder="Rua" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.rua} onChange={handleChange} required />
            
            <input type="text" name="numero" placeholder="Número" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.numero} onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-4">
            <input type="text" name="complemento" placeholder="Complemento" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.complemento} onChange={handleChange} />
            
            <input type="text" name="cidade" placeholder="Cidade" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.cidade} onChange={handleChange} required />
            
            <input type="text" name="estado" placeholder="Estado" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.estado} onChange={handleChange} required />
            
            <input type="text" name="cep" placeholder="CEP" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.cep} onChange={handleChange} required />
            
            <input type="text" name="cpf" placeholder="CPF" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2"
              value={formData.cpf} onChange={handleChange} required />
            
            <input type="date" name="data_nascimento" 
              className="border-b border-gray-300 focus:outline-none focus:border-blue-700 p-2 text-gray-500"
              value={formData.data_nascimento} onChange={handleChange} required />
          </div>

          <div className="col-span-2 flex justify-between items-center mt-10">
            <p className="text-sm text-gray-500">
              Já possui uma conta?{' '}
              <a className="font-semibold cursor-pointer hover:underline text-black" href="/login">Faça Login</a>
            </p>
            <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800">
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}