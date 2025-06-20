import { Footer } from '../components/Footer';
import { useLocation, Link } from 'react-router-dom';

export function Comprovante() {
    const location = useLocation();
    const { cliente, endereco, cartItems = [], total = 0 } = location.state || {};

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className="flex-grow w-full">
                <div className="flex flex-col gap-8 p-8 w-[75%] mx-auto">
                    <h1 className='text-4xl font-bold'>Comprovante de Pedido</h1>
                    
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Informações do Cliente:</h3>
                            <p><strong>Nome:</strong> {cliente?.nome || 'Não informado'}</p>
                            <p><strong>Endereço:</strong> {endereco?.rua || 'Não informado'}, {endereco?.numero || ''}</p>
                            {endereco?.complemento && <p><strong>Complemento:</strong> {endereco.complemento}</p>}
                            <p><strong>Bairro:</strong> {endereco?.bairro || 'Não informado'}</p>
                            <p><strong>CEP:</strong> {endereco?.cep || 'Não informado'}</p>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Itens do Pedido:</h3>
                            {cartItems.length > 0 ? (
                                <div className="border-t border-b border-gray-200 py-2">
                                    {cartItems.map((item: any, index: number) => (
                                        <div key={index} className="flex justify-between py-2">
                                            <div>
                                                <p className="font-medium">{item.nome}</p>
                                                <p className="text-sm text-gray-600">
                                                    Qtd: {item.quantidade} × 
                                                    {item.valor.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </p>
                                            </div>
                                            <p className="font-medium">
                                                {(item.valor * item.quantidade).toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Nenhum item no pedido</p>
                            )}
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-semibold">Total:</h3>
                            <p className="text-xl font-bold">
                                {total.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </p>
                        </div>
                        
                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>Obrigado por sua compra!</p>
                            <p>Seu pedido será enviado em breve.</p>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                            <Link 
                                to="/"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Voltar à Loja
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}