# 📘 Git - GitHub: Học Để Đi Làm

> **Giảng viên:** Thầy Nguyễn Hiếu Trung  
> **SĐT:** 0916009991  
> **Email:** trung.nh@hutech.edu.vn

---

## 📋 Mục Lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Cài đặt & Cấu hình ban đầu](#2-cài-đặt--cấu-hình-ban-đầu)
3. [Case 1 – Bạn là chủ dự án](#3-case-1--bạn-là-chủ-dự-án)
4. [Case 2 – Bạn là thành viên / nhân viên](#4-case-2--bạn-là-thành-viên--nhân-viên)
5. [Step 02 – Checkout nhánh mới](#5-step-02--checkout-nhánh-mới)
6. [Step 03 – Thay đổi & Commit code](#6-step-03--thay-đổi--commit-code)
7. [Step 04 – Push code lên GitHub](#7-step-04--push-code-lên-github)
8. [Step 05 – Review & Update commit](#8-step-05--review--update-commit)
9. [Step 06 – Merge Pull Request](#9-step-06--merge-pull-request)
10. [Xử lý Conflict](#10-xử-lý-conflict)
11. [Trường hợp dự án cá nhân (nhanh gọn)](#11-trường-hợp-dự-án-cá-nhân-nhanh-gọn)
12. [Các lệnh Git thường dùng (Tổng hợp)](#12-các-lệnh-git-thường-dùng-tổng-hợp)
13. [Lưu ý khi đi làm thực tế](#13-lưu-ý-khi-đi-làm-thực-tế)

---

## 1. Giới thiệu

Git là hệ thống quản lý phiên bản phân tán (Distributed Version Control System), giúp theo dõi mọi thay đổi trong mã nguồn. GitHub là nền tảng lưu trữ Git repository trên đám mây, hỗ trợ cộng tác nhóm thông qua các tính năng như Pull Request, Code Review, Issues...

Quy trình dưới đây mô tả **2 trường hợp chính** khi làm việc với Git & GitHub:

| Trường hợp | Mô tả |
|---|---|
| **Case 1** | Bạn là **chủ dự án** (owner) – tự tạo repo |
| **Case 2** | Bạn là **thành viên/nhân viên** – làm việc trên repo của người khác |

---

## 2. Cài đặt & Cấu hình ban đầu

### 2.1. Cài đặt Git

- Tải Git tại: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Cài đặt theo mặc định, nhấn **Next** liên tục

### 2.2. Cấu hình thông tin cá nhân

Mở **Git Bash** hoặc **Terminal** và chạy:

```bash
# Đặt tên người dùng
git config --global user.name "Tên của bạn"

# Đặt email (nên trùng với email GitHub)
git config --global user.email "email@example.com"

# Kiểm tra cấu hình
git config --list
```

### 2.3. Tạo tài khoản GitHub

- Truy cập [https://github.com](https://github.com) và đăng ký tài khoản

### 2.4. Kết nối SSH (khuyên dùng)

```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "email@example.com"

# Copy SSH key (Windows)
clip < ~/.ssh/id_ed25519.pub

# Copy SSH key (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy SSH key (Linux)
cat ~/.ssh/id_ed25519.pub
```

Sau đó vào **GitHub → Settings → SSH and GPG keys → New SSH key** → Dán key vào và lưu.

Kiểm tra kết nối:

```bash
ssh -T git@github.com
# Kết quả mong đợi: Hi username! You've successfully authenticated...
```

---

## 3. Case 1 – Bạn là chủ dự án

### Step 01: Khởi tạo dự án

Có **2 cách** để khởi tạo:

#### Cách A: Tạo repo trên GitHub trước, rồi clone về máy

```bash
# 1. Vào GitHub → nhấn "New repository"
# 2. Đặt tên repo, chọn Public/Private, tích "Add a README file" (tuỳ chọn)
# 3. Nhấn "Create repository"

# 4. Clone repo về máy
git clone git@github.com:username/ten-repo.git

# 5. Di chuyển vào thư mục dự án
cd ten-repo
```

#### Cách B: Tạo project ở máy trước, rồi push lên GitHub

```bash
# 1. Tạo thư mục dự án
mkdir ten-du-an
cd ten-du-an

# 2. Khởi tạo Git
git init

# 3. Tạo file ban đầu (ví dụ README)
echo "# Tên Dự Án" > README.md

# 4. Add và commit
git add .
git commit -m "Initial commit"

# 5. Vào GitHub tạo repo mới (KHÔNG tích "Add a README file")

# 6. Kết nối và push lên GitHub
git remote add origin git@github.com:username/ten-repo.git
git branch -M main
git push -u origin main
```

---

## 4. Case 2 – Bạn là thành viên / nhân viên

### Step 01: Khởi tạo dự án

```bash
# 1. Vào repo gốc của công ty/nhóm trên GitHub → nhấn nút "Fork"
#    → Repo sẽ được sao chép sang GitHub cá nhân của bạn

# 2. Clone repo đã fork về máy
git clone git@github.com:username-cua-ban/ten-repo.git
cd ten-repo

# 3. Thêm remote trỏ tới repo gốc (upstream) của công ty
git remote add upstream git@github.com:username-cong-ty/ten-repo.git

# 4. Kiểm tra danh sách remote
git remote -v
# Kết quả mong đợi:
# origin    git@github.com:username-cua-ban/ten-repo.git (fetch)
# origin    git@github.com:username-cua-ban/ten-repo.git (push)
# upstream  git@github.com:username-cong-ty/ten-repo.git (fetch)
# upstream  git@github.com:username-cong-ty/ten-repo.git (push)
```

> **Giải thích:**
> - `origin` = repo của **bạn** (bản fork)
> - `upstream` = repo **gốc** của công ty/nhóm

### Cập nhật code mới nhất từ upstream

```bash
# Lấy code mới nhất từ repo gốc
git fetch upstream

# Chuyển về nhánh main
git checkout main

# Merge code mới vào main
git merge upstream/main

# Push lên fork của bạn
git push origin main
```

---

## 5. Step 02 – Checkout nhánh mới

> ⚠️ **KHÔNG BAO GIỜ code trực tiếp trên nhánh `main` (hoặc `master`)!**

Trước khi bắt đầu một tính năng mới, **luôn tạo nhánh mới** từ nhánh chính:

```bash
# Đảm bảo đang ở nhánh main và code mới nhất
git checkout main
git pull origin main

# Tạo và chuyển sang nhánh mới
git checkout -b ten-nhanh-moi

# Ví dụ:
git checkout -b feature/login-page
git checkout -b fix/bug-header
git checkout -b hotfix/security-patch
```

### Quy tắc đặt tên nhánh

| Tiền tố | Mục đích | Ví dụ |
|---|---|---|
| `feature/` | Tính năng mới | `feature/login-page` |
| `fix/` hoặc `bugfix/` | Sửa lỗi | `fix/button-color` |
| `hotfix/` | Sửa lỗi khẩn cấp trên production | `hotfix/security-patch` |
| `refactor/` | Tái cấu trúc code | `refactor/api-service` |
| `docs/` | Cập nhật tài liệu | `docs/readme-update` |

---

## 6. Step 03 – Thay đổi & Commit code

### 6.1. Thực hiện thay đổi

Mở editor (VS Code, IntelliJ...) và code tính năng mới.

### 6.2. Kiểm tra trạng thái

```bash
# Xem danh sách file đã thay đổi
git status

# Xem chi tiết thay đổi
git diff

# Xem thay đổi của file cụ thể
git diff ten-file.txt
```

### 6.3. Thêm file vào staging area

```bash
# Thêm tất cả file đã thay đổi
git add .

# Hoặc thêm từng file cụ thể
git add src/Login.java
git add src/Header.java
```

### 6.4. Tạo commit

```bash
git commit -m "Mô tả ngắn gọn thay đổi"

# Ví dụ:
git commit -m "feat: thêm trang đăng nhập"
git commit -m "fix: sửa lỗi hiển thị header trên mobile"
git commit -m "docs: cập nhật README"
```

### Quy tắc viết commit message (Conventional Commits)

| Tiền tố | Ý nghĩa |
|---|---|
| `feat:` | Thêm tính năng mới |
| `fix:` | Sửa lỗi |
| `docs:` | Cập nhật tài liệu |
| `style:` | Thay đổi format code (không ảnh hưởng logic) |
| `refactor:` | Tái cấu trúc code |
| `test:` | Thêm/sửa test |
| `chore:` | Công việc bảo trì (cấu hình, dependency...) |

---

## 7. Step 04 – Push code lên GitHub

### 7A. Nếu bạn là **chủ dự án** (Case 1)

```bash
# Push nhánh mới lên GitHub
git push origin ten-nhanh

# Ví dụ:
git push origin feature/login-page
```

Sau đó vào **GitHub**:
1. GitHub sẽ hiện banner gợi ý **"Compare & pull request"** → Nhấn vào
2. Hoặc vào tab **Pull requests → New pull request**
3. Chọn: `base: main` ← `compare: feature/login-page`
4. Viết tiêu đề và mô tả cho Pull Request
5. Nhấn **"Create pull request"**

### 7B. Nếu bạn là **thành viên/nhân viên** (Case 2)

```bash
# Push lên repo fork của bạn (origin)
git push origin ten-nhanh

# Ví dụ:
git push origin feature/login-page
```

Sau đó:
1. Vào **repo gốc** (upstream) trên GitHub
2. GitHub sẽ nhận biết nhánh mới từ fork của bạn
3. Nhấn **"Compare & pull request"**
4. Chọn: `base: main` (repo gốc) ← `compare: feature/login-page` (fork của bạn)
5. Viết tiêu đề và mô tả
6. Nhấn **"Create pull request"**

---

## 8. Step 05 – Review & Update commit

Sau khi tạo Pull Request, nếu reviewer yêu cầu chỉnh sửa:

### 8.1. Sửa code theo yêu cầu

```bash
# Sửa code trong editor...

# Add các file đã sửa
git add .
```

### 8.2. Amend commit (gộp vào commit trước)

> 💡 **Mục đích:** Giữ cho mỗi Pull Request chỉ có **1 commit duy nhất**, giúp lịch sử sạch sẽ.

```bash
# Gộp thay đổi mới vào commit cũ
git commit --amend --no-edit
# --no-edit: giữ nguyên commit message cũ

# Hoặc nếu muốn đổi commit message:
git commit --amend -m "feat: thêm trang đăng nhập (đã sửa theo review)"
```

### 8.3. Force push để cập nhật Pull Request

```bash
# Push đè lên nhánh cũ trên GitHub
git push --force origin ten-nhanh

# Ví dụ:
git push --force origin feature/login-page
```

> ⚠️ **Cảnh báo:** `--force` sẽ ghi đè lịch sử trên remote. **Chỉ dùng cho nhánh feature của bạn**, **KHÔNG BAO GIỜ** dùng trên `main`!

### 8.4. Lặp lại nếu cần

Nếu reviewer tiếp tục yêu cầu sửa → quay lại **Step 03** → sửa code → amend → force push.

---

## 9. Step 06 – Merge Pull Request

Khi Pull Request đã được **approved** (chấp nhận):

### 9.1. Merge trên GitHub

1. Vào Pull Request trên GitHub
2. Nhấn nút **"Merge pull request"**
3. Chọn kiểu merge:
   - **Create a merge commit** – Tạo commit merge (phổ biến nhất)
   - **Squash and merge** – Gộp tất cả commit thành 1
   - **Rebase and merge** – Rebase rồi merge
4. Nhấn **"Confirm merge"**
5. Tuỳ chọn: nhấn **"Delete branch"** để xóa nhánh trên GitHub

### 9.2. Cập nhật máy local

```bash
# Chuyển về nhánh main
git checkout main

# Pull code mới nhất (đã được merge)
git pull origin main

# Xóa nhánh cũ ở local
git branch -d feature/login-page

# Xóa nhánh cũ ở remote (nếu chưa xóa trên GitHub)
git push origin --delete feature/login-page
```

### 9.3. Bắt đầu tính năng mới

Quay lại **Step 02** → tạo nhánh mới → tiếp tục vòng lặp.

### Lưu ý về quyền Merge

| Môi trường | Ai được merge? |
|---|---|
| **Học ở trường** | Bạn tự review và merge (tự approve) |
| **Đi làm thực tế** | Cần **leader/senior** review & approve trước khi merge |

---

## 10. Xử lý Conflict

Conflict xảy ra khi **2 người cùng sửa 1 file** ở cùng vị trí. Git không biết giữ phiên bản nào nên yêu cầu bạn giải quyết thủ công.

### 10.1. Khi nào xảy ra Conflict?

- Khi `git pull` hoặc `git merge` hoặc `git rebase`
- Khi cả bạn và đồng nghiệp cùng sửa chung 1 dòng code

### 10.2. Dấu hiệu nhận biết Conflict

Mở file bị conflict sẽ thấy:

```
<<<<<<< HEAD
Code của bạn (hiện tại)
=======
Code từ nhánh khác (incoming)
>>>>>>> feature/other-branch
```

### 10.3. Cách xử lý

**Bước 1:** Mở file conflict, xóa hết các dấu `<<<<<<<`, `=======`, `>>>>>>>` và **giữ lại code đúng**:

```bash
# Trước khi sửa:
<<<<<<< HEAD
System.out.println("Hello");
=======
System.out.println("Xin chào");
>>>>>>> feature/vietnamese

# Sau khi sửa (giữ phiên bản phù hợp):
System.out.println("Xin chào");
```

**Bước 2:** Add file đã sửa:

```bash
git add .
```

**Bước 3:** Tiếp tục rebase (nếu đang rebase):

```bash
git rebase --continue
```

Hoặc tiếp tục merge (nếu đang merge):

```bash
git merge --continue
# hoặc
git commit
```

**Bước 4:** Amend commit và push lại:

```bash
git commit --amend --no-edit
git push --force origin ten-nhanh
```

### 10.4. Mẹo tránh Conflict

- **Pull code thường xuyên** từ nhánh `main`
- **Chia nhỏ task** để ít người cùng sửa 1 file
- **Giao tiếp với team** khi sửa file quan trọng

---

## 11. Trường hợp dự án cá nhân (nhanh gọn)

Nếu làm dự án cá nhân và muốn nhanh gọn, có thể **bỏ qua quy trình nhánh**:

```bash
# Sửa code xong → add → commit → push thẳng lên main
git add .
git commit -m "cập nhật tính năng XYZ"
git push origin main
```

> ⚠️ **Lưu ý:** Cách này **chỉ phù hợp khi làm 1 mình**. Khi làm nhóm, **bắt buộc** phải theo quy trình nhánh + Pull Request.

---

## 12. Các lệnh Git thường dùng (Tổng hợp)

### Cơ bản

| Lệnh | Mô tả |
|---|---|
| `git init` | Khởi tạo repo Git mới |
| `git clone <url>` | Clone repo từ remote |
| `git status` | Xem trạng thái file |
| `git add .` | Thêm tất cả file vào staging |
| `git commit -m "msg"` | Tạo commit |
| `git push origin <branch>` | Push code lên remote |
| `git pull origin <branch>` | Pull code từ remote |

### Nhánh (Branch)

| Lệnh | Mô tả |
|---|---|
| `git branch` | Liệt kê các nhánh local |
| `git branch -a` | Liệt kê tất cả nhánh (local + remote) |
| `git checkout -b <name>` | Tạo & chuyển sang nhánh mới |
| `git checkout <name>` | Chuyển sang nhánh đã có |
| `git branch -d <name>` | Xóa nhánh local |
| `git push origin --delete <name>` | Xóa nhánh remote |

### Nâng cao

| Lệnh | Mô tả |
|---|---|
| `git commit --amend` | Gộp thay đổi vào commit trước |
| `git push --force` | Push đè lên remote (cẩn thận!) |
| `git rebase <branch>` | Rebase nhánh hiện tại lên nhánh khác |
| `git merge <branch>` | Merge nhánh khác vào nhánh hiện tại |
| `git stash` | Lưu tạm thay đổi chưa commit |
| `git stash pop` | Khôi phục thay đổi đã stash |
| `git log --oneline` | Xem lịch sử commit (rút gọn) |
| `git diff` | Xem chi tiết thay đổi |
| `git remote -v` | Xem danh sách remote |
| `git fetch upstream` | Lấy code mới từ upstream |
| `git cherry-pick <commit-hash>` | Áp dụng 1 commit cụ thể vào nhánh hiện tại |
| `git merge --no-edit --no-ff` | Merge không tạo editor, luôn tạo merge commit |

---

## 13. Lưu ý khi đi làm thực tế

1. **Luôn tạo nhánh mới** cho mỗi tính năng/bug fix
2. **Không push thẳng lên `main`** – luôn qua Pull Request
3. **Viết commit message rõ ràng** theo chuẩn Conventional Commits
4. **Giữ Pull Request nhỏ gọn** – dễ review, ít conflict
5. **Pull code mới thường xuyên** để tránh conflict lớn
6. **Đọc kỹ code review** và sửa theo góp ý trước khi merge
7. **Không dùng `--force`** trên nhánh `main` hay nhánh chung
8. **Xóa nhánh cũ** sau khi đã merge để giữ repo sạch sẽ
9. **Giao tiếp với team** khi gặp conflict hoặc không chắc chắn

---

> 📌 **Tóm tắt quy trình:**  
> `Checkout nhánh mới` → `Code & Commit` → `Push & Tạo PR` → `Review & Amend (nếu cần)` → `Merge` → `Quay lại bước 1`

---

*Tài liệu được tạo dựa trên sơ đồ quy trình Git - GitHub của Thầy Nguyễn Hiếu Trung.*
