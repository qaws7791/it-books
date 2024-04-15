import db from "@server/src/database";
import { SelectUser, users } from "@server/src/database/models";

import { eq } from "drizzle-orm";

export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
}

class UsersService {
  private static instance: UsersService;
  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  findOrCreateUser = async (googleProfile: GoogleProfile) => {
    let existUser = await db
      .select()
      .from(users)
      .where(eq(users.email, googleProfile.email));

    if (existUser.length === 0) {
      existUser = await db
        .insert(users)
        .values({
          email: googleProfile.email,
          name: googleProfile.name,
          picture: googleProfile.picture,
          providerId: googleProfile.id,
        })
        .returning();
    }
    return existUser[0];
  };

  findUserById = async (id: SelectUser["id"]) => {
    const user = await db.select().from(users).where(eq(users.id, id));

    if (user.length === 0) {
      throw new Error("User not found");
    }

    return {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      picture: user[0].picture,
      role: user[0].role,
    };
  };
}

export default UsersService;
