import { Category } from "../types";

type GetCategories = {
  categories: Category[];
};

export const getCategories = async () => {
  const response = await fetch(
    "https://food-delivery-express.onrender.com/categories",
  );
  const data: GetCategories = await response.json();

  return data.categories;
};
