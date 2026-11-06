import { useState, type FormEvent } from 'react'
import SystemWindow from '../components/SystemWindow'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { notifySuccess } from '../utils/toast'

type ContactFields = {
  name: string
  email: string
  message: string
}

type ContactErrors = Record<keyof ContactFields, string>
type TouchedFields = Record<keyof ContactFields, boolean>

const initialFields: ContactFields = { name: '', email: '', message: '' }
const initialTouched: TouchedFields = { name: false, email: false, message: false }

function validate(values: ContactFields): ContactErrors {
  return {
    name: values.name.trim().length >= 2 ? '' : 'El nombre debe tener al menos 2 caracteres',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
      ? ''
      : 'Ingresa un email válido (debe contener @ y .)',
    message: values.message.trim().length >= 10
      ? ''
      : 'El mensaje debe tener al menos 10 caracteres',
  }
}

function Contact() {
  useDocumentTitle('Contacto')
  const [fields, setFields] = useState<ContactFields>(initialFields)
  const [touched, setTouched] = useState<TouchedFields>(initialTouched)
  const [submitted, setSubmitted] = useState(false)
  const errors = validate(fields)
  const isValid = Object.values(errors).every((error) => error === '')

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }))
    setSubmitted(false)
  }

  const markTouched = (field: keyof ContactFields) => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const shouldShowError = (field: keyof ContactFields): boolean =>
    Boolean(errors[field]) && (touched[field] || fields[field].length > 0 || submitted)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    notifySuccess('Mensaje enviado correctamente')
    setFields(initialFields)
    setTouched(initialTouched)
    setSubmitted(false)
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
            <input
              className={`w-full border bg-base px-4 py-3 text-fg focus:border-accent ${shouldShowError('name') ? 'border-error' : 'border-line'}`}
              id="contact-name"
              value={fields.name}
              onChange={(event) => updateField('name', event.target.value)}
              onBlur={() => markTouched('name')}
              aria-invalid={shouldShowError('name')}
              aria-describedby={shouldShowError('name') ? 'contact-name-error' : undefined}
              required
              minLength={2}
            />
            {shouldShowError('name') ? <p className="mt-1 text-sm text-error" id="contact-name-error" role="alert">{errors.name}</p> : null}
          </div>
          <div>
            <label className="mb-2 block font-rajdhani font-semibold text-fg" htmlFor="contact-email">Email</label>
            <input
              className={`w-full border bg-base px-4 py-3 text-fg focus:border-accent ${shouldShowError('email') ? 'border-error' : 'border-line'}`}
              id="contact-email"
              type="email"
              value={fields.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={() => markTouched('email')}
              aria-invalid={shouldShowError('email')}
              aria-describedby={shouldShowError('email') ? 'contact-email-error' : undefined}
              required
            />
            {shouldShowError('email') ? <p className="mt-1 text-sm text-error" id="contact-email-error" role="alert">{errors.email}</p> : null}
          </div>
          <div>
            <label className="mb-2 block font-rajdhani font-semibold text-fg" htmlFor="contact-message">Mensaje</label>
            <textarea
              className={`min-h-32 w-full border bg-base px-4 py-3 text-fg focus:border-accent ${shouldShowError('message') ? 'border-error' : 'border-line'}`}
              id="contact-message"
              value={fields.message}
              onChange={(event) => updateField('message', event.target.value)}
              onBlur={() => markTouched('message')}
              aria-invalid={shouldShowError('message')}
              aria-describedby={shouldShowError('message') ? 'contact-message-error' : undefined}
              required
              minLength={10}
            />
            {shouldShowError('message') ? <p className="mt-1 text-sm text-error" id="contact-message-error" role="alert">{errors.message}</p> : null}
          </div>
          <button
            className={`w-full border px-5 py-3 font-rajdhani font-bold text-on-btn transition ${isValid ? 'border-btn bg-btn shadow-glow hover:bg-accent' : 'cursor-not-allowed border-line bg-muted/40 opacity-50'}`}
            type="submit"
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            Enviar mensaje
          </button>
        </form>
      </SystemWindow>
    </section>
  )
}

export default Contact
