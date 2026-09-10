---
name: setup-prep
description: >-
  Prepares the interview laptop: collects the candidate GitHub username,
  verifies git can talk to GitHub as that user, then installs Python 3.11+ /
  Node 24+ deps and starts FastAPI + Vite. Use when the user says setup prep,
  /setup-prep, prepare for the interview, or install the environment from the
  README.
---

# Setup prep

Set up this repo exactly as the root `README.md` describes. Do not invent extra install steps. This is a warmup, not the interview — do not implement product features.

Do **not** install or use GitHub CLI (`gh`). Use `git` only.

## Checklist

```
- [ ] Collect GitHub username
- [ ] Prove git can talk to GitHub as that user
- [ ] Verify runtime prerequisites
- [ ] Install backend
- [ ] Install frontend
- [ ] Start both servers
- [ ] Confirm URLs
```

## 1. GitHub username

If missing, **stop and ask in chat**. Wait for the candidate to type it. Do not guess from `git config`, Cursor account, or the machine hostname. Do not ask for email.

Ask for the **GitHub username** they will use on interview day (the account that can accept a private-repo invite). A profile URL is fine (`https://github.com/alice` → `alice`).

Write it to `PREP.md` at the repo root (already gitignored):

```markdown
github: <username>
checked_at: <ISO-8601>
```

Do not commit this file.

## 2. Prove git can talk to GitHub as that user

Do not trust `git config user.name` or `user.email`. Do not run `gh`. Always run these as real shell calls from the **repo root**.

```bash
git fetch origin
```

If that fails, **stop**. Help them fix Git/GitHub auth (SSH key or HTTPS credentials). Do not install GitHub CLI.

Then check which account git is using over SSH:

```bash
ssh -T git@github.com
```

That command is GitHub’s git/SSH check, not GitHub CLI. The greeting is `Hi <login>!`. Compare **case-insensitively** to the typed username.

- If SSH is not set up yet, help them add a key or switch `origin` to HTTPS and retry `git fetch origin`. Then retry `ssh -T git@github.com`.
- If the greeting is a **different** login, **stop**. They must use the GitHub account they typed (new SSH key or HTTPS credentials for that user). Then confirm `ssh -T git@github.com` matches before installing anything.

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
- GitHub via git is `<login>`
- The three URLs
- They can close the app until interview day; the interview uses a **different private repo**
