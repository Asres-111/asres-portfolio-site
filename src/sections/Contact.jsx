import { useState } from 'react'
import './Contact.css'

const EMAIL = 'asresabebe444@gmail.com'
const GITHUB_URL = 'https://github.com/Asres-111'

// The address of the server. It is not a secret, so it can live in the website.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const emptyForm = { name: '', email: '', subject: '', message: '' }

// Checks every field and returns an object of error messages.
// An empty object means everything is valid.
function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject (at least 3 characters).'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message (at least 10 characters).'
  }

  return errors
}

// One reusable form field: label + input (or textarea) + error text.
function Field({
  id,
  label,
  type = 'text',
  multiline,
  autoComplete,
  value,
  error,
  onChange,
}) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id,
    value,
    onChange,
    autoComplete,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
    className: `form-input ${error ? 'form-input--error' : ''}`,
  }

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {multiline ? (
        <textarea rows="6" {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}
      {error && (
        <p id={errorId} className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  // status: 'idle', 'invalid', 'sending', 'sent' or 'error'
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
    // Clear the error for this field as soon as the person edits it
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined })
    }
    if (status !== 'idle' && status !== 'sending') {
      setStatus('idle')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    if (status === 'sending') return

    const foundErrors = validate(values)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) {
      setStatus('invalid')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      // The word "received" is shown ONLY when the server says yes.
      if (response.ok) {
        setValues(emptyForm)
        setStatus('sent')
        return
      }

      const result = await response.json().catch(() => ({}))

      if (response.status === 400 && result.errors) {
        setErrors(result.errors)
        setStatus('invalid')
      } else if (response.status === 429) {
        setErrorMessage('Too many messages were sent. Please try again later.')
        setStatus('error')
      } else {
        setErrorMessage(
          'Something went wrong on the server. Your message was not sent.'
        )
        setStatus('error')
      }
    } catch {
      setErrorMessage('Could not reach the server. Your message was not sent.')
      setStatus('error')
    }
  }

  // A backup: opens the visitor's own email app with the text filled in
  const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
    values.subject.trim()
  )}&body=${encodeURIComponent(
    `${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`
  )}`

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <h2 className="section-heading">Contact</h2>
        <p className="section-subtitle">
          Have a question or an idea? You can reach me by email or on GitHub.
        </p>

        <div className="contact__grid">
          <div className="contact__info">
            <a href={`mailto:${EMAIL}`} className="contact-link">
              <span className="contact-link__label">Email</span>
              <span className="contact-link__value">{EMAIL}</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link__label">GitHub</span>
              <span className="contact-link__value">github.com/Asres-111</span>
            </a>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <Field
              id="name"
              label="Name"
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
            <Field
              id="subject"
              label="Subject"
              autoComplete="off"
              value={values.subject}
              error={errors.subject}
              onChange={handleChange}
            />
            <Field
              id="message"
              label="Message"
              multiline
              autoComplete="off"
              value={values.message}
              error={errors.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>

            {/* Status messages. aria-live lets screen readers announce them. */}
            <div className="form-status" aria-live="polite">
              {status === 'invalid' && (
                <p className="form-status__error">
                  Please fix the highlighted fields and try again.
                </p>
              )}

              {status === 'sent' && (
                <div className="form-status__ready">
                  <p>
                    <strong>Thank you! Your message was received.</strong>
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="form-status__ready">
                  <p className="form-status__error">{errorMessage}</p>
                  <p>
                    You can also send it from your own email app. Nothing is
                    sent until you press Send there.
                  </p>
                  <div className="form-status__actions">
                    <a href={mailtoLink} className="btn btn-outline">
                      Open in my email app
                    </a>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact