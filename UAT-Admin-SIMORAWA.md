# UAT Khusus Role: Admin — SIMORAWA

## Lingkungan Pengujian

- Perangkat: Laptop/PC, browser Chrome/Edge/Firefox
- URL: `http://localhost:5173`
- Akun Admin: email & password yang terdaftar di database

---

## 4.7 Skenario & Kasus Uji

### 4.7.1 FR-01: Login

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-01 | FR-01 | Login dengan akun Admin valid | 1. Buka `http://localhost:5173`<br>2. Input email Admin yang terdaftar<br>3. Input password yang benar<br>4. Klik **Login** | Masuk ke halaman Dashboard. Nama user tampil di pojok kanan atas. | | |
| UAT-AD-02 | FR-01 | Login dengan password salah | 1. Input email Admin yang valid<br>2. Input password yang salah<br>3. Klik **Login** | Tetap di halaman login. Muncul pesan error. | | |
| UAT-AD-03 | FR-01 | Login dengan email tidak terdaftar | 1. Input email `tidakada@test.com`<br>2. Input password apapun<br>3. Klik **Login** | Tetap di halaman login. Muncul pesan error. | | |
| UAT-AD-04 | FR-01, NFR-02 | Akses dashboard tanpa login | 1. Buka `http://localhost:5173/dashboard` langsung tanpa login | Redirect ke halaman login. | | |
| UAT-AD-05 | FR-01 | Logout | 1. Klik nama user di pojok kanan atas<br>2. Klik **Keluar** | Kembali ke halaman login. Token terhapus. | | |

### 4.7.2 FR-02: Kelola Pengguna (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-06 | FR-02 | Lihat daftar pengguna | 1. Login sebagai Admin<br>2. Klik menu **Pengguna** di sidebar | Tabel menampilkan semua user: nama, email, role, status (aktif/nonaktif). | | |
| UAT-AD-07 | FR-02 | Tambah pengguna baru | 1. Klik **+ Tambah User**<br>2. Isi nama, email baru, role (pilih dari dropdown), password min 12 karakter<br>3. Klik **OK** | Modal tertutup. User baru muncul di tabel. | | |
| UAT-AD-08 | FR-02 | Tambah user dengan data tidak lengkap | 1. Klik **+ Tambah User**<br>2. Kosongkan field nama atau email atau password (kurang dari 12)<br>3. Klik **OK** | Muncul warning: nama, email, dan password harus diisi dengan benar. | | |
| UAT-AD-09 | FR-02 | Edit data pengguna | 1. Klik tombol **Edit** pada baris user tertentu<br>2. Ubah nama<br>3. Klik **OK** | Modal tertutup. Nama user berubah di tabel. | | |
| UAT-AD-10 | FR-02 | Ubah role pengguna | 1. Klik **Edit** pada user<br>2. Ubah role dari dropdown<br>3. Klik **OK** | Role user berubah di tabel. | | |
| UAT-AD-11 | FR-02 | Nonaktifkan pengguna aktif | 1. Klik **Nonaktifkan** pada user yang statusnya aktif<br>2. Konfirmasi di popconfirm | Status user berubah menjadi merah "Nonaktif". | | |
| UAT-AD-12 | FR-02, NFR-02 | User nonaktif tidak bisa login | 1. Ambil email user yang baru dinonaktifkan<br>2. Login dengan email & password tersebut | Login ditolak. Tetap di halaman login. Muncul pesan error. | | |
| UAT-AD-13 | FR-02 | Aktifkan kembali user | 1. Klik **Aktifkan** pada user nonaktif<br>2. Konfirmasi | Status user berubah hijau "Aktif". | | |
| UAT-AD-14 | FR-02, NFR-02 | Input email duplikat saat tambah user | 1. Klik **+ Tambah User**<br>2. Input email yang sudah terdaftar di sistem<br>3. Klik **OK** | Muncul error "Email already exists". User tidak ditambahkan. | | |
| UAT-AD-15 | FR-02 | Login dengan role yang baru dibuat | 1. Tambah user baru (role: Kadiv, misalnya)<br>2. Login dengan akun tersebut | Berhasil login. Sidebar menampilkan menu sesuai role Kadiv (tanpa menu Pengguna & Keuangan). | | |

