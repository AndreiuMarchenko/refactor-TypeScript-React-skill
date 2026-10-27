---
migration_id: "{{existing-or-derived-migration-id}}"
migration_root: "{{authorized-repository-relative-root}}"
status: in_progress
validated_code_state: unverified
---

# Migration Completion Record

Updated: {{actual-timestamp-and-timezone}}.
This filename is a tracking location; the status above determines whether the migration is complete.

## Agreed Scope and Endpoint

{{Record the authorized inventory boundary, required behavior and cleanup/optimization criteria, and explicit exclusions. Completion must cover this inventory rather than only folders that already have reports.}}

## Folder Inventory and Report Index

| Folder, consumer, or entry point | Module report                                | Inspection/refactoring status | Migration status  | Verification freshness and dependencies |
| -------------------------------- | -------------------------------------------- | ----------------------------- | ----------------- | --------------------------------------- |
| {{actual-inventory-item}}        | {{relative-report-link-or-not-yet-assessed}} | {{observed-status}}           | {{actual-status}} | {{source-state-and-dependencies}}       |

## Cross-Folder Remaining Work

| Stable legacy/finding ID | Location and production reachability | Required replacement and remaining callers | Actual prerequisite IDs and responsible module | Concrete action or blocker | Closure check and current state |
| ------------------------ | ------------------------------------ | ------------------------------------------ | ---------------------------------------------- | -------------------------- | ------------------------------- |
| {{deduplicated-id}}      | {{current-code-evidence}}            | {{observed-gap}}                           | {{actual-dependencies}}                        | {{evidence-backed-step}}   | {{acceptance-evidence-or-open}} |

## Migration-Wide Measured Results

| Metric and units    | Stable scope/method        | Verified baseline            | Current value          | Comparable delta               | Evidence and limitations |
| ------------------- | -------------------------- | ---------------------------- | ---------------------- | ------------------------------ | ------------------------ |
| {{relevant-metric}} | {{denominator-and-method}} | {{measured-or-not-recorded}} | {{actual-measurement}} | {{computed-or-not-comparable}} | {{resolvable-evidence}}  |

## Final Combined Verification

Final tested source state: {{commit-or-content-manifest-including-untracked-source}}.

| Requirement/scenario | Exact command, working directory, and run time | Actual result on final state             | Evidence               |
| -------------------- | ---------------------------------------------- | ---------------------------------------- | ---------------------- |
| {{required-check}}   | {{executed-command-and-context}}               | {{actual-result-or-not-run-with-reason}} | {{artifact-or-output}} |

## Closure Decision

| Condition                                                                                 | Current status | Evidence or remaining gap                  |
| ----------------------------------------------------------------------------------------- | -------------- | ------------------------------------------ |
| Agreed scope fully inspected; report gaps and stale claims resolved                       | not_verified   | {{inventory-evidence}}                     |
| Superseded production implementations removed; zero reachable old paths; callers migrated | not_verified   | {{reachability-and-removal-evidence}}      |
| Current adapters justified; historical fixtures excluded from production                  | not_verified   | {{module-graph-evidence}}                  |
| Required combined behavior/type/lint/build checks pass                                    | not_verified   | {{current-verification}}                   |
| Required measured cleanup/performance criteria met                                        | not_verified   | {{metrics-or-justified-non-applicability}} |
| No unresolved prerequisites, defects, or blockers; reports agree                          | not_verified   | {{reconciled-findings}}                    |

{{Set status to complete only after every applicable condition has supporting evidence. A checked row or aggregate test count alone is insufficient. Otherwise record the precise incomplete scope and blockers.}}

## Decision and Verification History

{{Preserve scope changes, earlier verification/failures, stale evidence, completed legacy IDs, and reopening decisions.}}
