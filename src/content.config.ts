import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    titleDe: z.string().optional(),
    description: z.string(),
    descriptionDe: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Master Thesis', 'Projects', 'AI & LLMs', 'Robotics', 'Engineering']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'de']).default('en'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    titleDe: z.string().optional(),
    summary: z.string(),
    summaryDe: z.string().optional(),
    period: z.string(),
    periodDe: z.string().optional(),
    role: z.string().default('Author & Developer'),
    roleDe: z.string().optional(),
    status: z.enum(['Completed', 'In Progress', 'Research']).default('Completed'),
    metrics: z.string().optional(),
    metricsDe: z.string().optional(),
    tags: z.array(z.string()).default([]),
    repoUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(10),
  }),
});

export const collections = { blog, projects };
