#!/usr/bin/env node
import 'dotenv/config';
import OpenAI from 'openai';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// XSwarm brand style template from DESIGN-SYSTEM.md
const STYLE_TEMPLATE = 'in the style of Studio Ghibli meets cyberpunk meets architectural visualization. Wide cinematic shot with dramatic blue and purple lighting, holographic UI elements floating in space, circuit patterns, data streams, misty atmospheric depth, translucent geometric shapes. Technical and futuristic but with artistic sensibility. Dark background with neon accents.';

// Image generation settings
const IMAGE_CONFIG = {
  model: 'dall-e-3',
  size: '1792x1024',
  quality: 'hd',
  style: 'vivid',
  n: 1
};

// Output settings
const OUTPUT_CONFIG = {
  finalSize: { width: 1200, height: 630 },
  quality: 85,
  progressive: true
};

async function generateBlogHero(filename, imageDescription) {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'blog');
  const outputPath = path.join(outputDir, filename);

  console.log(`🎨 Generating ${filename}...`);
  console.log(`   Description: "${imageDescription}"`);

  try {
    // Combine image description with brand style
    const prompt = `${imageDescription} ${STYLE_TEMPLATE}`;

    // Generate image with DALL-E 3
    console.log('🤖 Calling DALL-E API...');
    const response = await openai.images.generate({
      ...IMAGE_CONFIG,
      prompt: prompt,
    });

    const imageUrl = response.data[0].url;
    console.log('✓ Image generated successfully');

    // Download the image
    console.log('📥 Downloading image...');
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Resize and optimize the image
    console.log('🔧 Processing and optimizing image...');
    await sharp(buffer)
      .resize(OUTPUT_CONFIG.finalSize.width, OUTPUT_CONFIG.finalSize.height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: OUTPUT_CONFIG.quality,
        progressive: OUTPUT_CONFIG.progressive,
      })
      .toFile(outputPath);

    console.log(`✅ Successfully generated ${filename}`);
    console.log(`   Path: ${outputPath}`);
    console.log(`   Dimensions: ${OUTPUT_CONFIG.finalSize.width}x${OUTPUT_CONFIG.finalSize.height}`);
    console.log(`   Quality: ${OUTPUT_CONFIG.quality}%`);
    console.log('   Format: Progressive JPEG');

  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    process.exit(1);
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
XSwarm Blog Hero Image Generator

Usage:
  node scripts/generate-blog-hero.js <filename> "<image description>"

Examples:
  node scripts/generate-blog-hero.js ai-lessons-hero.jpg "Developer surrounded by AI assistants, each speaking different languages"
  node scripts/generate-blog-hero.js token-economics-hero.jpg "Abstract visualization of tokens flowing through a complex system"

Notes:
  - Filename should end with .jpg
  - Image description should describe the scene you want
  - The XSwarm cyberpunk style is automatically applied
  - Requires OPENAI_API_KEY in .env file
    `);
    process.exit(0);
  }

  if (args.length < 2) {
    console.error('❌ Error: Please provide both filename and image description');
    console.error('   Usage: node scripts/generate-blog-hero.js <filename> "<image description>"');
    process.exit(1);
  }

  const filename = args[0];
  const imageDescription = args.slice(1).join(' ');

  // Validate filename
  if (!filename.endsWith('.jpg')) {
    console.error('❌ Error: Filename must end with .jpg');
    process.exit(1);
  }

  return { filename, imageDescription };
}

// Main function
async function main() {
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.error('Please add OPENAI_API_KEY to your .env file in the website directory');
    process.exit(1);
  }

  const { filename, imageDescription } = parseArgs();
  
  console.log('\n🚀 XSwarm Blog Hero Image Generator\n');
  
  await generateBlogHero(filename, imageDescription);
  
  console.log('\n✨ Done!\n');
}

// Run the script
main().catch(console.error);