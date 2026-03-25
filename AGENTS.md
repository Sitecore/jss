# AGENTS.md — AI Guidance for Sitecore JavaScript Services (JSS)

## Project Overview

This repository is **Sitecore JavaScript Services (JSS)** — a TypeScript monorepo of SDK packages, scaffolding CLI, and samples for building applications with Sitecore XM Cloud and on-premises. AI agents work as developer assistants to implement features, fix bugs, add tests, and maintain templates.

**Main tasks:** Generate JSS SDK code, perform safe edits in packages and templates, update tests. Do not modify global config (CI, root tooling) without explicit instruction.

---

## Quick Commands

```bash
yarn install              # From repo root — installs all workspaces
yarn build                # Build all packages
yarn lint-packages        # Lint packages
yarn lint-samples         # Lint samples (scaffolded apps under samples/)
yarn test-packages        # Run tests
yarn coverage-packages   # Coverage report
yarn generate-docs       # Generate API docs (typedoc)
yarn scaffold-samples    # Generate samples (uses scripts/samples.json)
yarn install-git-hooks    # Pre-push hook that runs lint-packages
yarn reset                # Clean, reinstall, rebuild
```

**Per-package:** `cd packages/<name>` then `yarn build`, `yarn lint`, `yarn test`.

**Package manager:** Yarn 4.12.0. Workspaces: `packages/*`, `samples/*`.

---

## Repository Structure

```
jss/
├── packages/
│   ├── sitecore-jss/                  # Core JSS — layout, GraphQL, i18n, tracking, editing
│   ├── sitecore-jss-react/            # React components (Text, Image, Link, etc.)
│   ├── sitecore-jss-nextjs/            # Next.js integration, middleware, editing
│   ├── sitecore-jss-angular/           # Angular integration
│   ├── sitecore-jss-angular-schematics/# Angular component generators
│   ├── sitecore-jss-vue/               # Vue integration
│   ├── sitecore-jss-react-native/      # React Native support
│   ├── sitecore-jss-cli/               # CLI (jss deploy, jss setup, etc.)
│   ├── sitecore-jss-forms/             # Forms
│   ├── sitecore-jss-react-forms/      # React forms
│   ├── sitecore-jss-proxy/            # Proxy / rendering host
│   ├── sitecore-jss-rendering-host/   # Rendering host
│   ├── sitecore-jss-dev-tools/        # Developer tooling
│   └── create-sitecore-jss/            # Scaffolding CLI + templates
├── samples/                            # Example applications (generated from templates)
├── scripts/                            # Monorepo scripts (scaffold, lint, hooks)
│   ├── scaffold-samples.js
│   ├── lint-samples.js
│   ├── samples.json
│   └── install-hooks.js
└── ref-docs/                           # Generated API docs (yarn generate-docs)
```

**Key locations:**
- **Sources:** `src/**` in each package
- **Templates:** `packages/create-sitecore-jss/src/templates/` — nextjs, angular, vue, react, nextjs-styleguide, nextjs-sxa, nextjs-xmcloud, etc.
- **Initializers:** `packages/create-sitecore-jss/src/initializers/` — drive scaffolding via `initRunner(initializers, args)`
- **Common processes:** `packages/create-sitecore-jss/src/common/` — transform, install, lint utilities
- **Environment variables:** Templates use `.env` files (e.g. `templates/nextjs/.env`) with EJS tokens; never commit `.env` or `.env.local` in samples

### Which package to edit?

| Task | Package |
|------|---------|
| GraphQL, layout service, i18n, tracking, editing | `packages/sitecore-jss` |
| React components (Text, Image, Link, etc.) | `packages/sitecore-jss-react` |
| Next.js integration, middleware, editing | `packages/sitecore-jss-nextjs` |
| Angular integration | `packages/sitecore-jss-angular` |
| Vue integration | `packages/sitecore-jss-vue` |
| CLI tooling (jss deploy, setup) | `packages/sitecore-jss-cli` |
| Scaffolding, templates, init flow | `packages/create-sitecore-jss` |
| Forms | `packages/sitecore-jss-forms`, `sitecore-jss-react-forms` |
| Proxy, rendering host | `packages/sitecore-jss-proxy`, `sitecore-jss-rendering-host` |

