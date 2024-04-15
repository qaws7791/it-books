import { z } from "zod";

export const insertBookToTagSchema = z.object({
  bookId: z.number(),
  tagId: z.number(),
});

export type insertBookToTagType = typeof insertBookToTagSchema._type;
