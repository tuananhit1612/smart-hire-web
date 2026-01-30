import { Job } from "./job";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TF",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    level: "Senior",
    salary: "$2,000 - $3,500",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    description: "Chúng tôi đang tìm kiếm Senior Frontend Engineer để dẫn dắt team phát triển sản phẩm cốt lõi sử dụng React và Next.js.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    fullDescription: `
Chúng tôi đang tìm kiếm một Senior Frontend Engineer tài năng để gia nhập đội ngũ phát triển sản phẩm của TechFlow Solutions. 

Bạn sẽ làm việc trực tiếp với team sản phẩm để xây dựng các tính năng mới, cải thiện hiệu suất và trải nghiệm người dùng cho nền tảng SaaS phục vụ hàng nghìn khách hàng doanh nghiệp.

Đây là cơ hội tuyệt vời để bạn phát triển sự nghiệp trong môi trường startup năng động với đội ngũ kỹ sư giỏi từ các công ty công nghệ hàng đầu.
    `,
    requirements: [
      "Tối thiểu 5 năm kinh nghiệm phát triển Frontend",
      "Thành thạo React, TypeScript và Next.js",
      "Có kinh nghiệm với CSS-in-JS hoặc Tailwind CSS",
      "Hiểu biết về các nguyên tắc UI/UX và accessibility",
      "Có khả năng mentor và hướng dẫn junior developers",
      "Tiếng Anh giao tiếp tốt",
    ],
    responsibilities: [
      "Thiết kế và phát triển các tính năng frontend mới",
      "Tối ưu hóa hiệu suất và trải nghiệm người dùng",
      "Code review và đảm bảo chất lượng code",
      "Mentor junior developers trong team",
      "Phối hợp với team Backend và Design",
      "Tham gia vào quá trình planning và estimation",
    ],
    benefits: [
      "Mức lương cạnh tranh + thưởng hấp dẫn",
      "ESOP (Cổ phần công ty)",
      "Bảo hiểm sức khỏe cao cấp",
      "Laptop MacBook Pro mới nhất",
      "Làm việc hybrid (3 ngày tại văn phòng)",
      "Team building hàng quý",
      "Ngân sách học tập không giới hạn",
    ],
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    workingHours: "9:00 - 18:00, Thứ 2 - Thứ 6",
    teamSize: "10-15 người",
    reportTo: "Engineering Manager",
    companyInfo: {
      name: "TechFlow Solutions",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=TF",
      coverImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
      description: "TechFlow Solutions là startup công nghệ hàng đầu Việt Nam, chuyên cung cấp giải pháp SaaS cho doanh nghiệp. Được thành lập năm 2020, chúng tôi đã phục vụ hơn 500 khách hàng doanh nghiệp và huy động thành công Series A từ các quỹ đầu tư uy tín.",
      website: "https://techflow.vn",
      industry: "SaaS / Enterprise Software",
      size: "50-100 nhân viên",
      founded: 2020,
    },
    locationInfo: {
      city: "TP. Hồ Chí Minh",
      district: "Quận 1",
      address: "Tầng 15, Bitexco Financial Tower, 2 Hải Triều, Bến Nghé",
      coordinates: {
        lat: 10.7719,
        lng: 106.7048,
      },
    },
  },
  {
    id: "2",
    title: "Product Designer (UI/UX)",
    company: "Creative Pulse",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
    location: "Remote",
    type: "Remote",
    level: "Middle",
    salary: "$1,500 - $2,500",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description: "Tham gia team thiết kế để tạo ra trải nghiệm người dùng tuyệt vời cho các khách hàng toàn cầu.",
    skills: ["Figma", "UI/UX", "Prototyping"],
    fullDescription: `
Creative Pulse đang mở rộng team Design và tìm kiếm Product Designer có đam mê với UI/UX.

Bạn sẽ làm việc trực tiếp với các khách hàng quốc tế, thiết kế giao diện cho các ứng dụng web và mobile đa dạng từ fintech đến e-commerce.

Đây là vị trí remote 100%, bạn có thể làm việc từ bất cứ đâu trên thế giới với lịch làm việc linh hoạt.
    `,
    requirements: [
      "3+ năm kinh nghiệm thiết kế UI/UX",
      "Thành thạo Figma và các design tools",
      "Portfolio ấn tượng với các dự án thực tế",
      "Hiểu biết về design systems",
      "Tiếng Anh giao tiếp tốt (làm việc với khách quốc tế)",
    ],
    responsibilities: [
      "Thiết kế UI/UX cho các dự án khách hàng",
      "Tạo wireframes, mockups và interactive prototypes",
      "Phối hợp với developers trong quá trình implementation",
      "Thực hiện user research khi cần thiết",
    ],
    benefits: [
      "Làm việc 100% remote",
      "Lịch làm việc linh hoạt",
      "Bảo hiểm sức khỏe",
      "Ngân sách cho thiết bị làm việc",
      "Cơ hội làm việc với khách hàng quốc tế",
    ],
    workingHours: "Linh hoạt (Remote)",
    teamSize: "5-8 người",
    reportTo: "Design Lead",
    companyInfo: {
      name: "Creative Pulse",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
      coverImageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=400&fit=crop",
      description: "Creative Pulse là agency thiết kế chuyên phục vụ khách hàng startup và doanh nghiệp toàn cầu. Chúng tôi đã làm việc với hơn 200 khách hàng từ 30 quốc gia.",
      website: "https://creativepulse.io",
      industry: "Design Agency",
      size: "20-50 nhân viên",
      founded: 2018,
    },
    locationInfo: {
      city: "Remote",
      address: "Làm việc từ xa - Toàn cầu",
    },
  },
  {
    id: "3",
    title: "Backend Developer (Go)",
    company: "NextGen Fintech",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
    location: "Hà Nội",
    type: "Full-time",
    level: "Junior",
    salary: "$800 - $1,500",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    description: "Cơ hội tuyệt vời cho Junior Developer học hỏi và làm việc với hệ thống Microservices hiệu năng cao.",
    skills: ["Go", "PostgreSQL", "Docker", "gRPC"],
    fullDescription: `
