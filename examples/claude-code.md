# Claude Code Integration

## Installation

Run from the root of this skill repository for a new personal installation:

```sh
skill_target="$HOME/.claude/skills/source-driven-refactor"
mkdir -p "$skill_target"
cp -R SKILL.md LICENSE agents references "$skill_target/"
```

For a team installation, use `/absolute/path/to/your-project/.claude/skills/source-driven-refactor` as `skill_target` and run the remaining commands. Commit that folder in the target project.

Update an existing destination deliberately rather than nesting another copy inside it.

## Skill Configuration

Claude Code loads the shared [SKILL.md](../SKILL.md) and its referenced documentation. It does not need an equivalent of `agents/openai.yaml` for this integration.

The skill name is `source-driven-refactor`. Author information is stored under `metadata.author`, and the license is declared with `license: "MIT"` in the shared frontmatter.

## Audit Example

```text
/source-driven-refactor Audit src/features/messages/api/websocket. Do not modify files. Report findings with file locations, consequences, and supporting sources.
```

## Refactoring Example

```text
/source-driven-refactor Refactor src/features/notifications. Preserve existing behavior and public contracts. Improve input validation and lifecycle cleanup, update affected callers, and run relevant checks.
```

Open the target project and invoke the command in Claude Code. The agent can also select the skill when a task matches its description.

Source: [official Claude Code skill documentation](https://code.claude.com/docs/en/skills).
