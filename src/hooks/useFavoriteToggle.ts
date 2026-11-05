import { useCallback, useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import type { Manhwa, ManhwaDetail, ManhwaSummary } from '../types/manhwa'
import { notifyInfo, notifySuccess } from '../utils/toast'

type UseFavoriteToggleResult = {
  toggle: (manhwa: Manhwa | ManhwaDetail) => void
  isConfirmOpen: boolean
  favoriteToRemove: ManhwaSummary | null
  confirmRemoval: () => void
  cancelRemoval: () => void
}

function toSummary(manhwa: Manhwa | ManhwaDetail): ManhwaSummary {
  return {
    id: manhwa.id,
    title: manhwa.title,
    coverImage: manhwa.coverImage,
    averageScore: manhwa.averageScore,
    chapters: manhwa.chapters,
  }
}

function useFavoriteToggle(): UseFavoriteToggleResult {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [favoriteToRemove, setFavoriteToRemove] = useState<ManhwaSummary | null>(null)

  const toggle = useCallback((manhwa: Manhwa | ManhwaDetail) => {
    const summary = toSummary(manhwa)

    if (isFavorite(manhwa.id)) {
      setFavoriteToRemove(summary)
      return
    }

    addFavorite(summary)
    notifySuccess('Añadido a tu colección')
  }, [addFavorite, isFavorite])

  const confirmRemoval = useCallback(() => {
    if (!favoriteToRemove) return
    removeFavorite(favoriteToRemove.id)
    setFavoriteToRemove(null)
    notifyInfo('Eliminado de tu colección')
  }, [favoriteToRemove, removeFavorite])

  const cancelRemoval = useCallback(() => {
    setFavoriteToRemove(null)
  }, [])

  return {
    toggle,
    isConfirmOpen: favoriteToRemove !== null,
    favoriteToRemove,
    confirmRemoval,
    cancelRemoval,
  }
}

export default useFavoriteToggle
