# Prescription System - Comprehensive Analysis

## Overview

A system for practitioners to prescribe custom brainwave entrainment routines to users via JSON files. All data stored locally, user-controlled, with scheduling and progress tracking.

---

## 🚨 IDENTIFIED BLINDSPOTS

### 1. **Medical/Legal Concerns**

**Issue:** The word "prescription" has legal implications.

**Risks:**
- Implies medical treatment (regulated in many jurisdictions)
- Liability if user has adverse reaction
- Practitioner credentialing requirements
- FDA/medical device regulations (binaural beats as therapy)

**Mitigation:**
- Rename to "Recommended Routine" or "Protocol Plan"
- Add prominent disclaimer: "Not medical advice"
- Require user acknowledgment before importing
- Add terms of service acceptance
- Consider "wellness plan" instead of "prescription"

**Recommendation:** Use "Protocol Plan" terminology throughout.

---

### 2. **Data Portability & Practitioner Feedback Loop**

**Issue:** How does practitioner receive progress updates?

**Current Design:** 100% local (no server)

**Problems:**
- Practitioner can't see adherence
- No feedback loop for adjustments
- User must manually export/email data

**Solutions:**
1. **Export Reports** (Recommended)
   - User exports weekly/monthly JSON report
   - Emails to practitioner manually
   - Practitioner reviews and updates plan

2. **QR Code Sharing**
   - Generate QR code with encrypted session data
   - Practitioner scans during appointment
   - Still local-first, no cloud storage

3. **Optional Cloud Sync**
   - Opt-in only
   - E2E encrypted
   - User controls sharing permissions

**Recommendation:** Start with manual export, add QR sharing in v2.

---

### 3. **Multi-Practitioner Conflicts**

**Issue:** User sees multiple practitioners.

**Scenarios:**
- User has anxiety plan from therapist A
- User has sleep plan from therapist B
- Conflicting schedules or protocols

**Solutions:**
- Support multiple active plans
- Color-coded calendar for each practitioner
- Conflict detection (warn if 2 sessions scheduled same time)
- Allow user to prioritize plans

**Recommendation:** Support multiple plans from day 1.

---

### 4. **Protocol Versioning & Deprecation**

**Issue:** Protocol plan references protocol by ID. What if protocol is updated or removed?

**Scenarios:**
- Plan created with v1.0 protocols
- App updates to v2.0, protocol IDs change
- Protocol deprecated for safety reasons

**Solutions:**
- Embed protocol version in plan
- Migration system for deprecated protocols
- Validate protocol IDs on import
- Suggest replacement if protocol missing

**Recommendation:** Add protocol version pinning in JSON schema.

---

### 5. **Timezone Handling**

**Issue:** User travels across timezones.

**Problems:**
- "8:00 AM" becomes 5:00 AM after timezone change
- Session times become impractical
- Adherence tracking breaks

**Solutions:**
1. **Relative Times** (Recommended)
   - "Morning (within 2 hours of wake)"
   - "Evening (2 hours before sleep)"
   - User sets wake/sleep times

2. **Auto-Adjust**
   - Detect timezone change
   - Offer to shift all sessions
   - Maintain same local time

**Recommendation:** Use time-of-day labels (morning/afternoon/evening) + preferred times as suggestions.

---

### 6. **Missed Sessions & Adherence**

**Issue:** User misses sessions. What happens?

**Scenarios:**
- Skip one session: reschedule or skip?
- Miss entire week: catch up or continue?
- Vacation/illness: pause entire plan?

**Solutions:**
- **Flexible Mode**: Sessions are suggestions, not rigid
- **Catch-Up Mode**: Missed sessions rollover to next day
- **Pause Feature**: Pause plan, resume later (extends end date)
- **Grace Period**: 2-hour window around preferred time

**Recommendation:** Flexible by default, with "strict mode" option for clinical trials.

---

### 7. **Notification System**

**Issue:** How to remind users without being invasive?

**Options:**
1. **Web Notifications** (Browser API)
   - Requires permission
   - Works offline (Service Worker)
   - Can be blocked by user

2. **In-App Reminders**
   - Only when app is open
   - Less effective

3. **External Calendar**
   - Export to Google Calendar / Apple Calendar
   - User controls notifications there
   - Privacy-preserving

4. **Email Reminders** (Requires server)
   - Not compatible with local-only design

**Recommendation:** Web notifications (opt-in) + external calendar export.

---

### 8. **Progress Visualization**

**Issue:** How to show progress meaningfully?

**User Needs:**
- Am I on track?
- How much have I completed?
- Am I improving?

