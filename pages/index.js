import { useState } from 'react';
import '../public/style.css';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);

  // <-- Replace with your deployed bot API URL -->
  const BOT_API = 'https://devmd-bot.vercel.app/api';

  const handlePair = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BOT_API}/pair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      setPairCode(data.pairCode || '');
    } catch (err) {
      console.error('Error fetching pair code:', err);
      alert('Failed to get pair code. Check bot API URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetSession = async () => {
    try {
      const res = await fetch(`${BOT_API}/session`);
      const data = await res.json();
      setSessionId(data.sessionId || '');
    } catch (err) {
      console.error('Error fetching session ID:', err);
      alert('Failed to get session ID. Check bot API URL.');
    }
  };

  return (
    <div className="container">
      <h1>🚀 MRDEV MD WHATSAPP AGENT</h1>
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
        <p>🌐 Web Deployment: <strong><a href="https://devmd-pied.vercel.app/" target="_blank">Frontend</a></strong></p>
        <p>✨ Bot API: <strong><a href={BOT_API} target="_blank">{BOT_API}</a></strong></p>
        <p>✨ Words of the day: “Stay curious, keep coding, enjoy bots! Explore, Innovate, Automate!”</p>
        <p>💫 Fun phrases: “Hack the day, bot the way, code your life!”</p>
      </div>

      <footer>
        <p>© 2025 Mr Dev • All rights reserved</p>
        <p>📢 Stay Updated: “Bots are life, automate smartly!”</p>
      </footer>
    </div>
  );
}
