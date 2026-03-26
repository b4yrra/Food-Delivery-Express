import { getCategories } from "@/lib/services/get-catergories";
import { Category, Food } from "@/lib/types";
import { FoodCategories } from "../_components/MenuCategories";
import { AddCategory } from "../_components/AddCategory";
import { MenuFoods } from "../_components/MenuFoods";
import { getFoods } from "@/lib/services/get-foods";
import { FoodAddDialog } from "../_components/AddFood";

const FoodsPage = async () => {
  const categories: Category[] = await getCategories();
  const Foods: Food[] = await getFoods();

  return (
    <div className="px-10 py-10 flex flex-col gap-8">
      <div className="bg-white p-6 flex flex-col gap-4 rounded-xl">
        <div className="text-[20px] font-semibold font-mono">
          Dishes category
        </div>
        <div className="flex gap-3 items-center">
          <FoodCategories categories={categories} />
          <AddCategory />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <MenuFoods foods={Foods} categories={categories} />
      </div>
    </div>
  );
};

export default FoodsPage;
