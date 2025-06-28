# XSwarm.ai - Product Requirements Document

## Phase 1: Foundation & Namespace Security

### Overview
Establish the foundational infrastructure for XSwarm.ai including npm package publication, web presence, and CLI framework. Primary goals are securing the namespace, creating professional branding, and laying groundwork for future development.

### Success Criteria
- ✅ Secure `xswarm` namespace on npm
- ✅ Live website at xswarm.ai with professional branding
- ✅ Working CLI installable via `npx xswarm` and `npm i -g xswarm`
- ✅ Automated deployment pipeline for both CLI and website
- ✅ Initial content strategy with blog articles derived from project documentation

## Project Structure

```
xswarm/
├── package.json                 # Root package with scripts
├── README.md                    # Project overview and installation
├── cli/                         # CLI package source
│   ├── package.json            # CLI-specific package config
│   ├── src/
│   │   ├── index.js            # Main CLI entry point
│   │   ├── header.js           # Fancy branded header
│   │   └── placeholder.js      # Coming soon functionality
│   └── bin/
│       └── xswarm              # Executable entry point
├── website/                     # Astro website source
│   ├── package.json            # Website dependencies
│   ├── astro.config.mjs        # Astro configuration
│   ├── src/
│   │   ├── pages/              # Static pages
│   │   │   ├── index.astro     # Homepage
│   │   │   ├── about.astro     # About page
│   │   │   └── blog/           # Blog articles
│   │   │       ├── index.astro # Blog listing
│   │   │       ├── team-of-one-philosophy.md
│   │   │       ├── ai-development-workflows.md
│   │   │       └── getting-started-guide.md
│   │   ├── layouts/            # Page layouts
│   │   ├── components/         # Reusable components
│   │   └── styles/             # CSS/styling
│   └── public/                 # Static assets
├── .github/
│   └── workflows/
│       ├── publish-cli.yml     # CLI publishing workflow
│       └── deploy-website.yml  # Website deployment workflow
├── scripts/
    ├── dev.js                  # Development environment setup
    ├── build.js                # Build both CLI and website
    ├── update-site.js          # Manual website deployment (backup)
    ├── deploy-cli.js           # CLI publishing
    └── deploy.js               # Full deployment orchestration
```

## Phase 1.1: CLI Foundation

### Requirements

**Core CLI Features:**
- **Namespace Security:** Publish minimal viable CLI to secure `xswarm` on npm
- **Professional Header:** Claude Code-style branded terminal interface
- **Installation Options:** Support both `npx xswarm` and global installation
- **Placeholder Functionality:** Clear messaging about coming features
- **Version Management:** Semantic versioning with automated publishing

**Technical Specifications:**
- Node.js 18+ compatibility
- Cross-platform support (Windows, macOS, Linux)
- Minimal dependencies for fast installation
- JavaScript for development (avoiding TypeScript compilation complexity)
- ESM module format for modern compatibility

**CLI User Experience:**
```bash
$ npx xswarm
```

Expected output:
```
╭─────────────────────────────────────────────────────────────╮
│                                                             │
│   ██╗  ██╗███████╗██╗    ██╗ █████╗ ██████╗ ███╗   ███╗   │
│   ╚██╗██╔╝██╔════╝██║    ██║██╔══██╗██╔══██╗████╗ ████║   │
│    ╚███╔╝ ███████╗██║ █╗ ██║███████║██████╔╝██╔████╔██║   │
│    ██╔██╗ ╚════██║██║███╗██║██╔══██║██╔══██╗██║╚██╔╝██║   │
│   ██╔╝ ██╗███████║╚███╔███╔╝██║  ██║██║  ██║██║ ╚═╝ ██║   │
│   ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝   │
│                                                             │
│   Transform yourself into a Team of One                     │
│   AI-powered development coordination                       │
│                                                             │
╰─────────────────────────────────────────────────────────────╯

🚀 XSwarm.ai is coming soon!

✨ What's planned:
   • AI expert teams for solo developers
   • Parallel development coordination
   • Comprehensive feature delivery
   • Automatic testing and documentation
   • Marketing content generation

📖 Learn more: https://xswarm.ai
💬 Follow updates: https://github.com/xswarm/xswarm

⏰ Expected launch: Q2 2025

Ready to transform your development workflow?
Join the waitlist at xswarm.ai for early access!
```

