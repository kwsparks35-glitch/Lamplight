# Lamplight deployment guide

**Release line:** 1.2.x

**Document status:** source-build instructions, not evidence of store approval

Lamplight has structured source in `src/`, a deterministic web build in `www/`,
tracked Capacitor 8 projects for iOS and Android, and a hardened Electron
wrapper for Linux. This repository does **not** contain signed binaries, store
credentials, physical-device results, or proof that a store has approved the
app.

Read `docs/RELEASE_CHECKLIST.md`, `PRIVACY.md`, `LICENSES.md`, and
`docs/KNOWN_ISSUES.md` before creating a public artifact.

## 1. Reproducible environment

The repository pins package versions and commits `package-lock.json`.
The Android wrapper pins Gradle 8.14.3's binary distribution and the
publisher-listed SHA-256 in `gradle-wrapper.properties`; do not remove that
verification when updating Android tooling.

- Node.js 22.14 or newer within the supported 22–24 range
- npm 11 or 12; the repository records npm 11.9.0
- macOS and Xcode 26+ for iOS builds
- current Android Studio compatible with Capacitor 8
- a supported Linux build host for AppImage, Debian, and Snap packaging

Install exactly the locked dependency graph:

```bash
npm ci
npm run validate:platform
```

Do not use `npm update` during a release build. Dependency updates should be a
separate reviewed pull request with a regenerated lockfile and new QA evidence.

## 2. Web/PWA deployment

Serve the contents of `www/` from one HTTPS origin. Do not publish the parent
repository, source recordings, native templates, or signing material.

Rebuild `www/` from the reviewed source before every validation or sync:

```bash
npm run build:web
npm run qa
```

For a local smoke test from the repository root:

```bash
python3 -m http.server 4173 --directory www
```

Open `http://localhost:4173/`. Service workers are available on HTTPS and on
the localhost secure-context exception; they are not available when opening
`index.html` directly with `file://`.

The manifest uses relative `id`, `start_url`, and `scope` values so that the
PWA can be hosted at an origin root or a stable subdirectory such as GitHub
Pages. Changing that subdirectory after users install the PWA can create a
separate installation and should be treated as a migration.

Before publishing:

1. Set the release version consistently in both package files and the app.
2. Run `npm run build:web`; it derives the service-worker cache identity from
   the release version and generated source hash.
3. Test first load, refresh, update, and offline relaunch in a clean browser
   profile.
4. Configure the host to serve `.webmanifest` as
   `application/manifest+json` and `sw.js` as JavaScript.
5. Add restrictive HTTP response headers, including CSP, HSTS,
   `X-Content-Type-Options: nosniff`, and `Referrer-Policy: no-referrer`.
6. Publish the privacy policy and support page at permanent HTTPS URLs.
7. Document whether the host retains access logs and ensure the store privacy
   disclosures match that behavior.

The service worker rejects failed precache responses, updates the app shell
only from successful responses, deletes only Lamplight-owned caches, and falls
back to a cached shell offline. It does not make a first visit possible without
a network connection.

## 3. Maintain the tracked native projects

The source archive includes reviewed `ios/` and `android/` projects generated
with Capacitor 8.4.1. After every web change, rebuild and synchronize them:

```bash
npm run build:web
npm run sync
```

Use the current Xcode Asset Catalog and Android Studio Image Asset tools to
create native icon and launch/splash sets from `resources/icon.png` and
`resources/splash.png`. Inspect every generated asset and safe zone. The
optional `@capacitor/assets` package is not installed because the audited 3.0.5
dependency chain contains obsolete vulnerable archive/image tooling.

Review synchronized changes and commit the `ios/` and `android/` source trees.
The `.gitignore` excludes only machine-local settings, dependencies, copied web
output, build products, and signing secrets. Native source and project settings
are historical project records and must remain tracked.

After every web change:

```bash
npm run sync
```

Never commit keystores, private signing certificates, API keys, provisioning
profiles, `.env` files, or store credentials.

## 4. iOS and iPadOS

Current Capacitor 8 environment requirements are documented at
<https://capacitorjs.com/docs/getting-started/environment-setup> and
<https://capacitorjs.com/docs/updating/8-0>. Apple submission requirements are
published at <https://developer.apple.com/news/upcoming-requirements/>.

The included iOS project already contains the following reviewed setup:

1. `ios/App/App/PrivacyInfo.xcprivacy` is copied from the reviewed template and
   added to the App target.
2. Verify the file appears in the built
   bundle. It declares the UserDefaults reason required by Capacitor
   Preferences (`CA92.1`). Compare it with the current plugin documentation at
   <https://capacitorjs.com/docs/apis/preferences> before submission.
