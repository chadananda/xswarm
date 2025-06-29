#!/usr/bin/env node

import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Cyberpunk terminal theme constants
const CYBERPUNK_STYLE = `cyberpunk terminal aesthetic, neon green text on black background, 
matrix-style code rain, holographic displays, command line interface, retro CRT monitor effects, 
scanlines, glitch effects, ASCII art elements, terminal windows with glowing borders, 
dark atmosphere with neon accents in cyan, magenta, and green`;

// Image definitions
const images = [
  {
    name: 'xswarm-logo-cyberpunk',
    sizes: [512, 256, 192, 128, 64, 32, 16],
    prompt: `A futuristic cyberpunk logo design: hexagonal network pattern forming a swarm, 
    nodes connected by glowing neon green circuit paths, holographic effect, 
    terminal-style green glow on black background, digital rain effect in background, 
    retro-futuristic computer terminal aesthetic, ASCII-inspired geometric design`,
    style: 'logo'
  },
  {
    name: 'getting-started-hero',
    prompt: `Cyberpunk developer at a futuristic terminal setup: multiple holographic screens 
    showing glowing green code, matrix-style digital rain, neon-lit keyboard with mechanical keys, 
    dark room illuminated only by screen glow, terminal windows floating in 3D space, 
    command prompts visible, ASCII art decorations on screens, retro CRT effects`,
    path: 'images/blog/'
  },
  {
    name: 'team-of-one-hero',
    prompt: `Solo developer commanding AI agents visualized as glowing holographic terminals: 
    central figure silhouetted against multiple floating terminal windows, each showing different 
    AI agent roles (ARCHITECT, TESTER, DEVELOPER) in neon text, matrix code rain connecting 
    the terminals, cyberpunk command center aesthetic, green/cyan/magenta color scheme`,
    path: 'images/blog/'
  },
  {
    name: 'ai-workflows-hero',
    prompt: `Abstract visualization of AI workflow as cyberpunk terminal network: interconnected 
    terminal windows showing data flow, neon green code streams between nodes, circuit board 
    patterns, holographic displays with command line interfaces, glitch effects, ASCII flowcharts, 
    matrix-style background, retro computer aesthetic with modern twist`,
    path: 'images/blog/'
  },
  {
    name: 'pure-functions-hero',
    prompt: `Cyberpunk visualization of pure functions: glowing neon lambda symbols floating 
    in terminal space, input/output data streams as matrix code, function signatures in green 
    monospace font, holographic code blocks, circuit pathways showing data flow, 
    no side effects visualized as isolated terminal windows, retro programming aesthetic`,
    path: 'images/blog/'
  },
  {
    name: 'marketing-developers-hero',
    prompt: `Futuristic marketing displays for developers: holographic terminal advertisements, 
    neon-lit billboards showing code snippets, cyberpunk cityscape with terminal windows as 
    building facades, matrix rain on digital displays, ASCII art advertisements, 
    command prompt style marketing messages, green/cyan glow aesthetic`,
    path: 'images/blog/'
  },
  {
    name: 'og-image',
    prompt: `XSwarm branding in cyberpunk terminal style: large glowing logo centered on black 
    background, matrix code rain effect, terminal window frame with glowing green borders, 
    scanline effects, "XSWARM.AI" in retro computer font with neon glow, circuit patterns 
    in background, holographic shimmer effect, command prompt cursor blinking`,
    dimensions: '1200x630'
  }
];

async function generateImage(imageConfig) {
  try {
    console.log(`Generating ${imageConfig.name}...`);
    
    const fullPrompt = `${imageConfig.prompt}. Style: ${CYBERPUNK_STYLE}. 
    High quality, detailed, cinematic lighting, 4K resolution.`;
    
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: imageConfig.dimensions || '1024x1024',
      quality: 'hd',
      style: 'vivid'
    });

    const imageUrl = response.data[0].url;
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    
    // Handle different image types
    if (imageConfig.style === 'logo' && imageConfig.sizes) {
      // For logos, we'll save the original and note that resizing is needed
      const outputPath = path.join(__dirname, '../website/public', `${imageConfig.name}.png`);
      await fs.writeFile(outputPath, Buffer.from(buffer));
      console.log(`✓ Saved ${imageConfig.name}.png (resize variants needed)`);
      
      // Create a note about resizing
      console.log(`  Note: Resize to ${imageConfig.sizes.join(', ')}px variants`);
    } else {
      // For regular images
      const basePath = imageConfig.path || '';
      const outputPath = path.join(__dirname, '../website/public', basePath, `${imageConfig.name}.jpg`);
      
      // Ensure directory exists
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, Buffer.from(buffer));
      console.log(`✓ Saved ${basePath}${imageConfig.name}.jpg`);
    }
    
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error(`✗ Error generating ${imageConfig.name}:`, error);
  }
}

async function main() {
  console.log('🚀 Starting Cyberpunk Terminal Image Generation...\n');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    process.exit(1);
  }
  
  for (const image of images) {
    await generateImage(image);
  }
  
  console.log('\n✨ Cyberpunk image generation complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Resize logo variants using an image editor');
  console.log('2. Optimize images for web (compress JPGs)');
  console.log('3. Update favicon files from new logo');
}

main().catch(console.error);