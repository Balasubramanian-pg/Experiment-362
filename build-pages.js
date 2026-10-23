import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SEED_DIR = path.join(ROOT_DIR, 'data', 'seed');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

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

console.log('Building static site for GitHub Pages...');

// 1. Prepare dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// 2. Copy public assets to dist
copyDirSync(PUBLIC_DIR, DIST_DIR);

// 3. Load seed data
const seedData = {
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
  documents: {}
};

const docsDir = path.join(SEED_DIR, 'documents');
if (fs.existsSync(docsDir)) {
  const files = fs.readdirSync(docsDir);
  for (const file of files) {
    if (file.endsWith('.json')) {
      const doc = loadJson(path.join(docsDir, file));
      if (doc && doc.id) {
        seedData.documents[doc.id] = doc;
      }
    }
  }
}

// 4. Generate dist/mock-api.js
const mockApiJs = `/**
 * EMAI HQ - Client-Side Mock API & Base Path Resolver
 * Enables 100% standalone execution on GitHub Pages without requiring a backend server.
 */
(() => {
  // Determine repository base path (e.g. '/Experiment-362/' or '/')
  const currentPath = window.location.pathname;
  const match = currentPath.match(/^(\\/[^\\/]+\\/)/);
  const basePath = (match && match[1] && !match[1].startsWith('/api/')) ? match[1] : '/';

  console.log('[EMAI HQ] Client-side runtime initialized. Base path:', basePath);

  // In-memory application state
  const SEED_DATA = ${JSON.stringify(seedData)};
  // Fix 08: Enforce passive event listeners on scroll and touch events
  const origAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
    if (passiveEvents.includes(type)) {
      if (typeof options === 'boolean') {
        options = { capture: options, passive: true };
      } else if (typeof options === 'object' && options !== null) {
        if (options.passive === undefined) {
          options = { ...options, passive: true };
        }
      } else {
        options = { passive: true };
      }
    }
    return origAddEventListener.call(this, type, listener, options);
  };

  // Fix 10: Fast structuredClone fallback for state initialization
  const cloneState = (data) => {
    if (typeof structuredClone === 'function') {
      try { return structuredClone(data); } catch(e) {}
    }
    return JSON.parse(JSON.stringify(data));
  };
  let state = cloneState(SEED_DATA);

  // Fix 11: Debounce window resize and motion events using requestAnimationFrame
  const origDispatchEvent = window.dispatchEvent.bind(window);
  const pendingRAFEvents = new Set();
  window.dispatchEvent = function(evt) {
    if (['resize', 'hq:motion'].includes(evt.type)) {
      if (pendingRAFEvents.has(evt.type)) return true;
      pendingRAFEvents.add(evt.type);
      requestAnimationFrame(() => {
        pendingRAFEvents.delete(evt.type);
        origDispatchEvent(evt);
      });
      return true;
    }
    return origDispatchEvent(evt);
  };

  // Fix 13: Background idle pre-caching for secondary theme artworks
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => {
      const secondaryThemes = [
        'content.webp',
        'feed.webp',
        'metrics.webp',
        'relationships.webp',
        'today.webp',
        'workflows.webp'
      ];
      for (const imgName of secondaryThemes) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = basePath + 'theme-1/' + imgName;
        document.head.appendChild(link);
      }
    }, { timeout: 3000 });
  }

  // Hook element creation to adapt dynamic absolute paths (e.g. /demo-guide.css or /theme-1/...)
  const origCreateElement = document.createElement.bind(document);
  document.createElement = function(tagName, options) {
    const el = origCreateElement(tagName, options);
    if (basePath !== '/') {
      if (tagName.toLowerCase() === 'link') {
        const origSetAttribute = el.setAttribute.bind(el);
        el.setAttribute = function(name, val) {
          if (name === 'href' && typeof val === 'string' && val.startsWith('/') && !val.startsWith(basePath)) {
            val = basePath + val.slice(1);
          }
          return origSetAttribute(name, val);
        };
        Object.defineProperty(el, 'href', {
          set(val) {
            if (typeof val === 'string' && val.startsWith('/') && !val.startsWith(basePath)) {
              val = basePath + val.slice(1);
            }
            origSetAttribute('href', val);
          },
          get() {
            return el.getAttribute('href') || '';
          }
        });
      }
    }
    return el;
  };

  // Intercept window.fetch
  const origFetch = window.fetch.bind(window);
  window.fetch = async function(input, init = {}) {
    let urlStr = typeof input === 'string' ? input : (input?.url || '');

    // Normalize URL
    try {
      const parsed = new URL(urlStr, window.location.origin);
      let pathname = parsed.pathname;

      // Strip repo base path if present
      if (basePath !== '/' && pathname.startsWith(basePath)) {
        pathname = '/' + pathname.slice(basePath.length);
      }

      // Check if it's an API call
      if (pathname.startsWith('/api/')) {
        const method = (init.method || 'GET').toUpperCase();
        const searchParams = parsed.searchParams;

        let body = {};
        if (init.body && typeof init.body === 'string') {
          try { body = JSON.parse(init.body); } catch(e) {}
        }

        // Helper to return JSON Response
        const jsonRes = (data, status = 200) => {
          return new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
        };

        // 1. Config
        if (pathname === '/api/config') return jsonRes(state.config);

        // 2. Operations
        if (pathname === '/api/operations') return jsonRes(state.operations);

        // 3. Workspace
        if (pathname === '/api/workspace') return jsonRes(state.workspace);

        // 4. Home Feed & Signals
        if (pathname === '/api/home-feed') return jsonRes(state.homeFeed);
        if (pathname === '/api/home-signals') return jsonRes(state.homeSignals);
        if (pathname === '/api/home-feed/feedback') return jsonRes({ ok: true, id: body.id, action: body.action });
        if (pathname === '/api/home-feed/taste') return jsonRes({ ok: true });
        if (pathname === '/api/home-feed/refresh') return jsonRes(state.homeFeed);

        // 5. Pulse
        if (pathname === '/api/pulse') return jsonRes(state.pulse);
        if (pathname === '/api/pulse/refresh') {
          state.pulse.revision = (state.pulse.revision || 1) + 1;
          return jsonRes(state.pulse);
        }

        // 6. Agents
        if (pathname === '/api/agents') {
          if (method === 'POST') state.agents.preferences = { ...state.agents.preferences, ...body };
          return jsonRes(state.agents);
        }

        // 7. CRM
        if (pathname === '/api/crm') return jsonRes(state.crm);
        if (pathname === '/api/crm/calendar') {
          const relId = searchParams.get('relationshipId') || 'rel:maya';
          return jsonRes({ relationshipId: relId, available: true, events: state.crmCalendar.events || [] });
        }
        if (pathname === '/api/crm/insights') return jsonRes(state.crmInsights);
        if (pathname === '/api/crm/receivables') return jsonRes(state.crmReceivables);
        if (pathname === '/api/crm/sequences') return jsonRes(state.crmSequences);
        if (pathname === '/api/crm/activity') {
          const newAct = {
            id: body.id || crypto.randomUUID(),
            relationshipId: body.relationshipId || 'rel:maya',
            title: body.title || 'Activity',
            type: body.type || 'task',
            due: body.due || new Date().toISOString().split('T')[0],
            status: body.status || 'open',
            version: 1
          };
          state.crm.activities = state.crm.activities || [];
          state.crm.activities.unshift(newAct);
          return jsonRes(newAct);
        }
        if (pathname === '/api/crm/opportunity') return jsonRes({ id: crypto.randomUUID(), ...body });
        if (pathname === '/api/crm/invoice') return jsonRes({ id: 'invoice:' + crypto.randomUUID().slice(0, 8), ...body });
        if (pathname === '/api/crm/invoice/correct' || pathname === '/api/crm/invoice/void') return jsonRes({ ok: true });
        if (pathname === '/api/crm/payment' || pathname === '/api/crm/payment/reverse') return jsonRes({ ok: true });
        if (pathname.startsWith('/api/crm/sequence/')) return jsonRes({ ok: true });

        // 8. Projects
        if (pathname === '/api/projects') {
          if (method === 'POST') {
            const p = { id: 'project:' + crypto.randomUUID().slice(0, 8), title: body.title || 'New Project', status: 'active', version: 1 };
            state.projects.projects.push(p);
            return jsonRes(p);
          }
          return jsonRes(state.projects);
        }

        // 9. Document
        if (pathname === '/api/document') {
          const docId = searchParams.get('id');
          if (docId && state.documents[docId]) {
            return jsonRes(state.documents[docId]);
          }
          return jsonRes({ id: docId, path: 'Workspace/' + docId + '.md', text: '# ' + docId + '\\n\\nDocument loaded in HQ.' });
        }

        // 10. Assistant
        if (pathname === '/api/assistant') return jsonRes(state.assistant);
        if (pathname === '/api/assistant/message') {
          const text = body.text || '';
          const userMsg = { id: crypto.randomUUID(), role: 'user', text, createdAt: new Date().toISOString() };
          state.assistant.messages = state.assistant.messages || [];
          state.assistant.messages.push(userMsg);

          let reply = "I've checked the workspace. Northstar is active and reporting automation is ready for review.";
          let command = null;
          const lower = text.toLowerCase();
          if (lower.includes('project') || lower.includes('northstar')) {
            reply = "Northstar is on track. The reporting automation is ready for review, the walkthrough is next, and the remaining invoice balance is CAD 2,400.";
            if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) command = { type: 'navigate', route: 'projects' };
          } else if (lower.includes('today') || lower.includes('schedule')) {
            reply = "Today's top focus is shipping the Northstar reporting walkthrough. Maya Chen is scheduled for a meeting at 2:00 PM.";
          } else if (lower.includes('maya') || lower.includes('crm') || lower.includes('relationship')) {
            reply = "Maya Chen (Northstar Learning) has 1 open meeting today and 1 outstanding invoice for CAD 2,400.";
            if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) command = { type: 'navigate', route: 'relationships' };
          } else if (lower.includes('metric')) {
            reply = "All operational signals are green. Delivery velocity is 94% and sequence health is optimal.";
            if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) command = { type: 'navigate', route: 'metrics' };
          } else if (lower.includes('content') || lower.includes('idea')) {
            reply = "You have 2 content drafts in development: 'The AI operations field guide' and 'Why capacity systems fail quietly'.";
            if (lower.includes('go to') || lower.includes('open') || lower.includes('show')) command = { type: 'navigate', route: 'content' };
          }

          const assistantMsg = { id: crypto.randomUUID(), role: 'assistant', text: reply, createdAt: new Date().toISOString() };
          state.assistant.messages.push(assistantMsg);
          const resPayload = { accepted: true };
          if (command) resPayload.command = command;
          return jsonRes(resPayload);
        }
        if (pathname === '/api/assistant/new') {
          state.assistant.messages = [
            { id: 'assistant:welcome', role: 'assistant', text: 'This is the demo workspace. Ask about today, Northstar, content, metrics, or relationships.' }
          ];
          return jsonRes({ ok: true });
        }
        if (pathname === '/api/assistant/undo' || pathname === '/api/assistant/abort' || pathname === '/api/assistant/retry') {
          return jsonRes({ ok: true });
        }

        // 11. Today, Captures, Decisions, Followups
        if (pathname === '/api/today') return jsonRes({ ok: true, day: body.day, key: body.key });
        if (pathname === '/api/capture') {
          const cap = { id: 'capture:' + crypto.randomUUID(), title: body.title, text: body.text, createdAt: new Date().toISOString() };
          state.operations.captures = state.operations.captures || [];
          state.operations.captures.unshift(cap);
          return jsonRes(cap);
        }
        if (pathname === '/api/decision') return jsonRes({ ok: true, id: body.id, outcome: body.outcome });
        if (pathname === '/api/followup') return jsonRes({ ok: true });
        if (pathname === '/api/delegate' || pathname === '/api/delegation/retry' || pathname === '/api/delegation/review') {
          return jsonRes({ ok: true, id: body.id || crypto.randomUUID(), status: 'completed' });
        }
        if (pathname === '/api/output') return jsonRes({ output: 'Run completed successfully with no warnings.' });

        // 12. Card Art & Mail & Device Handoff
        if (pathname === '/api/mail/status') return jsonRes(state.mailStatus);
        if (pathname === '/api/mail/thread') return jsonRes({ id: searchParams.get('id'), from: 'client@example.com', subject: 'Project review', body: 'Looks great!' });
        if (pathname === '/api/mail/send') return jsonRes({ sent: true });
        if (pathname === '/api/card-art/status') return jsonRes(state.cardArt);
        if (pathname === '/api/card-art' || pathname === '/api/card-art/reset') return jsonRes({ ok: true });
        if (pathname === '/api/device-handoff') return jsonRes(state.deviceHandoff);

        // 13. Voice & Reset
        if (pathname === '/api/voice/transcribe') return jsonRes({ text: "Review the reporting walkthrough." });
        if (pathname === '/api/demo/reset') {
          state = cloneState(SEED_DATA);
          return jsonRes({ reset: true });
        }

        return jsonRes({ error: 'Endpoint ' + pathname + ' not found' }, 404);
      }

      // Check if it's an asset with a leading slash on a subpath (e.g. /theme-1/... or /demo-guide.css)
      if (basePath !== '/' && (pathname.startsWith('/theme-1/') || pathname === '/demo-guide.css' || pathname.startsWith('/fonts/'))) {
        const redirected = basePath + pathname.slice(1);
        return origFetch(redirected, init);
      }
    } catch(err) {
      console.error('[EMAI HQ] Fetch intercept error:', err);
    }

    return origFetch(input, init);
  };
})();
`;

