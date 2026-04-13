# Cross-Framework React Component Library v1

## Summary
- Start standalone first, not monorepo first. For a learning-first setup, the simplest path is: `pnpm` + TypeScript + Vite library mode for the package build + `tsc --emitDeclarationOnly` for types + Storybook React-Vite for docs/testing.
- Use Tailwind CSS with shared theme tokens, not CSS Modules or runtime CSS-in-JS. This keeps styling inside the component API, preserves a zero-runtime CSS output, and still works cleanly in Next.js, TanStack, React Router, and microfrontend consumers.
- `tsdown` looks strong for React libraries, but its CSS support is still marked experimental; because you want a styled library and Storybook's Vitest addon already expects a Vite-based Storybook, use Vite first and revisit `tsdown` later if packaging needs become more advanced.
- For microfrontends, repo shape does not matter nearly as much as package contract. What matters is: stable exports, `react`/`react-dom` as peers, no bundled React, CSS isolation, and a predictable style import.

```text
Standalone v1
tane-components/
  package.json
  tsconfig.json
  tsconfig.build.json
  vite.config.ts
  .storybook/
  src/
    index.ts
    components/Button/
      Button.tsx
      Button.stories.tsx
    styles/style.css
  README.md
  LICENSE
```

```text
Monorepo later
tane-components/
  package.json
  pnpm-workspace.yaml
  packages/ui/
  apps/storybook/
  apps/next-playground/
  apps/react-router-playground/
  .changeset/
```

## Step-by-Step Scaffold
1. Initialize the repo as a standalone package with `pnpm`, Git, and TypeScript. Keep the first package name as a placeholder like `@tane/ui`.
2. Add the library build with Vite library mode. Output ESM + CJS, emit a compiled CSS file, and externalize `react` and `react-dom`.
3. Add a separate type build with `tsc --emitDeclarationOnly`, and wire `package.json` so `types` points to the generated declaration entry.
4. Make the package publish-ready without publishing: define `name`, `version`, `files`, `main`, `module`, `exports`, `types`, `peerDependencies`, `README`, and `LICENSE`.
5. Define the public package contract up front:
   - Root JS entry: `@tane/ui`
   - Explicit style entry: `@tane/ui/style.css`
   - Root re-exports only from `src/index.ts`
   - No imports from Next.js, TanStack Router, React Router, or app-specific code inside the library
6. Build the source layout around one teaching component first: `Button`. Use that as the template for every later component.
7. Style components with Tailwind CSS utilities and shared theme tokens in `src/styles/style.css`.
8. Make styles consumer-friendly: the consumer imports the built `@tane/ui/style.css` once in its app shell/root, and the package ships precompiled CSS rather than raw Tailwind source.
9. Add Storybook with `@storybook/react-vite` in the same repo. Keep it colocated with the standalone package for v1.
10. Turn on Autodocs for all stories, then use MDX only for a short "Getting Started" page and package-level guidance.
11. Add Storybook's Vitest addon so stories become component tests. Write one render test and one interaction/play test per component.
12. Add a tiny validation workflow before any real publish:
    - `build`
    - `storybook`
    - `test-storybook`
    - `npm pack --dry-run`
    - install the packed tarball into a sample consumer app by file path or tarball
13. After the standalone package feels stable, add a Next consumer smoke test first, because it is the strictest environment. Then add a Vite consumer (TanStack or React Router).
14. Only move to a `pnpm` monorepo when you have one of these signals: more than one package, more than one consumer app, or a need for shared configs/tokens/icons/docs apps.

## Public APIs / Types
- Export components and their props from the root entry only, for example `Button` and `ButtonProps`.
- Keep `react` and `react-dom` in `peerDependencies` with a broad supported range for the React majors you intend to support.
- Do not bundle React into the library.
- Treat interactive components as client-side UI and document Next.js usage from a client boundary when needed.
- Avoid global CSS class contracts. The only intentional public styling contract should be:
  - the compiled `style.css`
  - documented Tailwind-backed theme tokens you explicitly expose

## Test Plan
- Build produces JS, declarations, and one distributable CSS file.
- Storybook runs and Autodocs pages are generated for each component.
- Story-based Vitest tests pass for render and interaction behavior.
- The packed tarball installs cleanly into:
  - a Next.js app
  - a Vite React app
- Consumer checks:
  - no duplicate React
  - no framework-specific imports leak into the package
  - styles load once and do not globally collide
  - one interactive component works from a documented client boundary in Next

## Assumptions And Defaults
- Current workspace is empty and not yet a Git repo; local environment already has Node `24.13.1`, npm `11.8.0`, and `pnpm` `10.28.1`.
- Chosen defaults: standalone first, `pnpm`, TypeScript, Vite library mode, Tailwind CSS, Storybook React-Vite, Storybook Vitest addon.
- Monorepo recommendation: later, not now. When you do move, use `pnpm` workspaces first; add Changesets only when you actually have multi-package versioning/release needs.
- Reference links:
  - [Vite library mode and CSS export](https://vite.dev/guide/build)
  - [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
  - [Storybook docs](https://storybook.js.org/docs)
  - [Storybook Autodocs](https://storybook.js.org/docs/writing-docs/autodocs)
  - [Storybook Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/index)
  - [Storybook package composition](https://storybook.js.org/docs/sharing/package-composition)
  - [Next.js CSS guidance](https://nextjs.org/docs/app/getting-started/css)
  - [Next.js `use client`](https://nextjs.org/docs/app/api-reference/directives/use-client)
  - [TypeScript declaration publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
  - [TypeScript `emitDeclarationOnly`](https://www.typescriptlang.org/tsconfig/emitDeclarationOnly.html)
  - [npm `package.json` peers](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
  - [npm `pack`](https://docs.npmjs.com/cli/v11/commands/npm-pack/)
  - [tsdown React support](https://tsdown.dev/recipes/react-support)
  - [tsdown CSS support](https://tsdown.dev/options/css)
  - [Changesets](https://changesets-docs.vercel.app/)
