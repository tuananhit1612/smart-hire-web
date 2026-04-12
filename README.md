![SmartHire Frontend Banner](file:///C:/Users/Admin/.gemini/antigravity/brain/bf2e4e15-9e5b-4f89-becd-874451779a93/smarthire_frontend_banner_1776016964793.png)

# SmartHire Frontend Client 🌟

A comprehensive, cutting-edge recruitment and Applicant Tracking System (ATS) platform. The frontend application provides a seamlessly fast and beautiful experience for Candidates to find jobs/build CVs, and for Employers/HR to manage pipelines and onboard candidates.

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router), React 18 |
| **Styling** | TailwindCSS, CSS Modules |
| **Bundler** | Turbopack |
| **State Management** | Zustand |
| **Components** | Custom UI Library (Glassmorphism & Modern aesthetics) |
| **DevOps** | Docker (Auto standalone mode), Docker Compose |

## 📐 Architecture & Project Structure

```text
smarthire-app/
├── src/
│   ├── app/               # Next.js App Router (Pages & Layouts)
│   ├── features/          # Domain-specific components (dashboard, onboarding, cv, employer)
│   ├── shared/            # Shared components, hooks, utils, and lib
│   ├── public/            # Static assets
│   └── styles/            # Global CSS / Tailwind directives
├── next.config.ts         # Next.js & Turbopack configurations
├── package.json           # Dependencies & NPM Scripts
├── Dockerfile             # Multi-stage production Docker build
└── docker-compose.yml     # Orchestration entrypoint
```

## ✨ Core Features

### 👨‍💼 Candidate Experience
- **🚀 AI Resume Builder**: Visually stunning CV builder with dynamic templates.
- **📄 Resume Parsing**: Upload existing CVs and allow the system to extract data via AI backend parsing.
- **💼 Job Search & Apply**: Browse and seamlessly apply to modern job postings.
- **📈 Application Tracking**: Track the status of active applications in real-time.

### 🏢 Employer & HR Admin
- **👀 Applicant Board**: Kanban-style pipeline to drag-and-drop candidates through stages.
- **📑 Verification & Onboarding**: Complete end-to-end digital onboarding for hired candidates, verifying documents (ID, diplomas).
- **📊 HR Dashboard**: Analytics on job views, conversions, and hiring trends.

## 📦 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- NPM or PNPM
- Docker (for containerized deployment)

### 1. Local Setup
```bash
git clone https://github.com/khoazandev/smart-hire-web.git
cd smart-hire-web

# Install dependencies
npm install

# Start Development Server (Turbopack)
npm run dev
# App runs on http://localhost:3000
```

### 2. Docker Deployment
```bash
# Build and run using Docker Compose
docker-compose up -d --build
```

## 🔑 Environment Variables

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the SmartHire Backend API |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID`| Client ID for GitHub OAuth Login |

*Note: Create a `.env.local` file based on `.env.docker.example` for testing.*

<br />
<p align="center"><i>Powered by Next.js, React & TailwindCSS</i></p>
