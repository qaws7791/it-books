import { categoryQueryKeys } from "@/src/feature/categories/queries";
import { Category, UpdateCategoryInput } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateCategory = ({
  id,
  ...input
}: UpdateCategoryInput): Promise<Category> => {
  return api.put(`/categories/${id}`, input);
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
