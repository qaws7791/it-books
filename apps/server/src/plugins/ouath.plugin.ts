import fastifyOauthPlugin, { fastifyOauth2 } from "@fastify/oauth2";
import fp from "fastify-plugin";

const oauthPlugin = fp(async (fastify, opts) => {
  fastify.register(fastifyOauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    userAgent: "fastify",
    credentials: {
      client: {
        id: fastify.config.GOOGLE_CLIENT_ID,
        secret: fastify.config.GOOGLE_CLIENT_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/api/auth/google",
    callbackUri: "http://localhost:4000/api/auth/google/callback",
  });
});

export default oauthPlugin;
