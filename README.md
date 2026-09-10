# Connecteam interview prep

This repo checks that your laptop has everything needed for the Connecteam interview.

You do **not** get Connecteam Cursor access until interview day. Warmup does not need our team.

**If you use Cursor:** clone this repo, open it, run **`/setup-prep`**. The skill does the rest (GitHub username + email, confirms this terminal is that GitHub account, installs deps, starts the app).

Use **Cursor Hobby (free)** or a **personal** Cursor account you already pay for. Do **not** use a work / company SSO Cursor account — it often cannot join our team later, and it is the wrong login for this interview.

**If you do not want Cursor for this step:** skip the skill. Install the tools and run the commands in [Manual setup](#manual-setup). That is enough.

You do not need to read further unless you chose the manual path or want the details.

---

## Optional details

This is not the interview. Interview day uses a different private repo.

You need Git, GitHub CLI (`gh`), Python 3.11+, and Node 24+. Newer Python/Node is fine.

**macOS**

```bash
brew install git gh python node
```

**Windows:** Git from https://git-scm.com/download/win, GitHub CLI from https://cli.github.com/, Python 3.11+ from https://www.python.org/downloads/ (tick **Add python.exe to PATH**), Node 24+ from https://nodejs.org/. In PowerShell, `py --version` is enough if `python` is not on PATH.

**Linux**

```bash
sudo apt update
sudo apt install -y git python3 python3-venv python3-pip
```

Install Node 24+ from https://nodejs.org/ or your distro, and GitHub CLI from https://cli.github.com/.

```bash
git clone https://github.com/Connecteam-Interviews/interview-warmup.git
cd interview-warmup
```

Log GitHub CLI in as the account you will use on interview day:

```bash
gh auth login
gh api user --jq .login
```

Wrong account:

```bash
gh auth logout --hostname github.com
gh auth login
```

## Manual setup

Same result as `/setup-prep`, without Cursor.

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

Then http://localhost:5173, http://localhost:8000/health, and http://localhost:8000/docs should respond.
