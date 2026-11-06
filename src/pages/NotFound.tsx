import { Link } from 'react-router-dom'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Página no encontrada')

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-8">
      <SystemWindow title="ERROR" className="w-full max-w-2xl text-center">
        <p className="mb-6 font-rajdhani text-sm uppercase tracking-[0.3em] text-accent-2">
          [La puerta ha desaparecido]
        </p>
        <p
          className="not-found-code font-orbitron text-8xl font-bold leading-none text-accent sm:text-[10rem]"
          aria-label="Error 404"
        >
          404
        </p>
        <h1 className="mt-6 font-orbitron text-2xl font-bold text-fg sm:text-3xl">
          Página no encontrada
        </h1>
        <p className="mt-4 text-lg text-muted">
          La ruta que buscas no existe en esta aplicación.
        </p>
        <p className="mt-3 text-lg text-muted">¿Te perdiste? Volvamos al camino.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="border border-btn bg-btn px-5 py-3 font-rajdhani font-semibold text-on-btn shadow-glow transition hover:bg-accent"
            to="/"
          >
            Volver al inicio
          </Link>
          <Link
            className="border border-line px-5 py-3 font-rajdhani font-semibold text-accent-2 transition hover:border-accent hover:bg-surface"
            to="/explorar"
          >
            Explorar manhwas
          </Link>
        </div>
      </SystemWindow>
    </section>
  )
}

export default NotFound
