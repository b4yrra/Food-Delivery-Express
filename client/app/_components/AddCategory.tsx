"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Plus, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onAddCategory = async () => {
    setLoading(true);

    try {
      await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: categoryName }),
      });

      setOpen(false);
      router.refresh();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="w-9 h-9 bg-red-500 flex justify-center items-center rounded-full text-white font-semibold">
            <Plus size={16} />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader className="font-mono">
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2 font-mono">
              <Label>Category Name</Label>
              <Input type="text" onChange={onChange} value={categoryName} />
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              onClick={onAddCategory}
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
    </div>
  );
};