### 4.7.3 FR-03: Kelola Program Kerja (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-16 | FR-03 | Lihat daftar program kerja | 1. Klik menu **Program Kerja** di sidebar | Tabel menampilkan semua proker: nama, status, PIC, deadline. | | |
| UAT-AD-17 | FR-03 | Buat program kerja baru | 1. Klik **+ Buat Program Kerja**<br>2. Isi nama proker, deskripsi<br>3. Pilih PIC dari dropdown<br>4. Pilih deadline (date picker)<br>5. Klik **Simpan** | Halaman kembali ke daftar. Proker baru muncul di tabel dengan status **NOT_STARTED**. | | |
| UAT-AD-18 | FR-03 | Buat proker tanpa mengisi nama | 1. Klik **+ Buat Program Kerja**<br>2. Kosongkan field nama<br>3. Klik **Simpan** | Muncul warning: "Nama harus diisi". | | |
| UAT-AD-19 | FR-03 | Edit program kerja | 1. Buka detail proker<br>2. Klik **Edit**<br>3. Ubah nama dan deskripsi<br>4. Klik **Simpan** | Data proker berubah sesuai input baru. | | |
| UAT-AD-20 | FR-03 | Ubah status proker (dropdown) | 1. Di tabel proker, klik dropdown status pada proker tertentu<br>2. Ubah ke **IN_PROGRESS** | Status berubah. Warna tag berubah sesuai status. | | |
| UAT-AD-21 | FR-03 | Ubah status proker ke COMPLETED | 1. Ubah status ke **COMPLETED** | Status berubah hijau "COMPLETED". | | |
| UAT-AD-22 | FR-03 | Hapus program kerja | 1. Klik **Delete** pada proker tertentu<br>2. Konfirmasi hapus | Proker hilang dari daftar. | | |
| UAT-AD-23 | FR-03 | Lihat detail program kerja | 1. Klik nama proker di tabel | Halaman detail menampilkan: info proker, PIC, laporan progres, dokumen, tombol LPJ. | | |
| UAT-AD-24 | FR-04 | Assign PIC ke proker | 1. Buat/Edit proker<br>2. Pilih PIC dari dropdown<br>3. Simpan | Proker terhubung dengan PIC. Nama PIC tampil di detail proker. | | |
| UAT-AD-25 | FR-04 | Ganti PIC proker | 1. Edit proker yang sudah punya PIC<br>2. Pilih PIC berbeda<br>3. Simpan | PIC berubah ke yang baru. | | |

### 4.7.4 FR-05: Upload Dokumen (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-26 | FR-05 | Upload dokumen PDF ke proker | 1. Buka detail proker<br>2. Klik **+ Upload Dokumen**<br>3. Pilih file PDF<br>4. Upload | File muncul di tabel dokumen: nama file, tipe, ukuran. | | |
| UAT-AD-27 | FR-05 | Upload gambar JPG/PNG | 1. Buka detail proker<br>2. Upload file JPG atau PNG | File muncul di tabel dokumen. | | |
| UAT-AD-28 | FR-05 | Download template KAK | 1. Di detail proker<br>2. Klik **Download Template KAK** | File PDF template KAK terdownload ke komputer. | | |

### 4.7.5 FR-06: Monitoring Program Kerja (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-29 | FR-06 | Lihat dashboard monitoring | 1. Buka **Dashboard** di sidebar | Statistik tampil: total proker, jumlah per status, total anggaran, total evaluasi. | | |
| UAT-AD-30 | FR-06 | Dashboard update setelah tambah proker | 1. Catat angka total proker di dashboard<br>2. Buat proker baru<br>3. Kembali ke dashboard | Angka total proker bertambah 1. | | |
| UAT-AD-31 | FR-06 | Lihat laporan progres di detail proker | 1. Buka detail proker<br>2. Lihat tabel **Laporan Progres** | Tabel menampilkan: progres (%), deskripsi, kendala, waktu. | | |

