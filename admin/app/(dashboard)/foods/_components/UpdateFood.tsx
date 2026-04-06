"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Food, Category } from "@/lib/types";
import { ChangeEventHandler, useState } from "react";
import { LoaderCircle, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategorySelector } from "./CategorySelector";
import { CldUpload } from "./CldUpload";

type UpdateFoodProps = {
  food: Food;
  categories: Category[];
};

export const UpdateFood = ({ food, categories }: UpdateFoodProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedFood, setUpdatedFood] = useState({
    name: food.name,
    price: food.price,
    foodCategoryId: food.foodCategoryId,
    ingredients: food.ingredients,
    img: food.img,
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setUpdatedFood({ ...updatedFood, [e.target.name]: e.target.value });
  };

  const onSelectCategory = (foodCategoryId: number) => {
    setUpdatedFood({ ...updatedFood, foodCategoryId });
  };

  const onImageUpload = (url: string) => {
    setUpdatedFood((prev) => ({ ...prev, img: url }));
  };

  const onUpdate = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://food-delivery-express.onrender.com/foods/${food.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFood),
        },
      );
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      // Reset form back to original food data on close
      setUpdatedFood({
        name: food.name,
        price: food.price,
        foodCategoryId: food.foodCategoryId,
        ingredients: food.ingredients,
        img: food.img,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-28 right-8 z-10 p-3 bg-white rounded-full hover:bg-slate-300 text-white transition-all duration-150 cursor-pointer"
        >
          <Pencil size={14} color="red" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md font-mono w-[460px] h-[640px] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-10">
          <DialogTitle>Update Dish</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label>Food name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Type food name"
              value={updatedFood.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Food price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Enter price..."
              value={updatedFood.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Ingredients</Label>
          <Textarea
            name="ingredients"
            value={updatedFood.ingredients}
            placeholder="List ingredients..."
            onChange={handleChange}
            className="h-[90px] resize-none"
          />
        </div>

        <div className="flex items-center">
          <Label className="min-w-[120px]">Category</Label>
          <CategorySelector
            categories={categories}
            onSelect={onSelectCategory}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Food image</Label>
          <CldUpload onUpload={onImageUpload} currentImage={updatedFood.img} />
        </div>

        <DialogFooter className="sm:justify-end bg-slate-100">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onUpdate}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Update Food"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
