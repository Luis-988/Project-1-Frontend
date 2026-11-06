import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchManhwa } from '../services/anilist'
import type { Manhwa } from '../types/manhwa'
import { formatScore, getCoverSources, getTitle } from '../utils/manhwa'
import SystemWindow from './SystemWindow'

function FavoritePick() {
  const [manhwa, setManhwa] = useState<Manhwa | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    searchManhwa({ search: 'The God of High School', perPage: 1 }, controller.signal)
      .then((response) => {
        setManhwa(response.media[0] ?? null)
      })
      .catch((caughtError) => {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') return
        console.error('No se pudo cargar el manhwa favorito:', caughtError)
      })

    return () => controller.abort()
  }, [])

  if (manhwa === null) return null

  const title = getTitle(manhwa.title)
  const cover = getCoverSources(manhwa.coverImage)

  return (
    <SystemWindow title="FAVORITO DEL CREADOR" className="h-full">
      <div className="flex flex-col gap-5">
        <img
          className="h-auto max-h-72 w-full rounded-md object-contain"
          src="/images/goh-art.jpg"
          width={736}
          height={491}
          loading="lazy"
          alt="Ilustración de los personajes de The God of High School"
          onError={(event) => {
            event.currentTarget.src = cover.src
            event.currentTarget.srcset = cover.srcSet ?? ''
          }}
        />
        <div>
          <p className="font-rajdhani text-sm font-bold tracking-[0.2em] text-accent-2">
            MI MANHWA FAVORITO
          </p>
          <h2 className="mt-2 font-orbitron text-xl font-bold text-fg">{title}</h2>
          <p className="mt-2 text-muted">Puntuación: {formatScore(manhwa.averageScore)}</p>
        </div>
        <Link
          className="inline-flex justify-center border border-btn bg-btn px-5 py-3 font-rajdhani font-bold text-on-btn shadow-glow transition hover:bg-accent"
          to={`/manhwa/${manhwa.id}`}
        >
          Ver en el sistema
        </Link>
        <p className="text-xs leading-relaxed text-muted">
          Imagen: The God of High School (Yongje Park / Naver Webtoon), usada con fines educativos.
        </p>
      </div>
    </SystemWindow>
  )
}

export default FavoritePick
