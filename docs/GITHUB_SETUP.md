# GitHub repository setup

## Initial import

Create a new repository under Kenny's chosen account or organization. Do not
initialize it with a separate README/license because this source tree already
contains the reviewed files.

From the extracted `lamplight-v1.2` directory:

```bash
git init
git add --all
git status
git diff --cached --check
git commit -m "Establish Lamplight 1.2 source release candidate"
git branch -M main
git remote add origin https://github.com/kwsparks35-glitch/Lamplight.git
git push -u origin main
```

Replace `OWNER` with the actual account. Inspect `git status` and the staged
file list before committing. The repository must not contain the original
rights-pending M4A/GarageBand materials, credentials, personal backups, or
unrelated source uploads.

## Recommended repository settings

1. Enable Issues and Discussions as desired; keep security reports private.
2. Enable Dependabot alerts and the provided dependency-update configuration.
3. Protect `main`: require pull requests, source-validation checks, resolved
   conversations, and no force pushes or branch deletion.
4. Require signed commits/tags if Kenny can maintain that workflow reliably.
5. Limit Actions permissions to read-only by default and approve any future
   write/deployment workflow explicitly.
6. Configure secret scanning and push protection. No deployment needs a secret
   committed in code.
7. Create labels for `bug`, `accessibility`, `content`, `dependencies`,
   `security`, `pedagogy`, `platform`, and `release-blocker`.
8. Add public privacy/support URLs only after they exist; do not publish a
   placeholder as though it were operative.

## Branch and release practice

- `main` is releasable history, not an experiment dump.
- Use focused branches such as `fix/srs-calendar` or `docs/web-provenance`.
- Link commits and pull requests to issues and preserve QA evidence.
- Never commit generated store artifacts to normal Git history. Attach signed
  artifacts and hashes to a versioned release or approved distribution system.
- Tag only the exact commit used to build reviewed artifacts.
- Do not use Git LFS as a shortcut for rights-pending audio. Keep it out until
  the gates in `docs/AUDIO_AND_MUSIC.md` are complete.

The project is currently all rights reserved. Set repository visibility
deliberately and read `CONTRIBUTING.md` before enabling outside pull requests.
