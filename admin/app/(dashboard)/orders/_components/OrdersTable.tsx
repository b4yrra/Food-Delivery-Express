"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OrdersHeader } from "./OrdersHeader";
import { OrdersRow } from "./OrdersRow";
import { OrdersPagination } from "./OrdersPagination";
import { DeliveryState, OrderWithUser, PER_PAGE } from "./types";

type Props = {
  initialOrders: OrderWithUser[];
};

export const OrdersTable = ({ initialOrders }: Props) => {
  const [orders, setOrders] = useState<OrderWithUser[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] =
    useState<OrderWithUser[]>(initialOrders);
  const [page, setPage] = useState(1);
  const [openStatusMenu, setOpenStatusMenu] = useState<number | null>(null);
  const [openBulkMenu, setOpenBulkMenu] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    let result = orders;
    if (dateFrom)
      result = result.filter(
        (o) => new Date(o.createdAt) >= new Date(dateFrom),
      );
    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter((o) => new Date(o.createdAt) <= to);
    }
    setFilteredOrders(result);
    setPage(1);
  }, [dateFrom, dateTo, orders]);

  const slice = filteredOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filteredOrders.length / PER_PAGE);

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
      const res = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        console.error("Status update failed:", res.status);
        return;
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error("setStatus error:", err);
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
      console.error("setBulkStatus error:", err);
    }

    setBulkLoading(false);
  };

  return (
    <div
      className="p-6 min-h-screen bg-slate-100 font-mono"
      onClick={() => {
        setOpenStatusMenu(null);
        setOpenBulkMenu(false);
        setShowDatePicker(false);
      }}
    >
      <div className="bg-white border border-gray-200 rounded-xl">
        <div className="p-4 border-b">
          <OrdersHeader
            totalCount={filteredOrders.length}
            selectedCount={selectedIds.size}
            dateFrom={dateFrom}
            dateTo={dateTo}
            showDatePicker={showDatePicker}
            bulkLoading={bulkLoading}
            openBulkMenu={openBulkMenu}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onToggleDatePicker={() => setShowDatePicker((v) => !v)}
            onClearDateFilter={() => {
              setDateFrom("");
              setDateTo("");
              setShowDatePicker(false);
            }}
            onToggleBulkMenu={() =>
              selectedIds.size > 0 && setOpenBulkMenu((v) => !v)
            }
            onBulkStatus={setBulkStatus}
          />
        </div>
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
              <th className="px-3 py-3 text-left text-[#71717A] font-normal w-10">
                №
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                Customer
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                Food
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                <span className="flex items-center gap-1">
                  Date{" "}
                  <span className="flex flex-col leading-none">
                    <ChevronUp size={10} />
                    <ChevronDown size={10} />
                  </span>
                </span>
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                Total
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                Delivery Address
              </th>
              <th className="px-3 py-3 text-left text-[#71717A] font-normal">
                <span className="flex items-center gap-1">
                  Delivery state{" "}
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
                  className="text-center py-16 text-[#71717A] text-sm"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              slice.map((order) => (
                <OrdersRow
                  key={order.id}
                  order={order}
                  isSelected={selectedIds.has(order.id)}
                  openStatusMenu={openStatusMenu}
                  onToggleSelect={() => toggleSelect(order.id)}
                  onToggleStatus={() =>
                    setOpenStatusMenu(
                      openStatusMenu === order.id ? null : order.id,
                    )
                  }
                  onSelectStatus={(status) => setStatus(order.id, status)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <OrdersPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
