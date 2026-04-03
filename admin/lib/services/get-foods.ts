import { Food } from "../types";

type GetFoods = {
  foods: Food[];
};

export const getFoods = async () => {
  const response = await fetch(
    "https://food-delivery-express.onrender.com/foods",
  );
  const data: GetFoods = await response.json();

  return data.foods;
};
