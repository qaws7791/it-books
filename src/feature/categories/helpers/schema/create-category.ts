import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
