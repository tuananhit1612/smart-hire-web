import { OnboardingClient } from "./client";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function CandidateOnboardingPage() {
  return <OnboardingClient />;
}
