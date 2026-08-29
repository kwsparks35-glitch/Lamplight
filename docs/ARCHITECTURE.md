# Architecture and trust boundaries

## Source of truth

`src/` is the application source. It separates editable HTML, styles, game and
learning logic, the exact WEB Classic JSON corpus, and font binaries.
`scripts/build-web.mjs` validates and deterministically combines that source
into a self-contained `www/index.html`; it also generates a content-derived
service-worker cache identity. `www/` is committed deployment output, not the
place for hand edits.

The native and desktop wrappers consume the same `www/` directory. Platform
wrappers must not fork the learning logic without documenting the divergence.

```text
src/ ── deterministic build ── www/index.html
   ├── Browser/PWA ── local browser storage + hosting-origin updates
   ├── Capacitor iOS ── Capacitor Preferences / native lifecycle
   ├── Capacitor Android ── Capacitor Preferences / native lifecycle
   └── Electron Linux ── sandboxed renderer + browser local storage
```

## Data model and persistence

Lamplight stores named study sets, passage-unit keys, review state, settings,
streak/oil state, and schema/version metadata. Scripture and topic content are
application assets, not learner records.

The runtime prefers Capacitor Preferences in native containers and browser
storage on the web/Electron, with an explicit memory-only failure mode. Writes
must be serialized and flushed on lifecycle transitions. A displayed storage
status must describe the backend that successfully wrote the most recent data,
not merely the backend selected at startup.

Exported JSON is user-controlled data. Import must validate a versioned schema,
reference bounds, sizes, enum values, and numeric/date ranges before replacing
active progress. Create a pre-import backup and require confirmation.

## Mastery boundary

The spaced-review scheduler is a domain boundary:

- Only an explicit grade in Daily Review changes a passage's level or due date.
- Games can read passage content and award oil but cannot write mastery.
- Search, browse, hints, and passive reading cannot advance mastery.
- Calendar dates—not fixed elapsed milliseconds—define daily due/streak state.

This boundary should remain covered by automated regression tests.

## PWA boundary

The PWA downloads the app shell from its own HTTPS origin and stores successful
responses in a versioned Cache Storage entry. The service worker:

- handles same-origin GET requests only;
- rejects failed precache responses;
- uses network-first navigation with an offline shell fallback;
- refreshes successful static assets in the background; and
- deletes only caches with Lamplight's own prefix.

The host remains outside the application's local-data boundary. It can observe
ordinary web requests and may keep access/security logs; see `PRIVACY.md`.

## Capacitor boundary

Capacitor 8 embeds the same web app in platform WebViews. Direct plugins are
limited to App lifecycle/back-button integration and Preferences. No camera,
microphone, location, contacts, advertising, or analytics plugin is required.

Generated `ios/` and `android/` projects are committed reviewable source.
Copied web output inside those projects, package dependencies, build output,
and signing credentials remain ignored.

## Electron boundary

Electron loads only local packaged assets through `lamplight://app/`. The main
process:

- resolves development assets from the repository's `www/` sibling and
  packaged assets from the application archive;
- prevents path traversal in protocol requests;
- enables Chromium renderer sandboxing and context isolation;
- disables Node integration, webviews, insecure content, and production
  developer tools;
- denies all permission checks and requests;
- blocks external navigation and new windows; and
- sends restrictive CSP and browser security headers.

No preload bridge or IPC API is exposed. Export downloads still use ordinary
browser behavior and must be tested in the packaged app.

The generated application remains a single self-contained HTML artifact for
portable offline use, so Electron's renderer CSP still permits inline script
and style. The editable source is separated; a future output-format change to
external hashed assets would permit a stricter renderer policy.

## Secrets and supply chain

The app needs no runtime secret. Store credentials, code-signing material,
keystores, API keys, and environment files must never be committed. Package
versions are exact and the npm lockfile is authoritative. Dependency changes
should be isolated, reviewed, audited, and tested before merge.

## Audio boundary

Rights-pending Sigrid and Beatitudes source files are not application assets.
No build step should copy them into `www/`, native resources, Electron
packages, or GitHub releases. See `docs/AUDIO_AND_MUSIC.md`.