**Package.json Configuration:**
- `bin` field for global installation
- `engines` specification for Node.js version
- `keywords` for npm discoverability
- `repository`, `homepage`, and `bugs` URLs
- MIT license for open source compatibility

## Phase 1.2: Website Foundation

### Requirements

**Static Website Features:**
- **Professional Landing Page:** Clear value proposition and branding
- **Blog System:** Article generation from project documentation
- **GitHub Pages Deployment:** Automated publishing to dedicated `website` branch using GitHub Pages functionality
- **SEO Optimization:** Meta tags, sitemap, social media cards
- **Responsive Design:** Mobile-first approach with modern styling

**Content Strategy:**
- **Homepage (xswarm.ai):** XSwarm.ai value proposition, demo video placeholder, waitlist signup
- **About Page:** Team of One philosophy, technology overview, roadmap
- **Blog Articles:** Transform README content into actionable guides

**Blog Article Topics:**
1. **"The Team of One Philosophy"** - Why solo developers need AI support teams
2. **"AI Development Workflows"** - How coordinated AI agents transform productivity
3. **"Getting Started Guide"** - Installing and using XSwarm (future functionality)
4. **"Pure Function Strategy"** - Building reliable foundations for parallel development
5. **"Marketing for Developers"** - Why technical projects need content strategy

**Design Requirements:**
- Modern, developer-focused aesthetic
- Dark/light mode switching using CSS variables and `light-dark()` CSS function
- TailwindCSS utility classes with theme-aware design
- ShadCN components for consistent, accessible UI elements
- Fast loading times (< 2 seconds)
- Accessible design (WCAG 2.1 AA compliance)
- Professional typography and spacing

**Technical Specifications:**
- Astro static site generator for optimal performance
- TailwindCSS for styling with CSS variables for theme switching
- ShadCN component library for consistent UI elements
- `light-dark()` CSS function for seamless theme transitions
- Markdown-based blog system
- Automatic sitemap generation
- Social media meta tags
- GitHub Pages compatibility

## Phase 1.3: Deployment Pipeline

### Requirements

**Automated Workflows:**
- **CLI Publishing:** Automatic npm publish on version tags
- **Website Deployment:** Push to GitHub Pages website branch
- **Version Coordination:** Synchronized versioning across CLI and website
- **Development Scripts:** Local development environment setup

**Root Package Scripts:**
```json
{
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js",
    "build:website": "cd website && npm run build",
    "build:cli": "cd cli && npm run build",
    "test:cli": "cd cli && npm test", 
    "deploy:cli": "node scripts/deploy-cli.js",
    "update:site": "node scripts/update-site.js",
    "deploy:all": "node scripts/deploy.js",
    "test": "npm run test --workspaces",
    "lint": "eslint . --ext .js,.astro",
    "format": "prettier --write ."
  }
}
```

**GitHub Actions Workflows:**

**CLI Publishing Workflow:**
- Trigger on pushes to main branch that modify `cli/` directory
- Automatically increment minor version using npm version
- Build and test CLI package
- Publish to npm registry with updated version
- Create GitHub release with auto-generated changelog
- Tag commit with new version

**GitHub Actions Implementation:**
```yaml
# .github/workflows/publish-cli.yml
name: Publish CLI
on:
  push:
    branches: [main]
    paths: ['cli/**']
    
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - uses: actions/setup-node@v4
        with:
          registry-url: 'https://registry.npmjs.org'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Increment version
        run: |
          cd cli
          npm version minor --no-git-tag-version
          echo "NEW_VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_ENV
      - name: Commit version bump
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add cli/package.json
          git commit -m "Bump CLI version to ${{ env.NEW_VERSION }}"
          git tag "v${{ env.NEW_VERSION }}"
          git push origin main --tags
      - name: Publish to npm
        run: |
          cd cli
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ env.NEW_VERSION }}
          release_name: CLI v${{ env.NEW_VERSION }}
          draft: false
          prerelease: false
```

**Website Deployment Strategy:**

**GitHub Actions Workflow (Preferred)**
- Trigger on pushes to main branch that modify `website/` directory
- Build Astro site in isolated environment
- Run tests and quality checks on built site
- Deploy only `/dist` contents to `website` branch if build successful
- Automatic rollback if deployment fails

**Manual Override Option**
- `npm run update:site` for local testing and emergency updates
- Useful for development and troubleshooting

