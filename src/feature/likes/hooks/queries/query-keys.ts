import { createQueryKeys } from "@lukemorales/query-key-factory";

const likesQueryKeys = createQueryKeys("likes", {
  fetchBookLikes: (bookId: number) => ["book", bookId],
  fetchListLikes: (listId: number) => ["list", listId],
});

export default likesQueryKeys;
