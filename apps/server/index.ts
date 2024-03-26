import fastify from "fastify";
import cors from "@fastify/cors";
import oauthPlugin, { fastifyOauth2, OAuth2Namespace } from "@fastify/oauth2";
import cookie from "@fastify/cookie";
import fastifyEnvModule from "./src/plugins/fastifyEnv.js";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    config: {
      COOKIE_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    };
  }
}

const server = fastify({
  maxParamLength: 5000,
});

await server.register(fastifyEnvModule);

await server.register(cors, {
  origin: "*",
});

// import to server fastifyEnvModule

server.register(cookie, {
  secret: server.config.COOKIE_SECRET,
  hook: "onRequest",
  parseOptions: {},
});

server.register(oauthPlugin, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  credentials: {
    client: {
      id: server.config.GOOGLE_CLIENT_ID,
      secret: server.config.GOOGLE_CLIENT_SECRET,
    },
    auth: fastifyOauth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/oauth2/google",
  callbackUri: "http://localhost:4000/oauth2/google/callback",
});

server.get("/oauth2/google/callback", async function (request, reply) {
  const { token } =
    await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

  reply.setCookie("token", token.access_token, {
    path: "/",
    httpOnly: true,
    maxAge: token.expires_in,
  });
  reply.redirect("http://localhost:3000/login");
});

server.get("/account", async function (request, reply) {
  // get header Authorization
  console.log("request.headers", request.headers);
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
  console.log("token", token);
  try {
    const profile = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
    console.log("profile", profile);
    return reply.send(profile);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ message: err });
  }
});

server.get("/", async () => {
  return { hello: "world" };
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
