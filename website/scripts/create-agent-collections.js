import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AGENT_DATA } from '../src/data/agent-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createAgentCollections() {
  console.log('Creating agent content collections...');
  
  const contentDir = path.join(__dirname, '..', 'src', 'content', 'agents');
  
  // Ensure directory exists
  await fs.mkdir(contentDir, { recursive: true });
  
  // Create order mapping
  const orderMap = {
    'planning': 1,
    'development': 2,
    'quality': 3,
    'operations': 4,
    'specialized': 5,
    'content': 6,
    'marketing': 7,
    'automation': 8,
    'analytics': 9,
    'communications': 10,
    'sales': 11
  };
  
  // Process each category
  for (const [key, data] of Object.entries(AGENT_DATA)) {
    const collection = {
      title: data.title,
      subtitle: data.subtitle,
      order: orderMap[key] || 99,
      agents: data.agents
    };
    
    const filename = `${key}.json`;
    const filepath = path.join(contentDir, filename);
    
    await fs.writeFile(filepath, JSON.stringify(collection, null, 2));
    console.log(`✓ Created ${filename}`);
  }
  
  console.log('\nAgent collections created successfully!');
}

// Run the script
createAgentCollections().catch(console.error);