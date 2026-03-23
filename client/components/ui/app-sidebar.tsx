"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChefHat, ChartBarStacked, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  return (
    <Sidebar className="flex flex-col items-center py-10 px-5 font-mono gap-10">
      <div className="flex gap-3 items-center pb-10">
        <ChefHat size={50} />
        <div>
          <h1 className="text-[25px] font-semibold">BatDelivery</h1>
          <p className="text-[#71717A] text-[12px]">Swift Delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Button className="text-start cursor-pointer p-5 rounded-full">
          <ChartBarStacked />
          Food Menu
        </Button>
        <Button className="p-5 cursor-pointer rounded-full">
          <Truck />
          Orders
        </Button>
      </div>
    </Sidebar>
  );
}