**Metrics:**
- **Adherence Rate**: % of completed vs scheduled sessions
- **Streak**: Consecutive days with sessions
- **Phase Progress**: Current phase, time remaining
- **Goal Tracking**: Custom milestones from plan
- **Subjective**: Mood, anxiety, sleep quality (self-reported)

**Recommendation:** Dashboard with adherence chart, current phase, upcoming sessions.

---

### 9. **User Modifications**

**Issue:** Should users be able to edit prescribed plans?

**Scenarios:**
- User wants to skip a protocol they dislike
- User wants to adjust session time
- User wants to extend a phase

**Solutions:**
1. **Locked Mode**: Plan cannot be modified (clinical use)
2. **Flexible Mode**: User can adjust (wellness use)
3. **Hybrid**: Some parameters locked, others adjustable

**Recommendation:** Allow schedule adjustments, lock protocol sequences (with practitioner approval).

---

### 10. **Data Integrity & Tampering**

**Issue:** Can users modify JSON to fake adherence?

**Risks:**
- User edits JSON to show 100% completion
- Practitioner makes decisions based on false data
- Research validity compromised

**Solutions:**
- **Digital Signature** (Practitioner signs plan with private key)
- **Checksum/Hash** (Detect modifications)
- **Append-Only Log** (Session records can't be deleted)
- **Trusted Timestamps** (Server timestamp for research)

**Recommendation:** Add SHA-256 hash of plan, verify on import. Warn if modified.

---

### 11. **Offline Functionality**

**Issue:** User has no internet. Can they still use plans?

**Requirements:**
- Import plan while online
- Execute sessions offline
- Track progress offline
- Sync when online (if cloud enabled)

**Implementation:**
- IndexedDB for local storage
- Service Worker for offline app
- LocalStorage for small config

**Recommendation:** Full offline support from day 1.

---

### 12. **Age Restrictions & Safety**

**Issue:** Are there age/health restrictions?

**Considerations:**
- Children under 18: parental consent?
- Photosensitive epilepsy: flashing visuals?
- Pregnancy: certain frequencies contraindicated?
- Mental health conditions: panic triggers?

**Solutions:**
- Age verification on import
- Health screening questionnaire
- Contraindication warnings in plan JSON
- Emergency stop protocol

**Recommendation:** Add safety questionnaire on first-time plan import.

---

### 13. **Conditional Logic Complexity**

**Issue:** Plans can have conditional branches. How complex should these be?

**Examples:**
- "If anxiety > 7, use protocol X"
- "If missed 3 sessions, extend phase by 1 week"
- "If sleep quality < 5, add evening protocol"

**Risks:**
- Complex logic = harder to validate
- Edge cases cause bugs
- User confusion about why plan changed

**Recommendation:** Start with simple conditions (missed sessions, phase completion). Add advanced logic in v2.

---

### 14. **Plan Expiration**

**Issue:** Should plans expire?

**Scenarios:**
- 8-week plan completes, then what?
- Plan expires while user on vacation
- User wants to repeat a completed plan

**Solutions:**
- **Auto-Archive**: Plan moves to "Completed" after duration
- **Renewal**: Practitioner issues new plan
- **Repeat Mode**: User can restart completed plan
- **Maintenance Phase**: Final phase loops indefinitely

**Recommendation:** Archive on completion, allow manual repeat (with warning that practitioner hasn't reviewed).

---

### 15. **Data Export Format**

**Issue:** What format for user's progress data?

**Options:**
1. **JSON** (Machine-readable)
   - Easy to parse
   - Practitioner needs tools to view

2. **PDF Report** (Human-readable)
   - Professional appearance
   - Graphs, charts, summary
   - Not editable

3. **CSV** (Spreadsheet)
   - Easy analysis in Excel
   - No rich formatting

**Recommendation:** All three formats. JSON for re-import, PDF for sharing, CSV for analysis.

---

## 📋 PRESCRIPTION JSON SCHEMA

### Version 1.0.0

```json
{
  "schema_version": "1.0.0",
  "type": "synsync-protocol-plan",

  "meta": {
    "id": "plan-uuid-v4-here",
    "created_at": "2026-02-23T10:00:00Z",
    "expires_at": "2026-05-23T10:00:00Z",
    "version": 1,
    "
": {
      "name": "Dr. Jane Smith",
      "credentials": "PhD, Clinical Neurotherapy",
      "email": "jane.smith@clinic.com",
      "phone": "+1-555-0100",
      "license_number": "CNT-CA-12345",
      "organization": "NeuroWellness Clinic"
    },
    "patient": {
      "anonymous_id": "patient-sha256-hash",
      "initials": "JS",
      "age_range": "25-35",
      "assigned_at": "2026-02-23T10:00:00Z"
    }
  },

  "plan": {
    "title": "Anxiety Reduction Protocol - 8 Weeks",
    "description": "Progressive theta-alpha entrainment for generalized anxiety reduction",
    "category": "anxiety_reduction",
    "duration_weeks": 8,
    "intensity": "moderate",
    "evidence_level": "II",

    "goals": [
      "Reduce baseline anxiety by 30-40%",
      "Establish daily meditation practice",
      "Improve sleep onset time",
      "Increase alpha wave dominance during rest"
    ],

    "contraindications": [
      "History of seizures",
      "Photosensitive epilepsy",
      "Active psychosis",
      "Severe tinnitus"
    ]
  },

  "schedule": {
    "timezone": "America/Los_Angeles",
    "start_date": "2026-02-24",
    "flexible_scheduling": true,
    "grace_period_minutes": 120,

    "phases": [
      {
        "phase_number": 1,
        "title": "Foundation Phase",
        "description": "Establish baseline and introduce theta rhythms",
        "start_day": 0,
        "duration_days": 14,
        "mandatory": true,

        "sessions": [
          {
            "id": "morning-calm",
            "protocol_id": "acsw",
            "protocol_version": "2.0",
            "frequency": "daily",
            "time_of_day": "morning",
            "preferred_time": "08:00",
            "time_window": "07:00-10:00",
            "mandatory": true,
            "settings": {
              "volume": 0.6,
              "hdEnabled": true,
              "complexity": 0.4,
              "visualizer": "neural"
            },
            "instructions": {
              "before": "Find quiet space. Use headphones. Sit comfortably.",
              "during": "Eyes closed. Focus on breath. Let thoughts pass.",
              "after": "Journal any insights. Note mood changes."
            }
          },
          {
            "id": "evening-deep",
            "protocol_id": "atb-10",
            "protocol_version": "2.0",
            "frequency": "5x_per_week",
            "time_of_day": "evening",
            "preferred_time": "20:00",
            "time_window": "19:00-22:00",
            "mandatory": false,
            "settings": {
              "volume": 0.5,
              "hdEnabled": true,
              "complexity": 0.3
            },
            "instructions": {
              "before": "Dim lights. Use comfortable chair or bed.",
              "during": "Allow yourself to drift. Don't fight drowsiness.",
              "after": "Transition directly to sleep if drowsy."
            }
          }
        ],

        "weekly_targets": {
          "min_sessions": 7,
          "recommended_sessions": 10,
          "rest_days": ["sunday"]
        },

        "progression_criteria": {
          "min_completion_rate": 0.7,
          "required_consecutive_days": 7,
          "allow_phase_skip": false
        }
      },

      {
        "phase_number": 2,
        "title": "Deepening Phase",
        "description": "Increase theta depth and alpha bridge work",
        "start_day": 14,
        "duration_days": 21,
        "mandatory": true,

        "sessions": [
          {
            "id": "morning-theta",
            "protocol_id": "tg-cfc",
            "frequency": "daily",
            "time_of_day": "morning",
            "preferred_time": "08:00",
            "mandatory": true,
            "settings": {
              "volume": 0.7,
              "complexity": 0.6
            }
          },
          {
            "id": "afternoon-boost",
            "protocol_id": "ti-pbm",
            "frequency": "3x_per_week",
            "time_of_day": "afternoon",
            "preferred_time": "14:00",
            "mandatory": false,
            "conditions": [
              {
                "metric": "energy_level",
                "operator": "<",
                "value": 5,
                "action": "suggest"
              }
            ]
          }
        ],

        "weekly_targets": {
          "min_sessions": 10,
          "recommended_sessions": 14
        }
      }
    ],

    "maintenance_phase": {
      "enabled": true,
      "start_after_completion": true,
      "title": "Maintenance",
      "description": "Continue at reduced frequency to maintain gains",
      "sessions": [
        {
          "protocol_id": "acsw",
          "frequency": "3x_per_week",
          "time_of_day": "morning"
        }
      ]
    }
  },

  "protocols": {
    "allowed": ["acsw", "atb-10", "tg-cfc", "ti-pbm"],
    "restricted": ["dmt-epic", "salvia-mimicry"],
    "recommended_visualizers": ["neural", "cosmic", "alpha-waves"],
    "intensity_limits": {
      "volume_max": 0.8,
      "complexity_max": 0.7
    }
  },

  "tracking": {
    "required_metrics": [
      "completion_status",
      "session_duration",
      "actual_start_time",
      "protocol_used",
      "settings_used"
    ],

    "optional_metrics": [
      {
        "id": "mood_before",
        "label": "Mood Before Session",
        "type": "scale",
        "min": 1,
        "max": 10,
        "required": false
      },
      {
        "id": "mood_after",
        "label": "Mood After Session",
        "type": "scale",
        "min": 1,
        "max": 10,
        "required": false
      },
      {
        "id": "anxiety_level",
        "label": "Anxiety Level",
        "type": "scale",
        "min": 1,
        "max": 10,
        "required": true,
        "frequency": "daily"
      },
      {
        "id": "sleep_quality",
        "label": "Sleep Quality",
        "type": "scale",
        "min": 1,
        "max": 10,
        "required": false,
        "frequency": "daily"
      },
      {
        "id": "notes",
        "label": "Session Notes",
        "type": "text",
        "required": false
      }
    ],

    "check_ins": [
      {
        "day": 7,
        "title": "Week 1 Check-In",
        "questions": [
          "How are you feeling overall?",
          "Any difficulties with the sessions?",
          "Sleep quality changes?"
        ]
      },
      {
        "day": 14,
        "title": "Phase 1 Complete",
        "questions": [
          "Have you noticed anxiety reduction?",
          "Are session times working for you?",
          "Ready to move to deeper protocols?"
        ]
      }
    ],

    "milestones": [
      {
        "day": 7,
        "title": "First Week Complete!",
        "required_sessions": 7,
        "reward": "You've established a daily practice. Well done!",
        "badge": "7-day-streak"
      },
      {
        "day": 30,
        "title": "One Month Milestone",
        "required_sessions": 30,
        "reward": "30 days of consistent practice. You're building real neuroplasticity!",
        "badge": "30-day-warrior"
      }
    ]
  },

  "conditional_logic": [
    {
      "condition": {
        "metric": "missed_sessions_consecutive",
        "operator": ">=",
        "value": 3
      },
      "action": "show_reminder",
      "priority": "high",
      "message": "You've missed 3 consecutive sessions. Consider adjusting your schedule or reaching out to your practitioner."
    },
    {
      "condition": {
        "metric": "anxiety_level",
        "operator": ">",
        "value": 8,
        "duration_days": 3
      },
      "action": "suggest_extra_session",
      "protocol_id": "acsw",
      "message": "Your anxiety has been elevated for 3 days. An extra calming session may help."
    },
    {
      "condition": {
        "metric": "completion_rate_weekly",
        "operator": "<",
        "value": 0.5
      },
      "action": "show_warning",
      "message": "Your completion rate is below 50%. Low adherence may reduce effectiveness. Would you like to adjust your schedule?"
    }
  ],

  "instructions": {
    "general": {
      "setup": "Find a quiet, comfortable space. Use stereo headphones for binaural protocols. Ensure you won't be interrupted for the session duration.",
      "during": "Sit or lie comfortably. Close your eyes. Focus on your breath or the audio. Allow thoughts to pass without judgment.",
      "after": "Take a few moments before resuming activities. Journal your experience if desired.",
      "safety": "If you feel uncomfortable, dizzy, or anxious, pause immediately. These effects are rare but should be respected."
    },

    "emergency_contacts": [
      {
        "role": "Practitioner",
        "name": "Dr. Jane Smith",
        "phone": "+1-555-0100",
        "email": "jane.smith@clinic.com",
        "hours": "Mon-Fri 9am-5pm PST"
      },
      {
        "role": "Crisis Support",
        "name": "988 Suicide & Crisis Lifeline",
        "phone": "988",
        "available": "24/7"
      }
    ]
  },

  "consent": {
    "required": true,
    "text": "By accepting this protocol plan, I acknowledge that:\n\n1. This is not medical advice and does not replace professional mental health treatment.\n2. I have disclosed any relevant health conditions to my practitioner.\n3. I understand the contraindications and have no disqualifying conditions.\n4. I will stop immediately if I experience adverse effects.\n5. I am responsible for my own safety and wellbeing.\n6. All data is stored locally on my device and under my control.\n7. I may discontinue this plan at any time.",

    "patient_signature": {
      "signed": false,
      "signed_at": null,
      "ip_address": null,
      "user_agent": null
    }
  },

  "security": {
    "plan_hash": "sha256:abc123...",
    "practitioner_signature": "-----BEGIN PGP SIGNATURE-----...",
    "tamper_detection": true,
    "encryption": "none",
    "audit_log_enabled": true
  },

  "export_permissions": {
    "allow_user_export": true,
    "export_formats": ["json", "pdf", "csv"],
    "include_subjective_data": true,
    "anonymize_on_export": true
  }
}
```

---

## 🎯 RECOMMENDED IMPLEMENTATION PHASES

### Phase 1: Core (MVP)
- Import/validate JSON plans
- Display plan overview
- Basic calendar view
- Execute scheduled protocols
- Track completion (binary: done/not done)

### Phase 2: Tracking & Progress
- Subjective metrics (mood, anxiety scales)
- Progress dashboard
- Adherence charts
- Milestone badges
- Weekly check-ins

### Phase 3: Advanced Scheduling
- Multi-plan support
- Flexible scheduling
- Missed session handling
- Timezone adjustments
- Calendar export (iCal format)

### Phase 4: Conditional Logic
- Simple conditions (missed sessions)
- Metric-based suggestions
- Phase progression criteria
- Maintenance mode

### Phase 5: Data Export
- JSON progress export
- PDF report generation
- CSV export for analysis
- Practitioner feedback forms

### Phase 6: Security & Compliance
- Digital signatures
- Tamper detection
- Audit logs
- HIPAA consideration (if clinical use)

---

## 🔐 PRIVACY & SECURITY

### Local-First Principles
1. **No Server Required**: All data in IndexedDB
2. **User Owns Data**: Can export/delete anytime
3. **Optional Sharing**: User chooses what to share
4. **Encryption**: Sensitive notes encrypted at rest
5. **Audit Trail**: Append-only log of all actions

### Data Storage
```
IndexedDB Schema:
- plans: { id, json_data, imported_at, status }
- sessions: { id, plan_id, protocol_id, timestamp, duration, metrics }
- check_ins: { id, plan_id, day, responses, submitted_at }
- milestones: { id, plan_id, milestone_id, achieved_at }
- audit_log: { id, action, timestamp, details }
```

### Export Encryption
- User generates export key (passphrase)
- AES-256 encryption
- Practitioner has decryption key
- Optional: GPG/PGP for practitioner public key encryption

---

## 📊 UI/UX CONSIDERATIONS

### Dashboard
- Active plan overview
- Today's sessions
- Upcoming sessions (next 7 days)
- Adherence percentage
- Current streak

### Calendar View
- Month view with session dots
- Color-coded by plan/practitioner
- Tap day to see details
- Filter by plan
- Export to external calendar

### Session Tracking
- Pre-session prompt for mood/anxiety
- During session: standard protocol player
- Post-session: quick metrics form
- Optional detailed notes

### Progress View
- Line charts (anxiety over time)
- Adherence calendar heatmap
- Phase timeline
- Goal completion checklist
- Badges/achievements

---

## 🚀 TECHNICAL ARCHITECTURE

### Data Flow
```
1. Import: File → Validate → Parse → Store (IndexedDB)
2. Schedule: Plan → Generate Calendar Events → Store
3. Execute: Calendar Event → Launch Protocol → Track → Store Results
4. Export: Query IndexedDB → Format → Download File
```

### Key Components
- `PlanImporter.tsx`: Drag-drop JSON import
- `PlanValidator.ts`: Schema validation
- `PlanScheduler.ts`: Generate calendar events
- `PlanExecutor.tsx`: Launch scheduled protocols
- `ProgressTracker.ts`: Record session data
- `PlanCalendar.tsx`: Calendar UI
- `ProgressDashboard.tsx`: Charts and metrics
- `PlanExporter.ts`: Export progress data

---

## ⚖️ LEGAL DISCLAIMER

**CRITICAL:** Add prominent disclaimer:

```
IMPORTANT NOTICE

This protocol plan is provided for informational and wellness purposes only.
It is NOT medical advice, diagnosis, or treatment.

Brainwave entrainment is not FDA-approved for medical use. Do not use as
a substitute for professional medical or mental health care.

If you have a medical condition, are taking medication, or are under
professional care, consult your healthcare provider before using this plan.

Discontinue immediately if you experience adverse effects.
```

---

## Summary

This prescription/protocol plan system is **feasible and valuable**, but requires:

1. **Careful terminology** (avoid "prescription")
2. **Strong disclaimers** (legal protection)
3. **Robust validation** (schema enforcement)
4. **User control** (pause, adjust, delete anytime)
5. **Privacy-first** (local storage, optional export)
6. **Practitioner tools** (JSON generator for Claude instance)

**Biggest Risk:** Medical liability if marketed as treatment.
**Biggest Value:** Structured, evidence-based use with progress tracking.

Ready to proceed with task list?
