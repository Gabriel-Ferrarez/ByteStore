import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

interface ItemCarrinho {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  imagem_url: string;
  marca: string;
  quantidade: number;
}

export function Carrinho() {
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>([]);


  useEffect(() => {
    const carregarCarrinho = () => {
      try {
        const carrinhoSalvo = localStorage.getItem('carrinho');
        if (carrinhoSalvo) {
          setCartItems(JSON.parse(carrinhoSalvo));
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };
    
    carregarCarrinho();
  }, []);

  const atualizarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    
    const carrinhoAtualizado = cartItems.map(item => 
      item.id === id ? { ...item, quantidade: novaQuantidade } : item
    );
    
    setCartItems(carrinhoAtualizado);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  };

  const removerItem = (id: number) => {
    const carrinhoAtualizado = cartItems.filter(item => item.id !== id);
    setCartItems(carrinhoAtualizado);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  };

  const calcularTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.valor * item.quantidade), 
      0
    );
  };

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className="flex flex-col gap-8 p-8 w-full max-w-6xl">
        <h1 className='text-4xl font-bold'>Seu Carrinho</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-gray-500">Seu carrinho está vazio</p>
            <Link 
              to="/" 
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="border-b border-gray-200 pb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={item.imagem_url || "https://via.placeholder.com/80"} 
                      alt={item.nome} 
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-sm text-gray-500">{item.marca}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-normal">
                    <div className="flex items-center gap-2">
                      <button 
                        className="px-2 py-1 border rounded"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button 
                        className="px-2 py-1 border rounded"
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold">
                      {(item.valor * item.quantidade).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removerItem(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg w-full sm:w-80">
                <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {calcularTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {calcularTotal().toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <Link
                  to="/pagamento"
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}