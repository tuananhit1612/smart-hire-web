import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            SmartHire
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kết nối nhân tài với những cơ hội tốt nhất. Nền tảng tuyển dụng thông minh hàng đầu Việt Nam.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Ứng viên</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/jobs" className="hover:text-blue-600 dark:hover:text-blue-400">Tìm việc làm</Link></li>
                            <li><Link href="/companies" className="hover:text-blue-600 dark:hover:text-blue-400">Danh sách công ty</Link></li>
                            <li><Link href="/cv-builder" className="hover:text-blue-600 dark:hover:text-blue-400">Tạo CV</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Nhà tuyển dụng</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/post-job" className="hover:text-blue-600 dark:hover:text-blue-400">Đăng tin tuyển dụng</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400">Báo giá dịch vụ</Link></li>
                            <li><Link href="/search-candidates" className="hover:text-blue-600 dark:hover:text-blue-400">Tìm hồ sơ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Hỗ trợ</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Liên hệ</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Điều khoản</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Chính sách bảo mật</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    © {new Date().getFullYear()} SmartHire Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
