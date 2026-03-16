import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
