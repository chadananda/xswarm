#!/usr/bin/env node
// build.js - Build both CLI and website in parallel for better performance

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

console.log('🔨 Building XSwarm...\n');

// Helper function to run build command
const runBuild = (name, dir) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(dir)) {
      reject(new Error(`Directory not found: ${dir}`));
      return;
    }

    console.log(`📦 Building ${name}...`);
    const child = spawn('npm', ['run', 'build'], {
      cwd: dir,
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${name} built successfully\n`);
        resolve();
      } else {
        reject(new Error(`${name} build failed with code ${code}`));
      }
    });

    child.on('error', reject);
  });
};

// Run builds in parallel
Promise.all([runBuild('CLI', join(rootDir, 'cli')), runBuild('Website', join(rootDir, 'website'))])
  .then(() => {
    console.log('🎉 Build complete!');
  })
  .catch((error) => {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  });
