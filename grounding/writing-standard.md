# Writing standard

## Audience

Write for a junior frontend developer who knows HTML but may not know JSX,
TypeScript, React state, hooks, npm package exports, Tailwind CSS, or
`react-native-web`. Explain a term when it first matters, then show how the
repository uses it.

## Page shape

Start with the task and the relevant package entrypoint. Use short sections,
accurate code examples, and prop tables where they make choices clear. Explain
what the caller supplies, what the component renders, and what remains the
application's responsibility.

## Accuracy

Use the current source types for prop names and unions. Mention defaults only
when the implementation sets them. Tests may verify particular behavior but do
not prove features they do not cover. State when an example depends on an
external peer or Tailwind configuration.

## Avoid

- Calling the package a full design system with automatic setup unless source
  and package configuration support that claim.
- Describing static or callback props as automatic networking or persistence.
- Promising native mobile support solely because `react-native-web` is used.
- Treating TypeScript annotations as runtime validation.
- Listing an internal module as importable if `src/index.ts` does not export it.
