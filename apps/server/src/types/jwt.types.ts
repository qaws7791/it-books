export interface Token {
  id: number;
  email: string;
  type: "access" | "refresh";
  role: "user" | "admin";
  iat: number;
  exp: number;
}

export interface AccessToken extends Token {
  type: "access";
}

export interface RefreshToken extends Token {
  type: "refresh";
}
