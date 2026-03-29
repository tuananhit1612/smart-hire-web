"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardTopbar } from "@/features/dashboard/components/DashboardTopbar";
import { RealtimeProvider } from "@/shared/components/layout/RealtimeProvider";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCompanyStore } from "@/features/hr-company/stores/company-store";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Redirect non-onboarded candidates to onboarding (except if already on onboarding page)
    useEffect(() => {
        if (isLoading || !isAuthenticated || !user) return;
        
        const isOnOnboarding = pathname?.startsWith("/dashboard/onboarding");
        const needsOnboarding = user.role === "candidate" && user.isOnboarded === false;

        if (needsOnboarding && !isOnOnboarding) {
            router.replace("/dashboard/onboarding");
        }
    }, [isLoading, isAuthenticated, user, pathname, router]);

    // Automatically load company context for HR
    const fetchMyCompany = useCompanyStore((state) => state.fetchMyCompany);
    const company = useCompanyStore((state) => state.company);
    
    useEffect(() => {
        if (!isLoading && isAuthenticated && user?.role === "hr" && !company.id) {
            fetchMyCompany();
        }
    }, [isLoading, isAuthenticated, user, company.id, fetchMyCompany]);

    return (
        <RealtimeProvider>
            <div className="flex min-h-screen bg-[#F4F6F8] dark:bg-[#111820]">
                {/* Sidebar */}
                <DashboardSidebar
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((c) => !c)}
                />

                {/* Main area — offset by sidebar width */}
                <motion.div
                    animate={{ marginLeft: collapsed ? 88 : 230 }}
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
        </RealtimeProvider>
    );
}
