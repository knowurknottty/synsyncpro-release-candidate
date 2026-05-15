# Protocol Plan System - Implementation Task List

## Overview

Complete implementation roadmap for the Protocol Plan system, organized into 6 phases with 47 total tasks.

**Estimated Total Effort:** 80-100 hours
**Recommended Timeline:** 4-6 weeks

---

## PHASE 1: CORE INFRASTRUCTURE (15-20 hours)

### Data Layer

**Task 1.1: IndexedDB Schema & Utilities**
- [ ] Create `services/PlanDatabase.ts`
- [ ] Define IndexedDB schema (5 object stores)
  - `plans`: Store imported plans
  - `sessions`: Track completed sessions
  - `metrics`: Store user metrics (mood, anxiety, etc.)
  - `check_ins`: Store check-in responses
  - `audit_log`: Append-only log of all actions
- [ ] Implement CRUD operations for each store
- [ ] Add database versioning/migration system
- [ ] Test: Create, read, update, delete operations

**Task 1.2: JSON Schema Validator**
- [ ] Create `services/PlanValidator.ts`
- [ ] Integrate Ajv JSON Schema validator library (`npm install ajv`)
- [ ] Load PROTOCOL_PLAN_SCHEMA.json
- [ ] Implement validation with detailed error messages
- [ ] Add protocol ID validation (check against PROTOCOLS constants)
- [ ] Add date/timezone validation
- [ ] Test: Valid plan passes, invalid plan fails with clear errors

**Task 1.3: SHA-256 Hash Verification**
- [ ] Create `utils/SecurityUtils.ts`
- [ ] Implement SHA-256 hashing using Web Crypto API
- [ ] Calculate hash of plan JSON (excluding security section)
- [ ] Verify hash matches `security.plan_hash`
- [ ] Add tamper detection flag in database if hash mismatch
- [ ] Test: Modified plan detected, unmodified plan passes

**Task 1.4: Plan Data Models**
- [ ] Create `types/plan.ts`
- [ ] Define TypeScript interfaces matching JSON schema
  - `ProtocolPlan`
  - `PlanPhase`
  - `PlanSession`
  - `PlanMetric`
  - `CheckIn`
  - `Milestone`
  - `ConditionalRule`
- [ ] Export all types
- [ ] Test: TypeScript compilation passes

---

## PHASE 2: IMPORT & DISPLAY (10-15 hours)

### Import Flow

**Task 2.1: Plan Importer Component**
- [ ] Create `components/PlanImporter.tsx`
- [ ] Add drag-and-drop zone for JSON files
- [ ] Add file picker button
- [ ] Display file name and size
- [ ] Show upload progress indicator
- [ ] Test: File upload works on all browsers

**Task 2.2: Plan Validation Flow**
- [ ] Parse JSON file
- [ ] Validate against schema (Task 1.2)
- [ ] Verify hash (Task 1.3)
- [ ] Check protocol IDs exist
- [ ] Display validation errors clearly
- [ ] Allow user to import despite warnings (non-critical errors)
- [ ] Test: Valid plan proceeds, invalid plan shows errors

**Task 2.3: Consent Screen**
- [ ] Create `components/PlanConsentScreen.tsx`
- [ ] Display `consent.text` from plan
- [ ] Show practitioner information
- [ ] Display contraindications prominently
- [ ] Add "I Acknowledge" checkbox
- [ ] Add "Accept Plan" button (disabled until checked)
- [ ] Record signature timestamp and user agent
- [ ] Test: Cannot proceed without consent

**Task 2.4: Disclaimer Modal**
- [ ] Create `components/DisclaimerModal.tsx`
- [ ] Display legal disclaimer (see PRESCRIPTION_SYSTEM_ANALYSIS.md)
- [ ] Add "I Understand" button
- [ ] Show only on first import (localStorage flag)
- [ ] Test: Shows once, doesn't show again

### Display

**Task 2.5: Plan Overview Component**
- [ ] Create `components/PlanOverview.tsx`
- [ ] Display plan title, description, duration
- [ ] Show practitioner info (name, credentials)
- [ ] List goals
- [ ] Show current phase and progress
- [ ] Display adherence percentage
- [ ] Test: All plan metadata displays correctly

