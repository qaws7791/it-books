import { GetBookLikesResponse } from "@/src/likes/api/get-book-likes";
import { likesQueryKeys } from "@/src/likes/queries";
import api from "@/src/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type PostBookLikeAction = "create" | "delete";

export interface PostBookLikeResponse {
  bookId: number;
  liked: boolean;
}

export default function postBookLike({
  bookId,
  action,
}: {
  bookId: number;
  action: PostBookLikeAction;
}): Promise<PostBookLikeResponse> {
  return api.post("/likes", { type: "book", targetId: bookId, action });
}

export function usePostBookLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBookLike,
    onSuccess: (data) => {
      const oldData = queryClient.getQueryData<GetBookLikesResponse>(
        likesQueryKeys.fetchBookLikes(data.bookId).queryKey,
      );
      if (oldData) {
        queryClient.setQueryData(
          likesQueryKeys.fetchBookLikes(data.bookId).queryKey,
          {
            ...oldData,
            count: data.liked ? oldData.count + 1 : oldData.count - 1,
            currentUser: {
              ...oldData.currentUser,
              liked: data.liked,
            },
          },
        );
      }
    },
  });
}
