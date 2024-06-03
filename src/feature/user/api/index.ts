import api from "@/src/feature/shared/api";
import { UserProfile } from "@/src/feature/user/types";

export const getProfile = (): Promise<UserProfile> => {
  return api.get("/users/me");
};
