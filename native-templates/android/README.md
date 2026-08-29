# Android post-generation steps

1. Generate the project with `npm run cap:add:android`.
2. Open Android Studio with `npm run android` and let the pinned Capacitor 8
   project sync.
3. Review and commit the generated Gradle/project source. Keep `local.properties`,
   Gradle caches, build output, and signing material untracked.
4. Verify compile/target SDK against the current Google Play requirement:
   <https://developer.android.com/google/play/requirements/target-sdk>.
5. Inspect the merged manifest and remove any permission Lamplight does not use.
   The current feature set does not need camera, microphone, location, contacts,
   advertising ID, or broad storage permissions.
6. Set intentional `versionCode`, `versionName`, minimum SDK, app label, icons,
   adaptive icon safe zones, signing, and backup/data-extraction behavior.
7. Store keystores and recovery information outside Git with encrypted,
   access-controlled backups. Prefer Play App Signing and protect the upload key.
8. Build a signed AAB and complete internal testing, physical-device testing,
   TalkBack/large-text testing, and the Play pre-launch report.

Data safety and target-audience answers must describe the exact candidate and
its web-host/support/platform behavior. Do not infer store answers solely from
the absence of analytics code.
