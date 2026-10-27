# React refactoring demo

A small React/TypeScript notifications application with a historical Before component and an After implementation. It runs locally with a deterministic fake transport; no backend, credentials, or external API is needed. It was created for this repository, not extracted from a production customer application.

## Run and verify

Use Node.js 24.15+ on the 24.x line (used in CI), 22.22.2+ on the 22.x line, or 26+. These match the locked tooling's engine requirements. From the repository root:

```sh
cd examples/react-demo
npm ci
npm run check
npm run dev
```

Open the local URL printed by Vite. Switch quickly from Engineering to Design to exercise overlapping requests. Invalid response and Offline exercise error rendering. The fake transport intentionally ignores abort, so stale-work protection is still necessary. Stop the server with Ctrl+C.

| Command | Meaning |
| --- | --- |
| `npm test` | After: 12 component behavior checks and 6 decoder checks must pass. |
| `npm run test:before` | The same 12 component checks against Before, plus 6 standalone decoder checks against the canonical decoder. Six component regressions intentionally fail; exits nonzero. |
| `npm run verify:baseline` | Runs only the 12 shared component checks against Before and requires exactly the six named failures and six passes. Unexpected failures, missing tests, or runner errors fail verification. |
| `npm run typecheck` | Type-check application, historical fixture, tests, and tool configuration. |
| `npm run build` | Type-check, bundle After, and reject historical fixtures anywhere in the production module graph. |
| `npm run check` | After tests, baseline verification, type-check, and production build. |

The Before implementation intentionally type-checks despite its runtime defects. Static types and passing happy-path tests do not prove safe lifecycle handling.

## Contract and authorized behavior changes

The public component accepts `{ roomId: string, load: LoadNotifications }`. The transport contract is `(roomId: string, signal: AbortSignal) => Promise<unknown>`. Valid wire records are `{ id: string, text: string, unread: boolean }`; string identifiers must retain their precision. Preserve loading, empty-list, unread-count, successful rendering, and current-request error behavior.

The exercise explicitly authorizes these defect fixes: reject malformed records, ignore results/errors from retired requests, abort on room changes/unmount, and support StrictMode's setup/cleanup/setup cycle. Reject the whole payload if any record is invalid. Do not silently turn invalid data into an empty successful response.

## Repeat the skill evaluation

Use a disposable copy so that fixtures and the reference solution stay intact. From this directory, run:

```sh
demo_trial="$(mktemp -d "${TMPDIR:-/tmp}/refactor-react-demo.XXXXXX")"
mkdir -p "$demo_trial/project"
cp package.json package-lock.json tsconfig.json index.html vite.config.ts vitest.config.ts "$demo_trial/project/"
cp -R src fixtures tests scripts "$demo_trial/project/"
cp fixtures/before/notifications/*.ts* "$demo_trial/project/src/notifications/"
```

In the copied `src/notifications/Notifications.tsx`, `notificationAdapter.ts`, and `legacyClient.ts`, change the type-only import `../../../src/notifications/notification` to `./notification`. Keep the canonical `notification.ts` contract and decoder in place. Install with `npm ci` inside `$demo_trial/project`; `npm test` should expose the six known component failures before refactoring. The copied fixture remains unchanged for baseline verification.

Open that project in an agent with the installed skill and use:

```text
$source-driven-refactor
Audit and refactor src/notifications, including affected callers.
Preserve Notifications({ roomId, load }), valid wire data, string IDs,
loading/empty/unread-count behavior, and current-request errors.
Fix malformed-data acceptance, stale results/errors, request cancellation,
and StrictMode cleanup. Remove obsolete paths and adapters after checking
callers, entry points, scripts, and import side effects. Keep fixtures as
historical evidence outside the production graph. Run npm run check and
report sources, findings, cleanup evidence, and remaining limitations.
```

Compare the resulting behavior and ownership boundaries with `src/notifications` in this repository. Identical filenames, wording, or file counts are not acceptance criteria. `npm run check` is necessary; review caller migration and retained code separately.

## Expected findings

| Fact in Before | Consequence | Expected change / supporting source |
| --- | --- | --- |
| The Effect has no cleanup; `notificationAdapter` allocates an inaccessible controller. | Room changes/unmount leave old work active; StrictMode setup cannot be undone. | Effect owns the controller and symmetric cleanup. [React useEffect](https://react.dev/reference/react/useEffect#connecting-to-an-external-system). |
| Both promise branches update state unconditionally. | A late response or error can overwrite a new room. | Guard retired callbacks even when abort is ignored. [Fetching with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects). |
| `payload as Notification[]` bypasses runtime validation. | Malformed identifiers/flags reach rendering. | Narrow `unknown` and validate each record. [TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). |
| `unread` is stored separately and synchronized with another Effect. | Redundant state needs another update and can drift. | Derive it during rendering. [React redundant state](https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state). |
| Loading, error, and data are independent state fields. | The model permits contradictory states. | Use an explicit state union; this is a local design choice informed by [discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions). |
| `legacyClient` duplicates a superseded loading path and unchecked response typing; there are no callers or import side effects. | Keeping it would leave a redundant implementation available for reuse. | Remove it from application source after tracing entry points and callers; this is a repository-specific cleanup decision. |

## Validation record

Maintainer validation for v1.0.0 applies the repository's skill instructions to this executable demo. It is a manual application of the workflow, not an independent agent benchmark or production validation.

| Check | Observed result |
| --- | --- |
| Same component contract against Before | 6 pass, 6 expected regressions fail. |
| After component checks | 12 pass. |
| Decoder checks | 6 pass, including malformed records and large string IDs. |
| TypeScript | Before, After, tests, and config type-check. |
| Production build | Application bundles; fixture graph guard passes. |
| Production guard negative check | A deliberate side-effect import of `fixtures/before/notifications/legacyClient` causes the build to fail, even though the module has no runtime side effects. |
| Clean installation | `npm ci` and the full Before-to-After scenario pass in a disposable copy. |
| Skill metadata | `skill-creator/scripts/quick_validate.py` passes. |

Cleanup review: `index.html` enters `src/main.tsx`, which imports the After `Notifications`; it calls `load` directly and owns its controller. No application import, dynamic loader, registry, package export, or startup script refers to `notificationAdapter` or `legacyClient`. They exist only under `fixtures/before`, which the test alias selects explicitly. The unused historical client has no top-level side effects. The build guard examines resolved module IDs, including modules that might otherwise be tree-shaken. The keyed component is retained because it owns the room's state lifetime; it is not a forwarding adapter without a responsibility.

Search evidence can be reproduced from this directory:

```sh
rg -n 'notificationAdapter|legacyClient|fixtures/before' src index.html package.json vite.config.ts vitest.config.ts fixtures
npm run check
```

Limits: the fake transport and jsdom tests do not validate a real HTTP server, browser networking, another repository's dynamic loading conventions, or every possible refactor. No lint command is configured. CI repeats these checks on Linux; local validation alone does not establish that CI has passed.
