import { defineCollection, z } from 'astro:content';

const lux = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    displayDate: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    alt: z.string(),
    caption: z.string(),
    localImage: z.string(),
    cloudinary: z
      .object({
        transformation: z.string().optional(),
      })
      .optional(),
  }),
});

const notebooks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    label: z.string().default('Notebook'),
    subhead: z.string(),
    priority: z.number().default(0),
    cta: z.string().default('Read the notes →'),
  }),
});

export const collections = { lux, notebooks };
