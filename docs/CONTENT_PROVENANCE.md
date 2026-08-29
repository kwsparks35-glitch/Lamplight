# Content provenance

Content provenance is a release-control record. Public-domain status does not
remove the need to identify exactly what was shipped and verify that it was not
altered accidentally.

## Scripture corpus

The inherited application identifies the embedded translation as the **World
English Bible (WEB)** and contains a 66-book Protestant canon. Static inspection
of the inherited v1.1 corpus found:

- 66 books
- 1,189 chapters
- 31,095 verse records

Those counts are useful integrity checks, not proof of the exact WEB revision.
The source archive, edition/revision identifier, download date, transformation
script, and upstream checksum were not preserved in the supplied project.
`PROVENANCE.md` nevertheless records SHA-256 hashes for the exact compressed
payload and decoded JSON inherited by v1.2, so the reviewed embedded corpus can
be identified even though its upstream chain remains incomplete.

An official comparison candidate was researched on 2026-08-14:
`https://ebible.org/Scriptures/eng-web_usfm.zip`, identified by eBible as WEB
Classic's 2020 stable text edition with source files dated 2026-08-08. The
locally observed archive hash and its verification limits are recorded in
`PROVENANCE.md`. This does not fill the inherited-origin fields below; it gives
a pinned starting point for a future deterministic verse-by-verse equivalence
audit.

Before release, fill and review this record:

| Field | Required value |
|---|---|
| Translation | World English Bible |
| Upstream project URL | `https://worldenglish.bible/` |
| Exact edition/revision | **REQUIRED** |
| Source file/archive URL | **REQUIRED** |
| Download date (UTC) | **REQUIRED** |
| Upstream SHA-256 | **REQUIRED** |
| Import/transformation tool and commit | **REQUIRED** |
| Embedded compressed/decoded SHA-256 | See `PROVENANCE.md`; update on replacement |
| Books / chapters / verses after import | 66 / 1,189 / 31,095; revalidate on replacement |
| Human reviewer and date | **REQUIRED** |

Validation must check canonical order, chapter/verse bounds, reference lookup,
Unicode punctuation, range display, quotation continuity, and representative
passages against the recorded upstream source. Do not “correct” the translation
without documenting a source-supported change.

## Starter passages and topics

The founding study set originated from Kenny Sparks's Scripture flashcards.
The app should retain a traceable list of the intended 11 whole passages and a
human-reviewed comparison against those source cards.

Topic assignments are editorial metadata. A syntactically valid reference is
not proof that a topic label is contextually or theologically appropriate.
Record the reviewer, review scope, date, and change rationale for topic edits.

## Application artifact hashes

At release, record at minimum:

```bash
sha256sum www/index.html www/sw.js www/manifest.webmanifest
sha256sum resources/icon.png resources/splash.png
```

Record signed artifact hashes and the source Git commit in the release notes.
Do not put a mutable “latest” URL in place of a versioned provenance record.
