"use client";

import { FoodDropdown } from "./FoodDropdown";
import { StatusBadge } from "./StatusBadge";
import { DeliveryState, OrderWithUser } from "./types";

type Props = {
  order: OrderWithUser;
  isSelected: boolean;
  openStatusMenu: number | null;
  onToggleSelect: () => void;
  onToggleStatus: () => void;
  onSelectStatus: (status: DeliveryState) => void;
};

export const OrdersRow = ({
  order,
  isSelected,
  openStatusMenu,
  onToggleSelect,
  onToggleStatus,
  onSelectStatus,
}: Props) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className="rounded border-gray-300 cursor-pointer"
          checked={isSelected}
          onChange={onToggleSelect}
        />
      </td>
      <td className="px-3 py-3 text-[#71717A]">{order.id}</td>
      <td className="px-3 py-3 text-gray-700">
        {order.user?.email ?? `User #${order.userId}`}
      </td>
      <td className="px-3 py-3">
        <FoodDropdown orderId={order.id} items={order.foodOrderItems ?? []} />
      </td>
      <td className="px-3 py-3 text-gray-500">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
      <td className="px-3 py-3 font-medium text-gray-800">
        ${Number(order.totalPrice).toFixed(2)}
      </td>
      <td className="px-3 py-3 text-[#71717A] max-w-[200px] truncate text-xs">
        {order.user?.address ?? "—"}
      </td>
      <td className="px-3 py-3">
        <StatusBadge
          orderId={order.id}
          status={order.status}
          isOpen={openStatusMenu === order.id}
          onToggle={onToggleStatus}
          onSelect={onSelectStatus}
        />
      </td>
    </tr>
  );
};
