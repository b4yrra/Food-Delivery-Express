"use client";

import { Category } from "@/lib/types";

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
          selectedId === null
            ? "bg-black text-white border-black"
            : "border-slate-400"
        }`}
      >
        <p className="font-medium">All</p>
      </div>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() =>
            onSelect(selectedId === category.id ? null : category.id)
          }
          className={`flex gap-2 text-[14px] font-mono py-2 px-3 border rounded-full cursor-pointer ${
            selectedId === category.id
              ? "bg-black text-white border-black"
              : "border-slate-400"
          }`}
        >
          <p className="font-medium">{category.categoryName}</p>
          <p
            className={`px-2 rounded-full font-semibold ${
              selectedId === category.id
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >
            {category.foods.length}
          </p>
        </div>
      ))}
    </div>
  );
};
