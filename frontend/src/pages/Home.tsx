import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

interface Produto {
  id: number;
  nome: string;
  imagem: string | null;
  marca: string;
  descricao: string;
  preco: string;
}

interface Usuario {
  id: number;
  email: string;
  nome: string;
  tipo: 'cliente' | 'administrador';
}

export function Home() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || 'null');
    setUsuario(user);
    
    async function fetchProdutos() {
      try {
        const response = await axios.get('http://localhost:3001/produtos/destaque');
        setProducts(response.data);
      } catch (erro) {
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
        console.error("Erro ao buscar produtos:", erro);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      await axios.delete(`http://localhost:3001/produtos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setProducts(prevProducts => prevProducts.filter(produto => produto.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert(axios.isAxiosError(error) 
        ? error.response?.data?.error || 'Erro ao excluir produto'
        : 'Erro ao excluir produto');
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (products.length === 0) return <div className="text-center py-8">Nenhum produto encontrado</div>;

  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col gap-8 p-8 w-[75%]">
        <h1 className='text-4xl font-bold'>Produtos em destaque</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((produto) => (
            <div key={produto.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative group">
              {usuario?.tipo === 'administrador' && (
                <button 
                  onClick={() => handleDelete(produto.id)}
                  className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-opacity opacity-0 group-hover:opacity-100"
                  title="Excluir produto"
                  aria-label="Excluir produto"
                >
                  <FaTrash className="text-lg" />
                </button>
              )}
              
              <div className="h-48 flex items-center justify-center bg-gray-100 rounded mb-4">
                <img 
                  src={produto.imagem 
                    ? `http://localhost:3001/uploads/${produto.imagem}` 
                    : 'https://via.placeholder.com/150'}
                  alt={produto.nome}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3 className="font-bold text-lg truncate">{produto.nome}</h3>
              <p className="text-gray-600 text-sm">{produto.marca}</p>
              <p className="text-gray-500 text-xs mt-2 line-clamp-2">{produto.descricao}</p>
              <p className="font-bold text-blue-600 mt-2">
                {Number(produto.preco).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}