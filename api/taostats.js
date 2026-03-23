const https = require('https');

module.exports = async function handler(req, res) {
  try {
    const { path = '', ...rest } = req.query;
    const params = new URLSearchParams(rest).toString();
    const url = 'https://api.taostats.io/api/' + path + (params ? '?' + params : '');
    
    const data = await new Promise((resolve, reject) => {
      const opts = new URL(url);
      const options = {
        hostname: opts.hostname,
        path: opts.pathname + (opts.search || ''),
        headers: { 'Authorization': 'tao-4b456573-5ee8-4921-84e6-7c5e62863e26:c8618755' }
      };
      https.get(options, (r) => {
        let body = '';
        r.on('data', c => body += c);
        r.on('end', () => {
          try { resolve(JSON.parse(body)); }
          catch(e) { resolve({ error: body }); }
        });
      }).on('error', reject);
    });
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
