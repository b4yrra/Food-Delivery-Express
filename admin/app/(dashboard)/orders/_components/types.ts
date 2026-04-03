import { Order, User } from "@/lib/types";

export type DeliveryState = "Pending" | "Cancelled" | "Delivered";

export type OrderItem = {
  id: number;
  quantity: number;
  foodId: number;
  foodOrderId: number;
  food: {
    id: number;
    name: string;
    price: string;
    img: string;
  };
};

export type OrderWithUser = Order & {
  user?: User;
  foodOrderItems?: OrderItem[];
};

export const STATUS_STYLES: Record<string, string> = {
  Pending: "border border-red-400 bg-white",
  Delivered: "border border-green-500 bg-white",
  Cancelled: "border border-gray-300 bg-white",
  Canceled: "border border-gray-300 bg-white text-gray-500",
};

export const PER_PAGE = 10;
