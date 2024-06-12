import { BookStatus } from "@/src/feature/books/constants";
import { bookQueryKeys } from "@/src/feature/books/queries";
import api from "@/src/feature/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateBookInput {
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translator: string[];
  publisher: string;
  publishedDate: string;
  categoryId: number;
  tags: string[];
  status: BookStatus;
  pages: number;
}

function createBook(input: CreateBookInput): Promise<void> {
  return api.post("/books", input);
}

export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: bookQueryKeys._def,
      });
      toast.success("책을 성공적으로 추가했습니다.");
    },
    onError: () => {
      toast.error("책 추가에 실패했습니다.");
    },
  });
};
