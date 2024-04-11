import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@web/src/user/api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
  });
};
