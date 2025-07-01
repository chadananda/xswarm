import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AGENT_DATA } from './agent-data.js';
// Initialize
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Convert agent data to avatar configurations
const AGENT_AVATARS = [];
// Process each category
Object.entries(AGENT_DATA).forEach(([, data]) => {
  data.agents.forEach((agent) => {
    let prompt = '';

    // Create specific prompts based on role
    switch (agent.role) {
      // Planning & Product
      case 'Product Manager':
        prompt =
          'Cyberpunk character portrait: Professional person with sleek violet hair, wearing a high-tech business suit with LED accents. Holographic product roadmaps float in the background. Augmented reality glasses displaying metrics. Confident expression, facing slightly toward camera. Neural interface ports visible on temple.';
        break;
      case 'Business Analyst':
        prompt =
          'Cyberpunk character portrait: Analytical person with emerald green hair in a professional cut, wearing smart glasses projecting data. Holographic interview screens surrounding them. Neural headset for stakeholder analysis. Thoughtful expression, profile view. Glowing data streams in background.';
        break;
      case 'UX/UI Designer':
        prompt =
          'Cyberpunk character portrait: Creative person with rainbow gradient hair, wearing designer clothing with holographic fabric. Manipulating floating UI elements with gesture controls. Stylus pen that projects interfaces. Artistic expression, profile angle. Neon color palette surrounding them.';
        break;
      case 'UX Researcher':
        prompt =
          'Cyberpunk character portrait: Empathetic person with silver hair, wearing lab coat with embedded sensors. Biometric scanner headset analyzing user emotions. Holographic user behavior patterns floating nearby. Understanding expression, slight profile. Soft blue ambient lighting.';
        break;
      case 'System Architect':
        prompt =
          'Cyberpunk character portrait: Technical person with blue-tinted hair, wearing structured jacket with circuit board patterns. Holographic system blueprints floating around. AR construction tools in hand. Focused expression, profile view. Complex architectural diagrams glowing in background.';
        break;
      case 'Technical Lead':
        prompt =
          'Cyberpunk character portrait: Experienced person with platinum hair, wearing command jacket with team lead insignia. Multiple code screens orbiting around them. Neural link coordinating team efforts. Decisive expression, three-quarter profile. Leadership aura with golden accent lights.';
        break;

      // Core Development
      case 'Frontend Developer':
        prompt =
          'Cyberpunk character portrait: Creative coder with neon pink hair styled asymmetrically, wearing a hoodie with animated LED panels. Holographic UI components floating around. RGB keyboard reflecting on face. Focused expression, profile angle. Colorful interface designs in background.';
        break;
      case 'Backend Developer':
        prompt =
          'Cyberpunk character portrait: Technical person with deep purple undercut hairstyle, wearing dark tech wear with server status displays. Terminal windows with green text surrounding them. Cable management aesthetic. Concentrated look, side profile. Data center ambiance.';
        break;
      case 'Full-Stack Developer':
        prompt =
          'Cyberpunk character portrait: Versatile developer with split-dyed hair (pink and blue), wearing modular clothing with swappable tech accessories. Both frontend and backend interfaces visible. Dual monitor setup reflected in eyes. Confident expression, three-quarter view.';
        break;
      case 'Mobile Developer':
        prompt =
          'Cyberpunk character portrait: Modern coder with electric blue hair, wearing smart jacket with device holders. Multiple phones and tablets floating with AR displays. Touch gesture controls visible. Dynamic pose, profile view. App interfaces glowing around.';
        break;
      case 'Senior Developer':
        prompt =
          'Cyberpunk character portrait: Experienced programmer with white hair with green LED highlights, wearing veteran developer gear with patches. Mechanical keyboard with custom keys. Multiple monitors reflected in glasses. Wise expression, slight profile. Years of code visible in background.';
        break;

      // Quality & Testing
      case 'QA Engineer':
        prompt =
          'Cyberpunk character portrait: Detail-oriented tester with crimson red hair in a neat style, wearing QA specialist gear with bug tracking displays. Scanning interfaces for defects visible. Testing tools in hand. Alert expression, profile view. Error logs floating in red.';
        break;
      case 'Automation Test Engineer':
        prompt =
          'Cyberpunk character portrait: Technical person with copper-colored hair, wearing automation engineer outfit with robot assistant. Test scripts running on multiple screens. Automated testing bots visible. Efficient expression, side angle. Green test passes glowing.';
        break;
      case 'Performance Test Engineer':
        prompt =
          'Cyberpunk character portrait: Speed specialist with yellow hair with lightning patterns, wearing performance monitoring gear. Real-time metrics displays surrounding. Stopwatch and gauges visible. Intense focus, profile shot. Performance graphs in background.';
        break;
      case 'Security Tester':
        prompt =
          'Cyberpunk character portrait: Ethical hacker with black hair with red streaks, wearing stealth tech clothing. Penetration testing tools displayed. Security vulnerabilities highlighted in red. Sharp gaze, three-quarter profile. Dark web aesthetic.';
        break;
      case 'UAT Specialist':
        prompt =
          'Cyberpunk character portrait: User-focused tester with warm amber hair, wearing approachable tech attire. User feedback screens visible. Testing with real users shown. Patient expression, slight profile. Friendly blue accent lighting.';
        break;

      // Operations & Infrastructure
      case 'DevOps Engineer':
        prompt =
          'Cyberpunk character portrait: Operations expert with steel gray hair in military cut, wearing tactical vest with deployment status badges. Container orchestration displays visible. Pipeline monitors surrounding. Command presence, profile angle. Green deployment lights.';
        break;
      case 'Site Reliability Engineer':
        prompt =
          'Cyberpunk character portrait: Reliability guardian with white hair with neon accents, wearing SRE gear with uptime displays. System health monitors glowing green. Alert systems visible. Vigilant expression, side profile. 24/7 monitoring screens.';
        break;
      case 'Cloud Architect':
        prompt =
          'Cyberpunk character portrait: Infrastructure designer with cloud-white hair with blue tips, wearing architect attire with cloud provider logos. Floating server architecture diagrams. AWS/Azure/GCP interfaces visible. Visionary look, three-quarter angle.';
        break;
      case 'Database Administrator':
        prompt =
          'Cyberpunk character portrait: Data guardian with crystalline silver hair, wearing DBA specialist clothing with query optimization displays. Database schemas floating around. SQL commands visible. Careful expression, profile view. Data crystal aesthetic.';
        break;
      case 'Security Engineer':
        prompt =
          'Cyberpunk character portrait: Cyber defender with silver hair with security badges, wearing armored tech gear with firewall displays. Security protocols active. Encryption visualizations. Protective stance, side angle. Blue security scanning lights.';
        break;

      // Specialized Development
      case 'Data Engineer':
        prompt =
          'Cyberpunk character portrait: Data specialist with flowing teal hair, wearing engineer gear with data flow visualizations. Pipeline architectures glowing around. ETL processes visible. Orchestrating expression, profile view. Stream of data in background.';
        break;
      case 'Machine Learning Engineer':
        prompt =
          'Cyberpunk character portrait: AI specialist with neural-network pattern dyed hair, wearing ML researcher attire with model accuracy displays. Training neural networks visible. TensorFlow/PyTorch logos. Teaching pose, three-quarter angle. AI visualizations.';
        break;
      case 'API Developer':
        prompt =
          'Cyberpunk character portrait: Integration expert with multicolor braided hair, wearing connectivity gear with endpoint mappings. API documentation floating. RESTful designs visible. Connecting gesture, side profile. Network diagrams glowing.';
        break;
      case 'Technical Writer':
        prompt =
          'Cyberpunk character portrait: Documentation specialist with ink-black hair with gold streaks, wearing writer attire with floating text displays. Code being translated to docs. Markdown visible. Writing pose, profile angle. Documentation holograms.';
        break;
      case 'Developer Advocate':
        prompt =
          'Cyberpunk character portrait: Community leader with vibrant orange hair, wearing speaker gear with conference badges. Developer community visualized. Speaking gesture visible. Inspiring expression, three-quarter view. Audience holograms.';
        break;

      // Content & Creative
      case 'Content Strategist':
        prompt =
          'Cyberpunk character portrait: Strategy expert with structured purple hair in professional style, wearing planner attire with content calendars. User journey maps floating. Editorial planning visible. Thoughtful look, profile view. Content workflows displayed.';
        break;
      case 'Copywriter':
        prompt =
          'Cyberpunk character portrait: Creative writer with ink-flow effect hair, wearing artistic clothing with word clouds. Persuasive copy floating around. Typewriter hologram visible. Creative expression, side angle. Words transforming to emotions.';
        break;
      case 'Technical Content Writer':
        prompt =
          'Cyberpunk character portrait: Tech writer with binary-patterned hair highlights, wearing documentation specialist gear. Code to prose translations visible. API docs floating. Explaining gesture, three-quarter profile. Technical diagrams simplified.';
        break;
      case 'Video Content Creator':
        prompt =
          'Cyberpunk character portrait: Video producer with holographic shimmer hair, wearing creator gear with camera rigs. Multiple video feeds visible. Editing timeline shown. Director pose, profile angle. Studio lights reflecting.';
        break;
      case 'Graphic Designer':
        prompt =
          'Cyberpunk character portrait: Visual designer with CMYK gradient hair, wearing designer clothing with color theory displays. Design tools floating. Adobe Creative Suite visible. Artistic expression, side view. Color palettes surrounding.';
        break;
      case 'Motion Graphics Designer':
        prompt =
          'Cyberpunk character portrait: Animation specialist with flowing gradient hair that moves, wearing motion designer attire. After Effects compositions visible. Keyframes floating. Dynamic pose, three-quarter angle. Animated elements surrounding.';
        break;

      // Digital Marketing
      case 'SEO Specialist':
        prompt =
          'Cyberpunk character portrait: Search optimization expert with keyword-green hair, wearing SEO specialist gear with ranking displays. SERP results floating. Keyword research visible. Analytical expression, profile view. Google algorithm visualizations.';
        break;
      case 'SEM/PPC Manager':
        prompt =
          'Cyberpunk character portrait: Paid ads specialist with gold-tinted hair, wearing campaign manager attire with ROI displays. Ad performance metrics visible. Budget allocations shown. Strategic look, side angle. Campaign dashboards glowing.';
        break;
      case 'Social Media Manager':
        prompt =
          'Cyberpunk character portrait: Social media expert with trending-pink hair, wearing influencer-style gear with engagement metrics. Platform icons orbiting. Viral content visible. Creative pose, three-quarter profile. Social feeds displayed.';
        break;
      case 'Community Manager':
        prompt =
          'Cyberpunk character portrait: Community builder with community-purple hair, wearing approachable tech wear with member badges. Forum discussions visible. Community metrics shown. Welcoming expression, slight profile. Connection networks.';
        break;
      case 'Influencer Marketing Manager':
        prompt =
          'Cyberpunk character portrait: Partnership specialist with network-blue hair, wearing collaboration gear with influencer profiles. Partnership deals visible. Reach metrics displayed. Networking pose, profile angle. Influencer connections.';
        break;

      // Email & Automation
      case 'Email Marketing Manager':
        prompt =
          'Cyberpunk character portrait: Email specialist with silver-white hair, wearing marketing gear with open rate displays. Email templates floating. A/B test results visible. Composing expression, profile view. Inbox visualizations glowing.';
        break;
      case 'Marketing Automation Specialist':
        prompt =
          'Cyberpunk character portrait: Automation expert with circuit-pattern dyed hair, wearing workflow designer attire. Marketing funnels visible. Automation sequences shown. Building gesture, side angle. Flowchart holograms surrounding.';
        break;
      case 'CRM Manager':
        prompt =
          'Cyberpunk character portrait: Customer data specialist with connection-blue hair, wearing CRM administrator gear. Customer profiles floating. Relationship mappings visible. Organizing pose, three-quarter view. Database connections displayed.';
        break;

      // Analytics & Growth
      case 'Marketing Analyst':
        prompt =
          'Cyberpunk character portrait: Data analyst with graph-pattern hair design, wearing analytics gear with dashboard displays. Data visualizations floating. Insights highlighted. Analytical expression, profile angle. Metrics holographically displayed.';
        break;
      case 'Growth Hacker':
        prompt =
          'Cyberpunk character portrait: Growth specialist with exponential-curve styled hair, wearing hacker attire with experiment results. Viral coefficients visible. Growth charts shown. Experimental look, side view. A/B test variations.';
        break;
      case 'CRO Specialist':
        prompt =
          'Cyberpunk character portrait: Conversion expert with funnel-inspired hair styling, wearing optimization gear with heatmap displays. User flows visible. Conversion rates shown. Improving gesture, three-quarter angle. UX improvements highlighted.';
        break;
      case 'Product Marketing Manager':
        prompt =
          'Cyberpunk character portrait: Product positioning expert with sleek corporate hair, wearing PMM attire with market analysis. Product-market fit visualized. Positioning maps shown. Strategic expression, profile view. Competitive landscape displayed.';
        break;

      // PR & Communications
      case 'PR Manager':
        prompt =
          'Cyberpunk character portrait: Public relations expert with sleek black hair, wearing PR professional attire with media badges. Press releases floating. Media contacts visible. Managing expression, profile angle. News feeds displayed.';
        break;
      case 'Communications Director':
        prompt =
          'Cyberpunk character portrait: Communications leader with broadcast-inspired wavy hair, wearing director attire with channel controls. Message coordination visible. Channel strategies shown. Directing pose, three-quarter view. Communication flows.';
        break;
      case 'Brand Manager':
        prompt =
          'Cyberpunk character portrait: Brand guardian with logo-inspired consistent hair color, wearing brand management gear. Style guides floating. Brand elements visible. Protective stance, side profile. Brand consistency visualized.';
        break;
      case 'Event Marketing Manager':
        prompt =
          'Cyberpunk character portrait: Event specialist with festive multicolor hair, wearing event coordinator gear with schedule displays. Event layouts visible. Attendee flows shown. Planning expression, profile view. Virtual event spaces.';
        break;

      // Sales Support
      case 'Sales Enablement Manager':
        prompt =
          'Cyberpunk character portrait: Sales trainer with motivational gold-tinted hair, wearing enablement specialist gear. Sales tools displayed. Training materials visible. Empowering pose, three-quarter angle. Team performance metrics shown.';
        break;
      case 'Lead Generation Specialist':
        prompt =
          'Cyberpunk character portrait: Lead gen expert with magnetic silver hair, wearing prospecting gear with lead scoring displays. Prospect profiles floating. Funnel metrics visible. Hunting expression, profile view. Lead magnetism visualized.';
        break;

      default:
        prompt = `Cyberpunk character portrait: ${agent.role} specialist with unique colored hair, wearing role-appropriate tech gear. Professional tools visible. Focused expression, profile angle. Holographic work environment.`;
    }

    AGENT_AVATARS.push({
      name: agent.title.toLowerCase().replace(/\s+/g, '-'),
      title: agent.title,
      role: agent.role,
      prompt:
        prompt +
        ' Highly detailed face, epic lighting, professional portrait, game character art style.',
    });
  });
});
// Base style for all avatars - consistent cyberpunk profile portraits
const AVATAR_STYLE = `Cyberpunk character portrait, profile view facing slightly toward camera, 
consistent lighting and composition, neon-lit background with holographic elements, 
highly detailed face and hair, professional digital art, square format 1024x1024, 
dark atmospheric mood with cyan and magenta accent lighting, photorealistic style`;
async function generateAvatar(agent) {
  try {
    console.log(`Generating avatar for ${agent.title} (${agent.role})...`);

    const fullPrompt = agent.prompt + ' ' + AVATAR_STYLE;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid',
    });
    const imageUrl = response.data[0].url;
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();

    // Save to website public directory
    const outputPath = path.join(
      __dirname,
      '..',
      'website',
      'public',
      'agents',
      `${agent.name}.png`
    );
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, Buffer.from(buffer));

    console.log(`✓ Saved ${agent.name}.png`);
    return { agent: agent.name, success: true, path: `/agents/${agent.name}.png` };
  } catch (error) {
    console.error(`✗ Failed to generate ${agent.name}:`, error.message);
    return { agent: agent.name, success: false, error: error.message };
  }
}
async function generateAllAvatars() {
  console.log(`Starting avatar generation for ${AGENT_AVATARS.length} agents...\n`);

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
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Summary
  console.log('\n=== Generation Summary ===');
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`✓ Successful: ${successful}`);
  console.log(`✗ Failed: ${failed}`);

  if (successful > 0) {
    // Create a mapping file for easy reference
    const mapping = {};
    results
      .filter((r) => r.success)
      .forEach((r) => {
        mapping[r.agent] = r.path;
      });

    await fs.writeFile(
      path.join(__dirname, '..', 'website', 'public', 'agents', 'mapping.json'),
      JSON.stringify(mapping, null, 2)
    );
    console.log('\nCreated mapping.json for agent images');
  }

  if (failed > 0) {
    console.log('\nFailed avatars:');
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`- ${r.agent}: ${r.error}`);
      });
  }
}
// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllAvatars().catch(console.error);
}
