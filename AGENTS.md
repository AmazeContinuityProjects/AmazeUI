# AmazeUI contributor guidance

Before changing this repository's developer handbook, read `grounding/README.md`,
`grounding/agent-playbook.md`, and `grounding/writing-standard.md`. This repository
publishes the `@amazecontinuityprojects/amazeui` React component package. Confirm
the package's public API in `src/index.ts`, component behavior in `src/`, tests in
`tests/`, and published output settings in `package.json` and `tsup.config.ts`.

The components mix React DOM behavior with `react-native-web` primitives. Do not
claim React Native native-device support just because a component accepts a
React Native Web prop. Explain package-version and CSS requirements from actual
configuration. Keep examples aligned with the exported package surface.
