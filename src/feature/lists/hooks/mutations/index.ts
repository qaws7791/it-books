import createList from "@/src/feature/lists/api/create-list";
import updateList from "@/src/feature/lists/api/update-list";
import listQueryKeys from "@/src/feature/lists/hooks/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createList,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: listQueryKeys._def,
      });
      toast.success("리스트를 성공적으로 추가했습니다.");
    },
    onError: () => {
      toast.error("리스트 추가에 실패했습니다.");
    },
  });
};

export const useUpdateListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: listQueryKeys._def,
      });
      toast.success("리스트를 성공적으로 변경했습니다.");
    },
    onError: () => {
      toast.error("리스트 변경에 실패했습니다.");
    },
  });
};
