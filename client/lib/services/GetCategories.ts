import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(
      "https://food-delivery-express.onrender.com/categories",
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error("getCategories failed:", res.status);
      return [];
    }

    const data = await res.json();
    return data.categories ?? [];
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
};
