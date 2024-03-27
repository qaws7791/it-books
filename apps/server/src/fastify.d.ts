import { FastifyJwtNamespace } from "@fastify/jwt";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
    };
  }
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    googleOAuth2: OAuth2Namespace;
    config: {
      COOKIE_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_SECRET: string;
    };
  }
}
