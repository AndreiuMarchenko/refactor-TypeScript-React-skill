# Refactoring Review Criteria

Read this reference when changing routers, normalization boundaries, mixed coordinators, or stateful adapters. Select checks relevant to the actual change; these are engineering acceptance criteria, not universal React/TypeScript mandates or a required folder template.

## Responsibility Boundaries

- Identify parsing/validation, representation mapping, orchestration, resource ownership, concrete effects, and compatibility dispatch in the target. Separate responsibilities that change independently. Keep related rules together; one function or file per branch is not a goal.
- A routing coordinator should make precedence and terminal outcomes visible. It should not also decode embedded JSON, construct legacy UI-handler contexts, normalize identifiers, and mutate unrelated state. Move those responsibilities to their actual owners rather than wrapping the original body in more functions.
- Define boundary contracts around the operations the scenario needs. An opaque generic carrying an entire hook registry or framework context does not establish a meaningful application boundary. Concrete adapters own that context and translate it explicitly.
- Keep representation types with their model and integration contracts with their boundary. Separate them from orchestration when they have independent consumers and reasons to change. Do not create an unrelated shared-types dump or mirror every class with an interface.
- Choose a simple switch, an ordered dispatch chain, composition, or a stateful object based on the problem. Preserve protocol precedence and receiver binding. A thin adapter can be justified by binding, snapshot ownership, validation, or translation; its small size alone is not grounds for deletion.

## Behavioral Checks Across Boundaries

| Changed area | Evidence to obtain |
| --- | --- |
| Decoder, mapper, object merge | Preserve missing fields separately from `undefined` and `null`, identifier precision, unknown wire fields, and documented metadata precedence. Test the actual decoder-to-consumer path, including metadata present only inside a payload. Do not tighten an accepted input format without contract evidence and an explicit behavior change. |
| Dispatch pipeline | Exercise overlapping matches, first-owner termination, unknown/malformed input, and handler registration changes. If dispatch uses a mutable registry, define whether one frame uses one snapshot and test that policy. Preserve differences between top-level and nested payloads. |
| Deferred state reconciliation | Identify which values must be captured with their owner and which must be read fresh. Test a newer explicit user choice within the same scope, rapid scope changes, and cancellation. An identity check alone does not protect newly changed state inside an unchanged scope. |
| Subscription or projection | Test startup with prepopulated state, updates around setup, and stop/start or replacement. Define initial reconciliation, not only future-event handling; test that stale cleanup cannot release the current owner's resource. |
| Error conversion or cleanup | Identify expected failures for each catch. Preserve unexpected error causes through a diagnostics boundary or propagate them according to the contract. Test partial setup and cleanup failures where they can leave resources or pending state behind. |

Assert consumer-visible data and final state, not only helper calls, branch counts, or the existence of new files. Test doubles should implement the real port contract without unchecked casts that hide mismatches. Do not write redundant tests for mechanical moves.

## Final Review

Compare the final responsibility map with the original problem. Search for old symbols and reachable superseded paths, and apply the skill's Legacy Cleanup rules to intentional compatibility code. Check relocated bodies as carefully as new code. Where a stable local boundary can be enforced by an existing linter or dependency check, add and verify that check; avoid arbitrary line-count limits or tests that merely match implementation text. Report concrete remaining defects or uncertainty; do not use passing checks to waive an unresolved finding. Persist the evidence and remaining dependencies using [migration-reporting.md](migration-reporting.md); a verified folder refactor does not establish migration-wide completion.
