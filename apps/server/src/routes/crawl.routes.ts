import CrawlService from "@server/src/services/crawl.services";
import { FastifyPluginAsync } from "fastify";

const crawlRoutes: FastifyPluginAsync = async (fastify, opts) => {
  const crawlService = CrawlService.getInstance();
  fastify.get<{ Querystring: { url: string } }>(
    "/",
    async function (request, reply) {
      const url = request.query.url;
      const bookInfo = await crawlService.crawlBook(url);
      if (bookInfo) {
        reply.send(bookInfo);
      } else {
        reply.status(404).send("Not found");
      }
    }
  );
};

export default crawlRoutes;
