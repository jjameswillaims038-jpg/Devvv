export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const botUrl = 'https://devmd-pied.vercel.app/api/session';
    const response = await fetch(botUrl);
    const data = await response.json();
    res.status(200).json({ sessionId: data.sessionId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get session' });
  }
}



