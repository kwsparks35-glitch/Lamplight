# Lamplight — Scripture Memory

> Canonical repository: https://github.com/kwsparks35-glitch/Lamplight


Lamplight is a privacy-respecting, offline-first Scripture memory game built around whole
passages, retrieval practice, spaced review, and encouraging practice games.
It is designed to be free of ads, accounts, analytics, and third-party
tracking.

Version 1.2 is a **source release candidate**, not a claim that signed iOS,
Android, or Linux packages have passed store review. The repository includes
structured web source, a deterministic PWA build, generated and versioned
Capacitor 8 projects, a hardened Electron wrapper, documentation, and
reproducible dependency metadata.

## Learning design

- Whole passages remain meaningful study units instead of being fragmented by
  default.
- Daily Review is the only path that changes spaced-review mastery.
- Practice games strengthen recall and provide feedback but do not certify
  mastery.
- Learners can build named sets by passage, topic, search, chapter, or verse.
- Progress is calm and transparent: due dates, flames, streaks, oil, hints, and
  mistakes are visible without advertising or pressure purchases.

The rationale and its limitations are documented in
[`docs/PEDAGOGY.md`](docs/PEDAGOGY.md).

## Repository status

| Target | Included here | Still required before public release |
|---|---|---|
| Web/PWA | App shell, manifest, service worker, icons | HTTPS host, public policies, browser/device QA |
| iOS/iPadOS | Generated Xcode project, Lamplight assets, Preferences privacy manifest | macOS/Xcode build, signing, devices, TestFlight, review |
| Android | Generated API 36 project, Lamplight assets, v1.2 native version | Android SDK/JDK 21 build, signing, AAB, devices, Play testing/review |
| Linux | Electron 43 wrapper and packaging config | Built/signed artifacts and distribution-specific QA |

## Quick start

Requirements: Node.js 22.14+ (through Node 24) and npm 11 or 12.

```bash
npm ci
npm run build:web
npm run qa
npm run validate:platform
python3 -m http.server 4173 --directory www
```

Open `http://localhost:4173/`. Opening `www/index.html` directly can exercise
the basic web app, but service-worker behavior requires HTTPS or localhost.

Run the Linux desktop wrapper:

```bash
npm run electron:start
```

After changing the web source, rebuild and synchronize both tracked native
projects:

```bash
npm run build:web
npm run sync
```

Generate native icon and launch/splash sets from the `resources/` masters with
Xcode Asset Catalog and Android Studio Image Asset tools. The optional
`@capacitor/assets` generator is excluded because its audited August 2026
dependency chain contains unresolved high/critical vulnerabilities.

The required iOS PrivacyInfo file is already installed in the Xcode target;
`native-templates/` retains the reviewed source template and regeneration
instructions.

## Important commands

| Command | Purpose |
|---|---|
| `npm ci` | Install the exact locked dependency graph |
| `npm run build:web` | Deterministically build the self-contained PWA from `src/` |
| `npm run validate:platform` | Parse platform JSON and syntax-check Electron |
| `npm run qa` | Run deterministic source, corpus, integrity, and Node tests |
| `npm run integrity:update` | Regenerate reviewed hashes after intentional changes |
| `npm run release:source` | Build and self-check the deterministic source ZIP |
| `npm run sync` | Copy web assets and update native dependencies |
| `npm run ios` / `npm run android` | Open an existing generated native project |
| `npm run electron:start` | Run the Electron wrapper in development |
| `npm run electron:package:appimage` | Build an internal AppImage on Linux |
| `npm run electron:package` | Build AppImage, Debian, and Snap candidates |

## Project map

```text
src/                    Editable UI, game logic, fonts, and WEB Classic corpus
www/                    Deterministically generated web/PWA deployment tree
ios/                    Tracked Capacitor/Xcode source project
android/                Tracked Capacitor/Gradle source project (SDK 36)
electron/               Linux desktop wrapper and packaging metadata
resources/              Native icon and splash source images
native-templates/       Required post-generation native files/instructions
third_party_licenses/   Included license and public-domain notices
docs/                   Architecture, pedagogy, QA, history, and release gates
.github/                Issue, pull-request, dependency, and CI configuration
```

The `.gitignore` retains native source and project settings while excluding
build output, dependencies, local machine settings, and signing secrets.

## Privacy and content

Study progress is stored locally. The PWA still contacts its own HTTPS host for
application files and updates, and that host may keep ordinary access logs.
Read [`PRIVACY.md`](PRIVACY.md) before making privacy claims.

The embedded Scripture is identified as the public-domain World English Bible.
Exact upstream edition/revision provenance remains a release gate. Read
[`LICENSES.md`](LICENSES.md) and
[`docs/CONTENT_PROVENANCE.md`](docs/CONTENT_PROVENANCE.md).

The five Sigrid recordings, Beatitudes lyric sheet, generator, and GarageBand
project supplied during development are **not** runtime assets. They remain
rights- and production-pending; see
[`docs/AUDIO_AND_MUSIC.md`](docs/AUDIO_AND_MUSIC.md).

## Documentation

- [`DEPLOYMENT.md`](DEPLOYMENT.md) — platform build and store path
- [`docs/RELEASE_CHECKLIST.md`](docs/RELEASE_CHECKLIST.md) — release gates
- [`docs/QA_PLAN.md`](docs/QA_PLAN.md) — evidence-based test matrix
- [`docs/QA.md`](docs/QA.md) — deterministic validation and manual execution guide
- [`docs/QA_RESULTS.md`](docs/QA_RESULTS.md) — completed source-candidate evidence and limits
- [`docs/KNOWN_ISSUES.md`](docs/KNOWN_ISSUES.md) — open release blockers
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — runtime and trust boundaries
- [`SECURITY.md`](SECURITY.md) — vulnerability reporting
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — repository workflow

## Licensing

The Lamplight-specific project material is currently all rights reserved and
the npm packages are marked `UNLICENSED`. The World English Bible, fonts, and
frameworks retain their own terms. See [`LICENSE`](LICENSE) and
[`LICENSES.md`](LICENSES.md). An explicit project license should be chosen
before accepting outside code contributions or granting reuse rights.
