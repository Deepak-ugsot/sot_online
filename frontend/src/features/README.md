# Feature Modules

Create one folder per business capability. A feature owns its UI, data access,
state, validation, hooks, and feature-specific types.

## Creating a feature

Use this structure and add only the folders the feature needs:

```text
feature-name/
├── components/
│   └── component-name.tsx
├── hooks/
│   └── use-feature-name.ts
├── services/
│   └── feature-name.service.ts
├── schemas/
│   └── feature-name.schema.ts
├── types/
│   └── feature-name.types.ts
├── utils/
│   └── feature-name.utils.ts
├── index.ts
└── README.md
```

Every feature must include a `README.md` that explains its purpose, routes,
public API, important decisions, and any setup or testing instructions.

## Naming conventions

- Use `kebab-case` for folders and filenames.
- Use `PascalCase` for React components and TypeScript types.
- Use `camelCase` for functions, variables, and component props.
- Prefix hooks with `use`, such as `useCurrentUser`.
- Use descriptive suffixes when useful: `.service.ts`, `.schema.ts`,
  `.types.ts`, `.utils.ts`, and `.test.tsx`.
- Use `index.ts` only as the feature's public API. Do not add barrel files at
  every folder level.

## Dependency rules

- Routes in `src/app` may import features.
- Features may import from shared modules.
- Features must not import private files from another feature. Import only
  from that feature's public `index.ts`.
- Shared modules must not depend on features.
- Keep route files thin; business logic belongs in feature modules.

Do not create empty placeholder folders. Add a folder when real code needs it.
