---
name: setup-prep
description: >-
  Prepares the interview laptop: collects the candidate GitHub username and
  email, verifies the GitHub CLI in this terminal is logged in as that user,
  then installs Python 3.11+ / Node 24+ deps and starts FastAPI + Vite.
  Use when the user says setup prep, /setup-prep, prepare for the interview,
  or install the environment from the README.
---

# Setup prep

Set up this repo exactly as the root `README.md` describes. Do not invent extra install steps. This is a warmup, not the interview — do not implement product features.

## Checklist

```
- [ ] Collect GitHub username + email
- [ ] Prove terminal GitHub matches that username
- [ ] Verify runtime prerequisites
- [ ] Install backend
- [ ] Install frontend
- [ ] Start both servers
- [ ] Confirm URLs
```

## 1. GitHub username + email

If either is missing, **stop and ask in chat**. Wait for the candidate to type both. Do not guess from `git config`, GitHub CLI, Cursor account, or the machine hostname.

Ask for:

- **GitHub username** they will use on interview day (the account that can accept a private-repo invite)
- **Email** they will use with Cursor (or their AI IDE)

Do not continue until both are provided. A username copied from a profile URL is fine (`https://github.com/alice` → `alice`). Light-check the email looks like `name@domain`; if not, ask again.

Write them to `PREP.md` at the repo root (already gitignored):

```markdown
github: <username>
email: <email>
gh_login: <login from gh api>
checked_at: <ISO-8601>
```

Do not commit this file.

## 2. Prove this terminal is that GitHub account

The typed username must match the account **already authenticated for GitHub in this terminal**. Do not trust `git config user.name` or `user.email`. Always run the command below as a real shell call in this repo; do not skip it or invent a login.

```bash
gh api user --jq .login
```

If `gh` is missing or that command fails:

```bash
gh auth status
```

If still failing, **stop**. Tell them to install GitHub CLI if needed, then:

```bash
gh auth login
```

GitHub.com → HTTPS → login as the username they gave → allow git credentials. Then re-run `/setup-prep`.

Compare logins **case-insensitively**. If they differ, **stop**. Tell them this terminal is logged in as `<actual>`, not `<typed>`. They must switch:

```bash
gh auth logout --hostname github.com
gh auth login
```

Then confirm `gh api user --jq .login` equals the typed username before installing anything.

Optional extra check (do not fail the skill if it is missing): `ssh -T git@github.com` should greet the same username.

## 3. Prerequisites

From the repo root, verify:

```bash
python3 --version || python --version
node --version
npm --version
git --version
```

On Windows, `py --version` or `py -3 --version` is enough if `python` / `python3` is missing.

Minimums (newer is allowed and preferred if already installed):

- Python **3.11 or newer** (3.12, 3.13, … are fine)
- Node.js **24 or newer** (25+ is fine; do not require LTS)
- Git

Do **not** require `python3.11` or Node 24 specifically. Do **not** install a second toolchain to match a pin. Use the first interpreter on PATH that meets the minimum.

If a prerequisite is **missing or older than the minimum**, **stop** and tell them how to install it using the README section for their OS. Do not install system packages unless they explicitly ask.

## 4. Backend

macOS/Linux — use the same `python3` / `python` that passed the version check:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Windows PowerShell:

```powershell
cd backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

If `.venv` already exists, reuse it and only reinstall requirements.

## 5. Frontend

```bash
cd frontend
npm install
```

## 6. Start servers

If ports 8000 or 5173 are already serving this app, reuse them.

Otherwise start both from the repository root in **background** terminals:

Backend (working directory `backend/`):

```bash
backend/.venv/bin/python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Windows: `backend\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`

Frontend (working directory `frontend/`):

```bash
npm run dev
```

Confirm with curl/fetch:

- Frontend: http://localhost:5173
- API: http://localhost:8000/health
- Docs: http://localhost:8000/docs

If a server failed, show the terminal error and fix install issues before declaring ready.

## 7. Done

Tell the candidate:

- Prep is complete
- GitHub in this terminal is `<login>`
- Email recorded (for the recruiter / Cursor invite)
- The three URLs
- They can close the app until interview day; the interview uses a **different private repo**