**Task 2.6: Plan List Component**
- [ ] Create `components/PlanList.tsx`
- [ ] List all imported plans
- [ ] Show status (active, completed, paused, expired)
- [ ] Filter by status
- [ ] Click to view details
- [ ] Delete plan (with confirmation)
- [ ] Test: Multiple plans display correctly

---

## PHASE 3: CALENDAR & SCHEDULING (15-20 hours)

### Calendar Generation

**Task 3.1: Session Scheduler Service**
- [ ] Create `services/PlanScheduler.ts`
- [ ] Parse phases and sessions from plan
- [ ] Generate calendar events for each session
- [ ] Handle frequency types (daily, 3x_per_week, etc.)
- [ ] Apply time windows and preferred times
- [ ] Skip rest days
- [ ] Store events in IndexedDB
- [ ] Test: Correct number of events generated

**Task 3.2: Timezone Handling**
- [ ] Use `date-fns-tz` for timezone operations (`npm install date-fns-tz`)
- [ ] Parse `schedule.timezone` from plan
- [ ] Convert preferred times to user's local timezone
- [ ] Detect timezone changes (browser API)
- [ ] Offer to adjust schedule on timezone change
- [ ] Test: Times correct in different timezones

**Task 3.3: Multi-Plan Conflict Detection**
- [ ] Create `utils/ConflictDetector.ts`
- [ ] Check for overlapping session times across plans
- [ ] Calculate conflict severity (same time vs within 30 min)
- [ ] Return list of conflicts
- [ ] Test: Detects time conflicts correctly

### Calendar UI

**Task 3.4: Calendar Component**
- [ ] Create `components/PlanCalendar.tsx`
- [ ] Month view with session indicators
- [ ] Color-code sessions by plan
- [ ] Show completed sessions (checkmark)
- [ ] Show missed sessions (red dot)
- [ ] Show upcoming sessions (blue dot)
- [ ] Click day to see details
- [ ] Navigate months (prev/next buttons)
- [ ] Test: Calendar displays correctly, navigation works

**Task 3.5: Day View Component**
- [ ] Create `components/PlanDayView.tsx`
- [ ] List all sessions for selected day
- [ ] Show session time, protocol name, duration
- [ ] Display status (pending, completed, missed, skipped)
- [ ] "Start Session" button for pending sessions
- [ ] Test: Day view shows correct sessions

**Task 3.6: Upcoming Sessions Widget**
- [ ] Create `components/UpcomingSessions.tsx`
- [ ] Show next 5 upcoming sessions
- [ ] Display time until session (e.g., "in 2 hours")
- [ ] Quick launch button
- [ ] Test: Updates in real-time

---

## PHASE 4: SESSION EXECUTION & TRACKING (12-16 hours)

### Execution

**Task 4.1: Session Launcher**
- [ ] Create `services/SessionLauncher.ts`
- [ ] Load session from plan
- [ ] Extract protocol ID and settings
- [ ] Apply volume/complexity overrides from plan
- [ ] Launch AudioEngine with protocol
- [ ] Record session start time
- [ ] Test: Protocol launches with correct settings

**Task 4.2: Pre-Session Metrics Form**
- [ ] Create `components/PreSessionMetrics.tsx`
- [ ] Load `tracking.optional_metrics` from plan
- [ ] Display metrics with appropriate input types
  - Scale: Slider (1-10)
  - Boolean: Toggle
  - Text: Text area
  - Number: Number input
- [ ] Show only metrics marked for "per_session" frequency
- [ ] Optional skip button
- [ ] Test: Form displays correctly, submits data

**Task 4.3: During Session Overlay**
- [ ] Create `components/SessionInProgressOverlay.tsx`
- [ ] Show timer (elapsed time, remaining time)
- [ ] Display session instructions (`instructions.during`)
- [ ] Emergency stop button
- [ ] Minimize button (hide overlay but continue)
- [ ] Test: Overlay shows during protocol execution

**Task 4.4: Post-Session Metrics Form**
- [ ] Create `components/PostSessionMetrics.tsx`
- [ ] Similar to pre-session form
- [ ] Show post-session metrics (mood_after, etc.)
- [ ] Add "Session Notes" text field
- [ ] Submit button saves to IndexedDB
- [ ] Test: Data persists correctly

