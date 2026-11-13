# AmazeUI documentation grounding

This directory is the agent-oriented map of the AmazeUI source. The Mintlify
handbook lives in `docs/`. Read this file plus `agent-playbook.md` and
`writing-standard.md` before large documentation changes.

## What the package is

`@amazecontinuityprojects/amazeui` is the design component library used by
AmazeCC and related applications. It is a TypeScript React package that bundles
ESM and CommonJS JavaScript, declarations, and a Tailwind CSS entrypoint. The
source includes standard React DOM components, components backed by
`react-native-web`, Radix primitives, `cmdk`, Framer Motion, theme helpers, and
application-oriented composites.

The project is a component library, not a running website or a design-token
service. Its package exports in `src/index.ts` are the public API boundary.
`src/components/ui/` holds the visual components, `src/components/custom/`
contains complex composites, `src/hooks/` contains React hooks, and `src/lib/`
contains class merging, platform primitives, and slot behavior.

## Sources of truth

1. `src/index.ts` determines what consumers can import from the package root.
2. Component source determines props, defaults, events, rendering, and runtime
   dependencies.
3. `src/tailwind.css`, `package.json`, and `tsup.config.ts` determine styling,
   dependency, and package-build requirements.
4. `tests/` documents verified behavior and supported edge cases.
5. CI workflows determine checks and publication behavior.
6. README and handbook are explanatory and can become stale.

## Important boundaries

- `react-native-web` APIs and platform primitives do not establish native iOS or
  Android support. The published bundle formats and package dependencies are
  configured for JavaScript consumers; verify platform claims against build and
  runtime source.
- The `./tailwind.css` package subpath is a shipped CSS artifact. Consumers
  must load it and configure Tailwind to scan package source/output as required
  by the installed Tailwind version. Verify the exact usage against the current
  CSS source and package version.
- Component names in `src/index.ts` are the supported root imports. A source
  file existing in the repository does not by itself mean it is publicly
  exported.
- The CI workflow runs package checks and a production-dependency audit.
  Publishing is triggered by a GitHub Release; a docs-only push does not itself
  publish a new npm version.
- The package currently provides convenience components. Do not describe a
  visual component as doing data fetching, persistence, routing, or app-specific
  business logic unless its own source explicitly does that.

## Handbook distribution

`docs/docs.json` controls Mintlify navigation. The docs repository aggregates
this folder into the `/amazeui` destination. A push to `main` that changes
`docs/**` dispatches `docs-updated` to the aggregator using the repository's
`DOCS_DISPATCH_TOKEN` secret.
