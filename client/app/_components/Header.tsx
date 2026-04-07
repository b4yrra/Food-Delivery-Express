"use client";

import { ChefHat, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

export function Header({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 h-16 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <ChefHat size={50} color="white" />
          <div>
            <h1 className="text-[20px] font-semibold text-white">
              BatDelivery
            </h1>
            <p className="text-[12px] text-white">Swift Delivery</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm text-gray-600 bg-white hover:text-black"
          >
            <MapPin size={14} className="text-[#ef4444]" />
            Add Location
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full relative bg-white"
            onClick={onCartOpen}
          >
            <ShoppingCart size={16} className="text-black" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-[#ef4444] hover:bg-[#ef4444] text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Button size="icon" className="rounded-full bg-red-500">
            <User size={16} className="text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
}
