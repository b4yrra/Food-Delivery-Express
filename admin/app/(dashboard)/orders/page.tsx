"use client";

import { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOrders } from "@/lib/services/get-orders";
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
  Pending: "border border-red-400 text-red-500 bg-white",
  Delivered: "border border-green-500 text-green-600 bg-white",
  Cancelled: "border border-gray-300 text-gray-500 bg-white",
};

const PER_PAGE = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithUser[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openStatusMenu, setOpenStatusMenu] = useState<number | null>(null);
  const [openBulkMenu, setOpenBulkMenu] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const ordersData = await getOrders();
        const safeOrders = Array.isArray(ordersData) ? ordersData : [];

        const ordersWithItems = await Promise.all(
          safeOrders.map(async (order) => {
            try {
              const res = await fetch(
                `http://localhost:3000/orders/${order.id}`,
              );
              const data = await res.json();
              return data.order as OrderWithUser;
            } catch {
              return { ...order, foodOrderItems: [] } as OrderWithUser;
            }
          }),
        );

        setOrders(ordersWithItems);
        setFilteredOrders(ordersWithItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    let result = orders;
    if (dateFrom) {
      result = result.filter(
        (o) => new Date(o.createdAt) >= new Date(dateFrom),
      );
    }
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((o) => new Date(o.createdAt) <= to);
    }
    setFilteredOrders(result);
    setPage(1);
  }, [dateFrom, dateTo, orders]);

  const totalPages = Math.ceil(filteredOrders.length / PER_PAGE);
  const slice = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

  const setBulkStatus = async (status: DeliveryState) => {
    if (selectedIds.size === 0) return;
    setBulkLoading(true);
    setOpenBulkMenu(false);
    try {
      await Promise.all(
        Array.from(selectedIds).map((id) =>
          fetch(`http://localhost:3000/orders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          }),
        ),
      );
      setOrders((prev) =>
        prev.map((o) => (selectedIds.has(o.id) ? { ...o, status } : o)),
      );
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
    }
    setBulkLoading(false);
  };

  const clearDateFilter = () => {
    setDateFrom("");
    setDateTo("");
    setShowDatePicker(false);
  };

  const formatDateRange = () => {
    if (!dateFrom && !dateTo) return "Select date range";
    const fmt = (d: string) =>
      d
        ? new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "...";
    return `${fmt(dateFrom)} – ${fmt(dateTo)}`;
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
      onClick={() => {
        setOpenStatusMenu(null);
        setOpenBulkMenu(false);
        setShowDatePicker(false);
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {filteredOrders.length} items
            {selectedIds.size > 0 && (
              <span className="ml-2 text-gray-500">
                · {selectedIds.size} selected
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date range picker */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`flex items-center gap-2 text-sm border rounded-lg px-3 py-2 bg-white hover:bg-gray-50 transition-colors ${
                dateFrom || dateTo
                  ? "border-gray-400 text-gray-700"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <Calendar size={14} />
              {formatDateRange()}
              {(dateFrom || dateTo) && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    clearDateFilter();
                  }}
                  className="ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  ✕
                </span>
              )}
            </button>
            {showDatePicker && (
              <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-3 min-w-[260px]">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                  />
                </div>
                <button
                  onClick={clearDateFilter}
                  className="text-xs text-gray-400 hover:text-gray-600 text-left"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          {/* Bulk change delivery state */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() =>
                selectedIds.size > 0 && setOpenBulkMenu(!openBulkMenu)
              }
              disabled={selectedIds.size === 0 || bulkLoading}
              className={`text-sm border rounded-lg px-4 py-2 transition-colors ${
                selectedIds.size > 0
                  ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  : "border-gray-200 text-gray-300 bg-white cursor-not-allowed"
              }`}
            >
              {bulkLoading ? "Updating..." : "Change delivery state"}
            </button>
            {openBulkMenu && (
              <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden min-w-[140px]">
                {(["Pending", "Delivered", "Cancelled"] as DeliveryState[]).map(
                  (s) => (
                    <button
                      key={s}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setBulkStatus(s)}
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
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
                <span className="flex items-center gap-1">
                  Date
                  <span className="flex flex-col leading-none">
                    <ChevronUp size={10} />
                    <ChevronDown size={10} />
                  </span>
                </span>
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Total
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                Delivery Address
              </th>
              <th className="px-3 py-3 text-left text-gray-400 font-normal">
                <span className="flex items-center gap-1">
                  Delivery state
                  <span className="flex flex-col leading-none">
                    <ChevronUp size={10} />
                    <ChevronDown size={10} />
                  </span>
                </span>
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

                    {/* Food dropdown */}
                    <td className="px-3 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 transition-colors">
                            <span>
                              {order.foodOrderItems?.length ?? 0} food
                              {(order.foodOrderItems?.length ?? 0) !== 1
                                ? "s"
                                : ""}
                            </span>
                            <ChevronDown size={14} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[280px] font-mono"
                        >
                          <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                            Order #{order.id} items
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {order.foodOrderItems &&
                          order.foodOrderItems.length > 0 ? (
                            order.foodOrderItems.map((item) => (
                              <DropdownMenuItem
                                key={item.id}
                                className="flex items-center gap-3 py-2 cursor-default focus:bg-gray-50"
                              >
                                {item.food?.img ? (
                                  <img
                                    src={item.food.img}
                                    alt={item.food.name}
                                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm">
                                    🍽
                                  </div>
                                )}
                                <span className="text-sm text-gray-700 flex-1 truncate">
                                  {item.food?.name ?? `Food #${item.foodId}`}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  ${Number(item.food?.price ?? 0).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  x{item.quantity}
                                </span>
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled>
                              No items
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>

                    <td className="px-3 py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 font-medium text-gray-800">
                      ${Number(order.totalPrice).toFixed(2)}
                    </td>
                    <td className="px-3 py-3 text-gray-400 max-w-[200px] truncate text-xs">
                      {order.user?.address ?? "—"}
                    </td>
                    <td className="px-3 py-3">
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
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
                          <span className="flex flex-col leading-none">
                            <ChevronUp size={9} />
                            <ChevronDown size={9} />
                          </span>
                        </button>
                        {openStatusMenu === order.id && (
                          <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden min-w-[130px]">
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
