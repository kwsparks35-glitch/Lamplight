# Changelog

All notable changes to Lamplight are recorded here. Dates describe source
releases, not app-store approval dates.

## [1.2.1] - Unreleased

### Added

- `docs/FIELD_REPORTS.md`: a triaged log of user-discovered issues alongside
  the QA documents, seeded with FR-001 (the first-letter hint fix below),
  including a filing guide and entry template.
- Desktop packaging targets for Windows (NSIS installer and portable) and
  macOS (dmg) in `electron/package.json`, joining the existing Linux
  AppImage/deb/snap targets.

### Fixed

- First-letter review hints now mirror the passage faithfully: every word
  contributes its true first letter (Unicode-aware, so curly quotation marks
  and apostrophes no longer swallow letters), original capitalization is
  preserved as a memory cue, opening quotes and trailing punctuation are kept
  so dialogue and sentence shape remain visible, and pure-punctuation tokens
  are no longer silently dropped. Output remains HTML-escaped. The pinned
  hint-behavior tests were updated to encode the corrected contract, including
  a property test that no word's letter can go missing.

## [1.2.0] - Unreleased

### Learning, data, and accessibility

- Corrected and strengthened the whole-passage review, local calendar,
  persistence, migration, backup, game-state, and assistive-technology design.
- Preserved Daily Review as the only workflow allowed to change mastery;
  practice games award oil and report slips separately.
- Added guarded practice exits, accessible hint/reveal/skip recovery, clean-versus-
  assisted game scoring, equivalent-phrase acceptance, and keyboard-complete set
  rename/delete flows.
- Added punctuation- and whitespace-normalized phrase search with restored tab,
  topic, book, chapter, and search state when navigating back.
- Added keyed corrupt-profile quarantine and recovery downloads, compact exports,
  bounded counters, orphan-record cleanup, and shared limits of 100 sets, 5,000
  passage units per set, and 40,000 units per profile.
- Added explicit pedagogy documentation and bounded effectiveness claims.
- Split the application into maintainable `src/` modules and a deterministic,
  self-contained `www/` build while preserving a single-file offline runtime.
- Replaced runtime Scripture decompression with a checked-in, validated WEB
  Classic source corpus so older supported WebViews are not dependent on
  `DecompressionStream`.

### Platform and security

- Upgraded the Linux runtime from unsupported Electron 33 to pinned Electron
  43.4.0 and electron-builder 26.15.3.
- Fixed Electron's development/packaged asset resolution and added a sandboxed
  custom protocol, context isolation, denied permissions, blocked navigation
  and popups, and response security headers.
- Pinned the Capacitor 8 runtime/plugins/tooling and added a reproducible npm
  workspace lockfile.
- Generated and versioned the iOS and Android source projects, installed the
  reviewed iOS privacy manifest, set the native 1.2.0 identifiers/versions,
  configured Android API 36, and replaced default native artwork with
  Lamplight icon and splash assets.
- Removed the optional `@capacitor/assets` 3.0.5 generator after its obsolete
  transitive archive/image toolchain produced unresolved high/critical audit
  findings; native asset masters remain checked in for reviewed platform-tool
  generation.
- Removed unused Google Services and Android network permission declarations;
  pinned the smaller Gradle 8.14.3 binary distribution and its publisher-listed
  SHA-256 checksum.
- Stopped ignoring native/Electron source while continuing to ignore build
  output and signing secrets.
- Hardened the PWA cache against failed responses and unrelated-cache deletion;
  added stable manifest identity/scope metadata.

### Documentation and release governance

- Replaced absolute privacy claims with platform-accurate web-host, support,
  backup, export, and deletion disclosures.
- Added conservative project licensing, direct dependency/font/WEB notices,
  and explicit content-provenance gates.
- Added architecture, QA, release, known-issues, project-history, audio-scope,
  contribution, conduct, security, support, and GitHub workflow files.
- Added dependency-free validation and behavior tests, deterministic safe-ZIP
  creation/inspection, source and artwork integrity manifests, and CI gates for
  generated web output, native metadata, privacy resources, and Gradle provenance.
- Added the iOS required-reason privacy-manifest template and honest native-
  generation guidance.

## [1.1.0] - 2026-08-14

- Inherited prototype baseline containing the embedded WEB corpus, 11-passage
  starter deck, named sets, four games, local persistence, PWA assets,
  Capacitor metadata, and an initial Electron scaffold.

The v1.1 date identifies the supplied source package. It does not imply that
native stores approved or distributed that version.
