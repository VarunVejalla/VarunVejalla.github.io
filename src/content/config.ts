import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([])
  })
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    repoUrl: z.string().url(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    interactive: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
});

export const collections = { notes, projects };
