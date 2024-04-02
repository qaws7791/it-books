import AppError from "@server/src/lib/AppError";
import fp from "fastify-plugin";

const errorPlugin = fp(async (fastify, opts) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
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
