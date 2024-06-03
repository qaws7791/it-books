import { getProfile } from "@/src/feature/user/api";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
  });
};
