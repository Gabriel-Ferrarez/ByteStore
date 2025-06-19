import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProdutoDetalhes {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  imagem_url: string;
  especificacoes: string;
  marca: string;
  modelo: string;
}

export function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState<ProdutoDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await axios.get(`http://localhost:3001/produtos/${id}`);
        setProduto(response.data);
      } catch (err) {
        setError('Produto não encontrado');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!produto) return <div>Produto não encontrado</div>;

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 items-center">
          <img
            src={produto.imagem_url || 'https://via.placeholder.com/400'}
            alt={produto.nome}
            className="w-80 object-cover"
          />
          <div className="flex gap-2">
            {/* Miniaturas - você pode implementar se tiver várias imagens */}
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                src={produto.imagem_url || 'https://via.placeholder.com/80'}
                alt="Thumb"
                className="w-16 border rounded hover:ring-2 hover:ring-blue-700"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">{produto.nome}</h2>
            <p className="text-blue-700 text-3xl font-bold mt-4">
              R$ {produto.valor.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200">
              ADICIONAR AO CARRINHO
            </button>
            <button className="flex-1 bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800">
              COMPRAR
            </button>
          </div>
        </div>
      </div>
      <section className="px-10 max-w-6xl mx-auto">
        <h3 className="text-lg font-bold mb-2">Descrição</h3>
        <p className="text-sm text-zinc-700 mb-4">{produto.nome}</p>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
          {produto.descricao || 'SOBRE O PRODUTO'}
        </p>
      </section>
      <section className="px-10 max-w-6xl mx-auto mt-6 mb-10">
        <h3 className="text-lg font-bold mb-2">Informação Técnica</h3>
        <p className="text-sm"><strong>Marca:</strong> {produto.marca || 'GALAX'}</p>
        <p className="text-sm"><strong>Modelo:</strong> {produto.modelo || '46NSL8MD9NQX'}</p>
        <p className="text-sm"><strong>Especificações:</strong> {produto.especificacoes || '...'}</p>
      </section>
    </div>
  );
}