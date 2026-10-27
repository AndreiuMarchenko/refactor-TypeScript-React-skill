# Sources for Engineering Decisions

This is an index, not a substitute for documentation. Read the sections relevant to the task. Do not load every source for a change that does not involve them.

| Source | When to Read and What to Check |
| --- | --- |
| Robert C. Martin: [Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) | Module boundaries, cohesion, and related reasons to change. This is the author's explanation of the principle. |
| Robert C. Martin: [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) | Dependency direction and separation of policy from mechanisms. It does not require identical layers for every module. |
| React: [useEffect](https://react.dev/reference/react/useEffect) | External systems, dependencies, setup/cleanup. The official API contract. |
| React: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) | Repeated setup/cleanup and management of unfinished work. |
| TypeScript: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) | State, visibility, inheritance, and instance contracts; language documentation does not mandate OOP. |
| TypeScript: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) | Guards, input validation, discriminated unions, and exhaustive handling. |
| Refactoring Guru: [Builder](https://refactoring.guru/design-patterns/builder) | Assessing the need for construction in stages. The catalog explains the pattern; it is not normative React/TypeScript documentation. |
| Refactoring Guru: [Template Method](https://refactoring.guru/design-patterns/template-method) | A shared algorithm and extension points; compare its constraints with composition for the specific task. |
| esbuild: [Build API / format](https://esbuild.github.io/api/#format) | A separate browser/worker entry point and bundle/IIFE. Read only when the task affects this pipeline. |

For a framework, library, or protocol not listed in the table, find its official documentation and check that it matches the installed version. The backend schema or specification defines the wire contract; frontend assumptions do not replace it.

Support important conclusions with a direct link to the section you read and a fact in the code. Label your own interpretation: the choice of file count, composition, type placement, or pattern is usually an engineering decision rather than a literal requirement from a source.
