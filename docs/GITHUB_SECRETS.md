# GitHub Secrets Setup

This guide explains how to set up the required GitHub secrets for the XSwarm.ai project.

## Required Secrets

### NPM_TOKEN

The `NPM_TOKEN` is required for automatically publishing the CLI package to npm when changes are pushed to the `cli/` directory.

#### How to Get Your NPM Token

1. **Log in to npm**:
   ```bash
   npm login
   ```

2. **Create an access token**:
   - Go to https://www.npmjs.com/settings/[your-username]/tokens
   - Click "Generate New Token"
   - Select "Classic Token"
   - Choose "Automation" type (for CI/CD)
   - Give it a descriptive name like "xswarm-github-actions"
   - Copy the token immediately (you won't see it again!)

#### How to Add the Token to GitHub

1. **Navigate to your repository settings**:
   - Go to https://github.com/[your-username]/xswarm/settings
   - Click on "Secrets and variables" → "Actions"

2. **Add the secret**:
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

## Security Best Practices

1. **Never commit tokens**: Never put your npm token in code or commit messages
2. **Use automation tokens**: Always use automation-type tokens for CI/CD
3. **Rotate regularly**: Consider rotating your tokens every 90 days
4. **Minimal permissions**: Use tokens with only the necessary permissions

## Troubleshooting

### Publishing Fails with Authentication Error

If you see an error like `npm ERR! code E401`, your token might be:
- Expired
- Incorrectly copied
- Missing from GitHub secrets

**Solution**: Generate a new token and update the GitHub secret.

### Manual Publishing (Fallback)

If GitHub Actions isn't working, you can publish manually:

```bash
cd cli
npm login  # If not already logged in
npm publish
```

## Other Secrets (Future)

As the project grows, you might need additional secrets:

- `OPENAI_API_KEY` - For AI features
- `SENTRY_DSN` - For error tracking
- `ANALYTICS_KEY` - For usage analytics

Each would be added following the same process as `NPM_TOKEN`.