import type {
  Manhwa,
  ManhwaFull,
  ManhwaListResponse,
  ManhwaResponse,
  ManhwaSearchParams,
} from '../types/manhwa'

const API_URL = 'https://api.jikan.moe/v4'

function getErrorMessage(status: number): string {
  if (status === 404) return 'No encontrado'
  if (status === 429) return 'Demasiadas peticiones, espera un momento'
  if (status === 504) return 'El servicio no responde, intenta de nuevo'
  return `Error en la API de Jikan (${status})`
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status))
  }

  return (await response.json()) as T
}

export function searchManhwa(
  params: ManhwaSearchParams = {},
  signal?: AbortSignal,
): Promise<ManhwaListResponse> {
  const searchParams = new URLSearchParams({
    type: 'manhwa',
    sfw: 'true',
  })

  const entries: Array<[string, string | number | undefined]> = [
    ['q', params.q?.trim()],
    ['page', params.page],
    ['limit', params.limit ?? 24],
    ['status', params.status],
    ['order_by', params.order_by],
    ['sort', params.sort],
    ['min_score', params.min_score],
  ]

  entries.forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  return fetchJson<ManhwaListResponse>(`${API_URL}/manga?${searchParams.toString()}`, signal)
}

export async function getManhwaById(id: number | string, signal?: AbortSignal): Promise<ManhwaFull> {
  const response = await fetchJson<ManhwaResponse<ManhwaFull>>(
    `${API_URL}/manga/${encodeURIComponent(String(id))}/full`,
    signal,
  )
  return response.data
}

export async function getTopManhwa(limit: number, signal?: AbortSignal): Promise<Manhwa[]> {
  const params = new URLSearchParams({
    type: 'manhwa',
    limit: String(limit),
  })
  const response = await fetchJson<ManhwaListResponse>(`${API_URL}/top/manga?${params.toString()}`, signal)
  return response.data
}