NextGen Fintech đang tìm kiếm Junior Backend Developer có đam mê với Go và muốn phát triển trong lĩnh vực fintech.

Bạn sẽ được mentor bởi các senior engineers và tham gia vào các dự án thực tế với quy mô lớn, xử lý hàng triệu transactions mỗi ngày.

Đây là cơ hội tuyệt vời để bạn bắt đầu sự nghiệp trong ngành fintech đang phát triển mạnh mẽ.
    `,
    requirements: [
      "0-2 năm kinh nghiệm lập trình",
      "Có kiến thức cơ bản về Go hoặc sẵn sàng học",
      "Hiểu biết về databases (SQL)",
      "Ham học hỏi và chủ động",
      "Có khả năng làm việc nhóm tốt",
    ],
    responsibilities: [
      "Phát triển và maintain các microservices",
      "Viết unit tests và integration tests",
      "Tham gia code review",
      "Học hỏi và áp dụng best practices",
    ],
    benefits: [
      "Mentorship từ senior engineers",
      "Lộ trình phát triển rõ ràng",
      "Mức lương tăng theo năng lực",
      "Bảo hiểm đầy đủ",
      "Văn phòng hiện đại tại trung tâm Hà Nội",
    ],
    workingHours: "9:00 - 18:00, Thứ 2 - Thứ 6",
    teamSize: "8-12 người",
    reportTo: "Tech Lead",
    companyInfo: {
      name: "NextGen Fintech",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=NG",
      coverImageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      description: "NextGen Fintech xây dựng các giải pháp thanh toán và banking cho thế hệ tiếp theo. Chúng tôi đang xử lý hơn 1 triệu transactions mỗi ngày cho các đối tác ngân hàng lớn.",
      website: "https://nextgenfintech.vn",
      industry: "Fintech / Banking",
      size: "100-200 nhân viên",
      founded: 2019,
    },
    locationInfo: {
      city: "Hà Nội",
      district: "Cầu Giấy",
      address: "Tầng 12, Tòa nhà Keangnam Landmark, Phạm Hùng",
      coordinates: {
        lat: 21.0168,
        lng: 105.7837,
      },
    },
  },
  {
    id: "4",
    title: "Fullstack Engineer",
    company: "Global Tech",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
    location: "Đà Nẵng",
    type: "Contract",
    level: "Senior",
    salary: "$2,500 - $4,000",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    description: "Xây dựng các hệ thống phức tạp using Node.js và React. Yêu cầu kinh nghiệm 5+ năm.",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    fullDescription: `
Global Tech đang tìm kiếm Fullstack Engineer để tham gia dự án contract dài hạn với khách hàng Mỹ.

Bạn sẽ làm việc với đội ngũ quốc tế, xây dựng các hệ thống web phức tạp và có cơ hội được gia hạn hợp đồng hoặc chuyển sang full-time.
    `,
    requirements: [
      "5+ năm kinh nghiệm Fullstack",
      "Thành thạo Node.js và React",
      "Có kinh nghiệm với cloud (AWS/GCP)",
      "Tiếng Anh giao tiếp tốt",
    ],
    responsibilities: [
      "Phát triển frontend và backend",
      "Tham gia thiết kế hệ thống",
      "Code review và mentoring",
    ],
    benefits: [
      "Rate cạnh tranh",
      "Làm việc với khách hàng quốc tế",
      "Cơ hội chuyển full-time",
    ],
    workingHours: "Flexible (overlap với US timezone)",
    teamSize: "5-7 người",
    reportTo: "Project Manager",
    companyInfo: {
      name: "Global Tech",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
      coverImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      description: "Global Tech là công ty outsourcing hàng đầu với văn phòng tại Đà Nẵng, chuyên cung cấp dịch vụ phát triển phần mềm cho khách hàng Mỹ và châu Âu.",
      website: "https://globaltech.com.vn",
      industry: "IT Outsourcing",
      size: "200-500 nhân viên",
      founded: 2015,
    },
    locationInfo: {
      city: "Đà Nẵng",
      district: "Hải Châu",
      address: "Tầng 8, Indochina Riverside Tower, 74 Bạch Đằng",
      coordinates: {
        lat: 16.0726,
        lng: 108.2264,
      },
    },
  },
  {
    id: "5",
    title: "React Native Developer",
    company: "AppMasters",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AM",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    level: "Middle",
    salary: "$1,200 - $2,200",
    postedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: "Phát triển ứng dụng mobile tiên tiến cho hàng triệu người dùng trên iOS và Android.",
    skills: ["React Native", "TypeScript", "iOS", "Android"],
    fullDescription: `
