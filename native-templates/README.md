# Native project templates

These files preserve the reviewed requirements used by the tracked Capacitor
projects. They are regeneration references, not uploadable store artifacts.

For an intentional clean regeneration on a dedicated branch:

```bash
npm ci
npm run cap:add:ios
npm run cap:add:android
npm run sync
```

Create native icon and launch/splash asset sets from `resources/icon.png` and
`resources/splash.png` using the current Xcode Asset Catalog and Android Studio
Image Asset tooling. Review every generated size and adaptive/maskable safe
zone on-device. The optional `@capacitor/assets` package is deliberately absent
because its August 2026 dependency chain contains unresolved high/critical
security findings.

Then follow the platform README files. Review and commit the generated `ios/`
and `android/` source/project files. Never commit build products, Pods,
keystores, certificates, provisioning profiles, local SDK paths, credentials,
or store secrets.

Capacitor generation is not a one-time substitute for review. After dependency
updates, compare generated settings with the current Capacitor 8 documentation
and store requirements before syncing them into a release branch.
