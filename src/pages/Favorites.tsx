import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import ManhwaCard from '../components/ManhwaCard'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useFavorites } from '../context/FavoritesContext'
import { getTitle } from '../utils/manhwa'
import { notifyInfo } from '../utils/toast'
import type { ManhwaSummary } from '../types/manhwa'

function Favorites() {
  useDocumentTitle('Favoritos')
  const { favorites, count, removeFavorite } = useFavorites()
  const [favoriteToRemove, setFavoriteToRemove] = useState<ManhwaSummary | null>(null)
  const [isClearOpen, setIsClearOpen] = useState(false)

  const confirmRemove = () => {
    if (favoriteToRemove === null) return
    removeFavorite(favoriteToRemove.id)
    setFavoriteToRemove(null)
    notifyInfo('Eliminado de favoritos')
  }

  const clearFavorites = () => {
    favorites.forEach((favorite) => removeFavorite(favorite.id))
    setIsClearOpen(false)
    notifyInfo('Colección vaciada')
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-fg sm:text-4xl">Mis Favoritos</h1>
          <p className="mt-2 text-lg text-muted">{count} items guardados</p>
        </div>
        {count > 0 ? (
          <button
            className="border border-line px-4 py-2 font-rajdhani font-semibold text-muted transition hover:border-accent hover:text-accent"
            type="button"
            onClick={() => setIsClearOpen(true)}
          >
            Vaciar colección
          </button>
        ) : null}
      </header>

      {count === 0 ? (
        <EmptyState />
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {favorites.map((favorite) => (
            <ManhwaCard
              key={favorite.id}
              manhwa={favorite}
              onRemove={() => setFavoriteToRemove(favorite)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={favoriteToRemove !== null}
        title="¿Quitar de favoritos?"
        message={favoriteToRemove ? (
          <p>¿Quieres quitar <strong>{getTitle(favoriteToRemove.title)}</strong> de tus favoritos?</p>
        ) : null}
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        danger
        onConfirm={confirmRemove}
        onCancel={() => setFavoriteToRemove(null)}
      />
      <ConfirmDialog
        open={isClearOpen}
        title="¿Vaciar colección?"
        message="¿Quieres quitar todos los manhwas de tus favoritos?"
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        danger
        onConfirm={clearFavorites}
        onCancel={() => setIsClearOpen(false)}
      />
    </section>
  )
}

export default Favorites
