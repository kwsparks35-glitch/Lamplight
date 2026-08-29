# Project history

This is a concise decision history, not a verbatim conversation transcript.
Git commits, pull requests, issue links, release notes, and attached QA evidence
should become the durable historical record after the repository is created.

## Founding direction

Kenny Sparks requested a friendly Scripture-learning game for iOS, Android,
Linux, and the web, initially grounded in 11 personally studied Scripture
passages and capable of expanding across the 66-book World English Bible.

Durable product commitments established during the mockup work:

- free to learners, without ads, in-app purchases, accounts, or analytics;
- local-first progress and usable offline after installation;
- whole passages as the default memory unit;
- named study sets, topics, search, and canonical Bible browsing;
- a transparent expanding review schedule;
- Daily Review as the only mastery-changing workflow;
- games as joyful practice, with honest errors and a separate oil reward; and
- a warm pine, gold, and cream visual identity centered on a lamp metaphor.

## Version 1.1 inherited baseline

The supplied v1.1 package implemented a self-contained web app, the full
embedded Bible corpus, starter passages, study sets, four games, layered
storage, backup import/export, local fonts, initial accessibility improvements,
a service worker, Capacitor 8 metadata, and an Electron scaffold.

A static and rendered audit found meaningful progress as well as release
blockers in scheduling, calendar handling, persistence failure behavior,
keyboard/screen-reader state, reference parsing, game state, Electron paths and
runtime support, native store evidence, privacy wording, licensing, provenance,
and claims made by the accompanying Chronicle.

## Version 1.2 objective

Version 1.2 converts the prototype into a stronger source release candidate:

- repair the identified learning/data/accessibility defects;
- keep games outside the mastery boundary;
- make storage and imports safer;
- harden and correct the Linux wrapper;
- pin the supported Capacitor/Electron toolchain;
- make PWA caching reject failed responses;
- prepare accurate privacy, licensing, provenance, pedagogy, QA, and deployment
  records; and
- provide a GitHub-ready repository with generated, reviewable native source
  while making no claim that signed store artifacts or approvals already exist.

## Historical practice going forward

Use one issue per independently reviewable change. Pull requests should state
the learner-facing outcome, data/schema impact, accessibility impact, privacy
or network impact, and exact evidence. Tags must point to the commit used for
the released artifacts. Never use a narrative PDF as the sole technical record
of code, tests, licensing, or approval status.
