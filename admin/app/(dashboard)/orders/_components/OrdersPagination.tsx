"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const OrdersPagination = ({ page, totalPages, onPageChange }: Props) => {
  const getPages = (): (number | "...")[] => {
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

  return (
    <div className="flex items-center justify-end gap-1 px-4 py-3 border-t border-gray-100">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      {getPages().map((p, i) =>
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
            onClick={() => onPageChange(p as number)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
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
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages || totalPages === 0}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
