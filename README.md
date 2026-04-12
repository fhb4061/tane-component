# `@tane/ui`

This repository is the bare-bones scaffold for a React component library that can be consumed from Next.js, TanStack Router, React Router, or any other React framework.

## Common commands

- `pnpm install` - install the local dependencies
- `pnpm storybook` - run Storybook locally
- `pnpm build` - build the library for publishing
- `pnpm build:types` - build type declarations only
- `pnpm build-storybook` - build the static Storybook site
- `pnpm typecheck` - run TypeScript checks without emitting files
- `pnpm prepack` - run the package build before packing or publishing
- `pnpm pack` - create a local tarball of the package
- `pnpm pack --dry-run` - preview what would be included in the package tarball

## What this scaffold defines

- A publish-ready package contract with ESM and CJS entry points
- A separate explicit style entry at `@tane/ui/style.css`
- A Vite library build setup
- A TypeScript declaration build setup
- A minimal source layout ready for the first component

## Current state

The package now includes a starter `Button` component, local CSS Modules, shared design tokens, and a colocated Storybook setup.

## Next steps

1. Add the first component under `src/components/`
2. Re-export it from `src/index.ts`
3. Add Storybook and tests once the component shape is stable
4. Replace the placeholder metadata like description and version before publishing

## Install later

When you are ready to run the build locally, add the toolchain dependencies you choose for the project. This scaffold intentionally leaves that decision open so you can pick the exact versions later.

A minimal starting toolchain is:

- `vite`
- `@vitejs/plugin-react`
- `typescript`
- `@types/react`
- `@types/react-dom`
