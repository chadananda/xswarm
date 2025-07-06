---
title: 'Troubleshooting'
description: 'Common issues and solutions when using xSwarm'
category: 'Troubleshooting'
order: 1
---

# Troubleshooting

This guide helps you resolve common issues when using xSwarm.

## Installation Issues

### Node.js Version Error

**Problem**: Error message about Node.js version compatibility

**Solution**:

1. Check your Node.js version:
   ```bash
   node --version
   ```
2. Ensure you have Node.js 18 or higher
3. Update Node.js if needed:
   - Using nvm: `nvm install 18`
   - Download from [nodejs.org](https://nodejs.org)

### Permission Denied Error

**Problem**: Permission denied when installing globally

**Solution**:

1. Use npx instead of global install:
   ```bash
   npx xswarm
   ```
2. Or fix npm permissions:
   ```bash
   npm config set prefix ~/.npm-global
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

### Package Not Found

**Problem**: "xswarm: command not found"

**Solution**:

1. Verify installation:
   ```bash
   npm list -g xswarm
   ```
2. Reinstall if needed:
   ```bash
   npm install -g xswarm
   ```
3. Or use npx directly:
   ```bash
   npx xswarm
   ```

## Runtime Issues

### xSwarm Not Responding

**Problem**: xSwarm seems stuck or unresponsive

**Solution**:

1. Press `Ctrl+C` to interrupt
2. Restart xSwarm
3. Check your internet connection (needed for AI features)
4. Clear any corrupted cache:
   ```bash
   rm -rf ~/.xswarm/cache
   ```

### API Key Issues

**Problem**: "Invalid API key" or authentication errors

**Solution**:

1. Verify your API key is correctly set
2. Check API key permissions
3. Ensure you're not exceeding rate limits
4. Try regenerating your API key

### Memory Issues

**Problem**: "Out of memory" errors

**Solution**:

1. Close unnecessary applications
2. Increase Node.js memory limit:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" xswarm
   ```
3. Work on smaller tasks incrementally

## AI Agent Issues

### Inconsistent Responses

**Problem**: AI agents giving inconsistent or conflicting advice

**Solution**:

1. Provide more specific context
2. Reference previous decisions explicitly
3. Use clear, unambiguous language
4. Break complex requests into smaller parts

### Code Generation Errors

**Problem**: Generated code has syntax errors or doesn't work

**Solution**:

1. Always review generated code
2. Ask for corrections:
   ```
   > The previous code has a syntax error on line 15. Please fix it.
   ```
3. Provide more context about your environment
4. Specify the exact versions of libraries you're using

### Context Loss

**Problem**: xSwarm seems to forget previous conversations

**Solution**:

1. Reference previous work explicitly:
   ```
   > Continue from where we left off with the user authentication
   ```
2. Summarize key decisions:
   ```
   > Remember: we're using JWT tokens and PostgreSQL
   ```
3. Save important code snippets locally

## Performance Issues

### Slow Response Times

**Problem**: xSwarm takes too long to respond

**Solution**:

1. Check your internet connection speed
2. Try simpler, more focused requests
3. Avoid requesting too many parallel tasks
4. Use specific agents instead of general requests

### High CPU Usage

**Problem**: xSwarm consuming too much CPU

**Solution**:

1. Limit concurrent operations
2. Close other resource-intensive applications
3. Monitor system resources
4. Consider upgrading hardware

## Project-Specific Issues

### Git Integration Problems

**Problem**: Issues with Git operations

**Solution**:

1. Ensure Git is installed and configured
2. Check repository permissions
3. Verify you're in a Git repository
4. Manually resolve any Git conflicts

### File Permission Errors

**Problem**: Cannot read or write files

**Solution**:

1. Check file permissions:
   ```bash
   ls -la
   ```
2. Fix permissions if needed:
   ```bash
   chmod 644 filename
   ```
3. Ensure you're in the correct directory
4. Run xSwarm with appropriate permissions

### Framework Compatibility

**Problem**: Generated code doesn't work with your framework

**Solution**:

1. Specify your framework version:
   ```
   > I'm using React 18 with TypeScript
   ```
2. Mention any special configurations
3. Provide example code from your project
4. Ask for framework-specific implementations

## Best Practices for Avoiding Issues

### 1. Clear Communication

- Be specific about requirements
- Provide context and constraints
- Mention technology versions

### 2. Incremental Development

- Start with small tasks
- Test each component
- Build complexity gradually

### 3. Regular Saves

- Save important code locally
- Use version control
- Document key decisions

### 4. Environment Consistency

- Document your setup
- Use consistent versions
- Maintain clean dependencies

## Getting Help

### Community Support

1. **GitHub Issues**: [Report bugs](https://github.com/chadananda/xswarm/issues)
2. **Discussions**: [Ask questions](https://github.com/chadananda/xswarm/discussions)
3. **Documentation**: Review our [comprehensive docs](/docs)

### Direct Support

- **Email**: chadananda@gmail.com
- **Twitter**: [@xswarmai](https://twitter.com/xswarmai)

### Debug Mode

Enable debug mode for more information:

```bash
DEBUG=xswarm* xswarm
```

### Logs

Check logs for detailed error information:

```bash
cat ~/.xswarm/logs/xswarm.log
```

## Common Error Messages

### "Rate limit exceeded"

Wait a few minutes before trying again, or upgrade your API plan.

### "Context too long"

Break your request into smaller parts or start a new session.

### "Network error"

Check your internet connection and firewall settings.

### "Invalid project structure"

Ensure you're in a valid project directory with proper structure.

## Next Steps

- Review [Best Practices](/docs/best-practices)
- Explore [Advanced Features](/docs/advanced-features)
- Join our [Community](https://github.com/chadananda/xswarm/discussions)
