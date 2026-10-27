# Cursor Integration

## Installation

Run from the root of this skill repository for a new personal installation:

```sh
skill_target="$HOME/.cursor/skills/source-driven-refactor"
mkdir -p "$skill_target"
cp -R SKILL.md LICENSE agents references "$skill_target/"
```

For a team installation, use `/absolute/path/to/your-project/.cursor/skills/source-driven-refactor` as `skill_target` and run the remaining commands. Commit that folder in the target project.

Cursor also discovers personal and project `.agents/skills` directories. If the skill is already installed there for Codex, use that shared installation instead of creating another copy for Cursor.

## Skill Configuration

Cursor loads the shared [SKILL.md](../SKILL.md) and supporting references. No additional YAML or `.mdc` rule is needed for this skill.

## Audit Example

In Agent chat, type `/`, select `source-driven-refactor`, and enter the task:

```text
/source-driven-refactor Audit src/features/messages/api/websocket. Report findings with file locations, supporting sources, and consequences. Do not modify files.
```

## Refactoring Example

```text
/source-driven-refactor Refactor src/features/notifications. Preserve public contracts and behavior. Remove unnecessary wrappers, strengthen types, and make resource ownership explicit. Verify affected consumers and report the checks performed.
```

Open the target project in Cursor. Agent can also select the skill based on its description. This example covers local use; personal skills for Cloud Agents require the separate synchronization workflow described in Cursor's documentation.

Source: [official Cursor skill documentation](https://cursor.com/docs/skills).