3. Set the development team, bundle identifier, marketing version, and build
   number in Xcode. Do not change `com.canonseries.lamplight` after public
   release without a deliberate migration.
4. Confirm that only intended capabilities and privacy-sensitive permissions
   are present. Lamplight does not require camera, microphone, location,
   contacts, health, or tracking permissions.
5. Test on the oldest supported physical iPhone/iPad and at least one current
   device, including VoiceOver, Dynamic Type/text zoom, rotation, background
   save, force quit, offline launch, backup import/export, and upgrade from the
   previous release.
6. Archive with Xcode, validate the archive, then upload to App Store Connect.
7. Complete TestFlight testing before production review.

The App Store listing needs a public privacy-policy URL and an in-app path to
the same policy. Apple's review guidelines are at
<https://developer.apple.com/app-store/review/guidelines/>.

The correct privacy response must describe the actual release build and its
hosting/support practices. “No data collected by the developer” must not be
used as a slogan without completing that review.

## 5. Android

Capacitor 8 uses the Android tooling and API levels described at
<https://capacitorjs.com/docs/updating/8-0>. Google Play target-API deadlines
are maintained at <https://developer.android.com/google/play/requirements/target-sdk>.

The included Android project targets/compiles API 36 and carries version name
`1.2.0` / version code `12000`. Before release:

1. Open it with `npm run android`.
2. Verify `compileSdk` and `targetSdk` against the current Play requirement;
   new apps and updates are scheduled to require API 36 beginning August 31,
   2026.
3. Set `versionCode` and `versionName`. `versionCode` must increase for every
   upload, including internal-test builds.
4. Inspect the merged manifest. Remove permissions that Lamplight does not use.
5. Generate a release keystore outside the repository and maintain encrypted,
   access-controlled backups. Prefer Play App Signing while preserving the
   upload key and recovery information.
6. Create a signed Android App Bundle (`.aab`), not merely a debug APK.
7. Run internal testing and the Play pre-launch report across the required API,
   form-factor, accessibility, and offline scenarios.
8. Complete Data safety, content rating, target audience, ads, and app-access
   declarations based on the exact build.

## 6. Linux desktop

Electron is pinned to a supported 43.x release rather than the obsolete 33.x
runtime. The wrapper uses an internal `lamplight://` protocol, renderer
sandboxing, context isolation, no Node integration, denied permissions, and
blocked external navigation/new windows.

Run the development wrapper from the repository root:

```bash
npm run electron:start
```

The development path loads `../www`; packaged builds load `www` inside the
application archive. Build on Linux:

```bash
npm run electron:package:appimage
# After AppImage QA succeeds:
npm run electron:package
```

Artifacts appear in `electron/dist/` and are deliberately ignored by Git.
Generate hashes and release notes separately. AppImage, `.deb`, and Snap each
require installation, persistence, upgrade, accessibility, and offline tests.
Code signing and publisher verification should be added before presenting an
artifact as production-ready.

Flathub is not a target for this repository under its current published
requirements concerning AI-generated or AI-assisted app content. Review the
current policy directly before planning a submission:
<https://docs.flathub.org/docs/for-app-authors/requirements>.

## 7. Store metadata and pricing

- Product name: **Lamplight — Scripture Memory**
- Category: Education; a secondary Games category may be appropriate where
  supported.
- Price: Free
- Advertising: None
- In-app purchases: None
- Scripture: World English Bible, public domain

The store description may say that study data is kept locally and that the app
has no ads, accounts, analytics, or third-party tracking. It should not say
“zero network requests” because the PWA contacts its hosting origin and store
or operating-system services operate independently.

Do not publish screenshots, claims of pedagogical effectiveness, accessibility
conformance, “full offline” behavior, or platform support until the release
candidate has passed the corresponding QA evidence in `docs/QA_PLAN.md`.

## 8. Release sequence

1. Create a release branch from a clean, reviewed commit.
2. Resolve every blocking item in `docs/RELEASE_CHECKLIST.md` and
   `docs/KNOWN_ISSUES.md`.
3. Run automated checks and preserve their logs.
4. Complete Scripture and dependency provenance.
5. Produce unsigned/internal artifacts and perform device testing.
6. Freeze content, version numbers, privacy disclosures, and store copy.
7. Produce signed artifacts from a controlled environment.
8. Record SHA-256 hashes, signing identity, build host/tool versions, and the
   source commit in release notes.
9. Roll out through internal/beta channels before production.
10. Tag the exact reviewed commit only after the artifacts are reproducible.

See `docs/RELEASE_CHECKLIST.md` for the evidence required at each gate.
