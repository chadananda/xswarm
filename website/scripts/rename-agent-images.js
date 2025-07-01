import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping from old title-based names to new role-based names
const renameMap = {
  // Planning & Product
  'vision-oracle-prime.png': 'product-manager.png',
  'requirements-diviner.png': 'business-analyst.png',
  'interface-conjurer-supreme.png': 'ux-ui-designer.png',
  'user-mind-reader.png': 'ux-researcher.png',
  'grand-infrastructure-sage.png': 'system-architect.png',
  'technical-pathfinder.png': 'technical-lead.png',

  // Core Development
  'frontend-artificer.png': 'frontend-developer.png',
  'backend-sorcerer.png': 'backend-developer.png',
  'full-stack-warmaster.png': 'full-stack-developer.png',
  'mobile-enchanter.png': 'mobile-developer.png',
  'code-battle-artificer.png': 'senior-developer.png',

  // Quality & Testing
  'bug-defense-sovereign.png': 'qa-engineer.png',
  'automation-spell-weaver.png': 'automation-test-engineer.png',
  'performance-oracle.png': 'performance-test-engineer.png',
  'security-breach-hunter.png': 'security-tester.png',
  'user-acceptance-guardian.png': 'uat-specialist.png',

  // Operations & Infrastructure
  'deployment-warlord-prime.png': 'devops-engineer.png',
  'uptime-keeper-supreme.png': 'site-reliability-engineer.png',
  'cloud-realm-architect.png': 'cloud-architect.png',
  'data-crystal-paramount.png': 'database-administrator.png',
  'cyber-defense-hierophant.png': 'security-engineer.png',

  // Specialized Development
  'data-pipeline-artificer.png': 'data-engineer.png',
  'ai-mind-crafter.png': 'machine-learning-engineer.png',
  'interface-bridge-master.png': 'api-developer.png',
  'knowledge-scroll-keeper.png': 'technical-writer.png',
  'community-champion.png': 'developer-advocate.png',

  // Content & Creative
  'content-strategy-oracle.png': 'content-strategist.png',
  'persuasion-word-weaver.png': 'copywriter.png',
  'technical-lore-master.png': 'technical-content-writer.png',
  'visual-story-enchanter.png': 'video-content-creator.png',
  'pixel-art-magician.png': 'graphic-designer.png',
  'motion-magic-artificer.png': 'motion-graphics-designer.png',

  // Digital Marketing
  'search-visibility-sage.png': 'seo-specialist.png',
  'paid-campaign-warlord.png': 'sem-ppc-manager.png',
  'viral-influence-summoner.png': 'social-media-manager.png',
  'tribe-leader-supreme.png': 'community-manager.png',
  'influencer-alliance-broker.png': 'influencer-marketing-manager.png',

  // Email & Automation
  'inbox-enchantment-lord.png': 'email-marketing-manager.png',
  'workflow-automation-mage.png': 'marketing-automation-specialist.png',
  'customer-journey-architect.png': 'crm-manager.png',

  // Analytics & Growth
  'data-insight-oracle.png': 'marketing-analyst.png',
  'growth-hacking-alchemist.png': 'growth-hacker.png',
  'conversion-rate-optimizer.png': 'cro-specialist.png',
  'product-positioning-master.png': 'product-marketing-manager.png',

  // PR & Communications
  'public-voice-enchanter.png': 'pr-manager.png',
  'message-craft-director.png': 'communications-director.png',
  'brand-guardian-supreme.png': 'brand-manager.png',
  'event-summoning-master.png': 'event-marketing-manager.png',

  // Sales Support
  'sales-empowerment-sage.png': 'sales-enablement-manager.png',
  'lead-generation-sorcerer.png': 'lead-generation-specialist.png',
};

async function renameAgentImages() {
  const agentsDir = path.join(__dirname, '..', 'public', 'agents');

  console.log('Renaming agent images to role-based names...\n');

  try {
    // Get all files in the agents directory
    await fs.readdir(agentsDir);

    let renamed = 0;
    let skipped = 0;

    for (const oldName of Object.keys(renameMap)) {
      const newName = renameMap[oldName];
      const oldPath = path.join(agentsDir, oldName);
      const newPath = path.join(agentsDir, newName);

      try {
        // Check if old file exists
        await fs.access(oldPath);

        // Rename the file
        await fs.rename(oldPath, newPath);
        console.log(`✓ Renamed: ${oldName} → ${newName}`);
        renamed++;
      } catch (error) {
        if (error.code === 'ENOENT') {
          // File doesn't exist, skip
          skipped++;
        } else {
          console.error(`✗ Error renaming ${oldName}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`✓ Renamed: ${renamed} files`);
    console.log(`- Skipped: ${skipped} files (not found)`);

    // Update mapping.json if it exists
    const mappingPath = path.join(agentsDir, 'mapping.json');
    try {
      const mappingContent = await fs.readFile(mappingPath, 'utf-8');
      const mapping = JSON.parse(mappingContent);

      const newMapping = {};
      for (const [key, value] of Object.entries(mapping)) {
        // Convert the key to the new format
        const newKey = key
          .replace(/-/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Find the corresponding role-based name
        const oldFilename = path.basename(value);
        const newFilename = renameMap[oldFilename] || oldFilename;
        newMapping[newKey] = `/agents/${newFilename}`;
      }

      await fs.writeFile(mappingPath, JSON.stringify(newMapping, null, 2));
      console.log('\n✓ Updated mapping.json');
    } catch (error) {
      // Mapping file doesn't exist or couldn't be updated
      console.log('\n- No mapping.json to update');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
renameAgentImages().catch(console.error);
