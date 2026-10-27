# Sources for Engineering Decisions

This is an index, not a substitute for documentation. Identify the concrete problem first, then read only sections that support a relevant decision or verification step. Do not introduce patterns or dependencies merely because they appear here.

| Source | When to Read and What to Check |
| --- | --- |
| Robert C. Martin: [Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) | Module boundaries, cohesion, and related reasons to change. This is the author's explanation of the principle. |
| Robert C. Martin: [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) | Dependency direction and separation of policy from mechanisms. It does not require identical layers for every module. |
| React: [Thinking in React](https://react.dev/learn/thinking-in-react) | Component boundaries, data flow, and finding the minimal state and its owner. Compare the component hierarchy with the UI's responsibilities; verify affected interactions rather than extract components by line count. |
| React: [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) | Coordinated components and controlled/uncontrolled boundaries. Identify the source of truth and whether state belongs in a common parent; verify synchronization and preserve intentional independent state. |
| React: [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) | Repeated React-specific stateful logic and subscription wiring. Extract a Hook for a cohesive purpose, preserving dependencies and cleanup. Hooks share logic, not a single state instance; verify independence or explicit shared-store ownership as intended. |
| React: [Components and Hooks must be pure](https://react.dev/reference/rules/components-and-hooks-must-be-pure) | Render-time side effects, mutation, or dependence on changing external values. Check idempotent rendering, immutable props/state, and ownership of mutations. Move effects to the appropriate event or synchronization boundary and verify behavior under repeated rendering. |
| React: [useEffect](https://react.dev/reference/react/useEffect) | External systems, dependencies, setup/cleanup. The official API contract. |
| React: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) | Repeated setup/cleanup and management of unfinished work. |
| React: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) | Derived values, redundant state, and whether synchronization needs an Effect. |
| React: [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state) | Component extraction, tree restructuring, keys, and conditional rendering. Check identity through position, type, and key; verify intended preservation/reset of forms, tabs, and local state across the changed tree. |
| React: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure) | Duplicated derived values, coupled flags, and contradictory states. Choose a minimal consistent model and verify affected transitions and rendered outcomes. |
| React: [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) | Related transitions scattered across handlers. Compare a pure reducer with existing state ownership; adopt it only when it simplifies the actual transitions. Verify action sequences and consumer-visible results; trivial state does not require a reducer. |
| React: [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) | External mutable state, shared subscriptions, and browser-state snapshots. Check stable immutable snapshots, unsubscribe, subscription identity, and server snapshots when SSR applies. Reuse a suitable existing store adapter; test initial state and updates around subscription/replacement. A socket alone does not require a store. |
| TypeScript: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) | Evaluate invariant-owning values and stateful domain/transport objects, construction, visibility, and instance contracts. Compare concrete ownership benefits with functions; static wrapper collections do not establish encapsulation. Language documentation does not mandate OOP or class-based React state management. |
| TypeScript: [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) | Module entry points, imports/exports, type-only imports, resolution, and evaluation effects. Trace consumers before removing a re-export path. Whether an entry point is a useful public boundary or a redundant relay is a project-specific architectural decision. |
| TypeScript: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | Guards, input validation, discriminated unions, and exhaustive handling. |
| typescript-eslint: [no-unsafe-assignment](https://typescript-eslint.io/rules/no-unsafe-assignment/) | API clients, DTOs, and unsafe `any` propagation across boundaries. The rule requires type-aware linting. Use applicable existing tooling and verify runtime validation separately; assertions and a clean lint result do not establish payload validity. |
| Testing Library: [Guiding Principles](https://testing-library.com/docs/guiding-principles/) | Behavior-preserving component extraction, hook consolidation, and legacy UI removal. Test DOM interactions and user-visible outcomes rather than component instances or internal helper structure; preserve affected accessible interactions. |
| Playwright: [Best Practices](https://playwright.dev/docs/best-practices) | Routing, forms, and interactive user flows when Playwright is installed or an E2E strategy is being evaluated. Check test isolation, resilient user-facing locators, and web-first assertions. Verify completed flows rather than fixed delays or internal calls. |
| esbuild: [Build API / format](https://esbuild.github.io/api/#format) | A separate browser/worker entry point and bundle/IIFE. Read only when the task affects this pipeline. |

For a framework, library, or protocol not listed in the table, find its official documentation and check that it matches the installed version. The backend schema or specification defines the wire contract; frontend assumptions do not replace it.

## Performance Sources

Read the relevant entries when investigating a slow scenario or evaluating a measured regression. Follow the [performance optimization workflow](migration-reporting.md#performance-optimization); these sources do not require adding tooling, a compiler, or memoization to every refactor.

| Source | When to Read and What to Check |
| --- | --- |
| React: [Profiler](https://react.dev/reference/react/Profiler) | Expensive React rendering. Record render timings for the affected tree and workload; `baseDuration` is an estimate, not a historical Before measurement. Profiling adds overhead and is disabled in ordinary production builds; compare equivalent profiling configurations. |
| React: [memo](https://react.dev/reference/react/memo) | Measured expensive repeated rendering with unchanged props. Check prop identity, context/state updates, and comparator correctness. Verify actual cost and behavior; fewer renders alone do not establish a faster interaction. |
| React: [useMemo](https://react.dev/reference/react/useMemo) | Measured expensive pure recalculations or values needed by a justified memoized consumer. Check dependencies and cache overhead; correctness must survive recalculation. Compare the same workload before retaining manual memoization. |
| React: [React Compiler introduction](https://react.dev/learn/react-compiler/introduction) | Optimization in a project using the compiler, or an explicitly scoped adoption evaluation. Verify whether it is configured and applies to the affected code before adding manual memoization; a React version alone does not establish compiler coverage. |
| Chrome DevTools: [Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance) | Browser interaction latency, JavaScript execution, long tasks, layout, and paint. Record the actual slow scenario and locate the bottleneck beyond React rendering. Match the procedure to the installed browser and compare equivalent recording conditions. |

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
