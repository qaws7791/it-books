import { PaginationCommonInput } from "@/src/feature/shared/type/api";

export interface CreateCategoryInput {
  name: string;
  slug: string;
}

export interface UpdateCategoryInput {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface CategorySearchParams extends PaginationCommonInput {
  query?: string;
}

export type LocalCategory = {
  name: string;
  slug: string;
  iconName: string;
};
