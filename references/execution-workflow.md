# Continuous Refactoring and Context Recovery

Use this workflow for authorized implementation and refactoring. It supports any target module or folder within the skill's TypeScript/React scope; it does not prescribe project names, domain concepts, file layouts, or a particular test runner. Read-only audits remain read-only.

## One Scope, One Finding Ledger

Establish the authorized inventory, affected consumers, public contracts, acceptance criteria, and baseline once. Reuse the existing migration ID, reports, responsibility map, and stable finding IDs. In a dirty checkout, distinguish the task's starting state from unrelated pre-existing changes; Git HEAD alone is not the task baseline.

Bound initial discovery to the target and evidence needed for its dependencies. Start implementing actionable findings once ownership and relevant contracts are understood; do not exhaustively re-audit unrelated modules or documentation before every edit. Read additional sources when they answer a concrete unresolved question.

Maintain one current ledger of findings and their states, owners, dependencies, and closure evidence. Add newly discovered in-scope defects to that ledger rather than ignore them or restart the migration. Record unrelated findings without silently expanding the assignment. Revisit an accepted decision when changed code, requirements, or contradictory evidence warrants it, not merely because context was compacted.

## Continue Through Closure

Internal implementation steps are allowed; each step is not a separate assignment requiring another prompt. Continue through the authorized inventory, caller migration, cleanup, residual-file review, and required verification. Do not end with only a plan, one extraction, or an invitation to continue when feasible in-scope work remains.

After extraction, inspect both sides: every remaining original file and every destination. Reconcile retained algorithms, contracts, helper calls, effects, and consumers with the original responsibility map. A cleaner destination does not establish that the source is cohesive; an empty source should not survive as an unexplained relay. Reopen findings whose implementation merely relocated mixing.

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
