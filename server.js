import express from 'express'
import { Resend } from 'resend'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8080
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(express.json())
app.use(express.static(resolve(__dirname, 'dist')))

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Adaptile <hello@adaptile.ae>',
      to: ['zaidan.yezen@gmail.com'],
      subject: `Project Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      return res.status(500).json({ error: 'Failed to send message.' })
    }

    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to send message.' })
  }
})

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
