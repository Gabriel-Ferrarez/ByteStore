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

interface Pedido {
    id: number;
    data_pedido: string;
    status: string;
    valor_total: number;
    itens: {
        nome: string;
        quantidade: number;
        preco_unitario: number;
    }[];
}

export function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState({
        usuario: true,
        pedidos: true
    });

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
                setLoading(prev => ({ ...prev, usuario: false }));
            } catch (error) {
                console.error('Erro ao buscar detalhes do usuário:', error);
                setLoading(prev => ({ ...prev, usuario: false }));
            }
        }

        // Buscar pedidos do usuário
        async function fetchUserOrders() {
            try {
                const response = await axios.get(`http://localhost:3001/usuario/${user.id}/pedidos`);
                setPedidos(response.data);
                setLoading(prev => ({ ...prev, pedidos: false }));
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
                setLoading(prev => ({ ...prev, pedidos: false }));
            }
        }

        fetchUserDetails();
        fetchUserOrders();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        navigate('/login');
    }

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    }

    if (!usuario) {
        return null;
    }

    if (loading.usuario || loading.pedidos) {
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
                    {pedidos.length === 0 ? (
                            <div className="text-sm text-gray-700">
                            <p>Nenhum pedido encontrado. Faça seu primeiro pedido!</p>
                            <Link to="/" className="text-blue-600 hover:underline">
                                Ir para a loja
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pedidos.map((pedido) => (
                                <div key={pedido.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">Pedido #{pedido.id}</p>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(pedido.data_pedido)} - {pedido.status}
                                            </p>
                                        </div>
                                        <p className="font-bold">
                                            {pedido.valor_total.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-2 border-t pt-2">
                                        <h4 className="text-sm font-medium mb-1">Itens:</h4>
                                        <ul className="text-sm space-y-1">
                                            {pedido.itens.map((item, index) => (
                                                <li key={index}>
                                                    {item.quantidade}x {item.nome} - 
                                                    {(item.preco_unitario * item.quantidade).toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            <p className="text-blue-600 mt-1 cursor-pointer hover:underline">
                                Ver todos os pedidos
                            </p>
                        </div>
                    )}
                </section>


                        <div className="mt-4 flex gap-2">
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