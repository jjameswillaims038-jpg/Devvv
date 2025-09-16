import { useState, useEffect } from 'react';
import '../public/style.css';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [pairCode, setPairCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#ff4d4f');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      setColor(randomColor);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePair = async () => {
    if (!phone) return alert('Enter phone number!');
    setLoading(true);
    try {
      const res = await fetch('/api/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      setPairCode(data.pairCode || '');
    } catch (err) {
      alert('Error fetching pair code');
    }
    setLoading(false);
  };

  const handleGetSession = async () => {
    try {
      const res = await fetch('/api/session');
      const data = await res.json();
      setSessionId(data.sessionId || '');
    } catch (err) {
      alert('Error fetching session');
    }
  };

  return (
    <div className="container">
      <h1 style={{ color }}>🚀 MRDEV MD WHATSAPP AGENT</h1>
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
        <p>🌐 Deployment: <strong><a href="https://devmd-pied.vercel.app/" target="_blank">Vercel</a></strong></p>
        <p>✨ Words of the day: “Stay curious, keep coding, enjoy bots! Explore, Innovate, Automate!”</p>
        <p>💫 Fun phrases: “Hack the day, bot the way, code your life!”</p>
      </div>

      <footer>
        <p>© 2025 Mr Dev • All rights reserved • Visit <a href="https://devmd-pied.vercel.app/" target="_blank">Deployment</a></p>
        <p>📢 Stay Updated: “Bots are life, automate smartly!”</p>
      </footer>
    </div>
  );
}
