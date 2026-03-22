"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopbar } from "@/features/dashboard/components/DashboardTopbar";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F4F6F8] dark:bg-[#111820]">
            {/* Sidebar */}
            <DashboardSidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((c) => !c)}
            />

            {/* Main area — offset by sidebar width */}
            <motion.div
                animate={{ marginLeft: collapsed ? 88 : 220 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col flex-1 min-w-0"
            >
                {/* Topbar */}
                <DashboardTopbar onToggleSidebar={() => setCollapsed((c) => !c)} />

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </motion.div>
        </div>
    );
}
