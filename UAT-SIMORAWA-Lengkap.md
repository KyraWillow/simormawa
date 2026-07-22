# UAT SIMORAWA — Lengkap

---

## FR-01: Login

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-01 | FR-01 | Login Admin valid | 1. Buka `http://localhost:5173`<br>2. Input email & password Admin<br>3. Klik **Login** | Masuk ke Dashboard. Sidebar tampil: Dashboard, Program Kerja, Evaluasi, Pengguna, Keuangan. | | |
| UAT-02 | FR-01 | Login BPH valid | 1. Login dengan akun BPH | Masuk ke Dashboard. Sidebar tampil semua menu (Dashboard, Program Kerja, Evaluasi, Pengguna, Keuangan). | | |
| UAT-03 | FR-01 | Login Kadiv valid | 1. Login dengan akun Kadiv | Masuk ke Dashboard. Sidebar: Dashboard, Program Kerja, Evaluasi. Tidak ada Pengguna & Keuangan. | | |
| UAT-04 | FR-01 | Login Bendahara valid | 1. Login dengan akun Bendahara | Masuk ke Dashboard. Sidebar: Dashboard, Program Kerja, Keuangan. | | |
| UAT-05 | FR-01 | Login Sekretaris valid | 1. Login dengan akun Sekretaris | Masuk ke Dashboard. Sidebar: Dashboard, Program Kerja. | | |
| UAT-06 | FR-01 | Login PIC/Staff valid | 1. Login dengan akun PIC/Staff | Masuk ke Dashboard. Sidebar: Dashboard, Program Kerja. | | |
| UAT-07 | FR-01 | Login password salah | 1. Input email valid, password salah<br>2. Klik **Login** | Tetap di halaman login. Muncul pesan error. | | |
| UAT-08 | FR-01 | Login email tidak terdaftar | 1. Input email tidak dikenal<br>2. Klik **Login** | Tetap di halaman login. | | |
| UAT-09 | FR-01 | Logout | 1. Klik nama user pojok kanan<br>2. Klik **Keluar** | Kembali ke halaman login. | | |
| UAT-10 | FR-01, NFR-02 | Akses dashboard tanpa login | 1. Buka `/dashboard` langsung tanpa login | Redirect ke `/login`. | | |

---

## FR-02: Kelola Pengguna

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-11 | FR-02 | Lihat daftar pengguna | 1. Login Admin<br>2. Klik **Pengguna** | Tabel menampilkan semua user (nama, email, role, status). | | |
| UAT-12 | FR-02 | Tambah user baru | 1. Klik **+ Tambah User**<br>2. Isi nama, email, role, password (min 12)<br>3. **OK** | User baru muncul di tabel. | | |
| UAT-13 | FR-02 | Edit user | 1. Klik **Edit** pada baris<br>2. Ubah nama<br>3. **OK** | Nama berubah di tabel. | | |
| UAT-14 | FR-02 | Nonaktifkan user | 1. Klik **Nonaktifkan**<br>2. Konfirmasi | Status merah "Nonaktif". | | |
| UAT-15 | FR-02 | Aktifkan user | 1. Klik **Aktifkan**<br>2. Konfirmasi | Status hijau "Aktif". | | |
| UAT-16 | FR-02, NFR-02 | User nonaktif tidak bisa login | 1. Login dengan akun yang dinonaktifkan | Login ditolak. | | |
| UAT-17 | FR-02, NFR-02 | Email duplikat | 1. Tambah user dengan email yang sudah ada | Error "Email already exists". | | |

---

## FR-03 & FR-04: Program Kerja + Penugasan PIC

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-18 | FR-03 | Lihat daftar proker | 1. Login Admin/BPH/Kadiv<br>2. Klik **Program Kerja** | Tabel proker tampil. | | |
| UAT-19 | FR-03 | Buat proker baru | 1. Klik **+ Buat Program Kerja**<br>2. Isi nama, deskripsi, deadline<br>3. Pilih PIC<br>4. **Simpan** | Proker baru muncul. Status NOT_STARTED. | | |
| UAT-20 | FR-03 | Edit proker | 1. Detail proker → **Edit**<br>2. Ubah nama/deskripsi<br>3. **Simpan** | Data berubah. | | |
| UAT-21 | FR-03 | Ubah status proker | 1. Di tabel, ubah dropdown status ke IN_PROGRESS | Status berubah. Warna tag berubah. | | |
| UAT-22 | FR-03 | Hapus proker | 1. **Delete** → konfirmasi | Proker hilang. | | |
| UAT-23 | FR-03 | Lihat detail proker | 1. Klik nama proker | Halaman detail: info, progres, dokumen, tombol LPJ. | | |
| UAT-24 | FR-04 | Assign PIC | 1. Buat/Edit proker → pilih PIC<br>2. Simpan | Nama PIC tampil di detail. | | |
| UAT-25 | FR-04 | Ganti PIC | 1. Edit proker → pilih PIC lain<br>2. Simpan | PIC berubah. | | |

---

## FR-05: Upload Dokumen

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-26 | FR-05 | Upload dokumen PDF | 1. Detail proker → **+ Upload Dokumen**<br>2. Pilih file PDF | File muncul di tabel dokumen. | | |
| UAT-27 | FR-05 | Download template KAK | 1. Klik **Download Template KAK** | File PDF terdownload. | | |

---

