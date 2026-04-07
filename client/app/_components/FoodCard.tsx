"use client";

import { useState } from "react";
import { Plus, Minus, X } from "lucide-react";
import { CartItem } from "./Container";
import { Food } from "@/lib/types";
import { Button } from "@/components/ui/button";

type FoodCardProps = {
  food: Food;
  cartItem?: CartItem;
  onAdd: (food: Food) => void;
  onRemove: (foodId: number) => void;
};

export function FoodCard({ food, cartItem, onAdd, onRemove }: FoodCardProps) {
  const inCart = cartItem && cartItem.quantity > 0;
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd(food);
    }
    setQuantity(1);
    setOpen(false);
  };

  const handleOpen = () => {
    setQuantity(1);
    setOpen(true);
  };

  return (
    <>
      {/* Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
        style={{ width: "397.333px", height: "342px" }}
        onClick={handleOpen}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden bg-gray-100"
          style={{ height: "240px" }}
        >
          {food.img ? (
            <img
              src={food.img}
              alt={food.name}
              className="w-full h-full object-cover p-4 rounded-2xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              🍽
            </div>
          )}

          {/* Add/Remove button */}
          <div
            className="absolute bottom-2 right-2"
            onClick={(e) => e.stopPropagation()}
          >
            {!inCart ? (
              <button
                onClick={() => onAdd(food)}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#ef4444] transition-all duration-200 group/btn"
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
        <div className="p-3" style={{ height: "102px" }}>
          <div className="flex justify-between items-start gap-2">
            <p className="font-bold text-[#ef4444] text-[24px] leading-tight">
              {food.name}
            </p>
            <p className="font-semibold text-gray-800 text-[18px] whitespace-nowrap">
              ${Number(food.price).toFixed(2)}
            </p>
          </div>
          <p className="text-gray-600 text-[14px] mt-1 leading-relaxed line-clamp-2">
            {food.ingredients}
          </p>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className="bg-white rounded-2xl overflow-hidden flex pointer-events-auto"
              style={{ width: "700px" }}
            >
              {/* Left - image */}
              <div
                className="flex-shrink-0 bg-white"
                style={{ width: "340px" }}
              >
                {food.img ? (
                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "340px" }}
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center text-6xl"
                    style={{ minHeight: "340px" }}
                  >
                    🍽
                  </div>
                )}
              </div>

              {/* Right - details */}
              <div className="flex-1 p-10 flex flex-col justify-between relative bg-white">
                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X size={14} className="text-gray-600" />
                </button>

                <div className="flex flex-col gap-4 mt-4">
                  <h2 className="text-[#ef4444] font-bold text-2xl leading-tight">
                    {food.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {food.ingredients}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total price</p>
                      <p className="text-gray-900 font-bold text-2xl">
                        ${(Number(food.price) * quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-2">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-semibold text-lg min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-6 rounded-full text-base"
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
