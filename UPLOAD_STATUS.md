# Upload status: bootstrap in progress

This repository is being populated in two stages.

**Stage 1 (complete):** project face and configuration, pushed through the
Claude GitHub connector: README, LICENSE, package.json, .gitignore,
capacitor.config.json, CHANGELOG, key docs, and provenance records.

**Stage 2 (pending):** the full verified 1.2.1 source tree from the release
archive `lamplight-1.2.1-source.zip` (SHA-256 ffb2786e...da8), including:

- `src/` (application source and the 4.1 MB WEB corpus data)
- `www/` (the deterministically generated PWA build)
- `android/`, `ios/`, `electron/` (native projects)
- `resources/` and all binary icon/splash assets (39 images that cannot
  travel through the text-based connector)
- `scripts/`, `test/`, `integrity/`, `.github/` (build, QA, and CI)

Stage 2 lands via a single web upload: repository page, Add file, Upload
files, then drag the contents of the extracted release folder. The included
GitHub Actions CI will verify the complete tree automatically (expected:
validator PASS, 22/22 tests).

This file will be deleted when Stage 2 completes.
