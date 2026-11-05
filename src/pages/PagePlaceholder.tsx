type PagePlaceholderProps = {
  title: string
  description: string
}

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <SystemWindow title="STATUS">
      <p className="mb-3 font-rajdhani text-sm font-semibold uppercase tracking-widest text-system-shadow">
        Página placeholder
      </p>
      <h1 className="font-orbitron text-3xl font-bold tracking-tight text-system-text">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-system-muted">{description}</p>
    </SystemWindow>
  )
}

export default PagePlaceholder
import SystemWindow from '../components/SystemWindow'
