import { JobList } from "@/features/jobs/components/job-list";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Công việc mơ ước</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các công ty công nghệ hàng đầu. Đừng bỏ lỡ cơ hội thăng tiến sự nghiệp của bạn.
        </p>
      </section>

      {/* Main Content */}
      <JobList />
    </div>
  );
}
