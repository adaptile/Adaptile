import express from 'express'
import { Resend } from 'resend'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.static(resolve(__dirname, 'dist')))

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
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

app.post('/api/download', async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Adaptile <hello@adaptile.ae>',
      to: [email],
      bcc: ['masriminting@gmail.com', 'yezen@adaptile.ae'],
      subject: 'Your WatcherGuru Case Study is here',
      replyTo: 'hello@adaptile.ae',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080A0E; color: #fff; padding: 40px;">
          <img src="https://adaptile.ae/adaptile-logo.jpg" alt="Adaptile" style="width: 80px; margin-bottom: 24px;" />
          <h2 style="color: #fff; font-size: 20px; margin-bottom: 16px;">Hey ${name},</h2>
          <p style="color: #C8DCF0; line-height: 1.75; margin-bottom: 16px;">
            Thanks for checking out our case study. We took over one of the biggest brands on X who were struggling on Instagram and completely transformed their page, growing their views by 2,100% in 30 days.
          </p>
          <p style="color: #C8DCF0; line-height: 1.75; margin-bottom: 16px;">
            Your download is attached to this email.
          </p>
          <p style="color: #C8DCF0; line-height: 1.75; margin-bottom: 24px;">
            Looking for something similar? <a href="https://adaptile.ae/#contact" style="color: #5B9BD5;">Contact us here</a> and we will get back to you in less than 24 hours.
          </p>
          <p style="color: #C8DCF0;">The Adaptile Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'WatcherGuru_CaseStudy_Adaptile.pdf',
          path: resolve(__dirname, 'public', 'WatcherGuru_CaseStudy_Adaptile.pptx.pdf'),
        },
      ],
    })

    await resend.emails.send({
      from: 'Adaptile <hello@adaptile.ae>',
      to: ['masriminting@gmail.com'],
      subject: `New Case Study Download — ${name} — ${email}`,
      html: `
        <h2>New Case Study Download</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send.' })
  }
})

app.get('/{*path}', (req, res) => {
  res.sendFile(resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