**GitHub Actions Implementation:**
```yaml
# .github/workflows/deploy-website.yml
name: Deploy Website
on:
  push:
    branches: [main]
    paths: ['website/**']
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build:website
      - name: Deploy to website branch
        uses: peaceiris/actions-gh-pages@v3
        if: success()
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/dist
          publish_branch: website
          cname: xswarm.ai
```

**Development Workflow:**
- Concurrent development of CLI and website
- Hot reloading for website development
- CLI linking for local testing
- Automated dependency management

## Technical Implementation Details

### CLI Development Stack
- **Runtime:** Node.js 18+
- **Language:** JavaScript (avoiding TypeScript complexity)
- **UI Framework:** Custom terminal interface with box-drawing characters
- **Dependencies:** Minimal set for fast installation
- **Testing:** Vitest for fast unit testing
- **Linting:** ESLint with modern JavaScript support

### Website Development Stack
- **Framework:** Astro for static site generation
- **Styling:** TailwindCSS with CSS variables for theming
- **Components:** ShadCN component library for consistent UI
- **Theme System:** `light-dark()` CSS function with seamless mode switching
- **Content:** Markdown with frontmatter for blog posts
- **Deployment:** GitHub Pages via automated workflow
- **Performance:** Optimized for Core Web Vitals
- **Analytics:** Privacy-focused analytics (optional)

### Infrastructure Requirements
- **Domain:** xswarm.ai (already secured)
- **Hosting:** GitHub Pages (free tier)
- **Registry:** npm public registry
- **Repository:** GitHub public repository
- **CI/CD:** GitHub Actions (included with repository)

## Success Metrics

### Phase 1.1 Success Criteria
- [ ] CLI package published to npm with `xswarm` namespace
- [ ] Successful installation via `npx xswarm` and `npm i -g xswarm`
- [ ] Professional branded header displays correctly
- [ ] Package metadata properly configured for discoverability
- [ ] Cross-platform compatibility verified
- [ ] Automated version bumping and npm publishing functional

### Phase 1.2 Success Criteria
- [ ] Website live at xswarm.ai with professional design
- [ ] All blog articles published and accessible
- [ ] Mobile responsiveness verified across devices
- [ ] SEO meta tags and social media cards functional
- [ ] Page load speeds under 2 seconds

### Phase 1.3 Success Criteria
- [ ] Automated CLI publishing workflow functional
- [ ] Website deployment pipeline working reliably
- [ ] Development environment easily reproducible
- [ ] Version synchronization between CLI and website
- [ ] Documentation complete for contributors

## Timeline

### Week 1: CLI Foundation
- Set up monorepo structure with workspaces
- Implement CLI with branded header and placeholder
- Configure package.json for npm publishing
- Test installation methods and cross-platform compatibility

### Week 2: Website Development
- Set up Astro project with TailwindCSS
- Create homepage and about page
- Transform README content into blog articles
- Implement responsive design and dark mode

### Week 3: Deployment Pipeline
- Configure GitHub Actions for CLI publishing
- Set up GitHub Actions for website deployment with build validation
- Implement website deployment only on successful builds
- Create development and build scripts
- Test automated deployment to `website` branch with path-based triggers

### Week 4: Polish & Launch
- Final testing across all platforms and browsers
- SEO optimization and performance tuning
- Documentation completion
- Public launch and namespace security

## Risk Mitigation

### Technical Risks
- **npm Namespace Conflict:** Immediate publication secures namespace
- **GitHub Pages Limitations:** Astro static generation ensures compatibility
- **Cross-Platform Issues:** Early testing on Windows, macOS, and Linux
- **Dependency Conflicts:** Minimal dependency approach reduces risk

### Timeline Risks
- **Scope Creep:** Focus on minimal viable implementation
- **Deployment Complexity:** Use proven tools (Astro, GitHub Actions)
- **Content Creation:** Leverage existing documentation for blog articles
- **Testing Coverage:** Automated testing in CI/CD pipeline

## Future Considerations

### Phase 2 Preparation
- CLI architecture designed for future agent integration
- Website structure ready for documentation expansion
- Deployment pipeline scalable for increased complexity
- Namespace and branding established for long-term growth

### Scalability Planning
- Monorepo structure supports additional packages
- Website can accommodate extensive documentation
- CLI framework ready for complex feature addition
- Infrastructure prepared for increased traffic and usage

This PRD establishes the foundation for XSwarm.ai while securing critical namespace and branding assets. The focus on minimal viable implementation ensures rapid deployment while maintaining professional quality and future scalability.
