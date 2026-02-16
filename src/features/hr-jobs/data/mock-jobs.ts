import { Job } from '../types/job';

export const MOCK_JOBS: Job[] = [
    {
        id: 'job-001',
        companyId: 'techcorp-vietnam',
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        type: 'full-time',
        level: 'senior',
        location: 'TP. Hồ Chí Minh',
        remote: 'hybrid',
        salaryMin: 35000000,
        salaryMax: 50000000,
        salaryCurrency: 'VND',
        description: `🚀 Bạn sẽ làm gì?

• Phát triển và bảo trì các ứng dụng web với React/Next.js
• Làm việc với team Product và Design để xây dựng trải nghiệm người dùng xuất sắc
• Code review và mentoring junior developers
• Tối ưu hiệu năng ứng dụng
• Làm việc với API RESTful/GraphQL
• Áp dụng best practices: Clean Code, Design Patterns, Testing`,
        requirements: `✅ Yêu cầu:

• Tối thiểu 4 năm kinh nghiệm với React hoặc Vue.js
• Thành thạo TypeScript và ES6+
• Kinh nghiệm với Next.js hoặc Nuxt.js
• Hiểu biết sâu về HTML5, CSS3, Responsive Design
• Quen thuộc với Git, CI/CD pipelines
• Tiếng Anh đọc hiểu tài liệu kỹ thuật

🌟 Ưu tiên:
• Kinh nghiệm với GraphQL, Apollo
• Hiểu biết về UX/UI Design principles`,
        benefits: `💰 Quyền lợi hấp dẫn:

• Mức lương cạnh tranh: 35-50M/tháng
• Thưởng hiệu suất quý + tháng 13
• Bảo hiểm sức khỏe cao cấp PVI cho cả gia đình
• Làm việc Hybrid linh hoạt (3 office + 2 remote)
• Ngân sách học tập: $1,500/năm (Udemy, Coursera, conferences)
• Team building hàng tháng, du lịch công ty 2 lần/năm
• MacBook Pro M3 + màn hình 27"
• Free lunch, coffee & snacks`,
        mustHaveSkills: [
            { id: 's1', name: 'React', level: 'advanced' },
            { id: 's2', name: 'TypeScript', level: 'advanced' },
            { id: 's3', name: 'Next.js', level: 'intermediate' },
            { id: 's4', name: 'Tailwind CSS', level: 'advanced' },
        ],
        niceToHaveSkills: [
            { id: 's5', name: 'GraphQL', level: 'intermediate' },
            { id: 's6', name: 'Jest', level: 'intermediate' },
            { id: 's7', name: 'Figma', level: 'beginner' },
        ],
        status: 'open',
        applicantCount: 24,
        viewCount: 156,
        createdAt: '2026-01-15T08:00:00Z',
        updatedAt: '2026-02-01T10:30:00Z',
        deadline: '2026-03-15',
    },
    {
        id: 'job-002',
        companyId: 'techcorp-vietnam',
        title: 'Backend Engineer (Node.js/Go)',
        department: 'Engineering',
        type: 'full-time',
        level: 'middle',
        location: 'TP. Hồ Chí Minh',
        remote: 'hybrid',
        salaryMin: 25000000,
        salaryMax: 40000000,
        salaryCurrency: 'VND',
        description: `🔧 Vai trò:

• Thiết kế và phát triển RESTful/GraphQL APIs
• Xây dựng và maintain hệ thống microservices
• Tối ưu database performance (PostgreSQL, MongoDB)
• Viết code sạch, dễ test và maintain
• Làm việc với Docker, Kubernetes
• Participating trong code reviews`,
        requirements: `✅ Yêu cầu:

• 2-4 năm kinh nghiệm với Node.js hoặc Go
• Thành thạo PostgreSQL, MongoDB
• Kinh nghiệm với Docker và container orchestration
• Hiểu biết về CI/CD pipelines
• Kỹ năng problem-solving tốt`,
        benefits: `💰 Quyền lợi:

• Lương: 25-40M/tháng + thưởng performance
• Bảo hiểm sức khỏe cao cấp
• Làm việc hybrid linh hoạt
• Ngân sách học tập $1,200/năm`,
        mustHaveSkills: [
            { id: 's7', name: 'Node.js', level: 'advanced' },
            { id: 's8', name: 'PostgreSQL', level: 'intermediate' },
            { id: 's9', name: 'Docker', level: 'intermediate' },
        ],
        niceToHaveSkills: [
            { id: 's10', name: 'Go', level: 'beginner' },
            { id: 's11', name: 'Kubernetes', level: 'beginner' },
            { id: 's12', name: 'Redis', level: 'intermediate' },
        ],
        status: 'open',
        applicantCount: 18,
        viewCount: 98,
        createdAt: '2026-01-20T09:00:00Z',
        updatedAt: '2026-02-03T14:00:00Z',
        deadline: '2026-03-20',
    },
    {
        id: 'job-003',
        companyId: 'techcorp-vietnam',
        title: 'Product Designer (UI/UX)',
        department: 'Design',
        type: 'full-time',
        level: 'senior',
        location: 'TP. Hồ Chí Minh',
        remote: 'remote',
        salaryMin: 30000000,
        salaryMax: 45000000,
        salaryCurrency: 'VND',
        description: `🎨 Điều bạn sẽ làm:

• Lead các dự án design từ concept đến hoàn thiện
• Tạo wireframes, prototypes, và high-fidelity mockups
• Conduct user research và usability testing
• Xây dựng và maintain Design System
• Collaborate với Product và Engineering teams`,
        requirements: `✅ Yêu cầu:

• 4+ năm kinh nghiệm product/UI/UX design
• Expert trong Figma
• Portfolio thể hiện end-to-end design process
• Kinh nghiệm với Design Systems
• Hiểu biết về responsive và mobile-first design`,
        benefits: `💰 Quyền lợi:

• Lương: 30-45M + bonus
• 100% Remote work
• Thiết bị: iMac 27" + iPad Pro
• Creative budget cho tools & resources`,
        mustHaveSkills: [
            { id: 's13', name: 'Figma', level: 'expert' },
            { id: 's14', name: 'UI Design', level: 'advanced' },
            { id: 's15', name: 'UX Research', level: 'intermediate' },
        ],
        niceToHaveSkills: [
            { id: 's16', name: 'Prototyping', level: 'advanced' },
            { id: 's17', name: 'Motion Design', level: 'intermediate' },
        ],
        status: 'open',
        applicantCount: 12,
        viewCount: 87,
        createdAt: '2026-01-25T10:00:00Z',
        updatedAt: '2026-02-04T09:00:00Z',
    },
    {
        id: 'job-004',
        companyId: 'techcorp-vietnam',
        title: 'DevOps Engineer',
        department: 'DevOps',
        type: 'full-time',
        level: 'middle',
        location: 'TP. Hồ Chí Minh',
        remote: 'hybrid',
        salaryMin: 28000000,
        salaryMax: 42000000,
        salaryCurrency: 'VND',
        description: `☁️ Trách nhiệm:

• Quản lý và tối ưu AWS infrastructure
• Thiết kế và implement CI/CD pipelines
• Monitoring, logging và alerting systems
• Đảm bảo high availability và disaster recovery
• Infrastructure as Code với Terraform`,
        requirements: `✅ Yêu cầu:

• 3+ năm kinh nghiệm DevOps/SRE
• Strong AWS knowledge (EC2, ECS, Lambda, RDS...)
• Kinh nghiệm với Terraform hoặc Pulumi
• Kubernetes expertise
• Scripting skills (Python, Bash)`,
        mustHaveSkills: [
            { id: 's18', name: 'AWS', level: 'advanced' },
            { id: 's19', name: 'Kubernetes', level: 'intermediate' },
            { id: 's20', name: 'Docker', level: 'advanced' },
            { id: 's21', name: 'Terraform', level: 'intermediate' },
        ],
        niceToHaveSkills: [
            { id: 's22', name: 'Python', level: 'intermediate' },
            { id: 's23', name: 'Prometheus', level: 'beginner' },
        ],
        status: 'paused',
        applicantCount: 8,
        viewCount: 45,
        createdAt: '2026-01-10T08:00:00Z',
        updatedAt: '2026-01-30T16:00:00Z',
    },
    {
        id: 'job-005',
        companyId: 'techcorp-vietnam',
        title: 'Junior React Developer',
        department: 'Engineering',
        type: 'full-time',
        level: 'junior',
        location: 'TP. Hồ Chí Minh',
        remote: 'onsite',
        salaryMin: 12000000,
        salaryMax: 18000000,
        salaryCurrency: 'VND',
        description: `🌱 Cơ hội cho bạn:

• Làm việc cùng team senior developers giàu kinh nghiệm
• Được mentoring và đào tạo bài bản
• Tham gia phát triển sản phẩm thực tế
• Cơ hội thăng tiến nhanh`,
        requirements: `✅ Yêu cầu:

• Kiến thức cơ bản về React và JavaScript
• Hiểu biết HTML/CSS
• Tinh thần học hỏi, ham tìm hiểu
• Fresh graduates được hoan nghênh!`,
        mustHaveSkills: [
            { id: 's23', name: 'JavaScript', level: 'intermediate' },
            { id: 's24', name: 'React', level: 'beginner' },
            { id: 's25', name: 'HTML/CSS', level: 'intermediate' },
        ],
        niceToHaveSkills: [
            { id: 's26', name: 'TypeScript', level: 'beginner' },
            { id: 's27', name: 'Git', level: 'beginner' },
        ],
        status: 'closed',
        applicantCount: 56,
        viewCount: 234,
        createdAt: '2025-12-01T08:00:00Z',
        updatedAt: '2026-01-15T12:00:00Z',
    },
    {
        id: 'job-006',
        companyId: 'techcorp-vietnam',
        title: 'AI/ML Engineer',
        department: 'Data Science',
        type: 'full-time',
        level: 'senior',
        location: 'TP. Hồ Chí Minh',
        remote: 'hybrid',
        salaryMin: 45000000,
        salaryMax: 70000000,
        salaryCurrency: 'VND',
        description: `🤖 Vai trò:

• Phát triển ML models cho product recommendations
• NLP và Computer Vision applications
• Data pipeline design và optimization
• MLOps và model deployment
• Research và implement SOTA algorithms`,
        requirements: `✅ Yêu cầu:

• 5+ năm kinh nghiệm ML/AI
• Strong Python và ML frameworks (PyTorch, TensorFlow)
• Kinh nghiệm deploy models to production
• PhD hoặc Master's degree ưu tiên`,
        mustHaveSkills: [
            { id: 's28', name: 'Python', level: 'expert' },
            { id: 's29', name: 'Machine Learning', level: 'advanced' },
            { id: 's30', name: 'PyTorch', level: 'advanced' },
        ],
        niceToHaveSkills: [
            { id: 's31', name: 'TensorFlow', level: 'intermediate' },
            { id: 's32', name: 'MLOps', level: 'intermediate' },
            { id: 's33', name: 'NLP', level: 'intermediate' },
        ],
        status: 'draft',
        applicantCount: 0,
        viewCount: 0,
        createdAt: '2026-02-05T08:00:00Z',
        updatedAt: '2026-02-05T08:00:00Z',
    },
    {
        id: 'job-007',
        companyId: 'techcorp-vietnam',
        title: 'QA Engineer',
        department: 'QA',
        type: 'full-time',
        level: 'middle',
        location: 'TP. Hồ Chí Minh',
        remote: 'hybrid',
        salaryMin: 20000000,
        salaryMax: 30000000,
        salaryCurrency: 'VND',
        description: `🔍 Công việc:

• Manual và automated testing
• Test planning và test case design
• Bug tracking và reporting
• API testing với Postman
• Performance testing`,
        requirements: `✅ Yêu cầu:

• 2-4 năm kinh nghiệm QA
• Automation testing skills (Selenium, Cypress)
• API testing knowledge
• Attention to detail`,
        mustHaveSkills: [
            { id: 's34', name: 'Selenium', level: 'intermediate' },
            { id: 's35', name: 'Postman', level: 'advanced' },
            { id: 's36', name: 'JIRA', level: 'intermediate' },
        ],
        niceToHaveSkills: [
            { id: 's37', name: 'Cypress', level: 'beginner' },
            { id: 's38', name: 'Jest', level: 'beginner' },
        ],
        status: 'open',
        applicantCount: 15,
        viewCount: 67,
        createdAt: '2026-01-28T10:00:00Z',
        updatedAt: '2026-02-04T15:00:00Z',
        deadline: '2026-02-28',
    },
];
