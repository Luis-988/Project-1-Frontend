import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Página no encontrada')

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <Link className="mt-6 inline-block text-cyan-400 hover:underline" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
