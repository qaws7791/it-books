import { z } from "zod";

export const createBookSchema = z.object({
  isbn: z.string().min(13).max(13),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  slug: z.string().min(1).max(200),
  image: z.instanceof(Buffer),
  author: z.string().min(1).max(200),
  translator: z.string().min(1).max(200).optional(),
  publisher: z.string().min(1).max(200),
  publicationDate: z.string().datetime(),
  categoryId: z.string(),
  tags: z.string(),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
