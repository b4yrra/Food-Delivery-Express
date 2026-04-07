"use client";

import { MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

export function MenuSection({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ef4444] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="font-bold text-lg">
            <span className="text-[#ef4444]">Nom</span>
            <span className="text-gray-900">Nom</span>
          </span>
          <span className="text-xs text-gray-400 ml-1">Swift delivery</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm text-gray-600"
          >
            <MapPin size={14} className="text-[#ef4444]" />
            Add Location
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full relative"
            onClick={onCartOpen}
          >
            <ShoppingCart size={16} className="text-gray-600" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-[#ef4444] hover:bg-[#ef4444] text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Button variant="outline" size="icon" className="rounded-full">
            <User size={16} className="text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}
