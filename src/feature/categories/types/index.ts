import { PaginationCommonInput } from "@/src/feature/shared/type/api";

export interface CreateCategoryDto {
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
