import fp from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";

const jwtPlugin = fp(async (fastify, opts) => {
  fastify.register(fastifyJWT, {
    secret: fastify.config.JWT_ACCESS_SECRET,
    namespace: "access",
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
    jwtDecode: "accessDecode",
    jwtVerify: "accessVerify",
    jwtSign: "accessSign",
  });

  fastify.register(fastifyJWT, {
    secret: fastify.config.JWT_REFRESH_SECRET,
    namespace: "refresh",
    cookie: {
      cookieName: "refresh_token",
      signed: false,
    },
    jwtDecode: "refreshDecode",
    jwtVerify: "refreshVerify",
    jwtSign: "refreshSign",
  });

  fastify.decorate("user", null);
});

export default jwtPlugin;
