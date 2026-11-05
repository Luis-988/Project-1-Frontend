import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  const [isLight, setIsLight] = useState(false)

  return (
    <div className={isLight ? 'light min-h-screen' : 'min-h-screen'}>
      <Navbar isLight={isLight} onToggleTheme={() => setIsLight((light) => !light)} />
      <main className="mx-auto min-h-[calc(100vh-145px)] max-w-6xl px-6 py-12">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0b1020',
            border: '1px solid #2f80ff',
            color: '#e8f1ff',
            fontFamily: 'Rajdhani, sans-serif',
          },
        }}
      />
    </div>
  )
}

export default Layout
