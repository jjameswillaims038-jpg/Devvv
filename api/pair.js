export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  try {
    // Replace with your BOT API deployed URL
    const botUrl = 'ps://devmd-pied.vercel.app/api/pair';
    const response = await fetch(botUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await response.json();
    res.status(200).json({ pairCode: data.pairCode });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get pair code' });
  }
}
