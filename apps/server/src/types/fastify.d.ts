import { FastifyJwtNamespace, JWT } from "@fastify/jwt";
import { OAuth2Namespace } from "@fastify/oauth2";
import jwt from "@fastify/jwt";
declare module "fastify" {
  interface FastifyRequest {
    accessDecode: FastifyRequest["jwtDecode"];
    accessVerify: FastifyRequest["jwtVerify"];

    refreshDecode: FastifyRequest["jwtDecode"];
    refreshVerify: FastifyRequest["jwtVerify"];
  }

  interface FastifyReply {
    accessSign: FastifyReply["jwtSign"];

    refreshSign: FastifyReply["jwtSign"];
  }
  interface FastifyInstance
    extends FastifyJwtNamespace<{
      namespace: "access" | "refresh";
    }> {
    googleOAuth2: OAuth2Namespace;
    config: {
      COOKIE_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
    };

    accessSign: JWT["sign"];
  }
}
