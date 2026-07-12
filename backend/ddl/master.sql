USE simormawa;

-- Users table

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('BPH', 'Kadiv', 'PIC/Staff', 'Bendahara', 'Sekretaris', 'Admin') NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role ON users (role);

--  Work Programs Table

DROP TABLE IF EXISTS work_programs;
CREATE TABLE work_programs (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD') NOT NULL DEFAULT 'NOT_STARTED',
    pic_id VARCHAR(36) NOT NULL,
    deadline DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_work_programs_pic_id ON work_programs (pic_id);
CREATE INDEX idx_work_programs_status ON work_programs (status);

-- FR-008: Dokumen pendukung proker
DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
    id VARCHAR(36) PRIMARY KEY,
    work_program_id VARCHAR(36) NOT NULL,
    uploaded_by VARCHAR(36) NOT NULL,
    type ENUM('laporan', 'foto', 'kak', 'lainnya') NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_program_id) REFERENCES work_programs(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
CREATE INDEX idx_documents_work_program ON documents (work_program_id);

--Evaluluation Table

-- FR-009: Form evaluasi per proker
DROP TABLE IF EXISTS evaluations;
CREATE TABLE evaluations (
    id VARCHAR(36) PRIMARY KEY,
    work_program_id VARCHAR(36) NOT NULL,
    evaluated_by VARCHAR(36) NOT NULL,
    kesimpulan TEXT,
    rekomendasi TEXT,
    status ENUM('draft', 'submitted') NOT NULL DEFAULT 'draft',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (work_program_id) REFERENCES work_programs(id),
    FOREIGN KEY (evaluated_by) REFERENCES users(id)
);
CREATE INDEX idx_evaluations_work_program ON evaluations (work_program_id);
CREATE INDEX idx_evaluations_evaluated_by ON evaluations (evaluated_by);

-- FR-009: Indikator KPI/KPA per evaluasi
DROP TABLE IF EXISTS evaluation_indicators;
CREATE TABLE evaluation_indicators (
    id VARCHAR(36) PRIMARY KEY,
    evaluation_id VARCHAR(36) NOT NULL,
    indicator_name VARCHAR(255) NOT NULL,
    target TEXT,
    realisasi TEXT,
    score INT CHECK(score >= 1 AND score <= 5),
    notes TEXT,
    FOREIGN KEY (evaluation_id) REFERENCES evaluations(id) ON DELETE CASCADE
);
CREATE INDEX idx_indicators_evaluation ON evaluation_indicators (evaluation_id);

-- Money Management and Report

-- FR-017: Pengajuan anggaran per proker
DROP TABLE IF EXISTS budgets;
CREATE TABLE budgets (
    id VARCHAR(36) PRIMARY KEY,
    work_program_id VARCHAR(36) NOT NULL,
    submitted_by VARCHAR(36) NOT NULL,
    status ENUM('draft', 'submitted', 'approved', 'rejected') NOT NULL DEFAULT 'draft',
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (work_program_id) REFERENCES work_programs(id),
    FOREIGN KEY (submitted_by) REFERENCES users(id)
);
CREATE INDEX idx_budgets_work_program ON budgets (work_program_id);
CREATE INDEX idx_budgets_status ON budgets (status);

-- FR-018: Rincian anggaran (RKA)
DROP TABLE IF EXISTS budget_items;
CREATE TABLE budget_items (
    id VARCHAR(36) PRIMARY KEY,
    budget_id VARCHAR(36) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit VARCHAR(50),
    unit_price DECIMAL(15,2) NOT NULL DEFAULT 0,
    total_price DECIMAL(15,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);
CREATE INDEX idx_budget_items_budget ON budget_items (budget_id);

-- FR-019: Posisi kas organisasi
DROP TABLE IF EXISTS kas;
CREATE TABLE kas (
    id VARCHAR(36) PRIMARY KEY,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- FR-019: Mutasi kas
DROP TABLE IF EXISTS kas_transactions;
CREATE TABLE kas_transactions (
    id VARCHAR(36) PRIMARY KEY,
    kas_id VARCHAR(36) NOT NULL,
    budget_id VARCHAR(36) DEFAULT NULL,
    type ENUM('pemasukan', 'pengeluaran') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) NOT NULL,
    FOREIGN KEY (kas_id) REFERENCES kas(id),
    FOREIGN KEY (budget_id) REFERENCES budgets(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);
CREATE INDEX idx_kas_transactions_kas ON kas_transactions (kas_id);
CREATE INDEX idx_kas_transactions_date ON kas_transactions (transaction_date);

-- FR-022: Laporan progres dari PIC
DROP TABLE IF EXISTS progress_reports;
CREATE TABLE progress_reports (
    id VARCHAR(36) PRIMARY KEY,
    work_program_id VARCHAR(36) NOT NULL,
    submitted_by VARCHAR(36) NOT NULL,
    progress_pct INT CHECK(progress_pct >= 0 AND progress_pct <= 100),
    description TEXT,
    obstacles TEXT,
    submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (work_program_id) REFERENCES work_programs(id),
    FOREIGN KEY (submitted_by) REFERENCES users(id)
);
CREATE INDEX idx_progress_reports_work_program ON progress_reports (work_program_id);


INSERT INTO kas (id, balance) VALUES (
    'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
    0
);
