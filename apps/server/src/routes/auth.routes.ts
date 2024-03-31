import AppError from "@server/src/lib/AppError";
import AuthService from "@server/src/services/auth.services";
import UsersService from "@server/src/services/users.services";
import { RefreshToken } from "@server/src/types/jwt.types";
import { FastifyPluginAsync } from "fastify";

const authRoute: FastifyPluginAsync = async (fastify, opts) => {
  const usersService = UsersService.getInstance();
  const authService = AuthService.getInstance();

  fastify.get("/google/callback", async function (request, reply) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    const googleProfile = await authService.getGoogleProfile(
      token.access_token
    );

    const user = await usersService.findOrCreateUser(googleProfile);
    const accessToken = await reply.accessSign(
      {
        id: user.id,
        role: user.role,
        type: "access",
        email: user.email,
      },
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = await reply.refreshSign(
      {
        id: user.id,
        role: user.role,
        type: "refresh",
        email: user.email,
      },
      {
        expiresIn: "7d",
      }
    );

    reply
      .setCookie("access_token", accessToken, {
        path: "/",
        domain: "localhost",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .setCookie("refresh_token", refreshToken, {
        path: "/",
        domain: "localhost",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .redirect("http://localhost:3000/login");
  });

  fastify.post("/logout", async function (request, reply) {
    reply
      .clearCookie("access_token", {
        path: "/",
        domain: "localhost",
      })
      .clearCookie("refresh_token", {
        path: "/",
        domain: "localhost",
      })
      .send({ message: "Logged out" });
  });

  fastify.post("/refresh", async function (request, reply) {
    try {
      const token = await request.refreshVerify<RefreshToken>();

      const user = await usersService.findUserById(token.id);

      if (!user) {
        return reply.code(404).send({ message: "User not found" });
      }

      const accessToken = await reply.accessSign(
        {
          id: user.id,
          role: user.role,
          type: "access",
          email: user.email,
        },
        {
          expiresIn: "1h",
        }
      );

      reply
        .setCookie("access_token", accessToken, {
          path: "/",
          domain: "localhost",
          secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        .send({ message: "Refreshed" });
    } catch (e) {
      if (e instanceof AppError) {
        throw e;
      }
      throw new AppError("Unauthorized");
    }
  });
};

export default authRoute;
