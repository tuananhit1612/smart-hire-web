"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { OnboardingLayout } from "@/features/onboarding/components/onboarding-layout";
import { StepWelcome } from "@/features/onboarding/components/step-welcome";
import { StepActivation } from "@/features/onboarding/components/step-activation";
import { StepRole } from "@/features/onboarding/components/step-role";
import { StepExperience } from "@/features/onboarding/components/step-experience";
import { StepVerifyCV } from "@/features/onboarding/components/step-verify-cv";
import { StepComplete } from "@/features/onboarding/components/step-complete";
import { OnboardingCvData } from "@/features/onboarding/api/onboarding-api";

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [preferences, setPreferences] = useState({
        activationMethod: null as "ai" | "manual" | null,
        role: null as string | null,
        experience: null as string | null,
        cvData: null as OnboardingCvData | null,
    });

    const handleNext = () => setCurrentStep((prev) => prev + 1);
    const handleBack = () => setCurrentStep((prev) => Math.max(0, prev - 1));

    return (
        <OnboardingLayout>
            <AnimatePresence mode="wait">
                {currentStep === 0 && (
                    <StepWelcome key="welcome" onNext={handleNext} />
                )}
                {currentStep === 1 && (
                    <StepRole
                        key="role"
                        onNext={handleNext}
                        onBack={handleBack}
                        selectedRole={preferences.role}
                        onSelectRole={(role) => setPreferences({ ...preferences, role })}
                    />
                )}
                {currentStep === 2 && (
                    <StepExperience
                        key="experience"
                        onNext={handleNext}
                        onBack={handleBack}
                        selectedExperience={preferences.experience}
                        onSelectExperience={(exp) => setPreferences({ ...preferences, experience: exp })}
                    />
                )}
                {currentStep === 3 && (
                    <StepActivation
                        key="activation"
                        onNext={(method, data) => {
                            setPreferences({ ...preferences, activationMethod: method, cvData: data || null });
                            if (method === "manual") {
                                setCurrentStep(5); // Skip verify, go to complete
                            } else {
                                handleNext(); // Go to verify (step 4)
                            }
                        }}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 4 && preferences.activationMethod === "ai" && preferences.cvData && (
                    <StepVerifyCV
                        key="verify"
                        cvData={preferences.cvData}
                        onNext={(data) => {
                            setPreferences({ ...preferences, cvData: data });
                            setCurrentStep(5);
                        }}
                        onBack={() => setCurrentStep(3)}
                    />
                )}
                {currentStep === 5 && (
                    <StepComplete
                        key="complete"
                        preferences={preferences}
                    />
                )}
            </AnimatePresence>
        </OnboardingLayout>
    );
}
