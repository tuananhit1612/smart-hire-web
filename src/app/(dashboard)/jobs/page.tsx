import { JobList } from "@/features/jobs/components/job-list";

export default function JobsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-20">
      {/* Hero Section */}
      <section className="relative pt-6 pb-10 text-center overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C252E] dark:text-white mb-3">
          Tìm kiếm{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#FFAB00]">
            Công việc mơ ước
          </span>
        </h1>
        <p className="text-base text-[#637381] dark:text-[#C4CDD5] max-w-2xl mx-auto">
          Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các công ty công nghệ hàng đầu. Đừng bỏ lỡ cơ hội thăng tiến sự nghiệp của bạn.
        </p>
      </section>

      {/* Main Content */}
      <JobList />
    </div>
  );
}
