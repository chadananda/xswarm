import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default('Chad Jones'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'Getting Started',
      'Core Concepts',
      'Guides',
      'API Reference',
      'Troubleshooting',
    ]),
    order: z.number().optional(),
    draft: z.boolean().optional(),
  }),
});

const agentsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    order: z.number(),
    agents: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        role: z.string(),
        description: z.string(),
        image: z.string().optional(),
        prompt: z.string().optional(),
        mcpTools: z.array(z.string()).optional(),
        activityType: z
          .enum([
            'analytics',
            'automation',
            'content',
            'marketing',
            'development',
            'testing',
            'security',
            'infrastructure',
            'planning',
            'design',
            'support',
          ])
          .optional(),
      })
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  agents: agentsCollection,
};