### Tracking

**Task 4.5: Session Tracker Service**
- [ ] Create `services/SessionTracker.ts`
- [ ] Record session completion (timestamp, duration, protocol)
- [ ] Store pre/post metrics
- [ ] Calculate session statistics (actual vs scheduled time)
- [ ] Update plan progress counters
- [ ] Test: All data recorded correctly

**Task 4.6: Adherence Calculator**
- [ ] Create `utils/AdherenceCalculator.ts`
- [ ] Calculate adherence rate (completed / scheduled)
- [ ] Calculate streak (consecutive days with sessions)
- [ ] Calculate weekly adherence
- [ ] Calculate phase-specific adherence
- [ ] Test: Calculations correct for various scenarios

**Task 4.7: Milestone Checker**
- [ ] Create `services/MilestoneChecker.ts`
- [ ] Check if milestones achieved after each session
- [ ] Compare `required_sessions` with actual completions
- [ ] Mark milestone as achieved in database
- [ ] Trigger celebration UI
- [ ] Test: Milestones trigger at correct times

**Task 4.8: Celebration Component**
- [ ] Create `components/MilestoneCelebration.tsx`
- [ ] Show badge/icon
- [ ] Display milestone title and reward message
- [ ] Confetti animation (optional, respect reduceMotion)
- [ ] "Continue" button
- [ ] Test: Shows for achieved milestones only

---

## PHASE 5: PROGRESS TRACKING & UI (14-18 hours)

### Dashboard

**Task 5.1: Progress Dashboard Component**
- [ ] Create `components/PlanProgressDashboard.tsx`
- [ ] Display current phase progress (ring chart)
- [ ] Show adherence percentage (last 7 days, last 30 days)
- [ ] Display current streak
- [ ] List achieved milestones
- [ ] Show next upcoming check-in
- [ ] Test: All metrics display correctly

**Task 5.2: Adherence Chart**
- [ ] Create `components/AdherenceChart.tsx`
- [ ] Calendar heatmap (similar to GitHub contributions)
- [ ] Color intensity based on session count
- [ ] Tooltip on hover (date, sessions, adherence %)
- [ ] Test: Chart renders correctly

**Task 5.3: Metrics Over Time Chart**
- [ ] Create `components/MetricsLineChart.tsx`
- [ ] Line chart for subjective metrics (anxiety, mood, sleep)
- [ ] Multi-line support (compare metrics)
- [ ] Date range selector
- [ ] Use Chart.js or Recharts library
- [ ] Test: Chart displays trends correctly

**Task 5.4: Phase Timeline**
- [ ] Create `components/PhaseTimeline.tsx`
- [ ] Horizontal timeline showing all phases
- [ ] Highlight current phase
- [ ] Show completion status for past phases
- [ ] Click phase to see details
- [ ] Test: Timeline accurate to plan schedule

### Check-Ins

**Task 5.5: Check-In Manager**
- [ ] Create `services/CheckInManager.ts`
- [ ] Detect when check-in is due (based on plan day)
- [ ] Trigger check-in notification
- [ ] Record check-in responses
- [ ] Mark check-in as completed
- [ ] Test: Check-ins trigger on correct days

**Task 5.6: Check-In Form Component**
- [ ] Create `components/CheckInForm.tsx`
- [ ] Display check-in title and questions
- [ ] Text area for each question
- [ ] Submit button
- [ ] Store responses in IndexedDB
- [ ] Show completion confirmation
- [ ] Test: Responses persist correctly

---

## PHASE 6: ADVANCED FEATURES (12-15 hours)

### Conditional Logic

**Task 6.1: Condition Evaluator**
- [ ] Create `services/ConditionEvaluator.ts`
- [ ] Parse conditional rules from plan
- [ ] Query metrics from IndexedDB
- [ ] Evaluate conditions (>, <, ==, etc.)
- [ ] Handle duration requirements (condition true for N days)
- [ ] Return matched rules
- [ ] Test: Conditions evaluate correctly

**Task 6.2: Action Handler**
- [ ] Create `services/ActionHandler.ts`
- [ ] Handle action types:
  - `show_reminder`: Display toast notification
  - `show_warning`: Display modal warning
  - `suggest_extra_session`: Add session to calendar
  - `extend_phase`: Add days to current phase
