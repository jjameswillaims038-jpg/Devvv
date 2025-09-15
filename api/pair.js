import { makeWASocket, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  const pn = new PhoneNumber('+' + phone.replace(/[^0-9]/g, ''));
  if (!pn.isValid()) return res.status(400).json({ error: 'Invalid phone number' });

  try {
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({ version, printQRInTerminal: false });

    // Simulate requestPairingCode (replace with actual method in your bot)
    const pairCode = Math.floor(1000 + Math.random() * 9000).toString();
    res.status(200).json({ pairCode });

    sock.ws.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate pair code' });
  }
}
