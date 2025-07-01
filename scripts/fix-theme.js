#!/usr/bin/env node
// fix-theme.js - Fix remaining theme issues in components

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to find all files recursively
function findFiles(dir, pattern) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findFiles(fullPath, pattern));
    } else if (item.isFile() && pattern.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Additional replacements for buttons and interactive elements
const additionalReplacements = [
  // Blue buttons
  ['bg-blue-600 hover:bg-blue-700', 'bg-brand-primary hover:bg-brand-accent'],
  ['text-white bg-blue-600', 'text-white bg-brand-primary'],

  // Hard-coded grays that were missed
  ['bg-white', 'bg-surface'],
  ['text-gray-100', 'text-primary'],
  ['text-gray-200', 'text-primary'],
  ['text-gray-300', 'text-secondary'],
  ['text-gray-400', 'text-tertiary'],
  ['text-gray-500', 'text-muted'],
  ['text-gray-600', 'text-tertiary'],
  ['text-gray-700', 'text-secondary'],
  ['text-gray-800', 'text-primary'],
  ['text-gray-900', 'text-primary'],

  // Border colors
  ['border-gray-300', 'border-border-hover'],
  ['border-gray-200', 'border-border'],

  // Special cases
  ['bg-gray-50', 'bg-surface'],
  ['bg-gray-100', 'bg-surface-hover'],
  ['bg-gray-200', 'bg-surface-active'],
];

async function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  additionalReplacements.forEach(([oldClass, newClass]) => {
    // Match whole class names only
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, newClass);
      changed = true;
    }
  });

  // Fix hardcoded white text on colored backgrounds
  content = content.replace(/text-white bg-brand-primary/g, 'text-white bg-brand-primary');

  // Ensure buttons have proper styling
  content = content.replace(
    /class="([^"]*\b)bg-blue-600(\b[^"]*)"/,
    'class="$1bg-brand-primary$2"'
  );

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

async function main() {
  console.log('Fixing remaining theme issues...\n');

  const websiteDir = path.join(__dirname, '..', 'website', 'src');
  const files = findFiles(websiteDir, /\.(astro|tsx|jsx)$/);

  let fixedCount = 0;

  for (const file of files) {
    if (await fixFile(file)) {
      fixedCount++;
    }
  }

  console.log(`\nFixed ${fixedCount} files.`);

  // Also update theme.css to ensure button colors work
  const themePath = path.join(websiteDir, 'styles', 'theme.css');
  if (fs.existsSync(themePath)) {
    let themeContent = fs.readFileSync(themePath, 'utf8');

    // Add button-specific variables if not present
    if (!themeContent.includes('--color-button-primary')) {
      const buttonVars = `
  /* Button Colors */
  --color-button-primary: rgb(var(--brand-primary));
  --color-button-primary-hover: rgb(var(--brand-accent));
  --color-button-secondary: var(--color-surface-hover);
  --color-button-secondary-hover: var(--color-surface-active);`;

      themeContent = themeContent.replace(
        '/* Status Colors */',
        `${buttonVars}\n  \n  /* Status Colors */`
      );

      fs.writeFileSync(themePath, themeContent);
      console.log('\n✓ Updated theme.css with button colors');
    }
  }
}

main().catch(console.error);
