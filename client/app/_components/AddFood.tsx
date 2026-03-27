"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@/lib/types";
import { ChangeEventHandler, useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { LoaderCircle, Plus, Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

type FoodAddDialogProps = {
  categories: Category[];
  defaultCategoryId?: number;
};

export function FoodAddDialog({
  categories,
  defaultCategoryId,
}: FoodAddDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState({
    name: "",
    price: "0",
    foodCategoryId: defaultCategoryId ?? (null as number | null),
    ingredients: "",
    img: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  const onSelectCategory = (foodCategoryId: number) => {
    setFood({ ...food, foodCategoryId });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFood({ ...food, img: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const onAddFood = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setFood({
      name: "",
      price: "0",
      foodCategoryId: defaultCategoryId ?? null,
      ingredients: "",
      img: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-[270.75px] h-[241px] border-dashed border border-red-500 rounded-xl flex justify-center pt-20 transition-all duration-200 hover:bg-red-100 cursor-pointer">
          <Button
            variant={"outline"}
            className="text-white bg-red-500 rounded-full w-10 h-10 flex justify-center items-center"
          >
            <Plus />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-mono w-[460px] h-[592px]">
        <DialogHeader className="flex flex-col gap-10">
          <DialogTitle>
            Add new Dish to{" "}
            <span>
              {categories.find((c) => c.id === defaultCategoryId)?.categoryName}
            </span>
          </DialogTitle>

          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label className="min-w-[120px]">Food name</Label>
              <Input
                type="text"
                placeholder="Type food name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="min-w-[120px]">Food price</Label>
              <Input
                type="number"
                placeholder="Enter price..."
                name="price"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="min-w-[120px]">Ingredients</Label>
            <Textarea
              placeholder="List ingredients..."
              name="ingredients"
              onChange={handleChange}
              className="h-[90px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <Label className="min-w-[120px]">Food image</Label>
            <div className="relative flex flex-col gap-2 justify-center items-center w-104 h-60 bg-slate-100 rounded-xl">
              {food.img ? (
                <img
                  src={food.img}
                  alt="preview"
                  className="absolute w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="absolute flex flex-col items-center gap-2">
                  <Image size={25} />
                  <div className="text-black text-[14px] font-medium">
                    Browse or Drop Image
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="picture"
                className="border h-full w-full rounded-lg p-3 text-transparent border-slate-300 cursor-pointer bg-[#7F7F800D] opacity-0 absolute"
              />
            </div>
          </div>
        </DialogHeader>

        {!defaultCategoryId && (
          <div className="flex items-center">
            <Label className="min-w-[120px]">Category</Label>
            <CategorySelector
              categories={categories}
              onSelect={onSelectCategory}
            />
          </div>
        )}

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={onAddFood} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Add Food"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
