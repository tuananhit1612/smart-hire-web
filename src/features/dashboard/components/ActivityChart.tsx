"use client";

import { useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { WeeklyActivityItem } from "../api/candidate-dashboard-api";

interface ActivityChartProps {
    weeklyActivity?: WeeklyActivityItem[];
}

const fallbackData = [
    { day: "T2", applications: 0, views: 0 },
    { day: "T3", applications: 0, views: 0 },
    { day: "T4", applications: 0, views: 0 },
    { day: "T5", applications: 0, views: 0 },
    { day: "T6", applications: 0, views: 0 },
    { day: "T7", applications: 0, views: 0 },
    { day: "CN", applications: 0, views: 0 },
];

export function ActivityChart({ weeklyActivity }: ActivityChartProps) {
    const data = useMemo(() => weeklyActivity || fallbackData, [weeklyActivity]);

    return (
        <div className="bg-white dark:bg-[#1C252E] rounded-2xl border border-[rgba(145,158,171,0.12)] dark:border-white/[0.08] p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-[#1C252E] dark:text-white">
                        Hoạt động 7 ngày gần đây
                    </h3>
                    <p className="text-sm text-[#637381] dark:text-[#919EAB]">
                        Lượt xem hồ sơ & đơn ứng tuyển
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                        <span className="text-[#637381] dark:text-[#919EAB]">Lượt xem</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FFAB00]" />
                        <span className="text-[#637381] dark:text-[#919EAB]">Ứng tuyển</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFAB00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#FFAB00" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(145,158,171,0.12)"
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#919EAB", fontSize: 12, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#919EAB", fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(28, 37, 46, 0.9)",
                                borderRadius: "12px",
                                border: "none",
                                color: "#fff",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            }}
                            itemStyle={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}
                            labelStyle={{ color: "#919EAB", marginBottom: "4px" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="views"
                            name="Lượt xem"
                            stroke="#22C55E"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            activeDot={{ r: 6, fill: "#22C55E", stroke: "#fff", strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="applications"
                            name="Ứng tuyển"
                            stroke="#FFAB00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorApps)"
                            activeDot={{ r: 6, fill: "#FFAB00", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
