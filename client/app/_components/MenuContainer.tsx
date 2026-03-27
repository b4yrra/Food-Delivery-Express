"use client";

import { useState } from "react";
import { Category, Food } from "@/lib/types";
import { FoodCategories } from "./MenuCategories";
import { MenuFoods } from "./MenuFoods";
import { AddCategory } from "./AddCategory";
import { FoodAddDialog } from "./AddFood";

type Props = {
  categories: Category[];
  foods: Food[];
};

export const MenuContainer = ({ categories, foods }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-6 flex flex-col gap-4 rounded-xl">
        <div className="text-[20px] font-semibold font-mono">
          Dishes category
        </div>
        <div className="flex gap-3 items-center">
          <FoodCategories
            categories={categories}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <AddCategory />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[20px] font-semibold font-mono">Foods</div>
      </div>
      <MenuFoods
        foods={foods}
        categories={categories}
        selectedId={selectedId}
      />
    </div>
  );
};
