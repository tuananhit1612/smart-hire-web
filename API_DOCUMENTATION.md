# SmartHire Backend – API Documentation

> **Base URL:** `http://localhost:8080`
>
> **Auth:** JWT Bearer token in `Authorization: Bearer <token>` header (unless marked 🔓 Public).
>
> **Response wrapper:** Every response uses the same envelope:
>
> ```json
> {
>   "success": true,
>   "code": "SUCCESS",
>   "message": "optional message",
>   "data": { ... },
>   "timestamp": "2025-01-01T00:00:00",   // only on errors
>   "errors": { "field": "message" }       // only on validation errors
> }
> ```

---

## Table of Contents

1. [Enums Reference](#1-enums-reference)
2. [Auth (`/api/auth`)](#2-auth)
3. [User Profile (`/api/users`)](#3-user-profile)
4. [Candidate Profile (`/api/candidate/profile`)](#4-candidate-profile)
5. [Candidate Education (`/api/candidate/profile/educations`)](#5-candidate-education)
6. [Candidate Experience (`/api/candidate/profile/experiences`)](#6-candidate-experience)
7. [Candidate Projects (`/api/candidate/profile/projects`)](#7-candidate-projects)
8. [Candidate Skills (`/api/candidate/profile/skills`)](#8-candidate-skills)
9. [CV File Management (`/api/candidate/profile/cv-files`)](#9-cv-file-management)
10. [Company (`/api/companies`)](#10-company)
11. [Job (`/api/jobs`)](#11-job)
12. [Public Jobs (`/api/jobs/public`)](#12-public-jobs)
13. [Application (`/api/applications`)](#13-application)
14. [Interview (`/api/interviews`)](#14-interview)
15. [Admin Dashboard (`/api/admin/dashboard`)](#15-admin-dashboard)

---

## 1. Enums Reference

| Enum | Values |
|---|---|
| `Role` | `CANDIDATE`, `HR`, `ADMIN` |
| `Gender` | `MALE`, `FEMALE`, `OTHER` |
| `JobType` | `FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERNSHIP` |
| `JobLevel` | `INTERN`, `JUNIOR`, `MID`, `SENIOR`, `LEAD`, `MANAGER` |
| `JobStatus` | `DRAFT`, `OPEN`, `CLOSED` |
| `ApplicationStage` | `APPLIED`, `SCREENING`, `INTERVIEW`, `OFFER`, `HIRED`, `REJECTED` |
| `InterviewStatus` | `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` |
| `CompanySize` | `STARTUP`, `SMALL`, `MEDIUM`, `LARGE`, `ENTERPRISE` |
| `SkillType` | `MUST_HAVE`, `NICE_TO_HAVE` |
| `CvFileType` | `PDF`, `DOCX` |
| `CvSource` | `UPLOAD`, `BUILDER` |
| `ProficiencyLevel` | `BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT` |

---

## 2. Auth

### POST `/api/auth/register`

🔓 Public

Register a new user.

**Request Body:**

```json
{
  "email": "string (required, valid email, max 255)",
  "password": "string (required, min 8)",
  "fullName": "string (required, max 150)",
  "role": "CANDIDATE | HR"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "Registration successful",
  "data": {
    "token": "jwt-string",
    "refreshToken": "refresh-jwt-string",
    "userId": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "CANDIDATE"
  }
}
```

---

### POST `/api/auth/login`

🔓 Public

**Request Body:**

```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Response:** `200 OK` — same `AuthResponse` shape as register.

---

### POST `/api/auth/refresh`

🔓 Public

**Request Body:**

```json
{
  "refreshToken": "string (required)"
}
```

**Response:** `200 OK` — same `AuthResponse` shape.

---

## 3. User Profile

> Requires authentication.

### GET `/api/users/me`

Get current user profile.

**Response:**

```json
{
  "data": {
    "id": 1,
    "email": "string",
    "fullName": "string",
    "phone": "string | null",
    "avatarUrl": "string | null",
    "role": "CANDIDATE | HR | ADMIN",
    "isActive": true,
    "createdAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### PUT `/api/users/me`

Update current user profile.

**Request Body:**

```json
{
  "fullName": "string (optional, max 150)",
  "phone": "string (optional, max 20)"
}
```

**Response:** Updated `UserProfileResponse`.

---

### POST `/api/users/me/avatar`

Upload avatar image.

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | `MultipartFile` | Image file |

**Response:** Updated `UserProfileResponse`.

---

## 4. Candidate Profile

> Requires `CANDIDATE` role.

### GET `/api/candidate/profile/me`

Get the current candidate's full profile.

**Response:**

```json
{
  "data": {
    "id": 1,
    "userId": 10,
    "fullName": "string",
    "email": "string",
    "phone": "string | null",
    "dateOfBirth": "YYYY-MM-DD | null",
    "gender": "MALE | FEMALE | OTHER | null",
    "address": "string | null",
    "bio": "string | null",
    "avatarUrl": "string | null",
    "educations": [ /* EducationDto[] */ ],
    "experiences": [ /* ExperienceDto[] */ ],
    "skills": [ /* SkillDto[] */ ],
    "projects": [ /* ProjectDto[] */ ],
    "cvFiles": [ /* CvFileDto[] */ ],
    "createdAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### PUT `/api/candidate/profile/me`

Update candidate profile.

**Request Body:**

```json
{
  "fullName": "string (optional, max 150)",
  "phone": "string (optional, max 20)",
  "dateOfBirth": "YYYY-MM-DD (optional)",
  "gender": "MALE | FEMALE | OTHER (optional)",
  "address": "string (optional, max 500)",
  "bio": "string (optional, max 2000)"
}
```

**Response:** Updated `CandidateProfileResponse`.

---

## 5. Candidate Education

> Requires `CANDIDATE` role.

### POST `/api/candidate/profile/educations`

**Request Body:**

```json
{
  "schoolName": "string (required, max 255)",
  "degree": "string (optional, max 255)",
  "fieldOfStudy": "string (optional, max 255)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional)",
  "description": "string (optional, max 1000)"
}
```

**Response:** `201 Created` — `CandidateProfileResponse` (full profile).

---

### PUT `/api/candidate/profile/educations/{id}`

**Path:** `id` — Education record ID.

**Request Body:** Same as create.

**Response:** Updated `CandidateProfileResponse`.

---

### DELETE `/api/candidate/profile/educations/{id}`

**Response:** Updated `CandidateProfileResponse`.

---

## 6. Candidate Experience

> Requires `CANDIDATE` role.

### POST `/api/candidate/profile/experiences`

**Request Body:**

```json
{
  "companyName": "string (required, max 255)",
  "position": "string (required, max 255)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional, null = currently working)",
  "description": "string (optional, max 2000)"
}
```

**Response:** `201 Created` — `CandidateProfileResponse`.

---

### PUT `/api/candidate/profile/experiences/{id}`

**Request Body:** Same as create.

**Response:** Updated `CandidateProfileResponse`.

---

### DELETE `/api/candidate/profile/experiences/{id}`

**Response:** Updated `CandidateProfileResponse`.

---

## 7. Candidate Projects

> Requires `CANDIDATE` role.

### POST `/api/candidate/profile/projects`

**Request Body:**

```json
{
  "projectName": "string (required, max 255)",
  "description": "string (optional, max 2000)",
  "url": "string (optional, max 500)",
  "startDate": "YYYY-MM-DD (optional)",
  "endDate": "YYYY-MM-DD (optional)"
}
```

**Response:** `201 Created` — `CandidateProfileResponse`.

---

### PUT `/api/candidate/profile/projects/{id}`

**Request Body:** Same as create.

**Response:** Updated `CandidateProfileResponse`.

---

### DELETE `/api/candidate/profile/projects/{id}`

**Response:** Updated `CandidateProfileResponse`.

---

## 8. Candidate Skills

> Requires `CANDIDATE` role.

### POST `/api/candidate/profile/skills`

**Request Body:**

```json
{
  "skillName": "string (required, max 100)",
  "proficiencyLevel": "BEGINNER | INTERMEDIATE | ADVANCED | EXPERT (required)"
}
```

**Response:** `201 Created` — `CandidateProfileResponse`.

---

### PUT `/api/candidate/profile/skills/{id}`

**Request Body:** Same as create.

**Response:** Updated `CandidateProfileResponse`.

---

### DELETE `/api/candidate/profile/skills/{id}`

**Response:** Updated `CandidateProfileResponse`.

---

## 9. CV File Management

> Requires `CANDIDATE` role.

### POST `/api/candidate/profile/cv-files`

Upload a CV file (PDF or DOCX). First upload is automatically set as primary.

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | `MultipartFile` | PDF or DOCX file |

**Response:** `201 Created`

```json
{
  "data": {
    "id": 1,
    "fileName": "resume.pdf",
    "fileType": "PDF | DOCX",
    "fileSize": 102400,
    "source": "UPLOAD | BUILDER",
    "isPrimary": true,
    "createdAt": "ISO datetime",
    "downloadUrl": "string"
  }
}
```

---

### GET `/api/candidate/profile/cv-files`

List all CV files of the current candidate (newest first).

**Response:** `CvFileResponse[]`

---

### GET `/api/candidate/profile/cv-files/{id}`

Get detail of a specific CV file.

**Response:** `CvFileResponse`

---

### PUT `/api/candidate/profile/cv-files/{id}/primary`

Set a CV as primary.

**Response:** Updated `CvFileResponse`.

---

### DELETE `/api/candidate/profile/cv-files/{id}`

Delete a CV file. **Cannot delete the primary CV.**

**Response:** `200 OK` — `data: null`

---

### GET `/api/candidate/profile/cv-files/{id}/download`

Download the CV file.

**Response:** Binary file stream (`application/octet-stream`), with `Content-Disposition: attachment`.

---

## 10. Company

> Requires authentication (typically `HR` role).

### POST `/api/companies`

Create a company.

**Request Body:**

```json
{
  "name": "string (required, max 255)",
  "description": "string (optional, max 2000)",
  "website": "string (optional, max 255)",
  "industry": "string (optional, max 255)",
  "companySize": "STARTUP | SMALL | MEDIUM | LARGE | ENTERPRISE (optional)",
  "address": "string (optional, max 500)",
  "contactEmail": "string (optional, valid email)",
  "contactPhone": "string (optional, max 20)"
}
```

**Response:** `201 Created`

```json
{
  "data": {
    "id": 1,
    "name": "string",
    "description": "string | null",
    "website": "string | null",
    "industry": "string | null",
    "companySize": "STARTUP | ... | ENTERPRISE | null",
    "address": "string | null",
    "contactEmail": "string | null",
    "contactPhone": "string | null",
    "logoUrl": "string | null",
    "ownerId": 10,
    "ownerName": "HR User",
    "createdAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### GET `/api/companies/{id}`

Get company by ID.

---

### GET `/api/companies`

List all companies.

---

### GET `/api/companies/my`

List companies owned by the current user.

---

### PUT `/api/companies/{id}`

Update a company.

**Request Body:** Same fields as create (all optional).

---

### POST `/api/companies/{id}/logo`

Upload company logo.

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | `MultipartFile` | Image file |

**Response:** Updated `CompanyResponse`.

---

### DELETE `/api/companies/{id}`

Delete a company.

**Response:** `data: null`

---

## 11. Job

> Requires authentication (typically `HR` role).

### POST `/api/jobs`

Create a job posting.

**Request Body:**

```json
{
  "companyId": 1,
  "title": "string (required, max 255)",
  "description": "string (optional)",
  "requirements": "string (optional)",
  "benefits": "string (optional)",
  "jobType": "FULL_TIME | PART_TIME | CONTRACT | INTERNSHIP (required)",
  "jobLevel": "INTERN | JUNIOR | MID | SENIOR | LEAD | MANAGER (required)",
  "location": "string (optional, max 255)",
  "isRemote": false,
  "salaryMin": 1000.00,
  "salaryMax": 2000.00,
  "salaryCurrency": "string (optional, max 10, default: VND)",
  "deadline": "YYYY-MM-DD (optional)",
  "skills": [
    {
      "skillName": "string (required)",
      "skillType": "MUST_HAVE | NICE_TO_HAVE (required)"
    }
  ]
}
```

**Response:** `201 Created`

```json
{
  "data": {
    "id": 1,
    "companyId": 1,
    "companyName": "string",
    "companyLogoUrl": "string | null",
    "createdBy": 10,
    "title": "string",
    "description": "string | null",
    "requirements": "string | null",
    "benefits": "string | null",
    "jobType": "FULL_TIME",
    "jobLevel": "SENIOR",
    "location": "string | null",
    "isRemote": false,
    "salaryMin": 1000.00,
    "salaryMax": 2000.00,
    "salaryCurrency": "VND",
    "deadline": "YYYY-MM-DD | null",
    "status": "DRAFT | OPEN | CLOSED",
    "skills": [
      { "skillName": "Java", "skillType": "MUST_HAVE" }
    ],
    "createdAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### GET `/api/jobs/{id}`

Get job by ID.

---

### GET `/api/jobs/my`

List jobs created by the current user.

---

### GET `/api/jobs/company/{companyId}`

List all jobs of a company.

---

### PUT `/api/jobs/{id}`

Update a job.

**Request Body:** Same fields as `CreateJobRequest` (all optional).

---

### PATCH `/api/jobs/{id}/status`

Change job status.

**Request Body:**

```json
{
  "status": "DRAFT | OPEN | CLOSED"
}
```

---

### DELETE `/api/jobs/{id}`

Delete a job.

**Response:** `data: null`

---

## 12. Public Jobs

🔓 Public (no auth required)

### GET `/api/jobs/public`

Search/filter open jobs.

**Query Parameters (all optional):**

| Param | Type | Description |
|---|---|---|
| `keyword` | `string` | Search in title/description |
| `location` | `string` | Filter by location |
| `jobLevel` | `string` | Enum: `INTERN`, `JUNIOR`, `MID`, `SENIOR`, `LEAD`, `MANAGER` |
| `jobType` | `string` | Enum: `FULL_TIME`, `PART_TIME`, `CONTRACT`, `INTERNSHIP` |
| `salaryMin` | `number` | Minimum salary |
| `salaryMax` | `number` | Maximum salary |

**Response:** `JobResponse[]`

---

### GET `/api/jobs/public/{id}`

Get public job detail.

**Response:** `JobResponse`

---

## 13. Application

> Requires authentication.

### GET `/api/applications/{id}`

Get application by ID.

**Response:**

```json
{
  "data": {
    "id": 1,
    "jobId": 5,
    "jobTitle": "string",
    "companyName": "string",
    "candidateId": 10,
    "candidateName": "string",
    "candidateEmail": "string",
    "stage": "APPLIED | SCREENING | INTERVIEW | OFFER | HIRED | REJECTED",
    "appliedAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### GET `/api/applications/job/{jobId}`

List applications for a specific job.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `stage` | `string` (optional) | Filter by `ApplicationStage` enum value |

**Response:** `ApplicationResponse[]`

---

### PATCH `/api/applications/{id}/stage`

Change application stage.

**Request Body:**

```json
{
  "stage": "APPLIED | SCREENING | INTERVIEW | OFFER | HIRED | REJECTED (required)"
}
```

**Response:** Updated `ApplicationResponse`.

---

## 14. Interview

> Requires authentication.

### POST `/api/interviews`

Schedule an interview.

**Request Body:**

```json
{
  "applicationId": 1,
  "interviewerName": "string (required, max 255)",
  "scheduledAt": "ISO datetime (required)",
  "durationMinutes": 60,
  "interviewType": "string (optional, max 100)",
  "location": "string (optional, max 500)",
  "meetingLink": "string (optional, max 500)",
  "notes": "string (optional, max 2000)"
}
```

**Response:** `201 Created`

```json
{
  "data": {
    "id": 1,
    "applicationId": 1,
    "jobTitle": "string",
    "candidateName": "string",
    "interviewerName": "string",
    "scheduledAt": "ISO datetime",
    "durationMinutes": 60,
    "interviewType": "string | null",
    "location": "string | null",
    "meetingLink": "string | null",
    "notes": "string | null",
    "status": "SCHEDULED | IN_PROGRESS | COMPLETED | CANCELLED",
    "feedback": "string | null",
    "rating": 0,
    "createdAt": "ISO datetime",
    "updatedAt": "ISO datetime"
  }
}
```

---

### GET `/api/interviews/{id}`

Get interview by ID.

---

### GET `/api/interviews/application/{applicationId}`

List interviews for an application.

---

### GET `/api/interviews/my`

List interviews of the current user.

---

### PUT `/api/interviews/{id}`

Update an interview.

**Request Body:**

```json
{
  "interviewerName": "string (optional, max 255)",
  "scheduledAt": "ISO datetime (optional)",
  "durationMinutes": 60,
  "interviewType": "string (optional, max 100)",
  "location": "string (optional, max 500)",
  "meetingLink": "string (optional, max 500)",
  "notes": "string (optional, max 2000)",
  "feedback": "string (optional, max 2000)",
  "rating": 5
}
```

---

### PATCH `/api/interviews/{id}/status`

Change interview status.

**Request Body:**

```json
{
  "status": "SCHEDULED | IN_PROGRESS | COMPLETED | CANCELLED"
}
```

---

### DELETE `/api/interviews/{id}`

Delete an interview.

**Response:** `data: null`

---

## 15. Admin Dashboard

> Requires `ADMIN` role.

### GET `/api/admin/dashboard/overview`

Get platform-wide statistics.

**Response:**

```json
{
  "data": {
    "totalUsers": 100,
    "totalCandidates": 70,
    "totalHrUsers": 25,
    "totalAdmins": 5,
    "activeUsers": 90,
    "inactiveUsers": 10,
    "totalJobs": 50,
    "openJobs": 30,
    "closedJobs": 15,
    "draftJobs": 5,
    "totalCompanies": 20,
    "totalApplications": 200,
    "stageFunnel": [
      { "stage": "APPLIED", "count": 100, "percentage": 50.0 },
      { "stage": "SCREENING", "count": 40, "percentage": 20.0 },
      { "stage": "INTERVIEW", "count": 30, "percentage": 15.0 },
      { "stage": "OFFER", "count": 15, "percentage": 7.5 },
      { "stage": "HIRED", "count": 10, "percentage": 5.0 },
      { "stage": "REJECTED", "count": 5, "percentage": 2.5 }
    ],
    "hireRate": 5.0,
    "rejectRate": 2.5
  }
}
```

---

## Error Responses

### Validation Error — `400 Bad Request`

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "timestamp": "ISO datetime",
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 8 characters"
  }
}
```

### Unauthorized — `401 Unauthorized`

```json
{
  "success": false,
  "code": "UNAUTHORIZED",
  "message": "Invalid or expired token",
  "timestamp": "ISO datetime"
}
```

### Not Found — `404 Not Found`

```json
{
  "success": false,
  "code": "NOT_FOUND",
  "message": "Resource not found",
  "timestamp": "ISO datetime"
}
```

### Conflict — `409 Conflict`

```json
{
  "success": false,
  "code": "CONFLICT",
  "message": "Email already registered",
  "timestamp": "ISO datetime"
}
```
