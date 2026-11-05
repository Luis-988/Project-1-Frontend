import { Link, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link className="text-xl font-bold text-cyan-400" to="/">
            Anime App
          </Link>
          <div className="flex gap-4 text-sm text-slate-300">
            <Link className="hover:text-cyan-400" to="/explorar">Explorar</Link>
            <Link className="hover:text-cyan-400" to="/favoritos">Favoritos</Link>
            <Link className="hover:text-cyan-400" to="/contacto">Contacto</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/anime/:id" element={<Detail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster richColors />
    </div>
  )
}

export default App
