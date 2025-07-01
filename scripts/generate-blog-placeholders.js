#!/usr/bin/env node
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articles = [
  {
    slug: 'expensive-ai-intern',
    title: 'Your AI Coding Assistant\\nis Actually a\\nVery Expensive Intern',
    color1: '#00ffff',
    color2: '#ff00ff',
  },
  {
    slug: 'sequential-hell',
    title: 'Why AI Development\\nis Still Stuck in 1995\\n(Sequential Hell Edition)',
    color1: '#ff00ff',
    color2: '#00ff00',
  },
  {
    slug: 'ai-function-graveyard',
    title: 'AI Function Graveyard:\\nWhy Multi-Pass Planning\\nCould Save Your Codebase',
    color1: '#00ff00',
    color2: '#ffff00',
  },
  {
    slug: 'sandboxed-integration',
    title: 'AI Integration Testing:\\nWhy Sandboxed Teams\\nAre the Final Boss Solution',
    color1: '#ffff00',
    color2: '#00ffff',
  },
  {
    slug: 'interactive-prototypes',
    title: 'Interactive AI Prototypes\\nvs. Static Mockups:\\nThe UX Revolution',
    color1: '#ff00ff',
    color2: '#00ff00',
  },
  {
    slug: 'marketing-during-dev',
    title: 'Why AI Marketing\\nShould Happen\\nDuring Development',
    color1: '#00ffff',
    color2: '#ff00ff',
  },
  {
    slug: 'technical-debt-antidote',
    title: 'Multi-Pass AI Planning:\\nThe Antidote to\\nTechnical Debt Poisoning',
    color1: '#00ff00',
    color2: '#ffff00',
  },
  {
    slug: 'swarm-commander',
    title: 'From AI Prompt Engineer\\nto AI Swarm Commander:\\nThe Evolution',
    color1: '#ffff00',
    color2: '#ff00ff',
  },
  {
    slug: 'three-minute-standups',
    title: 'Why AI Standups\\nAre 3 Minutes When\\nEveryone Lives in Sandboxes',
    color1: '#ff00ff',
    color2: '#00ffff',
  },
  {
    slug: 'ai-epoch-manifesto',
    title: 'The AI Epoch Manifesto:\\nRecursive Planning for\\nRecursive Intelligence',
    color1: '#00ffff',
    color2: '#00ff00',
  },
  {
    slug: 'forty-hidden-agents',
    title: 'The 40 AI Agents\\nNobody Told You About\\n(And Why You Need Them)',
    color1: '#00ff00',
    color2: '#ff00ff',
  },
  {
    slug: 'token-economics',
    title: 'Token Economics:\\nWhy Your AI is\\nBurning Money on Hello World',
    color1: '#ffff00',
    color2: '#00ffff',
  },
];

async function generatePlaceholder(article) {
  const width = 1200;
  const height = 630;

  // Create cyberpunk circuit pattern
  const circuitPattern = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${article.color1};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${article.color2};stop-opacity:0.3" />
        </linearGradient>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#0a0a0a"/>
          <circle cx="50" cy="50" r="3" fill="${article.color1}" opacity="0.5"/>
          <line x1="0" y1="50" x2="50" y2="50" stroke="${article.color1}" stroke-width="0.5" opacity="0.3"/>
          <line x1="50" y1="50" x2="100" y2="50" stroke="${article.color1}" stroke-width="0.5" opacity="0.3"/>
          <line x1="50" y1="0" x2="50" y2="50" stroke="${article.color2}" stroke-width="0.5" opacity="0.3"/>
          <line x1="50" y1="50" x2="50" y2="100" stroke="${article.color2}" stroke-width="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#0a0a0a"/>
      <rect width="${width}" height="${height}" fill="url(#circuit)"/>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Grid lines -->
      ${Array.from(
        { length: 12 },
        (_, i) => `
        <line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${height}" stroke="${article.color1}" stroke-width="0.5" opacity="0.1"/>
      `
      ).join('')}
      ${Array.from(
        { length: 7 },
        (_, i) => `
        <line x1="0" y1="${i * 100}" x2="${width}" y2="${i * 100}" stroke="${article.color2}" stroke-width="0.5" opacity="0.1"/>
      `
      ).join('')}
      
      <!-- Title background -->
      <rect x="50" y="${height / 2 - 120}" width="${width - 100}" height="240" fill="#0a0a0a" opacity="0.8" rx="10"/>
      <rect x="50" y="${height / 2 - 120}" width="${width - 100}" height="240" fill="none" stroke="${article.color1}" stroke-width="2" rx="10" opacity="0.5"/>
      
      <!-- Title text -->
      <text x="${width / 2}" y="${height / 2 - 20}" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#ffffff">
        ${article.title
          .split('\\n')
          .map((line, i) => `<tspan x="${width / 2}" dy="${i === 0 ? 0 : 40}">${line}</tspan>`)
          .join('')}
      </text>
      
      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="40" fill="none" stroke="${article.color1}" stroke-width="2" opacity="0.3"/>
      <circle cx="${width - 100}" cy="${height - 100}" r="40" fill="none" stroke="${article.color2}" stroke-width="2" opacity="0.3"/>
    </svg>
  `;

  const outputPath = path.join(
    __dirname,
    '..',
    'website',
    'public',
    'images',
    'blog',
    `${article.slug}-hero.jpg`
  );

  await sharp(Buffer.from(circuitPattern)).jpeg({ quality: 90 }).toFile(outputPath);

  console.log(`Generated: ${article.slug}-hero.jpg`);
}

async function main() {
  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'website', 'public', 'images', 'blog');
  await fs.mkdir(outputDir, { recursive: true });

  // Generate all placeholders
  for (const article of articles) {
    await generatePlaceholder(article);
  }

  console.log('All placeholder images generated!');
}

main().catch(console.error);
