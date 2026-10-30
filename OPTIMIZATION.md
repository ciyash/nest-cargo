# Optimization pass — 2026-10-30

- Changed XLSX runtime imports in 40 Branch, SubAdmin, and employee components to dynamic imports inside export methods. Workbook types remain type-only imports. The first export includes the library download time; workbook generation and filenames are preserved.
- Dashboard sales and shipment totals are computed once per successful response and reset on reload, avoiding repeated report scans during Angular change detection. Sales mix options use a stable array.
- Dashboard pagination appends rows to one accumulator, avoiding repeated copies of previous pages. Non-advancing pagination uses the existing error UI.
- Added dashboard HTTP tests for multi-page totals, failed reloads, non-advancing pagination, and cancellation on destroy.

Existing uncommitted work was preserved. Live backend workflows and downloaded Excel files still require browser regression verification. These changes optimize report loading and dashboard calculations; they do not constitute a complete audit of every business workflow.

Validation:
- Application TypeScript check: passed.
- Test TypeScript check: passed.
- Four focused dashboard tests: passed in ChromeHeadless outside the sandbox.
- Production compilation: completed; build fails on the existing dashboard stylesheet size (5.24 kB versus the configured 4 kB component style limit). Existing style warnings and file-saver CommonJS warning remain.
- The standard output folder had an existing permission problem; verification used fresh dist output directories.
- Excel scope: removed eager XLSX imports from 40 components; 39 have export methods with dynamic imports and one had an unused XLSX import.
- Development build: passed using tmp/optimization-build. XLSX is a separate on-demand chunk (973.50 kB unminified development output). Initial development output is 2.86 MB; no like-for-like pre-change measurement was taken in this pass.
