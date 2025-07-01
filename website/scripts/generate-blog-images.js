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

// Define image configurations
const images = [
  {
    filename: 'getting-started-hero.jpg',
    prompt:
      'A futuristic command center interface with a developer sitting at a glowing terminal, surrounded by holographic displays showing AI agents as team members, purple and blue neon lighting, cyberpunk aesthetic, digital art style, wide aspect ratio, highly detailed, professional quality',
  },
  {
    filename: 'team-of-one-hero.jpg',
    prompt:
      'A single developer standing confidently as a leader in the center, with translucent holographic AI team members arranged around them like a superhero team, each AI agent has a different icon (architect, tester, developer, documenter), modern tech workspace background, dramatic blue and purple lighting, cinematic composition, professional digital art',
  },
  {
    filename: 'ai-workflows-hero.jpg',
    prompt:
      'Abstract visualization of interconnected AI agents working in parallel, flowing data streams between nodes, circuit board patterns, holographic interfaces, tech blueprint style with glowing connections, deep blue and purple gradient background, futuristic design, high quality digital art',
  },
  {
    filename: 'pure-functions-hero.jpg',
    prompt:
      'Clean geometric shapes and mathematical formulas representing pure functions, crystalline structures floating in digital space, minimalist design with perfect symmetry, glowing edges, blue and purple color scheme, abstract tech art, professional quality, wide aspect ratio',
  },
  {
    filename: 'marketing-developers-hero.jpg',
    prompt:
      'Split scene showing a developer coding on one side transitioning into marketing graphics and business charts on the other, bridging the gap between technical and business worlds, modern flat design with depth, purple to blue gradient transition, professional digital illustration',
  },
];

async function generateImage(prompt, filename) {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'blog');
  const outputPath = path.join(outputDir, filename);

  // Check if image already exists
  try {
    await fs.access(outputPath);
    console.log(`✓ ${filename} already exists, skipping...`);
    return;
  } catch {
    // File doesn't exist, continue with generation
  }

  console.log(`🎨 Generating ${filename}...`);

  try {
    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024', // DALL-E 3 doesn't support custom sizes, we'll resize after
      quality: 'hd',
      style: 'vivid',
    });

    const imageUrl = response.data[0].url;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Resize and optimize the image
    await sharp(buffer)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toFile(outputPath);

    console.log(`✅ Successfully generated ${filename}`);
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting blog image generation...\n');

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
    console.error('Please add OPENAI_API_KEY to your .env file in the website directory');
    process.exit(1);
  }

  // Generate all images
  for (const image of images) {
    await generateImage(image.prompt, image.filename);
    // Add a small delay between requests to be respectful to the API
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log('\n✨ Image generation complete!');
}

// Run the script
main().catch(console.error);
