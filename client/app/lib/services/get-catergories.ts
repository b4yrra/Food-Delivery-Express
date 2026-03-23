import { Category } from "../types";

type GetCategories = {
  category: Category[];
};

export const getCategories = async () => {
  const response = await fetch("http://localhost:3000/categories");
  const data: GetCategories = await response.json();

  return data.category;
};
