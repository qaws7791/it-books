import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";

const fastifyEnvPlugin = fp(async (fastify, opts) => {
  const schema = {
    type: "object",
    required: [
      "COOKIE_SECRET",
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "JWT_SECRET",
    ],
    properties: {
      COOKIE_SECRET: {
        type: "string",
      },
      GOOGLE_CLIENT_ID: {
        type: "string",
      },
      GOOGLE_CLIENT_SECRET: {
        type: "string",
      },
      JWT_SECRET: {
        type: "string",
      },
    },
  };

  const options = {
    dotenv: true,
    schema,
    data: process.env,
  };

  await fastify.register(fastifyEnv, options);
});

export default fastifyEnvPlugin;
