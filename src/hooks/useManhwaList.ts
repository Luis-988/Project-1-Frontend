import { useEffect, useState } from 'react'
import { searchManhwa } from '../services/anilist'
import type { Manhwa, ManhwaSearchParams, PageInfo } from '../types/manhwa'

type UseManhwaListResult = {
  data: Manhwa[]
  pageInfo: PageInfo | null
  loading: boolean
  error: string | null
}

function useManhwaList(params: ManhwaSearchParams = {}): UseManhwaListResult {
  const { search, page, perPage, status, sort } = params
  const [data, setData] = useState<Manhwa[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await searchManhwa(
          { search, page, perPage, status, sort },
          controller.signal,
        )
        setData(response.media)
        setPageInfo(response.pageInfo)
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
  }, [search, page, perPage, status, sort])

  return { data, pageInfo, loading, error }
}

export default useManhwaList
