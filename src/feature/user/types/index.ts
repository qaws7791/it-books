export interface UserProfile {
  role: "admin" | "user";
  id: number;
  email: string;
  name: string;
  photo: string;
}
