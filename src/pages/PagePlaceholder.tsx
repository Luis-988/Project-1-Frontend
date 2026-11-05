import useDocumentTitle from '../hooks/useDocumentTitle'
import SystemWindow from '../components/SystemWindow'

type PagePlaceholderProps = {
  title: string
  description: string
}

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  useDocumentTitle(title)

  return (
    <SystemWindow title="STATUS">
      <p className="mb-3 font-rajdhani text-sm font-semibold uppercase tracking-widest text-accent-2">
        Página placeholder
      </p>
      <h1 className="font-orbitron text-3xl font-bold tracking-tight text-fg">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
    </SystemWindow>
  )
}

export default PagePlaceholder
