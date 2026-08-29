# Security policy

## Supported versions

Until a public release exists, only the current `1.2.x` development line is
eligible for security fixes. A tagged-release support table will replace this
statement when distribution begins.

## Private reporting

Please do not open a public issue for a suspected vulnerability. Email
**Canon.Series.Packets@gmail.com** with:

- “Lamplight security report” in the subject;
- affected version/commit and platform;
- reproducible steps and impact;
- proof-of-concept material with personal data removed; and
- a safe way to contact you.

Do not access another person's device/data, degrade a service, publish a live
exploit, or send credentials or personal study backups. The maintainer should
acknowledge a credible report within seven calendar days, provide a status
update within 30 days, and coordinate disclosure after a fix is available.
Those are response goals, not a bug-bounty offer or legal safe-harbor promise.

## Security model

Lamplight intentionally has no account system, analytics, advertising, or app-
owned cloud study database. Relevant risk areas still include malicious backup
imports, local-storage corruption, PWA supply-chain/hosting compromise,
Electron navigation or protocol escape, vulnerable build dependencies,
unintended native permissions, and exposed signing credentials.

See `docs/ARCHITECTURE.md`, `PRIVACY.md`, and `docs/RELEASE_CHECKLIST.md` for
controls and release gates.
