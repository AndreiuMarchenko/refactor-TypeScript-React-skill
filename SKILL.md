---
name: source-driven-refactor
description: "Audit and refactor TypeScript/React architecture, mixed responsibilities, and boundary/lifecycle defects. Record implemented decisions, measured cleanup results, and remaining legacy dependencies in migration reports; reconcile folder reports to finish an authorized migration with evidence. Use authoritative sources and behavior checks. Reject cosmetic file moves and unsupported completion claims. Not for formatting-only tasks."
license: "MIT"
metadata:
  author: "Andrii Marchenko"
  version: "1.1.0"
---

# TypeScript/React Refactoring Based on Primary Sources

Stay within the requested scope: report findings for an audit; implement and verify changes for a refactoring task. Do not turn local cleanup into an application redesign. The user's explicit current requirements take precedence over this skill's conventions.

## Sources and Evidence

Read [references/sources.md](references/sources.md), select relevant sources, and open the necessary sections before applying them. For another API, add its owner's official documentation. If access is unavailable, identify the unverified claim; do not present a recollection as a verified requirement.

Distinguish documented semantics, conclusions derived from principles, and local design decisions. React/TypeScript do not prescribe a universal file count, mandatory OOP, a Builder, or a single folder for types. A pattern catalog informs the choice; it does not require applying every pattern.

Read legacy code to understand APIs, callers, wire/storage formats, side effects, and behavior. **Do not use code from another folder as an architectural model or justify a choice with “this is how it is already done.”** Even a previously cleaned module is an example to evaluate, not an authoritative standard.

## Decision Criteria

- Group responsibilities by related reasons to change and resource ownership. Define domains around behavior, not an arbitrary number of lines or files.
- Separate internal policy from React/store/environment/URL/diagnostics wiring. Pass dependencies through narrow contracts at an explicit composition boundary; do not introduce a DI container without a concrete need.
- Use a class for state, lifecycle, and invariants; use a pure function for transformations. A Builder is justified by construction complexity. Under the approach adopted here, constructors and build methods do not start network activity, timers, or subscriptions.
- Centralize the shared algorithm while keeping explicit extension points. Inheritance must preserve the base contract; otherwise, choose composition. Every pattern must solve an identified problem.
- Remove forwarding helpers and config files that provide no policy, validation, adaptation, or boundary responsibility. Keep a wrapper when it provides a required contract. Do not replace unnecessary files with one miscellaneous dump.
- Keep related contracts near the owner of the responsibility. Do not duplicate every class with an interface. Choose `type` or `interface` based on the contract's shape, not a blanket ban on either.
- Accept unvalidated input as `unknown` and narrow it with guards or decoders. Separate wire DTOs, domain data, and UI models where their invariants differ. Use a discriminated union for mutually exclusive states.
- Do not hide technical debt with `any`, unchecked double casts, or disabled checks. Do not change identifier precision, wire/storage keys, or business semantics as a side effect of cleanup.

## Structural Completion Gate

Before an architectural refactor, identify the target's responsibilities and independent reasons to change. Choose boundaries from that map, not from file length or the names of existing folders. For routers, normalizers, mixed coordinators, or stateful adapters, read [references/refactoring-review.md](references/refactoring-review.md) before implementation and use its relevant checks during final review.

Moving a mixed implementation, removing `any`, adding a class, or extracting branches into helpers does not by itself complete the refactor. Inspect every affected implementation at its final location, including code moved into adapters. Explain which responsibilities were separated and why each remaining coordinator is cohesive. Do not declare completion while a known in-scope responsibility problem is merely relocated or hidden behind a broad port.

Verify observable behavior through affected boundaries. Passing type checks, snapshots, and unit tests is evidence for their covered scenarios, not a substitute for this structural review. Report unresolved structural findings explicitly rather than labeling the whole result clean.

## Lifecycle and Executable Code

