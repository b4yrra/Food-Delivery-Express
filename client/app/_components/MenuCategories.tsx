import { Category } from "@/lib/types";

type FoodCategoriesProps = {
  categories: Category[];
};

export const FoodCategories = ({ categories = [] }: FoodCategoriesProps) => {
  return (
    <div className="flex gap-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex gap-2 text-[14px] font-mono py-2 px-3 border border-slate-400 rounded-full"
        >
          <p className="font-medium">{category.categoryName}</p>
          <p className="bg-black text-white px-2 rounded-full font-semibold">
            {category.foods.length}
          </p>
        </div>
      ))}
    </div>
  );
};
