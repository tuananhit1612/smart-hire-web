# SmartHire Backend — Frontend Integration API Reference

> **Base URL:** `http://localhost:8080/api/v1`
> **Auth:** JWT Bearer Token — include `Authorization: Bearer <token>` header on all protected endpoints.
> **All responses** follow the unified wrapper:

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "timestamp": "2025-01-01T00:00:00"
}
```

On errors:
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2025-01-01T00:00:00"
}
```

---

## Table of Contents

1. [Enums Reference](#1-enums-reference)
2. [Auth](#2-auth)
3. [Users (Admin)](#3-users-admin)
4. [Companies](#4-companies)
5. [Jobs](#5-jobs)
6. [Applications](#6-applications)
7. [Candidate Profile](#7-candidate-profile)
8. [Candidate Education](#8-candidate-education)
9. [Candidate Experience](#9-candidate-experience)
10. [Candidate Projects](#10-candidate-projects)
11. [Candidate Skills](#11-candidate-skills)
12. [CV Files](#12-cv-files)
13. [CV Builder](#13-cv-builder)
14. [Interviews](#14-interviews)
15. [Notifications](#15-notifications)
16. [Dashboards](#16-dashboards)
17. [Report Exports](#17-report-exports)

---

## 1. Enums Reference

Use these **exact string values** (case-sensitive) when sending enum fields.

| Enum | Values |
|------|--------|
| `Role` | `ADMIN`, `HR`, `CANDIDATE` |
| `Gender` | `MALE`, `FEMALE`, `OTHER` |
| `JobStatus` | `DRAFT`, `OPEN`, `CLOSED`, `PAUSED` |
| `JobType` | `FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERN`, `FREELANCE`, `REMOTE` |
| `JobLevel` | `INTERN`, `JUNIOR`, `MIDDLE`, `SENIOR`, `LEAD`, `MANAGER`, `DIRECTOR` |
| `ApplicationStage` | `APPLIED`, `SCREENING`, `INTERVIEW`, `OFFER`, `HIRED`, `REJECTED` |
| `InterviewType` | `ONLINE`, `OFFLINE` |
| `InterviewStatus` | `SCHEDULED`, `COMPLETED`, `CANCELLED`, `RESCHEDULED` |
| `CvFileType` | `PDF`, `DOCX` |
| `CvSource` | `UPLOADED`, `BUILT` |
| `ProficiencyLevel` | `BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT` |
| `NotificationType` | `APPLICATION_SUBMITTED`, `APPLICATION_STAGE_CHANGED`, `INTERVIEW_SCHEDULED`, `INTERVIEW_CANCELLED`, `INTERVIEW_RESCHEDULED`, `JOB_POSTED`, `JOB_CLOSED`, `SYSTEM` |

---

## 2. Auth

Base path: `/api/v1/auth`

### POST `/auth/register` — Register a new account

**Body:**
```json
{
  "fullName": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "phone": "string (optional)",
  "role": "CANDIDATE | HR"
}
```

**Response (201):** `AuthResponse`
```json
{
  "accessToken": "jwt-string",
  "refreshToken": "jwt-string",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+84...",
    "role": "CANDIDATE",
    "avatarUrl": null,
    "active": true,
    "createdAt": "2025-01-01T00:00:00"
  }
}
```

---

### POST `/auth/login` — Login

**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200):** `AuthResponse` (same shape as register)

---

### POST `/auth/refresh` — Refresh access token

**Body:**
```json
{
  "refreshToken": "string (required)"
}
```

**Response (200):** `AuthResponse`

---

### PUT `/auth/me` — Update my profile

**Body:**
```json
{
  "fullName": "string (2-100 chars)",
  "phone": "string",
  "avatarUrl": "string"
}
```

**Response (200):** `UserResponse`
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+84...",
  "role": "CANDIDATE",
  "avatarUrl": "https://...",
  "active": true,
  "createdAt": "2025-01-01T00:00:00"
}
```

---

### PUT `/auth/me/password` — Change my password

**Body:**
```json
{
  "currentPassword": "string (required, min 6)",
  "newPassword": "string (required, min 6)"
}
```

**Response (200):** success message, no data

---

### POST `/auth/me/avatar` — Upload avatar

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `file` | file | Image file |

**Response (200):** `string` (the new avatar URL)

---

## 3. Users (Admin)

Base path: `/api/v1/admin/users` — **Role: ADMIN only**

### GET `/admin/users` — List all users

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | int | 0 | Page number (0-based) |
| `size` | int | 10 | Page size |
| `role` | string | — | Filter by role (`ADMIN`, `HR`, `CANDIDATE`) |
| `active` | boolean | — | Filter by active status |
| `search` | string | — | Search by name or email |

**Response (200):** Spring `Page<UserResponse>`
```json
{
  "content": [ { UserResponse }, ... ],
  "totalElements": 100,
  "totalPages": 10,
  "number": 0,
  "size": 10
}
```

---

### POST `/admin/users` — Create user (admin)

**Body:**
```json
{
  "fullName": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6)",
  "phone": "string",
  "role": "ADMIN | HR | CANDIDATE"
}
```

**Response (201):** `UserResponse`

---

### PUT `/admin/users/{id}` — Update user

**Body:**
```json
{
  "fullName": "string",
  "phone": "string",
  "role": "ADMIN | HR | CANDIDATE"
}
```

**Response (200):** `UserResponse`

---

### PATCH `/admin/users/{id}/toggle-active` — Toggle user active/inactive

**Response (200):** `UserResponse` (with updated `active` flag)

---

## 4. Companies

Base path: `/api/v1/companies` — **Role: HR or ADMIN**

### GET `/companies` — List my companies (HR: own; Admin: all)

**Response (200):** `List<CompanyResponse>`

```json
{
  "id": 1,
  "name": "TechCorp",
  "description": "...",
  "website": "https://...",
  "logoUrl": "https://...",
  "industry": "Technology",
  "companySize": "100-500",
  "address": "...",
  "city": "Ho Chi Minh",
  "ownerId": 5,
  "ownerName": "HR User",
  "createdAt": "2025-01-01T00:00:00",
  "updatedAt": "2025-01-01T00:00:00"
}
```

---

### GET `/companies/{id}` — Get company detail

**Response (200):** `CompanyResponse`

---

### POST `/companies` — Create company

**Body:**
```json
{
  "name": "string (required, max 255)",
  "description": "string",
  "website": "string (valid URL)",
  "logoUrl": "string (valid URL)",
  "industry": "string (max 100)",
  "companySize": "string (max 50)",
  "address": "string (max 500)",
  "city": "string (max 100)"
}
```

**Response (201):** `CompanyResponse`

---

### PUT `/companies/{id}` — Update company

Same body as create. **Response (200):** `CompanyResponse`

---

### DELETE `/companies/{id}` — Delete company

**Response (200):** success message, data: `null`

---

## 5. Jobs

### Public (No auth required)

#### GET `/public/jobs` — Browse public jobs

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | int | 0 | Page (0-based) |
| `size` | int | 10 | Page size |
| `keyword` | string | — | Search title/description |
| `city` | string | — | Filter by city |
| `jobType` | string | — | Filter by `JobType` |
| `jobLevel` | string | — | Filter by `JobLevel` |

**Response (200):** `Page<JobResponse>`

---

#### GET `/public/jobs/{id}` — Public job detail

**Response (200):** `JobResponse`

---

#### POST `/public/jobs/{jobId}/apply` — Apply to job (multipart)

**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `candidateName` | string | ✅ | Applicant name |
| `candidateEmail` | string | ✅ | Applicant email |
| `candidatePhone` | string | — | Phone |
| `coverLetter` | string | — | Cover letter text |
| `cvFile` | file | ✅ | PDF/DOCX CV file |

**Response (201):** `ApplicationResponse`

---

### Protected — `/api/v1/jobs` (HR / ADMIN)

#### GET `/jobs` — List jobs for current HR

**Query params:** `page`, `size`, `status`, `search` (same pattern)

**Response (200):** `Page<JobResponse>`

---

#### GET `/jobs/{id}` — Get job detail

**Response (200):** `JobResponse`

```json
{
  "id": 1,
  "title": "Senior Java Developer",
  "description": "...",
  "requirements": "...",
  "benefits": "...",
  "jobType": "FULL_TIME",
  "jobLevel": "SENIOR",
  "status": "OPEN",
  "salaryMin": 2000,
  "salaryMax": 3000,
  "city": "Ho Chi Minh",
  "address": "...",
  "deadline": "2025-06-01",
  "companyId": 1,
  "companyName": "TechCorp",
  "companyLogoUrl": "https://...",
  "createdByUserId": 5,
  "totalApplications": 15,
  "createdAt": "2025-01-01T00:00:00",
  "updatedAt": "2025-01-01T00:00:00"
}
```

---

#### POST `/jobs` — Create job

**Body:**
```json
{
  "title": "string (required, max 255)",
  "description": "string",
  "requirements": "string",
  "benefits": "string",
  "jobType": "FULL_TIME",
  "jobLevel": "SENIOR",
  "status": "DRAFT",
  "salaryMin": 2000,
  "salaryMax": 3000,
  "city": "string (max 100)",
  "address": "string (max 500)",
  "deadline": "2025-06-01",
  "companyId": 1
}
```

**Response (201):** `JobResponse`

---

#### PUT `/jobs/{id}` — Update job

Same body as create. **Response (200):** `JobResponse`

---

#### PATCH `/jobs/{id}/status` — Change job status

**Body:**
```json
{
  "status": "OPEN | CLOSED | PAUSED | DRAFT"
}
```

**Response (200):** `JobResponse`

---

#### DELETE `/jobs/{id}` — Delete job

**Response (200):** success, data: `null`

---

## 6. Applications

Base path: `/api/v1/applications` — **Role: HR / ADMIN**

### GET `/applications/{id}` — Get application detail

**Response (200):** `ApplicationResponse`

```json
{
  "id": 1,
  "jobId": 1,
  "jobTitle": "Senior Java Developer",
  "candidateName": "Candidate Name",
  "candidateEmail": "candidate@email.com",
  "candidatePhone": "+84...",
  "coverLetter": "...",
  "cvFileName": "cv.pdf",
  "cvFileUrl": "/uploads/cv/...",
  "stage": "APPLIED",
  "appliedAt": "2025-01-01T00:00:00",
  "updatedAt": "2025-01-01T00:00:00"
}
```

---

### GET `/applications/job/{jobId}` — List applications for a job

**Query params:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `stage` | string | — | Filter by `ApplicationStage` |

**Response (200):** `List<ApplicationResponse>`

---

### PATCH `/applications/{id}/stage` — Change application stage

**Body:**
```json
{
  "stage": "SCREENING | INTERVIEW | OFFER | HIRED | REJECTED",
  "note": "string (optional — reason / comment)"
}
```

**Response (200):** `ApplicationResponse`

---

## 7. Candidate Profile

Base path: `/api/v1/candidate/profile` — **Role: CANDIDATE only**

### GET `/candidate/profile` — Get my profile

**Response (200):** `CandidateProfileResponse`

```json
{
  "id": 1,
  "userId": 10,
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+84...",
  "avatarUrl": "https://...",
  "headline": "Senior Java Developer",
  "summary": "Experienced developer...",
  "dateOfBirth": "1995-01-15",
  "gender": "MALE",
  "address": "123 Street",
  "city": "Ho Chi Minh",
  "yearsOfExperience": 5,
  "jobLevel": "SENIOR",
  "createdAt": "2025-01-01T00:00:00",
  "updatedAt": "2025-01-01T00:00:00"
}
```

---

### POST `/candidate/profile` — Create profile

**Body:**
```json
{
  "headline": "string (max 255)",
  "summary": "string",
  "dateOfBirth": "1995-01-15",
  "gender": "MALE | FEMALE | OTHER",
  "address": "string (max 500)",
  "city": "string (max 100)",
  "yearsOfExperience": 5,
  "jobLevel": "SENIOR"
}
```

**Response (201):** `CandidateProfileResponse`

---

### PUT `/candidate/profile` — Update profile

Same body as create. **Response (200):** `CandidateProfileResponse`

---

## 8. Candidate Education

Base path: `/api/v1/candidate/profile/educations` — **Role: CANDIDATE**

### GET `/candidate/profile/educations` — List educations

**Response (200):** `List<EducationResponse>`

```json
{
  "id": 1,
  "institution": "MIT",
  "degree": "Bachelor",
  "fieldOfStudy": "Computer Science",
  "startDate": "2013-09-01",
  "endDate": "2017-06-01",
  "gpa": 3.8,
  "description": "..."
}
```

---

### POST `/candidate/profile/educations` — Add education

**Body:**
```json
{
  "institution": "string (required, max 255)",
  "degree": "string (max 100)",
  "fieldOfStudy": "string (max 255)",
  "startDate": "2013-09-01",
  "endDate": "2017-06-01",
  "gpa": 3.8,
  "description": "string"
}
```

**Response (201):** `EducationResponse`

---

### PUT `/candidate/profile/educations/{id}` — Update education

Same body. **Response (200):** `EducationResponse`

---

### DELETE `/candidate/profile/educations/{id}` — Delete education

**Response (200):** success, data: `null`

---

## 9. Candidate Experience

Base path: `/api/v1/candidate/profile/experiences` — **Role: CANDIDATE**

### GET `/candidate/profile/experiences` — List experiences

**Response (200):** `List<ExperienceResponse>`

```json
{
  "id": 1,
  "companyName": "Google",
  "title": "Software Engineer",
  "startDate": "2017-07-01",
  "endDate": null,
  "isCurrent": true,
  "description": "..."
}
```

---

### POST `/candidate/profile/experiences` — Add experience

**Body:**
```json
{
  "companyName": "string (required, max 255)",
  "title": "string (required, max 255)",
  "startDate": "2017-07-01",
  "endDate": null,
  "isCurrent": true,
  "description": "string"
}
```

**Response (201):** `ExperienceResponse`

---

### PUT `/candidate/profile/experiences/{id}` — Update

Same body. **Response (200):** `ExperienceResponse`

---

### DELETE `/candidate/profile/experiences/{id}` — Delete

**Response (200):** success, data: `null`

---

## 10. Candidate Projects

Base path: `/api/v1/candidate/profile/projects` — **Role: CANDIDATE**

### GET `/candidate/profile/projects` — List projects

**Response (200):** `List<ProjectResponse>`

```json
{
  "id": 1,
  "projectName": "SmartHire",
  "description": "AI hiring platform",
  "technologies": "Java, Spring Boot, React"
}
```

---

### POST `/candidate/profile/projects` — Add project

**Body:**
```json
{
  "projectName": "string (required, max 255)",
  "description": "string",
  "technologies": "string"
}
```

**Response (201):** `ProjectResponse`

---

### PUT `/candidate/profile/projects/{id}` — Update

Same body. **Response (200):** `ProjectResponse`

---

### DELETE `/candidate/profile/projects/{id}` — Delete

**Response (200):** success, data: `null`

---

## 11. Candidate Skills

Base path: `/api/v1/candidate/profile/skills` — **Role: CANDIDATE**

### GET `/candidate/profile/skills` — List skills

**Response (200):** `List<SkillResponse>`

```json
{
  "id": 1,
  "skillName": "Java",
  "proficiencyLevel": "EXPERT"
}
```

---

### POST `/candidate/profile/skills` — Add skill

**Body:**
```json
{
  "skillName": "string (required, max 100)",
  "proficiencyLevel": "BEGINNER | INTERMEDIATE | ADVANCED | EXPERT"
}
```

**Response (201):** `SkillResponse`

---

### PUT `/candidate/profile/skills/{id}` — Update

Same body. **Response (200):** `SkillResponse`

---

### DELETE `/candidate/profile/skills/{id}` — Delete

**Response (200):** success, data: `null`

---

## 12. CV Files

Base path: `/api/v1/candidate/profile/cv-files` — **Role: CANDIDATE**

### POST `/candidate/profile/cv-files` — Upload CV

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `file` | file | PDF or DOCX. First CV auto-set as primary. |

**Response (201):** `CvFileResponse`

```json
{
  "id": 1,
  "fileName": "my-cv.pdf",
  "fileType": "PDF",
  "fileSize": 102400,
  "source": "UPLOADED",
  "isPrimary": true,
  "createdAt": "2025-01-01T00:00:00",
  "downloadUrl": "/api/v1/candidate/profile/cv-files/1/download"
}
```

---

### GET `/candidate/profile/cv-files` — List my CVs

**Response (200):** `List<CvFileResponse>`

---

### GET `/candidate/profile/cv-files/{id}` — Get CV detail

**Response (200):** `CvFileResponse`

---

### PUT `/candidate/profile/cv-files/{id}/primary` — Set as primary CV

**Response (200):** `CvFileResponse`

---

### DELETE `/candidate/profile/cv-files/{id}` — Delete CV

> Cannot delete the primary CV.

**Response (200):** success, data: `null`

---

### GET `/candidate/profile/cv-files/{id}/download` — Download CV file

**Response:** Binary file stream with `Content-Disposition: attachment`

---

## 13. CV Builder

Base path: `/api/v1/candidate/profile/cv-builder` — **Role: CANDIDATE**

### POST `/candidate/profile/cv-builder` — Create built CV

**Body:**
```json
{
  "templateId": "string",
  "sectionsData": {
    "personalInfo": { "name": "John", "email": "john@x.com" },
    "education": [ ... ],
    "experience": [ ... ]
  }
}
```
> `sectionsData` is a free-form `Map<String, Object>`.

**Response (201):** `CvBuilderResponse`

```json
{
  "id": 1,
  "cvFileId": 5,
  "candidateProfileId": 3,
  "templateId": "modern-blue",
  "sectionsData": { ... },
  "createdAt": "2025-01-01T00:00:00",
  "updatedAt": "2025-01-01T00:00:00"
}
```

---

### GET `/candidate/profile/cv-builder` — List my built CVs

**Response (200):** `List<CvBuilderResponse>`

---

### GET `/candidate/profile/cv-builder/{id}` — Get built CV detail

**Response (200):** `CvBuilderResponse`

---

### PUT `/candidate/profile/cv-builder/{id}` — Update built CV

Same body as create. **Response (200):** `CvBuilderResponse`

---

### DELETE `/candidate/profile/cv-builder/{id}` — Delete built CV

**Response (200):** success, data: `null`

---

## 14. Interviews

Base path: `/api/v1/interviews` — **Role: HR / ADMIN**

### POST `/interviews` — Schedule interview

**Body:**
```json
{
  "applicationId": 1,
  "interviewType": "ONLINE | OFFLINE",
  "scheduledAt": "2025-02-01T10:00:00",
  "durationMinutes": 60,
  "location": "string",
  "meetingLink": "https://meet.google.com/...",
  "notes": "string"
}
```

**Response (201):** `InterviewResponse`

```json
{
  "id": 1,
  "applicationId": 1,
  "jobTitle": "Senior Java Developer",
  "candidateName": "John Doe",
  "candidateEmail": "john@example.com",
  "interviewType": "ONLINE",
  "status": "SCHEDULED",
  "scheduledAt": "2025-02-01T10:00:00",
  "durationMinutes": 60,
  "location": null,
  "meetingLink": "https://meet.google.com/...",
  "notes": "...",
  "feedback": null,
  "rating": null,
  "createdAt": "2025-01-15T00:00:00",
  "updatedAt": "2025-01-15T00:00:00"
}
```

---

### GET `/interviews?applicationId={id}` — List interviews for an application

**Query params:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `applicationId` | Long | ✅ | Application ID |

**Response (200):** `List<InterviewResponse>`

---

### PUT `/interviews/{id}` — Update interview

Same body as create. **Response (200):** `InterviewResponse`

---

### PATCH `/interviews/{id}/cancel` — Cancel interview

**Response (200):** `InterviewResponse` (status → `CANCELLED`)

---

### PATCH `/interviews/{id}/feedback` — Submit feedback

**Body:**
```json
{
  "feedback": "string",
  "rating": 4
}
```

**Response (200):** `InterviewResponse` (status → `COMPLETED`)

---

## 15. Notifications

Base path: `/api/v1/notifications` — **Authenticated users**

### GET `/notifications` — List my notifications

**Response (200):** `List<NotificationResponse>`

```json
{
  "id": 1,
  "type": "INTERVIEW_SCHEDULED",
  "title": "Interview Scheduled",
  "message": "You have an interview for Senior Java Developer",
  "referenceId": 1,
  "referenceType": "INTERVIEW",
  "isRead": false,
  "createdAt": "2025-01-15T00:00:00"
}
```

---

### GET `/notifications/unread-count` — Unread count

**Response (200):** `long` (number)

---

### PATCH `/notifications/{id}/read` — Mark as read

**Response (200):** `NotificationResponse`

---

### PATCH `/notifications/read-all` — Mark all as read

**Response (200):** success message

---

## 16. Dashboards

### Admin Dashboard

**GET `/api/v1/admin/dashboard`** — **Role: ADMIN**

**Response (200):** `AdminDashboardResponse`

```json
{
  "totalUsers": 500,
  "totalCandidates": 400,
  "totalHrUsers": 90,
  "totalAdmins": 10,
  "activeUsers": 450,
  "inactiveUsers": 50,
  "totalJobs": 120,
  "openJobs": 80,
  "closedJobs": 30,
  "draftJobs": 10,
  "totalCompanies": 25,
  "totalApplications": 1500,
  "stageFunnel": [
    { "stage": "APPLIED", "count": 600 },
    { "stage": "SCREENING", "count": 400 },
    { "stage": "INTERVIEW", "count": 250 },
    { "stage": "OFFER", "count": 100 },
    { "stage": "HIRED", "count": 80 },
    { "stage": "REJECTED", "count": 70 }
  ],
  "hireRate": 0.053,
  "rejectRate": 0.047
}
```

---

### HR Dashboard — Overview

**GET `/api/v1/dashboard/hr`** — **Role: HR**

**Response (200):** `HrDashboardResponse`

```json
{
  "totalJobs": 15,
  "openJobs": 10,
  "closedJobs": 3,
  "draftJobs": 2,
  "totalApplications": 200,
  "stageFunnel": [ { "stage": "APPLIED", "count": 80 }, ... ],
  "hireRate": 0.10,
  "rejectRate": 0.15
}
```

---

### HR Dashboard — Per Job

**GET `/api/v1/dashboard/hr/jobs/{jobId}`** — **Role: HR**

**Response (200):** `JobDashboardResponse`

```json
{
  "jobId": 1,
  "jobTitle": "Senior Java Developer",
  "jobStatus": "OPEN",
  "totalApplications": 50,
  "stageFunnel": [ { "stage": "APPLIED", "count": 20 }, ... ],
  "hireRate": 0.08,
  "rejectRate": 0.12
}
```

---

## 17. Report Exports

### Admin Reports — `/api/v1/admin/reports` (ADMIN)

| Endpoint | Description | Response |
|----------|-------------|----------|
| `GET /admin/reports/applications/csv` | Export all applications CSV | Binary CSV file |
| `GET /admin/reports/jobs/csv` | Export all jobs CSV | Binary CSV file |

### HR Reports — `/api/v1/dashboard/reports` (HR)

| Endpoint | Description | Response |
|----------|-------------|----------|
| `GET /dashboard/reports/applications/csv` | Export HR's applications CSV | Binary CSV file |
| `GET /dashboard/reports/jobs/csv` | Export HR's jobs CSV | Binary CSV file |

All CSV endpoints return:
- `Content-Type: application/octet-stream`
- `Content-Disposition: attachment; filename=<name>.csv`

---

## Quick Reference — All Endpoints

| Method | Path | Auth | Role |
|--------|------|------|------|
| POST | `/auth/register` | ❌ | — |
| POST | `/auth/login` | ❌ | — |
| POST | `/auth/refresh` | ❌ | — |
| PUT | `/auth/me` | ✅ | Any |
| PUT | `/auth/me/password` | ✅ | Any |
| POST | `/auth/me/avatar` | ✅ | Any |
| GET | `/admin/users` | ✅ | ADMIN |
| POST | `/admin/users` | ✅ | ADMIN |
| PUT | `/admin/users/{id}` | ✅ | ADMIN |
| PATCH | `/admin/users/{id}/toggle-active` | ✅ | ADMIN |
| GET | `/companies` | ✅ | HR, ADMIN |
| GET | `/companies/{id}` | ✅ | HR, ADMIN |
| POST | `/companies` | ✅ | HR, ADMIN |
| PUT | `/companies/{id}` | ✅ | HR, ADMIN |
| DELETE | `/companies/{id}` | ✅ | HR, ADMIN |
| GET | `/public/jobs` | ❌ | — |
| GET | `/public/jobs/{id}` | ❌ | — |
| POST | `/public/jobs/{jobId}/apply` | ❌ | — |
| GET | `/jobs` | ✅ | HR, ADMIN |
| GET | `/jobs/{id}` | ✅ | HR, ADMIN |
| POST | `/jobs` | ✅ | HR, ADMIN |
| PUT | `/jobs/{id}` | ✅ | HR, ADMIN |
| PATCH | `/jobs/{id}/status` | ✅ | HR, ADMIN |
| DELETE | `/jobs/{id}` | ✅ | HR, ADMIN |
| GET | `/applications/{id}` | ✅ | HR, ADMIN |
| GET | `/applications/job/{jobId}` | ✅ | HR, ADMIN |
| PATCH | `/applications/{id}/stage` | ✅ | HR, ADMIN |
| GET | `/candidate/profile` | ✅ | CANDIDATE |
| POST | `/candidate/profile` | ✅ | CANDIDATE |
| PUT | `/candidate/profile` | ✅ | CANDIDATE |
| GET | `/candidate/profile/educations` | ✅ | CANDIDATE |
| POST | `/candidate/profile/educations` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/educations/{id}` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/educations/{id}` | ✅ | CANDIDATE |
| GET | `/candidate/profile/experiences` | ✅ | CANDIDATE |
| POST | `/candidate/profile/experiences` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/experiences/{id}` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/experiences/{id}` | ✅ | CANDIDATE |
| GET | `/candidate/profile/projects` | ✅ | CANDIDATE |
| POST | `/candidate/profile/projects` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/projects/{id}` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/projects/{id}` | ✅ | CANDIDATE |
| GET | `/candidate/profile/skills` | ✅ | CANDIDATE |
| POST | `/candidate/profile/skills` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/skills/{id}` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/skills/{id}` | ✅ | CANDIDATE |
| POST | `/candidate/profile/cv-files` | ✅ | CANDIDATE |
| GET | `/candidate/profile/cv-files` | ✅ | CANDIDATE |
| GET | `/candidate/profile/cv-files/{id}` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/cv-files/{id}/primary` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/cv-files/{id}` | ✅ | CANDIDATE |
| GET | `/candidate/profile/cv-files/{id}/download` | ✅ | CANDIDATE |
| POST | `/candidate/profile/cv-builder` | ✅ | CANDIDATE |
| GET | `/candidate/profile/cv-builder` | ✅ | CANDIDATE |
| GET | `/candidate/profile/cv-builder/{id}` | ✅ | CANDIDATE |
| PUT | `/candidate/profile/cv-builder/{id}` | ✅ | CANDIDATE |
| DELETE | `/candidate/profile/cv-builder/{id}` | ✅ | CANDIDATE |
| POST | `/interviews` | ✅ | HR, ADMIN |
| GET | `/interviews?applicationId=` | ✅ | HR, ADMIN |
| PUT | `/interviews/{id}` | ✅ | HR, ADMIN |
| PATCH | `/interviews/{id}/cancel` | ✅ | HR, ADMIN |
| PATCH | `/interviews/{id}/feedback` | ✅ | HR, ADMIN |
| GET | `/notifications` | ✅ | Any |
| GET | `/notifications/unread-count` | ✅ | Any |
| PATCH | `/notifications/{id}/read` | ✅ | Any |
| PATCH | `/notifications/read-all` | ✅ | Any |
| GET | `/admin/dashboard` | ✅ | ADMIN |
| GET | `/dashboard/hr` | ✅ | HR |
| GET | `/dashboard/hr/jobs/{jobId}` | ✅ | HR |
| GET | `/admin/reports/applications/csv` | ✅ | ADMIN |
| GET | `/admin/reports/jobs/csv` | ✅ | ADMIN |
| GET | `/dashboard/reports/applications/csv` | ✅ | HR |
| GET | `/dashboard/reports/jobs/csv` | ✅ | HR |
