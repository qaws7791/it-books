import { insertBookSchema, insertBookType, tags } from "@server/src/db/schema";
import AppError from "@server/src/lib/AppError";
import BooksService from "@server/src/services/books.services";
import BooksToTagsService from "@server/src/services/booksToTags.services";
import TagsService from "@server/src/services/tags.services";
import { FastifyPluginAsync } from "fastify";

const booksRoutes: FastifyPluginAsync = async (fastify, opts) => {
  const booksService = BooksService.getInstance();
  const tagsService = TagsService.getInstance();
  const booksToTagsService = BooksToTagsService.getInstance();

  fastify.post<{
    Body: insertBookType;
  }>(
    "/",
    {
      schema: {
        body: insertBookSchema,
      },
    },
    async (request, reply) => {
      const body = request.body;
      const { tags, ...book } = body;
      const newTags = await Promise.all(
        body.tags.map((tag) => tagsService.findOrCreate(tag))
      );

      const newBook = await booksService.create(book);

      await Promise.all(
        newTags.map((tag) =>
          booksToTagsService.create({
            bookId: newBook.id,
            tagId: tag.id,
          })
        )
      );

      return booksService.findOne(newBook.id);
    }
  );

  fastify.get<{
    Params: { id: string };
  }>("/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const book = await booksService.findOne(id);
    if (!book) {
      throw new AppError("BookNotFound");
    }
    return book;
  });
};

export default booksRoutes;
