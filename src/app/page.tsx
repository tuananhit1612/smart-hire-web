import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 dark:from-black dark:to-zinc-900">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Tìm công việc mơ ước <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              tại SmartHire
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Nền tảng tuyển dụng thông minh giúp bạn kết nối với hàng nghìn doanh nghiệp hàng đầu.
            Ứng tuyển nhanh chóng, dễ dàng và hiệu quả.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/jobs"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black sm:w-auto"
            >
              Tìm việc ngay
            </Link>
            <Link
              href="/post-job"
              className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800 dark:focus:ring-offset-black sm:w-auto"
            >
              Đăng tin tuyển dụng
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Tìm kiếm thông minh</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hệ thống gợi ý việc làm phù hợp dựa trên kỹ năng và kinh nghiệm của bạn.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-user"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M15 18a3 3 0 1 0-6 0" /><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><circle cx="12" cy="13" r="2" /></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Hồ sơ chuyên nghiệp</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tạo CV ấn tượng với các mẫu thiết kế chuẩn ATS, giúp bạn nổi bật trước nhà tuyển dụng.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Công ty hàng đầu</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kết nối trực tiếp với các doanh nghiệp uy tín và môi trường làm việc chuyên nghiệp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
