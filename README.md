# Connecteam interview prep

This repo checks that your laptop has everything needed for the Connecteam interview.

Clone it. In Cursor, open the **repo root** (`interview-warmup`), then in Agent chat type **`/setup-prep`**. The skill does the rest: asks for your GitHub username, checks git can talk to GitHub as that user, has you turn on GitHub two-factor authentication, installs Python/Node deps, starts the app.

For this install, use a **personal free** Cursor account. On interview day we give you a paid Cursor account.

**Turn on GitHub two-factor authentication before the interview.** Use the same GitHub account you will use on interview day. Open https://github.com/settings/security and enable an authenticator app or a passkey. SMS is not enough. The private interview repository will not let you accept the invite until this is on. Do it during prep, not during the interview.

You can skip Cursor and follow [Manual setup](#manual-setup) instead.

You do not need to read further. The rest of this README is optional if you want the details yourself.

---

## Optional details

This is not the interview. Interview day uses a different private repo.

You need Git, Python 3.11+, and Node 24+. Newer Python/Node is fine.

**macOS**

```bash
brew install git python node
```

**Windows:** Git from https://git-scm.com/download/win, Python 3.11+ from https://www.python.org/downloads/ (tick **Add python.exe to PATH**), Node 24+ from https://nodejs.org/. In PowerShell, `py --version` is enough if `python` is not on PATH.

**Linux**

```bash
sudo apt update
sudo apt install -y git python3 python3-venv python3-pip
```

Install Node 24+ from https://nodejs.org/ or your distro.

```bash
git clone https://github.com/Connecteam-Interviews/interview-warmup.git
cd interview-warmup
```

If the skill is happy, http://localhost:5173, http://localhost:8000/health, and http://localhost:8000/docs all respond.

GitHub should work with **git** (not GitHub CLI). From the repo root:

```bash
git fetch origin
ssh -T git@github.com
```

`ssh -T` should greet the GitHub username you gave the skill.

On that same account, two-factor authentication must be on before interview day: https://github.com/settings/security (authenticator app or passkey, not SMS).

## Manual setup

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
