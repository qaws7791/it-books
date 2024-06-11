import { BOOK_STATUS_KEYS } from "@/src/feature/books/constants";
import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2, "책 제목은 2글자 이상이어야 합니다."),
  categoryId: z.string().min(1, "카테고리를 선택해주세요."),
  slug: z.string().min(2, "URL 슬러그는 2글자 이상이어야 합니다."),
  authors: z.string().min(1, "저자 이름을 입력해주세요."),
  isbn: z
    .string()
    .min(13, "ISBN은 13자리여야 합니다.")
    .max(13, "ISBN은 13자리여야 합니다."),
  publisher: z.string().min(1, "출판사를 입력해주세요."),
  publishedDate: z.string().date("날짜를 선택해주세요."),
  tags: z.array(z.string()),
  coverImage: z.string().min(1, "이미지 URL을 입력해주세요."),
  description: z.string().min(10),
  translator: z.string().optional(),
  status: z.enum(BOOK_STATUS_KEYS),
  pages: z.number().int().positive(),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