- Define ownership, startup, and cleanup for every socket, timer, listener, subscription, worker, and object URL. Imports and rendering must not start hidden resources. React Effects need correct dependencies and symmetric cleanup; repeated setup/cleanup/setup must remain correct.
- Stale callbacks must not modify the current state: check identity, generation, or scope wherever work outlives an ownership change. Cleanup must be idempotent, cover partial setup, and avoid releasing a new resource in place of the old one.
- Use a typed entry point and a build artifact for startup or worker code. Do not hide logic in large JavaScript strings, `eval`, or `Function.toString()`. Server assembly may add escaped configuration to the bundle. Integrate generation into the necessary build/test/dev workflows; do not edit generated files manually.
- Distinguish a transport send, a server ACK, and a completed business operation. Retrying mutations requires a suitable contract. Do not mask unexpected errors with a silent outer `catch`.

## Execution and Review

1. Record the scope, public API, owners, and behavior/protocol invariants. Use other code as integration evidence. If a test preserves a defect, provide evidence and explicitly explain the behavior change.
2. For significant findings, establish a brief chain: fact in the code → source/principle → consequence → proposed change. Distinguish defects from hypotheses and design preferences.
3. Choose the smallest sufficient structure; implement authorized changes along with updates to callers. Before deleting code, check references, entry points, and relevant dynamic imports, registries, and scripts. An unused binding does not prove the absence of side effects.
4. Review the diff for dependency direction, ownership, stale work, types, duplication, and the actual purpose of builders and adapters. Give each temporary compatibility adapter a canonical target, callers, an owner, and a removal condition.
5. Add concise Ukrainian JSDoc to classes and methods describing their purpose, ownership, and significant side effects or errors. Do not paraphrase the method body. Update documentation for changed APIs and build behavior.
6. Run checks proportional to the risk: type checking, scoped linting, and relevant behavior tests for code; a production build for server/client boundaries, startup, or pipeline changes. For documentation, check formatting and links. Add regression tests for behavioral defects; do not test the mere fact that a file moved.
7. Persist the migration evidence described below before the final response, and link the updated reports. Complete authorized, feasible cleanup now; reports are not a reason to defer it.

Report the outcome, significant findings with locations and status, sources supporting important conclusions, actual checks performed, and remaining limitations. Do not present passing tests as proof of perfect architecture or full compliance with all documentation.

## Migration Reports and Finalization

For every implementation/refactoring task, read [references/migration-reporting.md](references/migration-reporting.md) before changes so baseline evidence can be captured. Create or update `<target>/MIGRATION_REPORT.md` beside its README, and maintain the migration's shared `docs/migrations/<migration-id>/MIGRATION_COMPLETION.md`. Reuse the existing migration ID, scope, and report locations. Use the linked templates; follow explicit user restrictions on writing files. For a read-only audit, return the report content without writing or claiming implementation completion.

Record implemented decisions, actual removals, measured before/after results, executed checks, and evidence-backed remaining dependencies with concrete removal conditions. Distinguish verified local refactoring from completed migration. Missing measurements remain `not_measured`; do not invent improvement percentages, historical test results, milestones, or performance claims.

When finalization is requested, or is already authorized and its prerequisites are ready, inspect every folder in its agreed inventory and all corresponding reports, revalidate claims against current code and consumers, execute the remaining migration and cleanup, and update the shared completion record. Do not just summarize reports or produce another speculative plan. `complete` requires current verification, no unresolved scope gaps, removal of superseded production implementations, and zero reachable old execution paths in the agreed migration scope. Reports, file moves, renames, and passing test counts alone cannot establish that endpoint. Report unresolved blockers explicitly, without silently narrowing the scope.

## Legacy Cleanup

A new structure is not a completed migration while obsolete execution paths remain reachable. Trace callers from application entry points through static and dynamic imports, registries, feature flags, package exports, and startup/build scripts relevant to the change. Check side effects before removing an apparently unused module.

After migrating callers, remove superseded implementations, duplicate algorithms/contracts, forwarding adapters without a boundary responsibility, and stale exports/configuration/tests within scope. Do not keep a second execution path as an unexplained fallback. For compatibility code that must remain, report its canonical replacement, remaining callers, owner, and concrete removal condition; label the migration incomplete where appropriate.

Verify both behavior and reachability: inspect the final imports and affected build entry points, search for old symbols/paths, and run relevant checks. A passing test or an unreferenced binding alone does not prove cleanup. Report what was removed, what remains reachable, and the evidence for intentional exceptions. Historical fixtures may remain outside the production module graph when their educational/test purpose is explicit.
