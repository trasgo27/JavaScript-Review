# OpenCode Agents Guide

## What Are Agents?

Agents are specialized AI assistants that can be configured for specific tasks and workflows. They allow focused tools with custom prompts, models, and permissions.

## Types

| Type | Description |
|------|-------------|
| **Primary** | Main assistants you interact with directly. Switch via **Tab** key. |
| **Subagent** | Specialized assistants invoked by primary agents or manually via `@mention`. |

## Built-in Agents

### Primary
- **Build** — Default agent, all tools enabled. Full development work.
- **Plan** — Read-only analysis & planning. Edits and bash default to `ask`.

### Subagents
- **@general** — Multi-step tasks, full tool access (except todo). Use for parallel work.
- **@explore** — Fast, read-only codebase exploration.
- **@scout** — Read-only external docs & dependency research.

### Hidden (system, auto-run)
- **compaction** — Compresses long context into summaries.
- **title** — Generates session titles.
- **summary** — Creates session summaries.

## Usage

- **Primary agents**: Press **Tab** to cycle between them.
- **Subagents**: Type `@agent-name` in your message (e.g., `@explore find the auth logic`).
- **Child sessions**: Navigate with **Right** (next child), **Left** (previous), **Up** (back to parent), **Leader+Down** (first child).

---

## Creating Agents

### Via CLI (recommended)
```bash
opencode agent create
```
Interactive prompt: choose location (global or project), description, auto-generates prompt & ID, select permissions, creates `.md` file.

### Via Markdown files
Place files in:
- Global: `~/.config/opencode/agents/`
- Per-project: `.opencode/agents/`

```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
permission:
  edit: deny
  bash: deny
---
You are in code review mode. Focus on:
- Code quality and best practices
- Potential bugs and edge cases
- Performance implications
- Security considerations
```

The filename becomes the agent name (e.g., `review.md` → `@review`).

### Via JSON config (`opencode.json`)
```json
{
  "agent": {
    "code-reviewer": {
      "description": "Reviews code for best practices",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "You are a code reviewer. Focus on security and performance.",
      "permission": { "edit": "deny" }
    }
  }
}
```

---

## Configuration Options

| Option | Description |
|--------|-------------|
| `description` | **Required**. What the agent does and when to use it. |
| `mode` | `primary`, `subagent`, or `all` (default: `all`). |
| `model` | Override the model for this agent (e.g., `anthropic/claude-sonnet-4-20250514`). |
| `prompt` | Custom system prompt. Use `{file:./prompts/my-prompt.txt}` for external files. |
| `temperature` | 0.0–1.0. Lower = focused/deterministic, higher = creative. |
| `top_p` | 0.0–1.0. Alternative to temperature for controlling randomness. |
| `steps` | Max agentic iterations before forcing a text response. |
| `permission` | Granular tool permissions: `allow`, `ask`, or `deny`. |
| `color` | Hex color or theme token (e.g., `#ff6b6b`, `accent`). |
| `hidden` | `true` — hide from `@` autocomplete (subagents only). |
| `disable` | `true` — disable the agent entirely. |

### Permission Keys

| Key | Tools gated |
|-----|-------------|
| `read` | `read` |
| `edit` | `write`, `edit`, `apply_patch` |
| `glob` | `glob` |
| `grep` | `grep` |
| `list` | `list` |
| `bash` | `bash` |
| `task` | `task` |
| `webfetch` | `webfetch` |
| `websearch` | `websearch` |
| `todowrite` | `todowrite`, `todoread` |
| `external_directory` | Tools accessing files outside the worktree |

Permission values: `"allow"`, `"ask"`, `"deny"`.

Bash permissions support glob patterns for fine-grained control:
```json
{
  "permission": {
    "bash": {
      "*": "ask",
      "git status *": "allow",
      "grep *": "allow"
    }
  }
}
```

### Task Permissions (subagent routing)
Control which subagents an agent may invoke:
```json
{
  "permission": {
    "task": {
      "*": "deny",
      "orchestrator-*": "allow"
    }
  }
}
```
Last matching rule wins. Users can always invoke any subagent via `@`.

### Provider-Specific Options
Extra fields pass through to the provider:
```json
{
  "deep-thinker": {
    "reasoningEffort": "high",
    "textVerbosity": "low"
  }
}
```

---

## Tuning Tips

- **Analysis/Planning**: `temperature: 0.1`, restricted permissions, `mode: primary`
- **Development**: `temperature: 0.3`, full permissions, `mode: primary`
- **Brainstorming**: `temperature: 0.7`, `top_p: 0.9`
- **Code Review**: read-only permissions, focused system prompt
- **Cost control**: Use `steps: 5-10` to limit iterations; use cheaper models for routine tasks
- **Parallel work**: Create subagents and invoke via `@general` or `task` tool

---

## Use Cases

| Agent | Mode | Permissions | Purpose |
|-------|------|-------------|---------|
| Build | primary | all allow | Full development |
| Plan | primary | edit/bash = ask | Analysis without changes |
| Review | subagent | edit deny, bash deny | Code quality review |
| Debug | subagent | bash + read allow | Issue investigation |
| Docs | subagent | bash deny | Documentation writing |

---

## Examples

### Security Auditor (`~/.config/opencode/agents/security-auditor.md`)
```markdown
---
description: Performs security audits and identifies vulnerabilities
mode: subagent
permission:
  edit: deny
---
You are a security expert. Focus on identifying potential security issues.
Look for:
- Input validation vulnerabilities
- Authentication and authorization flaws
- Data exposure risks
- Dependency vulnerabilities
- Configuration security issues
```

### Documentation Writer (`~/.config/opencode/agents/docs-writer.md`)
```markdown
---
description: Writes and maintains project documentation
mode: subagent
permission:
  bash: deny
---
You are a technical writer. Create clear, comprehensive documentation.
Focus on:
- Clear explanations
- Proper structure
- Code examples
- User-friendly language
```
