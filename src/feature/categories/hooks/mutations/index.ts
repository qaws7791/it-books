import createCategory from "@/src/feature/categories/api/create-category";
import updateCategory from "@/src/feature/categories/api/update-category";
import categoryQueryKeys from "@/src/feature/categories/hooks/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: categoryQueryKeys._def,
      });
      toast.success("카테고리를 성공적으로 추가했습니다.");
    },
    onError: () => {
      toast.error("카테고리 추가에 실패했습니다.");
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: categoryQueryKeys._def,
      });
      toast.success("카테고리를 성공적으로 변경했습니다.");
    },
    onError: () => {
      toast.error("카테고리 변경에 실패했습니다.");
    },
  });
};
