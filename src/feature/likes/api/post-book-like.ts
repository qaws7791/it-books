import api from "@/src/feature/shared/api";

export type UpdateBookLikeAction = "create" | "delete";

export interface UpdateBookLikeResponse {
  bookId: number;
  liked: boolean;
}

export default function updateBookLike({
  bookId,
  action,
}: {
  bookId: number;
  action: UpdateBookLikeAction;
}): Promise<UpdateBookLikeResponse> {
  return api.post("/likes", { type: "book", targetId: bookId, action });
}
