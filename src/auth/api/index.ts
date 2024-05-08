import api from "@/src/shared/api";

export const googleLogin = ({
  credential,
  select_by,
}: {
  credential: string;
  select_by: string;
}) => {
  return api.post("/auth/google/one-tap/callback", { credential, select_by });
};

export const googleLogout = (): Promise<{ message: string }> => {
  return api.post("/auth/google/logout");
};
