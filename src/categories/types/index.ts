export interface CreateCategoryDto {
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
