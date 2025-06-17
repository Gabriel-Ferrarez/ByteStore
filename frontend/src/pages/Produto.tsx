export function Produto() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 items-center">
          <img
            src="#"
            alt="Produto"
            className="w-80 object-cover"
          />
          <div className="flex gap-2">
            {[1, 2, 3].map((_, i) => (
              <img
                key={i}
                src="#"
                alt="Thumb"
                className="w-16 border rounded hover:ring-2 hover:ring-blue-700"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Placa de vídeo RTX 4080 - GIGABYTE - GDDR6 - 12GB
            </h2>
            <p className="text-blue-700 text-3xl font-bold mt-4">R$2.985,00</p>
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
        <p className="text-sm text-zinc-700 mb-4">
          NOME DO PRODUTO 
        </p>
        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
          SOBRE O PRODUTO
        </p>
      </section>
      <section className="px-10 max-w-6xl mx-auto mt-6 mb-10">
        <h3 className="text-lg font-bold mb-2">Informação Técnica</h3>
        <p className="text-sm"><strong>Marca:</strong> GALAX</p>
        <p className="text-sm"><strong>Modelo:</strong> 46NSL8MD9NQX</p>
        <p className="text-sm"><strong>Especificações:</strong> ...</p>
      </section>
    </div>
  );
}
