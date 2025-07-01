#!/usr/bin/env node
// dev.js - Development environment setup

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('🚀 Starting XSwarm development environment...\n');

// Start website development server
const websiteProcess = spawn('npm', ['run', 'dev'], {
  cwd: join(rootDir, 'website'),
  stdio: 'inherit',
});

// Link CLI for local testing
const linkProcess = spawn('npm', ['link'], {
  cwd: join(rootDir, 'cli'),
  stdio: 'inherit',
});

linkProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ CLI linked successfully. You can now run "xswarm" locally.');
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Stopping development environment...');
  websiteProcess.kill();
  process.exit(0);
});
