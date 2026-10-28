---
migration_id: "{{existing-or-derived-migration-id}}"
migration_root: "{{authorized-repository-relative-root}}"
scope: "{{repository-relative-target}}"
refactoring_status: in_progress
behavior_status: not_verified
architecture_status: not_verified
migration_status: in_progress
validated_code_state: unverified
---

# Module Migration Report

Shared record: {{relative-link-to-MIGRATION_COMPLETION.md}}.
Updated: {{actual-timestamp-and-timezone}}.

## Execution Checkpoint

- **Scope and source state:** {{authorized-inventory-baseline-reference-and-current-state}}
- **Accepted decisions:** {{owner-contract-decisions-and-detail-links}}
- **Finding ledger:** {{closed-open-in-progress-and-blocked-IDs}}
- **Task changes and residual review:** {{changed-paths-original-files-and-destinations-still-to-inspect}}
- **Verification:** {{receipt-links-with-applicable-stale-or-missing-status-and-relevant-input-state}}
- **Next action:** {{concrete-action-advancing-an-open-finding-or-verified-closure}}

{{Keep this checkpoint concise and current. On resume, compare recorded inputs with the checkout and continue from the ledger; do not restart the full audit or regenerate unchanged evidence.}}

## Scope and Acceptance Criteria

{{Requested outcome, inspected paths/consumers, behavior/protocol invariants, and actual acceptance criteria. List exclusions and unassessed areas explicitly.}}

## Responsibility Map and Closure

