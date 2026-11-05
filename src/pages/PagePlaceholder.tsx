type PagePlaceholderProps = {
  title: string
  description: string
}

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
        Página placeholder
      </p>
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-slate-400">{description}</p>
    </section>
  )
}

export default PagePlaceholder
