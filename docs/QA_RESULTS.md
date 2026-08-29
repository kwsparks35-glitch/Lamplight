# Lamplight 1.2 source-candidate QA record

**Source-candidate date:** 2026-08-14

**Scope:** deterministic source release, before signing or store submission

This record separates checks completed in the repository environment from
release evidence that still requires platform build hosts and physical
devices. A passing source gate is not a claim of store approval.

## Completed in this source candidate

- The structured `src/` tree builds `www/` twice with byte-identical output.
- Inline application and platform JavaScript parse successfully.
- The checked-in WEB corpus validates as 66 books, 1,189 chapters, and 31,095
  nonempty verses; all curated topics and the eleven founding passage units
  resolve within canonical bounds.
- Automated behavior tests cover reference parsing, calendar-safe SRS dates,
  v1.1/v3 migration, strict backup validation, Unicode first-letter hints,
  source/build equality, archive safety, and release reproducibility.
- Focused source/VM tests additionally cover browser and Android Back guards,
  regenerated saved-search results, v5-through-v2 keyed corruption quarantine,
  equivalent Verse Builder phrases, confirmed skip semantics, support contact,
  and the shared profile limits.
- A worst-bound compact profile fixture exported to 7,095,127 characters, below
  the 10,000,000-character import ceiling.
- DOM runtime smoke tests completed onboarding, whole-passage Daily Review,
  hint grading and undo, normalized/stateful phrase search, confirmed-skip
  fairness, guarded practice exit, About/privacy/reset guards, Flashcards, and
  set create/rename/delete flows with zero captured runtime errors.
- Capacitor generated and synchronized the tracked iOS and Android projects.
  Static validation checks native identifiers, versions, Android API 36,
  privacy-manifest target membership, and non-default native artwork.
- The locked dependency graph reports zero known vulnerabilities through
  `npm audit --package-lock-only` in the source-candidate environment.
- Integrity manifests, the deterministic source ZIP, and its SHA-256 sidecar
  are regenerated only after the repository tree is frozen.

## Environment limitation encountered

The local browser automation package was available, but its browser binary
was not. Downloading that binary was rejected by the environment's TLS/date
validation. TLS verification was not disabled. The dependency-free source
checks and a local DOM runtime smoke test were used instead; this does not
replace real-browser visual, service-worker, or accessibility testing.

Native compilation was also unavailable in this environment: Android requires
the documented SDK 36/JDK 21 toolchain, and iOS requires macOS/Xcode. Static
native validation is complete, but it is not a substitute for signed builds or
device tests.

## Required before a public binary or store submission

- Build/archive the iOS project on macOS with the release Xcode version, then
  test on physical iPhone and iPad hardware, including VoiceOver.
- Build a signed Android App Bundle with Android SDK 36 and JDK 21, then test
  process death, system Back, TalkBack, and the internal Play track.
- Build AppImage, Debian, and Snap candidates on supported Linux hosts and test
  offline relaunch, persistence, containment, keyboard use, and a screen reader.
- Exercise PWA installation, first cache, update replacement, and airplane-mode
  relaunch in supported Safari, Chromium, and Firefox configurations.
- Complete the manual matrices in `docs/QA.md` and `docs/QA_PLAN.md`, including
  200% text, reduced motion, smallest screens, and all primary routes.
- Resolve the provenance, public policy/support URLs, store metadata, signing,
  screenshots, and review-accountability gates in `docs/KNOWN_ISSUES.md`.

Run `npm run qa` and `npm run release:source` from the frozen tree to reproduce
the final automated results and source archive.
