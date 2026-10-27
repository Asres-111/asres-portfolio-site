import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { neon } from '@neondatabase/serverless'

// Settings come from server/.env. They are never written in the code.
const {
  DATABASE_URL,
  ALLOWED_ORIGIN = 'http://localhost:5173',
  PORT = 3001,
} = process.env

if (!DATABASE_URL) {
  console.error('DATABASE_URL is missing. Check your server/.env file.')
  process.exit(1)
}

// Talks to Neon over HTTPS (port 443), which most networks do not block.
const sql = neon(DATABASE_URL)

const app = express()

app.use(helmet()) // adds safe security headers
app.use(cors({ origin: ALLOWED_ORIGIN })) // only your website may call this server
app.use(express.json({ limit: '10kb' })) // reject very large requests

// ---------- Validation (the server never trusts the browser) ----------
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validate(body) {
  const data = {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message),
  }
  const errors = {}

  if (data.name.length < 2 || data.name.length > 100) {
    errors.name = 'Name must be 2 to 100 characters.'
  }
  if (data.email.length > 254 || !EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (data.subject.length < 3 || data.subject.length > 150) {
    errors.subject = 'Subject must be 3 to 150 characters.'
  }
  if (data.message.length < 10 || data.message.length > 2000) {
    errors.message = 'Message must be 10 to 2000 characters.'
  }

  return { data, errors }
}

// ---------- Rate limit: 10 messages per hour per visitor ----------
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again later.' },
})

// ---------- Routes ----------

// Checks that the server and the database are working.
app.get('/api/health', async (req, res) => {
  try {
    await sql.query('SELECT 1')
    res.json({ ok: true, database: 'connected' })
  } catch (error) {
    console.error('Health check failed:', error.code ?? error.name)
    res.status(500).json({ ok: false, database: 'unreachable' })
  }
})

// Receives the contact form and saves it in the database.
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { data, errors } = validate(req.body ?? {})

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  try {
    // $1, $2... keep the values separate from the SQL (blocks SQL injection)
    await sql.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [data.name, data.email, data.subject, data.message]
    )
    res.status(201).json({ ok: true })
  } catch (error) {
    // Log only the error code, never the visitor's message or any secret
    console.error('Could not save message:', error.code ?? error.name)
    res.status(500).json({
      ok: false,
      error: 'Something went wrong. Please try again later.',
    })
  }
})

// Anything else: not found
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Catches bad requests, such as broken JSON
app.use((error, req, res, next) => {
  res.status(400).json({ ok: false, error: 'Invalid request.' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})