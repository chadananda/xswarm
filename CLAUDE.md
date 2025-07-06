# Claude Development Instructions for XSwarm.ai

## Core Principles

1. **Always use npm scripts** - Never use direct commands. No permission needed for npm scripts.
2. **Minimal implementation** - No extra features, only what's specified
3. **Write less code** - Every line must earn its place. If you can delete it, delete it.
4. **Start simple** - Functions over classes, direct over abstract, clear over clever
5. **Small commits** - Test, lint, commit frequently
6. **No blank lines** - Use comments to separate code sections
7. **Export inline** - `export const name = () => {}`
8. **Test everything** - Create tests before committing

## Required Reading

1. `prd.md` - Product requirements
2. `README.md` - Project overview
3. Current git status - Check work in progress
4. **Project Discovery** - 
   - Look for a prd.md and for planning files (usually in /planning/) to get up to speed on the project.

## Project Structure

- `cli/` - CLI implementation
- `website/` - Astro website
- `scripts/` - Temporary scripts (delete after use)
- `.github/workflows/` - CI/CD pipelines

## Development Workflow

1. Check PRD requirements
2. Search the codebase for existing solutions (grep, not npm)
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

## Architecture Rules

### Components
1. **Self-contained** - All styles in `<style>` block, no external CSS
2. **Generic only** - No content-specific components (bad: TokenChart, good: Chart)
3. **Single file** - Use variant props, not multiple files (Card variant="tiny")
4. **Flat structure** - No subfolders in /components

### CSS Organization
- `/styles/theme.css` - Variables only
- `/styles/global.css` - Resets, base typography
- Everything else - Inside components

### Content
- Must work without custom code
- Use MDX for enhancements
- Import generic components only

### Imports
- ✅ Theme variables, components, utilities
- ❌ Component CSS files, content helpers

### Red Flags
- `ComponentV2.astro` → Add variant to original
- `component.css` → Move styles inside component
- `/components/blog/` → Make generic or move to content

## AI Behavior Rules

1. **Code Creation**
   - Search the codebase for similar patterns before creating new
   - Look for existing utilities, helpers, or components to extend
   - Minimal implementation - no extra features
   - One file per component, use variant props
   - Self-contained components - no external CSS

2. **Dependencies**
   - Use only packages in package.json
   - Never install without permission
   - Always use @latest for new packages
   - Verify package exists on npm first

3. **Code Modifications**
   - Only modify files explicitly mentioned
   - No refactoring unless requested
   - Keep changes minimal and focused
   - Don't touch working code

4. **File Organization**
   - /scripts for temporary files (delete after use)
   - /src for production code only
   - Follow existing project structure
   - No test files in component folders

5. **Code Quality**
   - No console.log in production code
   - No TODO comments
   - Handle all errors consistently
   - Remove all debug code

6. **Security**
   - No string concatenation in queries
   - No hardcoded secrets
   - Validate all inputs
   - Use parameterized queries

7. **Style**
   - Match existing code patterns
   - Use project's naming conventions
   - Follow established import style
   - Copy indentation from nearby code

8. **Performance**
   - No await inside loops
   - Batch API calls
   - Consider caching
   - Avoid n+1 queries

## Code Simplicity Rules

### Write Less Code
- Prefer 5 lines that are obvious over 20 that are "clever"
- No intermediate variables used only once
- Direct returns over storing in variables
- One-line functions when appropriate

### Examples
```javascript
// ❌ VERBOSE
const processUser = (user) => {
  const result = {};
  result.name = user.name;
  result.email = user.email;
  return result;
};

// ✅ SIMPLE
const processUser = ({ name, email }) => ({ name, email });

// ❌ OVER-ENGINEERED
const items = [];
for (let i = 0; i < data.length; i++) {
  if (data[i].active === true) {
    items.push(data[i]);
  }
}

// ✅ CLEAR
const items = data.filter(item => item.active);
```

### Always Avoid
- Factory patterns for single implementations
- Classes with only constructor and one method
- Configuration objects for 2-3 options
- Getter/setter methods that do nothing special
- Try/catch blocks that just re-throw
- Promises wrapping synchronous operations

### Always Prefer
- Array methods (map, filter, reduce) over loops
- Destructuring over repeated property access
- Optional chaining over verbose null checks
- Template literals over string concatenation
- Early returns over nested conditions
- Pure functions over stateful ones

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.