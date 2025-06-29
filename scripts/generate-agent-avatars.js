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
// Agent avatar configurations - Cyberpunk wizards
const AGENT_AVATARS = [
  // Planning & Design Phase
  {
    name: 'business-analyst',
    title: 'Business Analyst Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A mystical data oracle with glowing green runes floating around their head, wearing a high-tech hooded robe with circuit patterns. Multiple holographic interview screens orbit them like spell cards. Piercing analytical eyes that see through requirements. Magical data streams form question marks in the air. Dark noir background with matrix rain. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'ux-designer',
    title: 'UX Designer Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A creative enchanter with purple and cyan magical energy flowing from their hands, wearing designer robes with holographic trim. Multiple UI mockups float around them like enchanted paintings. Artist tools glow with mystical power. One eye has a cybernetic design scanner. Neon butterflies made of pixels surround them. Dark atmospheric background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'architect',
    title: 'Architect Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A master builder mage with glowing blue architectural runes on their forehead, wearing a coat covered in blueprint patterns. 3D holographic buildings materialize from their gesturing hands. A mystical compass and ruler float beside them. Eyes glow with structural insight. Geometric magical circles surround them. Dark tech cathedral background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  // Development Phase
  {
    name: 'code-warrior',
    title: 'Code Warrior Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A battle-hardened code sorcerer with glowing green matrix rain flowing from their eyes, wearing armor made of compiled code. Magical keyboard runes float around their hands. Lightning bolts of pure logic emanate from their fingertips. A staff made of fiber optic cables. Battle scars that glow with syntax highlighting. Dark battlefield of broken systems background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'testing-sentinel',
    title: 'Testing Sentinel Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A vigilant guardian mage with a mystical HUD visor showing test results, wearing enchanted armor with pass/fail runes. Magical test matrices orbit them like shields. One hand holds a glowing orb showing code coverage. Red and green auras indicate test status. A familiar spirit in the form of a digital owl perches nearby. Dark QA laboratory background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'bug-hunter',
    title: 'Bug Hunter Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A relentless tracker mage with a cybernetic targeting eye that sees bugs as glowing red demons, wearing a hunter\'s cloak with digital camouflage. Magical traps and snares float around them. A bow made of pure energy with arrows of debugging light. Pet digital wolf companion with glowing eyes. Trophies of squashed bugs on their belt. Dark forest of code background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'documentation-sage',
    title: 'Documentation Sage Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: An ancient knowledge keeper with glowing amber runes tattooed on their face, wearing robes made of scrolling text. Holographic books float and page themselves around them. A staff topped with a crystal that contains all documentation. Magical ink flows from their quill pen writing in the air. Spectacles that translate any code to plain language. Ancient library datacenter background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'code-review-ninja',
    title: 'Code Review Ninja Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A shadow assassin of bad code with glowing analytical eyes that see code flaws, wearing ninja gear with circuit patterns. Code fragments float around them being sliced by energy katanas. Smoke bombs that reveal hidden bugs. Shuriken made of pure criticism. A mask that shows code smell auras. Moving through shadows leaving improved code behind. Dark dojo background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'devops-commander',
    title: 'DevOps Commander Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A battle commander with deployment runes glowing on their uniform, wearing a coat with live pipeline status. Holographic battle maps show infrastructure. Commands materialize as glowing orders. A scepter that controls containers and clouds. Medals made of successful deployments. An army of container sprites at their command. War room with monitoring screens background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'security-guardian',
    title: 'Security Guardian Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A mystical protector with blue firewall runes covering their armor, wearing a cloak of encrypted shadows. Magical shields project from their hands blocking attacks. A crown of security keys. Protective wards float around them. A familiar spirit dragon made of pure encryption. Glowing tattoos that react to threats. Fortress of digital security background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'performance-optimizer',
    title: 'Performance Optimizer Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A speed demon mage with yellow lightning coursing through their veins, wearing robes that blur with motion. Performance graphs float around them like racing spirits. Hands crackling with optimization energy. A stopwatch amulet that controls time complexity. Leaving trails of golden efficiency. Formula runes for Big O notation on their arms. Blurred speed dimension background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'api-architect',
    title: 'API Architect Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A connection weaver with glowing ports embedded in their skin, wearing a vest covered in endpoint runes. Magical API contracts float like binding spells. Hands that weave data streams between services. A staff that bridges any system. REST and GraphQL familiars circling them. Webhook ravens perched on shoulders. Interconnected service mesh background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'database-sage',
    title: 'Database Sage Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A data crystal mage with cyan query streams flowing from their third eye, wearing robes embedded with schema diagrams. Crystalline data structures float and reorganize around them. Hands that shape tables with gestures. An index finger that literally creates indexes. SQL familiar spirits dancing around. Memory palace visible in their eyes. Crystal cave datacenter background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  // Marketing & Growth Phase
  {
    name: 'copywriter',
    title: 'Copywriter Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A word weaver mage with purple creative energy flowing from their mind, wearing a coat made of living stories. Magical typewriter keys float around them typing by themselves. Words transform into butterflies of persuasion. A quill that writes what people want to read. Ink that glows with emotional resonance. Books of power words orbiting. Creative dimension background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'email-marketing',
    title: 'Email Marketing Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A message enchanter with email streams flowing like neon rivers from their hands, wearing robes with inbox patterns. Campaign spirits deliver glowing envelopes. A staff topped with an @ symbol crystal. Conversion runes glow on their skin. Open rate auras visible around messages. Familiar carrier pigeons made of light. Digital post office background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'social-media',
    title: 'Social Media Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A viral summoner with social platform spirits swirling around them, wearing influencer robes with engagement runes. Hashtag spells float from their fingers. A crystal ball showing trending topics. Like and share energy crackling around them. Follower sprites as familiars. Memes materializing from thin air. Social network nexus background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'content-syndication',
    title: 'Content Syndication Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A distribution oracle with content streams branching like glowing trees from their hands, wearing a cloak of network patterns. Channel portals open around them. A staff that multiplies any content. RSS familiar birds carrying messages. Syndication runes pulsing with reach. Content echoing through dimensions. Media distribution hub background. Cinematic lighting, ultra detailed face, game character portrait style'
  },
  {
    name: 'integration-test',
    title: 'Integration Test Agent',
    prompt: 'Fantasy cyberpunk wizard portrait: A connection validator with glowing verification runes on their forehead, wearing tech shaman gear with API totems. Integration points glow like chakras. Hands weaving compatibility spells. A crystal that reveals broken connections. Test spirits probing for issues. Webhook familiar snakes. Marketing tech temple background. Cinematic lighting, ultra detailed face, game character portrait style'
  }
];
// Base style for all avatars
const AVATAR_STYLE = `Epic fantasy game character portrait, cyberpunk wizard aesthetic, 
ultra-detailed face with magical tech elements, dramatic cinematic lighting, 
dark atmospheric background, photorealistic digital art, square format, 
inspired by Magic The Gathering card art and Shadowrun, mysterious and powerful presence`;
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