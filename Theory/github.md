# Git & GitHub Workflow

## Daily workflow

```powershell
# 1. Check what changed
git status

# 2. Stage your changes
git add -A

# 3. Commit with a descriptive message
git commit -m "What you did (e.g. Added login form)"

# 4. Push to GitHub
git push
```

**Repeat steps 1–4 each time you complete a logical unit of work** (e.g., finished a feature, fixed a bug, refactored something).

**Best practices:**
- Commit **often** (small, focused commits)
- Write clear commit messages describing *why* (not *what* — `git diff` shows what)
- `git pull` first if you're collaborating with others (to get their changes before pushing yours)

---

## Branching

A **branch** is a separate line of development — lets you experiment without touching `main`.

### Common commands

```powershell
# List branches (* = current)
git branch

# Create a new branch
git branch feature-name

# Switch to it
git checkout feature-name

# Create + switch in one command
git checkout -b feature-name
```

### Typical workflow

```powershell
# 1. Start from main
git checkout main

# 2. Create a feature branch
git checkout -b add-dark-mode

# 3. Work, stage, commit (as usual)
git add -A
git commit -m "Add dark mode toggle"

# 4. Push the branch to GitHub
git push -u origin add-dark-mode

# 5. Merge back into main when done
git checkout main
git merge add-dark-mode

# 6. Push the updated main
git push

# 7. (Optional) Delete the feature branch locally
git branch -d add-dark-mode
```

### Key concepts

| Command | What it does |
|---|---|
| `git branch <name>` | Create branch |
| `git checkout <name>` | Switch to it |
| `git checkout -b <name>` | Create + switch |
| `git merge <name>` | Pull changes from `<name>` into current branch |
| `git branch -d <name>` | Delete branch (safe: only if merged) |
| `git branch -D <name>` | Force delete (even if not merged) |

### Visual mental model

```
main:     A---B---C---D---E  (stable, production-ready)
                \
feature:         C---D       (work in progress, experimental)
```

You branch off `main`, work freely, then merge back when done. This keeps `main` clean and deployable at all times.
