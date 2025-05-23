import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function Home() {
    const products = [
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4082",
            valor: 1002.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4083",
            valor: 1003.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4084",
            valor: 1004.00,
            descricao: "Descricao 4080"
        }
    ]
    return (
        <div className='flex flex-col items-center'>

            <Header />

            <div className="flex flex-col gap-8 p-8 w-[50%]">
                <h1 className='text-4xl font-bold'>Produtos em destaque</h1>
                <div className="grid grid-cols-4 gap-2">
                    {products.map((produto) => (
                        <div className="flex flex-col gap-2 p-4 px-6 border-1 border-zinc-300 bg-white rounded-lg w-fit items-center hover:bg-zinc-100 cursor-pointer">
                            <img src="https://rseat.pics/" alt="Produto 1" className='size-35' />
                            <p>{produto.nome}</p>
                            <p>R$ {produto.valor.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}