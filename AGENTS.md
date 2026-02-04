# Repository Guidelines

## Project Structure & Module Organization
This repository is currently in bootstrap state (no application files committed yet). Use this layout as you add code so contributors stay aligned:

- `src/` - app source code (group by feature, e.g., `src/qr/`, `src/game/`)
- `tests/` - automated tests mirroring `src/`
- `assets/` - static files (images, audio, icons, sample QR data)
- `docs/` - design notes, architecture decisions, and setup guides
- `scripts/` - repeatable utility scripts (seed data, maintenance tasks)

Keep modules small and feature-focused. Prefer one responsibility per file.

## Build, Test, and Development Commands
No build toolchain is defined yet in this directory. When adding one, provide consistent top-level commands so onboarding stays simple:

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm test` - run all automated tests
- `npm run lint` - run static checks and formatting validation

If you choose a different stack, expose equivalent commands with these names.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for JS/TS/JSON/YAML, 4 spaces for Python.
- Filenames: `kebab-case` for files, `PascalCase` for classes/components, `camelCase` for functions/variables.
- Keep functions under ~50 lines when practical; extract helpers early.
- Run formatter/linter before commit (for example, Prettier + ESLint if using Node).

## Testing Guidelines
- Place tests under `tests/` with paths matching source modules.
- Use names like `*.test.ts`, `*.spec.ts`, or framework-equivalent.
- Cover core game loop, QR parsing/validation, and error handling first.
- Add regression tests for every bug fix.

## Commit & Pull Request Guidelines
There is no usable Git history in this folder yet, so adopt this standard now:

- Commit style: Conventional Commits (e.g., `feat: add QR scan validator`, `fix: prevent duplicate score submit`).
- Keep commits focused and atomic.
- PRs should include: purpose, main changes, test evidence, and screenshots/video for UI changes.
- Link related issue IDs and call out breaking changes explicitly.

## Security & Configuration Tips
- Never commit secrets (`.env`, API keys, private endpoints).
- Validate and sanitize all QR payload inputs before processing.
- Keep environment-specific values in ignored config files (for example `.env.local`).

## Agent-Specific Instructions (Japanese, Beginner-Friendly)
- Explain implementation steps in simple Japanese.
- Avoid unexplained jargon; add short definitions when terms are necessary.
- Prefer small, incremental changes over large refactors.
- Add brief Japanese comments for complex logic.
- In responses, include `目的` (goal), `変更点` (what changed), and `確認方法` (how to verify).
