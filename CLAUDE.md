# Claude Code Agent Guide for Sitecore JavaScript Services (JSS)

## Project Overview

This is **Sitecore JavaScript Services (JSS)** — a TypeScript/JavaScript SDK for building modern web applications with Sitecore XM Cloud and on-premises. The project provides core layout/GraphQL functionality, React/Angular/Vue/Next.js integrations, and CLI tools for scaffolding applications.

### Tech Stack
- **Language**: TypeScript (Node LTS)
- **Runtime**: Node LTS (>=24)
- **Build**: `tsc` → `dist/`, templates built via `scripts/build-templates.ts` in create-sitecore-jss
- **Testing**: Mocha + Sinon + Chai, coverage via `nyc`
- **Lint/format**: ESLint + Prettier
- **Package Manager**: Yarn 4.12.0

### Core Packages
- `@sitecore-jss/sitecore-jss` - Core SDK (layout, GraphQL, i18n, tracking, editing)
- `@sitecore-jss/sitecore-jss-react` - React components (Text, Image, Link, Placeholder)
- `@sitecore-jss/sitecore-jss-nextjs` - Next.js integration and middleware
- `@sitecore-jss/sitecore-jss-angular` - Angular integration
- `@sitecore-jss/sitecore-jss-vue` - Vue integration
- `@sitecore-jss/sitecore-jss-cli` - CLI (jss deploy, jss setup)
- `create-sitecore-jss` - Scaffolding CLI and templates

## Repository Structure

```
jss/
├── packages/
│   ├── create-sitecore-jss/    # Scaffolding CLI & templates
│   ├── sitecore-jss/           # Core SDK (layout, GraphQL, i18n, tracking)
│   ├── sitecore-jss-react/     # React components
│   ├── sitecore-jss-nextjs/    # Next.js integration
│   ├── sitecore-jss-angular/   # Angular integration
│   ├── sitecore-jss-vue/      # Vue integration
│   ├── sitecore-jss-cli/      # CLI tools
│   ├── sitecore-jss-forms/    # Forms
│   ├── sitecore-jss-proxy/    # Proxy / rendering host
│   └── ...                     # Other packages
├── samples/                    # Example applications (generated)
├── scripts/                    # scaffold-samples.js, lint-samples.js, samples.json
└── ref-docs/                   # Generated API docs (yarn generate-docs)
```

### Key Directories
- **Sources**: `src/**` in each package
- **Never edit**: `dist/**` (compiled output)
- **Templates**: `packages/create-sitecore-jss/src/templates/` — nextjs, angular, vue, react, etc. Use `.env` with EJS tokens for env values
- **Initializers**: `packages/create-sitecore-jss/src/initializers/` — each exposes `init(args)`, driven by `initRunner(initializers, args)`
- **Common processes**: `packages/create-sitecore-jss/src/common/` — transform, install, lint utilities

## Code Style

### Vibe-Coding Principles

Core Philosophy:
- Write clean, modular, idiomatic code
- Prefer declarative over imperative patterns
- Make code readable and self-documenting
- TypeScript-first development approach

Code Organization:
- Use Node LTS
- Export public types at module boundaries
- Prefer pure functions and thin wrappers
- No top-level side effects (except CLI entry)
- Modular architecture with clear separation of concerns

### Code Quality Standards

TypeScript Usage:
- Enable strict mode in all projects
- Prefer explicit types over `any`
- Use discriminated unions for complex state
- Export types at module boundaries for reusability

Functional Programming:
- Prefer pure functions where possible
- Use immutable data patterns
- Avoid side effects in business logic
- Compose small, focused functions

Readability:
- Use descriptive variable and function names
- Keep functions small and focused (single responsibility)
- Add comments for complex business logic only
- Prefer self-documenting code over extensive comments

### Error Handling

Error Strategy:
- Fail fast with clear, actionable messages
- Propagate child-process errors with context
- Use custom error classes for domain-specific errors
- Handle edge cases explicitly with guard clauses

Security:
- Sanitize user inputs
- Validate data at boundaries
- Never log sensitive information
- Use environment variables for configuration

### Development Workflow

Logging:
- Clear phases and results
- Support silent flag if available
- Use appropriate log levels (debug, info, warn, error)
- Include context in error messages

Imports:
- Relative for local modules
- Never import from `dist/`
- Group imports logically (external, internal, relative)
- Use barrel exports (index.ts) for clean APIs

