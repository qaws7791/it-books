import api from "@/src/feature/shared/api";

export const renewAccessToken = (): Promise<{ message: string }> => {
  return api.post("/auth/refresh");
};
