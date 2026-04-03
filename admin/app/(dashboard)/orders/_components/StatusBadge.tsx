"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { DeliveryState, STATUS_STYLES } from "./types";

type Props = {
  orderId: number;
  status: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (status: DeliveryState) => void;
};

export const StatusBadge = ({
  orderId,
  status,
  isOpen,
  onToggle,
  onSelect,
}: Props) => {
  const displayStatus = status === "Canceled" ? "Cancelled" : status;

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
          STATUS_STYLES[status] ?? STATUS_STYLES["Canceled"]
        }`}
        onClick={onToggle}
      >
        {displayStatus}
        <span className="flex flex-col leading-none">
          <ChevronUp size={9} />
          <ChevronDown size={9} />
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-md min-w-[130px]">
          {(["Pending", "Delivered", "Cancelled"] as DeliveryState[]).map(
            (s) => (
              <button
                key={s}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => onSelect(s)}
              >
                {s}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};
