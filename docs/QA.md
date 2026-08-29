# Lamplight quality-assurance guide

Lamplight's automated gate is dependency-light and uses Node's standard library. It checks deterministic facts that should never rely on a reviewer noticing a problem by eye. Native device behavior and store acceptance still require the manual matrix below.

## Prerequisite

- Node.js 22 or newer

No `npm install` is required to run the source, corpus, ZIP, and integrity tests.

Rebuild the self-contained deployment tree from its editable source and verify that the committed output is current:

```sh
npm run build:web
git diff --exit-code -- www
```

The QA suite performs the same comparison in an isolated temporary checkout and builds twice to prove byte-for-byte reproducibility without modifying the working tree:

```sh
node scripts/check-web-build.mjs
```

## Fast commands

After an intentional source change, regenerate the inventories once and review their diff:

```sh
node scripts/generate-integrity.mjs --write
```

Run the complete deterministic gate:

```sh
node scripts/qa.mjs
```

The same actions can be run separately:

```sh
node scripts/validate.mjs
node --test
node scripts/generate-integrity.mjs
```

Build and verify the source release:

```sh
node scripts/build-release.mjs
node scripts/check-zip.mjs dist/lamplight-1.2.0-source.zip --expect-prefix lamplight-1.2.0/ --expect-executable android/gradlew
sha256sum -c dist/lamplight-1.2.0-source.zip.sha256
```

The ZIP command uses a small in-repository writer rather than platform-specific archive metadata. Files are sorted, stored with a fixed 1980-01-01 ZIP timestamp, and assigned deterministic regular-file modes: `0755` only for the explicit `android/gradlew` executable allowlist and `0644` for every other entry. Files are never sourced from dependency, build, environment, credential, or signing-secret paths.

## Automated release gates

### HTML and JavaScript

- HTML5 document shell exists exactly once.
- Every inline script compiles as JavaScript without executing browser code.
- No script, stylesheet, image, font, media, frame, or literal network call loads from a remote runtime URL.
- `src/` builds the checked-in `www/` tree byte-for-byte, and two clean builds are identical.
- Every build token is consumed; the generated application contains neither `BIBLE_B64` nor a `DecompressionStream` dependency.

### Scripture and pedagogy

- `src/data/web-classic.json` is canonical compact JSON and exactly matches the generated inline `BIBLE_DATA` object.
- The corpus contains exactly 66 books, 1,189 chapters, and 31,095 nonempty verse records.
- Book names and per-book chapter counts match the Protestant canonical structure used by the app.
- The declared verse total equals the calculated total.
- Every topic reference names a canonical book and stays within its chapter/verse bounds.
- The founding deck remains eleven ordered passage units covering 34 verses.
- The interval declaration stays `1, 2, 4, 7, 14, 30` days.
- Known regressions that skip the first interval or add fixed 24-hour milliseconds to local dates fail validation.
- Matthew 10:8 app copy retains WEB's word “so.”

### PWA and platform consistency

- `APP_VERSION`, `package.json`, and the service-worker cache version agree.
- The web manifest, app shell, Apple touch icon, and every manifest icon exist and are precached.
- PNG dimensions match manifest declarations.
- Capacitor points at `www`, and the native/PWA app names agree.
- Android source pins namespace/application ID, API 36 compile/target levels, and version `1.2.0` (build `12000`).
- The fully bundled Android app requests no platform permissions and carries no unused Google Services build classpath.
- The Gradle wrapper pins the official 8.14.3 binary distribution checksum, validates its URL, and matches the reviewed official wrapper-JAR SHA-256.
- iOS source pins the same bundle ID and marketing/build versions; its installed Privacy Manifest is template-identical and belongs to the Xcode Resources phase.
- Every reviewed Android/iOS Lamplight launcher icon matches its versioned SHA-256 and pixel dimensions, while known default Capacitor artwork is absent.
- Node 22 remains the declared minimum.

