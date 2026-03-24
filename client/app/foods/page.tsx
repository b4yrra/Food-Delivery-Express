import { getCategories } from "@/lib/services/get-catergories";
import { Category } from "@/lib/types";
import { FoodCategories } from "../_components/menu-categories";

const FoodsPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="px-10 py-10">
      <div className="bg-white p-6 flex flex-col gap-4 rounded-xl">
        <div className="text-[20px] font-semibold font-mono">
          Dishes category
        </div>
        <FoodCategories categories={categories} />
      </div>
    </div>
  );
};

export default FoodsPage;
