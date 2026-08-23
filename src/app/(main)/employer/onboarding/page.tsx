"use client";

import { EmployerOnboarding } from "@/features/hr-company/components/employer-onboarding";
import { OnboardingLayout } from "@/features/onboarding/components/onboarding-layout";

export default function EmployerOnboardingPage() {
    return (
        <OnboardingLayout>
            <EmployerOnboarding />
        </OnboardingLayout>
    );
}
