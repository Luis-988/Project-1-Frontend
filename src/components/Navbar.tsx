import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

type NavbarProps = {
  isLight: boolean
  onToggleTheme: () => void
}

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar({ isLight, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-line/50 bg-base/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Navegación principal">
        <Link className="font-orbitron text-lg font-bold tracking-wider text-accent" to="/" onClick={() => setIsOpen(false)}>
          <span className="text-accent-2">◈</span> MANHWA SYSTEM
        </Link>
        <button
          className="rounded border border-line p-2 text-accent md:hidden"
          type="button"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="text-xl">{isOpen ? '×' : '☰'}</span>
        </button>
        <div className={`${isOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-[73px] z-10 flex-col gap-2 border-b border-line bg-base px-6 py-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `font-rajdhani text-sm font-semibold uppercase tracking-widest transition ${isActive ? 'text-accent' : 'text-muted hover:text-fg'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <button
            className="mt-2 border border-line px-3 py-1 font-rajdhani text-sm text-accent-2 hover:bg-surface md:mt-0"
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            aria-pressed={!isLight}
          >
            {isLight ? 'MODO OSCURO' : 'MODO CLARO'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
