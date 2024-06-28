import api from "@/src/feature/shared/api";

export interface FetchBookLikesResponse {
  bookId: number;
  count: number;
  currentUser: {
    id: number;
    liked: boolean;
  } | null;
}

export default function fetchBookLikes(
  bookId: number,
): Promise<FetchBookLikesResponse> {
  return api.get(`/likes?bookId=${bookId}`);
}
