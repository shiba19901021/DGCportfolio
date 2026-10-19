import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { caseBlockSchema } from './data/case-blocks';

const problem = z.enum(['clarify', 'coordinate', 'flow', 'iterate']);
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['project', 'learning', 'tool', 'practice']),
    order: z.number(),
    featured: z.boolean().default(false),
    home: z.object({
      order: z.number(), question: z.string(), judgement: z.string(),
      visual: z.enum(['water', 'kitchen', 'partnership', 'data', 'generic']).default('generic'),
      mediaLabel: z.string(),
    }).optional(),
    visibility: z.enum(['preview', 'public', 'private']).default('preview'),
    detail: z.boolean().default(false),
    detailIntro: z.object({ title: z.string(), subtitle: z.string(), introduction: z.string() }).optional(),
    blocks: z.array(caseBlockSchema).default([]),
    topics: z.array(z.string()),
    problems: z.array(problem).min(1),
    summary: z.string(),
    challenge: z.string(),
    decision: z.string(),
    delivered: z.string(),
    boundary: z.string(),
    role: z.string(),
    related: z.array(z.object({ id: z.string(), reason: z.string() })).default([]),
    contexts: z.record(z.string(), z.object({
      challenge: z.string(), decision: z.string(), delivered: z.string(), boundary: z.string(),
    })).default({}),
    image: z.object({
      src: z.string(), alt: z.string(), caption: z.string(),
      approved: z.boolean(),
      position: z.string().default('50% 50%'),
    }).optional(),
  }),
});

export const collections = { works };
