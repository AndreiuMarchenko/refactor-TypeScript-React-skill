---
name: source-driven-refactor
description: "Audit and refactor TypeScript/React architecture, mixed responsibilities, and boundary/lifecycle defects. Record implemented decisions, measured cleanup results, and remaining legacy dependencies in migration reports; reconcile folder reports to finish an authorized migration with evidence. Use authoritative sources and behavior checks. Reject cosmetic file moves and unsupported completion claims. Not for formatting-only tasks."
license: "MIT"
metadata:
  author: "Andrii Marchenko"
  version: "1.6.0"
---

# TypeScript/React Refactoring Based on Primary Sources

Stay within the requested scope: report findings for an audit; implement and verify changes for a refactoring task. Do not turn local cleanup into an application redesign. The user's explicit current requirements take precedence over this skill's conventions.

For implementation work, follow [references/execution-workflow.md](references/execution-workflow.md): keep one scope and finding ledger, resume from a concise checkpoint, finish authorized work through closure, and select verification by its actual inputs. A progress update or an extracted helper is not the endpoint of an unfinished folder refactor.

## Sources and Evidence

Read [references/sources.md](references/sources.md), identify the concrete code problem, select relevant sources, and open the necessary sections before applying them. Use its Engineering Decision Record for significant decisions, with explicit evidence, decision, cleanup, and verification. Read unrelated sources only if the scope requires them. For another API, add its owner's official documentation. If access is unavailable, identify the unverified claim; do not present a recollection as a verified requirement.

Distinguish documented semantics, conclusions derived from principles, and local design decisions. React/TypeScript do not prescribe a universal file count, mandatory OOP, a Builder, or a single folder for types. A pattern catalog informs the choice; it does not require applying every pattern.

Read legacy code to understand APIs, callers, wire/storage formats, side effects, and behavior. **Do not use code from another folder as an architectural model or justify a choice with “this is how it is already done.”** Even a previously cleaned module is an example to evaluate, not an authoritative standard.

## Decision Criteria

- Group responsibilities by related reasons to change and resource ownership. Define domains around behavior, not an arbitrary number of lines or files.
- Separate internal policy from React/store/environment/URL/diagnostics wiring. Pass dependencies through narrow contracts at an explicit composition boundary; do not introduce a DI container without a concrete need.
- Prefer function components and Hooks for React-owned state and lifecycle, and pure functions for transformations. Choose a class for non-React stateful resources or domain invariants when it provides a concrete ownership benefit. A Builder is justified by construction complexity. Under the approach adopted here, constructors and build methods do not start network activity, timers, or subscriptions.
- Centralize the shared algorithm while keeping explicit extension points. Inheritance must preserve the base contract; otherwise, choose composition. Every pattern must solve an identified problem.
- Remove forwarding helpers and config files that provide no policy, validation, adaptation, or boundary responsibility. Keep a wrapper when it provides a required contract. Do not replace unnecessary files with one miscellaneous dump.
- Keep related contracts near the owner of the responsibility. Do not duplicate every class with an interface. Choose `type` or `interface` based on the contract's shape, not a blanket ban on either.
- Accept unvalidated input as `unknown` and narrow it with guards or decoders. Separate wire DTOs, domain data, and UI models where their invariants differ. Use a discriminated union for mutually exclusive states.
- Do not hide technical debt with `any`, unchecked double casts, or disabled checks. Do not change identifier precision, wire/storage keys, or business semantics as a side effect of cleanup.

## Module Granularity and Completion

- A distinct rule or invariant does not automatically require a separate file.
- Centralize shared validation in an existing cohesive module when it has the appropriate semantic ownership; preserve each validator's acceptance and field-presence contract.
- A new module must improve responsibility boundaries or navigation. Giving a function its own filename is insufficient; compare placement in an existing owner before introducing another module.
- Judge completion by the resulting structure, supported behavior, and closed findings, not by the number of completed tables. Reports document the evidence; they do not establish architectural quality by themselves.

## Layer Boundaries and Dependency Direction

