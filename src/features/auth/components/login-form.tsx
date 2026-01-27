"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LogIn, Github } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs } from "@/shared/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import { loginSchema, type LoginSchema } from "../schemas/login-schema";

export function LoginForm() {
    const [role, setRole] = useState("candidate");
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        // Simulate API call
        console.log("Login data:", { ...data, role });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Chào mừng trở lại</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Nhập thông tin đăng nhập để truy cập tài khoản của bạn
                </p>
            </div>

            <Tabs
                activeTab={role}
                onChange={setRole}
                tabs={[
                    { id: "candidate", label: "Ứng viên" },
                    { id: "employer", label: "Nhà tuyển dụng" },
                ]}
                className="mb-8"
            />

            <Card variant="default">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Đăng nhập</CardTitle>
                        <CardDescription>
                            {role === "candidate"
                                ? "Tìm kiếm cơ hội việc làm mới"
                                : "Quản lý tin tuyển dụng và ứng viên"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Input
                                    label="Mật khẩu"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    {...register("password")}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            variant="primary"
                            rightIcon={<LogIn className="h-4 w-4" />}
                        >
                            Đăng nhập
                        </Button>

                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500 dark:bg-zinc-900 dark:text-gray-400">
                                    Hoặc tiếp tục với
                                </span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full" type="button">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>

                        <p className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            Chưa có tài khoản?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Đăng ký ngay
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
