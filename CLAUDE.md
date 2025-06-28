# Claude Development Instructions for XSwarm.ai

## Getting Up to Speed (Claude Self-Onboarding)

### Required Reading (In Order)

1. **Anthropic Claude Code Best Practices**: https://www.anthropic.com/engineering/claude-code-best-practices
2. `prd.md` - Complete Product Requirements Document for XSwarm.ai
3. `README.md` - Project overview and installation instructions
4. `docs/DEVELOPMENT.md` - Development workflow guide
5. `docs/DEPLOYMENT.md` - Deployment procedures
6. `docs/GITHUB_SECRETS.md` - GitHub secrets setup
7. `.github/workflows/` - CI/CD pipeline configurations (when created)

### Context Files (Always check these first)

- **`prd.md`** - XSwarm.ai product requirements and roadmap
- **`cli/package.json`** - CLI package configuration
- **`website/package.json`** - Website configuration
- **Current git status** - Understand work in progress

### Project Status Check

- Run `git status` to see current work
- Check `cli/` for CLI implementation
- Review `website/` for Astro site structure
- Check GitHub Actions workflows for deployment status

## Mandatory Code Style

- No blank lines in code - use comments to separate sections
- Single-line if statements when possible
- Functional/compact style with chaining
- All functions exported inline: `export const functionName = () => {}`
- JSDoc headers for all functions
- No inline imports!

## Implementation Rules

- **Minimal implementation only** - no extra features
- **One feature per git branch** - create branch before starting
- **Break into small increments** - commit each working change
- **Test before merge** - run tests after any change
- **Ask before architectural decisions**
- **Surgical changes only** - preserve existing working code
- **Temporary scripts in scripts/ folder** - delete when no longer needed

## Autonomous Development Workflow

### Core Development Pipeline (Claude handles automatically)

1. **Pre-Development Check**:
   - Review PRD for feature requirements
   - Search codebase for similar functionality
   - Verify no redundant work

2. **Development**:
   - Follow project structure (cli/, website/, scripts/)
   - Export all functions for testing
   - Follow compact/functional style (no blank lines)

3. **Quality Pipeline (Automatic)**:
   - Run `npm run lint` to check issues
   - Fix any linting issues immediately
   - No code proceeds without passing lint

4. **Testing Pipeline (Automatic)**:
   - Create tests for new functionality
   - Place tests in appropriate test directories
   - Run `npm test` to verify all tests pass

5. **Documentation Pipeline (Automatic)**:
   - Update README.md if needed
   - Add JSDoc headers to all functions
   - Update package.json if dependencies change

6. **Git Workflow (Automatic)**:
   - Commit after each successful implementation
   - Use conventional commit messages
   - Small, frequent commits for safety
   - Auto-commit when tests pass

### Commit Pattern (Claude executes automatically)

```bash
# After implementing feature
npm run lint
npm test
git add . && git commit -m "feat: {feature description}

- Implemented {what was done}
- Added tests for {what was tested}
- All tests passing, lint clean

🤖 Generated with Claude Code"
```

### Sub-Agent Usage (Automatic)

- **Code Review Agent**: Review all code for style compliance
- **Test Creation Agent**: Create comprehensive tests
- **Documentation Agent**: Update all relevant documentation files

## File Organization Rules

- **CLI code**: Must go in `cli/` directory
- **Website code**: Must go in `website/` directory
- **Temporary scripts**: Only in `scripts/` folder, delete when done
- **Core project files**: Keep root directory clean - only essential project files
- **GitHub workflows**: Store in `.github/workflows/`

## Session Workflow

1. Trunk development methods -- create short-lived git branch -- merge and repeat whenever stable
2. Break task into small, testable increments
3. For each increment:
   - Make minimal, surgical change
   - Run tests (Vitest)
   - Commit with descriptive message
   - Refactor for simplicity if needed
   - Test and commit refactoring
4. Complete feature documentation
5. Final review for simplicity and style
6. Merge only when thoroughly tested then check out a new short-lived branch

## File Creation Rules

- **camelCase naming** for JavaScript files
- **File headers required**: filename + purpose explanation
- **Corresponding .test.js** file for testable code
- **Temporary scripts**: only in scripts/ folder, delete when done

## If Implementation Gets Complex

1. **STOP** - re-read `prd.md`
2. **Ask**: "What's the simplest possible solution?"
3. **Remove** any unnecessary abstractions
4. **Focus** only on current task requirements

## Emergency Brake Phrases

Watch for these and stop immediately:

- "Let's also add..." ❌
- "We should probably..." ❌
- "It would be better if..." ❌
- "For future flexibility..." ❌

## Success Criteria

- Feature works as specified in PRD
- Follows all code style requirements
- Has basic test coverage
- No unnecessary complexity
- No hard-coded values just to pass tests
- Clean root directory with no temporary files

## Quality Gates (All Automatic)

### Mandatory Checks Before Any Commit:

1. **Lint Check**: `npm run lint` must pass (no warnings/errors)
2. **Test Suite**: `npm run test` must pass (all tests green)
3. **Documentation**: All new functionality documented

### Commit Standards:

- Conventional commit format: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- Include test status and lint status in commit message
- Reference updated documentation files
- Always include Claude Code attribution

## Emergency Procedures

### If Tests Fail:

1. **STOP development immediately**
2. **Fix failing tests before any new work**
3. **Do not commit broken code**
4. **Check git status and rollback if needed**

### If Lint Fails:

1. **Fix all linting issues immediately**
2. **Do not proceed with development**
3. **Use autofix where possible**: `npm run lint -- --fix`
4. **Manual fix for complex issues**

### If Code Already Exists:

1. **Use existing code instead of creating new**
2. **Update existing code if enhancement needed**
3. **Add tests for existing code if missing**

## Testing Guidelines

- **Always use npm scripts** - common tests should be added to package.json as npm scripts
- **Run tests via npm** - always prefer `npm run test` over direct test runner commands
- **Add test shortcuts** - frequently used test patterns should become npm scripts
- **Always delete temporary script files when done**

## Commands

- Development: `npm run dev` (concurrent CLI and website development)
- Build: `npm run build` (builds both CLI and website)
- Build Website: `npm run build:website`
- Build CLI: `npm run build:cli`
- Deploy CLI: `npm run deploy:cli`
- Update Site: `npm run update:site`
- Deploy All: `npm run deploy:all`
- Tests: `npm run test`
- Lint: `npm run lint`
- Format: `npm run format`

## Code Quality

- **Always run format and lint after editing code** - helps catch mistakes quickly
- **Format first, then lint** - Prettier fixes formatting, ESLint catches logic issues
- **Address all linting errors before committing** - maintain code quality standards

## Documentation Research

- **Check Astro docs** for website development patterns
- **Review npm best practices** for CLI package publishing
- **Research before implementing** - avoid outdated patterns by checking latest documentation first

## Version Management Guidelines

- CLI versioning handled by GitHub Actions (automatic minor version bumps)
- Website deployments are continuous (no versioning needed)
- Manual version updates only for major releases


## Project-Specific Notes

- XSwarm.ai is a monorepo with separate CLI and website packages
- GitHub Actions handle automated deployments
- CLI publishes to npm, website deploys to GitHub Pages
- Always use npm scripts for common tasks
