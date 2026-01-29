import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid identity protocol (email)"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
