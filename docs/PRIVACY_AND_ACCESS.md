# Privacy, browser storage and access files

**Audience:** users and security reviewers. **Revision:** `dcc5f0b`. This page describes *identified client implementation*, not a completed third-party/network privacy audit.

## Storage layers in the source

- `App.tsx` stores UI mode, welcome status, scanlines, default volume and headphone-warning choices in browser `localStorage`.
- `src/utils/local-storage-manager.ts` provides local routines, session history, progress, settings, import/export and deletion helpers.
- `src/analytics/LocalAnalytics.ts` implements an on-device `localStorage` event log with explicit local export/clear methods.
- `src/utils/profileStorage.ts` uses Origin Private File System (OPFS) when available and IndexedDB as a fallback for profile blobs. Its source describes origin isolation and encrypted data.
- `src/services/PlanDatabase.ts` implements IndexedDB stores for protocol plans, sessions, check-ins, metrics and an audit log.
- `components/DataExportPanel.tsx` includes JSON/CSV export options, including anonymization controls.

These are **several storage mechanisms**, not one centralized data store. A browser may clear or evict origin storage; private browsing and device/profile changes can isolate or discard it. Back up any data you wish to preserve before clearing cache/site data.

## Public-preview and `.syns` distinction

`AccessKeyService.createPublicReleaseSession()` creates a default **local preview session** in the public build; `App.tsx` falls back to it when no cached session is restored. It is not a claim of a verified paid subscription.

The older `.syns` file format uses an encoded membership payload, HMAC and AES-GCM encrypted user-data. The HMAC context exists **in shipped client code**, and data-key material is derived from public/portable data. The code itself states that legacy files are convenience files, **not a reliable paid-entitlement security boundary**. Do not store highly sensitive personal data in such a file on the assumption it is protected against a determined attacker who has the client.

Treat exported JSON, CSV, WAV, `.syns` and browser backups as personal artifacts: check file contents, storage location, recipient, retention and whether you intend to publish them.

## Privacy promises not established here

The presence of local-first modules does not prove that **every** asset, payment link, optional research flow, integration or network request is offline/private. The repository contains checkout URLs in `config.ts` and various optional/export/wearable components. No fresh full-network crawl, browser telemetry capture, third-party dependency inspection or hosted-config assessment was run.

Do not promise “zero network requests,” “end-to-end encrypted medical-grade storage,” “HIPAA compliance,” or a permanently server-independent service from this source audit.

## Practical user controls

Use application export to save data before a browser reset; review research-export preferences before volunteering data. If you want to remove local records, use the app's available clear/delete controls and then inspect browser site data; deleting one storage namespace may not delete data held in another. Treat deletion as **not independently verified** unless each mechanism is tested.

## Research contribution

Informed consent must describe exactly which fields leave the device, whether anonymization is reversible, destination, retention and withdrawal limits. “Anonymized” export is not automatically free of re-identification risk, particularly with timestamps and longitudinal biometric observations.

**Next:** [Safety](SAFETY_AND_EVIDENCE.md), [Release boundary](RELEASE_AND_PROVENANCE.md), [Audit](REPOSITORY_AUDIT_2026-10-19.md).
