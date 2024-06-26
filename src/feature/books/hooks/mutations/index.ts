import createBook from "@/src/feature/books/api/create-book";
import updateBook from "@/src/feature/books/api/update-book";
import bookQueryKeys from "@/src/feature/books/hooks/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
