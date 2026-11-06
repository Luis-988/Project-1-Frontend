import { Link } from 'react-router-dom'

function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface px-6 py-16 text-center">
      <span className="text-7xl text-muted" aria-hidden="true">★</span>
      <h2 className="mt-5 font-orbitron text-xl font-bold text-fg">No tienes favoritos guardados</h2>
      <Link className="mt-4 font-rajdhani text-lg text-accent-2 hover:underline" to="/explorar">
        Explorar y agregar algunos
      </Link>
    </section>
  )
}

export default EmptyState
