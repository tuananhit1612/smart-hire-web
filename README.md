# SmartHire Frontend 🎨

The user-facing portal for SmartHire, a premium Applicant Tracking System (ATS). Built to deliver a blazing-fast, highly responsive, and beautiful user experience for both Job Seekers and HR Professionals.

---

## 🏗️ Architecture

![Frontend Architecture](C:\Users\Admin\.gemini\antigravity\brain\2a6b98ce-fdb0-4f36-9483-7af3be51eff5\frontend_architecture_1774850596747.png)

The Frontend is built using the latest Next.js 15 App Router paradigm, featuring highly optimized static rendering and secure state management. The codebase follows a "Feature-Sliced Design" methodology for extreme scalability.

---

## 🛠️ Tech Stack

- **Framework**: React 19, Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (Animations), shadcn/ui (Radix UI)
- **State Management**: Zustand (Global), React Hook Form (Forms)
- **Data Fetching**: Axios
- **Real-time**: StompJS / SockJS
- **PDF Generation**: html2canvas, jspdf, puppeteer

---

## 📁 Project Structure

```
smarthire-app/
├── src/
│   ├── app/           # Next.js App Router (Pages & Layouts routing)
│   ├── features/      # Feature modules (auth, jobs, hr-company, cv, etc.)
│   ├── shared/        # Reusable UI components (Tailwind classes, buttons)
│   ├── lib/           # Utility functions, API configs, Zustand stores
│   └── styles/        # Global CSS variables
```

---

## ✨ Features

- **Dynamic Role-Based Dashboards**: Seamlessly switches between the minimal Job Seeker flow and the data-heavy HR Recruiter pipeline.
- **CV Builder & Exporter**: Construct a CV via UI and export beautiful templates to PDF instantly.
- **Kanban Board**: Drag-and-drop interactive kanban boards using `@dnd-kit` for application stage tracking.
- **Glassmorphism UI**: Uses cutting-edge styling, dynamic animations (`framer-motion`), and rich aesthetics.
- **Real-Time Notifications**: WebSocket connections ensure immediate updates on interview schedules and application status.

---

## 🚀 Getting Started

### Environment Variables

Create a `.env.local` file at the root of the project:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
```

### Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the fast development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

### Run with Docker

Deploy easily using the provided Dockerfile:

```bash
docker build -t smarthire-frontend .
docker run -p 3000:3000 smarthire-frontend
```

---

## 🧪 Unit Tests

- **Tools**: Jest, React Testing Library.
- **Execution**: Run `npm run test` or `npm run test:watch`.
- Tests focus on verifying complex UI component behavior, Zustand reducer states, and utility logic.

---

## 🔄 CI/CD Pipeline

The frontend pipeline guarantees a functional UI deployment.

**Pipeline Stages:**
1. **Typecheck & Lint**: Runs `tsc --noEmit` and `eslint` to ensure strict typing/formatting.
2. **Build Optimization**: Executes `next build` to verify standard build integrity.
3. **Unit Tests**: Runs Jest UI test suites.
4. **Deploy Preview**: Automatically spins up a staging preview URL for Pull Requests (via Vercel).
5. **Production Deploy**: Pushes the optimized bundle to Edge Network CDN on a `main` merge.
