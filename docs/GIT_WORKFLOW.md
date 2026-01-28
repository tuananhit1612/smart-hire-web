# GIT WORKFLOW (GitHub + Jira)

## 1. Branch Model
- **main**: production/stable
- **develop**: development/integration

### Nhánh làm việc theo task Jira:

- **feature/\<TASK-ID>-\<short-description>**
- **fix/\<TASK-ID>-\<short-description>**
- **hotfix/\<TASK-ID>-\<short-description>**
- **chore/\<TASK-ID>-\<short-description>** (refactor, build, config)
- **docs/\<TASK-ID>-\<short-description>** (tài liệu)

### Quy tắc đặt tên branch
**Format:** `<type>/<TASK-ID>-<short-description>`
*   `short-description`: viết thường, dùng `-`, không dấu, ngắn gọn 3–6 từ.

**Ví dụ:**
- `feature/ATS-12-cv-upload`
- `feature/ATS-20-job-posting`
- `fix/ATS-31-application-status-bug`
- `hotfix/ATS-99-login-critical`
- `chore/ATS-10-update-docker-compose`

## 2. Quy trình làm việc chuẩn theo task Jira
**Step-by-step:**
1.  Dev kéo task trên Jira → trạng thái **In Progress**
2.  Tạo nhánh từ `develop`:
    ```bash
    git checkout develop
    git pull
    git checkout -b feature/ATS-12-cv-upload
    ```
3.  Dev code theo **DoD** + commit đúng **convention**
4.  Dev tự test local + đảm bảo build pass
5.  Push branch lên GitHub
6.  Tạo **Pull Request** → target `develop`
7.  Nhắn PM để review code + test
8.  PM review: request changes hoặc approve
9.  PM merge vào `develop`
10. Sau khi merge: xóa branch (Delete branch)
11. Dev chuyển task Jira → **Done**

**Rule:** Không push trực tiếp lên `main` / `develop` (chỉ merge qua PR).

## 3. Quy định Pull Request (PR)
**PR Title Format:** `[TASK-ID] <short summary>`
*   Ví dụ: `[ATS-12] Add CV upload & versioning`

## 4. COMMIT CONVENTION (Conventional Commits)
### 4.1. Format chuẩn
`<type>(<scope>): <message> [TASK-ID]`

-   **type**: loại thay đổi
-   **scope**: module/feature (auth, jobs, applications, ai, ws, ui…)
-   **message**: ngắn gọn, bắt đầu bằng động từ (add, update, fix…)
-   **[TASK-ID]**: bắt buộc để trace Jira

**Ví dụ chuẩn:**
- `feat(auth): add jwt login endpoint [ATS-01]`
- `feat(cv): implement cv upload & storage [ATS-12]`
- `fix(applications): prevent duplicate apply [ATS-31]`
- `refactor(jobs): split job service into query/command [ATS-40]`
- `chore(ci): add lint and test pipeline [ATS-05]`
- `docs(readme): update setup guide [ATS-06]`

### 4.2. Danh sách type dùng trong team
-   **feat**: thêm tính năng
-   **fix**: sửa lỗi
-   **hotfix**: sửa lỗi khẩn (thường vẫn dùng fix, nhưng branch hotfix)
-   **refactor**: chỉnh code không đổi behavior
-   **perf**: tối ưu hiệu năng
-   **test**: thêm/sửa test
-   **docs**: tài liệu
-   **style**: format, không đổi logic
-   **chore**: config/build/deps, việc lặt vặt

### 4.3. Scope gợi ý cho dự án tuyển dụng AI
`auth`, `users`, `companies`, `jobs`, `applications`, `cv`, `ai`, `notifications`, `ws`, `dashboard`, `admin`, `ui`, `api`

## 5. Hotfix workflow (chuẩn doanh nghiệp)
Khi lỗi nghiêm trọng trên production:
1.  Tạo nhánh từ `main`: `hotfix/ATS-99-login-critical`
2.  PR vào `main` → PM review/merge nhanh
3.  Tag release (nếu cần)
4.  Merge ngược `main` → `develop` để đồng bộ

## 6. Quy tắc “xóa branch”
-   Sau khi PR merge xong: **Delete branch**
-   Không reuse branch cũ cho task khác
