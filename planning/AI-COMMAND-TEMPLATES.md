# AI Command Templates - Copy & Paste Ready

## Universal Commands (All AI Tools)

```markdown
# CORE RULES
Search before creating: grep -r "function.*{name}" ./src
Verify packages: npm view [package] before install
Latest versions: Always use @latest tag
No: eval(), innerHTML=var, exec(var), `SQL ${var}`
Test coverage: 90% minimum
```

## Claude-Specific (.claude.md or CLAUDE.md)

```markdown
# CLAUDE.md
## Quick Rules
- Search existing code first
- Minimal implementation only
- No external CSS files
- Self-contained components
- Latest package versions
- 90% test coverage

## Commands
npm run lint && npm test  # Before every commit
grep -r "pattern" ./src   # Before creating
npm view package-name     # Before installing
```

## Cursor-Specific (.cursorrules)

```markdown
# Cursor Rules
ALWAYS: Search first, verify packages, latest versions, test 90%
NEVER: eval(), innerHTML, duplicate code, console.log, TODO
STYLE: const fn = () => {}, not function fn() {}
IMPORTS: Absolute paths with @/
ERRORS: Throw meaningful messages
```

## Windsurf-Specific (.windsurf)

```yaml
rules:
  - search_before_create
  - verify_npm_packages  
  - use_latest_versions
  - security_first
  - test_coverage_90
avoid:
  - eval_innerHTML_exec
  - console_log_production
  - todo_comments
  - duplicate_utilities
```

## GitHub Copilot (.github/copilot-instructions.md)

```markdown
## Copilot Rules
1. grep before implementing
2. npm view before installing
3. @latest for all packages
4. Parameterized queries only
5. Self-contained components
6. 90% test coverage
```

## Aider (.aider.conf.yml)

```yaml
rules:
  - Search: grep -r before creating
  - Verify: npm view before install
  - Latest: use @latest always
  - Secure: no eval/innerHTML/exec
  - Test: 90% coverage minimum
```

## Category-Specific Commands

### Security
```markdown
SECURITY:
✓ Parameterized queries
✓ Input validation
✓ Output sanitization
✗ eval() innerHTML exec()
✗ String concatenation in SQL
```

### Dependencies
```markdown
PACKAGES:
1. Check exists: npm view [pkg]
2. Install latest: npm i [pkg]@latest
3. Audit after: npm audit
4. Only from package.json
5. No hallucinated packages
```

### Testing
```markdown
TESTS:
- Smoke: Does it work?
- Edge: null, undefined, empty
- Error: Proper messages
- Perf: Reasonable time
- Coverage: 90% minimum
```

### Code Organization
```markdown
STRUCTURE:
/utils → Shared functions
/components → Self-contained
/scripts → Temporary (delete)
/tests → All test files
No CSS files, use <style> blocks
```

### Performance
```markdown
PERFORMANCE:
✗ await in loops
✗ Sync in async code
✓ Batch operations
✓ Promise.all()
✓ Memoization
```

## Quick Copy Templates

### For New Projects
```bash
# Create all command files
echo "Search first, latest versions, 90% tests" > CLAUDE.md
echo "Search first, verify packages, secure code" > .cursorrules
echo "rules: [search_first, latest_versions, test_90]" > .windsurf
mkdir -p .github && echo "grep first, npm view, test all" > .github/copilot-instructions.md
```

### For Code Reviews
```markdown
REVIEW:
□ Packages verified?
□ No security risks?
□ Tests written?
□ No duplicates?
□ Errors handled?
```

### For Bug Fixes
```markdown
FIX ONLY:
- The reported issue
- Add test for bug
- No refactoring
- No new features
- Keep minimal
```

### For New Features
```markdown
FEATURE:
1. Search similar first
2. Use existing patterns
3. Add comprehensive tests
4. Update documentation
5. No scope creep
```

## Tool-Specific Syntax

### Claude/ChatGPT (Markdown)
```markdown
**Rules:** Search first, verify packages
**Never:** eval(), innerHTML
**Always:** 90% test coverage
```

### Cursor (Natural Language)
```
You must search before creating.
You must verify packages exist.
You must use latest versions.
You must write tests.
```

### Windsurf (YAML)
```yaml
must:
  search_first: true
  verify_packages: true
  latest_versions: true
  test_coverage: 90
```

### Copilot (Instructional)
```markdown
1. Search existing code
2. Verify on npm first  
3. Use @latest always
4. Test everything
5. Handle all errors
```

## Emergency Commands

### When AI Goes Wrong
```markdown
STOP AND FIX:
1. Revert changes
2. Search existing code
3. Use minimal approach
4. Test thoroughly
5. No clever solutions
```

### When Hallucinating
```markdown
REALITY CHECK:
- Does package exist? npm view
- Is method real? Check docs
- Working example? Search GitHub
- Makes sense? Think twice
```

### When Over-Engineering
```markdown
SIMPLIFY:
- One function, one purpose
- No design patterns
- Direct solution
- Flat structure
- YAGNI principle
```

## Integration Commands

### Pre-commit Hook
```bash
#!/bin/bash
npm run lint || exit 1
npm test -- --coverage=90 || exit 1
npm audit --level=moderate || exit 1
echo "✅ AI code verified"
```

### CI/CD Pipeline
```yaml
- name: AI Code Check
  run: |
    npm run lint:security
    npm test -- --coverage
    npm audit
```

### VSCode Settings
```json
{
  "eslint.rules": {
    "no-eval": "error",
    "no-implied-eval": "error",
    "security/detect-object-injection": "error"
  }
}
```

## Copy-Paste Cheatsheet

```markdown
# INSTANT AI RULES (Paste into any AI chat)

You MUST:
1. Search before creating: grep -r "pattern" ./src
2. Verify packages: npm view [package]
3. Use latest: npm install package@latest
4. No: eval(), innerHTML=var, exec(var)
5. Test: 90% coverage minimum

You MUST NOT:
- Duplicate existing code
- Create external CSS files  
- Leave console.log or TODO
- Skip error handling
- Trust without verifying
```

Save time. Copy these. Paste everywhere. Watch quality improve.