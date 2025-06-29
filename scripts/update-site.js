#!/usr/bin/env node
// update-site.js - Manual website deployment (backup option)

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, writeFileSync } from 'fs';
// import { promisify } from 'util'; // Unused - commented out

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Promisify spawn for async/await
const execCommand = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, options);
    let stdout = '';
    let stderr = '';
    
    if (proc.stdout) {
      proc.stdout.on('data', (data) => { stdout += data; });
    }
    if (proc.stderr) {
      proc.stderr.on('data', (data) => { stderr += data; });
    }
    
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      } else {
        resolve(stdout.trim());
      }
    });
    
    proc.on('error', reject);
  });
};

const deploy = async () => {
  console.log('🚀 Deploying website to GitHub Pages...\n');
  
  try {
    // Build website first
    console.log('🔨 Building website...');
    await execCommand('npm', ['run', 'build:website'], { 
      cwd: rootDir, 
      stdio: 'inherit' 
    });
    
    const distPath = join(rootDir, 'website', 'dist');
    if (!existsSync(distPath)) {
      throw new Error('Build failed - dist directory not found');
    }
    
    // Create CNAME file
    writeFileSync(join(distPath, 'CNAME'), 'xswarm.ai');
    
    // Create .nojekyll file to allow _astro directory
    writeFileSync(join(distPath, '.nojekyll'), '');
    
    // Deploy using git
    console.log('\n📤 Deploying to website branch...');
    
    // Get remote URL safely
    const remoteUrl = await execCommand('git', ['remote', 'get-url', 'origin'], {
      cwd: rootDir,
      encoding: 'utf8'
    });
    
    // Initialize git in dist directory
    await execCommand('git', ['init'], { cwd: distPath, stdio: 'inherit' });
    await execCommand('git', ['add', '-A'], { cwd: distPath, stdio: 'inherit' });
    await execCommand('git', ['commit', '-m', 'Deploy website'], { 
      cwd: distPath, 
      stdio: 'inherit' 
    });
    await execCommand('git', ['branch', '-M', 'website'], { 
      cwd: distPath, 
      stdio: 'inherit' 
    });
    await execCommand('git', ['remote', 'add', 'origin', remoteUrl], { 
      cwd: distPath, 
      stdio: 'inherit' 
    });
    await execCommand('git', ['push', '-f', 'origin', 'website'], { 
      cwd: distPath, 
      stdio: 'inherit' 
    });
    
    console.log('\n✅ Website deployed successfully!');
    console.log('🌐 View at: https://xswarm.ai');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
};

// Run deployment
deploy();