import { Footer } from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Endereco() {
    const navigate = useNavigate();
    const [cep, setCep] = useState('');

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, '');

        const formattedValue = numericValue.slice(0, 8);
        setCep(formattedValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cep.length !== 8) {
            alert('CEP deve conter 8 dígitos');
            return;
        }
        navigate('/confirmacao');
    };

    return (
        <div className='flex flex-col items-center min-h-screen'>
            <div className="flex-grow w-full">
                <div className="flex flex-col gap-8 p-8 w-[75%] mx-auto">
                    <h1 className='text-4xl font-bold'>Informações de Entrega</h1>
                    <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">Dados do Destinatário</h2>
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nome" className="font-medium">Nome completo*</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    required
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite o nome de quem vai receber"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="cep" className="font-medium">CEP*</label>
                                <input
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    required
                                    value={cep}
                                    onChange={handleCepChange}
                                    maxLength={8}
                                    pattern="\d{8}"
                                    title="Digite exatamente 8 dígitos numéricos"
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite o CEP (apenas números)"
                                />
                                {cep.length > 0 && cep.length < 8 && (
                                    <p className="text-sm text-red-500">CEP deve conter 8 dígitos</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="rua" className="font-medium">Rua*</label>
                                <input
                                    type="text"
                                    id="rua"
                                    name="rua"
                                    required
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite o nome da rua"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="numero" className="font-medium">Número*</label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        required
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nº"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="bairro" className="font-medium">Bairro*</label>
                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        required
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Digite o bairro"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="complemento" className="font-medium">Complemento (opcional)</label>
                                <input
                                    type="text"
                                    id="complemento"
                                    name="complemento"
                                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Apartamento, bloco, referência, etc."
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button 
                                    type="submit"
                                    className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Continuar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}