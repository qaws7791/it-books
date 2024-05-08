import api from "@/src/shared/api";

export const renewAccessToken = (): Promise<{ message: string }> => {
  return api.post("/auth/refresh");
};