- [ ] Execute actions based on condition matches
- [ ] Test: Actions trigger correctly

**Task 6.3: Reminder Notification Component**
- [ ] Create `components/ReminderNotification.tsx`
- [ ] Toast-style notification
- [ ] Display message from conditional rule
- [ ] Dismiss button
- [ ] Auto-dismiss after 10 seconds
- [ ] Test: Notifications appear and dismiss correctly

### Export

**Task 6.4: JSON Export**
- [ ] Create `services/PlanExporter.ts`
- [ ] Query all session data for plan
- [ ] Query all metrics
- [ ] Query check-in responses
- [ ] Format as JSON
- [ ] Anonymize patient data (if plan specifies)
- [ ] Calculate summary statistics
- [ ] Download JSON file
- [ ] Test: Export includes all data

**Task 6.5: PDF Report Generation**
- [ ] Install PDF library (`npm install jspdf jspdf-autotable`)
- [ ] Create `services/PDFReportGenerator.ts`
- [ ] Generate professional report:
  - Cover page (plan title, practitioner, dates)
  - Executive summary (adherence, phases completed)
  - Adherence calendar (heatmap)
  - Metrics charts (line graphs)
  - Check-in responses
  - Milestone achievements
- [ ] Download PDF
- [ ] Test: PDF formatting correct

**Task 6.6: CSV Export**
- [ ] Create `utils/CSVExporter.ts`
- [ ] Export session log (timestamp, protocol, duration, metrics)
- [ ] Export metrics log (date, metric name, value)
- [ ] Format as CSV with headers
- [ ] Download CSV file
- [ ] Test: CSV opens correctly in Excel

**Task 6.7: Export UI Component**
- [ ] Create `components/PlanExportPanel.tsx`
- [ ] Three export buttons (JSON, PDF, CSV)
- [ ] Date range selector
- [ ] Include/exclude options (subjective notes, personal info)
- [ ] Progress indicator during export
- [ ] Test: All formats export correctly

### External Calendar Integration

**Task 6.8: iCal Export**
- [ ] Create `utils/ICalGenerator.ts`
- [ ] Generate iCal format from scheduled sessions
- [ ] Include title, description, location (virtual)
- [ ] Add reminders (15 min before)
- [ ] Download .ics file
- [ ] Test: Imports into Google Calendar, Apple Calendar

**Task 6.9: Calendar Sync Instructions**
- [ ] Create `components/CalendarSyncGuide.tsx`
- [ ] Step-by-step instructions for:
  - Google Calendar import
  - Apple Calendar import
  - Outlook import
- [ ] Screenshots/animations
- [ ] Test: Instructions clear and accurate

### Notifications

**Task 6.10: Web Notifications Service**
- [ ] Create `services/NotificationService.ts`
- [ ] Request notification permission
- [ ] Schedule notifications for upcoming sessions
- [ ] Use Web Notifications API
- [ ] Add click handler (opens app to session)
- [ ] Test: Notifications appear on time

**Task 6.11: Notification Settings**
- [ ] Create `components/NotificationSettings.tsx`
- [ ] Enable/disable toggle
- [ ] Reminder timing selector (15 min, 30 min, 1 hour)
- [ ] Sound on/off toggle
- [ ] Test notification button
- [ ] Store preferences in localStorage
- [ ] Test: Settings persist and apply correctly

### Plan Management

**Task 6.12: Pause/Resume Plan**
- [ ] Add pause button to PlanOverview
- [ ] Update plan status to "paused"
- [ ] Stop scheduling new sessions
- [ ] Resume button extends end date by pause duration
- [ ] Test: Pause and resume work correctly

**Task 6.13: Manual Session Completion**
- [ ] Add "Mark as Complete" button to missed sessions
- [ ] Require reason (forgot to track, did offline, etc.)
- [ ] Add flag to indicate manually completed
- [ ] Test: Manual completion affects adherence correctly

**Task 6.14: Schedule Adjustment**
- [ ] Create `components/ScheduleAdjuster.tsx`
- [ ] Allow user to change session times (if `flexible_scheduling: true`)
- [ ] Prevent changes to locked parameters
- [ ] Warn if adjustment conflicts with other sessions
- [ ] Update calendar events
- [ ] Test: Adjustments persist correctly

