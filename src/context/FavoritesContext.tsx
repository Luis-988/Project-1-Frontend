import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ManhwaSummary } from '../types/manhwa'

type FavoritesContextValue = {
  favorites: ManhwaSummary[]
  addFavorite: (manhwa: ManhwaSummary) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  count: number
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<ManhwaSummary[]>([])

  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    addFavorite: (manhwa) => {
      setFavorites((current) =>
        current.some((favorite) => favorite.id === manhwa.id)
          ? current
          : [...current, manhwa],
      )
    },
    removeFavorite: (id) => {
      setFavorites((current) => current.filter((favorite) => favorite.id !== id))
    },
    isFavorite: (id) => favorites.some((favorite) => favorite.id === id),
    count: favorites.length,
  }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext)

  if (context === null) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }

  return context
}
