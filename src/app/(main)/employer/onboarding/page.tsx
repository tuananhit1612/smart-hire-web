"use client";

import { OnboardingLayout } from "@/features/onboarding/components/onboarding-layout";
import { EmployerOnboarding } from "@/features/hr-company/components/employer-onboarding";

export default function EmployerOnboardingPage() {
    return (
        <OnboardingLayout>
            <EmployerOnboarding />
        </OnboardingLayout>
    );
}
