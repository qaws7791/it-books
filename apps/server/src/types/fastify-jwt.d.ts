import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: number;
      role: string;
      type: string;
    };
    user: {
      id: number;
      email: string;
      type: string;
    };
  }

  interface JWT {
    access: jwt.JWT;
    refresh: jwt.JWT;
  }
}
