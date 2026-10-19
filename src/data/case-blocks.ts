import { z } from 'astro/zod';

const commonField = z.enum(['summary', 'challenge', 'decision', 'delivered', 'boundary', 'role']);
// source 引用作品既有欄位，避免在摘要與模組之間重複維護。
export const caseTextSchema = z.union([z.string(), z.object({ source: commonField })]);
export const caseImageSchema = z.object({
  src: z.string().optional(),
  approved: z.boolean().default(false),
  preview: z.boolean().default(false),
  alt: z.string().default(''),
  caption: z.string().default(''),
  placeholder: z.string().default(''),
  ratio: z.enum(['landscape', 'wide', 'portrait', 'natural']).default('landscape'),
  fit: z.enum(['cover', 'contain']).default('cover'),
  position: z.string().default('50% 50%'),
  annotations: z.array(z.object({ label: z.string(), x: z.number().min(0).max(100), y: z.number().min(0).max(100) })).default([]),
});
const base = z.object({ id: z.string().regex(/^[a-z][a-z0-9-]*$/), title: z.string().optional() });
export const caseBlockSchema = z.discriminatedUnion('type', [
  base.extend({ type: z.literal('summary'), items: z.array(z.object({ label: z.string(), value: caseTextSchema })).default([]), columns: z.enum(['two', 'three']).default('three') }),
  base.extend({ type: z.literal('narrative'), paragraphs: z.array(caseTextSchema).default([]), markdown: z.string().default(''), useBody: z.boolean().default(false) }),
  base.extend({ type: z.literal('gallery'), layout: z.enum(['single', 'pair']).default('single'), images: z.array(caseImageSchema).default([]) }),
  base.extend({ type: z.literal('timeline'), steps: z.array(z.object({ title: z.string(), text: caseTextSchema, image: caseImageSchema.optional() })).default([]) }),
  base.extend({ type: z.literal('comparison'), before: z.object({ label: z.string().default('改善前'), text: caseTextSchema, image: caseImageSchema.optional() }), after: z.object({ label: z.string().default('改善後'), text: caseTextSchema, image: caseImageSchema.optional() }), note: z.string().optional() }),
  base.extend({ type: z.literal('results'), groups: z.array(z.object({ label: z.string(), items: z.array(caseTextSchema).default([]) })).default([]) }),
]);
export type CaseBlock = z.infer<typeof caseBlockSchema>;
export type CaseImage = z.infer<typeof caseImageSchema>;
export type CaseText = z.infer<typeof caseTextSchema>;
