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
import { LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type FoodAddDialogProps = {
  categories: Category[];
};

export function FoodAddDialog({ categories }: FoodAddDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState({
    name: "",
    price: "0",
    foodCategoryId: null as number | null,
    ingredients: "",
    img: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  const onSelectCategory = (foodCategoryId: number) => {
    setFood({ ...food, foodCategoryId });
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
      foodCategoryId: null,
      ingredients: "",
      img: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Food</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Food</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Label className="min-w-[120px]">Dish Name</Label>
            <Input
              type="text"
              placeholder="Food name"
              name="name"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center">
            <Label className="min-w-[120px]">Image URL</Label>
            <Input
              type="text"
              placeholder="Image URL"
              name="img"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center">
            <Label className="min-w-[120px]">Category</Label>
            <CategorySelector
              categories={categories}
              onSelect={onSelectCategory}
            />
          </div>

          <div className="flex items-center">
            <Label className="min-w-[120px]">Ingredients</Label>
            <Input
              type="text"
              placeholder="Fluffy pancakes ..."
              name="ingredients"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center">
            <Label className="min-w-[120px]">Price</Label>
            <Input
              type="number"
              placeholder="Food price"
              name="price"
              onChange={handleChange}
            />
          </div>
        </div>
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
