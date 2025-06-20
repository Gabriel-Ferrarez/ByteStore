import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    tipo: string;
    // Adicione outros campos conforme necessário
}

interface Cliente {
    cpf?: string;
    data_nascimento?: string;
    cep?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
}

export function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('usuario') || 'null');
        if (!user) {
            navigate('/login');
            return;
        }

        setUsuario(user);
        
        // Buscar dados adicionais do usuário
        async function fetchUserDetails() {
            try {
                const response = await axios.get(`http://localhost:3001/usuario/${user.id}`);
                setCliente(response.data.cliente);
            } catch (error) {
                console.error('Erro ao buscar detalhes do usuário:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (!usuario) {
        return null;
    }

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="text-center py-8">Carregando...</div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:space-x-8">
                    <div className="flex-shrink-0 text-center md:text-left">
                        <img
                            src="/perfil1.png"
                            alt="Foto de perfil"
                            className="w-32 h-32 rounded-full mx-auto md:mx-0 border-4 border-blue-500"
                        />
                        <h2 className="text-xl font-semibold mt-4">{usuario.nome}</h2>
                        <p className="text-gray-600 text-sm">{usuario.email}</p>
                        {cliente?.cpf && (
                            <p className="text-gray-600 text-sm mt-1">CPF: {cliente.cpf}</p>
                        )}
                    </div>

                    <div className="flex-1 mt-6 md:mt-0 space-y-6">
                        <section>
                            <h3 className="text-lg font-bold mb-2">Dados de contato</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                                <div>
                                    <p className="font-medium">Nome completo:</p>
                                    <p>{usuario.nome}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Email:</p>
                                    <p>{usuario.email}</p>
                                </div>
                                
                                {cliente && (
                                    <>
                                        {cliente.cep && (
                                            <div>
                                                <p className="font-medium">Endereço:</p>
                                                <p>
                                                    {cliente.rua && `${cliente.rua}, `}
                                                    {cliente.numero && `${cliente.numero}`}
                                                    {cliente.complemento && ` - ${cliente.complemento}`}
                                                    {cliente.bairro && `, ${cliente.bairro}`}
                                                    {cliente.cidade && `, ${cliente.cidade}`}
                                                    {cliente.estado && ` - ${cliente.estado}`}
                                                    {cliente.cep && `, CEP: ${cliente.cep}`}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Seção opcional - pode comentar ou remover se não tiver os dados */}
                        {/*
                        <section>
                            <h3 className="text-lg font-bold mb-2">Cartão cadastrado</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border text-sm">
                                <p>Nenhum cartão cadastrado</p>
                            </div>
                        </section>
                        */}

                        <section>
                            <h3 className="text-lg font-bold mb-2">Últimos pedidos</h3>
                            <div className="text-sm text-gray-700">
                                <p>Nenhum pedido realizado</p>
                                {/* <p className="text-blue-600 mt-1 cursor-pointer hover:underline">Ver todos os pedidos</p> */}
                            </div>
                        </section>

                        <div className="mt-4 flex gap-2">
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => alert('Funcionalidade de edição em desenvolvimento')}
                            >
                                Editar perfil
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}