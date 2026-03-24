import { getCategories } from "@/lib/services/get-catergories";
import { Category } from "@/lib/types";
import { FoodCategories } from "../_components/menu-categories";

const FoodsPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div>
      <FoodCategories categories={categories} />
    </div>
  );
};

export default FoodsPage;
