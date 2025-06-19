import { Footer } from '../components/Footer'


export function Teclado() {
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
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        {
            nome: "RTX 4080",
            valor: 1001.00,
            descricao: "Descricao 4080"
        },
        
    ]
    return (
        <div className='flex flex-col items-center'>

    

            <div className="flex flex-col gap-8 p-8 w-[75%]">
                <h1 className='text-4xl font-bold'>Teclado</h1>
                <div className="grid grid-cols-5 gap-6">
                    {products.map((produto) => (
                        <div className="flex flex-col gap-2 p-7 px-6 border-1 border-zinc-300 bg-white rounded-lg w-fit items-center hover:bg-zinc-100 cursor-pointer">
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