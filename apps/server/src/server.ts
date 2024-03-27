import fastify from "fastify";
import cors from "@fastify/cors";
import oauthPlugin, { fastifyOauth2 } from "@fastify/oauth2";
import cookie from "@fastify/cookie";
import fastifyEnvPlugin from "./plugins/fastifyEnv.js";
import authRoutes from "@server/src/routes/auth.routes.js";
import profileRoutes from "@server/src/routes/profile.routes.js";
import usersRoutes from "@server/src/routes/users.routes.js";
import fastifyJwtPlugin from "@server/src/plugins/fastifyJwt.js";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

await server.register(fastifyEnvPlugin);

await server.register(cors, {
  origin: "*",
});

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
  startRedirectPath: "/auth/google",
  callbackUri: "http://localhost:4000/auth/google/callback",
});

server.register(authRoutes, { prefix: "/auth" });
server.register(profileRoutes, { prefix: "/profile" });
server.register(usersRoutes, { prefix: "/users" });

server.get("/cookies", async (request, reply) => {
  const token = await reply.jwtSign({
    name: "John Doe",
    role: ["admin", "user"],
  });

  reply
    .setCookie("token", token, {
      path: "/",
      domain: "localhost",
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .code(200)
    .send("Cookie set!");
});
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
