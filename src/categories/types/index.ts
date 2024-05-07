export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
}
