# Claude Development Instructions for XSwarm.ai

## Core Principles

1. **Always use npm scripts** - Never use direct commands. No permission needed for npm scripts.
2. **Minimal implementation** - No extra features, only what's specified
3. **Small commits** - Test, lint, commit frequently
4. **No blank lines** - Use comments to separate code sections
5. **Export inline** - `export const name = () => {}`
6. **Test everything** - Create tests before committing

## Required Reading

1. `prd.md` - Product requirements
2. `README.md` - Project overview
3. Current git status - Check work in progress

## Project Structure

- `cli/` - CLI implementation
- `website/` - Astro website
- `scripts/` - Temporary scripts (delete after use)
- `.github/workflows/` - CI/CD pipelines

## Development Workflow

1. Check PRD requirements
2. Search for existing code
3. Make minimal changes
4. `npm run lint && npm test`
5. Commit with conventional format: `feat:`, `fix:`, `docs:`
6. Include Claude Code attribution

## Team Collaboration

- This may be a team project. Always pull changes before pushing to origin

## Quality Gates

Before ANY commit:

- `npm run lint` - Must pass
- `npm run test` - Must pass
- Update docs if needed

## Emergency Procedures

- **Tests fail**: Stop. Fix before continuing.
- **Lint fails**: Fix immediately. Use `npm run lint -- --fix`
- **Code exists**: Use it. Don't recreate.

## NPM Scripts

```bash
# Development
npm run dev                # Start CLI & website
npm run start:website      # Start website only
npm run kill:dev          # Kill dev servers

# Build & Deploy
npm run build             # Build all
npm run deploy:all        # Deploy all

# Quality
npm run lint              # Check code
npm run test              # Run tests
npm run format            # Auto-format
```

## CSS Theme System

- **No dark: prefixes** - Use CSS variables
- **Semantic colors only** - `text-secondary` not `text-gray-700`
- **light-dark() function** - Automatic color switching
- **Single source** - All colors in `/website/src/styles/theme.css`
