import { Food } from "../types";

export const getFoods = async (): Promise<Food[]> => {
  try {
    const res = await fetch(
      "https://food-delivery-express.onrender.com/foods",
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error("getFoods failed:", res.status);
      return [];
    }

    const data = await res.json();
    return data.foods ?? [];
  } catch (err) {
    console.error("getFoods error:", err);
    return [];
  }
};
