import { useEffect, useState } from 'react'
import { getManhwaById } from '../services/anilist'
import type { ManhwaDetail } from '../types/manhwa'

type UseManhwaDetailResult = {
  data: ManhwaDetail | null
  loading: boolean
  error: string | null
}

function useManhwaDetail(id: number | null | undefined): UseManhwaDetailResult {
  const [data, setData] = useState<ManhwaDetail | null>(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    if (id === null || id === undefined) {
      return () => controller.abort()
    }

    const loadDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getManhwaById(id, controller.signal)
        setData(response)
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') return
        setError(caughtError instanceof Error ? caughtError.message : 'No se pudo cargar el detalle')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadDetail()

    return () => controller.abort()
  }, [id])

  if (id === null || id === undefined) {
    return { data: null, loading: false, error: null }
  }

  return { data, loading, error }
}

export default useManhwaDetail
