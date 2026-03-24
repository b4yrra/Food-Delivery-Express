import { Category } from "../types";

type GetCategories = {
  categories: Category[];
};

export const getCategories = async () => {
  const response = await fetch("http://localhost:3000/categories");
  const data: GetCategories = await response.json();

  return data.categories;
};
