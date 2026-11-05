import type { ReactNode } from 'react'

type SystemWindowProps = {
  title: string
  children: ReactNode
  className?: string
}

function SystemWindow({ title, children, className = '' }: SystemWindowProps) {
  return (
    <section
      className={`system-window relative border border-line bg-surface/90 p-6 shadow-glow ${className}`}
    >
      <div className="system-window__notch" aria-hidden="true" />
      <h2 className="mb-5 font-orbitron text-xs font-bold tracking-[0.3em] text-accent-2">
        // {title}
      </h2>
      {children}
    </section>
  )
}

export default SystemWindow
