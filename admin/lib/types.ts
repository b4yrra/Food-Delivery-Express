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
  foods: Food[];
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  password: string;
  ttl: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
