import AppError from "@server/src/lib/AppError";
import {
  CreateBookSchema,
  createBookSchema,
} from "@server/src/schemas/books.schema";
import BooksService from "@server/src/services/books.services";
import BooksToTagsService from "@server/src/services/booksToTags.services";
import TagsService from "@server/src/services/tags.services";
import { saveBookImage } from "@server/src/storage/books.storage";
import { FastifyPluginAsync } from "fastify";

const booksRoutes: FastifyPluginAsync = async (fastify, opts) => {
  const booksService = BooksService.getInstance();
  const tagsService = TagsService.getInstance();
  const booksToTagsService = BooksToTagsService.getInstance();

  fastify.post<{
    Body: CreateBookSchema;
  }>(
    "/",
    {
      schema: {
        body: createBookSchema,
      },
    },
    async (request, reply) => {
      const { tags, image, ...book } = request.body;
      const decodedTags = tags.split(",").map((tag) => tag.trim());
      const newTags = await Promise.all(
        decodedTags.map((tag) => tagsService.findOrCreate(tag))
      );

      const bookImage = await saveBookImage({
        buffer: image,
      });

      const newBook = await booksService.create({
        ...book,
        image: bookImage.filename,
        categoryId: Number(book.categoryId),
      });

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

  fastify.get<{
    Querystring: {
      cursor?: string;
      size?: string;
    };
  }>("/", async (request, reply) => {
    const cursor = Number(request.query.cursor) || undefined;
    const size = Number(request.query.size) || 3;
    return booksService.getNextPage(size, cursor);
  });
};

export default booksRoutes;
