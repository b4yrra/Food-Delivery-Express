"use client";

import { Category } from "@/lib/types";
import { AddCategory } from "./AddCategory";

type FoodCategoriesProps = {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
};

export const FoodCategories = ({
  categories = [],
  selectedId,
  onSelect,
}: FoodCategoriesProps) => {
  return (
    <div className="flex gap-3 flex-wrap">
      <div
        onClick={() => onSelect(null)}
        className={`flex gap-2 text-[14px] font-mono py-2 px-3 border rounded-full cursor-pointer ${
          selectedId === null ? "border-red-500" : "border-slate-400"
        }`}
      >
        <p className="font-medium">All Dishes</p>
      </div>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() =>
            onSelect(selectedId === category.id ? null : category.id)
          }
          className={`flex gap-2 text-[14px] font-mono py-2 px-3 border rounded-full cursor-pointer transition-all border: ${
            selectedId === category.id ? "border-red-500" : "border-slate-400"
          }`}
        >
          <p className="font-medium">{category.categoryName}</p>
          <p className={`px-2 rounded-full font-semibold bg-black text-white`}>
            {category.foods.length}
          </p>
        </div>
      ))}
      <AddCategory />
    </div>
  );
};
