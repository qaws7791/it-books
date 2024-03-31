import { onRequestHookHandler } from "fastify";

const requireAdminHook: onRequestHookHandler = async (request, reply, done) => {
  try {
    await request.accessVerify();

    if (!request.user) {
      throw new Error("Unauthorized");
    }

    if (request.user.role !== "admin") {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    reply.code(401).send({ message: "Unauthorized" });
  }
};

export default requireAdminHook;
