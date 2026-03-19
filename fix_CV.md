Nhìn ảnh thì hướng bạn đang đi là đúng: form ở giữa, live preview bên phải, các mục CV ở sidebar trái. Với một dự án opensource CV designer, mình khuyên bạn đừng nghĩ nó như “một cái form đẹp”, mà hãy xây nó như một bộ máy dựng tài liệu.

Điểm quan trọng nhất:

Đừng làm kiểu canvas-first quá sớm.
CV là tài liệu để đọc, in, xuất PDF, qua ATS, nên nền tảng mạnh nhất thường là:

HTML/CSS-first + schema dữ liệu chuẩn + PDF export chuẩn in ấn

chứ không phải kéo thả kiểu Figma từ đầu.

1) Nên dùng gì
Stack hợp lý nhất để build bộ công cụ mạnh

Frontend: React + TypeScript

Framework: Next.js hoặc Vite

cần fullstack/auth/export server thì chọn Next.js

muốn nhẹ, nhanh, opensource dễ hack thì Vite

UI: Tailwind CSS + shadcn/ui

State: Zustand

Form: React Hook Form + Zod

Drag/drop section: dnd-kit

Rich text mô tả công việc: Tiptap

PDF export: Playwright hoặc Puppeteer in từ HTML/CSS

Backend (nếu cần): Supabase / PostgreSQL

Storage avatar/file: S3 compatible hoặc Supabase Storage

2) Thứ phải xây trước tiên
A. Data schema chuẩn

Bạn cần một schema CV rõ ràng, ví dụ:

basics

summary

work[]

education[]

projects[]

skills[]

certifications[]

awards[]

theme

layout

typography

Ví dụ tư duy dữ liệu:

type Resume = {
  basics: {
    fullName: string
    title: string
    email: string
    phone?: string
    location?: string
    website?: string
    github?: string
    linkedin?: string
    avatar?: string
  }
  summary?: string
  work: Array<{
    company: string
    position: string
    location?: string
    startDate?: string
    endDate?: string
    current?: boolean
    highlights: string[]
  }>
  education: Array<{
    school: string
    degree?: string
    field?: string
    startDate?: string
    endDate?: string
    gpa?: string
  }>
  projects: Array<{
    name: string
    description?: string
    techStack?: string[]
    link?: string
    highlights?: string[]
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  theme: {
    primaryColor: string
    fontFamily: string
    fontScale: number
    spacing: number
  }
  layout: {
    templateId: string
    columns: "one" | "two"
    pageSize: "A4"
  }
}

Cái này là xương sống. Nếu schema yếu, sau này template nào cũng rối.

B. Render engine thống nhất

Hiện ở ảnh của bạn, mình thấy một vấn đề rất điển hình:

form nhập dữ liệu

preview render ra

có chỗ bị undefined 2021, undefined 2024

Điều đó cho thấy data mapping hoặc date formatter đang chưa ổn.

Bạn cần một pipeline như này:

Form data -> normalize -> schema -> template renderer -> preview/export

Ví dụ:

tháng/năm phải normalize trước

nếu thiếu tháng thì chỉ render năm

nếu current = true thì render “Present” thay vì endDate

tuyệt đối không để template xử lý dữ liệu thô bừa bãi

Ví dụ formatter:

export function formatDateRange(start?: string, end?: string, current?: boolean) {
  const format = (value?: string) => {
    if (!value) return ""
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const left = format(start)
  const right = current ? "Present" : format(end)

  return [left, right].filter(Boolean).join(" - ")
}
C. Template system thật sự “opensource-friendly”

Muốn mạnh thì template không nên là mớ component hardcode.

Nó nên là:

mỗi template là một package/component độc lập

nhận đúng Resume schema

output ra HTML/CSS chuẩn A4

có metadata riêng

Ví dụ:

type ResumeTemplate = {
  id: string
  name: string
  thumbnail: string
  supports: {
    columns: 1 | 2
    photo: boolean
    atsFriendly: boolean
  }
  render: (resume: Resume) => React.ReactNode
}

Khi đó cộng đồng có thể tự tạo template mới mà không phải đụng core.

3) Muốn “siêu mạnh” thì phải có 5 lõi này
1. Document-first editor

Thay vì cho người dùng kéo từng chữ như Canva, hãy cho họ:

thêm/xóa section

đổi thứ tự section

chỉnh spacing

đổi font

đổi màu

đổi bố cục 1 cột / 2 cột

bật/tắt avatar

chọn template

Đây là hướng mạnh nhất cho CV vì:

ít lỗi layout hơn

PDF đẹp hơn

ATS tốt hơn

maintain dễ hơn

2. A4 layout engine

Phải có:

khung A4 thật

margin chuẩn

auto page break

cảnh báo tràn trang

chế độ 1 trang / 2 trang

Cái này cực kỳ đáng tiền.

3. Export engine xịn

Đừng chỉ window.print() sơ sài.

Nên làm:

render HTML/CSS

export PDF bằng Playwright/Puppeteer

text selectable

font nhúng chuẩn

spacing ổn định

4. Theme/token system

Mọi template nên dùng design token:

primary

secondary

text

muted

border

spacing scale

font scale

Sau này đổi theme cực khỏe.

5. Plugin/template API

Opensource mạnh là ở đây.

Cho phép cộng đồng:

thêm template

thêm section mới

thêm theme pack

thêm import/export adapter

4) Những tính năng “đắt” nên làm sau MVP

