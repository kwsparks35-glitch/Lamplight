# Known issues and release gates

This list distinguishes honest limitations from completed work. A resolved item
should link to the implementing commit and QA evidence rather than being
silently deleted.

## Blocks public store release

1. The included iOS and Android projects have not yet been compiled and tested
   on their required macOS/Xcode and Android SDK/JDK 21 hosts.
2. No signed IPA, AAB, AppImage, Debian package, or Snap has been built and
   tested from this source archive.
3. The inherited WEB JSON's exact upstream derivation is not proven. A current
   official comparison candidate and observed checksum are documented, but a
   publisher-signed source-to-runtime transformation record is still required.
4. A permanent public HTTPS privacy-policy URL and support URL are not assigned.
5. Apple/Google privacy questionnaires have not been completed against a final
   network capture and artifact.
6. Physical-device, screen-reader, offline/update, migration, and store
   preflight evidence has not been recorded.
7. Store screenshots, descriptions, age/target-audience selections, content
   ratings, and reviewer notes are not final.
8. Code-signing identity, secure credential custody, recovery contacts, and
   release-owner procedure are not documented privately.

## Source and packaging limitations

- `src/` is maintainable and separated, while generated `www/index.html`
  remains deliberately self-contained. Inline script and style
  require a weaker Electron CSP than separated hashed assets would.
- The PWA host must add security headers; a service worker cannot enforce HSTS
  or protect the first network response.
- The 512-pixel artwork is declared maskable, but safe-zone appearance still
  needs platform-icon preview and device verification.
- Native source is included, but generation is not equivalent to compilation,
  signing, physical-device validation, or store acceptance.
- Electron packaging configuration is implemented, but generated artifacts
  and their notices remain unverified.
- Platform backup behavior is controlled partly by the OS/browser; the privacy
  policy cannot promise that uninstall removes every backup copy.

## Product decisions still owned by Kenny

- Select an explicit project/source license. Until then, the repository is
  `UNLICENSED` and all Lamplight-specific rights are reserved.
- Decide and register the durable GitHub repository, support page, privacy URL,
  publisher name, and store seller identity.
- Decide whether oil will remain a visible practice total or be spent on
  noncommercial, nonmanipulative personalization.
- Approve the final 11-passage founding set and the theological/editorial topic
  review.

## Explicitly out of runtime scope

The Sigrid recordings and Beatitudes music materials are rights- and
production-pending and are not included in the application. See
`docs/AUDIO_AND_MUSIC.md`.

Flathub is not currently planned because its published requirements conflict
with this project's AI-assisted origin. Snap, AppImage, Debian packaging, and
the web/PWA remain the intended Linux paths.
