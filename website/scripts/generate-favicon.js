import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicons() {
  const svgPath = join(__dirname, '../public/xswarm.svg');
  const publicDir = join(__dirname, '../public');
  
  // Read the SVG file
  const svgBuffer = await fs.readFile(svgPath);
  
  // Generate different favicon sizes
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 64, name: 'favicon-64x64.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];
  
  console.log('Generating favicons from xswarm.svg...');
  
  for (const { size, name } of sizes) {
    const outputPath = join(publicDir, name);
    
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
      
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }
  
  // Also generate a .ico file with multiple sizes
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map(size => 
      sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer()
    )
  );
  
  console.log('✓ Generated favicon.ico (16x16, 32x32, 48x48)');
  console.log('\nFavicon generation complete!');
}

generateFavicons().catch(console.error);