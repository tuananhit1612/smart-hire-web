'use client';
import { useParams } from "next/navigation";
import { CVAnalysisBoard } from "@/features/cv/components/analysis/CVAnalysisBoard";

export default function CVAnalysisPage() {
    const params = useParams();
    const id = params.id as string;

    if (!id) return <div>ID không hợp lệ</div>;

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden bg-[rgba(145,158,171,0.04)] dark:bg-[rgba(145,158,171,0.02)] pt-6">
            <CVAnalysisBoard cvFileId={parseInt(id, 10)} />
        </div>
    );
}
