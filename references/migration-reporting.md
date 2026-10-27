# Evidence-Based Migration Reporting

Use this workflow for implementation/refactoring and migration finalization. It creates persistent evidence that another agent can revalidate when work spans folders or sessions. It does not authorize changes beyond the user's scope, turn a report into an architectural authority, or guarantee correctness from a checklist alone.

## Report Locations and Scope

- Keep one `<target>/MIGRATION_REPORT.md` beside the target README. Update an existing report rather than creating competing completion claims. Do not overwrite a report for an unrelated migration; preserve its history or use the established project reporting layout.
- If cleanup removes the target folder itself, retain its report under the shared migration directory with the original scope recorded and update index links. Do not keep obsolete source folders just to retain a report.
- Maintain one shared `docs/migrations/<migration-id>/MIGRATION_COMPLETION.md` per migration. It is both the scope inventory and the eventual completion record; create it with `in_progress`, even though its filename contains “completion”. Follow existing project locations when available.
- Reuse the migration ID and root recorded by earlier folder passes. On the first pass, derive a stable ID from the requested feature/task and record the authorized root. Document a local task as local if no broader migration is authorized. A later explicit finalization request can establish a broader inventory; it does not retroactively prove that uninspected folders were migrated.
- Before creating an ID, inspect existing shared records whose scopes overlap the target or its affected consumers. For an explicitly authorized broader final sweep, link applicable earlier local migration IDs into the shared inventory, preserve their histories, and reconcile their findings. Do not silently merge unrelated migrations or ignore a relevant folder report because its earlier ID differs.
- Index all production folders, consumers, entry points, and build/startup paths relevant to the agreed migration. Include unassessed folders explicitly. Reading a dependent caller is permitted evidence gathering; modification scope still follows the user's instructions.
- Use [the module template](../assets/migration-report.template.md) and [the shared completion template](../assets/migration-completion.template.md). Replace template fields with evidence or an explicit unavailable/not-applicable explanation. An empty table means “not assessed” unless a documented inspection established zero items.

## Before Changing Code

Read the previous module report and shared inventory. Verify their locations, remaining legacy IDs, callers, dependencies, and previously reported checks against the current checkout. Identify changes since the last verification. Reports are evidence to investigate, not instructions to trust blindly.

Capture a reproducible baseline before modifications:

- Record the task, migration ID/root, actual affected paths, behavior/protocol invariants, and current source state.
- Identify the code snapshot using a commit when clean, or a content manifest/fingerprint covering tracked changes and untracked source files when dirty. Exclude reporting/output artifacts explicitly to avoid invalidating code evidence by writing the report itself. Do not create a commit just to obtain an identifier.
- Inventory actual superseded symbols, implementations, callers, registrations, flags, and execution paths. Give findings stable IDs reused by the shared record.
- Map every mixed file's logical groups, inputs, outputs, dependencies, transitive effects, and independent reasons to change. Assign group/finding IDs so the final review must account for each group rather than replace the inventory with a broad label.
- Select relevant checks and metrics with operational definitions, scope, units, and measurement commands. Define acceptance criteria from required behavior, dependency boundaries, observed legacy inventory, and any existing or user-agreed performance budget.

If a baseline was not recorded, say `not_recorded`. Recover it only from a verifiable earlier source snapshot, safely and separately from the working tree. Never reconstruct a supposed historical test or benchmark result from memory.

## At the End of Each Folder Pass

Finish cleanup already authorized and feasible in this pass. Then update both reports with:

