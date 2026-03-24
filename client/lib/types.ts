/// Food Types

export interface Food {
  id: number;
  name: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
  img: string;
  ingredients: string;
  category: Category;
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
}
