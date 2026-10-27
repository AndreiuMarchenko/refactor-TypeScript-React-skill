import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// A failing baseline is intentional; verify the exact failures instead of swallowing any exit code.
const expected = [
  'rejects invalid wire data',
  'ignores a late success after a room change',
  'ignores a late error after a room change',
  'aborts the previous request on a room change',
  'aborts the request on unmount',
  'cleans up StrictMode setup without cancelling its replacement',
].map((name) => `Notifications contract ${name}`).sort();
const temporary = mkdtempSync(join(tmpdir(), 'refactor-baseline-'));
let run;
let report;
try {
  const output = join(temporary, 'report.json');
  run = spawnSync(process.execPath, [
    'node_modules/vitest/vitest.mjs', 'run', 'tests/notifications.test.tsx',
    '--reporter=json', `--outputFile=${output}`,
  ], { env: { ...process.env, DEMO_STAGE: 'before' }, encoding: 'utf8', timeout: 30000 });
  if (run.error) throw run.error;
  try { report = JSON.parse(readFileSync(output, 'utf8')); }
  catch { throw new Error(`Baseline did not produce a test report: ${run.stdout}\n${run.stderr}`); }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
const failures = report.testResults.flatMap((suite) => suite.assertionResults)
  .filter((test) => test.status === 'failed').map((test) => test.fullName).sort();
if (run.status !== 1 || report.numTotalTests !== 12 || report.numPassedTests !== 6 ||
    report.testResults.length !== 1 || report.testResults.some((suite) => suite.message) ||
    JSON.stringify(failures) !== JSON.stringify(expected)) {
  throw new Error(`Unexpected baseline result (${run.status}): ${report.numPassedTests}/${report.numTotalTests} passed; failures: ${JSON.stringify(failures)}`);
}
console.log('Before: 6 preserved behavior checks pass; all 6 expected regression checks fail.');
