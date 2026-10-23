import http from 'node:http';

const BASE_URL = 'http://localhost:3000';

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function run() {
  console.log('Testing EMAI HQ local instance...\n');
  
  const endpoints = [
    { path: '/', expected: 200, mime: 'text/html' },
    { path: '/hyperplex.css', expected: 200, mime: 'text/css' },
    { path: '/hq.css?v=muvlxbte', expected: 200, mime: 'text/css' },
    { path: '/fonts/fonts.css?v=muvlxbte', expected: 200, mime: 'text/css' },
    { path: '/vendor/react.js', expected: 200, mime: 'application/javascript' },
    { path: '/hyperplex-review.js?v=muvlxbte', expected: 200, mime: 'application/javascript' },
    { path: '/theme-1/projects.webp', expected: 200, mime: 'image/webp' },
    { path: '/api/config', expected: 200, mime: 'application/json' },
    { path: '/api/operations', expected: 200, mime: 'application/json' },
    { path: '/api/workspace', expected: 200, mime: 'application/json' },
    { path: '/api/home-feed', expected: 200, mime: 'application/json' },
    { path: '/api/crm', expected: 200, mime: 'application/json' },
    { path: '/api/projects', expected: 200, mime: 'application/json' },
    { path: '/api/document?id=demo:project:northstar', expected: 200, mime: 'application/json' },
    { path: '/api/assistant', expected: 200, mime: 'application/json' },
  ];

  let passed = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetchUrl(ep.path);
      const ctype = res.headers['content-type'] || '';
      if (res.status === ep.expected && ctype.includes(ep.mime)) {
        console.log(`[PASS] GET ${ep.path} -> ${res.status} (${ctype})`);
        passed++;
      } else {
        console.error(`[FAIL] GET ${ep.path} -> got ${res.status} (${ctype}), expected ${ep.expected} (${ep.mime})`);
      }
    } catch (err) {
      console.error(`[ERR] GET ${ep.path} -> ${err.message}`);
    }
  }

  // Test POST
  try {
    const postRes = await fetchUrl('/api/assistant/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Hello assistant' })
    });
    if (postRes.status === 200) {
      console.log(`[PASS] POST /api/assistant/message -> ${postRes.status}: ${postRes.body}`);
      passed++;
    }
  } catch (err) {
    console.error(`[ERR] POST /api/assistant/message -> ${err.message}`);
  }

  console.log(`\nTests completed: ${passed}/${endpoints.length + 1} passed.`);
  process.exit(passed === endpoints.length + 1 ? 0 : 1);
}

run();
