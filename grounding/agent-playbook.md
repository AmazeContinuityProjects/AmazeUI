# Agent playbook

## Before making a change

Read `package.json`, `src/index.ts`, the exact component source, and nearby
tests. For handbook work, inspect `docs/docs.json` and this grounding first.
Never infer the public package API from directory names alone.

## Trace a component

Read imports, exported prop types, defaults in the function parameters, state
and effects, event handlers, returned JSX, and class composition in that order.
Then inspect the corresponding test. Explain the role of React or platform
primitives when it helps a developer who only knows HTML.

## Trace a package import

Follow the import from `src/index.ts` to its component file, then to helper
modules and external packages. Check `package.json` exports and `tsup.config.ts`
to distinguish source paths from files consumers actually receive.

## Keep documentation accurate

- Quote component names and properties from source types.
- Explain whether the caller or component owns state (controlled versus
  uncontrolled patterns).
- Keep required CSS setup separate from React usage.
- Label limitations and defaults; do not imply an absent behavior.
- Use synthetic sample data and never put credentials in code examples.
- Add every visible page to `docs/docs.json`; validate links from inside `docs/`.

## Release boundaries

Docs changes can be merged as ordinary pull requests and trigger package CI.
Npm publishing is a separate GitHub Release event. Do not create a release or
publish a package as part of documentation work.
