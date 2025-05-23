// No componente pai (App ou página)

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* seu conteúdo */}
      </main>
      <Footer />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-zinc-500 text-white h-10 flex justify-center items-center w-full">
      <p>&copy; 2025 Seu Site. Todos os direitos reservados.</p>
    </footer>
  )
}
