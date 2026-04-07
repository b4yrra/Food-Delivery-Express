"use client";

import { Plus, Minus } from "lucide-react";
import { CartItem } from "./Container";
import { Food } from "@/lib/types";

type FoodCardProps = {
  food: Food;
  cartItem?: CartItem;
  onAdd: (food: Food) => void;
  onRemove: (foodId: number) => void;
};

export function FoodCard({ food, cartItem, onAdd, onRemove }: FoodCardProps) {
  const inCart = cartItem && cartItem.quantity > 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        {food.img ? (
          <img
            src={food.img}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍽
          </div>
        )}

        {/* Add/Remove button */}
        <div className="absolute bottom-2 right-2">
          {!inCart ? (
            <button
              onClick={() => onAdd(food)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#ef4444] hover:text-white transition-all duration-200 group/btn"
            >
              <Plus
                size={14}
                className="text-gray-600 group-hover/btn:text-white"
              />
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-white rounded-full px-1 shadow-md">
              <button
                onClick={() => onRemove(food.id)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <Minus size={12} className="text-[#ef4444]" />
              </button>
              <span className="text-sm font-bold text-gray-800 min-w-[16px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => onAdd(food)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus size={12} className="text-[#ef4444]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <p className="font-bold text-[#ef4444] text-sm leading-tight">
            {food.name}
          </p>
          <p className="font-semibold text-gray-800 text-sm whitespace-nowrap">
            ${Number(food.price).toFixed(2)}
          </p>
        </div>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
}
