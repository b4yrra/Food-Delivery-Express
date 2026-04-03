import { OrdersTable } from "./_components/OrdersTable";
import { OrderWithUser } from "./_components/types";

const getOrders = async (): Promise<OrderWithUser[]> => {
  try {
    const res = await fetch("http://localhost:3000/orders", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Orders fetch failed:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    console.log(
      "Orders fetched:",
      Array.isArray(data.order) ? data.order.length : "not array",
    );
    return Array.isArray(data.order) ? data.order : [];
  } catch (err) {
    console.error("Orders fetch error:", err);
    return [];
  }
};

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrdersTable initialOrders={orders} />;
}
