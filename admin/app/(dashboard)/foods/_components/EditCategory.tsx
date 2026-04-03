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
import { LoaderCircle, Pencil, Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { CategorySelector } from "./CategorySelector";

type UpdateFoodProps = {
  category: Category;
};

export const UpdateCategory = ({ category }: UpdateFoodProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.categoryName,
  });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
  };

  const onUpdate = async () => {
    setLoading(true);
    try {
      await fetch(
        `https://food-delivery-express.onrender.com/categories/${category.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryName: updatedCategory.name }),
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
    if (val) {
      setUpdatedCategory({ name: category.categoryName });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer rounded-full"
        >
          <Pencil size={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="font-mono">
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2 font-mono">
            <Label>Category Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Type category name"
              value={updatedCategory.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            onClick={onUpdate}
            disabled={loading}
            className="font-mono"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add Category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
