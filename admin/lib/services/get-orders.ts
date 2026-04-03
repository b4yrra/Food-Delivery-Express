import { OrderWithUser } from "@/app/(dashboard)/orders/_components/types";
import { Order } from "../types";

type GetOrders = {
  order: Order[];
};

export const getOrders = async (): Promise<OrderWithUser[]> => {
  try {
    const res = await fetch("http://localhost:3000/orders", {
      cache: "no-store",
    });
    const data = await res.json();
    const orders = Array.isArray(data.order) ? data.order : [];
    return orders as OrderWithUser[];
  } catch {
    return [];
  }
};
