import { Food } from "../types";

type GetFoods = {
  foods: Food[];
};

export const getFoods = async () => {
  const response = await fetch("http://localhost:3000/foods");
  const data: GetFoods = await response.json();

  return data.foods;
};
