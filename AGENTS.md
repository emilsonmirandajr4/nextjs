# AGENTS.md

## Commands
- **Build**: `npm run build` - Compile Next.js for production
- **Dev**: `npm run dev` - Start Next.js dev server (port 3000)
- **Lint**: `npm run lint` - Run ESLint on codebase
- **Typecheck**: `npm run typecheck` - Run TypeScript type checking without emitting files

## Project Structure
- **Main app**: Next.js 16 (canary) App Router in `app/` directory
- **Components & utilities**: React components in `src/components/`, utilities in `src/utils/`
- **Services**: WordPress API integration (`src/services/wordpress.ts`), Twitter API (`src/services/twitter.ts`)
- **Configuration**: WordPress API config in `src/config/wordpress.ts`, environment variables in `.env.local`
- **Subproject**: MCP server for Next.js devtools in `next-devtools-mcp/` (see `next-devtools-mcp/CLAUDE.md`)

## Code Conventions
- **TypeScript**: Strict mode enabled, ES2020 target, use `@/` path alias for `src/*` imports
- **Components**: PascalCase file names (e.g., `Header.tsx`), use functional components with TypeScript types
- **Imports**: Use relative imports for `app/`, `@/` alias for `src/` - Import from `lucide-react` for icons
- **Styling**: TailwindCSS utility classes, custom fonts via `Roboto Condensed`, use `twicpics` for image optimization
- **API**: WordPress REST API at `https://primeiranews.com.br/wp-json/wp/v2` with React Query for data fetching
- **Cursor Rules**: Never create markdown files after generating code, never use emojis (use text/unicode instead)
