import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { caseBlockSchema } from './data/case-blocks';

const problem = z.enum(['clarify', 'coordinate', 'flow', 'iterate']);
const workSchema = z.object({
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
});
const works = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/works' }), schema: workSchema });
// English versions of the case pages: same ids, blocks, images and structure as the Chinese file (checked at build, see lib/works.ts).
const worksEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works-en' }),
  schema: workSchema.extend({ topics: z.array(z.string()).default([]) }),
});

// 小專案：順手做出來、解決實際問題的小工具與小製作。獨立於 works，不影響首頁與既有案例。
const minis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/minis' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['practice', 'course']),
    category: z.enum(['workflow-ai', 'interactive', 'hands-on', 'course-mini']).optional(),
    icon: z.enum(['questionnaire', 'simulator']).optional(),
    order: z.number(),
    visibility: z.enum(['preview', 'public']).default('preview'),
    summary: z.string(),
    blurb: z.string().optional(),
    role: z.string().optional(),
    problem: z.string(),
    built: z.string().optional(),
    steps: z.array(z.string()).min(1).max(5),
    estimate: z.string().optional(),
    usage: z.array(z.string()).default([]),
    limits: z.array(z.string()).default([]),
    image: z.object({ src: z.string(), alt: z.string(), caption: z.string(), approved: z.boolean() }).optional(),
  }),
});

export const collections = { works, worksEn, minis };
