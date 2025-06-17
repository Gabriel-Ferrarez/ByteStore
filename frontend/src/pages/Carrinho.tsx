import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export function Carrinho() {
    const cartItems: {
        nome: string;
        valor: number;
        descricao: string;
        quantidade: number;
    }[] = [];

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.valor * item.quantidade), 0);
    };

    return (
        <div className='flex flex-col items-center'>
            <Header />

            <div className="flex flex-col gap-8 p-8 w-[75%]">
                <h1 className='text-4xl font-bold'>Seu Carrinho</h1>
                
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-xl text-gray-500">Seu carrinho está vazio</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="border-b border-gray-200 pb-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-4">
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src="https://via.placeholder.com/80" 
                                            alt={item.nome} 
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.nome}</p>
                                            <p className="text-sm text-gray-500">{item.descricao}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <button className="px-2 py-1 border rounded">-</button>
                                            <span>{item.quantidade}</span>
                                            <button className="px-2 py-1 border rounded">+</button>
                                        </div>
                                        <p className="font-bold">R$ {(item.valor * item.quantidade).toFixed(2)}</p>
                                        <button className="text-red-500">Remover</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg w-80">
                                <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>R$ {calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>R$ {calculateTotal().toFixed(2)}</span>
                                </div>
                                <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                                    Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}