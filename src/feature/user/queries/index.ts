import {
  getProfile,
  getUserLikesPagination,
  getUserLikesPaginationInput,
} from "@/src/feature/user/api";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const userQueryKeys = createQueryKeys("user", {
  fetchProfile: () => ["profile"],
  fetchLikes: ({ userId, limit, page }: getUserLikesPaginationInput) => [
    "likes",
    { userId, limit, page },
  ],
});

export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.fetchProfile().queryKey,
    queryFn: getProfile,
  });
};

export const useUserLikesPagination = ({
  page = 1,
  limit = 10,
  userId,
}: getUserLikesPaginationInput) => {
  return useSuspenseInfiniteQuery({
    queryKey: userQueryKeys.fetchLikes({ page, limit, userId }).queryKey,
    queryFn: ({ pageParam }) =>
      getUserLikesPagination({ page: pageParam, limit, userId }),
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.nextPage;
    },
  });
};
