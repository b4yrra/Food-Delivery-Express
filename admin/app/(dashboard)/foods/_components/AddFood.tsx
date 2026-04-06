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
import { CldUpload } from "./CldUpload";

type Food = {
  name: string;
  price: string;
  foodCategoryId: any;
  ingredients: string;
  img: string;
};

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
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<Food>({
    name: "",
    price: "",
    foodCategoryId: defaultCategoryId ?? (null as number | null),
    ingredients: "",
    img: "",
  });
  const [food, setFood] = useState<Food>({
    name: "",
    price: "0",
    foodCategoryId: defaultCategoryId ?? (null as number | null),
    ingredients: "",
    img: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });

    setError({ ...error, [event.target.name]: "" });
  };
  const handleError = () => {
    const isValid = {};

    if (food.name === "") {
      isValid.name = "Enter Dish Name";
    }

    if (!food.price || food.price === "0") {
      isValid.price = "Enter Price";
    }

    if (food.ingredients === "") {
      isValid.ingredients = "Enter Ingredients";
    }

    if (food.img === "") {
      isValid.img = "Upload an Image";
    }

    setError(isValid);
  };

  const onAddFood = async () => {
    setSubmitted(true);

    if (!food.name || !food.price || !food.ingredients || !food.img) {
      handleError();
      return;
    }

    setLoading(true);

    try {
      await fetch("https://food-delivery-express.onrender.com/foods", {
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

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setSubmitted(false);
      setError({});
    }
  };

  const onSelectCategory = (foodCategoryId: number) => {
    setFood({ ...food, foodCategoryId });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="w-[270.75px] h-[241px] border-dashed border border-red-500 rounded-xl flex justify-center pt-20 transition-all duration-200 hover:bg-red-100 cursor-pointer">
          <div className="text-white bg-red-500 rounded-full w-10 h-10 flex justify-center items-center">
            <Plus size={15} />
          </div>
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
        </DialogHeader>

        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label className="min-w-[120px]">Food name</Label>

            <Input
              type="text"
              placeholder="Type food name"
              name="name"
              onChange={handleChange}
            />
            {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="min-w-[120px]">Food price</Label>
            <Input
              type="number"
              placeholder="Enter price..."
              name="price"
              onChange={handleChange}
            />
            {error.price && (
              <p className="text-red-500 text-xs">{error.price}</p>
            )}
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
          {error.ingredients && (
            <p className="text-red-500 text-xs">{error.ingredients}</p>
          )}
        </div>

        {!defaultCategoryId && (
          <div className="flex items-center">
            <Label className="min-w-[120px]">Category</Label>
            <CategorySelector
              categories={categories}
              onSelect={onSelectCategory}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label className="min-w-[120px]">Food image URL</Label>
          <CldUpload
            onUpload={(url) => {
              setFood((prev) => ({ ...prev, img: url }));
              setError((prev) => ({ ...prev, img: "" }));
            }}
          />
        </div>

        <DialogFooter className="sm:justify-end items-center bg-slate-100">
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

// <div className={`flex flex-col gap-2 ${food.img ? "" : "mb-30"}`}>
//   <Label className="min-w-[120px]">Food image URL</Label>
//   <Input
//     type="text"
//     placeholder="Paste image URL..."
//     name="img"
//     onChange={handleChange}
//   />
//   {food.img && (
//     <img
//       src={food.img}
//       alt="preview"
//       className="w-full h-40 object-cover rounded-lg"
//     />
//   )}
//   {error.img && <p className="text-red-500 text-xs">{error.img}</p>}
// </div>
