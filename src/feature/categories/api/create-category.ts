import { Category, CreateCategoryDto } from "@/src/feature/categories/types";
import api from "@/src/feature/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createCategory = (dto: CreateCategoryDto): Promise<Category> => {
  return api.post("/categories", dto);
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("카테고리가 생성되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
