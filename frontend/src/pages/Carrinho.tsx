import { useState } from 'react';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

export function Carrinho() {
    const [cartItems, setCartItems] = useState<any[]>(() => {
        const savedCart = localStorage.getItem('carrinho');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.valor * item.quantidade), 0);
    };

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        const updatedItems = [...cartItems];
        updatedItems[index].quantidade = newQuantity;
        setCartItems(updatedItems);
        localStorage.setItem('carrinho', JSON.stringify(updatedItems));
    };

    const removeItem = (index: number) => {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
        localStorage.setItem('carrinho', JSON.stringify(updatedItems));
    };

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className="flex-grow w-full">
                <div className="flex flex-col gap-8 p-8 w-[75%] mx-auto">
                    <h1 className='text-4xl font-bold'>Seu Carrinho</h1>
                    
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <p className="text-xl text-gray-500">Seu carrinho está vazio</p>
                            <Link to="/" className="mt-4 text-blue-500 hover:text-blue-700">
                                Voltar para a loja
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="border-b border-gray-200 pb-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={item.imagem_url || "https://via.placeholder.com/80"} 
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
                                                <button 
                                                    className="px-2 py-1 border rounded"
                                                    onClick={() => updateQuantity(index, item.quantidade - 1)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantidade}</span>
                                                <button 
                                                    className="px-2 py-1 border rounded"
                                                    onClick={() => updateQuantity(index, item.quantidade + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="font-bold">
                                                {item.valor.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}
                                            </p>
                                            <button 
                                                className="text-red-500"
                                                onClick={() => removeItem(index)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end">
                                <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg w-80">
                                    <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>
                                            {calculateTotal().toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>
                                            {calculateTotal().toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                        </span>
                                    </div>
                                    <button 
                                        className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                                        onClick={() => navigate('/endereco', { state: { cartItems } })}
                                    >
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}