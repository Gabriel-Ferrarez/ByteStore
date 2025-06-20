import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

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
  const navigate = useNavigate();

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

  const adicionarAoCarrinho = (produto: Produto) => {
    try {
      const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
      
      const produtoCarrinho = {
        id: produto.id,
        nome: produto.nome,
        valor: Number(produto.preco),
        imagem_url: produto.imagem ? `http://localhost:3001/uploads/${produto.imagem}` : null,
        quantidade: 1,
        marca: produto.marca
      };

      const itemExistenteIndex = carrinhoAtual.findIndex((item: any) => item.id === produto.id);

      if (itemExistenteIndex >= 0) {
        carrinhoAtual[itemExistenteIndex].quantidade += 1;
      } else {
        carrinhoAtual.push(produtoCarrinho);
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      alert(`${produto.nome} foi adicionado ao carrinho!`);
      console.log('Carrinho atualizado:', carrinhoAtual);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho');
    }
  };

  const verProduto = (id: number) => {
    navigate(`/produto/${id}`);
  };

  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center py-8">Carregando...</div>
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
      <Footer />
    </div>
  );

  if (products.length === 0) return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center py-8">Nenhum produto encontrado</div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className='flex flex-col items-center'>
          <div className="flex flex-col gap-8 p-8 w-[75%]">
            <h1 className='text-4xl font-bold'>Produtos em destaque</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((produto) => (
                <div key={produto.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative group flex flex-col">
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
                  
                  <div className="flex-grow">
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
                  
                  <div className="flex justify-between mt-4 gap-2">
                    <button 
                      onClick={() => adicionarAoCarrinho(produto)}
                      className="flex items-center justify-center gap-1 bg-blue-500 text-white px-2 py-1.5 rounded hover:bg-blue-600 transition text-sm w-full"
                    >
                      <FaShoppingCart className="text-sm" /> Carrinho
                    </button>
                    <button 
                      onClick={() => verProduto(produto.id)}
                      className="flex items-center justify-center gap-1 bg-gray-500 text-white px-2 py-1.5 rounded hover:bg-gray-600 transition text-sm w-full"
                    >
                      <FaEye className="text-sm" /> Ver mais
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}