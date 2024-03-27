import { FastifyPluginAsync } from "fastify";

const usersRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    reply.send({ user: "user" });
  });
};

export default usersRoutes;
