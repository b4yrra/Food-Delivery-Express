"use client";

import { useEffect, useState, useRef } from "react";
import { Header } from "./Header";
import { HeroBanner } from "./Herobanner";
import { CartDrawer } from "./CartDrawer";
import { MenuSection } from "./MenuSection";
import { Category, Food } from "@/lib/types";

export type CartItem = Food & { quantity: number };

export const ClientContainer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, foodRes] = await Promise.all([
          fetch("https://food-delivery-express.onrender.com/categories"),
          fetch("https://food-delivery-express.onrender.com/foods"),
        ]);
        const catData = await catRes.json();
        const foodData = await foodRes.json();
        setCategories(catData.categories || []);
        setFoods(foodData.foods || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (food: Food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === foodId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === foodId ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      return prev.filter((item) => item.id !== foodId);
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const filteredFoods =
    activeCategory !== null
      ? foods.filter((f) => f.foodCategoryId === activeCategory)
      : foods;

  const groupedByCategory = categories
    .map((cat) => ({
      ...cat,
      foods: filteredFoods.filter((f) => f.foodCategoryId === cat.id),
    }))
    .filter((cat) => cat.foods.length > 0);

  return (
    <div className="min-h-screen bg-[#1a1a1a] font-sans">
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <HeroBanner />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Category filter pills */}
        <div className="flex gap-3 flex-wrap mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === null
                ? "bg-[#ef4444] text-white"
                : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#ef4444] text-white"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-[#333]"
              }`}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-[#ef4444] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {groupedByCategory.map((cat) => {
              const Sec: any = MenuSection;
              return (
                <Sec
                  key={cat.id}
                  category={cat}
                  cart={cart}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                />
              );
            })}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        total={cartTotal}
      />
    </div>
  );
};
