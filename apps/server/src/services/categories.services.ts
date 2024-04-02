import db from "@server/src/db/db";
import { categories } from "@server/src/db/schema";
import { asc, eq } from "drizzle-orm";

class CategoriesService {
  private static instance: CategoriesService;
  public static getInstance(): CategoriesService {
    if (!CategoriesService.instance) {
      CategoriesService.instance = new CategoriesService();
    }
    return CategoriesService.instance;
  }
  findAll = async () => {
    const allCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      })
      .from(categories)
      .orderBy(asc(categories.name));
    return allCategories;
  };

  findOneBySlug = async (slug: string) => {
    const existCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));

    if (!existCategory.length) {
      throw new Error("Category not found");
    }

    return existCategory[0];
  };

  findOneByName = async (name: string) => {
    const existCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name));

    if (!existCategory.length) {
      throw new Error("Category not found");
    }

    return existCategory[0];
  };

  create = async (dto: { name: string; slug: string }) => {
    const newCategory = await db.insert(categories).values(dto).returning({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    });

    return newCategory[0];
  };

  update = async (id: number, dto: { name: string; slug: string }) => {
    const updatedCategory = await db
      .update(categories)
      .set(dto)
      .where(eq(categories.id, id))
      .returning();

    return updatedCategory[0];
  };

  delete = async (id: number) => {
    const deletedCategory = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    return deletedCategory[0];
  };
}

export default CategoriesService;
