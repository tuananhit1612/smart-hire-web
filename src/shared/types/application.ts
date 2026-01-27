export enum ApplicationStage {
    APPLIED = 'APPLIED',
    SCREENING = 'SCREENING',
    INTERVIEW = 'INTERVIEW',
    OFFER = 'OFFER',
    HIRED = 'HIRED',
    REJECTED = 'REJECTED',
}

export type ApplicationStatus = keyof typeof ApplicationStage;
