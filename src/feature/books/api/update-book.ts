import { BookStatus } from "@/src/feature/books/constants";
import { bookQueryKeys } from "@/src/feature/books/queries";
import api from "@/src/feature/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdateBookInput {
  id: number;
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

interface UpdateBookOutput {
  id: number;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  authors: string[];
  translator: string[];
  publisher: string;
  publishedDate: string;
  status: BookStatus;
  pages: number;
}

export default function updateBook({
  id,
  ...input
}: UpdateBookInput): Promise<UpdateBookOutput> {
  return api.put("/books/" + id, input);
}

export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: bookQueryKeys._def,
      });
      toast.success("책을 성공적으로 변경했습니다.");
    },
    onError: () => {
      toast.error("책 변경에 실패했습니다.");
    },
  });
};
