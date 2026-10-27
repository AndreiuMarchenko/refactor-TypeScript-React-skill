# refactor-TypeScript-React-skill

An Agent Skill for auditing and refactoring TypeScript/React modules using authoritative documentation, explicit resource ownership, and verified behavior.

Use it when cleaning up architecture, improving contracts and types, removing unnecessary wrappers or dead code, or fixing lifecycle and dependency boundaries. It gives Codex, Claude Code, or Cursor a reusable review and implementation workflow without treating legacy code as an architectural model.

## What It Does

- Grounds decisions in official React/TypeScript documentation, Clean Architecture principles, and relevant pattern references.
- Uses legacy code to establish behavior and compatibility, rather than justify new design choices.
- Groups responsibilities around behavior and ownership, with deliberate dependency boundaries.
- Improves input validation, contracts, resource cleanup, and protection against stale callbacks.
- Applies classes, builders, and other patterns only when they solve an identified problem.
- Requires evidence for dead-code removal and checks appropriate to the change.

For an audit request, the agent reports findings. For a refactoring request, it implements and verifies changes within the requested scope. The skill does not enforce a fixed folder structure or replace type checking, linting, tests, or human review.

Read [SKILL.md](SKILL.md) for the complete instructions and [references/sources.md](references/sources.md) for the source catalog. The current instructions request Ukrainian JSDoc for classes and methods; specify another language in your task if needed.

## Requirements

- Codex, Claude Code, or Cursor with local Agent Skills support.
- Access to the target repository and its existing development tools.
- Documentation access to verify source claims. If unavailable, the agent must identify what it could not verify.

The skill itself has no package dependencies, executable scripts, or separate build step. Repository checks use the target project's tools.

## Installation

Clone or download the `refactor-TypeScript-React-skill` repository, including `SKILL.md` and its supporting files. The skill identifier is `source-driven-refactor`; use that name for the installation folder and invocation commands. Choose a location based on your tool and intended scope:

| Tool | Personal installation | Repository installation |
| --- | --- | --- |
| Codex | `~/.agents/skills/source-driven-refactor/` | `<repo>/.agents/skills/source-driven-refactor/` |
| Claude Code | `~/.claude/skills/source-driven-refactor/` | `<repo>/.claude/skills/source-driven-refactor/` |
| Cursor | `~/.cursor/skills/source-driven-refactor/` | `<repo>/.cursor/skills/source-driven-refactor/` |

Personal installations apply across projects. Commit a repository installation when the team should share the skill. See the official [Codex installation locations](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills), [Claude Code skill documentation](https://code.claude.com/docs/en/skills), and [Cursor skill documentation](https://cursor.com/docs/skills). Cursor also discovers `.agents/skills`; an installation shared with Codex does not need a second Cursor copy.

For a new personal installation in Codex, run this from the root of the downloaded `refactor-TypeScript-React-skill` repository:

```sh
skill_target="$HOME/.agents/skills/source-driven-refactor"
mkdir -p "$skill_target"
cp -R SKILL.md LICENSE agents references "$skill_target/"
```

For Claude Code, use the same commands with this destination:

```sh
skill_target="$HOME/.claude/skills/source-driven-refactor"
```

For a Cursor-specific installation, use this destination:

```sh
skill_target="$HOME/.cursor/skills/source-driven-refactor"
```

These examples assume a new installation. If the destination already exists, update the existing skill instead of creating another copy. Only runtime files are copied; Git history and integration examples remain in the source repository. See the [complete integration examples](#integration-examples) for standalone commands.

In Codex, an existing folder can also be linked into the discovery location:

```sh
mkdir -p "$HOME/.agents/skills"
ln -s /absolute/path/to/refactor-TypeScript-React-skill "$HOME/.agents/skills/source-driven-refactor"
```

Replace the source path with the actual folder path. Use either copying or linking for that destination. If a new skill does not appear in Codex, restart it; see the [official discovery guidance](https://learn.chatgpt.com/docs/build-skills#create-a-skill).

## Usage

Open the target repository in your coding agent. Specify the target path, the desired result, and any behavior or API constraints.

### Codex

Mention the skill with `$source-driven-refactor`, or select it through `/skills` in Codex CLI/IDE. See [Codex skill invocation](https://learn.chatgpt.com/docs/build-skills#how-chatgpt-and-codex-use-skills).

```text
$source-driven-refactor
Audit src/features/messages/api/websocket.
Report architectural and typing issues with file locations, consequences,
and supporting sources. Do not modify files.
```

```text
$source-driven-refactor
Refactor src/features/messages/api/websocket.
Preserve the public API and wire protocol. Remove unnecessary forwarding
helpers, improve contracts, and make resource ownership explicit.
Update affected callers and run relevant checks.
```

### Claude Code

Invoke the installed skill with `/source-driven-refactor`, followed by the task. See [Claude Code invocation](https://code.claude.com/docs/en/skills).

```text
/source-driven-refactor Refactor src/features/notifications. Preserve existing behavior, improve input validation and lifecycle cleanup, and verify affected consumers.
```

### Cursor

In Agent chat, type `/` and select `source-driven-refactor`, then describe the task. See [Cursor skill invocation](https://cursor.com/docs/skills#how-skills-work).

```text
/source-driven-refactor Audit src/features/notifications. Report findings with sources and file locations. Do not modify files.
```

All three tools can also select a relevant skill automatically based on its description. Explicit invocation makes the requested workflow clear.

## Integration Examples

| Tool | Example | Configuration |
| --- | --- | --- |
| Codex | [Installation, usage, and UI metadata](examples/codex.md) | [agents/openai.yaml](agents/openai.yaml) |
| Claude Code | [Installation and usage](examples/claude-code.md) | Shared [SKILL.md](SKILL.md); no separate YAML required |
| Cursor | [Installation and usage](examples/cursor.md) | Shared [SKILL.md](SKILL.md); no separate YAML required |

`agents/openai.yaml` is the working Codex metadata example. Claude Code and Cursor load the shared skill instructions through their own discovery locations.

## Repository Structure

```text
refactor-TypeScript-React-skill/
├── .gitignore
├── README.md
├── LICENSE
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   └── sources.md
└── examples/
    ├── codex.md
    ├── claude-code.md
    └── cursor.md
```

## Expected Output

The agent should explain the outcome, significant findings with locations and status, sources supporting important conclusions, checks actually performed, and remaining limitations. It should distinguish documented API requirements from architectural interpretation and project-specific choices.

Passing tests alone do not establish architectural quality. Review the resulting diff and the evidence behind the agent's decisions.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
