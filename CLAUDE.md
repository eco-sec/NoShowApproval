Read `MAP.md` first (definitions, service tasks, CPI/HANA calls, who starts this workflow). Platform rules: `../../CLAUDE.md`.

# NoShowApproval — working notes

Process description, context/field lists, level definitions, step-by-step flows and history: `docs/REFERENCE.md` (read on demand).

## Live definition
- `workflows/NoShowApproval.workflow` is deployed (`../../components.yaml` main_definitions: `NoShowApproval`).
- `workflows/NoShowApproval-backup.workflow` is the previous version (HANA PATCH + ECC HTML mails); kept in the repo, not deployed.
- Web IDE project `noshowapproval`, account `p6lg1ba5nh`, last deployed version 1.0.8 (`.che/project.json`).

## Editing conventions
- Scripts are ES5, run inside the workflow engine and mutate `$.context.*` directly; task outcome via `$.usertasks.usertask2.last.decision === "reject"`; runtime id via `$.info.workflowInstanceId`.
- Script tasks point at files by project-absolute path: `"reference": "/scripts/NoShowApproval/<name>.js"`. `initialize Variable .js` has a space in its name on purpose.
- User task form: `"formReference": "/forms/TrainingApprovalV2/NoShowApproval.form"` (folder name is historical). Form field names must match context variable names (CPI `get User Tasks Details` reads them).
- Test data: `sample-data/TrainingApprovalV2/sampleData.json` (referenced from the `.workflow` SampleContext).
- Referenced by the live definition: `initialize Variable .js`, `getApproverList.js`, `checkRejection.js`, `AfterApprovalScript.js`, `prepareMailFormat.js`, `prepareNotificationListMailFormat.js`, `updateWorkflowLog.js`.
- NOT referenced by the live definition: `prepareInitiatorMailFormat.js`, `prepareInitialRequest.js` (backup only), `checkLeaveRequest.js`, `test.html` (rendered mail preview).

## Mail
- Every mail task of the live definition ("send mail", "send Mail", "send Mail Using ECC") POSTs to CPI `lms/sendDecisionMail` (iFlow `Send Training Decision Notification`; HTML is rendered by its `script1.groovy`, the scripts only forward data).
- `MailStatus` values sent from here — must exist in that Groovy:
  - `NOSHOW_APPROVER_REQUEST` — `prepareMailFormat.js` → `MailRequestBody` (one approver per loop via `MailfilteredApprovers.shift()`, `NoMoreMailApprover` ends the loop).
  - `NOSHOW_DECISION` (+ `isRejected`) — `prepareNotificationListMailFormat.js` → `MailNotificationRequestBody`.
  - `NOSHOW_INITIATOR_PROGRESS` — `prepareInitiatorMailFormat.js` → `MailInitiatorRequestBody` (script exists, task not wired in the live definition).
- No `NotificationSet` HTML builders or FLP InstanceID deep link remain in this project's scripts. Gotcha: the backup definition still POSTs `MailRequestBody` to `employee/notification`, but the shared scripts now emit `MailStatus` payloads, so the backup would send the wrong shape — never deploy it.

## Destinations / gotchas
- Live definition uses only the `CPI` destination. `HANA_DB_DEV_LMS` (`PATCH /xsodata/NoShowService.xsodata/NoShowApproval('${context.requestId}')`) exists only in the backup definition.
- Rejection sets `currentLevel = 99` (`checkRejection.js`); `getApproverList.js` treats `Level` 4 specially.
- LMS statuses: `NO_SHOW_APPROVED` / `NO_SHOW_REJECTED` with `cancellationReasonID: "NO SHOW"` (`AfterApprovalScript.js`); `ENROLL_NO_SHOW_In_Progress` (`prepareInitialRequest.js`, backup only).

## Deploy
- Build + deploy the `.workflow` from SAP Web IDE (Neo): right-click project → Deploy → Deploy to SAP Cloud Platform. The form deploys with the definition; there is no local build, lint or CI. Deploy only `NoShowApproval.workflow`, never the backup.
