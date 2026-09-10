# Interview laptop prep

Public warmup for the Connecteam senior fullstack interview. Clone this repo, open it in Cursor, run **`/setup-prep`**. That skill asks for your **GitHub username** and **email**, checks that this terminal is logged into **that** GitHub account, then installs Python/Node and starts a tiny hello app.

This is **not** the interview. Interview day uses a **private** repo after you join the Cursor team.

## What you need

- Git
- GitHub CLI (`gh`) — used to prove which GitHub user this terminal is
- Python **3.11 or newer** (3.12 / 3.13 fine)
- Node.js **24 or newer** (25+ fine)
- Cursor (or another AI IDE that can run project skills)

Install missing tools **before** `/setup-prep`. The skill will not install system packages unless you ask.

### macOS

```bash
brew install git gh python node
```

Use whatever `python3` / `node` versions Homebrew gives you, as long as they meet the minimums.

### Windows

- Git: https://git-scm.com/download/win
- GitHub CLI: https://cli.github.com/
- Python 3.11+: https://www.python.org/downloads/ (tick **Add python.exe to PATH**)
- Node 24+: https://nodejs.org/ (Current is fine)

In PowerShell, `py --version` is enough if `python` is not on PATH.

### Linux

```bash
sudo apt update
sudo apt install -y git python3 python3-venv python3-pip
```

Install Node 24+ from https://nodejs.org/ or your distro, and GitHub CLI from https://cli.github.com/.

## Setup

```bash
git clone https://github.com/Connecteam-Interviews/interview-warmup.git
cd interview-warmup
```

Open this folder in Cursor. In chat, run **`/setup-prep`**.

The skill will:

1. Ask for your GitHub username and the email you use with Cursor
2. Run `gh api user` and **stop** if this terminal is not logged in as that username (`gh auth login` if needed)
3. Create `backend/.venv`, `pip install -r backend/requirements.txt`, `npm install` in `frontend/`
4. Start FastAPI on **8000** and Vite on **5173**

Open:

- App: http://localhost:5173
- API: http://localhost:8000/health
- Docs: http://localhost:8000/docs

You should see a short “prep works” page. That is enough. Close the servers when you are done.

## GitHub login

`/setup-prep` requires GitHub CLI auth in **this** terminal:

```bash
gh auth login
```

GitHub.com → HTTPS → log in as the same username you typed. If `gh api user --jq .login` shows a different account:

```bash
gh auth logout --hostname github.com
gh auth login
```

Interview day you will get a private-repo invite on that same account.

## Manual start (if you skip the skill)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Second terminal:

```bash
cd frontend
npm install
npm run dev
```
