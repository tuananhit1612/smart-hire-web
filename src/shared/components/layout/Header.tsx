import Link from 'next/link';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        SmartHire
                    </span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/jobs" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        Tìm việc
                    </Link>
                    <Link href="/companies" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        Công ty
                    </Link>
                    <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        Blog
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </header>
    );
}