### 4.7.6 FR-09: Notifikasi (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-32 | FR-09 | Lihat panel notifikasi | 1. Klik ikon lonceng di pojok kanan atas | Panel dropdown terbuka. Daftar notifikasi tampil. | | |
| UAT-AD-33 | FR-09 | Badge jumlah notifikasi | 1. Pastikan ada notifikasi belum dibaca | Badge merah di lonceng menampilkan angka jumlah notif. | | |
| UAT-AD-34 | FR-09 | Tandai notifikasi sebagai sudah dibaca | 1. Klik salah satu notifikasi di panel | Notifikasi hilang dari panel. Badge berkurang 1. | | |
| UAT-AD-35 | FR-09 | Halaman notifikasi lengkap | 1. Klik **Lihat semua** di panel notifikasi | Halaman `/notifications` terbuka. Semua notifikasi tampil (sudah & belum dibaca). | | |

### 4.7.7 FR-10: Laporan & Export (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-36 | FR-10 | Lihat LPJ otomatis proker | 1. Buka detail proker<br>2. Klik tombol **LPJ** | Halaman LPJ terbuka. Tampilkan: info proker, rincian anggaran, realisasi kas, progres. | | |
| UAT-AD-37 | FR-10 | Export LPJ ke PDF | 1. Di halaman LPJ<br>2. Klik **Download PDF** | File PDF LPJ terdownload. Berisi informasi lengkap. | | |
| UAT-AD-38 | FR-10 | Export evaluasi ke Excel | 1. Buka halaman Evaluasi<br>2. Klik **Export XLSX** | File Excel evaluasi terdownload. | | |
| UAT-AD-39 | FR-10 | Export program kerja ke Excel | 1. Di halaman Program Kerja<br>2. Klik **Export XLSX** (jika tersedia) | File Excel berisi data proker terdownload. | | |

### 4.7.8 RBAC — Admin Tidak Boleh (Negative Test)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-40 | NFR-02 | Admin tidak bisa buat evaluasi | 1. Buka halaman Evaluasi (via URL `/evaluations/create`) | Akses ditolak (403 Forbidden). Tidak ada menu Evaluasi di sidebar. | | |
| UAT-AD-41 | NFR-02 | Admin tidak bisa akses anggaran | 1. Buka halaman Anggaran (via URL `/finance`) | Akses ditolak. Tidak ada menu Keuangan di sidebar. | | |
| UAT-AD-42 | NFR-02 | Admin tidak bisa catat kas | 1. Buka halaman Kas (via URL `/kas`) | Akses ditolak (403 Forbidden). | | |
| UAT-AD-43 | NFR-02 | Admin tidak bisa kirim laporan progres | 1. Buka detail proker<br>2. Coba kirim laporan progres | Akses ditolak (403 Forbidden). | | |

### 4.7.9 NFR-03: Usability (Admin)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-AD-44 | NFR-03 | Sidebar hanya tampilkan menu yang sesuai Admin | 1. Login sebagai Admin<br>2. Perhatikan menu sidebar | Menu tampil: Dashboard, Program Kerja, Evaluasi, Pengguna, Keuangan. | | |
| UAT-AD-45 | NFR-03 | Semua halaman dapat diakses tanpa error 500 | 1. Login Admin<br>2. Klik semua menu satu per satu | Semua halaman terbuka tanpa error. | | |

---

## 4.8 Rekapitulasi Hasil Pengujian

| Kategori | Total TC | Pass | Fail |
|----------|----------|------|------|
| FR-01: Login | 5 | | |
| FR-02: Kelola Pengguna | 10 | | |
| FR-03: Kelola Proker + PIC | 10 | | |
| FR-05: Dokumen | 3 | | |
| FR-06: Monitoring | 3 | | |
| FR-09: Notifikasi | 4 | | |
| FR-10: Laporan & Export | 4 | | |
| RBAC Negative Test | 4 | | |
| NFR-03: Usability | 2 | | |
| **Total** | **45** | | |

## 4.9 Temuan Isu/Defect

| No | Test Case ID | Temuan | Severity | Rekomendasi | Status |
|----|-------------|--------|----------|-------------|--------|
| | | | | | |
