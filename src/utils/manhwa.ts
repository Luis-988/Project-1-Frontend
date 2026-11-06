import type {
  Manhwa,
  ManhwaCover,
  ManhwaDetail,
  ManhwaStatus,
  ManhwaSummary,
  ManhwaTitle,
} from '../types/manhwa'

export function getTitle(title: ManhwaTitle): string {
  return title.english ?? title.romaji ?? title.native ?? 'Sin título'
}

export function getCover(cover: ManhwaCover): string {
  return cover.large ?? cover.extraLarge ?? '/placeholder.svg'
}

export function getCoverSources(cover: ManhwaCover): {
  src: string
  srcSet: string | undefined
} {
  return {
    src: getCover(cover),
    srcSet: cover.extraLarge && cover.large
      ? `${cover.large} 1x, ${cover.extraLarge} 2x`
      : undefined,
  }
}

export function getCoverSourcesXL(cover: ManhwaCover): {
  src: string
  srcSet: string | undefined
} {
  return {
    src: cover.extraLarge ?? cover.large ?? '/placeholder.svg',
    srcSet: cover.extraLarge && cover.large
      ? `${cover.extraLarge} 2x, ${cover.large} 1x`
      : undefined,
  }
}

export function formatScore(score: number | null): string {
  return score === null ? 'N/A' : `${score}/100`
}

export function formatScoreShort(score: number | null): string {
  return score === null ? 'N/A' : (score / 10).toFixed(1)
}

export function formatChapters(chapters: number | null): string {
  return chapters === null ? 'En curso' : String(chapters)
}

export function statusLabel(status: ManhwaStatus | null): string {
  const labels: Record<ManhwaStatus, string> = {
    RELEASING: 'En emisión',
    FINISHED: 'Finalizado',
    HIATUS: 'En pausa',
    NOT_YET_RELEASED: 'Próximamente',
    CANCELLED: 'Cancelado',
  }

  return status === null ? 'Desconocido' : labels[status]
}

export function genreLabel(genre: string): string {
  const labels: Record<string, string> = {
    Action: 'Acción',
    Adventure: 'Aventura',
    Comedy: 'Comedia',
    Drama: 'Drama',
    Fantasy: 'Fantasía',
    Horror: 'Terror',
    'Mahou Shoujo': 'Mahō shōjo',
    Mecha: 'Mecha',
    Music: 'Música',
    Mystery: 'Misterio',
    Psychological: 'Psicológico',
    Romance: 'Romance',
    'Sci-Fi': 'Ciencia ficción',
    'Slice of Life': 'Recuentos de la vida',
    Sports: 'Deportes',
    Supernatural: 'Sobrenatural',
    Thriller: 'Suspenso',
    Ecchi: 'Ecchi',
  }

  return labels[genre] ?? genre
}

function decodeBasicEntities(value: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  }

  return value.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (entity) => entities[entity])
}

export function cleanDescription(html: string | null): string {
  if (html === null) return 'Sin sinopsis disponible.'

  const text = decodeBasicEntities(html.replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()

  return text || 'Sin sinopsis disponible.'
}

export function toSummary(manhwa: Manhwa | ManhwaDetail): ManhwaSummary {
  return {
    id: manhwa.id,
    title: manhwa.title,
    coverImage: manhwa.coverImage,
    averageScore: manhwa.averageScore,
    chapters: manhwa.chapters,
  }
}
