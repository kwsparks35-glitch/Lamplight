# Quality-assurance plan

QA claims require retained evidence. A checklist tick without a build ID,
platform, date, tester, and result is not release evidence.

Use these statuses:

- **PLANNED** — specified but not run
- **AUTOMATED PASS/FAIL** — repeatable check with attached log
- **MANUAL PASS/FAIL** — named tester, exact build/device, and observations
- **BLOCKED** — cannot run until the stated dependency is available

## Evidence record

For every release candidate, create `qa/releases/vX.Y.Z/` or an equivalent
release attachment containing:

| Field | Required |
|---|---|
| Source commit and clean/dirty state | Yes |
| App version and storage-schema version | Yes |
| Node/npm/Capacitor/Electron versions | Yes |
| Build host OS and tool versions | Yes |
| Artifact filename and SHA-256 | Yes |
| Test suite log | Yes |
| Device/browser matrix with tester/date | Yes |
| Accessibility results and unresolved exceptions | Yes |
| Upgrade/import corpus used | Yes |
| Store validation/pre-launch reports | When applicable |

Do not commit personal study backups, email addresses, signing credentials, or
private store reports containing user/device identifiers.

## Automated regression areas

1. **Corpus integrity** — 66-book order, chapter/verse bounds, declared counts,
   representative exact texts, range expansion, and every topic/starter
   reference.
2. **Scheduler** — correct 1/2/4/7/14/30-day progression, “Still learning,”
   mature review, leap years, daylight-saving transitions, and local calendar
   boundaries.
3. **Mastery isolation** — no game, browse, hint, search, or route transition
   can mutate SRS level/due state.
4. **Persistence** — serialized writes, close/background flush, quota/backend
   failure warning, schema migration, and reload consistency.
5. **Backup** — valid round trip, malformed/oversized/tampered rejection,
   unsupported schema, pre-import backup, and rollback behavior.
6. **Reference parser** — valid abbreviations/ranges plus zero, overflow,
   cross-book, reversed, and malformed input.
7. **Game state** — slips, disabled choices, duplicate snippet handling,
   navigation during delayed feedback, finite completion, and no duplicate
   reward.
8. **Repository metadata** — JSON parse, Electron syntax, locked dependencies,
   service-worker asset existence, and version consistency.

Automated coverage reduces regressions; it does not replace physical-device,
screen-reader, store, or content review.

## Web/PWA manual matrix

Test current stable and one prior major where practical:

- Chrome/Chromium on Android and Linux
- Safari on iPhone/iPad
- Firefox on Linux/Android for browser functionality
- Installed PWA where supported

Scenarios: first visit, install, normal relaunch, offline relaunch, update while
open, update after backgrounding, failed/404 deployment, subdirectory hosting,
storage denial/quota failure, export/import, reset, 200% text zoom, keyboard-
only use, and reduced motion.

## Native device matrix

For both iOS and Android:

- oldest supported OS/device class;
- one current phone;
- one tablet or large-screen layout;
- light/dark system setting where relevant;
- screen reader (VoiceOver or TalkBack);
- large text/display scaling;
- hardware/software Back behavior;
- background, force quit, low-memory restart, update from prior release;
- airplane-mode cold launch;
- export/import through platform share/download flows; and
- uninstall/reinstall and platform-backup behavior.

Verify there are no unexpected permission prompts or network destinations.

## Linux matrix

At minimum, test the AppImage and every claimed package format on representative
supported distributions. Record architecture, desktop environment, Wayland/X11,
screen scaling, keyboard navigation, screen reader where feasible, file-export
dialogs, read-only install locations, offline launch, and upgrade/removal.

Electron development success is not evidence that an asar-packaged build loads
its assets. Test the packaged artifact.

## Accessibility review

Target WCAG 2.2 AA for web content while recognizing that conformance requires
a complete audit. Include:

- keyboard order, visible focus, no traps, and appropriate tab behavior;
- semantic names, roles, states, headings, live regions, and error messages;
- no nested interactive controls and no hidden card face in the accessibility
  tree;
- 200% text zoom/reflow and system large-text checks;
- normal/non-text contrast, focus contrast, and disabled-state distinction;
- 44×44 CSS-pixel target-size objective or documented WCAG exceptions;
- reduced motion and no essential timed response; and
- comprehension of instructions without relying only on color, sound, or
  animation.

Use automated scanners as triage, then keyboard and screen-reader manual tests.

## Human content and pedagogy review

A named human reviewer should compare the embedded Scripture against the exact
recorded WEB source, review the 11 founding passages against Kenny's cards, and
review topic labels in context. A learning-design reviewer should confirm that
UI claims match `docs/PEDAGOGY.md` and that games never imply mastery.

## Store validation

- Xcode archive validation and TestFlight result
- Google Play internal test and pre-launch report
- Android Data safety and Apple privacy answers compared with network captures
- Linux package installation/removal and generated third-party notices
- Store copy/screenshots compared against the exact candidate

The release decision belongs in `docs/RELEASE_CHECKLIST.md`; this document
defines how to obtain its evidence.
