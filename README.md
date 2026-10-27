# refactor-TypeScript-React-skill

An Agent Skill for auditing and refactoring TypeScript/React modules using authoritative documentation, explicit resource ownership, and verified behavior.

Current release: [v1.4.0](https://github.com/AndreiuMarchenko/refactor-TypeScript-React-skill/releases/tag/v1.4.0).

Use it when cleaning up architecture, improving contracts and types, removing unnecessary wrappers or dead code, or fixing lifecycle and dependency boundaries. It gives Codex, Claude Code, or Cursor a reusable review and implementation workflow without treating legacy code as an architectural model.

## What It Does

- Grounds decisions in official React/TypeScript documentation, Clean Architecture principles, and relevant pattern references.
- Selects sources for the observed problem and records significant decisions with evidence, alternatives, cleanup, and verification. State identity, external stores, behavioral testing, and unsafe assignments have dedicated source guidance.
- Uses legacy code to establish behavior and compatibility, rather than justify new design choices.
- Groups responsibilities around behavior and ownership, with deliberate dependency boundaries.
- Requires a per-file responsibility map, closure of identified mixing, and transitive effect review; reports behavior and architectural completion separately.
- Uses React guidance for component boundaries, state ownership, Hooks, and render purity; investigates performance through profiling and comparable Before/After measurements before choosing optimizations.
- Compares similar contracts by values, ownership, invariants, consumers, and evolution rationale; documents removed duplicates and justified distinctions, including optional, null, and undefined states.
- Improves input validation, contracts, resource cleanup, and protection against stale callbacks.
- Applies classes, builders, and other patterns only when they solve an identified problem.
- Explicitly reviews class/value-object versus function ownership, helper cleanup, public entry points versus redundant relays, and consistency between construction and parsing.
- Requires evidence for dead-code removal and checks appropriate to the change.
- Checks that migrated callers no longer reach obsolete implementations, duplicate logic, or unnecessary adapters.
- Writes per-folder migration reports and a shared completion record with implemented decisions, measured results, remaining dependencies, and evidence-based closure criteria.

For an audit request, the agent reports findings. For a refactoring request, it implements and verifies changes within the requested scope. The skill does not enforce a fixed folder structure or replace type checking, linting, tests, or human review.

Read [SKILL.md](SKILL.md) for the complete instructions, [references/sources.md](references/sources.md) for the source catalog, and [references/refactoring-review.md](references/refactoring-review.md) for structural review and behavioral checks. Moving files or passing tests alone does not complete an architectural refactor. The current instructions request Ukrainian JSDoc for classes and methods; specify another language in your task if needed.

## Requirements

- Codex, Claude Code, or Cursor with local Agent Skills support.
- Access to the target repository and its existing development tools.
- Documentation access to verify source claims. If unavailable, the agent must identify what it could not verify.

The installed skill has no package dependencies or separate build step. The optional [React demo](examples/react-demo/README.md) has its own locked dependencies and supported Node versions; repository checks use the target project's tools.

## Before / After: a Working React Component

The [notifications demo](examples/react-demo/README.md) is a runnable React/TypeScript application created for this repository. These excerpts come from its actual components; this is a reproducible reference scenario, not a claim of validation on an external production application.

**Before** — [full component](examples/react-demo/fixtures/before/notifications/Notifications.tsx). A forwarding adapter owns an unreachable cancellation signal, and the component accepts external data through a cast:

```tsx
useEffect(() => {
  setLoading(true);
  setError('');
  notificationAdapter(load, roomId).then((payload) => {
    setItems(payload as Notification[]);
    setLoading(false);
  }).catch((reason: unknown) => {
    setError(reason instanceof Error ? reason.message : 'Unable to load notifications');
    setLoading(false);
  });
}, [roomId, load]);
```

If room A responds after room B, A overwrites B's notifications. Unmounting does not abort the request, and malformed fields reach the UI.

**After** — [full component](examples/react-demo/src/notifications/Notifications.tsx) and [wire decoder](examples/react-demo/src/notifications/notification.ts). The Effect owns cancellation, ignores stale work even when the transport ignores abort, and validates `unknown` at the boundary:

```tsx
useEffect(() => {
  const controller = new AbortController();
  let active = true;
  setState({ status: 'loading' });

  async function refresh() {
    try {
      const payload = await load(roomId, controller.signal);
      if (active) setState({ status: 'ready', items: decodeNotifications(payload) });
    } catch (error: unknown) {
      if (active) setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unable to load notifications',
      });
    }
  }
  void refresh();
  return () => {
    active = false;
    controller.abort();
  };
}, [roomId, load]);
```

The public `Notifications({ roomId, load })` API stays the same. A keyed child scopes state to the room; a discriminated union replaces independent loading/error/data flags, and the unread count is derived during render. The adapter and superseded client are absent from the application source. No class, Builder, or DI container is needed for this ownership boundary.

Cleanup and stale-response protection follow [React's Effect contract](https://react.dev/reference/react/useEffect#fetching-data-with-effects); deriving the count follows [React's guidance on redundant state](https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state). The decoder uses [TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). The keyed boundary and file layout are local design decisions.

## Legacy Cleanup

Creating new files does not complete a refactor. The skill also checks that callers have migrated and obsolete execution paths, duplicate algorithms/contracts, stale exports, and adapters without a purpose are removed within scope.

Before deletion, the agent traces imports, entry points, dynamic loading, registries, scripts, and import side effects relevant to the change. Afterward, it reviews the diff, searches for old paths/symbols, and verifies affected behavior and build boundaries. A passing test alone cannot establish that old code is unreachable.

If compatibility code must remain, the report identifies its canonical replacement, callers, owner, and removal condition. In the demo, historical Before files remain only as explicit test fixtures; the production build rejects any fixture in its module graph. See the [cleanup evidence and validation record](examples/react-demo/README.md#validation-record).

## Try the React Demo

From this repository's root:

```sh
cd examples/react-demo
npm ci
npm run check
npm run dev
```

`check` runs the After tests, verifies that the Before component exhibits exactly the six expected regression failures, type-checks both versions, and builds the application. `npm run test:before` exposes those failures directly and intentionally exits nonzero. The [demo guide](examples/react-demo/README.md) includes a repeatable skill-evaluation task and expected findings.

The [mixed-mapper evaluation](examples/mixed-mapper/README.md) adds a structural challenge with text, media, users, notification preferences, and cache effects. Its original behavior tests already pass; accepting a refactor additionally requires reviewing responsibility separation, effect ownership, and removal of the superseded implementation.

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
cp -R SKILL.md LICENSE agents references assets "$skill_target/"
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

## Migration Reports and Final Completion

Each authorized refactoring pass creates or updates:

- `<target>/MIGRATION_REPORT.md`, beside the module README: implemented decisions, removed code/callers, before/after measurements, actual verification, and remaining migration items with their dependencies and removal conditions.
- `docs/migrations/<migration-id>/MIGRATION_COMPLETION.md`: the agreed folder/consumer inventory, links to module reports, deduplicated cross-folder work, combined measurements, and the final closure decision. Its status starts as `in_progress`.

A folder can have verified refactoring while the overall migration is incomplete. Later passes reuse the same migration ID and shared record. Remaining steps must follow actual code dependencies and test gaps; the agent must finish authorized feasible cleanup rather than use a report to postpone it.

When asked to finalize the migration, the agent reads all folder reports, inspects the entire agreed inventory including unassessed folders, reconciles old claims with current code, implements remaining migrations, deletes superseded production implementations, and reruns combined verification. It then updates the shared record; summarizing earlier reports is insufficient.

`complete` requires no unassessed scope gaps, no superseded production implementations or reachable old execution paths, verified migrated consumers and required behavior, satisfied applicable measurement criteria, and no unresolved implementation blockers. Moving code outside a measured folder or renaming a compatibility adapter does not satisfy removal. Useful current adapters and explicitly non-production historical fixtures are assessed by their actual role.

Performance improvements require comparable measurements. Missing evidence is reported as `not_measured`/`not_recorded`; neither fewer lines nor more passing tests proves faster runtime. The final record identifies the tested code snapshot and current verification evidence.

See the [reporting workflow](references/migration-reporting.md), [folder report template](assets/migration-report.template.md), and [shared completion template](assets/migration-completion.template.md). A read-only audit respects the no-write instruction and returns its findings without creating implementation-completion claims.

Example finalization request; use the ID and scope already recorded for your migration:

```text
$source-driven-refactor
Finalize the chat-cleanup migration within src/features/chat and its affected consumers.
Read all module MIGRATION_REPORT.md files and the shared MIGRATION_COMPLETION.md.
Revalidate their claims, inspect unassessed folders, execute remaining migrations,
remove superseded production code, and run combined checks and applicable measurements.
Update the completion record with the evidence and actual status.
```

## Repository Structure

```text
refactor-TypeScript-React-skill/
├── .gitignore
├── .github/workflows/validate.yml
├── README.md
├── LICENSE
├── SKILL.md
├── agents/
│   └── openai.yaml
├── assets/
│   ├── migration-report.template.md
│   └── migration-completion.template.md
├── references/
│   ├── sources.md
│   ├── refactoring-review.md
│   └── migration-reporting.md
├── releases/
│   ├── v1.0.0.md
│   ├── v1.1.0.md
│   ├── v1.2.0.md
│   ├── v1.3.0.md
│   └── v1.4.0.md
└── examples/
    ├── codex.md
    ├── claude-code.md
    ├── cursor.md
    ├── react-demo/       # Runnable Before/After app, shared tests, locked dependencies
    └── mixed-mapper/     # Independent structural evaluation with an already-green baseline
```

GitHub Actions runs both example projects' behavior/type checks on pushes and pull requests. Read the current [v1.4.0 release notes](releases/v1.4.0.md), or earlier notes for [v1.3.0](releases/v1.3.0.md), [v1.2.0](releases/v1.2.0.md), [v1.1.0](releases/v1.1.0.md), and [v1.0.0](releases/v1.0.0.md). Architectural grading of the mixed-mapper exercise remains a separate review.

## Expected Output

The agent should link the updated folder and shared migration reports and explain the outcome, significant findings with locations and status, sources supporting important conclusions, checks actually performed, and remaining limitations. It should distinguish documented API requirements from architectural interpretation and project-specific choices, and verified local refactoring from completed migration.

Passing tests alone do not establish architectural quality. Review the resulting diff and the evidence behind the agent's decisions.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
