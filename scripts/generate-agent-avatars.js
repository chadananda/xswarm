import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// Initialize
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Agent avatar configurations
const AGENT_AVATARS = [
  // Planning & Design Phase
  {
    name: 'business-analyst',
    title: 'Business Analyst Agent',
    prompt: 'Cyberpunk avatar: hooded figure with glowing holographic interview screens floating around them, neon green data streams, asking questions, dark background'
  },
  {
    name: 'ux-designer',
    title: 'UX Designer Agent',
    prompt: 'Cyberpunk avatar: creative figure with multiple floating holographic UI mockups, purple and cyan neon accents, design tools glowing, dark tech environment'
  },
  {
    name: 'architect',
    title: 'Architect Agent',
    prompt: 'Cyberpunk avatar: strategic figure with 3D holographic system blueprints, interconnected nodes glowing in blue, building structures in cyberspace'
  },
  // Development Phase
  {
    name: 'code-warrior',
    title: 'Code Warrior Agent',
    prompt: 'Cyberpunk avatar: elite coder with glowing keyboard, matrix-like code rain, neon green text flowing, combat-ready stance, dark hood'
  },
  {
    name: 'testing-sentinel',
    title: 'Testing Sentinel Agent',
    prompt: 'Cyberpunk avatar: vigilant figure with targeting HUD visor, test matrices floating around, red and green status lights, analytical pose'
  },
  {
    name: 'bug-hunter',
    title: 'Bug Hunter Agent',
    prompt: 'Cyberpunk avatar: hunter with cybernetic targeting eye, tracking bugs as glowing red targets, tactical gear, predator stance'
  },
  {
    name: 'documentation-sage',
    title: 'Documentation Sage Agent',
    prompt: 'Cyberpunk avatar: wise figure with floating holographic books and scrolls, knowledge streams in amber light, scholarly cyberpunk aesthetic'
  },
  {
    name: 'code-review-ninja',
    title: 'Code Review Ninja Agent',
    prompt: 'Cyberpunk avatar: stealthy ninja with glowing analytical eyes, code fragments being dissected in mid-air, sharp focus, dark silhouette'
  },
  {
    name: 'devops-commander',
    title: 'DevOps Commander Agent',
    prompt: 'Cyberpunk avatar: commanding figure with deployment pipelines visualized as neon pathways, control panels floating, military bearing'
  },
  {
    name: 'security-guardian',
    title: 'Security Guardian Agent',
    prompt: 'Cyberpunk avatar: armored guardian with shield projections, firewall visualizations, protective stance, blue security scanners'
  },
  {
    name: 'performance-optimizer',
    title: 'Performance Optimizer Agent',
    prompt: 'Cyberpunk avatar: speed-focused figure with lightning effects, performance graphs floating, yellow energy trails, dynamic pose'
  },
  {
    name: 'api-architect',
    title: 'API Architect Agent',
    prompt: 'Cyberpunk avatar: connector figure with glowing interface ports, API endpoints as neon connection points, network visualization'
  },
  {
    name: 'database-sage',
    title: 'Database Sage Agent',
    prompt: 'Cyberpunk avatar: data master with crystalline data structures floating, query streams in cyan, organized data visualization'
  },
  // Marketing & Growth Phase
  {
    name: 'copywriter',
    title: 'Copywriter Agent',
    prompt: 'Cyberpunk avatar: creative writer with holographic typewriter, glowing words floating in air, purple creative energy, inspired pose'
  },
  {
    name: 'email-marketing',
    title: 'Email Marketing Agent',
    prompt: 'Cyberpunk avatar: communications specialist with email streams visualized as neon messages, campaign metrics floating, connected network'
  },
  {
    name: 'social-media',
    title: 'Social Media Agent',
    prompt: 'Cyberpunk avatar: connected figure with multiple social platform holograms orbiting, viral patterns visualized, engagement metrics glowing'
  },
  {
    name: 'content-syndication',
    title: 'Content Syndication Agent',
    prompt: 'Cyberpunk avatar: distributor figure with content flowing through multiple neon channels, network nodes pulsing, spreading influence'
  },
  {
    name: 'integration-test',
    title: 'Integration Test Agent',
    prompt: 'Cyberpunk avatar: validator figure checking marketing tech connections, integration points glowing, verification scanners active'
  }
];
// Base style for all avatars
const AVATAR_STYLE = `Cyberpunk aesthetic, neon-lit, dark background with tech elements, 
hooded mysterious figure, glowing eyes, futuristic clothing, high contrast, 
cinematic lighting, digital art style, square format for avatar use`;
async function generateAvatar(agent) {
  try {
    console.log(`Generating avatar for ${agent.title}...`);
    
    const fullPrompt = `${agent.prompt}. ${AVATAR_STYLE}`;
    
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid'
    });
    const imageUrl = response.data[0].url;
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    
    // Save to website public directory
    const outputPath = path.join(__dirname, '..', 'website', 'public', 'agents', `${agent.name}.png`);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(buffer));
    
    console.log(`✓ Saved ${agent.name}.png`);
    return { agent: agent.name, success: true };
  } catch (error) {
    console.error(`✗ Failed to generate ${agent.name}:`, error.message);
    return { agent: agent.name, success: false, error: error.message };
  }
}
async function generateAllAvatars() {
  console.log('Starting agent avatar generation...\n');
  
  const results = [];
  
  // Process in batches to avoid rate limits
  const batchSize = 3;
  for (let i = 0; i < AGENT_AVATARS.length; i += batchSize) {
    const batch = AGENT_AVATARS.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(generateAvatar));
    results.push(...batchResults);
    
    // Wait between batches
    if (i + batchSize < AGENT_AVATARS.length) {
      console.log('\nWaiting before next batch...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Summary
  console.log('\n=== Generation Summary ===');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✓ Successful: ${successful}`);
  console.log(`✗ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed avatars:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`- ${r.agent}: ${r.error}`);
    });
  }
}
// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllAvatars().catch(console.error);
}