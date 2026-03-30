"use client";

import { Food, Category } from "@/lib/types";
import { FoodAddDialog } from "./AddFood";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpdateFood } from "./UpdateFood";
import { Button } from "@/components/ui/button";

type FoodProps = {
  foods: Food[];
  categories: Category[];
  selectedId: number | null;
};

export const MenuFoods = ({
  foods = [],
  categories = [],
  selectedId,
}: FoodProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteCat, setDeleteCat] = useState<number | null>(null);

  const visibleCategories = selectedId
    ? categories.filter((c) => c.id === selectedId)
    : categories;

  const handleDelete = async (e: React.MouseEvent, foodId: number) => {
    e.stopPropagation();
    setDeletingId(foodId);
    try {
      await fetch(`http://localhost:3000/foods/${foodId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCategory = async (
    e: React.MouseEvent,
    categoryId: number,
  ) => {
    e.stopPropagation();
    setDeleteCat(categoryId);

    try {
      await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteCat(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {visibleCategories.map((category) => {
        const categoryFoods = foods.filter(
          (food) => food.foodCategoryId === category.id,
        );

        return (
          <div
            key={category.id}
            className="flex flex-col gap-3 border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md bg-white"
          >
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h2 className="font-mono font-semibold text-[16px]">
                {category.categoryName}
              </h2>
              <Button
                className="cursor-pointer rounded-full"
                onClick={(e) => handleDeleteCategory(e, category.id)}
                disabled={deleteCat === category.id}
              >
                <Trash2 size={20} />
              </Button>
            </div>
            <div className="flex gap-3 flex-wrap">
              <FoodAddDialog
                categories={categories}
                defaultCategoryId={category.id}
              />
              {categoryFoods.map((food) => (
                <div
                  key={food.id}
                  className="group relative text-[14px] font-mono p-4 border border-[#E4E4E7] rounded-xl shadow-sm transition-all duration-200 hover:border-black cursor-pointer w-[270.75px] h-[241px]"
                >
                  <button
                    onClick={(e) => handleDelete(e, food.id)}
                    disabled={deletingId === food.id}
                    className="absolute bottom-28 left-8 z-10 p-3 rounded-full cursor-pointer bg-red-500 hover:bg-red-600 text-white transition-all duration-150 disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>
                  <UpdateFood food={food} categories={categories} />
                  <div className="flex flex-col gap-3">
                    <div>
                      {food.img === "" ? (
                        ""
                      ) : (
                        <img
                          src={food.img}
                          className="w-[238.75px] h-[129px] object-cover object-center rounded-xl"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3 overflow-hidden h-[60px]">
                      <div className="flex justify-between">
                        <p className="font-bold text-red-500 text-[12px]">
                          {food.name}
                        </p>
                        <div className="font-semibold text-[12px]">
                          ${food.price}
                        </div>
                      </div>
                      <div className="text-[10px] font-semibold">
                        {food.ingredients}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
