export type UserRole = "candidate" | "employer";

export interface RegisterFlowState {
    step: "role-selection" | "form";
    selectedRole: UserRole | null;
}
