import api from "@web/src/shared/api";

export const renewAccessToken = (): Promise<{ message: string }> => {
  return api.post("/auth/refresh");
};
