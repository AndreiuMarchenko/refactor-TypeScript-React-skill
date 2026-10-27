# Mixed-mapper skill evaluation

This is an intentionally mixed TypeScript presentation module for evaluating the refactoring skill. Its behavior checks pass before refactoring. A green baseline is expected: the exercise tests whether the agent also closes structural findings and makes effects explicit.

The fixture supplies message text, media, users, notification preferences, and observable cache state to a consumer-facing `presentMessage` export. It uses Node's test runner and the locked TypeScript toolchain; no backend or browser is needed.

## Run the baseline

From this repository's root, with a Node version supported by `project/package.json`:

```sh
cd examples/mixed-mapper/project
npm ci
npm run check
```

Expected baseline: 18 behavior checks and type-checking pass. This does not establish architectural completion. CI runs these fixture checks; structural grading is a separate review.

## Public behavior contract

- Preserve the `presentMessage` export from `src/index.ts`, its arguments, and the returned card contract. Inputs are already typed; the preview budget is a nonnegative integer.
- Normalize whitespace, trim, and clip by Unicode code points, including the ellipsis within the budget. A zero budget yields an empty preview. Preserve string IDs exactly.
- Resolve the current user's trimmed display name, falling back to `Unknown user`. Refresh the author-label cache from current user data rather than trust stale entries.
- Prefer an image over a video poster; an image's nullish thumbnail falls back to its source URL. Empty media yields a null thumbnail. Missing media leaves the output field absent; present `undefined` and `null` remain distinct present output values.
- Explicit false notification overrides win over true preferences. Nullish override values fall back to current preferences. Muting and preview visibility are independent.
- Update the preview cache even when display preferences hide the preview. Update the preview before the author-label cache; preserve error propagation and partial-state semantics of required writes. Preserve unrelated entries and caller-owned message/user data.

The provided checks cover representative composed paths and final cache state. They do not prove every behavior or SRP compliance.

## Independent evaluation procedure

Copy only `project/` into a disposable directory, excluding `node_modules`, and run `npm ci` there. Supply the evaluator with the installed skill and this task, without the grading rubric or previous outcomes:

```text
Use $source-driven-refactor to refactor src and its affected consumers
for maintainability. Preserve the public presentMessage export from
src/index.ts, current returned values and field presence, and observable
cache behavior. Complete the authorized refactoring and cleanup, run
the project's relevant checks, and report the outcome using the skill.
Use English for documentation and comments. Do not change the existing
tests or dependency configuration.
```

Keep the evaluator's generated implementation and reports in that disposable project. Review the actual final code and run the original checks again. Record behavior and architecture verdicts independently using the rubric below. Preserve a patch, source manifest, and command output outside the fixture when retaining evidence for a run. A repeated run must start from the original project, not a previous agent's solution.

## Maintainer grading rubric

| Assessment | Evidence required |
| --- | --- |
| Responsibility map | Every mixed file has concrete groups, inputs, outputs, dependencies, effects, and reasons to change. The map accounts for text policy, media selection, author resolution, notification preferences, cache synchronization, and composition. A label such as `projection` does not explain their cohesion. |
| Actual separation | Independently changing policies have cohesive owners at the final implementation locations; the coordinator assembles results rather than retaining their algorithms. Hoisting branches into local helpers or moving the original body to another mapper is insufficient. No fixed file count or prescribed filenames are acceptance criteria. |
| Transitive effects | Trace `presentMessage` through the original mapper and its helpers. Inspect writes reached indirectly through text and author helpers. After refactoring, presentation-policy functions are pure, and required writes have an explicit owner and contract, including ordering and failure behavior. Verify returned cards and final cache state. |
| Behavior | Original checks pass unchanged against the public entry point, including field presence, Unicode clipping, precedence, cache refresh, and hidden-preview cache updates. Review uncovered required behavior and add targeted checks where evidence warrants them; test counts alone cannot close gaps. |
| Dependency direction | Policy does not acquire cache/framework wiring through a broad context or opaque generic port. Contracts reflect actual consumers; newly introduced wrappers or specializations have a responsibility. |
| Legacy removal | Callers use the new implementation; the superseded mixed mapper and forwarding paths are removed from the evaluated production source. Check imports, entry points, configuration, and retained bodies. Historical input files remain only in this repository's explicit evaluation fixture. |
| Honest completion | Every original mixing finding has closure evidence or an explicit unresolved constraint. Reports separate behavior and architecture verdicts. Any unresolved in-scope mixed owner, hidden effect path, or relocated old implementation prevents architectural completion. |

The rubric's ownership criteria are a project-specific application of [SRP](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html), not a claim that SRP mandates a particular folder layout.

## Evaluation record

See [evaluation.md](evaluation.md) for the observed independent run and its limits. This fixture complements the [React lifecycle demo](../react-demo/README.md); it exercises structural closure even when the original behavior tests are already green.
