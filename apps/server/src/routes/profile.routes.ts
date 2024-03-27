import requireAuthHook from "@server/src/hooks/requireAuthHook";
import UsersService from "@server/src/services/users.services";
import { FastifyPluginAsync } from "fastify";

const profileRoutes: FastifyPluginAsync = async (fastify, opts) => {
  const usersService = UsersService.getInstance();
  fastify.get(
    "/",
    { onRequest: requireAuthHook },
    async function (request, reply) {
      const user = await usersService.findUserById(request.user.id);
      reply.send(user);
    }
  );
};

export default profileRoutes;