Apply the [layer dependency review](references/refactoring-review.md#layer-boundaries-and-dependency-direction) to actual module roles. Domain rules and application scenarios must remain independent of concrete databases, ORM models, network clients, React, global stores, and browser APIs. Define required I/O contracts with the inner consumer; external adapters implement them and composition connects the implementations. Verify transitive imports and data contracts as well as direct calls. Framework-owned UI/adapters may use their framework; do not manufacture empty layers or repositories where no such boundary exists.

## Contract Identity and Reuse

Before adding or retaining similar contracts, compare their values, ownership, invariants, consumers, and the rationale behind their evolution. Reuse a shared concept through a common contract or a justified specialization. Identical fields alone do not justify merging types; an alias must have a distinct purpose.

Distinguish an absent optional field from a present field whose value is `undefined` or `null`. Preserve these distinctions through contract changes, decoding, and mapping. In the final review, document which contract duplicates were eliminated and why the remaining similar contracts were kept separate, using ownership, invariants, and consumer evidence.

## Abstraction and Public Boundary Decisions

For affected utility collections, domain objects, forwarding helpers, and module entry points, apply the [abstraction, helper, and entry-point review](references/refactoring-review.md#abstractions-helpers-and-entry-points). Explicitly evaluate a class or value object where construction invariants, identity, state transitions, or resource ownership need encapsulation; justify the selected form. Pure functions and DTOs remain valid where no object ownership is needed.

Give affected helpers and re-export-only files an evidence-backed disposition: keep, consolidate, relocate to the actual owner, or remove with caller migration. A meaningful public API is different from an unnecessary relay. Broad utility filenames, static-method classes, and facade comments do not establish cohesion or boundary value. Verify shared construction/parsing invariants and account for retained abstractions in the final review.

For a folder refactor, apply the [mandatory residual symbol review](references/refactoring-review.md#mandatory-residual-symbol-review) to retained utility collections, coordinators, adapters, and entry points, including unchanged files. Account for private policy helpers as well as exported declarations and re-exports. Existing callers, a clean dependency graph, and labels such as "shared primitives" or "public API" are insufficient retention evidence. Missing symbol dispositions or unsupported exceptions keep architecture unverified.

## Structural Completion Gate

For a folder refactor, establish the [whole-folder architecture and layout](references/execution-workflow.md#whole-folder-architecture-before-local-edits) before detailed helper edits. Cover every production file, responsibility/state/contract owners, entry points, dependency direction, and end-to-end data/effect flow. Reconcile prior findings only after forming this current-code view. Symbol dispositions support this map; they do not replace it. Finish with a whole-folder consolidation review, including new tiny modules and unchanged files, rather than stop when the inherited finding list is closed.

Before an architectural refactor, map each mixed file's logical groups, inputs, outputs, dependencies, and independent reasons to change. Trace called helpers for transitive effects. Names such as "mapper", "projection", or "adapter" are not a responsibility map. For routers, normalizers, mixed coordinators, stateful adapters, utility collections, or module entry points, read [references/refactoring-review.md](references/refactoring-review.md) before implementation and use its relevant checks during final review.

Close every identified in-scope mixing finding by separating independently changing policies into cohesive owners and migrating callers. Choose the smallest structure that actually closes those findings; minimality cannot justify retaining a known mixed module. Independent policies need distinct ownership even when they contribute to one result. A coordinator may assemble their results without owning their policies.

Moving a mixed implementation, removing `any`, adding a class, or extracting branches into helpers does not by itself complete the refactor. After extraction, re-review both the remaining original files and all destinations against the responsibility map. Inspect retained algorithms and helper call paths, not only the new modules. Unresolved mixing means architectural work remains incomplete; record the precise finding and scope or dependency constraint. Do not invent an exclusion or use a broad label to declare it closed.

Assess behavior and architecture separately. Behavior verification covers the executed scenarios; architecture verification requires a final review of cohesion, dependency direction, effect ownership, and all remaining mixed modules against the original map. Green tests cannot close a structural finding. Report both verdicts and their evidence in the migration reports.

When performance is in scope or measurements expose a regression, follow the [performance optimization workflow](references/migration-reporting.md#performance-optimization) and select relevant sources. Establish a baseline and bottleneck before choosing an optimization; memoization is conditional, and improvement claims require comparable measurements plus preserved behavior.

## Lifecycle and Executable Code

- Define ownership, startup, and cleanup for every socket, timer, listener, subscription, worker, and object URL. Imports and rendering must not start hidden resources. React Effects need correct dependencies and symmetric cleanup; repeated setup/cleanup/setup must remain correct.
- Audit effects through the reachable helper call graph, not only the current function body. Formatting must not hide cache writes or other mutations behind a helper. Preserve required effects under an explicit owner and contract; unknown helper behavior is an open review gap, not evidence of purity.
- Stale callbacks must not modify the current state: check identity, generation, or scope wherever work outlives an ownership change. Cleanup must be idempotent, cover partial setup, and avoid releasing a new resource in place of the old one.
- Use a typed entry point and a build artifact for startup or worker code. Do not hide logic in large JavaScript strings, `eval`, or `Function.toString()`. Server assembly may add escaped configuration to the bundle. Integrate generation into the necessary build/test/dev workflows; do not edit generated files manually.
- Distinguish a transport send, a server ACK, and a completed business operation. Retrying mutations requires a suitable contract. Do not mask unexpected errors with a silent outer `catch`.

## Execution and Review

1. Record the scope, public API, owners, and behavior/protocol invariants. Use other code as integration evidence. If a test preserves a defect, provide evidence and explicitly explain the behavior change.
2. For significant findings, use the Engineering Decision Record: problem → code evidence → relevant source → decision → alternatives → cleanup → verification. Distinguish defects from hypotheses and design preferences, proposed work from implemented changes, and expected checks from actual results.
3. Choose a structure that closes every mapped in-scope mixing finding; minimize only among structures that meet that condition. Implement authorized changes along with updates to callers. Before deleting code, check references, entry points, and relevant dynamic imports, registries, and scripts. An unused binding does not prove the absence of side effects.
4. Review the diff for dependency direction, ownership, stale work, types, duplication, and the actual purpose of builders and adapters. Give each temporary compatibility adapter a canonical target, callers, an owner, and a removal condition.
5. Add concise JSDoc to classes and methods describing their purpose, ownership, and significant side effects or errors. Follow the user's language instruction or the target project's documentation conventions. Do not paraphrase the method body. Update documentation for changed APIs and build behavior.
6. Run checks proportional to the risk using the execution workflow's verification ledger: targeted checks during edits and combined required checks for closure. Reuse a prior successful result only when its relevant inputs, coverage, and conditions are demonstrably unchanged; label it reused rather than freshly executed. Type-check, lint, and test relevant code; build for server/client boundaries, startup, or pipeline changes. For documentation, check formatting and links. Add regression tests for behavioral defects; do not test the mere fact that a file moved.
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
