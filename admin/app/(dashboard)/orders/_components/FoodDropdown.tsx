"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderItem } from "./types";

type Props = {
  orderId: number;
  items: OrderItem[];
};

export const FoodDropdown = ({ orderId, items }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 transition-colors">
          <span>
            {items.length} food{items.length !== 1 ? "s" : ""}
          </span>
          <ChevronDown size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px] font-mono">
        <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
          Order #{orderId} items
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length > 0 ? (
          items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-center gap-3 py-2 cursor-default focus:bg-gray-50"
            >
              {item.food?.img ? (
                <img
                  src={item.food.img}
                  alt={item.food.name}
                  className="w-8 h-8 rounded object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm">
                  🍽
                </div>
              )}
              <span className="text-sm text-gray-700 flex-1 truncate">
                {item.food?.name ?? `Food #${item.foodId}`}
              </span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                ${Number(item.food?.price ?? 0).toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                x{item.quantity}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No items</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
