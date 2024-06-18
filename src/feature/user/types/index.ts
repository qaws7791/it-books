export type Role = "ADMIN" | "USER";

export interface UserProfile {
  roles: Role[];
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  photo: string;
}
