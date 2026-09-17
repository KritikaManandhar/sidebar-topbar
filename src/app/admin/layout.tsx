"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0D111D]">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onCollapseToggle={(state) => setCollapsed(state)}
        className="fixed left-0 top-0 z-40 h-screen"
      />

      {/* Main Content & Topbar */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
          collapsed ? "ml-[72px]" : "ml-[248px]"
        }`}
      >
        <Topbar onMenuClick={() => setCollapsed((prev) => !prev)} />
        <main className="flex-1 text-slate-200">{children}</main>
      </div>
    </div>
  );
}
