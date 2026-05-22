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

---

## Syncing with remote (collaboration)

```
origin  =  https://github.com/your-username/your-repo.git
            └── main  (the branch on GitHub)
```

- **`main`** = your **local** branch (copy on your computer)
- **`origin/main`** = the **remote** branch on GitHub

"Your branch is up to date with origin/main" = your local `main` has the same commits as GitHub's `main`.

### Checking for pending updates

| Situation | Command | What it tells you |
|---|---|---|
| Uncommitted local changes | `git status` | Files modified/staged but not yet committed |
| Local commits not pushed | `git status` | `"Your branch is ahead of 'origin/main' by N commits"` |
| Remote commits not pulled | `git fetch` then `git status` | `"Your branch is behind 'origin/main' by N commits"` |

### Purpose of `git fetch`

Downloads the latest commits, branches, and tags from GitHub **without** changing your working directory. It updates your local knowledge of the remote so you can compare:

```
git fetch         # "What's new up there?"
git status        # now accurate: is local ahead, behind, or up to date?
git log origin/main  # see what they have that you don't
```

### Safe push workflow (team projects)

1. `git fetch` — check if others have pushed
2. `git status` — behind? ahead? both?
3. If **behind**: `git pull` then `git push`
4. If **ahead** (only you): `git push`
5. If **both**: `git pull` first, resolve conflicts, then `git push`

### Merge conflicts

When two people change the same part of the same file, Git can't decide which is correct:

```
Auto-merging file.js
CONFLICT (content): Merge conflict in file.js
Automatic merge failed; fix conflicts and then commit the result.
```

In the file, Git marks the conflict:

```javascript
<<<<<<< HEAD
console.log("my version");
=======
console.log("their version");
>>>>>>> origin/main
```

**To resolve:**
1. Edit the file — keep one version, combine both, or write something new
2. Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Stage and commit:

```powershell
git add file.js
git commit -m "Resolve merge conflict"
```

**Tips to reduce conflicts:**
- Pull often (don't go days without syncing)
- Work in different files/areas than teammates
- Communicate about what you're changing

### If a conflict will take long to resolve

```powershell
# 1. Cancel the conflicted merge
git merge --abort

# 2. Create a branch with your local work
git checkout -b feature/my-work

# 3. Push it to GitHub
git push -u origin feature/my-work

# 4. Tomorrow, talk to your colleagues
#    Then either:
#    - Merge their latest main into your branch and resolve together
#    - Or have them pull your branch and help
```

This undoes the merge entirely, saves your changes on a branch, and leaves `main` untouched so nobody is blocked.

---

## Understanding `git checkout -b feature/my-work`

**Question:** What does `git checkout -b feature/my-work` mean?

**Answer:**

- `checkout -b` = create a new branch **and** switch to it (short for `git branch <name>` + `git checkout <name>`)
- `feature/my-work` = the branch name. The `/` is just a naming convention (like a folder) to organize branches: `feature/*`, `bugfix/*`, `hotfix/*`, etc.

It doesn't create actual folders — just a readable way to group related branches in `git branch --list`.
