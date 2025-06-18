import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export function Comprovante() {
    return (
        <div className='flex flex-col items-center min-h-screen'>
            <Header />

            <div className="flex flex-col gap-8 p-8 w-full max-w-4xl flex-grow">
                <h1 className='text-4xl font-bold text-center'>BYTE STORE</h1>
                <h2 className='text-2xl text-gray-600 text-center'>Comprovante de Compra</h2>

                <div className="flex flex-col gap-8 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4">Itens do Pedido</h3>
                        <div className="flex justify-between items-center py-2">
                            <p className="text-gray-500">[Nome do produto] [Quantidade]x</p>
                            <p className="font-medium text-gray-500">R$ [0,00]</p>
                        </div>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4">Forma de Pagamento</h3>
                        <p className="text-gray-500">[Método de pagamento]</p>
                    </div>
                    <div className="border-b pb-6">
                        <h3 className="text-xl font-semibold mb-4">Endereço de Entrega</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p><span className="font-medium">Nome:</span> <span className="text-gray-500">[Nome do destinatário]</span></p>
                                <p><span className="font-medium">Endereço:</span> <span className="text-gray-500">[Rua, número]</span></p>
                            </div>
                            <div>
                                <p><span className="font-medium">Complemento:</span> <span className="text-gray-500">[Complemento]</span></p>
                                <p><span className="font-medium">Bairro:</span> <span className="text-gray-500">[Bairro]</span></p>
                                <p><span className="font-medium">CEP:</span> <span className="text-gray-500">[CEP]</span></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p>Subtotal:</p>
                                <p className="text-gray-500">R$ [0,00]</p>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <p>Desconto:</p>
                                <p>- R$ [0,00]</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Frete:</p>
                                <p>Grátis</p>
                            </div>
                            <div className="flex justify-between border-t pt-2 mt-2 text-lg font-bold">
                                <p>Total:</p>
                                <p>R$ [0,00]</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button 
                            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                        >
                            Voltar à Home
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}