Lint and Format:
- Keep ESLint + Prettier passing at all times
- Follow configured style rules consistently
- Use automated formatting on save
- Address linting warnings promptly

## JavaScript/TypeScript Rules

### Naming Conventions

Variables and Functions:
- Use camelCase: `getLayoutData()`, `isConnected`, `routeData`
- Boolean variables: prefix with `is`, `has`, `can`, `should`
- Event handlers: prefix with `handle` or `on`: `handleClick`, `onSubmit`

Components (React):
- Use PascalCase: `Placeholder`, `Text`, `Image`, `Link`
- File names match component names: `Placeholder.tsx`

Constants:
- Use UPPER_SNAKE_CASE: `JSS_MODE`, `FETCH_WITH`, `GRAPH_QL_ENDPOINT`
- Export at module level when shared

Directories:
- Use kebab-case: `src/components`, `src/lib`, `src/utils`
- Organize by feature when appropriate

Types and Interfaces:
- Use PascalCase with descriptive names: `RouteData`, `ComponentRendering`, `Field`
- Prefix interfaces with `I` only when needed for disambiguation

### Code Layout and Organization

Directory Structure:
```
src/
  components/          # UI components (React/Angular/Vue)
  lib/                 # Layout service, GraphQL, config
  utils/               # Helper functions
  layout/              # Layout types (route, placeholders, fields)
  i18n/                # Dictionary service
  editing/             # Editing mode support
```

File Organization:
- Group related functionality in feature directories
- Keep components co-located with their styles and tests
- Export public APIs through index.ts files

### Error Handling

API Calls:
- Always wrap in try/catch blocks
- Throw custom errors with context: `LayoutServiceError`, `GraphQLError`
- Handle edge cases with guard clauses

### Security

Input Validation:
- Sanitize user inputs before processing
- Validate data at application boundaries
- Use type guards for runtime type checking
- Escape content when rendering to prevent XSS

### Performance

Optimization Patterns:
- Memoize components with React.memo when appropriate
- Lazy-load non-critical modules where applicable
- Use useCallback and useMemo for expensive operations

TypeScript:
- Enable strict mode in tsconfig.json
- Prefer type assertions over any: `value as RouteData`
- Use discriminated unions for complex state management

### Documentation

JSDoc Comments:
- All new functions, interfaces, classes must have JSDoc style comments
- Include @param tags for all parameters with types and descriptions
- Include @returns tag for return values with type and description
- Use descriptive comments that explain the purpose and behavior
- Follow existing JSS JSDoc patterns (see CONTRIBUTING.md)

## Sitecore JSS Rules

### XM Cloud / Sitecore Integration

Configuration:
- Use environment variables for API endpoints and keys: `SITECORE_API_KEY`, `SITECORE_API_HOST`, `GRAPH_QL_ENDPOINT`
- Never hardcode API keys in source code
- `scjssconfig.json` is generated by `jss setup` and is git-ignored; use env vars in CI/production
- `package.json` config section holds appName, rootPlaceholders, graphQLEndpointPath, language
- `.env` in templates uses EJS tokens; never commit `.env` or `.env.local` in samples

```typescript
// JSS apps: config comes from package.json + scjssconfig.json + .env
// Example env vars (from templates/nextjs/.env):
// SITECORE_API_KEY, SITECORE_API_HOST, SITECORE_SITE_NAME
// GRAPH_QL_ENDPOINT, FETCH_WITH (REST|GraphQL), DEFAULT_LANGUAGE
// JSS_EDITING_SECRET, DISABLE_SSG_FETCH (for SSG apps)
```

API Client Usage:
- Use HTTPS for Sitecore endpoints
- Implement retry logic for GraphQL/Layout Service (see GRAPH_QL_SERVICE_RETRIES)
- Handle GraphQL errors and Layout Service errors
- Support both REST (Layout Service) and GraphQL fetch modes

### Component Development

JSS Component Naming:
- Use descriptive, feature-based names: `Hero`, `ContentBlock`, `Promo`
- Follow PascalCase convention
- Register in component map with consistent names

Component Registration:
- Register components in the componentFactory
- Use consistent component names across registration and files
- Components receive `rendering` (ComponentRendering) and `fields` from layout data

```typescript
// JSS component props (React)
interface ComponentProps {
  rendering: ComponentRendering;
  fields?: { [name: string]: Field | Item | Item[] };
  params?: { [name: string]: string };
}
```

