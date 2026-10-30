# Code review and setup changes

## Implemented

- Converted 111 screens and shared components to standalone components with explicit template dependencies. Route screens load with `loadComponent`; AppModule only bootstraps the application and root providers.
- Removed six unreachable duplicate route entries while retaining the first matching route and existing URLs. Unknown URLs redirect to login.
- Corrected development/production flags and made all three API services derive URLs from environment configuration. Existing service edits and the configured localhost endpoint were retained.
- Fixed the company guard's redirect loop and used router URL trees for authentication redirects. Removed token logging and limited logout storage removal to the application's own authentication keys.
- Removed duplicate CDN copies of jQuery and Select2. Kept the angular.json copies and deferred the remaining external scripts.
- Made production optimization explicit and tightened the initial bundle budget to 1 MB warning / 1500 kB error. Repaired test styles referencing missing files, migrated component test declarations to standalone imports, and corrected the obsolete root-component assertion.
- Added commands for type checking, development builds, bundle statistics, and headless testing. Added behavioral tests for authentication and role checks.

## Validation

- The original development build passed with 11.62 MB initial JavaScript/CSS.
- The optimized production build passed with 637.30 kB initial output (169.55 kB estimated transfer). These development and production numbers use different optimization settings and should not be treated as a like-for-like reduction.
- The final development build passed with 2.85 MB initial output, about 75% smaller than the original development build. The final TypeScript check passed after the API configuration changes.
- Production retains warnings for five existing component styles exceeding the 2 kB warning threshold, and file-saver's CommonJS format. The 4 kB style error threshold remains enforced.
- All eight focused tests passed in ChromeHeadless (root rendering plus authentication and role guards). Chrome could not start in the sandbox; the approved unrestricted rerun passed.

## Remaining findings

1. Deployment configuration: production still uses localhost because the intended backend URL was not supplied. Set environment.ts before deployment and configure SPA fallback on the host.
2. Framework/runtime maintenance: Angular 16 is legacy and the installed Node 24 is outside its original supported runtime matrix. The .nvmrc records the legacy Node 18 runtime; plan a coordinated framework/dependency upgrade to a maintained runtime. Do not treat that legacy pin as a long-term production support solution.
3. Authorization: createbranch carries admin metadata but its separate company guard checks authentication only. Company login does not save a user role. This needs a confirmed company/admin authorization contract before changing access semantics. Backend endpoints must independently enforce permissions.
4. Token validation: isLogged checks token presence only. Expiry, refresh handling, and API 401 handling need a coordinated backend/session policy. Tokens remain in localStorage.
5. External resources: SlimSelect, Choices, Bootstrap, Font Awesome, and Google Fonts still require external network access. There are two Font Awesome versions; consolidate after checking icon compatibility.
6. Component design: many components use any, imperative subscriptions, direct DOM integrations, and console logging of business data. Review these screen by screen with backend fixtures before applying OnPush, caching, or subscription rewrites across the application.
7. Dependencies: review unused packages and peer compatibility before pruning or upgrading. No dependency upgrades or lockfile changes were made in this refactor.
8. Verification scope: this review covers repository setup, routing, shared dependencies, API configuration, and authentication guards. Live booking, printing, scanning, exports, and all role-specific workflows still need browser/backend regression testing. The generated component specs are smoke tests and are not a complete business regression suite.

