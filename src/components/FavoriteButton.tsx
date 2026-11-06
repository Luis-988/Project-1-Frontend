import type { Manhwa, ManhwaDetail, ManhwaSummary } from '../types/manhwa'
import type { MouseEvent } from 'react'
import useFavoriteToggle from '../hooks/useFavoriteToggle'
import { useFavorites } from '../context/FavoritesContext'
import ConfirmDialog from './ConfirmDialog'

type FavoriteButtonProps = {
  manhwa: Manhwa | ManhwaDetail | ManhwaSummary
  className?: string
  showLabel?: boolean
}

function FavoriteButton({ manhwa, className = '', showLabel = false }: FavoriteButtonProps) {
  const { isFavorite } = useFavorites()
  const {
    toggle,
    isConfirmOpen,
    confirmRemoval,
    cancelRemoval,
  } = useFavoriteToggle()
  const favorite = isFavorite(manhwa.id)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggle(manhwa)
  }

  return (
    <>
      <button
        type="button"
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-line p-2 text-xl transition hover:border-accent hover:text-accent ${showLabel ? 'px-4 py-2 font-rajdhani text-sm font-semibold' : ''} ${className}`}
        aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        aria-pressed={favorite}
        onClick={handleClick}
      >
        <span aria-hidden="true" className={favorite ? 'text-accent' : 'text-muted'}>
          {favorite ? '♥' : '♡'}
        </span>
        {showLabel ? (favorite ? 'Quitar de favoritos' : 'Agregar a favoritos') : null}
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
