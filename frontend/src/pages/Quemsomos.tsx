import { Footer } from '../components/Footer'


export function Quemsomos() {
    
    return (
        <div className='flex flex-col items-center'>

    

            <div className="flex flex-col gap-8 p-8 w-[75%] mb-02">
                
                <h1 className="text-blue-500 text-8xl text-center font-bold mb-10">BYTE STORE</h1>
                <h1 className='text-3xl font-bold '>Quem somos nós?</h1>
                <p className="text-justify text-base text-gray-800 mt-0">A Byte Store é um projeto inovador de loja virtual especializado na venda de hardware e equipamentos de informática, criado para atender às necessidades reais dos consumidores que buscam qualidade, diversidade e segurança na hora de montar ou aprimorar seus setups tecnológicos. Nossa missão é ser uma plataforma confiável, acessível e completa, que ofereça uma ampla variedade de peças e componentes, desde os mais básicos até os mais avançados, contemplando tanto usuários iniciantes quanto entusiastas e profissionais da área de tecnologia.</p>
                    <p className="text-justify text-base text-gray-800 mt-0">O projeto da Byte Store nasceu a partir de uma análise detalhada do mercado de comércio eletrônico de hardware, identificando as principais lacunas e dificuldades enfrentadas pelos consumidores, como falta de transparência nos preços, pouca diversidade de produtos, dificuldade em obter informações técnicas confiáveis e um atendimento que muitas vezes não atende às expectativas do cliente. Buscamos, portanto, transformar essa realidade, aplicando estratégias modernas de marketing digital, logística eficiente e um atendimento personalizado que realmente ajude o cliente a escolher o produto ideal para suas necessidades, orçamento e expectativas.</p>
                    <p className="text-justify text-base text-gray-800 mt-0">Nosso compromisso vai além da venda: queremos construir um relacionamento de confiança e transparência com nossos clientes, proporcionando não apenas a aquisição de peças de informática, mas também um suporte contínuo, com dicas, conteúdos educativos e orientações para que cada compra seja realmente um investimento certeiro.</p> 
                    <p className="text-justify text-base text-gray-800 mt-0">A Byte Store visa consolidar-se como referência no comércio online de hardware, adaptando-se constantemente às tendências tecnológicas e às necessidades do consumidor moderno, sempre com foco na inovação, excelência e satisfação do cliente.</p>
                </div>
       
            <Footer />
        </div>
    )
}