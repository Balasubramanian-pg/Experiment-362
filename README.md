# EMAI HQ (Recreated)

A pixel-perfect, fully functional recreation of **[EMAI HQ](https://hq.easymachineai.com/#hq)** (EasyMachineAI HQ) — an executive operating system and AI workflow hub.

---

## ✨ Features & Capabilities

- **Command Center (`#hq` / Home)**:
  - Daily plan focus, priority commitments, and checklist status
  - Curated home feed with topic-based recommendations and attention items
  - Real-time pulse monitoring with background refresh indicators
  - Quick note and thought capture docking drawer
  - Immediate notification dispatch for decisions and critical blockers

- **Projects Workspace (`#projects`)**:
  - Active deliverables, milestones, and client-linked projects (e.g. *Northstar Launch*)
  - Task status tracking, linked documents, revisions, and deliverable review
  - Integrated document viewer for markdown workspace briefs

- **Client CRM & Relationships (`#relationships`)**:
  - Client dossiers (Maya Chen, Jonah Brooks, Priya Raman)
  - Activity timelines, meetings, and next scheduled actions
  - Accounts receivable, milestones, currencies (CAD, USD, EUR, etc.), and payment tracking
  - Sequence workflows and follow-up engines

- **Content Director (`#content`)**:
  - Content pipeline for long-form video, thought leadership, and newsletters
  - Status progression from idea capture to developing, draft, review, and published
  - Idea evidence linking and source notes

- **Metrics & Telemetry (`#metrics`)**:
  - Delivery velocity, signal telemetry, sequence health, and correlation views
  - Custom metric sets and card layouts

- **Workflows & Delegation (`#workflows`)**:
  - Autonomous task delegation to the Pi runner
  - Review, retry, and accept delegated outputs
  - Scheduled automations and external triggers

- **AI Assistant Drawer**:
  - Context-aware copilot answering workspace questions (Northstar, schedule, finances, contacts)
  - Voice transcription simulation and route navigation shortcuts (`"go to projects"`, `"open relationships"`)
  - Undo and message history management

- **Productivity Extras**:
  - **Jump Palette (`Cmd+K` / `Ctrl+K`)**: Instant search and navigation across all modules
  - **Interactive Demo Guide**: Step-by-step interactive onboarding modal with demo reset
  - **Canvas & Theme Customization**: Theme switcher with 7 bundled high-resolution artworks
  - **Motion Modes**: Reduced-motion compliance (`auto`, `calm`, `full`)
  - **Device Handoff**: Cross-device state synchronizer

---

## 🚀 Quick Start

This project is built to run **with zero external dependencies** using native Node.js.

### Prerequisites
- Node.js v18.0.0 or higher (tested on Node v22.19)

### 1. Start the Server
```bash
node server.js
```
*Or using npm:*
```bash
npm start
```

### 2. Open the Application
Navigate in your browser to:
```
http://localhost:3000/#hq
```

---

## 🧪 Testing & Verification

Run the built-in test suite:
```bash
npm test
```
*Or:*
```bash
node test.js
```

The test suite verifies:
- Serving of all HTML, CSS, fonts, and JS bundles
- Resolution of theme artwork assets
- Functionality of all core REST APIs (config, ops, CRM, projects, assistant, etc.)
- Message submission to the assistant copilot

---

## 📁 Repository Structure

```
.
├── server.js              # Native Node.js HTTP server & stateful REST API backend
├── package.json           # Project manifest & npm scripts
├── test.js                # Built-in verification test suite
├── README.md              # Documentation
├── public/                # Static web assets
│   ├── index.html         # HTML root container with viewport and metadata
│   ├── hyperplex.css      # Core hyperplex grid layout styling
│   ├── hq.css             # EMAI HQ design system, themes, and animations
│   ├── demo-guide.css     # Demo guide modal & onboarding overlay styling
│   ├── hyperplex-review.js# Full React single-page application bundle
│   ├── fonts/             # Self-hosted Rubik & Work Sans woff2 font files
│   ├── vendor/            # React 18, ReactDOM, and classnames libraries
│   └── theme-1/           # High-resolution theme artworks (7 WebP assets)
└── data/
    └── seed/              # Seed JSON data & documents matching live demo
        ├── agents.json
        ├── assistant.json
        ├── card-art_status.json
        ├── config.json
        ├── crm.json
        ├── crm_calendar.json
        ├── crm_insights.json
        ├── crm_receivables.json
        ├── crm_sequences.json
        ├── device-handoff.json
        ├── home-feed.json
        ├── home-signals.json
        ├── mail_status.json
        ├── operations.json
        ├── projects.json
        ├── pulse.json
        ├── workspace.json
        └── documents/     # Workspace markdown documents
```

---

## 🔌 API Endpoints Reference

| Route | Method | Description |
|---|---|---|
| `/api/config` | GET | Workspace vocabulary, profile & features |
| `/api/operations` | GET | Operational state, tasks, token, attention items |
| `/api/workspace` | GET | Catalog of ideas, references, tools, and artifacts |
| `/api/home-feed` | GET, POST | Feed items, taste settings, and feedback |
| `/api/pulse` | GET, POST | Telemetry health and pulse refresh |
| `/api/agents` | GET, POST | Agent runners and execution preferences |
| `/api/crm` | GET | CRM contacts, activities, and opportunities |
| `/api/crm/activity` | POST | Create, complete, cancel, or reschedule activities |
| `/api/crm/receivables`| GET | Receivables, invoices, and payments |
| `/api/crm/invoice` | POST | Create or correct invoices |
| `/api/projects` | GET, POST | Projects and deliverable tracking |
| `/api/document` | GET | Fetch markdown workspace document by `?id=...` |
| `/api/assistant` | GET | Chat history, active requests, and voice status |
| `/api/assistant/message` | POST | Process copilot queries and navigation commands |
| `/api/capture` | POST | Quick note capture to workspace |
| `/api/delegate` | POST | Dispatch automated tasks to Pi runner |
| `/api/demo/reset` | POST | Reset in-memory database to seed state |
