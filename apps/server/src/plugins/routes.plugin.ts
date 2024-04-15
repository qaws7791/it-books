import fp from "fastify-plugin";
import authRoutes from "@server/src/routes/auth.routes.js";
import profileRoutes from "@server/src/routes/profile.routes.js";
import usersRoutes from "@server/src/routes/users.routes.js";
import crawlRoutes from "@server/src/routes/crawl.routes.js";
import categoriesRoutes from "@server/src/routes/categories.routes.js";
import booksRoutes from "@server/src/routes/books.routes.js";

const routesPlugin = fp(async (fastify, opts) => {
  fastify.register(authRoutes, { prefix: "/api/auth" });
  fastify.register(profileRoutes, { prefix: "/api/profile" });
  fastify.register(usersRoutes, { prefix: "/api/users" });
  fastify.register(crawlRoutes, { prefix: "/api/crawl" });
  fastify.register(categoriesRoutes, { prefix: "/api/categories" });
  fastify.register(booksRoutes, { prefix: "/api/books" });
});

export default routesPlugin;
