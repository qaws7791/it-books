import AuthService from "@server/src/services/auth.services";
import UsersService from "@server/src/services/users.services";
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

    const accessToken = await reply.jwtSign(
      {
        id: user.id,
        role: user.role,
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
      .redirect("http://localhost:3000/login");
  });
};

export default authRoute;
