import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";

type FoodCategoriesProps = {
  categories: Category[];
};

export const FoodCategories = ({ categories = [] }: FoodCategoriesProps) => {
  return (
    <div>
      {categories.map((category) => (
        <Button key={category.id} className="text-black">
          {category.categoryName}
        </Button>
      ))}
    </div>
  );
};
