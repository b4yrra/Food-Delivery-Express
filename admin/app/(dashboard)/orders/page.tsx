"use client";

import { useEffect, useState } from "react";
import { Fragment } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { getOrders } from "@/lib/services/get-orders";
import { getUsers } from "@/lib/services/get-users";
import { Order, User } from "@/lib/types";

type DeliveryState = "Pending" | "Cancelled" | "Delivered";

type OrderItem = {
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

type OrderWithUser = Order & {
  user?: User;
  foodOrderItems?: OrderItem[];
};

const STATUS_STYLES: Record<string, string> = {
  Pending: "border border-amber-400 text-amber-700 bg-amber-50",
  Delivered: "border border-green-500 text-green-700 bg-green-50",
  Cancelled: "border border-gray-300 text-gray-500 bg-white",
};

const PER_PAGE = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [openStatusMenu, setOpenStatusMenu] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersData, usersData] = await Promise.all([
          getOrders(),
          getUsers(),
        ]);

        const safeOrders = Array.isArray(ordersData) ? ordersData : [];
        const safeUsers = Array.isArray(usersData) ? usersData : [];

        // Fetch each order with food items
        const ordersWithItems = await Promise.all(
          safeOrders.map(async (order) => {
            try {
              const res = await fetch(
                `http://localhost:3000/orders/${order.id}`,
              );
              const data = await res.json();
              return {
                ...data.order,
                user: safeUsers.find((u) => u.id === order.userId),
              };
            } catch {
              return {
                ...order,
                user: safeUsers.find((u) => u.id === order.userId),
                foodOrderItems: [],
              };
            }
          }),
        );

        setOrders(ordersWithItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalPages = Math.ceil(orders.length / PER_PAGE);
  const slice = orders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const sliceIds = slice.map((o) => o.id);
    const allSelected = sliceIds.every((id) => selectedIds.has(id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      sliceIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  };

  const setStatus = async (id: number, status: DeliveryState) => {
    try {
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error(err);
    }
    setOpenStatusMenu(null);
  };

  const getPaginationPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="p-6 min-h-screen bg-slate-100 font-mono"
      onClick={() => setOpenStatusMenu(null)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">{orders.length} items</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition-colors">
            <Calendar size={14} />
            13 June 2023 – 14 July 2023
          </button>
          <button className="text-sm text-gray-400 border border-gray-200 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition-colors">
            Change delivery state
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 cursor-pointer"
                  checked={
                    slice.length > 0 &&
                    slice.every((o) => selectedIds.has(o.id))
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal w-10">
                №
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Customer
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Food
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Date <ChevronDown size={12} className="inline" />
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Total
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Delivery Address
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Delivery state <ChevronDown size={12} className="inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-16 text-gray-400 text-sm"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              slice.map((order) => (
                <Fragment key={order.id}>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                        checked={selectedIds.has(order.id)}
                        onChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td className="px-3 py-3 text-gray-400">{order.id}</td>
                    <td className="px-3 py-3 text-gray-700">
                      {order.user?.email ?? `User #${order.userId}`}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === order.id ? null : order.id,
                          )
                        }
                      >
                        <span>
                          {order.foodOrderItems?.length ?? 0} food
                          {(order.foodOrderItems?.length ?? 0) !== 1 ? "s" : ""}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            expandedRow === order.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 font-medium text-gray-800">
                      ${Number(order.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-gray-400 max-w-[180px] truncate text-xs">
                      {order.user?.address ?? "—"}
                    </td>
                    <td className="px-3 py-3">
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
                            STATUS_STYLES[order.status] ??
                            STATUS_STYLES["Cancelled"]
                          }`}
                          onClick={() =>
                            setOpenStatusMenu(
                              openStatusMenu === order.id ? null : order.id,
                            )
                          }
                        >
                          {order.status}
                          <ChevronDown size={12} />
                        </button>
                        {openStatusMenu === order.id && (
                          <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden min-w-[130px]">
                            {(
                              [
                                "Pending",
                                "Delivered",
                                "Cancelled",
                              ] as DeliveryState[]
                            ).map((s) => (
                              <button
                                key={s}
                                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => setStatus(order.id, s)}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded food items row */}
                  {expandedRow === order.id && (
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={2} />
                      <td colSpan={6} className="px-3 py-3">
                        <div className="flex flex-col gap-2">
                          {order.foodOrderItems &&
                          order.foodOrderItems.length > 0 ? (
                            order.foodOrderItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2 w-fit min-w-[280px]"
                              >
                                {item.food?.img ? (
                                  <img
                                    src={item.food.img}
                                    alt={item.food.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                                    🍽
                                  </div>
                                )}
                                <span className="text-sm text-gray-700">
                                  {item.food?.name ?? `Food #${item.foodId}`}
                                </span>
                                <span className="text-xs text-gray-400">
                                  ${Number(item.food?.price ?? 0).toFixed(2)}
                                </span>
                                <span className="ml-auto text-xs text-gray-400">
                                  x{item.quantity}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400">
                              No food items found
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-gray-100">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          {getPaginationPages().map((p, i) =>
            p === "..." ? (
              <span
                key={`dots-${i}`}
                className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                  page === p
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ),
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
