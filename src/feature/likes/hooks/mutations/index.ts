import { FetchBookLikesResponse } from "@/src/feature/likes/api/fetch-book-likes";
import updateBookLike from "@/src/feature/likes/api/post-book-like";
import likesQueryKeys from "@/src/feature/likes/hooks/queries/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBookLikeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBookLike,
    onSuccess: (data) => {
      const oldData = queryClient.getQueryData<FetchBookLikesResponse>(
        likesQueryKeys.fetchBookLikes(data.bookId).queryKey,
      );

      if (!oldData) return;

      const newData = {
        ...oldData,
        count: data.liked ? oldData.count + 1 : oldData.count - 1,
        currentUser: {
          ...oldData.currentUser,
          liked: data.liked,
        },
      };

      queryClient.setQueryData(
        likesQueryKeys.fetchBookLikes(data.bookId).queryKey,
        newData,
      );
    },
  });
}
