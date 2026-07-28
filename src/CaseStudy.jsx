import { useState } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'

export default function CaseStudy() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080A0E', color: '#fff', fontFamily: 'var(--font-body)' }}>

      <nav style={{ padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1E2836' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/adaptile-logo.jpg" alt="Adaptile" style={{ width: '36px', height: '36px', borderRadius: '6px' }} />
          <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Adaptile</span>
        </a>
        <a href="/#contact" style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Start a Project <ArrowUpRight size={14} />
        </a>
      </nav>

      <div style={{ padding: '80px 56px 60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          <img src="/watcherguru_logo.jfif" alt="WatcherGuru" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#5B9BD5', textTransform: 'uppercase', fontWeight: 700 }}>Case Study</div>
            <div style={{ fontSize: '15px', color: '#C8DCF0', fontWeight: 600 }}>WatcherGuru</div>
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '20px' }}>
          How We Grew WatcherGuru's<br />Instagram Views by <span style={{ color: '#5B9BD5' }}>2,100%</span>
        </h1>
        <p style={{ fontSize: '16px', color: '#C8DCF0', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
          WatcherGuru had 4.2M followers on X but was sitting at 194K on Instagram. We completely rethought their content strategy and turned it around in 30 days.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto 80px', padding: '0 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1E2836', border: '1px solid #1E2836', borderRadius: '10px', overflow: 'hidden' }}>
        {[
          { val: '48.2M', label: 'Total Views', sub: 'up from 2.1M' },
          { val: '32,000', label: 'Followers Gained', sub: 'up from 1,960' },
          { val: '17M', label: 'Accounts Reached', sub: 'up from 367K' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#111620', padding: '32px 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{s.val}</div>
            <div style={{ fontSize: '10px', color: '#6B7F96', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '12px', color: '#5B9BD5' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ background: '#111620', border: '1px solid #1E2836', borderTop: '3px solid #5B9BD5', borderRadius: '10px', padding: '40px 36px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '56px', height: '56px', background: '#5B9BD5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px', color: '#000', fontWeight: 700 }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', color: '#fff', marginBottom: '12px' }}>Check your inbox</h3>
              <p style={{ color: '#C8DCF0', fontSize: '14px', lineHeight: 1.7 }}>The case study is on its way. If you do not see it in a few minutes check your spam folder.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.5px', color: '#fff', marginBottom: '8px' }}>Download the Full Case Study</h2>
              <p style={{ fontSize: '13px', color: '#C8DCF0', lineHeight: 1.65, marginBottom: '28px' }}>Get the full breakdown of the strategy, content approach, and results. Enter your details below.</p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  style={{ background: '#0D1117', border: '1px solid #1E2836', color: '#fff', padding: '16px 18px', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  style={{ background: '#0D1117', border: '1px solid #1E2836', color: '#fff', padding: '16px 18px', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
                {error && <p style={{ color: '#e85d5d', fontSize: '13px', textAlign: 'center' }}>{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ width: '100%', background: '#5B9BD5', color: '#000', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.6 : 1, border: 'none', marginTop: '4px' }}
                >
                  {sending ? 'Sending...' : <><Download size={16} /> Download Case Study</>}
                </button>
                <p style={{ fontSize: '11px', color: '#6B7F96', textAlign: 'center', marginTop: '4px' }}>We will not spam you. One email with your download, that is it.</p>
              </form>
            </>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1E2836', padding: '24px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: '#6B7F96', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Adaptile</span>
        <a href="/" style={{ fontSize: '11px', color: '#5B9BD5', textDecoration: 'none', fontWeight: 600 }}>Back to site</a>
      </div>

    </div>
  )
}
