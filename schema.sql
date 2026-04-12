-- ============================================================
-- SmartHire Database Schema - MySQL (Student Project)
-- 22 tables
-- ============================================================

CREATE DATABASE IF NOT EXISTS smart_hire
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE smart_hire;

-- ============================================================
-- MODULE 0: CORE PLATFORM (Auth & RBAC)
-- ============================================================

CREATE TABLE users (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    email           VARCHAR(255)    NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    role            ENUM('CANDIDATE', 'HR', 'ADMIN') NOT NULL DEFAULT 'CANDIDATE',
    full_name       VARCHAR(150)    NOT NULL,
    phone           VARCHAR(20)     NULL,
    avatar_url      VARCHAR(500)    NULL,
    is_active       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    user_id         BIGINT          NOT NULL,
    token           VARCHAR(512)    NOT NULL,
    expires_at      DATETIME        NOT NULL,
    is_revoked      BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_refresh_tokens_token (token),
    INDEX idx_refresh_tokens_user_id (user_id),
    CONSTRAINT fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- MODULE 1: CANDIDATE PORTAL
-- ============================================================

CREATE TABLE candidate_profiles (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    user_id                 BIGINT          NOT NULL,
    headline                VARCHAR(255)    NULL,
    summary                 TEXT            NULL,
    date_of_birth           DATE            NULL,
    gender                  ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    address                 VARCHAR(500)    NULL,
    city                    VARCHAR(100)    NULL,
    years_of_experience     INT             NULL DEFAULT 0,
    job_level               ENUM('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER') NULL,
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_candidate_profiles_user (user_id),
    CONSTRAINT fk_candidate_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE candidate_educations (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    institution             VARCHAR(255)    NOT NULL,
    degree                  VARCHAR(100)    NULL,
    field_of_study          VARCHAR(255)    NULL,
    start_date              DATE            NULL,
    end_date                DATE            NULL,
    gpa                     DECIMAL(4,2)    NULL,
    description             TEXT            NULL,
    PRIMARY KEY (id),
    INDEX idx_candidate_educations_profile (candidate_profile_id),
    CONSTRAINT fk_candidate_educations_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE candidate_experiences (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    company_name            VARCHAR(255)    NOT NULL,
    title                   VARCHAR(255)    NOT NULL,
    start_date              DATE            NULL,
    end_date                DATE            NULL,
    is_current              BOOLEAN         NOT NULL DEFAULT FALSE,
    description             TEXT            NULL,
    PRIMARY KEY (id),
    INDEX idx_candidate_experiences_profile (candidate_profile_id),
    CONSTRAINT fk_candidate_experiences_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE candidate_skills (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    skill_name              VARCHAR(100)    NOT NULL,
    proficiency_level       ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NULL,
    PRIMARY KEY (id),
    INDEX idx_candidate_skills_profile (candidate_profile_id),
    CONSTRAINT fk_candidate_skills_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE candidate_projects (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    project_name            VARCHAR(255)    NOT NULL,
    description             TEXT            NULL,
    technologies            TEXT            NULL,
    PRIMARY KEY (id),
    INDEX idx_candidate_projects_profile (candidate_profile_id),
    CONSTRAINT fk_candidate_projects_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE cv_files (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    file_name               VARCHAR(255)    NOT NULL,
    file_path               VARCHAR(500)    NOT NULL,
    file_type               ENUM('PDF', 'DOCX')  NOT NULL,
    file_size               INT             NOT NULL COMMENT 'bytes',
    source                  ENUM('UPLOAD', 'BUILDER') NOT NULL DEFAULT 'UPLOAD',
    is_primary              BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_cv_files_profile (candidate_profile_id),
    CONSTRAINT fk_cv_files_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- CV Builder data
CREATE TABLE cv_builder_data (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    cv_file_id              BIGINT          NOT NULL,
    candidate_profile_id    BIGINT          NOT NULL,
    template_id             VARCHAR(50)     NULL,
    sections_data           JSON            NOT NULL COMMENT '{"profile":{}, "education":[], "experience":[], "skills":[], "projects":[]}',
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_cv_builder_cv_file (cv_file_id),
    INDEX idx_cv_builder_profile (candidate_profile_id),
    CONSTRAINT fk_cv_builder_cv_file FOREIGN KEY (cv_file_id) REFERENCES cv_files(id) ON DELETE CASCADE,
    CONSTRAINT fk_cv_builder_profile FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- MODULE 2: EMPLOYER / HR PORTAL
-- ============================================================

CREATE TABLE companies (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    name            VARCHAR(255)    NOT NULL,
    logo_url        VARCHAR(500)    NULL,
    website         VARCHAR(500)    NULL,
    industry        VARCHAR(150)    NULL,
    company_size    ENUM('STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE') NULL,
    description     TEXT            NULL,
    address         VARCHAR(500)    NULL,
    city            VARCHAR(100)    NULL,
    created_by      BIGINT          NOT NULL,
    is_verified     BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_companies_created_by (created_by),
    CONSTRAINT fk_companies_created_by FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE jobs (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    company_id      BIGINT          NOT NULL,
    created_by      BIGINT          NOT NULL,
    title           VARCHAR(255)    NOT NULL,
    description     TEXT            NOT NULL,
    requirements    TEXT            NULL,
    benefits        TEXT            NULL,
    job_type        ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP') NOT NULL DEFAULT 'FULL_TIME',
    job_level       ENUM('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER') NOT NULL DEFAULT 'MID',
    location        VARCHAR(255)    NULL,
    is_remote       BOOLEAN         NOT NULL DEFAULT FALSE,
    salary_min      DECIMAL(15,2)   NULL,
    salary_max      DECIMAL(15,2)   NULL,
    salary_currency VARCHAR(10)     NOT NULL DEFAULT 'VND',
    deadline        DATE            NULL,
    status          ENUM('DRAFT', 'OPEN', 'CLOSED') NOT NULL DEFAULT 'DRAFT',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_jobs_company (company_id),
    INDEX idx_jobs_status (status),
    FULLTEXT INDEX ft_jobs_search (title, description, requirements),
    CONSTRAINT fk_jobs_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_jobs_created_by FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE job_skills (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    job_id          BIGINT          NOT NULL,
    skill_name      VARCHAR(100)    NOT NULL,
    skill_type      ENUM('MUST_HAVE', 'NICE_TO_HAVE') NOT NULL DEFAULT 'MUST_HAVE',
    PRIMARY KEY (id),
    INDEX idx_job_skills_job (job_id),
    CONSTRAINT fk_job_skills_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE applications (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    job_id                  BIGINT          NOT NULL,
    candidate_profile_id    BIGINT          NOT NULL,
    cv_file_id              BIGINT          NOT NULL,
    stage                   ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED') NOT NULL DEFAULT 'APPLIED',
    applied_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_applications_job_candidate (job_id, candidate_profile_id),
    INDEX idx_applications_candidate (candidate_profile_id),
    INDEX idx_applications_stage (stage),
    CONSTRAINT fk_applications_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_candidate FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_applications_cv_file FOREIGN KEY (cv_file_id) REFERENCES cv_files(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE application_stage_history (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    application_id  BIGINT          NOT NULL,
    from_stage      ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED') NULL,
    to_stage        ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED') NOT NULL,
    changed_by      BIGINT          NOT NULL,
    note            TEXT            NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_stage_history_application (application_id),
    CONSTRAINT fk_stage_history_application FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    CONSTRAINT fk_stage_history_changed_by FOREIGN KEY (changed_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- Interview rooms 
CREATE TABLE interview_rooms (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    application_id  BIGINT          NOT NULL,
    created_by      BIGINT          NOT NULL,
    room_name       VARCHAR(255)    NOT NULL,
    room_code       VARCHAR(50)     NOT NULL COMMENT 'Unique code to join room',
    scheduled_at    DATETIME        NOT NULL,
    duration_minutes INT            NOT NULL DEFAULT 60,
    meeting_url     VARCHAR(500)    NULL COMMENT 'Generated meeting link',
    note            TEXT            NULL,
    status          ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_interview_rooms_code (room_code),
    INDEX idx_interview_rooms_application (application_id),
    INDEX idx_interview_rooms_status (status),
    CONSTRAINT fk_interview_rooms_application FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    CONSTRAINT fk_interview_rooms_created_by FOREIGN KEY (created_by) REFERENCES users(id)
) ENGINE=InnoDB;

-- ============================================================
-- MODULE 3: AI SERVICE
-- ============================================================

-- AI trích xuất CV (chức năng #4: AI phân tích CV)
CREATE TABLE ai_cv_parsed (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    cv_file_id      BIGINT          NOT NULL,
    parsed_data     JSON            NULL COMMENT '{"personal_info":{}, "education":[], "experience":[], "skills":[], "projects":[]}',
    status          ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    error_message   TEXT            NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_cv_parsed_cv_file (cv_file_id),
    INDEX idx_ai_cv_parsed_status (status),
    CONSTRAINT fk_ai_cv_parsed_cv_file FOREIGN KEY (cv_file_id) REFERENCES cv_files(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- AI CV-JD matching (FR-32)
-- NOTE: job_id is intentionally omitted here — it is accessible via application_id -> applications.job_id
-- Having a direct job_id FK would cause double-cascade conflict when a job is deleted
CREATE TABLE ai_match_results (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    application_id  BIGINT          NOT NULL,
    score_total     DECIMAL(5,2)    NOT NULL DEFAULT 0 COMMENT '0-100',
    score_breakdown JSON            NULL COMMENT '{"skills_match": 80, "exp_match": 70, "semantic_match": 85}',
    strengths       JSON            NULL,
    gaps            JSON            NULL,
    recommendations JSON            NULL,
    explanation     TEXT            NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_match_application (application_id),
    INDEX idx_ai_match_score (score_total),
    CONSTRAINT fk_ai_match_application FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- AI CV review (FR-33)
CREATE TABLE ai_cv_reviews (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    cv_file_id      BIGINT          NOT NULL,
    issues          JSON            NULL COMMENT 'format, keyword, logic issues',
    suggestions     JSON            NULL COMMENT 'rewrite suggestions per section',
    overall_rating  DECIMAL(5,2)    NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_ai_cv_reviews_cv_file (cv_file_id),
    CONSTRAINT fk_ai_cv_reviews_cv_file FOREIGN KEY (cv_file_id) REFERENCES cv_files(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- AI virtual interview (FR-34, FR-35)
CREATE TABLE ai_interview_sessions (
    id                      BIGINT          NOT NULL AUTO_INCREMENT,
    candidate_profile_id    BIGINT          NOT NULL,
    job_id                  BIGINT          NULL,
    cv_file_id              BIGINT          NULL COMMENT 'CV dùng để AI sinh câu hỏi phù hợp',
    status                  ENUM('IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'IN_PROGRESS',
    total_score             DECIMAL(5,2)    NULL,
    summary                 JSON            NULL COMMENT '{"strengths": [...], "weaknesses": [...], "recommendations": [...]}',
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at            DATETIME        NULL,
    PRIMARY KEY (id),
    INDEX idx_ai_interview_candidate (candidate_profile_id),
    CONSTRAINT fk_ai_interview_candidate FOREIGN KEY (candidate_profile_id) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_ai_interview_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL,
    CONSTRAINT fk_ai_interview_cv_file FOREIGN KEY (cv_file_id) REFERENCES cv_files(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE ai_interview_questions (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    session_id      BIGINT          NOT NULL,
    question_text   TEXT            NOT NULL,
    question_type   ENUM('TECHNICAL', 'BEHAVIORAL', 'SITUATIONAL') NOT NULL,
    display_order   INT             NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    INDEX idx_ai_questions_session (session_id),
    CONSTRAINT fk_ai_questions_session FOREIGN KEY (session_id) REFERENCES ai_interview_sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ai_interview_answers (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    question_id     BIGINT          NOT NULL,
    answer_text     TEXT            NOT NULL,
    score           DECIMAL(5,2)    NULL COMMENT '0-100',
    feedback        TEXT            NULL,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_ai_answers_question (question_id),
    CONSTRAINT fk_ai_answers_question FOREIGN KEY (question_id) REFERENCES ai_interview_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- MODULE 4: NOTIFICATION
-- ============================================================

CREATE TABLE notifications (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    user_id         BIGINT          NOT NULL,
    type            VARCHAR(100)    NOT NULL COMMENT 'application.new, stage.updated, etc.',
    title           VARCHAR(255)    NOT NULL,
    content         TEXT            NULL,
    reference_type  VARCHAR(50)     NULL COMMENT 'application, job, interview...',
    reference_id    BIGINT          NULL,
    is_read         BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_notifications_user (user_id, is_read),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
