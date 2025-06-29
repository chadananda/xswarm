import 'dotenv/config';
import OpenAI from 'openai';
import sharp from 'sharp';
// import fs from 'fs/promises'; // Unused - commented out
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Logo configurations
const logoPrompt = `A modern, minimalist logo for XSwarm - an AI development platform. The logo should feature:
- Abstract geometric representation of a swarm pattern (interconnected nodes or hexagonal cells)
- Clean, tech-forward design suitable for a developer tool
- Primary colors: vibrant blue (#3B82F6) and purple (#8B5CF6) gradient
- White background for versatility
- Simple enough to work as a small favicon
- Professional and memorable
- Slight 3D depth or glow effect
- Symmetrical design
- No text, just the icon
Style: Modern tech logo, minimalist, geometric, professional`;

async function generateLogo() {
  console.log('🎨 Generating XSwarm logo...');
  
  try {
    // Generate logo with DALL-E 3
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: logoPrompt,
      n: 1,
      size: '1024x1024', // Square for logo
      quality: 'hd',
      style: 'vivid'
    });
    
    const imageUrl = response.data[0].url;
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Save the original high-res logo
    const publicDir = path.join(__dirname, '..', 'public');
    const originalPath = path.join(publicDir, 'xswarm-logo-original.png');
    
    await sharp(buffer)
      .png()
      .toFile(originalPath);
    
    console.log('✅ Generated original logo');
    
    // Generate various sizes
    const sizes = [
      { size: 512, name: 'xswarm-logo-512.png' },
      { size: 256, name: 'xswarm-logo-256.png' },
      { size: 192, name: 'xswarm-logo-192.png' },
      { size: 128, name: 'xswarm-logo-128.png' },
      { size: 64, name: 'xswarm-logo-64.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 16, name: 'favicon-16x16.png' }
    ];
    
    for (const { size, name } of sizes) {
      await sharp(buffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`✅ Generated ${name}`);
    }
    
    // Generate the main xswarm.png (replacing the current one)
    await sharp(buffer)
      .resize(256, 256, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'xswarm.png'));
    
    console.log('✅ Updated main xswarm.png');
    
    // Generate favicon.ico (multi-resolution)
    await sharp(buffer)
      .resize(48, 48, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ Generated favicon.ico');
    
    // Generate Apple Touch Icon
    await sharp(buffer)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    console.log('✅ Generated apple-touch-icon.png');
    
    // Generate SVG version by saving as high-quality PNG for now
    // (We can't convert to true SVG, but we save a high-res version)
    await sharp(buffer)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'xswarm-logo.png'));
    
    console.log('✅ Generated high-res logo');
    
    // Generate social media preview image
    await sharp(buffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 59, g: 130, b: 246, alpha: 1 } // Blue background
      })
      .composite([{
        input: await sharp(buffer)
          .resize(400, 400)
          .toBuffer(),
        gravity: 'center'
      }])
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'og-image.jpg'));
    
    console.log('✅ Generated social media preview image');
    
  } catch (error) {
    console.error('❌ Error generating logo:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting logo generation...\n');
  
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.error('Please add OPENAI_API_KEY to your .env file in the website directory');
    process.exit(1);
  }
  
  await generateLogo();
  
  console.log('\n✨ Logo generation complete!');
  console.log('\nGenerated files:');
  console.log('- xswarm.png (main logo, 256x256)');
  console.log('- xswarm-logo-original.png (original high-res)');
  console.log('- xswarm-logo-512.png, -256.png, -192.png, -128.png, -64.png');
  console.log('- favicon.ico, favicon-32x32.png, favicon-16x16.png');
  console.log('- apple-touch-icon.png (for iOS)');
  console.log('- og-image.jpg (for social media previews)');
}

// Run the script
main().catch(console.error);