AppMasters đang tìm kiếm React Native Developer có kinh nghiệm để xây dựng các ứng dụng mobile chất lượng cao.

Bạn sẽ làm việc với đội ngũ product để phát triển các tính năng mới và cải thiện trải nghiệm người dùng trên cả iOS và Android.
    `,
    requirements: [
      "2-4 năm kinh nghiệm React Native",
      "Có kinh nghiệm publish app lên App Store/Google Play",
      "Hiểu biết về native modules",
      "Có kinh nghiệm với TypeScript",
    ],
    responsibilities: [
      "Phát triển ứng dụng mobile cross-platform",
      "Tối ưu hóa performance",
      "Viết unit tests",
    ],
    benefits: [
      "Lương cạnh tranh",
      "Bảo hiểm sức khỏe",
      "Văn phòng hiện đại",
      "Team trẻ năng động",
    ],
    workingHours: "9:00 - 18:00, Thứ 2 - Thứ 6",
    teamSize: "6-10 người",
    companyInfo: {
      name: "AppMasters",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AM",
      coverImageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      description: "AppMasters là công ty chuyên phát triển ứng dụng mobile với hơn 50 ứng dụng đã được publish trên App Store và Google Play.",
      website: "https://appmasters.vn",
      industry: "Mobile Development",
      size: "30-50 nhân viên",
      founded: 2017,
    },
    locationInfo: {
      city: "TP. Hồ Chí Minh",
      district: "Quận 3",
      address: "Tầng 5, Saigon Pearl, 92 Nguyễn Hữu Cảnh",
      coordinates: {
        lat: 10.7867,
        lng: 106.7095,
      },
    },
  },
  {
    id: "6",
    title: "AI Research Intern",
    company: "SmartAI Lab",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SA",
    location: "Remote",
    type: "Internship",
    level: "Intern",
    salary: "$300 - $600",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    description: "Nghiên cứu và triển khai các mô hình NLP mới nhất. Được hướng dẫn bởi các chuyên gia.",
    skills: ["Python", "PyTorch", "NLP", "Machine Learning"],
    companyInfo: {
      name: "SmartAI Lab",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SA",
      coverImageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      description: "SmartAI Lab là phòng nghiên cứu AI hàng đầu Việt Nam, tập trung vào NLP và Computer Vision.",
      website: "https://smartailab.ai",
      industry: "AI Research",
      size: "10-20 nhân viên",
      founded: 2021,
    },
    locationInfo: {
      city: "Remote",
      address: "Làm việc từ xa",
    },
  },
  {
    id: "7",
    title: "DevOps Engineer",
    company: "CloudScale",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CS",
    location: "Remote",
    type: "Remote",
    level: "Senior",
    salary: "$3,000 - $5,000",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    description: "Mở rộng hạ tầng sử dụng Kubernetes và Terraform. Tối ưu hóa quy trình CI/CD.",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
    companyInfo: {
      name: "CloudScale",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=CS",
      coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      description: "CloudScale cung cấp dịch vụ cloud infrastructure cho các doanh nghiệp lớn tại Việt Nam và Đông Nam Á.",
      website: "https://cloudscale.asia",
      industry: "Cloud Services",
      size: "50-100 nhân viên",
      founded: 2018,
    },
    locationInfo: {
      city: "Remote",
      address: "Làm việc từ xa - Việt Nam",
    },
  },
  {
    id: "8",
    title: "Marketing Lead",
    company: "GrowthHackerz",
    logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GH",
    location: "TP. Hồ Chí Minh",
    type: "Full-time",
    level: "Lead",
    salary: "$2,500 - $4,500",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    description: "Dẫn dắt các chiến dịch marketing và thúc đẩy tăng trưởng cho sản phẩm SaaS.",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    companyInfo: {
      name: "GrowthHackerz",
      logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=GH",
      coverImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      description: "GrowthHackerz là agency marketing chuyên giúp các startup tăng trưởng nhanh chóng thông qua các chiến lược growth hacking.",
      website: "https://growthhackerz.vn",
      industry: "Digital Marketing",
      size: "20-30 nhân viên",
      founded: 2019,
    },
    locationInfo: {
      city: "TP. Hồ Chí Minh",
      district: "Quận 7",
      address: "Tầng 10, Crescent Plaza, Phú Mỹ Hưng",
      coordinates: {
        lat: 10.7295,
        lng: 106.7186,
      },
    },
  },
];

// Helper function to get job by ID
export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}
