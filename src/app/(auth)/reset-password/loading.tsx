import { RefreshCw } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <RefreshCw className="h-10 w-10 text-[#22C55E] animate-spin" />
            <p className="text-[#637381] text-sm">Đang tải...</p>
        </div>
    );
}
