import type { ReactNode } from 'react'

type SystemWindowProps = {
  title: string
  children: ReactNode
  className?: string
}

function SystemWindow({ title, children, className = '' }: SystemWindowProps) {
  return (
    <section
      className={`system-window relative border border-system-neon/70 bg-system-panel/90 p-6 shadow-neon ${className}`}
    >
      <div className="system-window__notch" aria-hidden="true" />
      <h2 className="mb-5 font-orbitron text-xs font-bold tracking-[0.3em] text-system-ice">
        // {title}
      </h2>
      {children}
    </section>
  )
}

export default SystemWindow
