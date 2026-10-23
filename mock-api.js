/**
 * EMAI HQ - Client-Side Mock API & Base Path Resolver
 * Enables 100% standalone execution on GitHub Pages without requiring a backend server.
 */
(() => {
  // Determine repository base path (e.g. '/Experiment-362/' or '/')
  const currentPath = window.location.pathname;
  const match = currentPath.match(/^(\/[^\/]+\/)/);
  const basePath = (match && match[1] && !match[1].startsWith('/api/')) ? match[1] : '/';

  console.log('[EMAI HQ] Client-side runtime initialized. Base path:', basePath);

  // In-memory application state
  const SEED_DATA = {"agents":{"available":true,"runtimes":[{"id":"pi","name":"Demo runner","available":true,"capabilities":{"models":true,"thinkingLevels":["low","medium","high"],"tools":false},"auth":[{"provider":"demo","configured":true}],"setup":{"oauth":"In your own HQ you sign in to the provider you choose. The demo makes no model calls.","apiKey":"HQ never collects or stores API keys.","changesCredentials":false}}],"models":[{"provider":"demo","id":"demo-model","label":"Demo model · no calls are made","thinkingLevels":["low","medium","high"]}],"auth":[{"provider":"demo","configured":true}],"preferences":{"runner":"pi","model":"demo/demo-model","thinking":"medium"},"connectionStatus":"Demo runner connected. Every run returns a scripted receipt; no model is called."},"assistant":{"messages":[{"id":"assistant:welcome","role":"assistant","text":"This is the demo workspace. Ask about today, Northstar, content, metrics, or relationships.","createdAt":"2026-10-23T10:28:49.119Z"}],"receipts":[],"activeRequest":null,"previews":[],"voice":{"available":false,"reason":"Voice is disabled in the hosted demo."},"evidenceCache":{"entries":0,"bytes":0}},"cardArt":{"slots":[]},"config":{"configured":true,"configuration":{"profile":{"name":"EMAI HQ Demo"},"vocabulary":{"home":"Home","projects":"Projects","relationships":"Relationships"},"features":{"demo":true}}},"crm":{"available":true,"activities":[{"id":"576556b1-2ed5-4279-86c5-229f7803c330","relationshipId":"rel:maya","idempotencyKey":"seed:maya-review","title":"Review reporting walkthrough with Maya","type":"meeting","due":"2026-10-23","status":"open","version":1,"createdAt":"2026-10-23T10:28:46.913Z","updatedAt":"2026-10-23T10:28:46.913Z","events":[{"at":"2026-10-23T10:28:46.913Z","from":null,"status":"open","due":"2026-10-23","title":"Review reporting walkthrough with Maya"}]},{"id":"3916364f-5bd6-4133-bf0e-5c1ce408553a","relationshipId":"rel:jonah","idempotencyKey":"seed:jonah-outline","title":"Send scoped workshop outline","type":"email","due":"2026-10-25","status":"waiting","version":1,"createdAt":"2026-10-23T10:28:46.913Z","updatedAt":"2026-10-23T10:28:46.913Z","events":[{"at":"2026-10-23T10:28:46.913Z","from":null,"status":"waiting","due":"2026-10-25","title":"Send scoped workshop outline"}]},{"id":"e52165df-f265-4e2d-8ab4-e8636110958c","relationshipId":"rel:priya","idempotencyKey":"seed:priya-brief","title":"Review collaboration brief","type":"task","due":"2026-10-27","status":"open","version":1,"createdAt":"2026-10-23T10:28:46.913Z","updatedAt":"2026-10-23T10:28:46.913Z","events":[{"at":"2026-10-23T10:28:46.913Z","from":null,"status":"open","due":"2026-10-27","title":"Review collaboration brief"}]}],"stages":{"rel:maya":{"stage":"won","version":1,"updatedAt":"2026-10-23T10:28:46.913Z","origin":"HQ user choice"},"rel:jonah":{"stage":"discovery","version":1,"updatedAt":"2026-10-23T10:28:46.913Z","origin":"HQ user choice"}},"email":null,"emailSignals":[],"sequences":[],"opportunities":[],"sendingEnabled":false,"cacheLocation":"Local machine; outside vault sync","stageOptions":["lead","discovery","proposal","negotiation","won","lost"]},"crmCalendar":{"relationshipId":null,"available":true,"events":[],"capturedAt":"2026-10-23T10:28:47.224Z"},"crmInsights":{"suggestions":[{"kind":"review","rank":1,"date":"2026-10-23","id":"invoice:invoice:northstar-02:1","relationshipId":"rel:maya","lane":"billing","glyph":"save","invoice":{"title":"Northstar Launch · Milestone 2","currency":"CAD","outstandingMinor":240000,"due":"2026-10-28","sourceChanged":false},"label":"Review invoice balance","actionTitle":"Review payment evidence: Northstar Launch · Milestone 2","type":"payment-check","evidenceId":"invoice:northstar-02","evidenceAt":"2026-10-09T16:00:00.000Z","evidenceDate":"2026-10-09","reason":"CAD 2400.00 remaining in the local ledger · due 2026-10-28. No payment record yet, which is not proof it is unpaid."}],"errors":[],"sendingEnabled":false},"crmReceivables":{"available":true,"receivables":[{"id":"invoice:northstar-02","relationshipId":"rel:maya","title":"Northstar Launch · Milestone 2","reference":"NS-2026-02","currency":"CAD","amountMinor":480000,"date":"2026-10-09","due":"2026-10-28","fieldsManuallyConfirmed":true,"version":1,"createdAt":"2026-10-09T16:00:00.000Z","sourcePdf":"output/pdf/northstar-invoice-02.pdf","sourceSha256":"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","sentEvidenceReference":"Demo email evidence","sentStatus":"manual-reference-only","events":[],"paidMinor":240000,"outstandingMinor":240000,"status":"partial","sourceChanged":false}],"payments":[{"id":"payment:northstar-deposit","invoiceId":"invoice:northstar-02","relationshipId":"rel:maya","currency":"CAD","amountMinor":240000,"date":"2026-10-12","reviewed":true,"status":"recorded","version":1,"evidenceReference":"DEMO-TRX-2400","events":[]}],"sourcePdfs":["output/pdf/northstar-invoice-02.pdf"],"currencies":["CAD","USD","EUR","GBP","AUD","NZD","CHF"],"sendingEnabled":false,"bankConnected":false,"cacheLocation":"Local machine; outside vault sync","sourceDetails":[{"sourcePdf":"output/pdf/northstar-invoice-02.pdf","identityConfirmationRequired":true}]},"crmSequences":{"sequences":[],"sendingEnabled":false},"deviceHandoff":{"available":false,"devices":[]},"homeFeed":{"items":[{"id":"feed:northstar","kind":"project-risk","topic":"project","tags":["northstar","launch"],"title":"Northstar walkthrough is the launch dependency","body":"Reporting automation is ready for review before recording.","sourceType":"demo workspace","route":"projects","projectId":"project:northstar","priority":96},{"id":"feed:handoffs","kind":"public","topic":"operations","tags":["handoffs","operations"],"title":"The hidden cost of unclear handoffs","body":"Operations Weekly argues that small teams lose momentum when ownership changes are implicit. A useful evidence pattern for the field-guide story: make every handoff explicit and dated.","sourceType":"public signal","sources":["https://example.com/operations/handoffs"],"created":"2026-10-23T09:00:00-07:00","priority":84},{"id":"feed:idea","kind":"idea","topic":"content","tags":["field guide","proof"],"title":"The AI operations field guide","body":"Use the Northstar launch as the connected proof story.","sourceType":"demo workspace","route":"content","sourceId":"demo:idea:field-guide","priority":72}],"preferences":{"hidden":[],"pinned":[],"topics":{},"taste":{"interests":["AI operations","creator systems"],"avoid":[]}},"sourceStatus":{"collectedAt":"2026-10-23T10:28:45.076Z","errors":[],"videoEvidenceAt":"2026-10-23T08:45:00-07:00"},"postsPath":"Demo Workspace/Feed"},"homeSignals":{"items":[]},"mailStatus":{"connected":true,"canSend":true,"address":"demo@emaihq.example","mode":"demo","notice":"Demo mode — messages create a local receipt and are never sent."},"operations":{"actions":[{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"ask-pi","title":"Ask the assistant","description":"Ask a question using your tasks, business readings and content evidence.","aliases":["ask pi"],"runner":"pi","mode":"answer","model":null,"thinking":"medium","risk":"read","permissions":["workspace:read"],"agentId":"pi","local":false},{"skill":"/research","agent":true,"toolMode":"project-workflow","schedulable":false,"id":"research","title":"Research","description":"Build or continue a citation-backed evidence pack from a topic, question, and search criteria.","aliases":["research","run research"],"runner":"pi","mode":"workflow","model":null,"thinking":"high","risk":"tool-run","permissions":["network:read","workspace:read","workspace:write"],"agentId":"evidence-researcher","local":false},{"skill":null,"agent":false,"toolMode":"local","schedulable":true,"id":"calendar-refresh","title":"Refresh Google Calendar","description":"Retrieve upcoming events through the existing Google connection.","aliases":["refresh my calendar","refresh google calendar"],"runner":"local","mode":"local","model":null,"thinking":"off","risk":"local-write","permissions":["calendar:read","workspace:write"],"agentId":"local","local":true},{"skill":null,"agent":false,"toolMode":"local","schedulable":true,"id":"traffic-rebuild","title":"Rebuild traffic evidence","description":"Reconcile recorded daily, publishing and platform evidence into the traffic ledger.","aliases":["rebuild traffic evidence","refresh traffic evidence"],"runner":"local","mode":"local","model":null,"thinking":"off","risk":"local-write","permissions":["workspace:read","workspace:write"],"agentId":"local","local":true},{"skill":null,"agent":false,"toolMode":"local","schedulable":true,"id":"signal-scan","title":"Scan public signals","description":"Run the existing free-source collector; report coverage and source failures.","aliases":["scan public signals","refresh public signals"],"runner":"local","mode":"local","model":null,"thinking":"off","risk":"local-write","permissions":["network:read","workspace:write"],"agentId":"local","local":true},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"develop-signal","title":"Develop a selected reference","description":"Turn a selected source or proven video into a brief with evidence and gaps.","aliases":["develop this reference","develop selected reference"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["content:read","workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"daily-brief","title":"Plan the day","description":"Turn the latest tasks and calendar snapshot into a planning draft.","aliases":["plan my day","plan the day"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"content-brief","title":"Develop a content brief","description":"Develop a selected idea using its saved source and references.","aliases":["develop a content brief","write a content brief"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["content:read","workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"followup-plan","title":"Prepare follow-ups","description":"Draft next steps for the reviewed decisions and recorded relationships.","aliases":["prepare follow-ups","plan my follow-ups"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["relationships:read","workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"weekly-review","title":"Review the week","description":"Summarize the last seven daily records, open tasks and recorded activity.","aliases":["review my week","weekly review"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"metric-review","title":"Explain the metric evidence","description":"Review audience and publishing readings, coverage and paired changes.","aliases":["explain my metrics","review metric evidence"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["metrics:read","workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":true,"toolMode":"restricted","schedulable":true,"id":"project-review","title":"Review project","description":"Review one selected project and propose the next useful moves from recorded evidence.","aliases":["review project"],"runner":"pi","mode":"workflow","model":null,"thinking":"medium","risk":"model-run","permissions":["workspace:read"],"agentId":"pi","local":false},{"skill":null,"agent":false,"toolMode":"local","schedulable":true,"id":"workspace-check","title":"Check workspace sources","description":"Refresh local records and write a source-coverage report.","aliases":["check workspace sources","check my workspace"],"runner":"local","mode":"local","model":null,"thinking":"off","risk":"read","permissions":["workspace:read"],"agentId":"local","local":false}],"runtime":{"name":"Pi","available":true,"scheduledWhileOpen":true},"access":null,"externalSchedules":{"status":"unavailable","items":[],"checkedAt":"2026-10-23T10:28:44.463Z","available":false,"notice":"System schedules are not read in the click-around demo. Your own HQ lists the routines registered on your computer here."},"captures":[],"today":{"day":"2026-10-23","revision":1,"accepted":true,"queue":[{"key":"abb1c25bec6ae0b599d633d6","title":"Review Northstar reporting automation","kind":"daily-task","origin":{"type":"daily-task","id":"demo:daily:today:abb1c25bec6ae0b599d633d6","route":"tasks","documentId":"demo:daily:today","taskLocator":"abb1c25bec6ae0b599d633d6","sourceTaskId":null,"sourceRevision":null},"reason":"Written for the selected day.","freshness":"Source 2026-10-23","eligibleDay":"2026-10-23","completionMode":"hq-overlay","sourceTaskId":"task:reporting","sourceRevision":null,"documentId":"demo:daily:today","sourceDate":"2026-10-23","sourceDone":false,"label":"","workDate":"2026-10-23"},{"key":"42bb3ec69fd48537e8f00df9","title":"Record the client walkthrough","kind":"daily-task","origin":{"type":"daily-task","id":"demo:daily:today:42bb3ec69fd48537e8f00df9","route":"tasks","documentId":"demo:daily:today","taskLocator":"42bb3ec69fd48537e8f00df9","sourceTaskId":null,"sourceRevision":null},"reason":"Written for the selected day.","freshness":"Source 2026-10-23","eligibleDay":"2026-10-23","completionMode":"hq-overlay","sourceTaskId":"task:walkthrough","sourceRevision":null,"documentId":"demo:daily:today","sourceDate":"2026-10-23","sourceDone":false,"label":"","workDate":"2026-10-23"}],"candidates":[{"key":"abb1c25bec6ae0b599d633d6","title":"Review Northstar reporting automation","kind":"daily-task","origin":{"type":"daily-task","id":"demo:daily:today:abb1c25bec6ae0b599d633d6","route":"tasks","documentId":"demo:daily:today","taskLocator":"abb1c25bec6ae0b599d633d6","sourceTaskId":null,"sourceRevision":null},"reason":"Written for the selected day.","freshness":"Source 2026-10-23","eligibleDay":"2026-10-23","completionMode":"hq-overlay","sourceTaskId":"task:reporting","sourceRevision":null,"documentId":"demo:daily:today","sourceDate":"2026-10-23","sourceDone":false,"label":"","workDate":"2026-10-23"},{"key":"42bb3ec69fd48537e8f00df9","title":"Record the client walkthrough","kind":"daily-task","origin":{"type":"daily-task","id":"demo:daily:today:42bb3ec69fd48537e8f00df9","route":"tasks","documentId":"demo:daily:today","taskLocator":"42bb3ec69fd48537e8f00df9","sourceTaskId":null,"sourceRevision":null},"reason":"Written for the selected day.","freshness":"Source 2026-10-23","eligibleDay":"2026-10-23","completionMode":"hq-overlay","sourceTaskId":"task:walkthrough","sourceRevision":null,"documentId":"demo:daily:today","sourceDate":"2026-10-23","sourceDone":false,"label":"","workDate":"2026-10-23"},{"key":"60cf4697bb9f1d24a181bee2","title":"Draft the weekly newsletter","kind":"daily-task","origin":{"type":"daily-task","id":"demo:daily:today:60cf4697bb9f1d24a181bee2","route":"tasks","documentId":"demo:daily:today","taskLocator":"60cf4697bb9f1d24a181bee2","sourceTaskId":null,"sourceRevision":null},"reason":"Written for the selected day.","freshness":"Source 2026-10-23","eligibleDay":"2026-10-23","completionMode":"hq-overlay","sourceTaskId":"task:newsletter","sourceRevision":null,"documentId":"demo:daily:today","sourceDate":"2026-10-23","sourceDone":false},{"key":"5d6c0d78f794616e2d269082","title":"Package the client handoff notes","kind":"project-task","origin":{"type":"project-task","id":"task:handoff","route":"projects","projectId":"project:northstar"},"reason":"Project status: pending.","freshness":"Current project source","eligibleDay":"2026-10-23","completionMode":"hq-overlay"},{"key":"aa9911fddec87c13ed29f5c8","title":"Offer the studio systems workshop in October?","kind":"decision","origin":{"type":"decision","id":"decision:workshop","route":"inbox","url":null},"reason":"Choose whether to reserve one October cohort.","freshness":"Reviewed 2026-10-22","eligibleDay":"2026-10-23","completionMode":"origin-action"},{"key":"069fcd6a9dad4e8861e5bea7","title":"Northstar reporting walkthrough needs review","kind":"decision","origin":{"type":"decision","id":"attention:northstar","route":"inbox","url":null},"reason":"Review the receipt and record the walkthrough.","freshness":"Reviewed 2026-10-23","eligibleDay":"2026-10-23","completionMode":"origin-action"}],"completed":[],"deferred":[],"canUndo":true,"sourceDate":"2026-10-23"},"next":{"title":"Review Northstar reporting automation","documentId":"demo:project:northstar","date":"2026-10-23","chosenAt":"2026-10-23T10:28:44.446Z"},"followups":{"rel:maya":{"nextAction":"Approve reporting walkthrough","date":"2026-10-23","updatedAt":"2026-10-23T10:28:44.446Z"}},"decisions":{},"attention":{},"delegations":[],"schedules":[{"id":"schedule:brief","action":"daily-brief","time":"08:15","days":[1,2,3,4,5],"enabled":true,"instruction":"Surface the three highest-leverage commitments.","documentId":null,"sourceId":null,"destination":"receipt","lastDay":"2026-10-23","createdAt":"2026-10-14T16:00:00Z"}],"jobs":[{"id":"job:reporting","action":"project-review","title":"Project review","origin":"manual","runner":"Pi","createdAt":"2026-10-23T15:10:00Z","finishedAt":"2026-10-23T15:11:00Z","status":"complete","input":{"instruction":"Check launch readiness for Northstar."}}],"token":"31327dc1dc65c8407fa0e1926ba83a93c516cbfc030c7212"},"projects":{"projects":[{"id":"project:northstar","title":"Northstar Launch","status":"active","modified":"2026-10-22","sourceRevision":"demo-northstar-v1","documentId":"demo:project:northstar","clientId":"rel:maya","version":1,"origin":"HQ","updatedAt":"2026-10-23T10:28:48.422Z","adoptedSourceRevision":"demo-northstar-v1","sourceChanged":false,"sourceStatus":"active","sourceModified":"2026-10-22","finances":[{"currency":"CAD","fee":9600,"hours":4,"billableHours":4,"invoiced":4800,"paid":2400,"effectiveRate":2400,"earned":null,"remainingSessions":null,"cashRate":600}],"totalHours":4,"unallocatedHours":0},{"id":"project:content","title":"Content Engine","status":"active","modified":"2026-10-21","sourceRevision":"demo-content-v1","documentId":"demo:idea:field-guide","clientId":"","version":0,"origin":"Source","finances":[],"totalHours":0,"unallocatedHours":0},{"id":"project:studio","title":"Studio Systems Workshop","status":"pending","modified":"2026-10-20","sourceRevision":"demo-studio-v1","clientId":"","version":0,"origin":"Source","finances":[],"totalHours":0,"unallocatedHours":0}],"tasks":[{"id":"task:reporting","title":"Review Northstar reporting automation","status":"in-progress","project":"Northstar Launch","projectId":"project:northstar","due":"2026-10-23","priority":"high","documentId":"demo:project:northstar","phase":"Delivery","start":"2026-10-22","owner":"You","note":"Final verification before the client walkthrough.","version":0,"origin":"Source"},{"id":"task:walkthrough","title":"Record the client walkthrough","status":"pending","project":"Northstar Launch","projectId":"project:northstar","due":"2026-10-24","priority":"high","documentId":"demo:project:northstar","phase":"Delivery","start":"2026-10-23","owner":"Maya","note":"","version":0,"origin":"Source"},{"id":"task:newsletter","title":"Draft the weekly newsletter","status":"pending","project":"Content Engine","projectId":"project:content","due":"2026-10-25","priority":"medium","documentId":"demo:idea:capacity","phase":"Publishing","start":"2026-10-23","owner":"You","note":"","version":0,"origin":"Source"},{"id":"task:kickoff","title":"Run the client kickoff","projectId":"project:northstar","status":"completed","phase":"Delivery","start":"2026-10-07","due":"2026-10-09","owner":"You","note":"Scope, owners and dates agreed with Maya.","priority":"medium","version":0,"origin":"Source"},{"id":"task:onboarding","title":"Ship the onboarding flow","projectId":"project:northstar","status":"completed","phase":"Delivery","start":"2026-10-15","due":"2026-10-17","owner":"You","note":"Approved by Northstar.","priority":"medium","version":0,"origin":"Source"},{"id":"task:automation-build","title":"Build the reporting automation","projectId":"project:northstar","status":"completed","phase":"Delivery","start":"2026-10-19","due":"2026-10-21","owner":"You","note":"Receipt saved for the operator check.","priority":"medium","version":0,"origin":"Source"},{"id":"task:guide-outline","title":"Outline the AI operations field guide","projectId":"project:content","status":"completed","phase":"Publishing","start":"2026-10-18","due":"2026-10-20","owner":"You","note":"Chaptered by workspace.","priority":"medium","version":0,"origin":"Source"},{"id":"task:discovery","title":"Hold three discovery calls","projectId":"project:studio","status":"completed","phase":"Discovery","start":"2026-10-16","due":"2026-10-18","owner":"You","note":"Same handoff and capacity problem each time.","priority":"medium","version":0,"origin":"Source"},{"id":"task:workshop-outline","title":"Scope the workshop outline","projectId":"project:studio","status":"pending","phase":"Discovery","start":"2026-10-24","due":"2026-10-26","owner":"You","note":"Jonah is waiting on the scoped outline.","priority":"medium","version":0,"origin":"Source"},{"id":"task:handoff","title":"Package the client handoff notes","projectId":"project:northstar","status":"pending","phase":"Handoff","start":"","due":"","owner":"You","note":"Bundle the approved walkthrough and reporting receipt.","priority":"medium","documentId":"demo:project:northstar","version":0,"origin":"Source"}],"slices":[{"id":"796707e3-30a7-49aa-9660-5b57f6d304fd","title":"Implementation","version":1,"origin":"HQ","updatedAt":"2026-10-23T10:28:48.424Z","projectId":"project:northstar","mode":"fixed","currency":"CAD","fee":9600,"rate":null,"estimatedHours":72,"includedSessions":null,"finances":[{"currency":"CAD","fee":9600,"hours":4,"billableHours":4,"invoiced":4800,"paid":2400,"effectiveRate":2400,"earned":null,"remainingSessions":null,"cashRate":600}]}],"timeEntries":[{"id":"9c7762ef-f2a6-406d-9773-6714dc33458c","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","version":1,"date":"2026-10-21","note":"Reporting automation build","createdAt":"2026-10-23T10:28:48.426Z","idempotencyKey":"seed:time-1","hours":2.5,"billable":true,"taskId":""},{"id":"15b04d51-0cf3-4b42-a65c-3199b37d549d","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","version":1,"date":"2026-10-22","note":"Walkthrough prep","createdAt":"2026-10-23T10:28:48.427Z","idempotencyKey":"seed:time-2","hours":1.5,"billable":true,"taskId":""}],"sessions":[],"payments":[{"id":"invoice:invoice:northstar-02","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","invoiceId":"invoice:northstar-02","amount":4800,"date":"2026-10-09","kind":"invoiced","evidence":"Connected reviewed invoice","note":"NS-2026-02","evidenceReference":"NS-2026-02"},{"id":"receipt:payment:northstar-deposit","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","invoiceId":"invoice:northstar-02","amount":2400,"date":"2026-10-12","kind":"paid","evidence":"Connected reviewed payment","note":"DEMO-TRX-2400","evidenceReference":"DEMO-TRX-2400"}],"history":{"timeEntries":[{"id":"9c7762ef-f2a6-406d-9773-6714dc33458c","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","version":1,"date":"2026-10-21","note":"Reporting automation build","createdAt":"2026-10-23T10:28:48.426Z","idempotencyKey":"seed:time-1","hours":2.5,"billable":true,"taskId":""},{"id":"15b04d51-0cf3-4b42-a65c-3199b37d549d","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","version":1,"date":"2026-10-22","note":"Walkthrough prep","createdAt":"2026-10-23T10:28:48.427Z","idempotencyKey":"seed:time-2","hours":1.5,"billable":true,"taskId":""}],"sessions":[],"payments":[]},"invoiceLinkHistory":[{"id":"9c3cb315-ccc8-4894-b268-f620fd5ddebc","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","invoiceId":"invoice:northstar-02","linkedAt":"2026-10-23T10:28:48.425Z"}],"invoiceLinks":[{"id":"9c3cb315-ccc8-4894-b268-f620fd5ddebc","projectId":"project:northstar","sliceId":"796707e3-30a7-49aa-9660-5b57f6d304fd","invoiceId":"invoice:northstar-02","linkedAt":"2026-10-23T10:28:48.425Z"}],"invoiceOptions":[{"id":"invoice:northstar-02","title":"Northstar Launch · Milestone 2","reference":"NS-2026-02","relationshipId":"rel:maya","currency":"CAD","amount":4800,"date":"2026-10-09","bound":true}],"evidenceConflicts":[],"summaries":[{"currency":"CAD","fee":9600,"hours":4,"billableHours":4,"invoiced":4800,"paid":2400,"effectiveRate":2400,"earned":null,"remainingSessions":null,"cashRate":600}],"clientFinances":{"rel:maya":[{"currency":"CAD","fee":9600,"hours":4,"billableHours":4,"invoiced":4800,"paid":2400,"effectiveRate":2400,"earned":null,"remainingSessions":null,"cashRate":600}]}},"pulse":{"revision":1,"startedAt":null,"sources":[{"id":"calendar-refresh","interval":300000,"status":"refreshing","lastAttempt":"2026-10-23T10:28:45.932Z","lastSuccess":null,"error":null},{"id":"traffic-rebuild","interval":1800000,"status":"waiting","lastAttempt":null,"lastSuccess":null,"error":null},{"id":"signal-scan","interval":3600000,"status":"waiting","lastAttempt":null,"lastSuccess":null,"error":null}]},"workspace":{"ideas":[{"id":"idea:field-guide","type":"video","title":"The AI operations field guide","status":"developing","createdAt":"2026-10-20","priority":92,"source":"Customer workflow review","sourcePath":"Demo Workspace/Content/AI Operations Field Guide.md","summary":"Show the operating system through one connected client story.","nextAction":"Turn the Northstar launch into a proof-led walkthrough.","sources":["https://example.com/research/operations"],"images":[],"imageLabel":"Workbench overview","notes":"Keep the story grounded in visible handoffs and receipts.","kind":"idea","legacyImported":false,"validationLabel":"Strong customer relevance","documentId":"demo:idea:field-guide"},{"id":"idea:capacity","type":"newsletter","title":"Why capacity systems fail quietly","status":"ready","createdAt":"2026-10-18","priority":78,"source":"Studio discovery calls","sourcePath":"Demo Workspace/Content/Capacity Systems.md","summary":"A practical note on hidden work and ownership.","nextAction":"Draft the three failure patterns.","sources":["https://example.com/research/capacity"],"images":[],"kind":"idea","legacyImported":false,"validationLabel":"Repeated problem","documentId":"demo:idea:capacity"}],"references":[],"packagingAssets":[],"warnings":[],"exportedAt":"2026-10-23T12:00:00-07:00","readAt":"2026-10-23T09:12:00-07:00","daily":{"date":"2026-10-23","isToday":true,"path":"Demo Workspace/Daily/2026-10-23.md","focus":"Ship the Northstar reporting walkthrough.","nextAction":"Review the reporting automation and record the client walkthrough.","blocks":[],"drivers":["Northstar launch","Weekly newsletter","Studio pipeline"],"metrics":[{"label":"Subscribers","value":19481},{"label":"Members","value":699},{"label":"MRR","value":17405}],"documentId":"demo:daily:today"},"content":{"capturedAt":"2026-10-23T08:45:00-07:00","sources":[{"id":"source:handoffs","cachedThumbnailUrl":"/media/demo-handoffs.webp","images":["/media/demo-handoffs.webp"],"thumbnail":"/media/demo-handoffs.webp","title":"The hidden cost of unclear handoffs","creator":"Operations Weekly","url":"https://example.com/operations/handoffs","publishedAt":"2026-10-21","summary":"Small teams lose momentum when ownership changes are implicit.","views":48200,"ratio":3.4},{"id":"source:proof","cachedThumbnailUrl":"/media/demo-proof.webp","images":["/media/demo-proof.webp"],"thumbnail":"/media/demo-proof.webp","title":"Proof-led product walkthroughs","creator":"Builder Notes","url":"https://example.com/product/proof","publishedAt":"2026-10-20","summary":"The strongest demos connect an action to a visible system response.","views":31800,"ratio":2.7}],"outliers":[{"id":"outlier:systems","cachedThumbnailUrl":"/media/demo-systems.webp","images":["/media/demo-systems.webp"],"thumbnail":"/media/demo-systems.webp","title":"I replaced seven tools with one operating system","creator":"Studio Systems","url":"https://example.com/video/systems","views":214000,"ratio":5.8,"publishedAt":"2026-10-19"}],"posts":[{"id":"owned:field-notes","title":"Build the receipt, not the promise","views":18600,"ratio":2.2,"publishedAt":"2026-10-14","url":"https://example.com/owned/receipt"}],"postsAt":"2026-10-23T08:40:00-07:00","postsStatus":"current","performanceAt":"2026-10-23T08:40:00-07:00","tubelab":{"status":"not connected","records":[],"topics":[],"health":{}},"creatorRadar":{"creators":[],"mutedCreators":[],"uploads":[],"verifiedOutliers":[],"similarCandidates":[],"creditCost":0,"health":{}}},"business":{"capturedAt":"2026-10-23T08:30:00-07:00","period":"September 2026","mrr":17405,"newMrr":2755,"currency":"CAD","visitors":4820,"signups":231,"conversion":4.8},"relationships":[{"id":"rel:maya","title":"Maya Chen","kind":"person","company":"Northstar Learning","relationship":"active client","email":"maya@northstar.example","nextAction":"Approve reporting walkthrough","followUpDay":"2026-11-16","lastContact":"2026-10-21","lastContactEvidence":"Reviewed launch notes","context":"Founder leading a cohort-based education company. The reporting layer is the final launch dependency.","projects":[{"title":"Northstar Launch","documentId":"demo:project:northstar"}],"history":[{"date":"2026-10-21","text":"Approved onboarding flow. Asked for a concise reporting walkthrough before launch."},{"date":"2026-10-16","text":"Confirmed the launch team and Thursday review window."}],"sourcePath":"Demo Workspace/Relationships/Maya Chen.md","documentId":"demo:relationship:maya"},{"id":"rel:jonah","title":"Jonah Brooks","kind":"person","company":"Signal & Craft","relationship":"qualified lead","email":"jonah@signalcraft.example","nextAction":"Send scoped workshop outline","followUpDay":"2026-10-25","lastContact":"2026-10-19","context":"Runs a six-person creative studio exploring an operating-system workshop.","projects":[],"history":[{"date":"2026-10-19","text":"Discovery call surfaced handoff and capacity-planning gaps."}],"sourcePath":"Demo Workspace/Relationships/Jonah Brooks.md","documentId":"demo:relationship:jonah"},{"id":"rel:priya","title":"Priya Raman","kind":"person","company":"Arcwell Studio","relationship":"partner","email":"priya@arcwell.example","nextAction":"Review collaboration brief","followUpDay":"2026-10-27","lastContact":"2026-10-18","context":"Referral partner for design-led automation engagements.","projects":[],"history":[{"date":"2026-10-18","text":"Shared two potential collaboration angles for Q4."}],"sourcePath":"Demo Workspace/Relationships/Priya Raman.md","documentId":"demo:relationship:priya"}],"attention":{"reviewedAt":"2026-10-23T08:50:00-07:00","scope":"Demo evidence","items":[{"id":"decision:workshop","decisionId":"decision:workshop","kind":"Decision","title":"Offer the studio systems workshop in October?","summary":"Three qualified conversations point to the same handoff and capacity problem.","nextAction":"Choose whether to reserve one October cohort.","from":"Pipeline review","date":"2026-10-22","sources":["https://example.com/evidence/workshop"]},{"id":"attention:northstar","kind":"Project","from":"Project record","title":"Northstar reporting walkthrough needs review","summary":"The automation is ready for a final operator check.","nextAction":"Review the receipt and record the walkthrough.","date":"2026-10-23","projectId":"project:northstar"}]},"activity":{"today":"2026-10-23","history":[{"date":"2026-09-24","documentId":null,"subscribers":18420,"members":612,"mrr":14650,"posts":0,"weight":181.8,"focus_score":6,"energy_score":6,"sleep_score":7,"mood_score":7,"ad-spend":45},{"date":"2026-09-25","documentId":null,"subscribers":18464,"members":614,"mrr":14685,"posts":1,"weight":null,"focus_score":7,"energy_score":7,"sleep_score":8,"mood_score":8,"ad-spend":null},{"date":"2026-09-26","documentId":null,"subscribers":18515,"members":617,"mrr":14806,"posts":0,"weight":null,"focus_score":8,"energy_score":8,"sleep_score":7,"mood_score":9,"ad-spend":null},{"date":"2026-09-27","documentId":null,"subscribers":18552,"members":620,"mrr":14882,"posts":0,"weight":181.68,"focus_score":6,"energy_score":9,"sleep_score":8,"mood_score":7,"ad-spend":null},{"date":"2026-09-28","documentId":null,"subscribers":18599,"members":625,"mrr":15017,"posts":1,"weight":null,"focus_score":7,"energy_score":6,"sleep_score":7,"mood_score":8,"ad-spend":null},{"date":"2026-09-29","documentId":null,"subscribers":18630,"members":626,"mrr":15074,"posts":0,"weight":null,"focus_score":8,"energy_score":7,"sleep_score":8,"mood_score":9,"ad-spend":45},{"date":"2026-09-30","documentId":null,"subscribers":18676,"members":629,"mrr":15165,"posts":2,"weight":181.56,"focus_score":6,"energy_score":8,"sleep_score":7,"mood_score":7,"ad-spend":null},{"date":"2026-10-01","documentId":null,"subscribers":18702,"members":633,"mrr":15298,"posts":0,"weight":null,"focus_score":7,"energy_score":9,"sleep_score":8,"mood_score":8,"ad-spend":null},{"date":"2026-10-02","documentId":null,"subscribers":18737,"members":635,"mrr":15362,"posts":1,"weight":null,"focus_score":8,"energy_score":6,"sleep_score":7,"mood_score":9,"ad-spend":null},{"date":"2026-10-03","documentId":null,"subscribers":18779,"members":638,"mrr":15473,"posts":0,"weight":181.44,"focus_score":6,"energy_score":7,"sleep_score":8,"mood_score":7,"ad-spend":null},{"date":"2026-10-04","documentId":null,"subscribers":18808,"members":641,"mrr":15554,"posts":0,"weight":null,"focus_score":7,"energy_score":8,"sleep_score":7,"mood_score":8,"ad-spend":45},{"date":"2026-10-05","documentId":null,"subscribers":18847,"members":646,"mrr":15669,"posts":1,"weight":null,"focus_score":8,"energy_score":9,"sleep_score":8,"mood_score":9,"ad-spend":null},{"date":"2026-10-06","documentId":null,"subscribers":18878,"members":647,"mrr":15766,"posts":0,"weight":181.32000000000002,"focus_score":6,"energy_score":6,"sleep_score":7,"mood_score":7,"ad-spend":null},{"date":"2026-10-07","documentId":null,"subscribers":18924,"members":650,"mrr":15842,"posts":2,"weight":null,"focus_score":7,"energy_score":7,"sleep_score":8,"mood_score":8,"ad-spend":null},{"date":"2026-10-08","documentId":null,"subscribers":18950,"members":654,"mrr":15965,"posts":0,"weight":null,"focus_score":8,"energy_score":8,"sleep_score":7,"mood_score":9,"ad-spend":null},{"date":"2026-10-09","documentId":null,"subscribers":18985,"members":656,"mrr":16034,"posts":1,"weight":181.20000000000002,"focus_score":6,"energy_score":9,"sleep_score":8,"mood_score":7,"ad-spend":45},{"date":"2026-10-10","documentId":null,"subscribers":19027,"members":659,"mrr":16125,"posts":0,"weight":null,"focus_score":7,"energy_score":6,"sleep_score":7,"mood_score":8,"ad-spend":null},{"date":"2026-10-11","documentId":null,"subscribers":19056,"members":662,"mrr":16246,"posts":0,"weight":null,"focus_score":8,"energy_score":7,"sleep_score":8,"mood_score":9,"ad-spend":null},{"date":"2026-10-12","documentId":null,"subscribers":19095,"members":667,"mrr":16346,"posts":1,"weight":181.08,"focus_score":6,"energy_score":8,"sleep_score":7,"mood_score":7,"ad-spend":null},{"date":"2026-10-13","documentId":null,"subscribers":19126,"members":668,"mrr":16433,"posts":0,"weight":null,"focus_score":7,"energy_score":9,"sleep_score":8,"mood_score":8,"ad-spend":null},{"date":"2026-10-14","documentId":null,"subscribers":19172,"members":671,"mrr":16514,"posts":2,"weight":null,"focus_score":8,"energy_score":6,"sleep_score":7,"mood_score":9,"ad-spend":45},{"date":"2026-10-15","documentId":null,"subscribers":19198,"members":675,"mrr":16617,"posts":0,"weight":180.96,"focus_score":6,"energy_score":7,"sleep_score":8,"mood_score":7,"ad-spend":null},{"date":"2026-10-16","documentId":null,"subscribers":19233,"members":677,"mrr":16726,"posts":1,"weight":null,"focus_score":7,"energy_score":8,"sleep_score":7,"mood_score":8,"ad-spend":null},{"date":"2026-10-17","documentId":null,"subscribers":19275,"members":681,"mrr":16814,"posts":0,"weight":null,"focus_score":8,"energy_score":9,"sleep_score":8,"mood_score":9,"ad-spend":null},{"date":"2026-10-18","documentId":null,"subscribers":19304,"members":684,"mrr":16925,"posts":0,"weight":180.84,"focus_score":6,"energy_score":6,"sleep_score":7,"mood_score":7,"ad-spend":null},{"date":"2026-10-19","documentId":"demo:daily:today","subscribers":19343,"members":689,"mrr":17030,"posts":1,"weight":null,"focus_score":7,"energy_score":7,"sleep_score":8,"mood_score":8,"ad-spend":45},{"date":"2026-10-20","documentId":"demo:daily:today","subscribers":19374,"members":690,"mrr":17097,"posts":0,"weight":null,"focus_score":8,"energy_score":8,"sleep_score":7,"mood_score":9,"ad-spend":null},{"date":"2026-10-21","documentId":"demo:daily:today","subscribers":19420,"members":693,"mrr":17218,"posts":2,"weight":180.72,"focus_score":6,"energy_score":9,"sleep_score":8,"mood_score":7,"ad-spend":null},{"date":"2026-10-22","documentId":"demo:daily:today","subscribers":19446,"members":697,"mrr":17306,"posts":0,"weight":null,"focus_score":7,"energy_score":6,"sleep_score":7,"mood_score":8,"ad-spend":null},{"date":"2026-10-23","documentId":"demo:daily:today","subscribers":19481,"members":699,"mrr":17405,"posts":1,"weight":null,"focus_score":8,"energy_score":7,"sleep_score":8,"mood_score":9,"ad-spend":null}],"tasks":[{"id":"task:reporting","title":"Review Northstar reporting automation","status":"in-progress","project":"Northstar Launch","projectId":"project:northstar","due":"2026-10-23","priority":"high","documentId":"demo:project:northstar"},{"id":"task:walkthrough","title":"Record the client walkthrough","status":"pending","project":"Northstar Launch","projectId":"project:northstar","due":"2026-10-24","priority":"high","documentId":"demo:project:northstar"},{"id":"task:newsletter","title":"Draft the weekly newsletter","status":"pending","project":"Content Engine","projectId":"project:content","due":"2026-10-25","priority":"medium","documentId":"demo:idea:capacity"}],"taskDate":"2026-10-23","taskDocumentId":"demo:daily:today","sourceIssue":null,"snapshot":{"capturedAt":"2026-10-23T08:35:00-07:00","calendar":{"events":[{"id":"event:review","title":"Northstar launch review","start":"2026-10-23T14:00:00-07:00","end":"2026-10-23T14:45:00-07:00"}]},"email":{"unread":4,"needsReply":2}}},"artifacts":[{"documentId":"demo:project:northstar","path":"Demo Workspace/Projects/Northstar Launch.md","title":"Northstar launch plan","kind":"Project","command":null,"modified":"2026-10-22T12:00:00-07:00"}],"tools":[{"title":"Daily brief","kind":"Workflow","page":"workflows","symbol":"sun","command":"/today"},{"title":"Weekly review","kind":"Workflow","page":"workflows","symbol":"calendar","command":"/review"},{"title":"Content brief","kind":"Workflow","page":"workflows","symbol":"sparkles","command":"/content"},{"title":"Project review","kind":"Workflow","page":"workflows","symbol":"folder","command":"/project"},{"title":"Relationship follow-up","kind":"Workflow","page":"workflows","symbol":"people","command":"/followup"},{"title":"Metric review","kind":"Workflow","page":"workflows","symbol":"chart","command":"/metrics"}]},"documents":{"demo:daily:today":{"id":"demo:daily:today","path":"Demo Workspace/Daily/2026-10-23.md","text":"# Friday, October 23\n\n## Focus\nShip the Northstar reporting walkthrough.\n\n## Commitments\n- Review reporting automation\n- Record client walkthrough\n- Prepare the weekly newsletter"},"demo:idea:capacity":{"id":"demo:idea:capacity","path":"Demo Workspace/Content/Why capacity systems fail quietly.md","text":"# Why capacity systems fail quietly\n\nNewsletter idea. Three client conversations point to the same pattern: capacity breaks at the handoff, not at the workload.\n\n## Argument\n- Ownership changes are where work goes missing.\n- A system that records every handoff makes capacity visible."},"demo:idea:field-guide":{"id":"demo:idea:field-guide","path":"Demo Workspace/Content/AI Operations Field Guide.md","text":"# AI Operations Field Guide\n\nA practical walkthrough showing how a small studio turns scattered client work into one calm operating system.\n\n## Proof\n\n- Every commitment has an owner and due date.\n- Content work traces back to a source.\n- Revenue evidence stays attached to delivery."},"demo:project:northstar":{"id":"demo:project:northstar","path":"Demo Workspace/Projects/Northstar Launch.md","text":"# Northstar Launch\n\nClient launch system covering discovery, build, training, and handoff.\n\nStatus: active. The onboarding flow is approved; reporting automation is in review."},"demo:relationship:jonah":{"id":"demo:relationship:jonah","path":"Demo Workspace/Relationships/Jonah Brooks.md","text":"# Jonah Brooks\n\nSignal & Craft · qualified lead.\n\n## Context\nRuns a six-person creative studio. Interested in a scoped systems workshop after seeing the Northstar proof."},"demo:relationship:maya":{"id":"demo:relationship:maya","path":"Demo Workspace/Relationships/Maya Chen.md","text":"# Maya Chen\n\nNorthstar Learning · active client.\n\n## Context\nApproved the onboarding flow. Asked for a concise reporting walkthrough before launch.\n\n## Agreement\nFixed fee implementation, CAD 9,600. Milestone 2 invoiced; deposit recorded."},"demo:relationship:priya":{"id":"demo:relationship:priya","path":"Demo Workspace/Relationships/Priya Raman.md","text":"# Priya Raman\n\nArcwell Studio · partner.\n\n## Context\nReferral partner for design-led automation engagements. A collaboration brief is waiting for review."}}};
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


  // ========================================================
  // EMAI HQ Runtime UX Enhancements (UX-01, 05, 07, 09, 21)
  // ========================================================

  // UX-01: Seamless View Transitions API on hash navigation
  window.addEventListener('hashchange', () => {
    if (document.startViewTransition) {
      try { document.startViewTransition(); } catch(e) {}
    }
  });

  // UX-09: Lightweight floating toast notification system
  window.showHqToast = function(msg) {
    let container = document.querySelector('.hq-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'hq-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'hq-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('dismissing');
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  };

  // UX-07 & UX-21: Global Escape key listener & backdrop dismiss
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const overlays = document.querySelectorAll('.demo-guide-backdrop, .jump-palette-backdrop');
      overlays.forEach(function(el) {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
      });
    }
  });

  // UX-05: Auto-scroll assistant timeline helper
  window.addEventListener('hq:open-assistant', function() {
    setTimeout(function() {
      const surface = document.querySelector('.assistant-surface');
      if (surface) surface.scrollTop = surface.scrollHeight;
    }, 100);
  });

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
          return jsonRes({ id: docId, path: 'Workspace/' + docId + '.md', text: '# ' + docId + '\n\nDocument loaded in HQ.' });
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
        if (pathname === '/api/today') {
          try { window.showHqToast('✔ Plan item updated'); } catch(e) {}
          return jsonRes({ ok: true, day: body.day, key: body.key });
        }
        if (pathname === '/api/capture') {
          try { window.showHqToast('✨ Note captured to workspace'); } catch(e) {}
          const cap = { id: 'capture:' + crypto.randomUUID(), title: body.title, text: body.text, createdAt: new Date().toISOString() };
          state.operations.captures = state.operations.captures || [];
          state.operations.captures.unshift(cap);
          return jsonRes(cap);
        }
        if (pathname === '/api/decision') {
          try { window.showHqToast('📋 Decision recorded in HQ'); } catch(e) {}
          return jsonRes({ ok: true, id: body.id, outcome: body.outcome });
        }
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
