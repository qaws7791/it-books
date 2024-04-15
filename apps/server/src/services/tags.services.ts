import db from "@server/src/database";
import { tags } from "@server/src/database/models";
import { eq } from "drizzle-orm";

class TagsService {
  private static instance: TagsService;
  public static getInstance(): TagsService {
    if (!TagsService.instance) {
      TagsService.instance = new TagsService();
    }
    return TagsService.instance;
  }

  findOrCreate = async (name: string) => {
    const tag = await db.query.tags.findFirst({
      where: eq(tags.name, name),
    });

    if (tag) {
      return tag;
    } else {
      const result = await db
        .insert(tags)
        .values({
          name,
        })
        .returning();
      return result[0];
    }
  };
}
export default TagsService;
