"use client";

import { MapPin, ShoppingCart, User } from "lucide-react";

type HeaderProps = {
  cartCount: number;
  onCartOpen: () => void;
};

export function Header({ cartCount, onCartOpen }: HeaderProps) {
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
          <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 hover:border-gray-400 transition-colors">
            <MapPin size={14} className="text-[#ef4444]" />
            <span>Add Location</span>
          </button>

          <button
            onClick={onCartOpen}
            className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors"
          >
            <ShoppingCart size={16} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
