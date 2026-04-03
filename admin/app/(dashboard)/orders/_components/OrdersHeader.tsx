"use client";

import { Calendar } from "lucide-react";
import { DeliveryState } from "./types";

type Props = {
  totalCount: number;
  selectedCount: number;
  dateFrom: string;
  dateTo: string;
  showDatePicker: boolean;
  bulkLoading: boolean;
  openBulkMenu: boolean;
  onDateFromChange: (val: string) => void;
  onDateToChange: (val: string) => void;
  onToggleDatePicker: () => void;
  onClearDateFilter: () => void;
  onToggleBulkMenu: () => void;
  onBulkStatus: (status: DeliveryState) => void;
};

export const OrdersHeader = ({
  totalCount,
  selectedCount,
  dateFrom,
  dateTo,
  showDatePicker,
  bulkLoading,
  openBulkMenu,
  onDateFromChange,
  onDateToChange,
  onToggleDatePicker,
  onClearDateFilter,
  onToggleBulkMenu,
  onBulkStatus,
}: Props) => {
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

  return (
    <div className="flex items-start justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {totalCount} items
          {selectedCount > 0 && (
            <span className="ml-2 text-gray-500">
              · {selectedCount} selected
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Date range picker */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onToggleDatePicker}
            className={`flex items-center gap-2 text-sm border rounded-full px-3 py-2 bg-white hover:bg-gray-50 transition-colors ${
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
                  onClearDateFilter();
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
                  onChange={(e) => onDateFromChange(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">To</label>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom}
                  onChange={(e) => onDateToChange(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                />
              </div>
              <button
                onClick={onClearDateFilter}
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
            onClick={onToggleBulkMenu}
            disabled={selectedCount === 0 || bulkLoading}
            className={`text-sm border rounded-full px-4 py-2 transition-colors text-white ${
              selectedCount > 0
                ? "border-gray-300 bg-[#18181B] hover:bg-gray-50 cursor-pointer"
                : "border-gray-200 bg-[#adaaaa] cursor-not-allowed"
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
                    onClick={() => onBulkStatus(s)}
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
  );
};
