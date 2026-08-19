# Field Reports

Bugs and rough edges discovered through **real use** — daily reviews, group
study, actual memorization — rather than automated QA. Lamplight's most
valuable defects have been found this way: automated tests verify what we
thought to check, while faithful daily practice reveals what we never thought
to ask.

This log sits alongside the QA documents on purpose. `QA_PLAN.md` and
`QA_RESULTS.md` record what the machines verified; this file records what the
saints noticed. Both feed the same pipeline: every confirmed field report
should end its life as (1) a fix in `src/`, (2) a pinned regression test in
`test/`, and (3) a CHANGELOG entry.

## How to file a report

Anyone may file a report by opening a GitHub issue with the `field-report`
label, or by emailing **Canon.Series.Packets@gmail.com**. Include:

1. **What you were doing** — the passage, the screen, the mode.
2. **What you expected** — what a faithful rendering/behavior would look like.
3. **What you saw instead** — a screenshot helps enormously.
4. **Device and platform** — phone/desktop, browser or installed app, version
   (shown in the footer of the home screen).

Reports about the Scripture text itself (a suspected typo or divergence from
the World English Bible) are treated with the highest priority; cite the
reference and the expected wording, and see `CONTENT_PROVENANCE.md` for how
the corpus is verified against upstream.

## Triage states

| State | Meaning |
| --- | --- |
| **Reported** | Logged, not yet reproduced by a maintainer |
| **Confirmed** | Reproduced; root cause under investigation |
| **Fixed** | Corrected in `src/`, regression-tested, released |
| **By design** | Behavior is intentional; rationale recorded below |

---

## Reports

### FR-001 — First-letter hints dropped letters in quoted passages

- **Reported:** 2026-08-15, by Kenneth W. Sparks, during daily review practice
  on Android (Chrome Beta), against the 1.1.x preview build
- **State:** **Fixed** in 1.2.1
- **Symptom:** "The 'Show first letters' option does not accurately reflect
  the passages. Many letters appear to be wholly missing for practice."
  Dialogue-bearing passages (Isaiah 30:21-22, John 9:35-38) were most
  affected.
- **Root cause:** the hint extractor recognized only straight quotation marks,
  while the WEB corpus uses typographic (curly) quotes; words opening a
  quotation yielded the quote mark instead of their first letter. A related
  implementation uppercased all letters, discarded punctuation, and silently
  dropped punctuation-only tokens, so hints did not mirror the passage's true
  shape.
- **Fix:** Unicode-aware extraction in `firstLetters()`; original
  capitalization preserved as a memory cue; opening quotes and trailing
  punctuation retained; no token ever dropped; output HTML-escaped.
- **Regression coverage:** pinned behavior tests plus a property test in
  `test/validation.test.mjs` asserting that no word's letter can go missing
  for any input.
- **Lesson recorded:** hint fidelity is *content* fidelity. Any feature that
  transforms Scripture text (hints, blanks, snippets, phrase chunks) must be
  property-tested against the real corpus, including typographic punctuation,
  not merely spot-checked with ASCII samples.

<!--
Template for new entries:

### FR-NNN — Title

- **Reported:** date, by whom, on what device/build
- **State:** Reported | Confirmed | Fixed (version) | By design
- **Symptom:** the reporter's own words where possible
- **Root cause:**
- **Fix:**
- **Regression coverage:**
- **Lesson recorded:**
-->
