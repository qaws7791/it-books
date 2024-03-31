import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number;
      email: string;
      type: string;
      role: string;
    };
    user: {
      id: number;
      email: string;
      type: string;
      role: "admin" | "user";
    };
  }

  interface JWT {
    access: jwt.JWT;
    refresh: jwt.JWT;
  }
}
