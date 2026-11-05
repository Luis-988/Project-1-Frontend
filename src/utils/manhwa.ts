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

export function formatScore(score: number | null): string {
  return score === null ? 'N/A' : `${score}/100`
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
