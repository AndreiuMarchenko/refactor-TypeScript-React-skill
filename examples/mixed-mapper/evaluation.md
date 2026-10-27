# Mixed-mapper evaluation record

The original fixture passes all 18 behavior checks and TypeScript checking. Its architecture is intentionally incomplete: the mapper owns independently changing presentation policies, and formatting helpers mutate caches transitively.

## Baseline responsibility map

| ID and original locations | Logical group and reason to change | Inputs → outputs | Dependencies and transitive effects |
| --- | --- | --- | --- |
| MM-TEXT: `mapMessage.ts`, `textHelpers.ts` | Whitespace and clipping rules; text presentation requirements | Message text and preview budget → normalized clipped preview | `formatMessageText` calls `clipAndRemember`, which writes `cache.previews`. |
| MM-MEDIA: `mapMessage.ts` | Thumbnail precedence and field-presence policy; media rendering requirements | Optional/null/undefined media collection → absent/undefined/null/URL thumbnail | Pure policy embedded in the same mapper as unrelated text and notification rules. |
| MM-USER: `authorHelpers.ts` | Current user label and fallback; identity display requirements | Author ID and current user records → trimmed label or fallback | `formatAuthor` calls `resolveLabel`, which writes `cache.authorLabels`. |
| MM-NOTIFY: `mapMessage.ts` | Notification overrides and preview visibility; user preference requirements | Per-message overrides and global preferences → notify/visible-preview values | Nullish precedence and explicit false values; no direct writes, but hidden-preview requests still reach the text cache. |
| MM-CACHE: `textHelpers.ts`, `authorHelpers.ts` | Cache synchronization and partial-failure semantics; state ownership requirements | Message/author IDs and computed text/label → updated cache state | Mutation is hidden below formatting helpers; preview write precedes author write. |
| MM-COMPOSE: `presentMessage.ts`, `mapMessage.ts` | Public message-card assembly; consumer contract changes | Message and context → card plus required cache updates | Public consumer delegates to the mixed implementation; composition and policy are coupled. |

The baseline source/configuration manifest has SHA-256 `459375e612726e201697fbac58dc6c5b9b180ccb288105b28afc820fe876550b`. It hashes sorted path/content-hash records for `src/**/*.ts`, `tests/**/*.ts`, `package.json`, `package-lock.json`, and `tsconfig.json`, excluding dependencies and reports.

## Independent run

Run date: 2026-10-27. Environment: Node.js 24.16.0 and npm 11.13.0. One fresh agent received an isolated project, a copied skill package, and the maintainability task in the evaluation guide. It did not receive the grading rubric, expected owner map, proposed solution, or parent conversation. Existing tests and dependency configuration were read-only.

The evaluated skill package manifest has SHA-256 `d129201a740c24079ce58702b11e439a37a796a816e9c69fd4282cbdf76c0b84`. After that snapshot, the repository made two equivalent completion clarifications: the execution step now explicitly conditions minimality on closing all mapped findings, and the shared completion template has separate behavior/architecture frontmatter fields. The package was validated and the observed implementation was reviewed against those criteria; this single forward run applies to the recorded snapshot. Later explicit rules for object/function selection, helper disposition, public relays, and construction/parsing consistency were not independently forward-tested by this run.

## Reviewed structural result

The generated implementation remains outside this repository's input fixture. The maintainer inspected all final source bodies, imports, reports, and verification tooling independently of the agent's completion claim.

| Original finding | Observed final owner in the isolated output | Maintainer verdict |
| --- | --- | --- |
| MM-TEXT | `textPreview.ts` owns normalization and clipping; no imports or cache access. | Closed: related text rules stay together, independently of media/preferences. |
| MM-MEDIA | `thumbnail.ts` owns selection and own-field presence; only canonical type imports. | Closed: coordinator assembles its result without reimplementing media policy. |
| MM-USER | `authorLabel.ts` resolves the current user label through the read-only user contract; no cache access. | Closed: display/fallback policy is separate from cache mutation. |
| MM-NOTIFY | `notificationPreferences.ts` resolves nullish overrides through narrow contract slices. | Closed: preference rules are separate from clipping and media selection. |
| MM-CACHE | `presentMessage.ts` explicitly writes the preview cache before author lookup/write. | Closed: required mutations, ordering, error propagation, and partial state are visible at the composition boundary. |
| MM-COMPOSE | Public `presentMessage` composes the four policy owners and owns ordered cache refreshes; the required index export remains. | Closed: composition has a concrete responsibility and no embedded independent policy algorithms. |

The old `mapMessage.ts`, `textHelpers.ts`, and `authorHelpers.ts` are physically absent from the evaluated production source. The maintainer checked that original tests, contracts, public index, package files, lockfile, and TypeScript configuration were unchanged. There is no fallback execution path or copied legacy body in the final source. The raw mixed implementation remains here only as the explicit input for future evaluations.

## Verification and separate verdicts

| Assessment/check | Observed result |
| --- | --- |
| Original fixture `npm ci` and `npm run check` | Exit 0: 18 behavior checks and TypeScript checking. |
| Isolated final project, independently reinstalled with `npm ci`, then `npm run check` | Exit 0: the same 18 checks and TypeScript checking. |
| Public-output, own-key, and final-cache comparison | 161,280 cases; identical aggregate digest `b654a86baa4101132c43c996963ae3404add9cad45151e546fcd0331f20c04fa`. |
| Ordered-effect comparison | Six scenarios: normal completion and failures at preview write, user lookup, author write, preference access, and media access. Returned data, original error identity, and partial/final cache state match. |
| Behavior verdict | Verified for the executed scenarios; no behavior change was authorized or observed. |
| Architecture verdict | Verified for this fixture by responsibility-map reconciliation, final-body/import inspection, explicit effect ownership, and removal review. This verdict is independent of the test count. |

The comparison tool is `docs/migrations/message-presentation/verify-preservation.mjs` in the isolated output. The maintainer reviewed it, reran its `baseline` mode against a fresh copy of the original source, and reran its comparison against the final source. An initial diagnostic JSON-serialization mismatch in that tool was corrected during the agent run; the maintainer's replays confirmed the corrected tool observes identical original/final results.

The reviewed final source/configuration manifest has SHA-256 `e9001a4aea4c00e39f1d1a031c75c5ee7a447a2049ccfc8da86a7b49fd8aa7e0`, using the same path/content-hash method as the baseline above. The retained source patch has SHA-256 `f275c03d24c78b7126ec9386e2529c48d7e356c58e0bd7e858cf5f08e0adc70c`.

## Evidence retention and limits

The disposable evaluation directory is named `mixed-mapper-forward-test-avjejbb9` under the execution environment's temporary directory. It contains the evaluated skill, original/final manifests, source patch, generated module/shared reports, comparison tool and observations, and maintainer replay logs. These generated artifacts were kept outside the repository to avoid turning a reference solution into future evaluator input. Temporary artifacts are local review evidence, not durable release attachments; repeat the documented procedure to obtain a fresh run.

This is one independent run on a small synthetic project, not a reliability benchmark or proof that every future refactor will close its architectural findings. The finite corpus includes extra observations for unusual numeric budgets without expanding the fixture's documented public contract. CI checks the original fixture's behavior and types; it does not automate SRP grading. No production migration or runtime performance improvement is claimed.
