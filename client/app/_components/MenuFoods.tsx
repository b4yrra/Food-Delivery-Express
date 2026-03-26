"use client";

import { Food, Category } from "@/lib/types";
import { FoodAddDialog } from "./AddFood";

type FoodProps = {
  foods: Food[];
  categories: Category[];
};

export const MenuFoods = ({ foods = [], categories = [] }: FoodProps) => {
  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => {
        const categoryFoods = foods.filter(
          (food) => food.foodCategoryId === category.id,
        );

        return (
          <div
            key={category.id}
            className="flex flex-col gap-3 border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <h2 className="font-mono font-semibold text-[16px] border-b border-slate-200 pb-2">
              {category.categoryName}
            </h2>
            <div className="flex gap-3 flex-wrap">
              <FoodAddDialog categories={categories} />
              {categoryFoods.map((food) => (
                <div
                  key={food.id}
                  className="text-[14px] font-mono py-2 px-4 border border-slate-200 rounded-xl shadow-sm bg-slate-50"
                >
                  <p className="font-medium">{food.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
