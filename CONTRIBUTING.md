# Contributing to Lamplight

Thank you for helping make Scripture practice clearer, kinder, safer, and more
accessible.

## Current contribution status

Lamplight-specific material is presently all rights reserved and the repository
is `UNLICENSED`. Until Kenneth W. Sparks selects an explicit project license and
contribution terms, please use GitHub Issues for bug reports, accessibility
findings, content corrections, and proposals. Do not submit outside code or
artwork through a pull request unless the maintainer has first authorized the
contribution and its terms in writing.

This protects both contributors and the project from unclear ownership. It
does not limit reports of defects or discussion of ideas.

## Issue quality

Search existing issues first. A useful report includes:

- exact Lamplight version/commit and install source;
- platform, OS, browser/runtime, and device class;
- storage mode shown by the app;
- reproducible steps, expected result, and actual result;
- accessibility technology/settings when relevant; and
- a redacted screenshot or console excerpt if useful.

Never attach a personal study backup, credentials, private support mail, or
unredacted device/store identifiers to a public issue. Report security
vulnerabilities through `SECURITY.md` instead.

## Change principles

Proposed changes should preserve these boundaries:

- Daily Review alone changes spaced-review mastery.
- Games are practice and may not certify mastery.
- Study data remains local unless a learner explicitly exports it.
- No ads, analytics, tracking, accounts, manipulative monetization, or hidden
  network dependency.
- Scripture source/reference changes require provenance and human review.
- Accessibility, reduced motion, keyboard use, and honest errors are product
  requirements, not optional polish.
- Audio stays out of runtime until documented rights and production gates pass.

## Maintainer workflow

1. Link the change to one focused issue.
2. Branch from the current development branch; do not commit to release tags.
3. Keep unrelated formatting/dependency/content changes separate.
4. Update tests, migration fixtures, documentation, privacy, licensing, and
   changelog entries affected by the change.
5. Run the complete validation and attach evidence required by `docs/QA_PLAN.md`.
6. Use the pull-request template and request review from the relevant code,
   content, accessibility, and release owners.
7. Squash only when doing so preserves useful authorship and decision history.

Version-control history is part of Lamplight's safety record. Never rewrite a
shared branch to conceal a mistake; correct it with a reviewable follow-up.