fs.writeFileSync(path.join(DIST_DIR, 'mock-api.js'), mockApiJs, 'utf-8');

// 5. Update dist/index.html to use relative paths and load mock-api.js
let indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

// Add mock-api.js before vendor/react.js
indexHtml = indexHtml.replace(
  "<script src='/vendor/react.js'></script>",
  "<script src='./mock-api.js'></script>\n    <script src='./vendor/react.js'></script>"
);

// Replace absolute /paths with relative ./paths in index.html
indexHtml = indexHtml.replace(/href="\/fonts\//g, 'href="./fonts/');
indexHtml = indexHtml.replace(/href="\/hyperplex\.css"/g, 'href="./hyperplex.css"');
indexHtml = indexHtml.replace(/href="\/hq\.css\?v=muvlxbte"/g, 'href="./hq.css?v=muvlxbte"');
indexHtml = indexHtml.replace(/src='\/vendor\//g, "src='./vendor/");
indexHtml = indexHtml.replace(/src="\/hyperplex-review\.js\?v=muvlxbte"/g, 'src="./hyperplex-review.js?v=muvlxbte"');

// Fix 15: Optimize HTML by collapsing redundant spaces and trimming comments
indexHtml = indexHtml.replace(/<!--(?!\s*Fix\b)[\s\S]*?-->/g, '').replace(/\n\s*\n/g, '\n');
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml, 'utf-8');

// 6. Make 404.html (exact copy of index.html for SPA fallback on GitHub Pages)
fs.writeFileSync(path.join(DIST_DIR, '404.html'), indexHtml, 'utf-8');

// 7. Add .nojekyll so Jekyll doesn't ignore any folders
fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf-8');

// 8. Adjust dist/fonts/fonts.css to use relative paths
let fontsCss = fs.readFileSync(path.join(DIST_DIR, 'fonts', 'fonts.css'), 'utf-8');
fontsCss = fontsCss.replace(/url\('\/fonts\//g, "url('./");
fs.writeFileSync(path.join(DIST_DIR, 'fonts', 'fonts.css'), fontsCss, 'utf-8');

// 9. Adjust dist/hq.css to use relative theme-1 path
let hqCss = fs.readFileSync(path.join(DIST_DIR, 'hq.css'), 'utf-8');
hqCss = hqCss.replace(/url\(\/theme-1\//g, 'url(./theme-1/');
fs.writeFileSync(path.join(DIST_DIR, 'hq.css'), hqCss, 'utf-8');

console.log('GitHub Pages build complete in ./dist directory!');

// Copy compiled static files directly to repository root for root deployment
for (const item of fs.readdirSync(DIST_DIR)) {
  const src = path.join(DIST_DIR, item);
  const dst = path.join(ROOT_DIR, item);
  if (fs.statSync(src).isDirectory()) {
    copyDirSync(src, dst);
  } else {
    fs.copyFileSync(src, dst);
  }
}
console.log('Copied distribution files to repository root for root deployment!');

