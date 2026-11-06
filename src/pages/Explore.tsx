import { useEffect, useRef, useState } from 'react'
import ManhwaCard from '../components/ManhwaCard'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useManhwaList from '../hooks/useManhwaList'
import type { ManhwaSort, ManhwaStatus } from '../types/manhwa'
import { notifyError } from '../utils/toast'

const statusOptions: Array<{ value: ManhwaStatus | ''; label: string }> = [
  { value: '', label: 'Todos los estados' },
  { value: 'RELEASING', label: 'En emisión' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'HIATUS', label: 'En pausa' },
]

const sortOptions: Array<{ value: ManhwaSort; label: string }> = [
  { value: 'POPULARITY_DESC', label: 'Popularidad' },
  { value: 'SCORE_DESC', label: 'Puntuación' },
  { value: 'TITLE_ROMAJI', label: 'Título' },
]

function LoadingGrid() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3" aria-label="Cargando manhwas">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="flex animate-pulse gap-4 rounded-xl border border-line bg-surface p-3" key={index}>
          <div className="h-36 w-24 shrink-0 rounded-md bg-muted/20 sm:w-28" />
          <div className="flex flex-1 flex-col justify-center gap-3 pr-8">
            <div className="h-4 rounded bg-muted/20" />
            <div className="h-3 w-2/3 rounded bg-muted/20" />
            <div className="h-3 w-1/2 rounded bg-muted/20" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Explore() {
  useDocumentTitle('Explorar')
  const gridRef = useRef<HTMLDivElement>(null)
  const previousPage = useRef(1)
  const [search, setSearch] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [status, setStatus] = useState<ManhwaStatus | ''>('')
  const [sort, setSort] = useState<ManhwaSort>('POPULARITY_DESC')
  const [page, setPage] = useState(1)
  const [retryKey, setRetryKey] = useState(0)
  const { data, pageInfo, loading, error } = useManhwaList(
    { search: appliedSearch, page, status: status || undefined, sort },
    retryKey,
  )

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setAppliedSearch(search.trim())
      setPage(1)
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [search])

  useEffect(() => {
    if (error) notifyError('No se pudo cargar la información. Verifica tu conexión e intenta de nuevo.')
  }, [error])

  useEffect(() => {
    if (previousPage.current !== page) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      previousPage.current = page
    }
  }, [page])

  const applySearch = () => {
    setAppliedSearch(search.trim())
    setPage(1)
  }

  const updateStatus = (value: ManhwaStatus | '') => {
    setStatus(value)
    setPage(1)
  }

  const updateSort = (value: ManhwaSort) => {
    setSort(value)
    setPage(1)
  }

  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="font-orbitron text-3xl font-bold text-fg sm:text-5xl">
          Explorar <span className="text-accent-2">Manhwas</span>
        </h1>
        <p className="mt-4 text-lg text-muted">Datos obtenidos en tiempo real desde la API de AniList</p>
      </header>

      <SystemWindow title="BUSCAR">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end">
          <div>
            <label className="mb-2 block font-rajdhani text-sm font-semibold text-fg" htmlFor="manhwa-search">
              Buscar manhwa...
            </label>
            <input
              className="w-full border border-accent/40 bg-base px-4 py-3 text-fg transition placeholder:text-muted focus:border-accent-2 focus:shadow-neon"
              id="manhwa-search"
              placeholder="Buscar manhwa..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applySearch()
              }}
            />
          </div>
          <button className="border border-accent bg-accent/10 px-5 py-3 font-rajdhani font-bold text-accent-2 transition hover:bg-accent/20" type="button" onClick={applySearch}>
            Buscar
          </button>
          <div>
            <label className="mb-2 block font-rajdhani text-sm font-semibold text-fg" htmlFor="manhwa-status">Estado</label>
            <select className="w-full border border-accent/40 bg-base px-4 py-3 text-fg focus:border-accent-2" id="manhwa-status" value={status} onChange={(event) => updateStatus(event.target.value as ManhwaStatus | '')}>
              {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-rajdhani text-sm font-semibold text-fg" htmlFor="manhwa-sort">Orden</label>
            <select className="w-full border border-accent/40 bg-base px-4 py-3 text-fg focus:border-accent-2" id="manhwa-sort" value={sort} onChange={(event) => updateSort(event.target.value as ManhwaSort)}>
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
      </SystemWindow>

      <section ref={gridRef} aria-live="polite" aria-busy={loading}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-orbitron text-xl font-bold text-fg">Resultados</h2>
          <p className="font-rajdhani text-muted">Mostrando {data.length} de {pageInfo?.total ?? 0} resultados</p>
        </div>

        {loading ? <LoadingGrid /> : null}
        {!loading && error ? (
          <div className="flex flex-col items-center gap-4 border border-accent/50 bg-surface p-10 text-center">
            <span className="text-5xl" aria-hidden="true">⚠</span>
            <p className="text-lg text-fg">No se pudo cargar la información. Verifica tu conexión e intenta de nuevo.</p>
            <button className="border border-accent px-5 py-2 text-accent-2 hover:bg-accent/10" type="button" onClick={() => setRetryKey((current) => current + 1)}>Reintentar</button>
          </div>
        ) : null}
        {!loading && !error && data.length === 0 ? (
          <div className="flex flex-col items-center gap-3 border border-accent/20 bg-surface p-12 text-center">
            <span className="text-6xl text-accent" aria-hidden="true">◈</span>
            <h3 className="font-orbitron text-xl text-fg">Ningún resultado encontrado</h3>
            <p className="text-muted">Prueba a cambiar la búsqueda o los filtros.</p>
          </div>
        ) : null}
        {!loading && !error && data.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {data.map((manhwa) => <ManhwaCard key={manhwa.id} manhwa={manhwa} />)}
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-center gap-5">
          <button className="border border-accent/50 px-4 py-2 text-accent-2 disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={page === 1 || loading} onClick={() => setPage((current) => current - 1)}>Anterior</button>
          <span className="font-rajdhani text-fg">Página {page}</span>
          <button className="border border-accent/50 px-4 py-2 text-accent-2 disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={!pageInfo?.hasNextPage || loading} onClick={() => setPage((current) => current + 1)}>Siguiente</button>
        </div>
      </section>
    </div>
  )
}

export default Explore
