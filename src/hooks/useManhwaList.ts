import { useEffect, useState } from 'react'
import { searchManhwa } from '../services/jikan'
import type { Manhwa, ManhwaPagination, ManhwaSearchParams } from '../types/manhwa'

type UseManhwaListResult = {
  data: Manhwa[]
  pagination: ManhwaPagination | null
  loading: boolean
  error: string | null
}

function useManhwaList(params: ManhwaSearchParams = {}): UseManhwaListResult {
  const { q, page, limit, status, order_by, sort, min_score } = params
  const [data, setData] = useState<Manhwa[]>([])
  const [pagination, setPagination] = useState<ManhwaPagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await searchManhwa(
          { q, page, limit, status, order_by, sort, min_score },
          controller.signal,
        )
        setData(response.data)
        setPagination(response.pagination)
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') return
        setError(caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el listado')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 500)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [
    q,
    page,
    limit,
    status,
    order_by,
    sort,
    min_score,
  ])

  return { data, pagination, loading, error }
}

export default useManhwaList
