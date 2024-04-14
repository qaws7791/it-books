import requireAdminHook from "@server/src/hooks/requireAdminHook";
import CategoriesService from "@server/src/services/categories.services";
import { FastifyPluginAsync } from "fastify";

const categoriesRoutes: FastifyPluginAsync = async (fastify, opts) => {
  const categoriesService = CategoriesService.getInstance();
  fastify.get("/", async function (request, reply) {
    const categories = await categoriesService.findAll();
    reply.send(categories);
  });

  fastify.post<{
    Body: { name: string; slug: string };
  }>("/", async function (request, reply) {
    const category = await categoriesService.create(request.body);
    reply.send(category);
  });

  fastify.patch<{
    Body: { name: string; slug: string };
    Params: { id: number };
  }>(
    "/:id",
    {
      onRequest: requireAdminHook,
    },
    async function (request, reply) {
      const category = await categoriesService.update(
        request.params.id,
        request.body
      );
      reply.send(category);
    }
  );

  fastify.delete<{
    Params: { id: number };
  }>(
    "/:id",
    {
      onRequest: requireAdminHook,
    },
    async function (request, reply) {
      const category = await categoriesService.delete(request.params.id);
      reply.send(category);
    }
  );

  fastify.get<{
    Params: { name: string };
  }>("/name/:name", async function (request, reply) {
    const category = await categoriesService.findOneByName(request.params.name);
    reply.send(category);
  });

  fastify.get<{
    Params: { slug: string };
  }>("/slug/:slug", async function (request, reply) {
    const category = await categoriesService.findOneBySlug(request.params.slug);
    reply.send(category);
  });
};

export default categoriesRoutes;
