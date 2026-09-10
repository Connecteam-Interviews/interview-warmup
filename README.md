# Connecteam interview prep

This repo checks that your laptop has everything needed for the Connecteam interview.

Clone it, open it in Cursor, run **`/setup-prep`**. The skill does the rest: GitHub username + email, confirms this terminal is that GitHub account, installs Python/Node deps, starts the app.

You do not need to read further. The rest of this README is optional if you want the details yourself.

---

## Optional details

This is not the interview. Interview day uses a different private repo.

You need Git, GitHub CLI (`gh`), Python 3.11+, Node 24+, and Cursor (or another AI IDE that can run project skills). Newer Python/Node is fine.

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

If the skill is happy, http://localhost:5173, http://localhost:8000/health, and http://localhost:8000/docs all respond.

If `gh` is not logged in as the username you typed:

```bash
gh auth login
```

Wrong account:

```bash
gh auth logout --hostname github.com
gh auth login
```
