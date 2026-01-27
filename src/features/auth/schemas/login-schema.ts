import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
    password: z
        .string()
        .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
