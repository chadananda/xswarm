#!/usr/bin/env node
// deploy-cli.js - Manual CLI publishing

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const cliDir = join(rootDir, 'cli');

console.log('📦 Publishing XSwarm CLI to npm...\n');

// Validate CLI directory exists
if (!existsSync(cliDir)) {
  console.error('❌ CLI directory not found:', cliDir);
  process.exit(1);
}

// Validate package.json exists
const packageJsonPath = join(cliDir, 'package.json');
if (!existsSync(packageJsonPath)) {
  console.error('❌ package.json not found in CLI directory');
  process.exit(1);
}

try {
  // Run tests first
  console.log('🧪 Running tests...');
  execSync('npm test', { cwd: cliDir, stdio: 'inherit' });

  // Get current version safely
  let currentVersion;
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    currentVersion = packageJson.version;
  } catch (err) {
    console.error('❌ Failed to read package.json:', err.message);
    process.exit(1);
  }

  console.log(`\n📌 Current version: ${currentVersion}`);

  // Check if user is logged in to npm
  try {
    execSync('npm whoami', { stdio: 'pipe' });
  } catch (err) {
    console.error('❌ Not logged in to npm. Please run: npm login');
    process.exit(1);
  }

  // Publish to npm
  console.log('\n📤 Publishing to npm...');
  execSync('npm publish', { cwd: cliDir, stdio: 'inherit' });

  console.log('\n✅ CLI published successfully!');
  console.log('🎉 Install with: npm install -g xswarm');
} catch (error) {
  console.error('❌ Publishing failed:', error.message);
  console.error('\nMake sure you are logged in to npm: npm login');
  process.exit(1);
}
