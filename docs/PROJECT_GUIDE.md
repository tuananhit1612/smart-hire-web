# SmartHire App - Project Documentation & Teamwork Guide

## 1. Tổng quan Project (Project Overview)

**SmartHire** là một ứng dụng web hiện đại được xây dựng trên nền tảng **Next.js 16**, hướng tới hiệu suất cao, khả năng bảo trì tốt và mở rộng dễ dàng. Dự án áp dụng kiến trúc module hóa (Feature-based Architecture) để quản lý độ phức tạp khi dự án phát triển.

### Tech Stack
- **Framework**: [Next.js 16+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: Zustand, React Query (Server State)
- **Linting/Formatting**: ESLint, Prettier
- **Design Standard**: [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

---

## 2. Cấu trúc Dự án (Project Structure)

Dự án tuân theo cấu trúc phân chia theo tính năng (Feature-based / Semantic Structure) giúp code rõ ràng, dễ test và tránh "Spaghetti code".

```
src/
├── app/                  # Application Layer (Next.js App Router, Routing logic only)
├── core/                 # Core Layer (Singleton services, global store, configs)
├── features/             # Feature Layer (Business Logic per domain)
├── shared/               # Shared Layer (Reusable components, hooks, utils - No dependencies on features)
├── lib/                  # Library configurations (API client, utils)
└── providers/            # Context Providers (Theme, Auth)
```

### Chi tiết các thư mục:

#### `src/app/` (Application Layer)
- Chỉ chứa logic routing, layout, loading, error.
- **KHÔNG** viết business logic phức tạp tại đây.

#### `src/features/` (Feature Layer)
Nơi chứa logic nghiệp vụ chính.
Ví dụ `src/features/jobs`:
- `api/`: Job services code.
- `components/`: Components UI riêng của Jobs.
- `hooks/`: Custom hooks (useJobs).
- `types/`: Job interfaces/types.
- `utils/`: Helper functions cho Jobs.

#### `src/shared/` (Shared Layer)
Thành phần dùng chung cả dự án.
- `components/`: Dumb components (Button, Card, Modal).
- `hooks/`: Global hooks (useOnClickOutside).
- `utils/`: Common utils (date formatter).

---

## 3. Coding Guidelines & Best Practices (QUAN TRỌNG)

Mọi thành viên team bắt buộc tuân thủ các quy tắc dưới đây để đảm bảo chất lượng code.

### 3.1. General Rules (Nguyên tắc chung)
- **File Limits**:
    - Max **500 dòng/file**.
    - Nếu vượt quá 500 dòng $\rightarrow$ Bắt buộc refactor tách nhỏ (component con, service, util, dto).
- **Single Responsibility (SRP)**: Mỗi file/function chỉ làm 1 việc duy nhất.
- **Don't Repeat Yourself (DRY)**:
    - Logic xuất hiện $\ge$ 2 nơi $\rightarrow$ đưa vào `shared` (util/service/hook).
- **Naming**:
    - Tên phải rõ nghĩa, mô tả đúng chức năng.
    - ❌ Cấm: `data1`, `temp`, `abc`, `handleThing`.
    - ✅ Đúng: `userProfile`, `isLoading`, `submitJobForm`.
- **No Hardcoding**:
    - Tuyệt đối không hardcode strings/numbers ma thuật.
    - Đưa vào `constants`, `env`, hoặc `config`.
- **Error Handling**:
    - Không `console.log` bừa bãi. Xóa `console.log` trước khi commit.
    - Cần có level log (info/warn/error) nếu cần thiết.
    - Luôn handle error gracefully: user phải nhận được thông báo lỗi dễ hiểu, dev nhận được technical details.

### 3.2. Component Rules
- **"Dumb" Components (UI)**:
    - Chỉ nhận `props` và render.
    - Không gọi API trực tiếp.
    - Nằm trong `shared/components` hoặc `features/*/components`.
- **Container/Feature Components**:
    - Xử lý logic, gọi API, quản lý state.
    - Pass data xuống dumb components.
- **Separation of Concerns**:
    - Nếu component $> 200$ dòng hoặc logic phức tạp $\rightarrow$ Tách file:
        - `JobCard.tsx` (View)
        - `JobCard.logic.ts` hoặc `useJobCard.ts` (Logic/Effect)
        - `JobCard.types.ts` (Types)
    - **KHÔNG** nhồi nhét API call + State logic + UI vào chung 1 file quá lớn.

### 3.3. State Management
- **Local State**: Ưu tiên dùng `useState`, `useReducer` cho UI state đơn giản (đóng mở modal, input).
- **Server State**: Bắt buộc dùng **React Query** (hoặc SWR) cho data từ API (fetching, caching, revalidation).
- **Global State**:
    - Hạn chế dùng global store nếu không thực sự cần thiết.
    - Dùng **Zustand** cho state toàn cục (Theme, User Session, Sidebar status).
    - Tránh lạm dụng Context API cho state thay đổi nhanh (gây re-render).
- **Form**: Khuyên dùng `react-hook-form` + `zod` để validate.

### 3.4. API Call Rules
- **Centralized Client**: Tất cả request đi qua `src/lib/apiClient.ts` (đã config interceptors, base URL).
- **Service Pattern**:
    - Không gọi `fetch` rải rác trong component.
    - Tạo service file theo feature: `features/jobs/services/jobService.ts`.
- **Standard Response**: Service phải trả về data đã parse/transform, không trả về raw Axios/Fetch response object cho UI.

### 3.5. TypeScript & Typing
- **No ANY**: ❌ Cấm dùng `any` trừ trường hợp bất khả kháng (phải có comment giải thích ` // eslint-disable-next-line ...`).
- **Strict Typing**: Mọi Request/Response từ API, Props của Component đều phải có Interface/Type rõ ràng.
- **Organization**: Tạo file `types.ts` trong folder feature tương ứng.

### 3.6. Naming Conventions (Frontend)
- **Components**: `PascalCase` (VD: `JobCard.tsx`, `UserProfile.tsx`).
- **Hooks**: `useCamelCase` (VD: `useAuth.ts`, `useWindowMapping.ts`).
- **Functions/Variables**: `camelCase` (VD: `getUserById`, `isSubmitting`).
- **Constants**: `SCREAMING_SNAKE_CASE` (VD: `MAX_FILE_SIZE`, `DEFAULT_PAGE_LIMIT`).

### 3.7. Styling
- **Framework**: **Tailwind CSS**.
- **Consistency**:
    - Không trộn lẫn CSS Modules và Tailwind trừ khi migrate.
    - Sử dụng `clsx` hoặc `tailwind-merge` để xử lý dynamic classes.

### 3.8. Linting & Formatting
- **Bắt buộc**:
    - ESLint: Phải pass (không còn error/warning đỏ lòm).
    - Prettier: Format code tự động khi save.
- **Khuyến nghị**: Cài đặt extension ESLint và Prettier trong VS Code.

---

## 5. UI/UX Guidelines (Standard: UI UX Pro Max)
\docs\DESIGN_STANDARD.md
---
