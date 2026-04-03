import { OrdersTable } from "./_components/OrdersTable";
import { OrderWithUser } from "./_components/types";

const getOrders = async (): Promise<OrderWithUser[]> => {
  try {
    const res = await fetch("http://localhost:3000/orders", {
      cache: "no-store",
    });
    const data = await res.json();
    return Array.isArray(data.order) ? data.order : [];
  } catch {
    return [];
  }
};

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrdersTable initialOrders={orders} />;
}
