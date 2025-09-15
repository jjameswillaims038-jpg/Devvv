import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const sessionFile = path.join(process.cwd(), 'session/session.json');
  if (!fs.existsSync(sessionFile)) return res.status(404).json({ error: 'Session not found' });

  const sessionData = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
  const sessionId = Buffer.from(JSON.stringify(sessionData)).toString('base64');
  res.status(200).json({ sessionId });
}