## FR-06: Monitoring

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-28 | FR-06 | Dashboard monitoring | 1. Login BPH/Kadiv/Admin<br>2. Buka **Dashboard** | Statistik: total proker, by status, anggaran, evaluasi. | | |
| UAT-29 | FR-06 | Kirim laporan progres | 1. Detail proker → **+ Laporkan Progres**<br>2. Isi progres, deskripsi<br>3. **OK** | Laporan muncul di tabel. | | |
| UAT-30 | FR-06 | Lihat laporan progres | 1. Buka detail proker<br>2. Lihat tabel progres | Tabel: progres %, deskripsi, kendala, waktu. | | |

---

## FR-07: Evaluasi

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-31 | FR-07 | Buat evaluasi | 1. Buka **Evaluasi**<br>2. **+ Buat Evaluasi**<br>3. Pilih proker, evaluator, indikator<br>4. **OK** | Evaluasi muncul (draft). | | |
| UAT-32 | FR-07 | Submit evaluasi | 1. Buka evaluasi draft<br>2. Isi kesimpulan & rekomendasi<br>3. **Submit** | Status submitted. | | |
| UAT-33 | FR-07 | Dashboard evaluasi | 1. Buka **Evaluasi** | Statistik: total, submitted, draft, rata-rata skor. | | |
| UAT-34 | FR-07, FR-09 | Notifikasi evaluasi ke BPH | 1. Login Kadiv, submit evaluasi<br>2. Login BPH, cek lonceng | Notifikasi evaluasi baru muncul. | | |

---

## FR-08: Anggaran & Kas

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-35 | FR-08 | Buat anggaran baru | 1. Buka **Keuangan** > Anggaran<br>2. **+ Buat Anggaran**<br>3. Pilih proker, tambah item<br>4. **Simpan** | Anggaran muncul (draft). | | |
| UAT-36 | FR-08 | Submit anggaran | 1. **Submit** pada anggaran draft | Status submitted. | | |
| UAT-37 | FR-08 | Approve anggaran | 1. Buka anggaran submitted<br>2. **Approve** | Status approved. Notif terkirim. | | |
| UAT-38 | FR-08 | Tolak anggaran | 1. **Reject** | Status rejected. Notif terkirim. | | |
| UAT-39 | FR-08 | Dashboard keuangan | 1. Buka **Keuangan** | Ringkasan: total anggaran, approved, kas. | | |
| UAT-40 | FR-08 | Catat pemasukan kas | 1. Tab **Kas** → **+ Transaksi**<br>2. Pilih pemasukan, isi jumlah | Saldo bertambah. | | |
| UAT-41 | FR-08 | Catat pengeluaran kas | 1. Pilih pengeluaran, isi jumlah | Saldo berkurang. | | |

---

## FR-09: Notifikasi

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-42 | FR-09 | Panel notifikasi | 1. Login → klik lonceng | Panel dropdown daftar notifikasi. | | |
| UAT-43 | FR-09 | Badge notifikasi | 1. Ada notif belum dibaca | Badge merah jumlah notif. | | |
| UAT-44 | FR-09 | Mark as read | 1. Klik notifikasi | Notif hilang, badge berkurang. | | |

---

## FR-10: Laporan

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-45 | FR-10 | Lihat LPJ | 1. Detail proker → **LPJ** | Halaman LPJ: info, anggaran, realisasi, progres. | | |
| UAT-46 | FR-10 | Export LPJ PDF | 1. Klik **Download PDF** | File PDF terdownload. | | |
| UAT-47 | FR-10 | Export evaluasi XLSX | 1. Halaman Evaluasi → **Export XLSX** | File Excel terdownload. | | |

---

## RBAC & Keamanan

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------|
| UAT-48 | NFR-02 | PIC tidak bisa akses Keuangan | 1. Login PIC<br>2. Cek sidebar | Menu Keuangan tidak muncul. | | |
| UAT-49 | NFR-02 | PIC tidak bisa buat proker | 1. Buka `/work-programs/create` | 403 Forbidden. | | |
| UAT-50 | NFR-02 | Sekretaris tidak bisa Evaluasi | 1. Login Sekretaris<br>2. Cek sidebar | Menu Evaluasi tidak muncul. | | |
| UAT-51 | NFR-02 | Admin bisa akses semua menu | 1. Login Admin<br>2. Cek sidebar | Semua menu tampil. | | |
| UAT-52 | NFR-02 | Bendahara bisa akses Keuangan | 1. Login Bendahara<br>2. Cek sidebar | Menu Keuangan muncul. | | |

---

## Rekapitulasi

| Kategori | Total | Pass | Fail |
|----------|-------|------|------|
| Login (FR-01) | 10 | | |
| Pengguna (FR-02) | 7 | | |
| Proker + PIC (FR-03/04) | 8 | | |
| Dokumen (FR-05) | 2 | | |
| Monitoring (FR-06) | 3 | | |
| Evaluasi (FR-07) | 4 | | |
| Anggaran/Kas (FR-08) | 7 | | |
| Notifikasi (FR-09) | 3 | | |
| Laporan (FR-10) | 3 | | |
| RBAC | 5 | | |
| **Total** | **52** | | |

---

## Temuan Defect

| No | Test Case ID | Temuan | Severity | Rekomendasi | Status |
|----|-------------|--------|----------|-------------|--------|
| | | | | | |
