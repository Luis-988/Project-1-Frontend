import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  const [isLight, setIsLight] = useState(() => !document.documentElement.classList.contains('dark'))

  const toggleTheme = () => {
    const nextIsLight = !isLight
    document.documentElement.classList.toggle('dark', !nextIsLight)
    setIsLight(nextIsLight)
    try {
      localStorage.setItem('manhwa-theme', nextIsLight ? 'light' : 'dark')
    } catch (error) {
      console.error('No se pudo guardar la preferencia de tema:', error)
    }
  }

  return (
    <div className="min-h-screen bg-base text-fg">
      <Navbar isLight={isLight} onToggleTheme={toggleTheme} />
      <main className="mx-auto min-h-[calc(100vh-145px)] max-w-6xl px-6 py-12">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-line)',
            color: 'var(--text-fg)',
            fontFamily: 'Rajdhani, sans-serif',
          },
        }}
      />
    </div>
  )
}

export default Layout
