import { Order } from "../types";

type GetOrders = {
  order: Order[];
};

export const getOrders = async () => {
  const response = await fetch("http://localhost:3000/orders");
  const data: GetOrders = await response.json();

  return data.order;
};
