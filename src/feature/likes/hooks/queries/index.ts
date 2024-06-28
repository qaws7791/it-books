import fetchBookLikes from "@/src/feature/likes/api/fetch-book-likes";
import likesQueryKeys from "@/src/feature/likes/hooks/queries/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useBookLikes = (bookId: number) => {
  return useSuspenseQuery({
    queryKey: likesQueryKeys.fetchBookLikes(bookId).queryKey,
    queryFn: () => fetchBookLikes(bookId),
  });
};
