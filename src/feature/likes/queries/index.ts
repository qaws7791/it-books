import getBookLikes from "@/src/feature/likes/api/get-book-likes";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useSuspenseQuery } from "@tanstack/react-query";

export const likesQueryKeys = createQueryKeys("likes", {
  fetchBookLikes: (bookId: number) => ["book", bookId],
  fetchListLikes: (listId: number) => ["list", listId],
});

export const useBookLikes = (bookId: number) => {
  return useSuspenseQuery({
    queryKey: likesQueryKeys.fetchBookLikes(bookId).queryKey,
    queryFn: () => getBookLikes(bookId),
  });
};