{{Begin with the entire production inventory grouped by semantic purpose: state/resource/contract owners, entry points, allowed dependencies, and end-to-end data/effect flow. Identify actual layer roles, consumer-owned ports, external adapters, and prohibited import/type/data dependencies; justify framework-owned exceptions. Explain the selected layout and alternatives before detailed symbol edits. Then map each mixed file's policies and reasons to change; reconcile prior findings after forming the current-code view. Account for retained files, not just the diff or inherited problem list.}}

| Group/finding ID and original file | Logical group and reason to change | Inputs and outputs | Dependencies and transitive effect paths | Final owner and migrated callers | Closure evidence or unresolved constraint |
| --- | --- | --- | --- | --- | --- |
| {{stable-id-and-location}} | {{policy-and-change-reason}} | {{input-output-contracts}} | {{helpers-ports-and-effect-owner}} | {{final-owner-and-callers}} | {{verified-separation-or-incomplete}} |

{{At closure, review the final folder structure and operation flow independently of prior verdicts. Record consolidation decisions for tiny/one-function modules, retained coordinator policies, placement, and unnecessary navigation. Explain representative change scenarios; neither splitting every function nor merging unrelated rules is a completion strategy. Reuse this map and linked evidence rather than add another reporting system.}}

## Residual Symbol Dispositions

{{Enumerate retained utility collections, coordinators, adapters, and entry points, including unchanged files and user-identified concerns. Cover private policy helpers and re-exports as well as public declarations. Apply the mandatory residual symbol review; a file-level reviewed flag or existing caller is insufficient. Link shared evidence instead of repeating it.}}

| File and explicit symbols | Actual consumers / reachability | Semantic owner, invariant, and effects | Action | Implementation or retention evidence; simpler alternative considered |
| --- | --- | --- | --- | --- |
| {{candidate-file-and-listed-symbols}} | {{inspected-callers-or-entry-paths}} | {{concrete-policy-and-effect-owner}} | {{keep-inline-consolidate-relocate-remove}} | {{resulting-owner-or-value-lost-without-abstraction-and-evidence}} |

{{For retained re-export paths, name the supported API/build/encapsulation constraint beyond import convenience. For retained utility groups, explain their shared semantic contract. For coordinator residue, separate snapshot acquisition and independent policies from orchestration. Missing dispositions or unsupported retention keep architecture unverified.}}

## Implemented Decisions

{{Repeat this Engineering Decision record for each significant decision. Link cleanup IDs and verification rows below instead of duplicating their full evidence.}}

{{When applicable, record class/value-object versus function/DTO choices, helper keep/consolidate/relocate/remove decisions, and the consumer or compatibility evidence for retained re-export entry points. Document shared construction/parsing invariants, actual round-trip checks, and unresolved gaps. A facade label or utility filename is not justification.}}

### Engineering Decision: {{finding-id}}

- **Problem:** {{observed-problem-and-consequence}}
- **Evidence:** {{files-functions-callers-or-execution-paths-and-affected-behavior}}
- **Source:** {{documentation-section-actually-read-and-supported-claim-or-explicit-evidence-gap}}
- **Decision:** {{implemented-change-rationale-resulting-owner-and-consumers}}
- **Alternatives:** {{reuse-existing-implementation-or-solve-without-new-abstraction-and-chosen-tradeoff}}
- **Cleanup:** {{removed-or-remaining-legacy-IDs-and-evidence-or-reasoned-not-applicable}}
- **Verification:** {{before-after-behavior-executed-checks-results-and-record-links-or-explicit-not-run}}

## Cleanup and Reachability

| Legacy ID     | Superseded location/symbol | Canonical replacement               | Callers/registrations before and after | State and evidence                     |
| ------------- | -------------------------- | ----------------------------------- | -------------------------------------- | -------------------------------------- |
| {{stable-id}} | {{actual-path-or-symbol}}  | {{replacement-or-missing-contract}} | {{verified-consumers}}                 | {{removed-or-remaining-with-evidence}} |

{{For affected similar contracts, identify duplicates eliminated and explain why remaining contracts stay separate. Compare values, ownership, invariants, consumers, and evolution rationale; record intentional optional/null/undefined differences and the purpose of retained aliases or specializations. State not_applicable with a reason if no similar contracts are affected.}}

## Measured Results

| Metric and units    | Definition, scope, and method | Before                       | After                        | Comparable delta               | Evidence                        |
| ------------------- | ----------------------------- | ---------------------------- | ---------------------------- | ------------------------------ | ------------------------------- |
| {{relevant-metric}} | {{reproducible-method}}       | {{measured-or-not-recorded}} | {{measured-or-not-measured}} | {{computed-or-not-comparable}} | {{artifact-or-observed-output}} |

{{Explain trade-offs/regressions and limits. No runtime speedup claim from LOC, file count, or test count.}}

## Verification Record

Code snapshot: {{commit-or-content-manifest-including-untracked-source}}.
Baseline snapshot: {{verified-baseline-or-not-recorded}}.

| Check and covered scenarios | Exact command and working directory | Execution time, relevant input state, and conditions | Execution/applicability status and actual result | Evidence artifact/output |
| --- | --- | --- | --- | --- |
| {{relevant-check}} | {{executed-command}} | {{original-run-time-input-fingerprint-and-conditions}} | {{newly-executed-validly-reused-stale-or-not-run-with-reason-and-result}} | {{resolvable-evidence}} |

{{For reused results, preserve the original timestamp and explain unchanged coverage, inputs, and assumptions. For stale results, name the invalidating change and required rerun. Reporting-only edits do not automatically invalidate runtime evidence.}}

## Remaining Migration and Dependencies

| Legacy/finding ID | Observed gap, location, and remaining callers | Canonical target or missing behavior | Responsible module and actual prerequisite IDs | Concrete next action                      | Removal acceptance test/metric   |
| ----------------- | --------------------------------------------- | ------------------------------------ | ---------------------------------------------- | ----------------------------------------- | -------------------------------- |
| {{stable-id}}     | {{inspected-evidence}}                        | {{replacement-status}}               | {{actual-dependencies-or-none}}                | {{implementable-action-or-open-decision}} | {{observable-closure-condition}} |

{{If no items remain, state zero only with the inspection/reachability evidence. Missing information is not a completed migration.}}

## Status and History

| Assessment | Verdict | Evidence and remaining gaps |
| --- | --- | --- |
| Behavior | not_verified | {{executed-scenarios-and-actual-results}} |
| Architecture | not_verified | {{whole-folder-layout-consolidation-placement-cohesion-dependency-direction-effect-ownership-and-every-group-ID-closure}} |

{{Explain behavior, architecture, local refactoring, and migration statuses separately. Unresolved in-scope mixing keeps architecture incomplete even if behavior tests pass. Record blockers, stale evidence, and changes since the previous pass; preserve earlier failures and decisions.}}
