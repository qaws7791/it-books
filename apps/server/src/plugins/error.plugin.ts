import AppError from "@server/src/lib/AppError";
import fp from "fastify-plugin";
import { ZodError } from "zod";

const errorFormatter = (error: ZodError) => {
  return error.errors.map((e) => ({
    code: e.code,
    message: e.message,
    path: e.path[0],
  }));
};

const errorPlugin = fp(async (fastify, opts) => {
  fastify.setErrorHandler((error, request, reply) => {
    console.error("Error: ", error);

    if (error instanceof ZodError && error.code === "FST_ERR_VALIDATION") {
      console.error("ZodError: ", error.errors);
      reply.code(400).send({
        statusCode: 400,
        name: "BadRequest",
        message: errorFormatter(error),
      });
    } else if (error instanceof AppError) {
      reply.code(error.statusCode).send({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
      });
    } else {
      reply.code(500).send({
        statusCode: 500,
        name: "InternalServerError",
        message: "Internal Server Error",
      });
    }
  });
});

export default errorPlugin;
