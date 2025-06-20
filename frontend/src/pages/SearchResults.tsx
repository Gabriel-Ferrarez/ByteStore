import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { Footer } from '../components/Footer';

interface Produto {
  id: number;
  nome: string;
  imagem: string | null;
  marca: string;
  descricao: string;
  preco: string;
}

export function SearchResults() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/produtos?q=${encodeURIComponent(query)}`);
        setProducts(response.data);
        setError(null);
      } catch (erro) {
        setError("Erro ao buscar produtos. Tente novamente mais tarde.");
        console.error("Erro ao buscar produtos:", erro);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

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
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho');
    }
  };

  const verProduto = (id: number) => {
    navigate(`/produto/${id}`);
  };

  const handleClearSearch = () => {
    navigate('/');
  };

  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Buscando produtos...</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center">
        <div className="text-red-500 text-center py-8">{error}</div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className='flex flex-col items-center'>
          <div className="flex flex-col gap-8 p-8 w-[75%]">
            <div className="flex items-center justify-between">
              <h1 className='text-2xl md:text-4xl font-bold flex items-center gap-2'>
                <FaSearch className="text-blue-500" />
                {query ? (
                  <>
                    Resultados para: <span className="text-blue-600">"{query}"</span>
                  </>
                ) : (
                  "Todos os produtos"
                )}
              </h1>
              
              {query && (
                <button 
                  onClick={handleClearSearch}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes /> Limpar busca
                </button>
              )}
            </div>

            <p className="text-gray-600">
              {products.length > 0 
                ? `${products.length} produto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`
                : 'Nenhum produto encontrado para sua pesquisa.'}
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((produto) => (
                  <div key={produto.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
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
            ) : (
              <div className="text-center py-12">
                <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">Nenhum resultado encontrado</h2>
                <p className="text-gray-500 mt-2">Tente usar termos diferentes ou mais genéricos</p>
                <button
                  onClick={handleClearSearch}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Ver todos os produtos
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}