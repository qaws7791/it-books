import api from "@/src/shared/api";

export interface GetBookLikesResponse {
  bookId: number;
  count: number;
  currentUser: {
    id: number;
    liked: boolean;
  } | null;
}

export default function getBookLikes(
  bookId: number,
): Promise<GetBookLikesResponse> {
  return api.get(`/likes?bookId=${bookId}`);
}
