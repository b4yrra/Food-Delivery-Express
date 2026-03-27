import { getCategories } from "@/lib/services/get-catergories";
import { getFoods } from "@/lib/services/get-foods";
import { Category } from "@/lib/types";
import { Food } from "@/lib/types";
import { MenuContainer } from "../_components/MenuContainer";

const FoodsPage = async () => {
  const categories: Category[] = await getCategories();
  const foods: Food[] = await getFoods();

  return (
    <div className="px-10 py-10">
      <MenuContainer categories={categories} foods={foods} />
    </div>
  );
};

export default FoodsPage;
