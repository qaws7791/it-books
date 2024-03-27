import fp from "fastify-plugin";
import fastifyJWT from "@fastify/jwt";

const fastifyJwtPlugin = fp(async (fastify, opts) => {
  fastify.register(fastifyJWT, {
    secret: fastify.config.JWT_SECRET,
    cookie: {
      cookieName: "access_token",
      signed: false,
    },
  });

  fastify.decorate("user", null);
});

export default fastifyJwtPlugin;
