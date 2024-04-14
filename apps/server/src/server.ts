import fastify from "fastify";
import cors from "@fastify/cors";
import oauthPlugin, { fastifyOauth2 } from "@fastify/oauth2";
import cookie from "@fastify/cookie";
import fastifyEnvPlugin from "./plugins/fastifyEnv.js";
import authRoutes from "@server/src/routes/auth.routes.js";
import profileRoutes from "@server/src/routes/profile.routes.js";
import usersRoutes from "@server/src/routes/users.routes.js";
import fastifyJwtPlugin from "@server/src/plugins/fastifyJwt.js";
import errorPlugin from "@server/src/plugins/error.plugin.js";
import crawlRoutes from "@server/src/routes/crawl.routes.js";
import categoriesRoutes from "@server/src/routes/categories.routes.js";
import formBodyPlugin from "@fastify/formbody";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import booksRoutes from "@server/src/routes/books.routes.js";
import multipart from "@fastify/multipart";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

const server = fastify({
  maxParamLength: 5000,
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(multipart);

await server.register(fastifyEnvPlugin);
server.register(formBodyPlugin);

await server.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

server.register(errorPlugin);

server.register(fastifyJwtPlugin);

server.register(cookie, {
  secret: server.config.COOKIE_SECRET,
  hook: "onRequest",
  parseOptions: {},
});

server.register(oauthPlugin, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  userAgent: "fastify",
  credentials: {
    client: {
      id: server.config.GOOGLE_CLIENT_ID,
      secret: server.config.GOOGLE_CLIENT_SECRET,
    },
    auth: fastifyOauth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/api/auth/google",
  callbackUri: "http://localhost:4000/api/auth/google/callback",
});

server.post("/api/upload", async (request, reply) => {
  const parts = request.parts();

  for await (const part of parts) {
    if (part.type === "file") {
      await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
      console.log("File: ", part.filename);
    } else {
      console.log("Field: ", part.fieldname, "/ Value: ", part.value);
    }
  }

  reply.send();
});

server.register(authRoutes, { prefix: "/api/auth" });
server.register(profileRoutes, { prefix: "/api/profile" });
server.register(usersRoutes, { prefix: "/api/users" });
server.register(crawlRoutes, { prefix: "/api/crawl" });
server.register(categoriesRoutes, { prefix: "/api/categories" });
server.register(booksRoutes, { prefix: "/api/books" });

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
    process.exit(1);
  }
};

start();
