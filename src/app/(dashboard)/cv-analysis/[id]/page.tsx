import { CVAnalysisClient } from "./client";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function CVAnalysisPage({ params: _params }: { params: Promise<{ id: string }> }) {
  return <CVAnalysisClient />;
}
