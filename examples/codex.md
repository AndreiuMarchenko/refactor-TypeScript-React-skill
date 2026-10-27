# Codex Integration

## Installation

Run from the root of this skill repository for a new personal installation:

```sh
skill_target="$HOME/.agents/skills/source-driven-refactor"
mkdir -p "$skill_target"
cp -R SKILL.md LICENSE agents references assets "$skill_target/"
```

For a team installation, use `/absolute/path/to/your-project/.agents/skills/source-driven-refactor` as `skill_target` and run the remaining commands. The installed folder must contain `SKILL.md` directly.

Choose one installation location for the same scope. Update an existing destination deliberately rather than nesting another copy inside it.

## UI Metadata: openai.yaml

The complete, working example is [agents/openai.yaml](../agents/openai.yaml). Keep it at `agents/openai.yaml` inside the installed skill folder. It sets the display name, short description, default prompt, and automatic invocation policy.

The default prompt explicitly mentions `$source-driven-refactor`. Automatic selection is enabled; it does not mean the skill is applied to every task.

## Audit Example

```text
$source-driven-refactor
Audit src/features/messages/api/websocket.
Report defects and architectural findings with severity, file locations,
supporting sources, and consequences. Do not modify files.
```

## Refactoring Example

```text
$source-driven-refactor
Refactor src/features/messages/api/websocket.
Preserve the public API and wire protocol. Make resource ownership explicit,
improve contracts, and remove proven dead code and unnecessary wrappers.
Update affected callers, run relevant checks, and report remaining issues.
```

Open the target project before invoking the skill. In Codex CLI/IDE, use `/skills` or mention the skill with `$`. If a new installation is not visible, restart Codex.

Source: [official Codex skill documentation](https://learn.chatgpt.com/docs/build-skills).
