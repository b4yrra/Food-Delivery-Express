"use client";

import { Food, Category } from "@/lib/types";
import { CartItem } from "./Container";
import { FoodCard } from "./FoodCard";
import { Separator } from "@/components/ui/separator";

type MenuSectionProps = {
  category: Category & { foods: Food[] };
  cart: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (foodId: number) => void;
};

export function MenuSection({
  category,
  cart,
  onAdd,
  onRemove,
}: MenuSectionProps) {
  if (category.foods.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-4 mb-5">
        <h2 className="text-white font-bold text-xl whitespace-nowrap">
          {category.categoryName}
        </h2>
        <Separator className="bg-gray-700 flex-1" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {category.foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            cartItem={cart.find((item) => item.id === food.id)}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
