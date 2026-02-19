import { z } from "zod";

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .regex(/[A-Z]/, "Phải chứa ít nhất 1 chữ hoa")
        .regex(/[a-z]/, "Phải chứa ít nhất 1 chữ thường")
        .regex(/[0-9]/, "Phải chứa ít nhất 1 chữ số"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
