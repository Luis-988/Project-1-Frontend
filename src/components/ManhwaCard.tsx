import { Link } from 'react-router-dom'
import type { Manhwa, ManhwaSummary } from '../types/manhwa'
import { formatChapters, formatScoreShort, getCoverSources, getTitle, statusLabel } from '../utils/manhwa'
import FavoriteButton from './FavoriteButton'

type ManhwaCardProps = {
  manhwa: Manhwa | ManhwaSummary
  onRemove?: () => void
}

function ManhwaCard({ manhwa, onRemove }: ManhwaCardProps) {
  const title = getTitle(manhwa.title)
  const cover = getCoverSources(manhwa.coverImage)

  return (
    <article className="group relative rounded-xl border border-line bg-surface shadow-glow transition hover:border-accent hover:shadow-glow has-[:focus-visible]:border-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:shadow-glow">
      <Link className="relative z-0 flex h-full gap-4 p-3 after:absolute after:inset-0" to={`/manhwa/${manhwa.id}`}>
        <div className="w-24 shrink-0 overflow-hidden rounded-md bg-base sm:w-28">
          <img
            className="aspect-[2/3] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.04]"
            src={cover.src}
            srcSet={cover.srcSet}
            width={112}
            height={168}
            loading="lazy"
            decoding="async"
            alt={`Portada de ${title}`}
            onError={(event) => {
              event.currentTarget.src = '/placeholder.svg'
              event.currentTarget.srcset = ''
            }}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-2 pr-10">
          <h3 className="line-clamp-2 font-orbitron text-sm font-bold text-fg">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="rounded-full border border-accent/50 bg-accent/10 px-2 py-1 text-accent">
              ★ {formatScoreShort(manhwa.averageScore)}
            </span>
            <span>Capítulos: {formatChapters(manhwa.chapters)}</span>
          </div>
            {'status' in manhwa ? (
              <span className="inline-block rounded-full border border-accent/60 bg-accent/10 px-2 py-1 text-xs text-accent">
                {statusLabel(manhwa.status)}
              </span>
            ) : null}
          </div>
      </Link>
      {onRemove ? (
          <button
            className="absolute bottom-3 right-3 z-10 border border-line px-3 py-1 font-rajdhani text-sm text-muted transition hover:border-accent hover:text-accent"
            type="button"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onRemove()
            }}
          >
            Quitar
          </button>
      ) : (
          <FavoriteButton
            className="absolute right-3 top-3 z-10 border-accent-2/70 bg-base/80 text-accent-2 shadow-glow"
            manhwa={manhwa}
          />
      )}
    </article>
  )
}

export default ManhwaCard