Sau khi core ổn, thêm dần:

ATS mode: chuyển về layout tối giản, ít icon, ít cột

Smart fit: tự giảm spacing/font để CV vừa 1 trang

JD tailoring: tối ưu CV theo job description

Import LinkedIn / JSON / file cũ

Multi-language CV

Versioning: tạo nhiều bản CV cho nhiều job

Visual regression test cho template

Template marketplace/community repo

Share public link / export web resume

Collaborative editing nếu muốn đi xa

5) Những gì bạn nên làm ngay bây giờ
Giai đoạn 1: Sửa nền móng

Chuẩn hóa schema dữ liệu

Sửa toàn bộ lỗi undefined, date, mapping

Tách editor state khỏi template render state

Làm 1 renderer dùng chung cho:

preview

export PDF

thumbnail template

Giai đoạn 2: Ra MVP đúng nghĩa

Ship thật tốt 3 template:

1 template ATS

1 template modern

1 template 2 cột có avatar

Đừng cố làm 20 template sớm.
3 template ngon > 20 template lỗi.

Giai đoạn 3: Mở cho cộng đồng

viết docs tạo template mới

tạo template starter

có sample schema

có screenshot test

có contribution guide

6) Kiến trúc repo mình khuyên dùng
apps/
  web/

packages/
  core-schema/
  core-renderer/
  ui/
  editor/
  export-pdf/
  template-atlantic/
  template-minimal/
  template-modern/
  shared-utils/

Ý nghĩa:

core-schema: định nghĩa Resume schema

core-renderer: logic render section/layout

editor: block editor, reorder, config panel

export-pdf: Playwright/PDF pipeline

template-*: mỗi template một package

Kiểu này rất hợp opensource.

7) Một quyết định rất quan trọng: HTML/CSS hay Canvas?
Mình khuyên:

HTML/CSS trước, Canvas sau

Vì HTML/CSS giúp bạn:

in PDF đẹp

text selectable

SEO/share web profile tốt

ATS thân thiện hơn

dev template nhanh hơn nhiều

Canvas/SVG chỉ nên thêm nếu sau này bạn muốn:

drag tự do như poster

infographics CV

timeline phức tạp

absolute positioning nặng

Còn với CV job market thực tế, HTML/CSS là vua.

8) Nhìn riêng từ ảnh của bạn, mình thấy bạn đang thiếu 4 thứ

data normalization chưa sạch nên mới ra undefined

preview fidelity cần sát output PDF hơn

template abstraction chưa rõ, có vẻ logic đang dính vào form

spacing/typography system chưa thành một hệ thống hoàn chỉnh

Nói dễ hiểu: app đang giống “form tạo CV”, chưa thành “engine thiết kế CV”.

9) Nếu mục tiêu là dự án opensource mạnh thật sự, tầm nhìn nên là

Không phải:

“website làm CV”

mà là:

“open-source resume engine + template ecosystem + export pipeline”

Nghe khác ít thôi, nhưng hướng build khác hẳn.

10) Công thức MVP ngon nhất cho bạn

Nếu là mình, mình sẽ chốt như này:

React + TypeScript + Tailwind

Zod + React Hook Form

Zustand

dnd-kit

Tiptap

Playwright PDF

Schema-first

Template plugin architecture

HTML/CSS A4 renderer

Đó là bộ khung rất mạnh, rất hợp opensource, và scale tốt.