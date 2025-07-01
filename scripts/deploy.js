#!/usr/bin/env node
// deploy.js - Full deployment orchestration

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('🚀 Deploying XSwarm (CLI + Website)...\n');

try {
  // Build everything first
  console.log('🔨 Building all packages...');
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

  // Deploy CLI
  console.log('\n📦 Publishing CLI...');
  execSync('node scripts/deploy-cli.js', { cwd: rootDir, stdio: 'inherit' });

  // Deploy website
  console.log('\n🌐 Deploying website...');
  execSync('node scripts/update-site.js', { cwd: rootDir, stdio: 'inherit' });

  console.log('\n🎉 Full deployment complete!');
  console.log('📦 CLI: npm install -g xswarm');
  console.log('🌐 Website: https://xswarm.ai');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
