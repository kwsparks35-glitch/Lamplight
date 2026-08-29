# iOS post-generation steps

1. Generate the project with `npm run cap:add:ios`.
2. Copy `native-templates/ios/PrivacyInfo.xcprivacy` to
   `ios/App/App/PrivacyInfo.xcprivacy`.
3. Open Xcode with `npm run ios`, add the file to the **App** target if it is not
   already listed, and confirm target membership in the File inspector.
4. Build an archive and confirm `PrivacyInfo.xcprivacy` is present in the built
   app bundle.
5. Compare the declaration with the current Capacitor Preferences documentation:
   <https://capacitorjs.com/docs/apis/preferences>.

The template declares UserDefaults reason `CA92.1`, the documented reason for
the app's use of Capacitor Preferences. It declares no data collection and no
tracking because Lamplight's current code has no intentional developer data
collection or tracking. If capabilities, plugins, networking, support flows,
or business practices change, re-audit the manifest and App Store privacy
answers rather than copying this template unchanged.

Also verify the bundle identifier, team, marketing/build versions, minimum OS,
device families, signing, icons, launch assets, capabilities, export compliance,
and public privacy/support URLs. Preserve a tested upgrade path from every
supported prior version.
