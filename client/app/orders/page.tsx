"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  MoreVertical,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Importing your specific types and services
import { getOrders } from "@/lib/services/get-orders";
import { getUsers } from "@/lib/services/get-users";
import { Order, User } from "@/lib/types";

interface OrderWithDetails extends Order {
  user?: User;
}

const OrdersDashboard: React.FC = () => {
  const [data, setData] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Fetch from your services
      const ordersRes = await getOrders();
      const usersRes = await getUsers();

      // 2. DEBUG LOGS - Check your F12 Console for these!
      console.log("Service Orders Output:", ordersRes);
      console.log("Service Users Output:", usersRes);

      /**
       * 3. FAIL-SAFE EXTRACTION
       * If your service returns the whole 'data' object instead of 'data.orders',
       * this logic will find the array regardless.
       */
      const extractArray = (res: any, key: string) => {
        if (Array.isArray(res)) return res;
        if (res && Array.isArray(res[key])) return res[key];
        if (res && Array.isArray(res.data)) return res.data;
        return [];
      };

      const ordersArray = extractArray(ordersRes, "orders");
      const usersArray = extractArray(usersRes, "users");

      // 4. MERGE LOGIC
      const merged = ordersArray.map((order: Order) => ({
        ...order,
        // Match userId to user.id (Converting to String to handle "1" vs 1)
        user: usersArray.find(
          (u: User) => String(u.id) === String(order.userId),
        ),
      }));

      setData(merged);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-gray-300 animate-spin" />
          <span className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">
            Synchronizing Database
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-10 font-sans text-[#111827]">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">
            Orders
          </h2>
          <p className="text-gray-400 font-bold text-[10px] mt-1 uppercase tracking-widest">
            {data.length} Records currently live
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={16}
            />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs w-64 focus:ring-2 focus:ring-black/5 outline-none transition-all shadow-sm"
            />
          </div>
          <button
            onClick={loadData}
            className="bg-white border border-gray-200 px-4 py-2 rounded-xl font-black text-[10px] hover:bg-gray-50 transition-all shadow-sm uppercase tracking-widest"
          >
            Force Refresh
          </button>
        </div>
      </header>

      {/* Main Table */}
      <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200 text-[#9CA3AF] text-[9px] font-black uppercase tracking-[0.2em]">
              <th className="p-5 w-12">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 accent-black"
                />
              </th>
              <th className="p-5 w-16">ID</th>
              <th className="p-5">Customer Profile</th>
              <th className="p-5">Items</th>
              <th className="p-5">Created At</th>
              <th className="p-5">Total Price</th>
              <th className="p-5">Delivery Address</th>
              <th className="p-5 text-center">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-32 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-30">
                    <AlertCircle size={40} />
                    <div className="space-y-1">
                      <p className="font-black text-xs uppercase tracking-widest">
                        Zero Orders Found
                      </p>
                      <p className="text-[10px] italic">
                        Check: http://localhost:3000/orders
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-5">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 accent-black"
                      />
                    </td>
                    <td className="p-5 font-black text-gray-300">
                      #{order.id}
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm tracking-tight">
                          {order.user?.email || "Ghost User"}
                        </span>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                          UID: {order.userId}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <button
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === order.id ? null : order.id,
                          )
                        }
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${
                          expandedRow === order.id
                            ? "bg-black text-white border-black shadow-md"
                            : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        DETAILS{" "}
                        <ChevronDown
                          size={12}
                          className={
                            expandedRow === order.id ? "rotate-180" : ""
                          }
                        />
                      </button>
                    </td>
                    <td className="p-5 text-gray-400 font-bold text-[10px] uppercase">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-5 font-black text-gray-900 text-base">
                      ${Number(order.totalPrice).toFixed(2)}
                    </td>
                    <td className="p-5 text-gray-400 text-[10px] max-w-[180px] truncate italic font-medium leading-relaxed">
                      {order.user?.address || "No Address Found"}
                    </td>
                    <td className="p-5">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>

                  {/* Yellow Detail Highlight */}
                  {expandedRow === order.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-gray-50/30">
                        <div className="mx-6 mb-6 p-6 border-2 border-[#FBBF24] rounded-2xl bg-white shadow-xl animate-in fade-in slide-in-from-top-1">
                          <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                              Order Contents
                            </h4>
                            <MoreVertical size={14} className="text-gray-300" />
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[9px] text-gray-300 font-black border border-gray-100 uppercase">
                              Img
                            </div>
                            <div>
                              <p className="font-black text-gray-800 text-xs italic underline decoration-[#FBBF24]">
                                Food data linking needed
                              </p>
                              <p className="text-[9px] text-gray-400 font-bold mt-0.5 uppercase tracking-tighter">
                                Order Ref: {order.id}
                              </p>
                            </div>
                            <div className="ml-auto text-xl font-black text-gray-900">
                              x 1
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-6 flex justify-between items-center border-t border-gray-100 bg-[#F9FAFB]">
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">
            NomNom Delivery Admin
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-black transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-black text-white text-[10px] font-black shadow-lg">
              1
            </button>
            <button className="p-2 text-gray-400 hover:text-black transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = status ? status.toLowerCase() : "pending";
  const styles: Record<string, string> = {
    pending: "text-rose-500 border-rose-100 bg-rose-50/50",
    delivered: "text-emerald-600 border-emerald-100 bg-green-50/50",
    cancelled: "text-slate-400 border-slate-200 bg-slate-50",
  };
  return (
    <div
      className={`flex items-center justify-between px-3 py-1.5 rounded-full border text-[9px] font-black w-[105px] mx-auto shadow-sm ${styles[s] || styles.pending}`}
    >
      {s.toUpperCase()}
      <ChevronDown size={12} className="opacity-40" />
    </div>
  );
};

export default OrdersDashboard;