### Working with samples

- **Generate samples:** `yarn scaffold-samples` (uses `scripts/samples.json`)
- **Develop templates live:** Copy `packages/create-sitecore-jss/watch.json.example` → `watch.json`, set `destination` under `samples/` (e.g. `../../samples/<app-name>`), run `yarn watch` from `packages/create-sitecore-jss`
- **Lint samples:** `yarn lint-samples` (scaffolded apps)

---

## Testing

- **Run:** `yarn test-packages` (root) or `yarn test` in a package
- **Coverage:** `yarn coverage-packages`
- Update tests when changing behavior; ensure they pass before completing
- See `CLAUDE.md` for testing stack and patterns

---

## DO & DON'T Rules

| DO | DON'T |
|----|-------|
| Use existing utilities and common code | Edit `dist/**` or other build output |
| Follow patterns in templates and packages | Change env vars or commit `.env` files |
| Ensure template edits build with `npm install && npm run build` | Add dependencies without explicit approval |
| Drive scaffolding via `initRunner(initializers, args)` | Modify `yarn.lock` / `package-lock.json` unless required |
| Reuse common processes (see `src/common/`) | Rewrite folder structure or move files arbitrarily |
| Run `yarn build` after template changes | Touch CI or global config without explicit instruction |

---

## Boundaries

**Never edit:**
- `dist/**`, `.next/`, `out/`, `build/` — compiled output
- `node_modules/`
- `yarn.lock`, `package-lock.json` — unless explicitly required
- `.env`, `.env.local` — use template `.env` patterns only

**Never edit without explicit instruction:**
- `.github/workflows/` — CI configuration
- Root tooling (scripts, lerna config) — unless tasked

**Focus on:**
- `src/**` in packages
- `packages/create-sitecore-jss/src/templates/**`
- `*.test.ts`, `*.spec.ts`

---

## Example Agent Tasks

### 1. Add a utility in a package
- Edit under `packages/<name>/src/`, export from `index.ts` if public
- Follow code style in `CLAUDE.md` (JSDoc, naming, etc.)
- Add tests if needed

### 2. Fix a failing test
```bash
yarn test-packages
# Or: cd packages/sitecore-jss && yarn test
```
- Locate the failing `*.test.ts`, fix assertions or implementation
- Re-run tests before completing

### 3. Change a scaffolding template
- Edit under `packages/create-sitecore-jss/src/templates/` (e.g. `nextjs/`, `angular/`, `vue/`)
- Use `.env` with EJS tokens for env vars (never commit real `.env` in samples)
- Verify: `yarn watch` (with `watch.json`) or `yarn scaffold-samples`, then `npm install && npm run build` in generated sample

---

## Git Workflow

- **Development branch:** `dev` (main development branch)
- **Create feature branch:** `git switch -c feature/my-jss-feature`
- **PR target:** Open Pull Requests against `dev` (not `master`)
- **CI:** Lint and tests must pass before merge
- See `CONTRIBUTING.md` for full workflow

---

## Reference Docs

| Doc | Use for |
|-----|---------|
| **`CLAUDE.md`** | Code style, naming, JSS patterns, Sitecore integration, safety rules |
| **`CONTRIBUTING.md`** | Workflow, branching, PR process, linting setup |

---

## Links

- [Sitecore JSS Documentation](https://jss.sitecore.com/docs)
- [Creating a JSS App for XM Cloud](https://doc.sitecore.com/xmc/en/developers/content-sdk/creating-a-jss-app-for-xm-cloud.html)
- [XM Cloud Documentation](https://doc.sitecore.com/xmc)

---

**Remember:** For code patterns and style → `CLAUDE.md`. For workflow and process → `CONTRIBUTING.md`.
