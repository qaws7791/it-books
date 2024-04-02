import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CreateCategoryDto } from "@web/src/categories/types";
import api from "@web/src/shared/api";
import { toast } from "sonner";

const createCategory = (dto: CreateCategoryDto): Promise<Category> => {
  return api.post("/categories", dto);
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("카테고리가 생성되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
