---
name: source-driven-refactor
description: "Audit and refactor TypeScript/React module architecture using authoritative documentation, explicit ownership and verified behavior, without copying legacy design. Use for architecture cleanup, contract typing, lifecycle and dependency refactoring; not for routine formatting or unrelated feature work."
license: "MIT"
metadata:
  author: "Andrii Marchenko"
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

Report the outcome, significant findings with locations and status, sources supporting important conclusions, actual checks performed, and remaining limitations. Do not present passing tests as proof of perfect architecture or full compliance with all documentation.
