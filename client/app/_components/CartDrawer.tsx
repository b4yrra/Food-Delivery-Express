"use client";

import { Plus, Minus, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./Container";
import { Food } from "@/lib/types";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (foodId: number) => void;
  total: number;
};

export function CartDrawer({
  open,
  onClose,
  cart,
  onAdd,
  onRemove,
  total,
}: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-sm p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-gray-100">
          <SheetTitle className="text-left">Your Cart</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <p className="text-gray-400 text-xs">Add some delicious food!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-xl">
                      🍽
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-[#ef4444] font-bold text-sm">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 border border-gray-200 rounded-full px-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 rounded-full"
                      onClick={() => onRemove(item.id)}
                    >
                      <Minus size={10} />
                    </Button>
                    <span className="text-sm font-bold text-gray-800 min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 rounded-full"
                      onClick={() => onAdd(item)}
                    >
                      <Plus size={10} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="font-bold text-gray-900 text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <Button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-full">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
