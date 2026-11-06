import { useState } from 'react'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { notifySuccess } from '../utils/toast'

type ContactFields = {
  name: string
  email: string
  message: string
}

const initialFields: ContactFields = { name: '', email: '', message: '' }

function Contact() {
  useDocumentTitle('Contacto')
  const [fields, setFields] = useState<ContactFields>(initialFields)
  const [submitted, setSubmitted] = useState(false)

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)
  const isValid = fields.name.trim().length >= 2 && emailIsValid && fields.message.trim().length >= 10

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    setFields(initialFields)
    notifySuccess('Mensaje enviado correctamente')
  }

  return (
    <section className="mx-auto max-w-2xl space-y-8">
      <header className="text-center">
        <h1 className="font-orbitron text-3xl font-bold text-fg sm:text-4xl">Contacto</h1>
        <p className="mt-3 text-lg text-muted">¿Tienes preguntas o sugerencias? Envíanos un mensaje.</p>
      </header>
      <SystemWindow title="MENSAJE">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block font-rajdhani font-semibold text-fg" htmlFor="contact-name">Nombre</label>
            <input className="w-full border border-line bg-base px-4 py-3 text-fg focus:border-accent" id="contact-name" value={fields.name} onChange={(event) => updateField('name', event.target.value)} required minLength={2} />
          </div>
          <div>
            <label className="mb-2 block font-rajdhani font-semibold text-fg" htmlFor="contact-email">Email</label>
            <input className="w-full border border-line bg-base px-4 py-3 text-fg focus:border-accent" id="contact-email" type="email" value={fields.email} onChange={(event) => updateField('email', event.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block font-rajdhani font-semibold text-fg" htmlFor="contact-message">Mensaje</label>
            <textarea className="min-h-32 w-full border border-line bg-base px-4 py-3 text-fg focus:border-accent" id="contact-message" value={fields.message} onChange={(event) => updateField('message', event.target.value)} required minLength={10} />
          </div>
          <button className="w-full border border-btn bg-btn px-5 py-3 font-rajdhani font-bold text-on-btn shadow-glow transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={!isValid}>
            Enviar mensaje
          </button>
          {submitted ? <p className="text-center text-accent-2" role="status">Tu mensaje fue enviado.</p> : null}
        </form>
      </SystemWindow>
    </section>
  )
}

export default Contact
