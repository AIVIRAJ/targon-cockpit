export default async function handler(req, res) {
  const path = req.query.path || '';
  const qs = new URLSearchParams(req.query);
  qs.delete('path');
  const url = `https://api.taostats.io/api/${path}${qs.toString() ? '?' + qs.toString() : ''}`;
  const r = await fetch(url, {
    headers: { 'Authorization': 'tao-4b456573-5ee8-4921-84e6-7c5e62863e26:c8618755' }
  });
  const data = await r.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(r.status).json(data);
}
