import type { Manhwa, ManhwaDetail } from '../types/manhwa'
import useFavoriteToggle from '../hooks/useFavoriteToggle'
import { useFavorites } from '../context/FavoritesContext'
import ConfirmDialog from './ConfirmDialog'

type FavoriteButtonProps = {
  manhwa: Manhwa | ManhwaDetail
  className?: string
}

function FavoriteButton({ manhwa, className = '' }: FavoriteButtonProps) {
  const { isFavorite } = useFavorites()
  const {
    toggle,
    isConfirmOpen,
    confirmRemoval,
    cancelRemoval,
  } = useFavoriteToggle()
  const favorite = isFavorite(manhwa.id)

  return (
    <>
      <button
        type="button"
        className={`inline-flex items-center justify-center rounded-full border border-line p-2 text-xl transition hover:border-accent hover:text-accent ${className}`}
        aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        aria-pressed={favorite}
        onClick={() => toggle(manhwa)}
      >
        <span aria-hidden="true" className={favorite ? 'text-accent' : 'text-muted'}>
          {favorite ? '♥' : '♡'}
        </span>
      </button>
      <ConfirmDialog
        open={isConfirmOpen}
        title="Quitar de tu colección"
        message="¿Quitar de tu colección?"
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        onConfirm={confirmRemoval}
        onCancel={cancelRemoval}
      />
    </>
  )
}

export default FavoriteButton
