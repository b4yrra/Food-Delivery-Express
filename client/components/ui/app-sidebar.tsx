"use client";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ChefHat, ChartBarStacked, Truck, Settings, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppSidebar() {
  const pathname = usePathname();

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
        <Link href="/foods">
          <Button
            className={`flex gap-3 text-[14px] w-full text-start cursor-pointer p-5 rounded-full ${pathname === "/foods" ? "bg-black" : "bg-transparent text-black"}`}
          >
            <ChartBarStacked />
            Food Menu
          </Button>
        </Link>
        <Link href="/orders">
          <Button
            className={`flex gap-3 text-[14px] w-full p-5 cursor-pointer rounded-full ${pathname === "/orders" ? "bg-black" : "bg-transparent text-black"}`}
          >
            <Truck />
            Orders
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            className={`flex gap-3 text-[14px] w-full text-start cursor-pointer p-5 rounded-full ${pathname === "/settings" ? "bg-black" : "bg-transparent text-black"}`}
          >
            <Settings />
            Settings
          </Button>
        </Link>
      </div>
    </Sidebar>
  );
}
