// src/features/employer/components/applicant-list.tsx
"use client";

import { EmployerApplicant } from "../types/mock-applicants";
import { ApplicantCard } from "./applicant-card";

interface ApplicantListProps {
    applicants: ReadonlyArray<EmployerApplicant>;
    onSelectApplicant: (applicant: EmployerApplicant) => void;
}

export function ApplicantList({ applicants, onSelectApplicant }: ApplicantListProps) {
    if (applicants.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500">Chưa có ứng viên nào cho tiêu chí lọc này.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicants.map(applicant => (
                <ApplicantCard 
                    key={applicant.id} 
                    applicant={applicant} 
                    onSelect={onSelectApplicant}
                />
            ))}
        </div>
    );
}
