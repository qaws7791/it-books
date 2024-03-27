import { GoogleProfile } from "@server/src/services/users.services";

class AuthService {
  private static instance: AuthService;
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getGoogleProfile = async (token: string) => {
    const googleProfileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (googleProfileRes.status >= 400) {
      throw new Error("Unauthorized");
    }
    const googleProfile = (await googleProfileRes.json()) as GoogleProfile;
    return googleProfile;
  };
}

export default AuthService;
