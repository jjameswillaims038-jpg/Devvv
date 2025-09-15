import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [phone, setPhone] = useState('')
  const [pairCode, setPairCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')

  const handlePair = async () => {
    if (!phone) return alert('Enter your phone number')
    setLoading(true)
    try {
      const res = await fetch('/api/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      setPairCode(data.pairCode || '')
      setSessionId(data.sessionId || '')
    } catch (err) {
      console.error(err)
      alert('Error pairing')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>DevMD WhatsApp Agent</title>
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <div className="container">
        <header>
          <h1>DevMD WhatsApp Agent 🚀</h1>
          <p className="subheading">Fast pairing & live SESSION_ID delivery</p>
        </header>

        <input
          type="text"
          placeholder="Enter your phone number (e.g. 2348012345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handlePair} disabled={loading}>
          {loading ? 'Pairing...' : 'Get Pairing Code'}
        </button>

        {pairCode && (
          <div className="pair-section">
            <h2>📌 Your Pairing Code:</h2>
            <p className="pair-code">{pairCode}</p>
          </div>
        )}

        {sessionId && (
          <div className="session-section">
            <h2>💠 Your SESSION_ID:</h2>
            <textarea readOnly value={sessionId}></textarea>
          </div>
        )}

        <div className="features">
          <h3>✨ Bot Features:</h3>
          <ul>
            <li>Auto reply messages</li>
            <li>Group participant updates</li>
            <li>Status monitoring</li>
            <li>Fast connection & live session</li>
            <li>Deploy anywhere: Vercel, Railway, Render</li>
          </ul>
        </div>

        <footer>
          <p>Developed by 𝐌𝐑ܮ𝐃𝐄𝐕 — Contact: +2349264624021</p>
        </footer>
      </div>
    </>
  )
}
