# Continuous Refactoring and Context Recovery

Use this workflow for authorized implementation and refactoring. It supports any target module or folder within the skill's TypeScript/React scope; it does not prescribe project names, domain concepts, file layouts, or a particular test runner. Read-only audits remain read-only.

## One Scope, One Finding Ledger

Establish the authorized inventory, affected consumers, public contracts, acceptance criteria, and baseline once. Reuse the existing migration ID, reports, and stable finding IDs; validate the responsibility map against current code. In a dirty checkout, distinguish the task's starting state from unrelated pre-existing changes; Git HEAD alone is not the task baseline.

Bound initial discovery to the target and evidence needed for its dependencies. Start implementing actionable findings once ownership and relevant contracts are understood; do not exhaustively re-audit unrelated modules or documentation before every edit. Read additional sources when they answer a concrete unresolved question.

Maintain one current ledger of findings and their states, owners, dependencies, and closure evidence. Add newly discovered in-scope defects to that ledger rather than ignore them or restart the migration. Record unrelated findings without silently expanding the assignment. Revisit an accepted decision when changed code, requirements, or contradictory evidence warrants it, not merely because context was compacted.

## Whole-Folder Architecture Before Local Edits

At the start of a folder pass, read prior reports only far enough to recover scope, migration identity, explicit requirements, baseline locations, and operational constraints. Then inspect the current production inventory and necessary consumers to form a whole-folder view before adopting previous architectural conclusions or drilling into individual helpers. Historical findings are evidence to reconcile, not an allowlist of what may need work. Do not let a previous "verified" status establish current cohesion, or preserve a boundary merely because an earlier agent accepted it.

Use the existing responsibility map to cover every production file in cohesive groups. Identify what the module does end to end, who owns state/resources and contracts, where input is decoded, where representation changes, where effects occur, and which dependencies are allowed. Establish each group's semantic purpose from bodies and callers, not directory labels. This is bounded discovery of the authorized folder, not a redesign of the surrounding application.

Choose a coherent target layout before detailed implementation. Compare keeping, separating, and consolidating owners: explain how the selected arrangement closes mixed responsibilities while keeping related concepts navigable. A responsibility boundary does not automatically require a separate file. A proposed module must improve responsibility boundaries or navigation beyond what an existing cohesive owner provides. A meaningful invariant can justify shared validation without requiring its own file; a different scalar category or an available function name is not enough. Centralize compatible validation responsibilities in an existing meaningful module where appropriate, keeping distinct acceptance contracts explicit and avoiding both miscellaneous collections and copied guards.

After establishing this map, reconcile all prior findings and decisions with the current code. Retain valid contracts and evidence, reopen unsupported closures, and add newly observed structural problems to the same ledger. On context recovery within the same pass, reuse the established whole-folder map when current inputs still match; do not repeat this discovery after every extraction or compaction.

## Continue Through Closure

Internal implementation steps are allowed; each step is not a separate assignment requiring another prompt. Continue through the authorized inventory, caller migration, cleanup, residual-file review, and required verification. Do not end with only a plan, one extraction, or an invitation to continue when feasible in-scope work remains.

After extraction, inspect both sides: every remaining original file and every destination. Reconcile retained algorithms, contracts, helper calls, effects, and consumers with the original responsibility map. A cleaner destination does not establish that the source is cohesive; an empty source should not survive as an unexplained relay. Reopen findings whose implementation merely relocated mixing.

Apply the residual symbol review to retained candidate modules, including unchanged utilities and entry points. Carry its dispositions in the same ledger/checkpoint: distinguish enumerated candidates, inspected symbols, implemented actions, and evidence-backed retention. Do not equate "all files scanned" with "all symbols assessed" or close a user-identified concern with a generic module label.

Before closure, perform the [whole-folder consolidation review](refactoring-review.md#whole-folder-consolidation-review) from the final tree and actual dependency/data flow. Revisit module boundaries as a whole, including small destinations created by this pass. Consolidate unnecessary fragments into their cohesive owner, remove needless hops, and migrate consumers. The inherited findings and symbol table are cross-checks, not substitutes for this final review. Keep reporting compact and evidence-linked; report length and declaration counts are not architectural acceptance criteria.

Keep local completion distinct from a broader migration's status. Unrelated outstanding work in a shared record does not automatically block the authorized local endpoint. Conversely, do not narrow the agreed inventory to manufacture completion. If work genuinely cannot continue because of an unresolved dependency, unavailable prerequisite, or execution limit, record the exact incomplete findings and next executable action; never mark them complete to end the run.

## Concise Checkpoint and Recovery

Keep a current Execution Checkpoint near the top of the existing module report. It contains:

- Authorized scope, baseline reference, and current source-state identifier.
- Accepted owner/contract decisions, with links to their detailed evidence.
- Closed and open finding IDs, current work, and actual blockers.
- Task-changed paths and the original/destination files still awaiting review.
- Verification receipt references and which results are applicable, stale, or missing.
- The next concrete action needed to advance an open finding.

Update the checkpoint at meaningful implementation boundaries and before a handoff or interruption when feasible. Append significant decisions and failures to existing history; do not regenerate full reports, recopy baselines, or create another evidence directory after every small edit. Keep detailed logs linked rather than copied into working summaries.

On resume, read the checkpoint and relevant shared status, compare recorded state with current tracked and untracked inputs, and inspect the delta. Continue from the next open finding. Revalidate only assumptions and receipts affected by that delta, while retaining responsibility for the full declared inventory before closure. A checkpoint is a navigation aid, not proof that an unchecked claim is true.

## Verification Ledger and Selection

Record each check's command, working directory, coverage/acceptance scope, relevant input state, execution conditions, actual result, and receipt. Inputs include applicable source dependencies, tests/fixtures, configuration, toolchain/dependency versions, generated inputs, and environment assumptions. A fingerprint of only the directly edited file is insufficient for a check covering broader dependencies.

- During edits, use the project's supported targeted checks for changed behavior and affected consumers. In a dirty repository, select from task-specific changes rather than assume every difference from HEAD belongs to this task. Static related-test selection does not replace coverage of dynamic wiring or composed boundaries.
- At closure, account for all required acceptance checks across the final affected scope, including combined behavior and separate architectural review. Preserve repository/user-required validation. Targeted green results must not silently replace a broader required check.
- Reuse a successful receipt only when its command/configuration, coverage, relevant inputs, and assumptions still match. Keep its original execution time and explicitly record why reuse is valid. If those inputs changed or their equivalence cannot be established, mark it stale and rerun the affected check.
- Rerun after relevant implementation, test, configuration, dependency, generated-input, or environment changes; also rerun when a failure, flakiness concern, or uncovered requirement calls the earlier result into question. Do not repeat unchanged successful checks simply to produce a newer timestamp.
- Reporting-only edits need documentation validation; they do not automatically invalidate runtime/build results when reports are not inputs to those checks. Project-specific pipelines may make documentation an input, so verify that assumption rather than impose a universal exemption.
- Measure elapsed time and distinguish analysis, implementation, verification, and coordination when diagnosing slow execution. Do not assume a long run was caused by tests without timing evidence. Do not promise token savings or speedups without comparable measurements.

When delegation is available and authorized, give independent tasks explicit ownership and bounded context. Agree on shared contracts before concurrent edits, keep conflicting writes under one owner, and have the coordinator reconcile findings and perform combined verification. Delegation does not transfer responsibility for final closure.
