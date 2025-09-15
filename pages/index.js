import { useState } from 'react';
import '../public/style.css';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePair = async () => {
    setLoading(true);
    const res = await fetch('/api/pair', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    setPairCode(data.pairCode || '');
    setLoading(false);
  };

  const handleGetSession = async () => {
    const res = await fetch('/api/session');
    const data = await res.json();
    setSessionId(data.sessionId || '');
  };

  return (
    <div className="container">
      <h1>🚀MRDEV MD WHATSAPP AGENT</h1>
      <p className="sub">Enter your phone number to get started</p>

      <input
        type="text"
        placeholder="e.g. 2348012345678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handlePair}>{loading ? 'Loading...' : 'Get Pair Code'}</button>

      {pairCode && <p className="success">✅ Pair Code: <strong>{pairCode}</strong></p>}

      <button onClick={handleGetSession}>Get Session ID</button>
      {sessionId && <p className="success">🔑 Session ID: <strong>{sessionId}</strong></p>}

      <div className="info">
        <p>💡 Developer: <strong>Mr Dev</strong></p>
        <p>📱 Contact: <strong>+2349164624021</strong></p>
        <p>🌐 Deployment: <strong><a href="https://vercel.com/your-project" target="_blank">Vercel Link</a></strong></p>
        <p>✨ Words of the day: “Stay curious, keep coding, enjoy bots! Explore, Innovate, Automate!”</p>
        <p>💫 Fun phrases: “Hack the day, bot the way, code your life!”</p>
      </div>

      <footer>
        <p>© 2025 Mr Dev • All rights reserved • Visit <a href="https://vercel.com/your-project" target="_blank">Deployment</a></p>
        <p>📢 Stay Updated: “Bots are life, automate smartly!”</p>
      </footer>
    </div>
  );
}
