# Repository Guidelines

## Project Structure & Module Organization
- App (Next.js 14): `sgc-ts/app`
- UI Components: `sgc-ts/components` (feature folders) and `sgc-ts/components/ui`
- Data Access: `sgc-ts/services/*.service.ts`
- State/Hooks: `sgc-ts/hooks`
- Domain Models: `sgc-ts/models/*.model.ts`
- Utilities/Client: `sgc-ts/lib` (see `sgc-ts/lib/http-client.ts`)
- Styles: `sgc-ts/styles`
- Static assets: `sgc-ts/public`
- Config: `sgc-ts/next.config.mjs`, `sgc-ts/tsconfig.json`
- Environment: `.env` (e.g., `NEXT_PUBLIC_API_URL`)

## Build, Test, and Development Commands
- Install: `cd sgc-ts && yarn`
- Dev server: `yarn dev` (runs on port 3007)
- Build: `yarn build`
- Start (prod): `yarn start`
- Lint: `yarn lint`

## Coding Style & Naming Conventions
- Language: TypeScript with `strict: true` (see `tsconfig.json`).
- Imports: prefer `@/` path alias (configured in TS paths).
- Components: PascalCase `*.tsx` (e.g., `FornecedorForm.tsx`).
- Hooks: `use-*.ts` (e.g., `use-fornecedores.ts`).
- Services: `*.service.ts` (HTTP via `HttpClient`).
- Models: `*.model.ts` for domain types.
- Styling: Tailwind CSS utilities; keep primitive components in `components/ui`.
- Linting: `next lint`; fix before pushing. Keep diffs focused—avoid drive‑by reformatting.

## Testing Guidelines
- No test framework is configured yet. For new features/bugfixes, prefer adding unit tests (`*.test.ts`/`*.test.tsx`) colocated or under `__tests__`.
- Suggested tools: Vitest (unit) and Playwright (e2e). Keep tests deterministic and fast.
- Include minimal mocking for services; avoid hitting real APIs.

## Commit & Pull Request Guidelines
- Commits follow Conventional Commits (seen in history: `feat: ...`). Use `feat|fix|chore|refactor|docs` prefixes; present tense; concise scope.
- PRs: include a clear description, related issues, and screenshots/GIFs for UI changes. Note any env/config changes.
- Keep PRs small and focused. Pass `yarn lint` and build locally before requesting review.

## Security & Configuration Tips
- Do not commit secrets. Client‑side env vars must be prefixed `NEXT_PUBLIC_`.
- Use `HttpClient` and `AttachmentService` for API calls and uploads; set base URL from `NEXT_PUBLIC_API_URL`.
