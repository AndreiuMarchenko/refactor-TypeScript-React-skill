# Sources for Engineering Decisions

This is an index, not a substitute for documentation. Identify the concrete problem first, then read only sections that support a relevant decision or verification step. Do not introduce patterns or dependencies merely because they appear here.

| Source | When to Read and What to Check |
| --- | --- |
| Robert C. Martin: [Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) | Module boundaries, cohesion, and related reasons to change. This is the author's explanation of the principle. |
| Robert C. Martin: [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) | Dependency direction and separation of policy from mechanisms. It does not require identical layers for every module. |
| React: [useEffect](https://react.dev/reference/react/useEffect) | External systems, dependencies, setup/cleanup. The official API contract. |
| React: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) | Repeated setup/cleanup and management of unfinished work. |
| React: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) | Derived values, redundant state, and whether synchronization needs an Effect. |
| React: [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state) | Component extraction, tree restructuring, keys, and conditional rendering. Check identity through position, type, and key; verify intended preservation/reset of forms, tabs, and local state across the changed tree. |
| React: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure) | Duplicated derived values, coupled flags, and contradictory states. Choose a minimal consistent model and verify affected transitions and rendered outcomes. |
| React: [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) | Related transitions scattered across handlers. Compare a pure reducer with existing state ownership; adopt it only when it simplifies the actual transitions. Verify action sequences and consumer-visible results; trivial state does not require a reducer. |
| React: [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) | External mutable state, shared subscriptions, and browser-state snapshots. Check stable immutable snapshots, unsubscribe, subscription identity, and server snapshots when SSR applies. Reuse a suitable existing store adapter; test initial state and updates around subscription/replacement. A socket alone does not require a store. |
| TypeScript: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) | State, visibility, inheritance, and instance contracts; language documentation does not mandate OOP. |
| TypeScript: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | Guards, input validation, discriminated unions, and exhaustive handling. |
| typescript-eslint: [no-unsafe-assignment](https://typescript-eslint.io/rules/no-unsafe-assignment/) | API clients, DTOs, and unsafe `any` propagation across boundaries. The rule requires type-aware linting. Use applicable existing tooling and verify runtime validation separately; assertions and a clean lint result do not establish payload validity. |
| Testing Library: [Guiding Principles](https://testing-library.com/docs/guiding-principles/) | Behavior-preserving component extraction, hook consolidation, and legacy UI removal. Test DOM interactions and user-visible outcomes rather than component instances or internal helper structure; preserve affected accessible interactions. |
| Playwright: [Best Practices](https://playwright.dev/docs/best-practices) | Routing, forms, and interactive user flows when Playwright is installed or an E2E strategy is being evaluated. Check test isolation, resilient user-facing locators, and web-first assertions. Verify completed flows rather than fixed delays or internal calls. |
| esbuild: [Build API / format](https://esbuild.github.io/api/#format) | A separate browser/worker entry point and bundle/IIFE. Read only when the task affects this pipeline. |

For a framework, library, or protocol not listed in the table, find its official documentation and check that it matches the installed version. The backend schema or specification defines the wire contract; frontend assumptions do not replace it.

## Conditional Pattern References

Read these only when the observed problem warrants comparing the pattern with a simpler function or composition. They describe patterns, not normative React/TypeScript requirements.

| Source | Decision to evaluate |
| --- | --- |
| Refactoring Guru: [Builder](https://refactoring.guru/design-patterns/builder) | Construction genuinely needs stages or coordinated options. Compare with direct construction before adding a Builder. |
| Refactoring Guru: [Template Method](https://refactoring.guru/design-patterns/template-method) | An algorithm has stable shared steps and explicit extension points. Compare inheritance's contract with composition before choosing it. |

## Source Application Rules

- Record the code location and behavior motivating a decision. Prefer official documentation matching installed versions; identify unavailable or inconclusive evidence.
- Evaluate reuse of a suitable existing component, contract, or adapter and a solution without a new abstraction. Verify its responsibilities and behavior; legacy code is integration evidence, not architectural authority.
- Separate documented semantics from engineering interpretation and project-specific tradeoffs. Do not claim a source mandates a file layout, abstraction count, or pattern unless it explicitly does. When documentation does not settle a choice, justify it with inspected project evidence.
- Verify affected behavior before and after structural changes, and remove superseded paths once callers are migrated and removal is verified safe. Reuse the existing migration report for decision evidence instead of creating a parallel reporting document.

## Engineering Decision Record

For each significant architectural or behavioral decision, include the following fields in the audit findings or the module report's Implemented Decisions section. Keep entries concise and link existing cleanup/verification evidence rather than duplicate it. Evidence, Decision, Cleanup, and Verification must be explicit; use a reasoned `not_applicable`, `not_run`, or unresolved status when needed instead of omitting a field or inventing proof. For an audit, distinguish proposed actions/checks from completed work.

| Field | Required content |
| --- | --- |
| Problem | The concrete defect, mixed responsibility, or complexity being addressed and its consequence. |
| Evidence | Files, functions, callers, or execution paths demonstrating it; identify the affected behavior. |
| Source | A direct link to the relevant section actually read and what it supports. Label interpretation or missing/inconclusive source evidence explicitly. |
| Decision | The implemented change, or audit proposal, and why it improves correctness or simplicity; identify affected owners and consumers. |
| Alternatives | Whether an existing implementation can be reused or the problem solved without a new abstraction; explain the chosen tradeoff. |
| Cleanup | Superseded paths, duplicated logic, and adapters removed or still remaining, with status and links to stable cleanup IDs. Explain when no removal applies. |
| Verification | Observable behavior checked before/after, exact tests or runtime checks and actual results, or explicitly unrun checks. Link the verification record and state coverage limits. |
