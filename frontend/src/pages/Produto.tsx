import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { Footer } from '../components/Footer';

interface ProdutoDetalhes {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  especificacoes?: string;
  marca: string;
  modelo?: string;
}

interface ProdutoFrontend extends ProdutoDetalhes {
  valor: number;
  imagem_url: string;
}

export function Produto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<ProdutoFrontend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('ID do produto não fornecido');
        }

        const response = await axios.get(`http://localhost:3001/produtos/${id}`);
        console.log('Resposta da API:', response.data);
        
        if (!response.data) {
          throw new Error('Produto não encontrado');
        }

        const produtoFormatado: ProdutoFrontend = {
          ...response.data,
          valor: response.data.preco,
          imagem_url: response.data.imagem 
            ? `http://localhost:3001/uploads/${response.data.imagem}`
            : 'https://via.placeholder.com/400'
        };

        setProduto(produtoFormatado);
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
        setError(axios.isAxiosError(err) 
          ? err.response?.data?.error || 'Erro ao carregar produto'
          : 'Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const adicionarAoCarrinho = () => {
    if (!produto) return;

    try {
      const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
      
      const produtoExistenteIndex = carrinhoAtual.findIndex(
        (item: any) => item.id === produto.id
      );
      
      if (produtoExistenteIndex >= 0) {
        carrinhoAtual[produtoExistenteIndex].quantidade += quantidade;
      } else {
        carrinhoAtual.push({
          id: produto.id,
          nome: produto.nome,
          valor: produto.valor,
          descricao: produto.descricao,
          imagem_url: produto.imagem_url,
          marca: produto.marca,
          quantidade: quantidade
        });
      }
      
      localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      alert(`${quantidade} ${quantidade > 1 ? 'unidades' : 'unidade'} de ${produto.nome} adicionada(s) ao carrinho!`);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho');
    }
  };

  const comprarAgora = () => {
    adicionarAoCarrinho();
    navigate('/pagamento');
  };

  const aumentarQuantidade = () => {
    setQuantidade(prev => prev + 1);
  };

  const diminuirQuantidade = () => {
    setQuantidade(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar
            </button>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-center">
              <img
                src={produto.imagem_url}
                alt={produto.nome}
                className="max-h-96 w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                }}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{produto.nome}</h1>
                <p className="text-gray-500 mt-2">{produto.marca}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  {produto.valor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>

              <div className="border-t border-b border-gray-200 py-6">
                <h3 className="font-medium mb-3">Descrição do produto</h3>
                <p className="text-gray-600">
                  {produto.descricao || 'Este produto não possui descrição detalhada.'}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center border rounded">
                  <button 
                    onClick={diminuirQuantidade}
                    className="px-3 py-1 text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantidade}</span>
                  <button 
                    onClick={aumentarQuantidade}
                    className="px-3 py-1 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={comprarAgora}
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  COMPRAR AGORA
                </button>
                <button
                  onClick={adicionarAoCarrinho}
                  className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  <FaShoppingCart /> ADICIONAR AO CARRINHO
                </button>
              </div>

              <div className="pt-6">
                <h3 className="font-medium mb-3">Informações técnicas</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>Marca:</strong> {produto.marca || 'Não informada'}</li>
                  {produto.modelo && <li><strong>Modelo:</strong> {produto.modelo}</li>}
                  {produto.especificacoes && (
                    <li>
                      <strong>Especificações:</strong> 
                      <p className="mt-1">{produto.especificacoes}</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}