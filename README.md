# Logistics CRM

Angular 16 application with standalone screens and route-level lazy loading.

## Local setup

Use Node.js 18. Angular 16 predates Node.js 24; pin an Angular-supported Node version for reproducible builds, or plan an Angular upgrade before adopting a newer Node release.

```sh
npm ci
npm start
```

Open http://localhost:4200. The local backend defaults to http://localhost:4000 in `src/environments/environment.development.ts`.

## Configuration

- Development uses `environment.development.ts` through Angular file replacement.
- Production uses `environment.ts`. Set its `baseUrl` to the deployed backend before publishing. The existing localhost value is retained for local use.
- All API services derive their endpoint prefix from `environment.baseUrl`.
- Never store secrets in environment files: Angular includes these values in the browser bundle.
- Configure hosting to serve `index.html` for application routes, including direct links to report and print URLs.

## Validation and builds

```sh
npm run typecheck
npm run build:dev
npm run build
npm run build:stats
npm run test:ci
```

Chrome or Chromium is needed for headless tests. Set `CHROME_BIN` when it is not automatically found. PowerShell installations that block npm.ps1 can run `npm.cmd` instead.

## Loading and performance

Routes in `src/app/app-routing.module.ts` use `loadComponent`, loading each screen when visited. Shared standalone components are imported by their consumers. Keep new screens out of AppModule and add explicit component imports for template dependencies. Production enables AOT, script/style optimization, hashed output, license extraction, and disables source maps. Font inlining is disabled so production builds do not need to download Google Fonts.

jQuery and Select2 load once through angular.json. SlimSelect, Choices, Bootstrap, Font Awesome, and fonts still use external resources and need network access at runtime.

See CODE_REVIEW.md for review findings and remaining work.
