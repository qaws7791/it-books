export interface Token {
  id: number;
  role: "user" | "admin";
  type: "access" | "refresh";
  iat: number;
  exp: number;
}

export interface AccessToken extends Token {
  type: "access";
}

export interface RefreshToken extends Token {
  type: "refresh";
}
