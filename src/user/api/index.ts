import api from "@/src/shared/api";
import { UserProfile } from "@/src/user/types";

export const getProfile = (): Promise<UserProfile> => {
  return api.get("/users/me");
};
