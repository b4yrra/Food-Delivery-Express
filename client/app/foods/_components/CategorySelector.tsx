import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/types";

type CategorySelectorProps = {
  categories: Category[];
  onSelect: (categoryId: number) => void;
};

export function CategorySelector(props: CategorySelectorProps) {
  const { categories, onSelect } = props;
  return (
    <Select onValueChange={(value) => onSelect(Number(value))}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {categories.map((category) => {
            return (
              <SelectItem
                key={category.id}
                value={String(category.id)}
                className="font-mono"
              >
                {category.categoryName}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