### Layout and Content

Field Handling:
- Validate field existence before rendering
- Use JSS field components: `<Text field={fields?.title} />`, `<Image field={fields?.image} />`, `<RichText field={fields?.content} />`
- Handle empty/null fields
- Prefer JSS field components over manual rendering

```typescript
// Good: Using JSS field components
<Text field={fields?.title} tag="h1" />
<Image field={fields?.image} />
<RichText field={fields?.content} />

// Avoid: Manual field value extraction unless necessary
```

Data Fetching:
- Use Layout Service (REST) or GraphQL via `sitecore-jss` packages
- Use Dictionary Service for i18n
- Handle disconnected mode (JSS_MODE=disconnected) with proxy
- Use placeholders for dynamic layout (Placeholder component)
- Handle missing placeholder content

### Development Patterns

Connected vs Disconnected:
- `JSS_MODE=disconnected`: local proxy serves layout from files
- `JSS_MODE=connected`: fetches from Sitecore Layout Service / GraphQL
- `FETCH_WITH=GraphQL` or `REST` per app configuration

Error Handling:
- Create custom error classes: `LayoutServiceError`, `GraphQLError`
- Log errors for debugging
- Provide fallback content when components fail
- Use error boundaries in React

Placeholder Management:
- Use strongly-typed placeholder names
- Support dynamic placeholders (isDynamicPlaceholder, getDynamicPlaceholderPattern)
- Use MissingComponent for unknown components
- Follow JSS placeholder naming

Testing:
- Mock Layout Service and GraphQL in unit tests
- Test component rendering with various field configurations
- Cover error scenarios (missing fields, API failures)
- Use JSS test helpers (e.g. from sitecore-jss-react)

## CLI Development

### CLI Behavior
- **Drive init via `initRunner(initializers, args)`** — each initializer exposes `init(args)`
- **Clear prompts and defaults** in initializer prompts
- **Install dependencies after scaffolding** (unless noInstall)
- **Print next steps** after scaffold completes

### Non-goals
- **No deployments or CI flows** (jss deploy is separate)
- **No global user state changes** beyond optional pre-push hook

### Backwards compatibility
- **Avoid breaking arg names** in initializer args
- **Additive changes with defaults**

## Safety Guidelines

### Critical Rules
- **Never edit `dist/**`** — compiled artifacts
- **Do not commit secrets** — `.env` ignored, `scjssconfig.json` ignored
- **Template edits must build/run** with `npm install && npm run build`
- **Reuse common processes** in `packages/create-sitecore-jss/src/common/` — do not duplicate

## General Coding Principles

### Universal Standards

DRY Principle:
- Don't Repeat Yourself — extract common functionality
- Create reusable utilities and helper functions
- Use composition over inheritance
- Share types and interfaces across modules

SOLID Principles:
- Single Responsibility: each function/class has one purpose
- Open/Closed: extend functionality through composition
- Dependency Inversion: depend on abstractions, not implementations

Code Clarity:
- Write self-documenting code with clear intent
- Use meaningful names that express business concepts
- Prefer explicit over implicit behavior
- Make dependencies and requirements obvious

### Architecture Patterns

Modular Design:
- Organize code into focused, cohesive modules
- Minimize coupling between modules
- Use clear interfaces between layers
- Follow established patterns consistently

Data Flow:
- Prefer unidirectional data flow
- Validate inputs at system boundaries
- Transform data at appropriate layers
- Handle errors close to their source

Testing:
- Write testable code with minimal dependencies
- Use dependency injection for better testability
- Mock external services and side effects
- Test behavior, not implementation details

### Development Standards

Version Control:
- Write descriptive commit messages
- Keep commits focused and atomic
- Use branching strategies appropriate to team size
- Review code before merging

Documentation:
- Document public APIs and interfaces
- Include usage examples for complex functionality
- Keep documentation close to code
- Update documentation with code changes

Performance:
- Optimize for readability first, performance second
- Profile before optimizing
- Cache expensive operations appropriately
- Consider memory usage and cleanup

### Quality Assurance

Code Review:
- Review for logic, readability, and maintainability
- Check error handling and edge cases
- Verify tests cover new functionality
- Ensure documentation is updated

Continuous Integration:
- All tests must pass before merging
- Linting and formatting checks must pass
- Build process must complete successfully
- No breaking changes without proper migration
