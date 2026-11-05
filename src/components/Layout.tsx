import { useState } from 'react'
import { Outlet } from 'react-router-dom'
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
    </div>
  )
}

export default Layout