---

## TESTING & POLISH (8-10 hours)

### Testing

**Task 7.1: Unit Tests**
- [ ] PlanValidator: Valid/invalid plans
- [ ] AdherenceCalculator: Correct calculations
- [ ] ConditionEvaluator: Condition matching
- [ ] SecurityUtils: Hash verification
- [ ] Coverage target: 80%

**Task 7.2: Integration Tests**
- [ ] Full import flow: JSON → Database
- [ ] Session execution: Launch → Track → Save
- [ ] Export flow: Query → Format → Download
- [ ] Milestone triggering: Complete session → Check → Celebrate

**Task 7.3: E2E Tests**
- [ ] Import plan
- [ ] Complete session
- [ ] View progress
- [ ] Export data
- [ ] Use Playwright or Cypress

### Documentation

**Task 7.4: User Guide**
- [ ] Create `docs/USER_GUIDE.md`
- [ ] How to import a plan
- [ ] How to use the calendar
- [ ] How to complete sessions
- [ ] How to export progress
- [ ] Screenshots

**Task 7.5: Practitioner Guide**
- [ ] Create `docs/PRACTITIONER_GUIDE.md`
- [ ] How to create a plan JSON (with examples)
- [ ] JSON schema reference
- [ ] Best practices for scheduling
- [ ] Sample plans (anxiety, sleep, focus)

**Task 7.6: Privacy Policy Update**
- [ ] Add section on protocol plans
- [ ] Clarify local storage only
- [ ] Explain user data control
- [ ] Export and deletion rights

### UI/UX Polish

**Task 7.7: Onboarding Flow**
- [ ] Create first-time user tutorial
- [ ] Highlight key features
- [ ] Show sample plan (demo mode)
- [ ] Skip button for experienced users

**Task 7.8: Empty States**
- [ ] No plans imported: "Import your first plan"
- [ ] No sessions today: "No sessions scheduled"
- [ ] No data to export: "Complete sessions to generate reports"

**Task 7.9: Loading States**
- [ ] Import: Parsing, validating, saving
- [ ] Session start: Loading protocol
- [ ] Export: Generating report
- [ ] Calendar: Loading events

**Task 7.10: Error Handling**
- [ ] Invalid JSON: Clear error message
- [ ] Protocol not found: Suggest alternatives
- [ ] Export failed: Retry button
- [ ] IndexedDB error: Fallback to localStorage

---

## DEPLOYMENT CHECKLIST

### Pre-Launch

- [ ] All tasks above completed
- [ ] Test suite passes (unit, integration, E2E)
- [ ] Performance benchmarks met
  - Import: <2 seconds for 8-week plan
  - Calendar render: <500ms
  - Export PDF: <5 seconds
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)

### Launch

- [ ] Deploy to production
- [ ] Monitor error rates (Sentry)
- [ ] Monitor IndexedDB usage (analytics)
- [ ] Collect user feedback

### Post-Launch

- [ ] Iterate based on feedback
- [ ] Add requested features
- [ ] Optimize performance
- [ ] Expand documentation

---

## SUMMARY

**Total Tasks:** 89 (7 phases)
**Estimated Effort:** 80-100 hours
**Critical Path:**
1. Phase 1 (Infrastructure): 15-20 hours
2. Phase 2 (Import): 10-15 hours
3. Phase 3 (Calendar): 15-20 hours
4. Phase 4 (Execution): 12-16 hours
5. Phase 5 (Progress): 14-18 hours
6. Phase 6 (Advanced): 12-15 hours
7. Testing & Polish: 8-10 hours

**Recommended Schedule:**
- Week 1-2: Phase 1-2 (Infrastructure + Import)
- Week 3-4: Phase 3-4 (Calendar + Execution)
- Week 5: Phase 5 (Progress tracking)
- Week 6: Phase 6 + Testing

**Priorities:**
1. **Must Have (MVP):** Phases 1-4
2. **Should Have:** Phase 5
3. **Nice to Have:** Phase 6

Start with MVP to validate concept, then add advanced features based on user feedback.
