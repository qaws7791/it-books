import api from "@web/src/shared/api";
import { UserProfile } from "@web/src/user/types";

export const getProfile = (): Promise<UserProfile> => {
  return api.get("/users/me");
};
