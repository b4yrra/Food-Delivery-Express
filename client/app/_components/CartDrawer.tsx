"use client";

import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { CartItem } from "./Container";
import { useState } from "react";
import { Food } from "@/lib/types";

const SHIPPING = 0.99;

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAdd: (food: Food) => void;
  onRemove: (foodId: number) => void;
  onDelete: (foodId: number) => void;
  total: number;
};

export function CartDrawer({
  open,
  onClose,
  cart,
  onAdd,
  onRemove,
  onDelete,
  total,
}: CartDrawerProps) {
  const [tab, setTab] = useState<"cart" | "order">("cart");
  const [address, setAddress] = useState("");

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out flex flex-col bg-[#3a3a3a] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "420px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart size={22} className="text-white" />
            <span className="text-white font-bold text-xl">Order detail</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-5">
          <div className="flex bg-white rounded-full p-1">
            <button
              onClick={() => setTab("cart")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === "cart"
                  ? "bg-[#ef4444] text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setTab("order")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === "order"
                  ? "bg-[#ef4444] text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Order
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-4">
          {/* My cart section */}
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-gray-500 font-semibold text-base mb-4">
              My cart
            </h3>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3">
                <ShoppingCart size={32} className="text-gray-300" />
                <p className="text-gray-400 text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {cart.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3 py-3">
                      {/* Image */}
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl">
                          🍽
                        </div>
                      )}

                      {/* Info + controls */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-bold text-[#ef4444] text-sm leading-tight">
                              {item.name}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                              {item.ingredients}
                            </p>
                          </div>
                          <button
                            onClick={() => onDelete(item.id)}
                            className="w-8 h-8 rounded-full border border-[#ef4444] flex items-center justify-center flex-shrink-0 hover:bg-red-50 transition-colors"
                          >
                            <X size={12} className="text-[#ef4444]" />
                          </button>
                        </div>

                        {/* Quantity + price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => onRemove(item.id)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Minus size={14} className="text-gray-700" />
                            </button>
                            <span className="font-bold text-gray-900 text-base min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onAdd(item)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <Plus size={14} className="text-gray-700" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-900 text-base">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dashed divider */}
                    {index < cart.length - 1 && (
                      <div className="border-t border-dashed border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery location */}
          <div className="bg-white rounded-2xl p-5">
            <h3 className="text-gray-500 font-semibold text-base mb-3">
              Delivery location
            </h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Please share your complete address"
              className="w-full h-24 text-sm text-gray-700 placeholder-gray-400 resize-none outline-none border border-gray-200 rounded-xl px-3 py-2"
            />
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-2xl p-5 mb-4">
            <h3 className="text-gray-500 font-semibold text-base mb-4">
              Payment info
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Items</span>
                <span className="font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="font-bold text-gray-900">
                  {SHIPPING.toFixed(2)}$
                </span>
              </div>
              <div className="border-t border-dashed border-gray-200 my-1" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total</span>
                <span className="font-bold text-gray-900">
                  ${(total + SHIPPING).toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full mt-5 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-4 rounded-full text-base transition-colors">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