### Supply-chain and archive safety

- Asset and full-source SHA-256 inventories are current.
- Native project source, Gradle wrapper, SPM package, privacy file, and icon catalogs are included. Capacitor/Cordova sync output (copied `public/`, generated config and plugin scaffolds), build output, local-machine files, credentials, and signing output are excluded in alignment with the native `.gitignore` files.
- Release inputs contain no symlinks.
- ZIP validation rejects absolute paths, parent traversal, backslashes, drive letters, Unicode/case collisions, symlinks, encryption, unsupported compression, CRC failures, extreme expansion ratios, and excessive extracted size.
- ZIP validation verifies `android/gradlew` extracts executable (`0755`) while every other source entry remains `0644`.
- Two builds from the same tree are byte-for-byte identical.

## Manual pedagogy matrix

Complete these scenarios against a clean profile and an upgraded v1.1 profile:

| Scenario | Expected result |
|---|---|
| First successful review | Passage returns after one local calendar day and moves only one flame level |
| Continued success | Due intervals follow 1 → 2 → 4 → 7 → 14 → 30 days |
| Missed review | Level decreases once and passage returns the next local calendar day |
| DST transition | Due date and streak use the learner's calendar date; no one-hour drift or lost day |
| Recognition game | Oil/slips/streak feedback updates, but SRS level and due date do not change |
| App background/force close | Latest set edit and grade survive immediate termination |
| Failed storage backend | Learner sees a persistent warning and can export before continuing |
| v1.1 upgrade | Existing work is preserved and known founding verses migrate according to the documented passage rule |
| Backup import | Invalid/tampered data is rejected; valid import requires confirmation and preserves a pre-import backup |
| Ambiguous Verse Match | Every visible prompt is unique within its round or exposes enough context to disambiguate |

Use controlled date injection in development builds where possible. Never change a review schedule merely to make a manual test convenient.

## Manual accessibility and UI matrix

Test each primary flow—onboarding, Home, Daily Review, all games, set management, topic/filter/search/canon browsers, backup/restore, About/Privacy—with:

- Touch only on the smallest supported phone
- Hardware keyboard only, including visible focus and Escape/Back behavior
- VoiceOver on iOS and TalkBack on Android
- Linux screen reader plus keyboard
- 200% text scaling/zoom without clipped actions or horizontal reading scroll
- Reduced motion enabled
- Light sensitivity/low brightness and outdoor contrast checks
- Left-to-right English reading order and logical announcement order after navigation

Controls must be semantically disabled—not just visually muted. A card reveal control must not contain another interactive element. Every route change should set focus to its heading, and every error/result should be announced once without stealing focus repeatedly.

## Platform smoke matrix

Record device/OS/browser or wrapper version, build SHA-256, tester, date, result, and linked issue for every row.

| Target | Minimum checks |
|---|---|
| Hosted PWA | Install, first-online cache, airplane-mode relaunch, update prompt, stale-cache replacement, storage persistence |
| iOS/Capacitor | Clean install, upgrade, background kill, safe areas, hardware/audio interruptions, Privacy Manifest, backup behavior, TestFlight |
| Android/Capacitor | Clean install, upgrade, system Back, process death, target SDK verification, Data Safety alignment, internal Play track |
| Linux/Electron | Development start, packaged AppImage/deb/Snap, offline relaunch, external-link containment, keyboard/screen reader, supported Electron major |

## Store/release evidence

Keep the following out of source control when secret or machine-specific, but archive them in the release record:

- Signed IPA/AAB/Linux artifact checksums
- Xcode/Gradle/Electron build logs
- Automated-test log and manual matrix
- Accessibility report
- Privacy/App Privacy/Data Safety responses
- Screenshot/device matrix
- Dependency audit and lockfile diff
- Store review notes and approval/rejection history

Automated success means the source satisfies its deterministic contracts. It does not mean an unsigned scaffold has become an App Store, Play, Snap, or desktop release.
