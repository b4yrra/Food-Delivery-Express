"use client";

import { Food, Category } from "@/lib/types";
import { FoodAddDialog } from "./AddFood";

type FoodProps = {
  foods: Food[];
  categories: Category[];
  selectedId: number | null;
};

export const MenuFoods = ({
  foods = [],
  categories = [],
  selectedId,
}: FoodProps) => {
  const visibleCategories = selectedId
    ? categories.filter((c) => c.id === selectedId)
    : categories;

  return (
    <div className="flex flex-col gap-6">
      {visibleCategories.map((category) => {
        const categoryFoods = foods.filter(
          (food) => food.foodCategoryId === category.id,
        );

        return (
          <div
            key={category.id}
            className="flex flex-col gap-3 border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md bg-white"
          >
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h2 className="font-mono font-semibold text-[16px]">
                {category.categoryName}
              </h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <FoodAddDialog
                categories={categories}
                defaultCategoryId={category.id}
              />
              {categoryFoods.map((food) => (
                <div
                  key={food.id}
                  className="text-[14px] font-mono p-4 border border-[#E4E4E7] rounded-xl shadow-sm transition-all duration-200 hover:bg-black hover:text-white hover:border-black cursor-pointer w-[270.75px] h-[241px]"
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      {food.img === "" ? (
                        ""
                      ) : (
                        <img
                          src={food.img}
                          className="w-[238.75px] h-[129px] object-cover object-center rounded-xl"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-red-500 text-[14px]">
                          {food.name}
                        </p>
                        <div>${food.price}</div>
                      </div>
                      <div>{food.ingredients}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
