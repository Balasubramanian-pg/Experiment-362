import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const SEED_DIR = path.join(__dirname, 'data', 'seed');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

// In-memory application state
let state = {};

function loadJson(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error loading JSON ${filePath}:`, err.message);
  }
  return fallback;
}

function initMemoryState() {
  state = {
    agents: loadJson(path.join(SEED_DIR, 'agents.json')),
    assistant: loadJson(path.join(SEED_DIR, 'assistant.json')),
    cardArt: loadJson(path.join(SEED_DIR, 'card-art_status.json'), { slots: {} }),
    config: loadJson(path.join(SEED_DIR, 'config.json')),
    crm: loadJson(path.join(SEED_DIR, 'crm.json')),
    crmCalendar: loadJson(path.join(SEED_DIR, 'crm_calendar.json')),
    crmInsights: loadJson(path.join(SEED_DIR, 'crm_insights.json')),
    crmReceivables: loadJson(path.join(SEED_DIR, 'crm_receivables.json')),
    crmSequences: loadJson(path.join(SEED_DIR, 'crm_sequences.json')),
    deviceHandoff: loadJson(path.join(SEED_DIR, 'device-handoff.json'), { available: false, devices: [] }),
    homeFeed: loadJson(path.join(SEED_DIR, 'home-feed.json')),
    homeSignals: loadJson(path.join(SEED_DIR, 'home-signals.json'), { items: [] }),
    mailStatus: loadJson(path.join(SEED_DIR, 'mail_status.json')),
    operations: loadJson(path.join(SEED_DIR, 'operations.json')),
    projects: loadJson(path.join(SEED_DIR, 'projects.json')),
    pulse: loadJson(path.join(SEED_DIR, 'pulse.json')),
    workspace: loadJson(path.join(SEED_DIR, 'workspace.json')),
    documents: {},
    outputs: {},
    mailThreads: {
      'thread-1': {
        id: 'thread-1',
        from: 'Maya Chen <maya@northstarlearning.example>',
        replyTo: 'maya@northstarlearning.example',
        subject: 'Northstar launch reporting walkthrough',
        date: '2026-10-22T14:30:00.000Z',
        body: 'Hi Team,\n\nThe onboarding flow looks fantastic. Can we do a quick walkthrough of the reporting automation tomorrow at 2 PM?\n\nBest,\nMaya',
        latestMessageId: 'msg-maya-01'
      }
    }
  };

  // Load documents
  const docsDir = path.join(SEED_DIR, 'documents');
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const doc = loadJson(path.join(docsDir, file));
        if (doc && doc.id) {
          state.documents[doc.id] = doc;
        }
      }
    }
  }

  // Ensure operations token exists
  if (!state.operations.token) {
    state.operations.token = '31327dc1dc65c8407fa0e1926ba83a93c516cbfc030c7212';
  }
}

// Initialize on boot
initMemoryState();

// Helper to read JSON request body
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 5 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-HQ-Token, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Request Handler
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-HQ-Token, Authorization'
    });
    return res.end();
  }

  // ================= API ENDPOINTS =================
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Config
      if (pathname === '/api/config' && req.method === 'GET') {
        return sendJson(res, 200, state.config);
      }

      // 2. Operations
      if (pathname === '/api/operations' && req.method === 'GET') {
        return sendJson(res, 200, state.operations);
      }

      // 3. Workspace
      if (pathname === '/api/workspace' && req.method === 'GET') {
        return sendJson(res, 200, state.workspace);
      }

      // 4. Home Feed & Signals
      if (pathname === '/api/home-feed' && req.method === 'GET') {
        return sendJson(res, 200, state.homeFeed);
      }
      if (pathname === '/api/home-feed/feedback' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, id: body.id, action: body.action });
      }
      if (pathname === '/api/home-feed/taste' && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/home-feed/refresh' && req.method === 'POST') {
        return sendJson(res, 200, state.homeFeed);
      }
      if (pathname === '/api/home-signals' && req.method === 'GET') {
        return sendJson(res, 200, state.homeSignals);
      }

      // 5. Pulse
      if (pathname === '/api/pulse' && req.method === 'GET') {
        return sendJson(res, 200, state.pulse);
      }
      if (pathname === '/api/pulse/refresh' && req.method === 'POST') {
        state.pulse.revision = (state.pulse.revision || 1) + 1;
        state.pulse.sources = (state.pulse.sources || []).map(s => ({
          ...s,
          lastAttempt: new Date().toISOString(),
          lastSuccess: new Date().toISOString(),
          error: null
        }));
        return sendJson(res, 200, state.pulse);
      }

      // 6. Agents
      if (pathname === '/api/agents' && req.method === 'GET') {
        return sendJson(res, 200, state.agents);
      }
      if (pathname === '/api/agents' && req.method === 'POST') {
        const body = await readJsonBody(req);
        state.agents.preferences = { ...state.agents.preferences, ...body };
        return sendJson(res, 200, state.agents);
      }

      // 7. CRM
      if (pathname === '/api/crm' && req.method === 'GET') {
        return sendJson(res, 200, state.crm);
      }
      if (pathname === '/api/crm/calendar' && req.method === 'GET') {
        const relId = searchParams.get('relationshipId');
        return sendJson(res, 200, {
          relationshipId: relId || 'rel:maya',
          available: true,
          events: state.crmCalendar.events || [],
          capturedAt: new Date().toISOString()
        });
      }
      if (pathname === '/api/crm/insights' && req.method === 'GET') {
        return sendJson(res, 200, state.crmInsights);
      }
      if (pathname === '/api/crm/receivables' && req.method === 'GET') {
        return sendJson(res, 200, state.crmReceivables);
      }
      if (pathname === '/api/crm/sequences' && req.method === 'GET') {
        return sendJson(res, 200, state.crmSequences);
      }
      if (pathname === '/api/crm/activity' && req.method === 'POST') {
        const body = await readJsonBody(req);
        if (body.id) {
          // Update existing activity
          const idx = (state.crm.activities || []).findIndex(a => a.id === body.id);
          if (idx !== -1) {
            state.crm.activities[idx] = {
              ...state.crm.activities[idx],
              ...body,
              version: (state.crm.activities[idx].version || 1) + 1
            };
            return sendJson(res, 200, state.crm.activities[idx]);
          }
        }
        // Create new activity
        const newAct = {
          id: crypto.randomUUID(),
          relationshipId: body.relationshipId || 'rel:maya',
          title: body.title || 'Untitled activity',
          type: body.type || 'task',
          due: body.due || new Date().toISOString().split('T')[0],
          status: 'open',
          version: 1,
          createdAt: new Date().toISOString()
        };
        state.crm.activities = state.crm.activities || [];
        state.crm.activities.unshift(newAct);
        return sendJson(res, 200, newAct);
      }
      if (pathname === '/api/crm/opportunity' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const opp = {
          id: crypto.randomUUID(),
          relationshipId: body.relationshipId,
          title: body.title,
          stage: body.stage || 'discovery',
          projectDocumentId: body.projectDocumentId,
          version: 1,
          createdAt: new Date().toISOString()
        };
        state.crm.opportunities = state.crm.opportunities || [];
        state.crm.opportunities.push(opp);
        return sendJson(res, 200, opp);
      }
      if (pathname === '/api/crm/invoice' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const invoice = {
          id: 'invoice:' + crypto.randomUUID().slice(0, 8),
          relationshipId: body.relationshipId,
          title: body.title || 'Custom Invoice',
          reference: body.reference || 'INV-' + Date.now().toString().slice(-4),
          date: body.date || new Date().toISOString().split('T')[0],
          amountMinor: body.amountMinor || 100000,
          currency: body.currency || 'CAD',
          version: 1,
          status: 'open',
          paidMinor: 0,
          outstandingMinor: body.amountMinor || 100000,
          createdAt: new Date().toISOString()
        };
        state.crmReceivables.receivables = state.crmReceivables.receivables || [];
        state.crmReceivables.receivables.push(invoice);
        return sendJson(res, 200, invoice);
      }
      if (pathname === '/api/crm/invoice/correct' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, invoiceId: body.invoiceId });
      }
      if (pathname === '/api/crm/invoice/void' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const inv = (state.crmReceivables.receivables || []).find(r => r.id === body.invoiceId);
        if (inv) inv.status = 'void';
        return sendJson(res, 200, { ok: true, invoiceId: body.invoiceId, status: 'void' });
      }
      if (pathname === '/api/crm/payment' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const payment = {
          id: 'payment:' + crypto.randomUUID().slice(0, 8),
          invoiceId: body.invoiceId,
          relationshipId: body.relationshipId || 'rel:maya',
          amountMinor: body.amountMinor || 10000,
          date: body.date || new Date().toISOString().split('T')[0],
          status: 'recorded',
          version: 1
        };
        state.crmReceivables.payments = state.crmReceivables.payments || [];
        state.crmReceivables.payments.push(payment);
        return sendJson(res, 200, payment);
      }
      if (pathname === '/api/crm/payment/reverse' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, paymentId: body.paymentId, reversed: true });
      }
      if (pathname.startsWith('/api/crm/sequence/') && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/crm/invoice-pdf' && req.method === 'GET') {
        // Return a mock PDF header
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="invoice.pdf"'
        });
        // Simplest valid PDF container
        const emptyPdf = Buffer.from('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000101 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n162\n%%EOF');
        return res.end(emptyPdf);
      }

      // 8. Projects
      if (pathname === '/api/projects' && req.method === 'GET') {
        return sendJson(res, 200, state.projects);
      }
      if (pathname === '/api/projects' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const proj = {
          id: 'project:' + crypto.randomUUID().slice(0, 8),
          title: body.title || 'New Project',
          status: 'active',
          modified: new Date().toISOString().split('T')[0],
          version: 1
        };
        state.projects.projects = state.projects.projects || [];
        state.projects.projects.push(proj);
        return sendJson(res, 200, proj);
      }

      // 9. Documents
      if (pathname === '/api/document' && req.method === 'GET') {
        const docId = searchParams.get('id');
        if (docId && state.documents[docId]) {
          return sendJson(res, 200, state.documents[docId]);
        }
        return sendJson(res, 200, {
          id: docId || 'unknown',
          path: `Workspace/${docId}.md`,
          text: `# Document ${docId}\n\nWorkspace document loaded in HQ.`
        });
      }

      // 10. Assistant
      if (pathname === '/api/assistant' && req.method === 'GET') {
        return sendJson(res, 200, state.assistant);
      }
      if (pathname === '/api/assistant/message' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const userText = body.text || '';
        
        // Add user message
        const userMsg = {
          id: crypto.randomUUID(),
          role: 'user',
          text: userText,
          createdAt: new Date().toISOString()
        };
        state.assistant.messages = state.assistant.messages || [];
        state.assistant.messages.push(userMsg);

        // Generate assistant response
        let replyText = "I've checked the workspace. Northstar is active and reporting automation is ready for review.";
        let command = null;

        const lower = userText.toLowerCase();
        if (lower.includes('project') || lower.includes('northstar')) {
          replyText = "Northstar is on track. The reporting automation is ready for review, the walkthrough is next, and the remaining invoice balance is CAD 2,400.";
          if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) {
            command = { type: 'navigate', route: 'projects' };
          }
        } else if (lower.includes('today') || lower.includes('schedule')) {
          replyText = "Today's top focus is shipping the Northstar reporting walkthrough. Maya Chen is scheduled for a meeting at 2:00 PM.";
        } else if (lower.includes('maya') || lower.includes('relationship') || lower.includes('crm')) {
          replyText = "Maya Chen (Northstar Learning) has 1 open meeting today and 1 outstanding invoice for CAD 2,400.";
          if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) {
            command = { type: 'navigate', route: 'relationships' };
          }
        } else if (lower.includes('metric')) {
          replyText = "All operational signals are green. Delivery velocity is 94% and sequence health is optimal.";
          if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) {
            command = { type: 'navigate', route: 'metrics' };
          }
        } else if (lower.includes('content') || lower.includes('idea')) {
          replyText = "You have 2 content drafts in development: 'The AI operations field guide' and 'Why capacity systems fail quietly'.";
          if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) {
            command = { type: 'navigate', route: 'content' };
          }
        } else if (lower.includes('workflow')) {
          replyText = "Workflows are active. 1 automated task scheduled for tonight.";
          if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) {
            command = { type: 'navigate', route: 'workflows' };
          }
        }

        const assistantMsg = {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: replyText,
          createdAt: new Date().toISOString()
        };
        state.assistant.messages.push(assistantMsg);

        const respPayload = { accepted: true };
        if (command) respPayload.command = command;
        return sendJson(res, 200, respPayload);
      }
      if (pathname === '/api/assistant/new' && req.method === 'POST') {
        state.assistant.messages = [
          {
            id: 'assistant:welcome',
            role: 'assistant',
            text: 'This is the demo workspace. Ask about today, Northstar, content, metrics, or relationships.',
            createdAt: new Date().toISOString()
          }
        ];
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/assistant/undo' && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/assistant/abort' && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/assistant/retry' && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }

      // 11. Today & Captures & Decisions
      if (pathname === '/api/today' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, day: body.day, key: body.key, type: body.type });
      }
      if (pathname === '/api/capture' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const cap = {
          id: 'capture:' + crypto.randomUUID(),
          title: body.title || 'Untitled capture',
          text: body.text || '',
          createdAt: new Date().toISOString()
        };
        state.operations.captures = state.operations.captures || [];
        state.operations.captures.unshift(cap);
        return sendJson(res, 200, cap);
      }
      if (pathname === '/api/decision' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, id: body.id, outcome: body.outcome });
      }
      if (pathname === '/api/followup' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, id: body.id, nextAction: body.nextAction, date: body.date });
      }

      // 12. Delegation
      if (pathname === '/api/delegate' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const delegation = {
          id: 'delegation:' + crypto.randomUUID().slice(0, 8),
          taskKey: body.taskKey,
          objective: body.objective,
          expectedResult: body.expectedResult,
          checkpoint: body.checkpoint,
          status: 'running',
          jobId: 'job:' + crypto.randomUUID().slice(0, 8),
          createdAt: new Date().toISOString()
        };
        state.operations.delegations = state.operations.delegations || [];
        state.operations.delegations.push(delegation);
        state.outputs[delegation.jobId] = {
          output: `Delegation task '${body.objective}' processed successfully by Pi runner.`
        };
        return sendJson(res, 200, delegation);
      }
      if (pathname === '/api/delegation/retry' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, id: body.id });
      }
      if (pathname === '/api/delegation/review' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { ok: true, id: body.id, action: body.action });
      }
      if (pathname === '/api/output' && req.method === 'GET') {
        const jobId = searchParams.get('id');
        if (jobId && state.outputs[jobId]) {
          return sendJson(res, 200, state.outputs[jobId]);
        }
        return sendJson(res, 200, { output: 'Run completed successfully with no warnings.' });
      }

      // 13. Mail & Card Art
      if (pathname === '/api/mail/status' && req.method === 'GET') {
        return sendJson(res, 200, state.mailStatus);
      }
      if (pathname === '/api/mail/thread' && req.method === 'GET') {
        const threadId = searchParams.get('id');
        const thread = state.mailThreads[threadId] || {
          id: threadId,
          from: 'Client <client@example.com>',
          replyTo: 'client@example.com',
          subject: 'Client inquiry',
          body: 'Hi, checking in on the project status.',
          latestMessageId: 'msg-default'
        };
        return sendJson(res, 200, thread);
      }
      if (pathname === '/api/mail/send' && req.method === 'POST') {
        const body = await readJsonBody(req);
        return sendJson(res, 200, { sent: true, requestId: body.requestId });
      }
      if (pathname === '/api/card-art/status' && req.method === 'GET') {
        return sendJson(res, 200, state.cardArt);
      }
      if (pathname === '/api/card-art' && req.method === 'POST') {
        return sendJson(res, 200, { ok: true });
      }
      if (pathname === '/api/card-art/reset' && req.method === 'POST') {
        state.cardArt = { slots: {} };
        return sendJson(res, 200, { ok: true });
      }

      // 14. Device handoff & Voice & Reset
      if (pathname === '/api/device-handoff' && req.method === 'GET') {
        return sendJson(res, 200, state.deviceHandoff);
      }
      if (pathname === '/api/device-handoff' && req.method === 'POST') {
        const body = await readJsonBody(req);
        state.deviceHandoff = { ...state.deviceHandoff, ...body };
        return sendJson(res, 200, state.deviceHandoff);
      }
      if (pathname === '/api/voice/transcribe' && req.method === 'POST') {
        return sendJson(res, 200, { text: "Review the reporting walkthrough." });
      }
      if (pathname === '/api/demo/reset' && req.method === 'POST') {
        initMemoryState();
        return sendJson(res, 200, { reset: true });
      }

      // Unknown API route fallback
      return sendJson(res, 404, { error: `Endpoint ${pathname} not found` });
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      return sendJson(res, 500, { error: apiErr.message || 'Internal server error' });
    }
  }

  // ================= STATIC ASSET SERVING =================
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  }

  // If path has no extension and index.html exists in that directory
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  // Check file existence
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Stream the file
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to index.html for SPA hash routing
  const fallbackIndex = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(fallbackIndex).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  EMAI HQ Website Recreated Successfully! `);
  console.log(`  Local server running at:`);
  console.log(`  http://localhost:${PORT}/#hq`);
  console.log(`========================================\n`);
});
