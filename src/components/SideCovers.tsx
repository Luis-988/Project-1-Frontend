import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Manhwa } from '../types/manhwa'
import { formatScoreShort, getCover, getTitle } from '../utils/manhwa'

type SideCoversProps = {
  items: Manhwa[]
  loading: boolean
  side: 'left' | 'right'
}

function CoverCard({ manhwa, index, hideOnDesktop }: {
  manhwa: Manhwa
  index: number
  hideOnDesktop: boolean
}) {
  const title = getTitle(manhwa.title)
  const rotationClass = ['-rotate-2', 'rotate-2', '-rotate-3'][index % 3]

  return (
    <li className={`relative min-w-0 ${hideOnDesktop ? 'xl:hidden' : ''}`}>
      <Link
        className={`group relative mx-auto block aspect-[2/3] w-[100px] transition duration-300 hover:z-20 hover:scale-[1.08] hover:rotate-0 focus-visible:z-20 focus-visible:scale-[1.08] focus-visible:rotate-0 ${rotationClass}`}
        to={`/manhwa/${manhwa.id}`}
        aria-label={`Ver ${title}`}
      >
        <span
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden w-max max-w-[200px] -translate-x-1/2 rounded border border-accent bg-base/95 px-2 py-1 text-center font-rajdhani text-xs leading-tight text-fg opacity-0 shadow-glow transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 xl:block"
          aria-hidden="true"
        >
          <span className="block">{title}</span>
          <span className="block text-accent">★ {formatScoreShort(manhwa.averageScore)}</span>
        </span>
        <span className="cover-card relative block h-full rounded border border-line bg-surface/70 shadow-glow transition duration-300 group-hover:opacity-100 group-hover:shadow-glow group-focus-visible:opacity-100 group-focus-visible:shadow-glow">
          <span className="absolute left-1 top-1 z-10 rounded bg-base/85 px-1.5 py-0.5 font-rajdhani text-xs text-fg">
            ★ {formatScoreShort(manhwa.averageScore)}
          </span>
          <img
            className="h-full w-full rounded object-cover brightness-75 transition duration-300 group-hover:brightness-100 group-focus-visible:brightness-100"
            src={getCover(manhwa.coverImage)}
            alt={`Portada de ${title}`}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = '/placeholder.svg'
            }}
          />
        </span>
      </Link>
    </li>
  )
}

function CoverSkeleton({ hideOnDesktop }: { hideOnDesktop: boolean }) {
  return (
    <li className={`relative h-[150px] w-[100px] ${hideOnDesktop ? 'xl:hidden' : ''}`}>
      <div className="h-full w-full animate-pulse rounded border border-line/20 bg-muted/10" />
    </li>
  )
}

function SideCovers({ items, loading, side }: SideCoversProps) {
  const [batch, setBatch] = useState(0)
  const [fading, setFading] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused || items.length <= 12) return
    let timeoutId: number | undefined
    const intervalId = window.setInterval(() => {
      setFading(true)
      timeoutId = window.setTimeout(() => {
        setBatch((current) => (current + 1) % 2)
        setFading(false)
      }, 300)
    }, 8000)
    return () => {
      window.clearInterval(intervalId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [items.length, paused, reducedMotion])

  const visibleItems = useMemo(() => {
    const start = batch * 12 + (side === 'right' ? 6 : 0)
    return items.slice(start, start + (side === 'right' ? 6 : 12))
  }, [batch, items, side])

  const content = loading
    ? Array.from({ length: side === 'right' ? 6 : 12 }, (_, index) => (
      <CoverSkeleton key={index} hideOnDesktop={side === 'left' && index >= 6} />
    ))
    : visibleItems.map((manhwa, index) => (
      <CoverCard key={manhwa.id} manhwa={manhwa} index={index} hideOnDesktop={side === 'left' && index >= 6} />
    ))

  if (!loading && items.length === 0) return null

  return (
    <section
      className={`min-w-0 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'} ${side === 'right' ? 'hidden xl:block' : ''}`}
      aria-label="Manhwas populares"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <ul className={`gap-4 ${side === 'right' ? 'hidden grid-cols-2 justify-items-start xl:grid' : 'flex snap-x snap-mandatory overflow-x-auto pb-2 xl:grid xl:grid-cols-2 xl:justify-items-end xl:overflow-visible'}`}>
        {content}
      </ul>
    </section>
  )
}

export default SideCovers
