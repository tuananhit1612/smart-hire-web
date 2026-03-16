import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, "Họ tên phải có ít nhất 2 ký tự")
        .max(50, "Họ tên không được quá 50 ký tự"),
    email: z
        .string()
        .email("Vui lòng nhập địa chỉ email hợp lệ"),
    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .regex(/[A-Z]/, "Phải chứa ít nhất 1 chữ hoa")
        .regex(/[a-z]/, "Phải chứa ít nhất 1 chữ thường")
        .regex(/[0-9]/, "Phải chứa ít nhất 1 chữ số"),
    confirmPassword: z.string(),
    agreeTerms: z.literal(true, {
        message: "Bạn phải đồng ý với điều khoản sử dụng",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
