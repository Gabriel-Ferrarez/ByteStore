import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function Pagamento() {
    const navigate = useNavigate();

    const handleContinuar = () => {
        navigate('/endereco');
    };

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className="flex-grow w-full">
                <div className="flex flex-col gap-8 p-8 w-[75%] mx-auto">
                    <h1 className='text-4xl font-bold'>Forma de Pagamento</h1>
                    
                    <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Selecione o método de pagamento</h2>
                        
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="boleto" 
                                    className="h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">Boleto Bancário</p>
                                    <p className="text-sm text-gray-500">Pague em qualquer agência bancária ou internet banking</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="pix" 
                                    className="h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">PIX</p>
                                    <p className="text-sm text-gray-500">Pagamento instantâneo - chave PIX ou QR Code</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="creditCard" 
                                    className="h-5 w-5 text-blue-600"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">Cartão de Crédito</p>
                                    <p className="text-sm text-gray-500">Parcele em até 12x sem juros</p>
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={handleContinuar}
                                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}