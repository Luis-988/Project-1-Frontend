import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideCovers from '../components/SideCovers'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { getTopManhwa } from '../services/anilist'
import type { Manhwa } from '../types/manhwa'

function Home() {
  useDocumentTitle('Inicio')
  const [coversLoading, setCoversLoading] = useState(true)
  const [topManhwa, setTopManhwa] = useState<Manhwa[]>([])

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    getTopManhwa(24, controller.signal)
      .then((items) => {
        if (!active) return
        setTopManhwa(items)
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.error('No se pudieron cargar las portadas populares:', error)
        }
      })
      .finally(() => {
        if (active) setCoversLoading(false)
      })
    return () => {
      active = false
      controller.abort()
    }
  }, [])

  return (
    <div className="-mx-6 -my-12">
      <section className="hero-glow flex min-h-[85vh] items-center justify-center py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(520px,560px)_minmax(0,1fr)]">
          <SideCovers items={topManhwa} loading={coversLoading} side="left" />
          <SystemWindow title="STATUS" className="mx-auto w-full max-w-xl bg-surface/90">
            <div className="text-center">
              <p className="font-rajdhani text-sm font-semibold uppercase tracking-[0.3em] text-accent-2">
              [Has recibido una notificación]
              </p>
              <h1 className="hero-title mt-6 font-orbitron text-3xl font-bold tracking-tight text-fg sm:text-5xl">
              MANHWA SYSTEM
              </h1>
              <p className="mt-4 text-xl text-muted sm:text-2xl">El Sistema te ha elegido, Jugador</p>
              <Link
                className="mt-8 inline-flex border border-btn bg-btn px-6 py-3 font-rajdhani font-bold uppercase tracking-widest text-on-btn shadow-glow transition hover:bg-accent"
                to="/explorar"
              >
                Aceptar misión
              </Link>
            </div>
          </SystemWindow>
          <SideCovers items={topManhwa} loading={coversLoading} side="right" />
        </div>
      </section>

    </div>
  )
}

export default Home
