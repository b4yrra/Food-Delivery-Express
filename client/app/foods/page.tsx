import { getCategories } from "@/lib/services/get-catergories";
import { Category } from "@/lib/types";
import { FoodCategories } from "../_components/MenuCategories";
import { AddCategory } from "../_components/AddCategory";

const FoodsPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="px-10 py-10">
      <div className="bg-white p-6 flex flex-col gap-4 rounded-xl">
        <div className="text-[20px] font-semibold font-mono">
          Dishes category
        </div>
        <div className="flex gap-3 items-center">
          <FoodCategories categories={categories} />
          <AddCategory />
        </div>
      </div>
    </div>
  );
};

export default FoodsPage;
