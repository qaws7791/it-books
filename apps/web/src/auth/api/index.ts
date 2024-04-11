import api from "@web/src/shared/api";

export const googleLogin = ({
  credential,
  select_by,
}: {
  credential: string;
  select_by: string;
}) => {
  return api.post("/auth/google/one-tap", { credential, select_by });
};

export const googleLogout = (): Promise<{ message: string }> => {
  return api.post("/auth/google/logout");
};
