# Release checklist

Every checked box needs evidence tied to the exact source commit and artifact.
Keep unchecked items visible; “not applicable” requires a written rationale.

## Source and version control

- [ ] Release branch starts from a reviewed commit with no uncommitted files.
- [ ] `package.json`, `electron/package.json`, app UI, backup schema, service-
      worker cache, store metadata, and release tag use intentional versions.
- [ ] `npm ci` succeeds from a clean clone using the committed lockfile.
- [ ] `npm run validate:platform` and the complete automated suite pass.
- [ ] Dependency audit and license review are attached; accepted findings have
      owners, rationale, and dates.
- [ ] Changelog links the implementing issues/PRs and identifies migrations.

## Learning and data integrity

- [ ] Calendar-day scheduling matches the documented 1/2/4/7/14/30 sequence.
- [ ] Games, hints, search, browsing, and navigation cannot advance mastery.
- [ ] Writes serialize/flush and failures update the visible storage status.
- [ ] Previous supported schemas migrate without unexpected fragmentation or
      loss; fixtures and logs are retained.
- [ ] Backup import rejects malformed/unsupported data, creates a pre-import
      backup, and round-trips valid progress.
- [ ] Reset all local data requires confirmation and clears each active storage
      backend without claiming to erase manual/platform backups.
- [ ] The displayed review/streak/oil definitions match actual code.

## Scripture and editorial content

- [ ] Exact WEB source/revision, URL, date, transformation commit, and hashes
      are recorded in `docs/CONTENT_PROVENANCE.md`.
- [ ] Corpus counts/order/bounds and representative text comparisons pass.
- [ ] The 11 founding passages match Kenny's approved source cards.
- [ ] Matthew 10:8 and every other quoted UI verse match the recorded WEB text.
- [ ] Topic/reference lists pass bounds checks and a named human context review.
- [ ] Store claims distinguish memorization from interpretation and do not
      overstate pedagogical effectiveness.

## Accessibility and UX

- [ ] Keyboard-only review covers every route, dialog, game, and backup/reset
      workflow with visible focus and no trap.
- [ ] VoiceOver and TalkBack announce names, roles, states, errors, live updates,
      card reveal state, and results intelligibly.
- [ ] Disabled game choices are truly disabled for pointer and keyboard input.
- [ ] 200% text zoom/system large text reflows without loss or overlap.
- [ ] Contrast, target sizes, reduced motion, orientation, safe areas, and
      screen-reader-hidden content pass the documented review.
- [ ] Ambiguous Verse Match snippets cannot create an unfair/incorrect answer.

## Privacy and security

- [ ] In-app policy, repository `PRIVACY.md`, hosted policy, and store answers
      describe the same tested behavior.
- [ ] Browser/native/desktop network captures contain only documented origins.
- [ ] No ad, analytics, tracking, remote-content, or unintended permission SDK
      is present.
- [ ] Support, web-host access-log, OS/store, export, backup, and deletion
      qualifications are included.
- [ ] Electron uses a supported release and passes sandbox, protocol traversal,
      permission, navigation, popup, CSP, and packaged-path tests.
- [ ] Secrets/signing files are absent from Git history and release archives.
- [ ] Security reporting contact and private-response process are active.

## Web/PWA

- [ ] First online load, install, refresh, update, offline cold launch, and
      failed-deployment rollback pass in the browser matrix.
- [ ] Manifest identity/scope/icons and subdirectory hosting are verified.
- [ ] Host MIME types, CSP, HSTS, nosniff, and referrer headers are verified.
- [ ] Service-worker cache version was bumped and only successful responses are
      cached.
- [ ] Public privacy/support URLs are stable HTTPS resources.

## iOS/iPadOS

- [ ] Generated `ios/` project and intentional settings are committed.
- [ ] `PrivacyInfo.xcprivacy` is in the App target and built bundle with current
      required-reason declarations.
- [ ] Bundle ID, marketing/build versions, signing team, capabilities, minimum
      OS, device family, icons, and launch assets are approved.
- [ ] Physical-device, VoiceOver, offline, lifecycle, upgrade, export, and reset
      tests pass.
- [ ] Xcode archive validates and the TestFlight candidate passes review/testing.
- [ ] App privacy, age rating, review notes, screenshots, support URL, and price
      match the candidate.

## Android

- [ ] Generated `android/` project and intentional settings are committed.
- [ ] Target/compile SDK meet current Play deadlines; merged manifest has only
      intended permissions.
- [ ] Package name, version code/name, minimum SDK, signing, icons, and adaptive
      icon safe zones are approved.
- [ ] Physical-device/tablet, TalkBack, Back, offline, lifecycle, upgrade,
      export, and reset tests pass.
- [ ] Signed AAB passes internal testing and the Play pre-launch report.
- [ ] Data safety, target audience, ads, content rating, screenshots, support
      URL, and free price match the candidate.

## Linux

- [ ] Electron development and packaged paths both load the correct `www/`.
- [ ] AppImage passes before Debian/Snap candidates are produced.
- [ ] Each claimed format installs/runs/updates/removes on the recorded distro,
      architecture, display server, and scaling matrix.
- [ ] Export/import, keyboard, screen-reader, offline, and persistence behavior
      pass in packaged artifacts.
- [ ] Generated Chromium/Electron/dependency notices are present.
- [ ] Artifact signing/publisher verification and distribution instructions are
      documented. Flathub is not claimed.

## Artifact and rollout

- [ ] Builds come from a controlled environment and the recorded source commit.
- [ ] Filenames, sizes, SHA-256 hashes, tool versions, signing identity, and QA
      report are attached to the release.
- [ ] Source archive excludes credentials, local caches, rights-pending audio,
      private correspondence, and unrelated project files.
- [ ] Internal/beta rollout has an observation window and rollback owner.
- [ ] Production rollout, support monitoring, incident response, and next
      review date are assigned.
- [ ] Tag points to the exact reviewed commit and is created only after artifact
      reproducibility is confirmed.
