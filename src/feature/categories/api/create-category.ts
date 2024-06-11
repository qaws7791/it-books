import { categoryQueryKeys } from "@/src/feature/categories/queries";
import { Category, CreateCategoryInput } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createCategory = (dto: CreateCategoryInput): Promise<Category> => {
  return api.post("/categories", dto);
};

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
