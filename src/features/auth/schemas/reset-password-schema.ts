import { z } from "zod";

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Security Key must be at least 8 units")
        .regex(/[A-Z]/, "Must contain upper-case signature")
        .regex(/[a-z]/, "Must contain lower-case signature")
        .regex(/[0-9]/, "Must contain numeric sequence"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Security Keys do not match",
    path: ["confirmPassword"],
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
