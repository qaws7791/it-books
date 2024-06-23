import { BookWithCategory } from "@/src/feature/books/types";
import api from "@/src/feature/shared/api";
import {
  PaginationCommonInput,
  PaginationResponse,
} from "@/src/feature/shared/type/api";
import { UserProfile } from "@/src/feature/user/types";

export const getProfile = (): Promise<UserProfile> => {
  return api.get("/users/me");
};

export interface getUserLikesPaginationInput extends PaginationCommonInput {
  userId: number;
}

export interface getUserLikesPaginationOutput {
  data: BookWithCategory[];
  pagination: PaginationResponse;
}

export const getUserLikesPagination = ({
  page,
  limit,
  userId,
}: getUserLikesPaginationInput): Promise<getUserLikesPaginationOutput> => {
  return api.get(`/users/${userId}/likes`, { params: { page, limit } });
};
