import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Página no encontrada')

  return (
    <section className="rounded-2xl border border-line bg-surface p-8">
      <h1 className="text-4xl font-bold text-fg">404 - Página no encontrada</h1>
      <Link className="mt-6 inline-block text-accent hover:underline" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
