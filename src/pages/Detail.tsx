import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'
import useManhwaDetail from '../hooks/useManhwaDetail'
import type { FuzzyDate } from '../types/manhwa'
import {
  cleanDescription,
  formatChapters,
  formatScore,
  getCoverSourcesXL,
  getTitle,
  statusLabel,
} from '../utils/manhwa'
import { notifyError } from '../utils/toast'

function formatDate(date: FuzzyDate | null): string {
  if (date === null || (date.year === null && date.month === null && date.day === null)) {
    return 'Desconocido'
  }

  return [date.year, date.month, date.day].filter((part) => part !== null).join('-')
}

function DetailSkeleton() {
  return (
    <SystemWindow title="STATUS">
      <div className="flex animate-pulse flex-col gap-8 md:flex-row">
        <div className="mx-auto aspect-[2/3] w-56 rounded-md bg-muted/20 md:mx-0" />
        <div className="flex flex-1 flex-col gap-5">
          <div className="h-10 w-3/4 rounded bg-muted/20" />
          <div className="h-5 w-1/2 rounded bg-muted/20" />
          <div className="h-24 rounded bg-muted/20" />
          <p className="font-rajdhani text-lg text-muted">Cargando datos...</p>
        </div>
      </div>
    </SystemWindow>
  )
}

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const parsedId = Number(id)
  const validId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null
  const [retryKey, setRetryKey] = useState(0)
  const { data, loading, error } = useManhwaDetail(validId, retryKey)
  const title = data ? getTitle(data.title) : loading ? 'Cargando...' : 'Manhwa no encontrado'
  const cover = data ? getCoverSourcesXL(data.coverImage) : null

  useDocumentTitle(title)

  useEffect(() => {
    if (error) notifyError('No se pudo cargar la información. Verifica tu conexión e intenta de nuevo.')
  }, [error])

  const hasHistory = useMemo(() => window.history.length > 1, [])

  if (validId === null) {
    return (
      <section className="space-y-6">
        <Link className="font-rajdhani text-accent-2 hover:underline" to="/explorar">← Volver a explorar</Link>
        <SystemWindow title="STATUS">
          <h1 className="font-orbitron text-3xl font-bold text-fg">Este manhwa no existe</h1>
          <Link className="mt-5 inline-block text-accent-2 hover:underline" to="/explorar">Explorar manhwas</Link>
        </SystemWindow>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <Link className="font-rajdhani text-accent-2 hover:underline" to="/explorar">← Volver a explorar</Link>
        <DetailSkeleton />
      </section>
    )
  }

  if (error === 'No encontrado' || (!loading && !data && !error)) {
    return (
      <section className="space-y-6">
        <Link className="font-rajdhani text-accent-2 hover:underline" to="/explorar">← Volver a explorar</Link>
        <SystemWindow title="STATUS">
          <h1 className="font-orbitron text-3xl font-bold text-fg">Este manhwa no existe</h1>
          <Link className="mt-5 inline-block text-accent-2 hover:underline" to="/explorar">Explorar manhwas</Link>
        </SystemWindow>
      </section>
    )
  }

  if (error || data === null || cover === null) {
    return (
      <section className="space-y-6">
        <Link className="font-rajdhani text-accent-2 hover:underline" to="/explorar">← Volver a explorar</Link>
        <SystemWindow title="STATUS">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-5xl" aria-hidden="true">⚠</span>
            <h1 className="font-orbitron text-2xl font-bold text-fg">No se pudo cargar la información. Verifica tu conexión e intenta de nuevo.</h1>
            <button className="border border-accent px-5 py-2 text-accent-2 hover:bg-accent/10" type="button" onClick={() => setRetryKey((current) => current + 1)}>Reintentar</button>
          </div>
        </SystemWindow>
      </section>
    )
  }

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center gap-5">
        <Link className="font-rajdhani text-accent-2 hover:underline" to="/explorar">← Volver a explorar</Link>
        {hasHistory ? (
          <button className="font-rajdhani text-accent-2 hover:underline" type="button" onClick={() => navigate(-1)}>Volver</button>
        ) : null}
      </div>

      <SystemWindow title="STATUS" className="overflow-hidden">
        {data.bannerImage ? (
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `linear-gradient(to bottom, var(--bg-surface), transparent), url("${data.bannerImage}")` }}
            aria-hidden="true"
          />
        ) : null}
        <div className="relative flex flex-col gap-8 md:flex-row">
          <div className="mx-auto w-full max-w-[260px] shrink-0 md:mx-0 md:w-[240px]">
            <img
              className="aspect-[2/3] w-full rounded-md object-cover"
              src={cover.src}
              srcSet={cover.srcSet}
              width={240}
              height={360}
              alt={`Portada de ${title}`}
              onError={(event) => {
                event.currentTarget.src = '/placeholder.svg'
                event.currentTarget.srcset = ''
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-orbitron text-3xl font-bold text-fg sm:text-4xl">{title}</h1>
            {data.title.native ? <p className="mt-2 text-lg text-muted">{data.title.native}</p> : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <dl className="space-y-2 text-lg">
                <div><dt className="inline text-muted">Estado: </dt><dd className="inline text-fg">{statusLabel(data.status)}</dd></div>
                <div><dt className="inline text-muted">Formato: </dt><dd className="inline text-fg">{data.format ?? 'N/A'}</dd></div>
                <div><dt className="inline text-muted">Capítulos: </dt><dd className="inline text-fg">{formatChapters(data.chapters)}</dd></div>
                <div><dt className="inline text-muted">Volúmenes: </dt><dd className="inline text-fg">{data.volumes ?? 'N/A'}</dd></div>
                <div><dt className="inline text-muted">Inicio: </dt><dd className="inline text-fg">{formatDate(data.startDate)}</dd></div>
                <div><dt className="inline text-muted">Fin: </dt><dd className="inline text-fg">{formatDate(data.endDate)}</dd></div>
              </dl>
              <dl className="space-y-2 text-lg">
                <div><dt className="inline text-muted">Popularidad: </dt><dd className="inline text-fg">{data.popularity?.toLocaleString() ?? 'N/A'}</dd></div>
                <div><dt className="inline text-muted">Favoritos: </dt><dd className="inline text-fg">{data.favourites?.toLocaleString() ?? 'N/A'}</dd></div>
              </dl>
            </div>

            <div className="mt-6 inline-flex flex-col border border-accent/40 bg-accent/10 px-5 py-3">
              <span className="font-rajdhani text-sm uppercase tracking-widest text-muted">STR / AGI</span>
              <strong className="font-orbitron text-3xl text-accent-2">{formatScore(data.averageScore)}</strong>
            </div>

            {data.genres && data.genres.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {data.genres.map((genre) => <span className="rounded-full border border-accent/50 px-3 py-1 text-sm text-accent" key={genre}>{genre}</span>)}
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <FavoriteButton manhwa={data} showLabel />
              {data.siteUrl ? <a className="text-accent-2 hover:underline" href={data.siteUrl} target="_blank" rel="noopener noreferrer">Ver en AniList</a> : null}
            </div>
          </div>
        </div>
      </SystemWindow>

      <section aria-labelledby="synopsis-title">
        <h2 className="mb-3 font-orbitron text-2xl font-bold text-fg" id="synopsis-title">Sinopsis</h2>
        <p className="whitespace-pre-line text-lg leading-relaxed text-muted">{cleanDescription(data.description)}</p>
      </section>
    </article>
  )
}

export default Detail
