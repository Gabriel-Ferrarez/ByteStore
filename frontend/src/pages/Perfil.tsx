import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';


export function Perfil() {

    const navigate = useNavigate();

function handleLogout() {
  // Limpa os dados do localStorage (caso tenha login salvo)
  localStorage.removeItem('usuario');

  // Redireciona para a tela de login
  navigate('/login');
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
                        <h2 className="text-xl font-semibold mt-4">Guilherme Laurindo</h2>
                        <p className="text-gray-600 text-sm">guilherme@email.com</p>
                        <p className="text-gray-600 text-sm mt-1">CPF: ***.***.***-00</p>
                    </div>

                    <div className="flex-1 mt-6 md:mt-0 space-y-6">
                   
                        <section>
                            <h3 className="text-lg font-bold mb-2">Dados de contato</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                                <div>
                                    <p className="font-medium">Nome completo:</p>
                                    <p>Guilherme Laurindo de Souza Silva</p>
                                </div>
                                <div>
                                    <p className="font-medium">Email:</p>
                                    <p>guilherme@gmail.com</p>
                                </div>
                                <div>
                                    <p className="font-medium">Telefone:</p>
                                    <p>(11) 91234-5678</p>
                                </div>
                                <div>
                                    <p className="font-medium">Endereço:</p>
                                    <p>Rua Exemplo, 123 - São Paulo, SP</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold mb-2">Cartão cadastrado</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border text-sm">
                                <p><strong>Titular:</strong> Guilherme Laurindo</p>
                                <p><strong>Cartão:</strong> **** **** **** 1234</p>
                                <p><strong>Validade:</strong> 10/28</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold mb-2">Últimos pedidos</h3>
                            <div className="text-sm text-gray-700">
                                <p>Pedido #2342 - Placa de vídeo RTX 3060</p>
                                <p>Pedido #2319 - SSD NVMe 1TB</p>
                                <p className="text-blue-600 mt-1 cursor-pointer hover:underline">Ver todos os pedidos</p>
                            </div>
                        </section>

                        <div className="mt-4 flex gap-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
