import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import jwtPlugin from "@server/src/plugins/jwt.plugin.js";
import errorHandlePlugin from "@server/src/plugins/error.plugin.js";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { postgresClient } from "@server/src/database/index.js";
import routesPlugin from "@server/src/plugins/routes.plugin.js";
import envPlugin from "./plugins/env.plugin.js";
import oauthPlugin from "@server/src/plugins/ouath.plugin.js";

// initialize fastify server with type provider zod
const server = fastify({
  maxParamLength: 5000,
  logger: true,
}).withTypeProvider<ZodTypeProvider>();
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// plugin for multipart form data
await server.register(import("@fastify/multipart"), {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 1000000, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
    parts: 1000, // For multipart forms, the max number of parts (fields + files)
  },
  attachFieldsToBody: "keyValues",
});

// plugin for environment variables
await server.register(envPlugin);

// plugin for parsing form body
await server.register(import("@fastify/formbody"));

// plugin for cors
await server.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

// plugin for server error handling
await server.register(errorHandlePlugin);

// plugin for json web token authentication
await server.register(jwtPlugin);

// plugin for cookie
await server.register(cookie, {
  secret: server.config.COOKIE_SECRET,
  hook: "onRequest",
  parseOptions: {},
});

// plugin for oauth2
await server.register(oauthPlugin);

// plugin for routes
await server.register(routesPlugin);

server.get("/", async (request, reply) => {
  return { root: "root" };
});

const start = async () => {
  try {
    await server.listen({ port: 4000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    await postgresClient.end();
    process.exit(1);
  }
};

start();