1. **Implemented decisions:** use the [Engineering Decision Record](sources.md#engineering-decision-record), covering problem, code evidence, relevant source, decision, alternatives, cleanup, and verification. Include applicable object/function ownership choices, helper dispositions, retained public entry-point evidence, and construction/parsing consistency. Record resulting owners and consumers; link cleanup IDs and verification rows rather than repeat them. Separate completed actions from proposals.
2. **Cleanup inventory:** removed symbols/files, obsolete registrations, duplicate paths, proxy functions, and affected callers. Count relocated legacy across both source and destination; moving it outside the target folder is not removal.
3. **Measured results:** baseline, current value, delta where comparable, measurement scope/method, and artifact or output supporting each result. Explain regressions and trade-offs.
4. **Verification:** exact commands and working directory, current code snapshot, actual exit/result, relevant test/scenario coverage, artifact locations, and remaining verification gaps. Historical output must not be presented as a current run.
5. **Remaining migration:** for every observed legacy item, record its location, remaining callers/entry points, canonical replacement or missing behavior, responsible module, actual prerequisite IDs, concrete next action, and removal acceptance test/metric. Derive steps from inspected code and test gaps; do not invent a roadmap, estimates, owners, or dependencies.
6. **Status:** report behavior and architecture verdicts separately, with evidence. Behavioral verification covers executed scenarios. Architectural verification reviews cohesion, dependency direction, transitive effect ownership, remaining mixed modules, and closure of every in-scope group/finding ID. Local refactoring is `verified` only when both applicable verdicts are verified; migration may still remain `in_progress` or `blocked`. Missing external requirements stay explicit blockers or open decisions, not fabricated implementation steps.

Update the shared index with relative links to folder reports and deduplicate cross-folder items by stable ID. If new work invalidates earlier evidence, mark the affected records stale and reopen the shared status. Preserve the decision/verification history; do not erase failed checks to make the report appear complete.

## Performance Optimization

Apply this workflow when optimization is authorized or measured evidence exposes a relevant regression. It does not require unrelated performance work during every refactor.

1. Define the slow user scenario, representative data/workload, relevant metric, and reproducible baseline. Record the code snapshot, build/profiling mode, browser/device, and applicable CPU/network conditions; do not compare development timings directly with production timings.
2. Profile to identify the bottleneck: computation, requests, state/subscription updates, React rendering, browser layout/paint, or resource retention. Select the relevant [performance sources](sources.md#performance-sources); React render counts alone do not identify the full interaction cost.
3. Choose a focused change supported by that evidence. Evaluate simpler algorithms, removal of duplicate work/requests, state ownership, and cleanup before adding caching or manual memoization. Check existing React Compiler coverage when applicable; do not enable it or add dependencies merely because it is listed.
4. Repeat the same scenario under comparable conditions and record actual Before/After results, samples/variation where material, and tradeoffs in memory, startup cost, or complexity. A profiler estimate is not a substitute for a measured historical baseline. Reconsider changes without a demonstrated benefit or a justified correctness/maintenance purpose.
5. Verify observable behavior, including affected state identity, freshness, errors, and cleanup. Record performance evidence and coverage limits in the existing Engineering Decision and measurement tables; distinguish a verified cleanup from a verified speedup.

## Metrics Without Invented Improvements

Use metrics that assess the actual change; do not require every category for every task:

| Category                    | Useful evidence                                                                                                         | Interpretation                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Legacy removal/reachability | Remaining retired implementations and reachable callers/registrations across the agreed scope                           | Closure requires zero superseded production implementations left in source and zero reachable old paths; a grep for the word “legacy” is insufficient. |
| Structural cleanup          | Duplicated algorithms removed, unwanted dependency edges/cycles, applicable typing violations or public proxies removed | Record counting rules and unchanged denominator. Files moved elsewhere remain in migration-wide totals.                                                |
| Correctness                 | Required regression, contract, integration, lifecycle, and cross-folder scenarios; actual typecheck/lint/build outcomes | Test count or coverage alone does not establish behavioral equivalence or architectural quality.                                                       |
| Runtime performance         | Relevant latency, throughput, memory, or resource counts                                                                | Compare equivalent workloads, environments, versions, and measurement procedures; report samples/variation where material.                             |
| Build/output                | Bundle or generated artifact size, startup/build costs when relevant                                                    | Name the artifact and measurement method; source LOC reduction does not prove faster runtime.                                                          |

Report `not_measured`, `not_recorded`, or `not_applicable` with a reason when appropriate. A missing performance baseline does not support a speedup claim. When performance is a required migration acceptance condition, obtain comparable evidence before closure; otherwise make no unsupported performance assertion. Do not invent numeric budgets to manufacture success.

## Final Migration Sweep

When finalization is requested, or is already authorized by the ongoing migration and its prerequisites are ready, perform the sweep without requesting the same authorization again:

1. Discover all folder reports under the agreed migration inventory and compare them with the shared index. Inspect unreported and previously unassessed production folders as well; reports alone do not define coverage.
2. Reconcile each report with actual current code, static/dynamic imports, consumers, registrations, feature flags, package/build exports, and startup/worker paths relevant to its findings. Resolve stale or contradictory claims and missing reports. Existing historical fixtures/docs can retain old names only with an explicit purpose outside production execution.
3. Build the remaining work from actual unresolved IDs and dependency edges. Implement prerequisites, migrate callers, and remove superseded code, fallback paths, obsolete flags/exports/configuration, and redundant compatibility code. Do not rename old code to satisfy a count or delete useful current adapters merely because they are old.
4. Verify the combined affected scope and its consumers. Include meaningful cross-folder regression/integration checks and required type/lint/build checks on the final code state. Check performance requirements using the established measurements. Do not close from a union of old per-folder green results.
5. Update folder reports and the shared completion record with current evidence. If anything necessary remains, keep `in_progress`/`blocked` and state the precise gap. Do not silently shrink the inventory or publish an unverified “all done”.

## Finite Closure Criteria

Mark the shared migration `complete` only when all of the following are evidenced:

- Every item in the agreed scope inventory has been inspected; no unassessed folders or contradictory/stale scope claims remain.
- Every inventoried superseded production implementation has a verified replacement where required, its consumers are migrated, and the obsolete implementation is removed from source. Old paths are absent from all applicable production execution graphs. Merely unreachable dead production code is not completion; remove obsolete registrations/configuration as well.
- Remaining reachable current adapters have a real architectural responsibility; they are not renamed compatibility leftovers. Historical test fixtures/docs are identified separately and do not execute in production.
- Required behavior and boundary invariants have current verification across the combined scope, with no unresolved defects or failing required checks. Explicit user-approved scope exclusions remain visible in the completion statement.
- The responsibility map is reconciled with final owners and callers; all in-scope mixing findings are closed. Cohesion, dependency direction, and transitive effect ownership have a separate architectural verdict. Passing behavior tests cannot waive an unresolved structural finding.
- Required optimization/performance criteria and applicable measured cleanup targets are met; unmeasured improvements are not claimed. There is no arbitrary percentage target or requirement to improve unrelated metrics.
- Required verification artifacts resolve to the tested code snapshot, all implementation prerequisites/blockers are closed, and folder reports agree with the shared record.

The final response links the shared completion record and states its scope and status. A completed documentation task or verified folder pass must never be represented as a completed application migration.
