---
migration_id: "{{existing-or-derived-migration-id}}"
migration_root: "{{authorized-repository-relative-root}}"
scope: "{{repository-relative-target}}"
refactoring_status: in_progress
migration_status: in_progress
validated_code_state: unverified
---

# Module Migration Report

Shared record: {{relative-link-to-MIGRATION_COMPLETION.md}}.
Updated: {{actual-timestamp-and-timezone}}.

## Scope and Acceptance Criteria

{{Requested outcome, inspected paths/consumers, behavior/protocol invariants, and actual acceptance criteria. List exclusions and unassessed areas explicitly.}}

## Implemented Decisions

| Finding ID and code evidence | Implemented decision and rationale/source | Resulting implementation and callers |
| ---------------------------- | ----------------------------------------- | ------------------------------------ |
| {{observed-finding}}         | {{implemented-change}}                    | {{code-and-integration-evidence}}    |

## Cleanup and Reachability

| Legacy ID     | Superseded location/symbol | Canonical replacement               | Callers/registrations before and after | State and evidence                     |
| ------------- | -------------------------- | ----------------------------------- | -------------------------------------- | -------------------------------------- |
| {{stable-id}} | {{actual-path-or-symbol}}  | {{replacement-or-missing-contract}} | {{verified-consumers}}                 | {{removed-or-remaining-with-evidence}} |

## Measured Results

| Metric and units    | Definition, scope, and method | Before                       | After                        | Comparable delta               | Evidence                        |
| ------------------- | ----------------------------- | ---------------------------- | ---------------------------- | ------------------------------ | ------------------------------- |
| {{relevant-metric}} | {{reproducible-method}}       | {{measured-or-not-recorded}} | {{measured-or-not-measured}} | {{computed-or-not-comparable}} | {{artifact-or-observed-output}} |

{{Explain trade-offs/regressions and limits. No runtime speedup claim from LOC, file count, or test count.}}

## Verification Record

Code snapshot: {{commit-or-content-manifest-including-untracked-source}}.
Baseline snapshot: {{verified-baseline-or-not-recorded}}.

| Check and covered scenarios | Exact command and working directory | Execution time and code state | Actual result                                   | Evidence artifact/output |
| --------------------------- | ----------------------------------- | ----------------------------- | ----------------------------------------------- | ------------------------ |
| {{relevant-check}}          | {{executed-command}}                | {{actual-run-context}}        | {{exit-code-and-result-or-not-run-with-reason}} | {{resolvable-evidence}}  |

## Remaining Migration and Dependencies

| Legacy/finding ID | Observed gap, location, and remaining callers | Canonical target or missing behavior | Responsible module and actual prerequisite IDs | Concrete next action                      | Removal acceptance test/metric   |
| ----------------- | --------------------------------------------- | ------------------------------------ | ---------------------------------------------- | ----------------------------------------- | -------------------------------- |
| {{stable-id}}     | {{inspected-evidence}}                        | {{replacement-status}}               | {{actual-dependencies-or-none}}                | {{implementable-action-or-open-decision}} | {{observable-closure-condition}} |

{{If no items remain, state zero only with the inspection/reachability evidence. Missing information is not a completed migration.}}

## Status and History

{{Explain the two statuses separately, unresolved blockers, stale evidence, and changes since the previous pass. Preserve prior failures and decisions with their context.}}
