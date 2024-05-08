import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/src/user/api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
  });
};
