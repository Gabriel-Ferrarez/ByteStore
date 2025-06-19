import { useState, useEffect } from 'react';
import axios from 'axios'; // Corrigido de mxios para axios
import { useNavigate } from 'react-router-dom';

interface Usuario {
  id: number;
  email: string;
  nome: string;
  tipo: 'cliente' | 'administrador';
}

interface FormData {
  nome: string;
  marca: string;
  descricao: string;
  preco: string;
}

export function CadastroProduto() { // Nome correto do componente
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    marca: '',
    descricao: '',
    preco: '',
  });
  const [imagem, setImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || 'null');
    setUsuario(user);

    if (!user || user.tipo !== 'administrador') {
      navigate('/');
    }
  }, [navigate]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!imagem) {
    alert('Selecione uma imagem para o produto');
    return;
  }

  setLoading(true);

  const data = new FormData();
  data.append('nome', formData.nome);
  data.append('marca', formData.marca);
  data.append('descricao', formData.descricao);
  data.append('preco', formData.preco);
  data.append('imagem', imagem); // Adicione a imagem diretamente

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.post('http://localhost:3001/produtos', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.success) {
      alert('Produto cadastrado com sucesso!');
      navigate('/');
    }
  } catch (error) {
    let errorMessage = 'Erro ao cadastrar produto';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || errorMessage;
    }
    alert(errorMessage);
  } finally {
    setLoading(false);
  }
};

  if (!usuario || usuario.tipo !== 'administrador') {
    return null;
  }


  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Marca</label>
          <input
            type="text"
            value={formData.marca}
            onChange={(e) => setFormData({...formData, marca: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Descrição</label>
          <textarea
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Preço</label>
          <input
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={(e) => setFormData({...formData, preco: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Imagem</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}