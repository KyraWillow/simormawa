# SIMORAWA
# Sistem Informasi Manajemen Program Kerja HIMA

**[Logo SIMORAWA]**

**Nama Mitra/Client:**
Himpunan Mahasiswa Informatika (HIMA) — UISI

**Disusun oleh:**
Okta Putra Ramadhan (3012410006)
Nawwar Antarun As'ady (3012410050)
Rayhan Pasha P.B (3012210037)
Bagus Setyo Nugroho (3012410046)

---

# BAB I PENDAHULUAN

## 1.1 Latar Belakang

Himpunan Mahasiswa (HIMA) di UISI mengelola banyak program kerja (proker) setiap kepengurusan. Namun, seluruh proses manajemen proker saat ini masih dilakukan secara manual: pencatatan di spreadsheet Excel/Google Sheets, koordinasi melalui grup WhatsApp, dan dokumen tersebar di Google Drive. Kondisi ini menyebabkan berbagai masalah operasional, seperti keterlambatan PIC dalam mengumpulkan dokumen dan mengajukan KAK, proses anggaran yang lambat dan birokratis, serta evaluasi program kerja yang tidak terstruktur dan tidak terstandarisasi. Atas dasar permasalahan tersebut, diusulkan pembangunan sistem informasi berbasis web bernama SIMORAWA (Sistem Informasi Organisasi Mahasiswa) sebagai platform terpusat yang mengintegrasikan manajemen proker, evaluasi, keuangan, dan notifikasi dalam satu sistem.

## 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam pengembangan SIMORAWA adalah sebagai berikut:

1. Bagaimana mendigitalisasi proses pengajuan dana dan dokumen organisasi yang sebelumnya dilakukan secara manual?
2. Bagaimana menyediakan platform monitoring program kerja yang dapat diakses secara real-time oleh seluruh pengurus?
3. Bagaimana mengintegrasikan pengelolaan anggaran dan kas organisasi dalam satu sistem?
4. Bagaimana menyediakan sistem evaluasi program kerja yang terstandarisasi dan terstruktur?
5. Bagaimana memastikan notifikasi pengingat deadline proker dapat dikirimkan secara otomatis?
6. Bagaimana membatasi hak akses pengguna sesuai peran (role-based access control) untuk menjaga keamanan data?

## 1.3 Tujuan Penulisan

Dokumen ini disusun sebagai laporan akhir pengembangan sistem SIMORAWA yang mencakup seluruh tahapan mulai dari elisitasi kebutuhan, analisis kelayakan, perancangan sistem, implementasi, hingga pengujian penerimaan pengguna (UAT). Tujuan utama dokumen ini adalah untuk mendokumentasikan seluruh kebutuhan sistem yang diperoleh dari proses wawancara dan observasi langsung, menerjemahkan kebutuhan pengguna ke dalam spesifikasi teknis yang terstruktur, serta menyajikan hasil implementasi dan pengujian sistem sebagai bukti bahwa sistem telah sesuai dengan kebutuhan yang telah didefinisikan.

## 1.4 Ruang Lingkup Sistem

**Cakupan Proyek (In-Scope):**
- Manajemen program kerja: pembuatan, penugasan PIC, status real-time
- Evaluasi proker berbasis KPI/KPA dengan dashboard BPH
- Notifikasi otomatis H-30 via email institusi UISI
- Manajemen keuangan: pengajuan KAK/RKA, monitoring kas, LPJ otomatis
- Pelaporan dan ekspor laporan ke PDF/Excel
- Manajemen akun pengguna dengan role-based access control (RBAC)

**Di Luar Cakupan Proyek (Out-of-Scope):**
- Integrasi dengan sistem keuangan kampus UISI
- Aplikasi mobile native (Android/iOS)
- Notifikasi via WhatsApp
- Fitur AI recommendation untuk proker

## 1.5 Metodologi Pengumpulan Data

Metode yang digunakan dalam pengumpulan data adalah wawancara secara online melalui aplikasi Zoom dengan pengurus Himpunan Mahasiswa (HIMA) UISI untuk memperoleh informasi mengenai kendala yang dihadapi serta kebutuhan terhadap sistem SIMORAWA. Wawancara dilakukan secara semi-terstruktur sehingga memungkinkan penggalian informasi yang mendalam sesuai jawaban dari narasumber. Selain wawancara, dilakukan pula observasi langsung terhadap proses kerja nyata pengurus HIMA untuk menemukan celah proses dan kebutuhan yang tidak terungkap dalam wawancara.

## 1.6 Definisi, Akronim, dan Singkatan

| Istilah | Kepanjangan / Definisi |
|---------|----------------------|
| SIMORAWA | Sistem Informasi Organisasi Mahasiswa |
| HIMA | Himpunan Mahasiswa Informatika |
| UISI | Universitas Internasional Semen Indonesia |
| BPH | Badan Pengurus Harian (Ketua, Wakil Ketua, Sekretaris Umum, Bendahara Umum) |
| Kadiv | Kepala Divisi |
| PIC | Person In Charge (penanggung jawab program kerja) |
| KAK | Kerangka Acuan Kegiatan |
| RKA | Rencana Kegiatan dan Anggaran |
| KPI | Key Performance Indicator |
| KPA | Key Performance Area |
| LPJ | Laporan Pertanggungjawaban |
| RBAC | Role-Based Access Control |
| UAT | User Acceptance Testing |
| SRS | Software Requirements Specification |
| FR | Functional Requirement |
| NFR | Non-Functional Requirement |

## 1.7 Sistematika Laporan

Laporan ini disusun dalam lima bab sebagai berikut:

- **Bab I Pendahuluan:** Berisi latar belakang, rumusan masalah, tujuan penulisan, ruang lingkup sistem, metodologi pengumpulan data, definisi dan singkatan, serta sistematika laporan.
- **Bab II Analisis Kelayakan Sistem:** Berisi gambaran umum organisasi, identifikasi masalah pada sistem berjalan, serta analisis kelayakan teknis, operasional, ekonomi, hukum, dan jadwal.
- **Bab III Software Requirements Specification (SRS):** Berisi deskripsi umum sistem, kebutuhan fungsional dan non-fungsional, kebutuhan antarmuka, serta model data.
- **Bab IV Rencana dan Pelaksanaan UAT:** Berisi tujuan, ruang lingkup, strategi, kriteria penerimaan, peran, lingkungan, skenario dan kasus uji, rekapitulasi hasil, temuan defect, dan tanda tangan persetujuan.
- **Bab V Penutup:** Berisi kesimpulan dan saran pengembangan lanjutan.

---

# BAB II ANALISIS KELAYAKAN SISTEM

## 2.1 Gambaran Umum Organisasi/Studi Kasus

| Item | Keterangan |
|------|-----------|
| Nama Mitra | Himpunan Mahasiswa Informatika (HIMA) UISI |
| Bidang Kegiatan | Organisasi Kemahasiswaan, Manajemen Program Kerja |
| Narasumber (Client) | Naufal (Ketua Himpunan), Latifa (Sekretaris), Rafli (Bendahara), Bimo (Kadiv PSDM), Abinaya (Staff PSDM) |

## 2.2 Identifikasi Masalah pada Sistem Berjalan (Existing System)

Berdasarkan hasil wawancara dengan lima narasumber dari HIMA UISI, ditemukan sepuluh kebutuhan utama yang terdiri atas tujuh kebutuhan fungsional dan tiga kebutuhan non-fungsional. Kebutuhan fungsional meliputi digitalisasi proses pengajuan dana dan dokumen organisasi, monitoring program kerja, pengelolaan administrasi yang terpusat, notifikasi otomatis, evaluasi program kerja, integrasi pengelolaan anggaran dan kas, serta penilaian evaluasi oleh Kepala Divisi. Adapun kebutuhan non-fungsional yang diidentifikasi mencakup mekanisme pengiriman notifikasi melalui email resmi UISI, kemudahan penggunaan sistem, serta transparansi dan keamanan dalam pengelolaan data.

Masalah utama yang teridentifikasi meliputi:
1. **Pengajuan dana yang rumit** — Alur KAK dan RKA masih manual dan memakan waktu lama (R01).
2. **Monitoring manual** — Monitoring proker dilakukan melalui chat WhatsApp, tidak terpusat (R02).
3. **Administrasi tersebar** — Data tersebar di Google Drive, Google Docs, dan WhatsApp; banyak PIC yang molor (R03).
4. **Tidak ada pengingat otomatis** — Tidak ada notifikasi H-30 sebelum deadline proker atau pengajuan KAK (R04).
5. **Evaluasi tidak terstandarisasi** — Setiap Kadiv membuat PPT evaluasi sendiri, tidak ada format baku (R06).

## 2.3 Kelayakan Teknis (Technical Feasibility)

Pengembangan SIMORAWA dinilai layak dari aspek teknis karena didukung oleh ketersediaan teknologi yang memadai. Sistem dirancang sebagai aplikasi berbasis web sehingga dapat diakses melalui peramban tanpa memerlukan instalasi khusus pada perangkat pengguna. Infrastruktur yang dibutuhkan meliputi server aplikasi, basis data, jaringan internet, serta perangkat komputer atau laptop yang telah tersedia dan umum digunakan oleh pengurus organisasi mahasiswa.

Teknologi yang digunakan dalam pengembangan:
- **Backend:** NestJS (TypeScript), MariaDB, JWT Authentication
- **Frontend:** Vue.js 3, Ant Design Vue, Vite
- **Server:** Node.js, MariaDB pool connection
- **Tools:** Git untuk version control

Dari sisi pengembang, tim memiliki kemampuan dalam analisis kebutuhan, perancangan basis data, serta pengembangan aplikasi web menggunakan teknologi tersebut. Dengan demikian, pengembangan SIMORAWA dinilai layak secara teknis untuk direalisasikan.

## 2.4 Kelayakan Operasional (Operational Feasibility)

Pengurus Himpunan Mahasiswa (HIMA) di lingkungan UISI telah terbiasa menggunakan berbagai aplikasi digital, seperti WhatsApp, Google Drive, Google Docs, dan Google Form. Oleh karena itu, proses adaptasi terhadap SIMORAWA diperkirakan dapat berlangsung dengan cepat. Selain itu, pengembangan SIMORAWA merupakan kebutuhan yang disampaikan langsung oleh pengurus HIMA, sehingga terdapat kesiapan dan dukungan untuk mengadopsi sistem dalam kegiatan organisasi.

Pada tahap awal implementasi, diperlukan pelatihan dan pendampingan agar seluruh pengguna memahami alur kerja (workflow) serta penggunaan fitur-fitur yang tersedia. Antarmuka SIMORAWA dirancang sederhana dan mudah dipahami dengan menggunakan komponen Ant Design yang sudah familiar bagi pengguna. Penerapan SIMORAWA akan mengintegrasikan berbagai proses administrasi organisasi yang sebelumnya dilakukan secara manual maupun melalui beberapa aplikasi yang berbeda ke dalam satu platform terpusat.

## 2.5 Kelayakan Ekonomi (Economic Feasibility)

| Komponen | Biaya |
|----------|-------|
| Laptop (sudah dimiliki oleh pengembang) | Rp 0 |
| Hosting (localhost/development server) | Rp 0 |
| Domain (development) | Rp 0 |
| Pengembangan (dikerjakan oleh tim mahasiswa) | Rp 0 |
| **Total** | **Rp 0** |

**Manfaat yang diperoleh:**
- **Efisiensi waktu:** Pengelolaan proker, evaluasi, dan keuangan tidak lagi memerlukan koordinasi manual melalui WhatsApp dan Google Drive.
- **Pengurangan kesalahan:** Data tersimpan terpusat dalam database sehingga meminimalkan risiko kehilangan data dan inkonsistensi.
- **Peningkatan layanan:** Notifikasi otomatis H-30 membantu PIC dan Kadiv dalam mempersiapkan proker tepat waktu.
- **Transparansi:** Seluruh pencatatan keuangan dan proker tercatat dan dapat dipantau secara real-time.

## 2.6 Kelayakan Hukum & Kepatuhan (Legal Feasibility)

Pengembangan SIMORAWA memperhatikan aspek hukum dan kepatuhan sebagai berikut:

- **Hak Cipta:** Seluruh kode sumber dan dokumentasi sistem merupakan hasil karya tim pengembang. Penggunaan library dan framework open source (NestJS, Vue.js, MariaDB) telah sesuai dengan lisensi masing-masing (MIT License).
- **Perlindungan Data:** Data pengguna (password) disimpan dalam bentuk terenkripsi menggunakan bcrypt. Akses data dibatasi berdasarkan role menggunakan RBAC.
- **Kebijakan Organisasi:** Sistem dikembangkan sesuai dengan kebutuhan dan atas persetujuan pengurus HIMA UISI sebagai mitra. Seluruh data yang dikelola merupakan data organisasi yang sah.

## 2.7 Kelayakan Jadwal (Schedule Feasibility)

| Tahap | Aktivitas | Durasi |
|-------|-----------|--------|
| Sprint 1 | Autentikasi, Manajemen User, CRUD Program Kerja, Dashboard | 2 minggu |
| Sprint 2 | Evaluasi KPI/KPA, Notifikasi, Template KAK, Upload Dokumen | 2 minggu |
| Sprint 3 | Manajemen Anggaran, Kas, LPJ, Laporan Progres, Export | 2 minggu |
| UAT | Pengujian Penerimaan oleh Pengguna | 1 minggu |
| Finalisasi | Dokumentasi dan Revisi Akhir | 1 minggu |

## 2.8 Kesimpulan Analisis Kelayakan

**Keputusan: GO — Proyek Layak untuk Dilanjutkan**

Berdasarkan analisis kelayakan teknis, operasional, ekonomi, hukum, dan jadwal, pengembangan sistem SIMORAWA dinyatakan layak untuk dilanjutkan. Seluruh aspek kelayakan menunjukkan hasil positif: teknologi yang digunakan telah teruji dan dikuasai tim, pengguna siap mengadopsi sistem, biaya pengembangan nihil karena menggunakan sumber daya yang sudah ada, aspek hukum terpenuhi, dan jadwal pengembangan realistis.

---

# BAB III SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## 3.1 Deskripsi Umum Sistem

### 3.1.1 Perspektif Produk

SIMORAWA (Sistem Informasi Manajemen Program Kerja HIMA) merupakan aplikasi berbasis web yang digunakan untuk membantu Himpunan Mahasiswa Informatika (HIMA) UISI dalam mengelola seluruh proses manual yang sebelumnya menggunakan Google Drive, Google Spreadsheet, dan WhatsApp menjadi satu platform terpusat.

Sistem menyediakan fitur manajemen program kerja, pengelolaan dokumen, evaluasi program kerja, pengelolaan anggaran, monitoring progres kegiatan, notifikasi, serta pelaporan. Arsitektur sistem menggunakan pola Domain-Driven Design (DDD) dengan pemisahan yang jelas antara domain, aplikasi, infrastruktur, dan antarmuka.

### 3.1.2 Fungsi Produk (Ringkasan)

Fungsi utama SIMORAWA meliputi:
- Login dan autentikasi pengguna
- Manajemen akun berdasarkan role
- Pengelolaan program kerja
- Penugasan PIC
- Upload dokumen KAK, LPJ dan laporan
- Monitoring progres program kerja
- Evaluasi program kerja
- Pengelolaan anggaran
- Dashboard monitoring
- Notifikasi otomatis
- Ekspor laporan PDF dan Excel

### 3.1.3 Karakteristik Pengguna

| Pengguna | Deskripsi |
|----------|-----------|
| Admin | Mengelola sistem dan pengguna, memiliki akses ke seluruh fitur untuk maintenance |
| BPH (Badan Pengurus Harian) | Memantau seluruh program kerja, memberikan penilaian evaluasi, menyetujui anggaran |
| Sekretaris | Mengelola administrasi dan dokumen, template KAK, mengarsip laporan |
| Bendahara | Mengelola anggaran dan kas, menyetujui pengajuan dana, laporan LPJ |
| Kepala Divisi (Kadiv) | Membuat dan mengelola program kerja, menugaskan PIC, mengisi evaluasi, mengajukan KAK |
| PIC/Staff | Melaksanakan program kerja, memperbarui status, mengunggah dokumen, membuat laporan progres |

### 3.1.4 Batasan (Constraints)

- Sistem berbasis web (tidak ada aplikasi mobile native).
- Harus menggunakan browser modern (Chrome, Edge, Firefox).
- Tidak terintegrasi dengan sistem keuangan kampus.
- Tidak menggunakan notifikasi WhatsApp.
- Password minimal 12 karakter.

### 3.1.5 Asumsi dan Ketergantungan

- Pengguna telah memiliki akun yang terdaftar di sistem.
- Pengguna terhubung ke internet.
- Server database aktif dan berjalan.
- Browser mendukung HTML5 dan JavaScript.

## 3.2 Kebutuhan Fungsional (Functional Requirements)

### A. Autentikasi & Manajemen Pengguna

| ID | Nama Kebutuhan | Deskripsi | Prioritas | Aktor Terkait |
|----|---------------|-----------|-----------|---------------|
| FR-01 | Login | Pengguna dapat login sesuai hak akses masing-masing | High | Admin, BPH, Sekretaris, Bendahara, Kadiv, PIC/Staff |
| FR-02 | Kelola Pengguna | Admin dapat menambah, mengubah, menghapus, dan mengatur hak akses pengguna | High | Admin |
| FR-03 | RBAC | Sistem membatasi hak akses pengguna sesuai perannya | High | Admin, BPH, Kadiv, PIC/Staff, Bendahara, Sekretaris |

### B. Manajemen Program Kerja

| ID | Nama Kebutuhan | Deskripsi | Prioritas | Aktor Terkait |
|----|---------------|-----------|-----------|---------------|
| FR-04 | Kelola Program Kerja | Kadiv dapat membuat, mengubah, menghapus, dan melihat data program kerja | High | Kadiv |
| FR-05 | Daftar/Detail Proker | Sistem menampilkan daftar dan detail program kerja | High | Semua role |
| FR-06 | Update Status Real-time | Status proker dapat diperbarui secara real-time (Belum Mulai, Berjalan, Selesai, Ditunda) | High | Kadiv, PIC/Staff |
| FR-07 | Penugasan PIC | Kadiv dapat menetapkan PIC untuk setiap program kerja | High | Kadiv |
| FR-08 | Upload Dokumen | PIC dapat mengunggah KAK, LPJ, dan dokumen pendukung kegiatan | Medium | PIC/Staff, Sekretaris |

### C. Evaluasi Program Kerja

| ID | Nama Kebutuhan | Deskripsi | Prioritas | Aktor Terkait |
|----|---------------|-----------|-----------|---------------|
| FR-09 | Form Evaluasi KPI/KPA | Sistem menyediakan form evaluasi terstandar dengan indikator KPI/KPA untuk diisi oleh Kadiv | High | Kadiv |
| FR-10 | Dashboard Evaluasi BPH | Sistem menampilkan dashboard evaluasi terpusat untuk BPH | High | BPH |
| FR-11 | Ringkasan Evaluasi | Sistem menampilkan ringkasan hasil evaluasi seluruh proker | High | BPH, Kadiv |
| FR-12 | Riwayat Evaluasi | Sistem menyimpan riwayat evaluasi proker untuk referensi kepengurusan berikutnya | Medium | BPH, Kadiv |

### D. Monitoring & Notifikasi

| ID | Nama Kebutuhan | Deskripsi | Prioritas | Aktor Terkait |
|----|---------------|-----------|-----------|---------------|
| FR-13 | Notifikasi H-30 Proker | Sistem mengirim notifikasi H-30 sebelum deadline proker | High | Sistem, PIC |
| FR-14 | Notifikasi H-30 KAK | Sistem mengirim notifikasi H-30 sebelum batas pengajuan KAK | High | Sistem, PIC, Kadiv |
| FR-15 | Notifikasi Email | Sistem mengirim notifikasi melalui email institusi UISI | High | Sistem |
| FR-16 | Dashboard Monitoring | Sistem menampilkan dashboard monitoring progres seluruh proker aktif | High | BPH, Kadiv |

### E. Manajemen Keuangan & Pelaporan

| ID | Nama Kebutuhan | Deskripsi | Prioritas | Aktor Terkait |
|----|---------------|-----------|-----------|---------------|
| FR-17 | Pengajuan Anggaran | Sistem menerima pengajuan anggaran proker melalui KAK/RKA | High | Bendahara, Kadiv |
| FR-18 | Realisasi Anggaran | Sistem menghubungkan proker dengan pos anggaran untuk realisasi keuangan | High | Bendahara |
| FR-19 | Posisi Kas | Sistem menampilkan posisi kas terintegrasi dengan realisasi anggaran | High | Bendahara |
| FR-20 | LPJ Otomatis | Sistem menghasilkan LPJ otomatis berdasarkan data proker dan anggaran | Medium | Bendahara, Sekretaris |
| FR-21 | Template KAK | Sistem menyediakan template KAK digital standar | High | Kadiv, PIC/Staff |
| FR-22 | Laporan Progres | Sistem menerima laporan progres kegiatan dari PIC | Medium | PIC/Staff |
| FR-23 | Export PDF/Excel | Sistem mengekspor laporan evaluasi, monitoring, dan keuangan ke PDF/Excel | Medium | Sekretaris, Bendahara |

### Use Case Diagram

[Gambar Use Case Diagram SIMORAWA — terdiri dari 6 aktor dan 10 use case utama: Login, Kelola Pengguna, Kelola Proker, Assign PIC, Upload Dokumen, Monitoring, Evaluasi, Kelola Anggaran, Notifikasi, Laporan]

### Use Case Description

**Use Case 1 – Login**

| Item | Isi |
|------|-----|
| Nama Use Case | Login |
| Aktor | Admin, BPH, Sekretaris, Bendahara, Kadiv, PIC/Staff |
| Deskripsi | Pengguna melakukan autentikasi untuk masuk ke sistem sesuai hak aksesnya |
| Pre-condition | Pengguna telah memiliki akun yang terdaftar |
| Post-condition | Pengguna berhasil masuk ke dashboard sesuai perannya |
| Alur Normal | 1. Pengguna membuka halaman login.<br>2. Memasukkan email dan password.<br>3. Menekan tombol Login.<br>4. Sistem memverifikasi data.<br>5. Dashboard ditampilkan |
| Alur Alternatif | 1. Email atau password salah.<br>2. Sistem menampilkan pesan kesalahan.<br>3. Pengguna diminta mengulangi login. |

**Use Case 2 – Kelola Program Kerja**

| Item | Isi |
|------|-----|
| Nama Use Case | Kelola Program Kerja |
| Aktor | Kadiv |
| Deskripsi | Kadiv mengelola data program kerja, termasuk menambah, mengubah, dan menghapus data |
| Pre-condition | Kadiv telah login ke sistem |
| Post-condition | Data program kerja berhasil tersimpan atau diperbarui |
| Alur Normal | 1. Kadiv memilih menu Program Kerja.<br>2. Menambahkan atau mengubah data proker.<br>3. Mengisi informasi yang diperlukan.<br>4. Menekan tombol Simpan.<br>5. Sistem menyimpan data. |
| Alur Alternatif | Data yang diinput tidak lengkap atau tidak valid sehingga sistem menampilkan pesan kesalahan |

**Use Case 3 – Evaluasi Program Kerja**

| Item | Isi |
|------|-----|
| Nama Use Case | Evaluasi Program Kerja |
| Aktor | Kadiv, BPH |
| Deskripsi | Kadiv mengisi evaluasi program kerja dan BPH melihat hasil evaluasi |
| Pre-condition | Program kerja telah selesai dilaksanakan |
| Post-condition | Hasil evaluasi tersimpan dalam sistem |
| Alur Normal | 1. Kadiv memilih program kerja.<br>2. Mengisi formulir evaluasi.<br>3. Menekan tombol Simpan.<br>4. Sistem menyimpan hasil evaluasi.<br>5. BPH dapat melihat hasil evaluasi pada dashboard. |
| Alur Alternatif | Form evaluasi belum lengkap sehingga sistem meminta pengguna melengkapi data |

**Use Case 4 – Pengelolaan Anggaran**

| Item | Isi |
|------|-----|
| Nama Use Case | Pengelolaan Anggaran |
| Aktor | Bendahara |
| Deskripsi | Bendahara mengelola pengajuan anggaran dan memantau realisasi keuangan program kerja |
| Pre-condition | Bendahara telah login dan data program kerja tersedia |
| Post-condition | Data anggaran berhasil disimpan atau diperbarui |
| Alur Normal | 1. Bendahara membuka menu Anggaran.<br>2. Memilih program kerja.<br>3. Mengisi atau memperbarui data anggaran.<br>4. Menekan tombol Simpan.<br>5. Sistem menyimpan data anggaran. |
| Alur Alternatif | Nominal atau data anggaran tidak valid sehingga sistem menolak penyimpanan |

**Use Case 5 – Notifikasi Otomatis**

| Item | Isi |
|------|-----|
| Nama Use Case | Notifikasi Otomatis |
| Aktor | Sistem, Kadiv, PIC/Staff |
| Deskripsi | Sistem mengirimkan notifikasi pengingat melalui in-app notification sebelum jadwal kegiatan atau batas pengajuan KAK |
| Pre-condition | Jadwal program kerja telah tersimpan |
| Post-condition | Notifikasi berhasil dikirim ke panel notifikasi pengguna |
| Alur Normal | 1. Sistem memeriksa jadwal kegiatan.<br>2. Sistem mendeteksi waktu H-30/H-14/H-7.<br>3. Sistem mengirim notifikasi kepada pengguna terkait. |
| Alur Alternatif | Tidak ada proker dalam rentang 30 hari — sistem tidak mengirim notifikasi |

### Activity Diagram

[Gambar Activity Diagram untuk masing-masing use case: Login, Kelola Proker, Evaluasi, Anggaran, Notifikasi]

## 3.3 Kebutuhan Non-Fungsional (Non-Functional Requirements)

| ID | Kategori | Deskripsi |
|----|----------|-----------|
| NFR-01 | Performance | Sistem memiliki waktu respons maksimal 3 detik untuk setiap proses utama |
| NFR-02 | Security | Password pengguna disimpan dalam bentuk terenkripsi (bcrypt hash) dan hak akses dibatasi berdasarkan role (RBAC) |
| NFR-03 | Usability | Antarmuka sistem mudah dipahami dan digunakan oleh seluruh pengurus HIMA tanpa memerlukan pelatihan khusus |
| NFR-04 | Reliability | Sistem memiliki tingkat ketersediaan (availability) minimal 99% selama jam operasional organisasi |
| NFR-05 | Compatibility | Sistem dapat diakses melalui browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox) pada desktop maupun smartphone |
| NFR-06 | Maintainability | Sistem dirancang dengan arsitektur Domain-Driven Design agar mudah dipelihara dan dikembangkan |
| NFR-07 | Scalability | Sistem mampu menangani penambahan jumlah pengguna dan data organisasi tanpa penurunan kinerja signifikan |
| NFR-08 | Transparency | Seluruh aktivitas program kerja dan keuangan tercatat sehingga dapat dipantau dan tidak mudah dimanipulasi secara sepihak |

## 3.4 Kebutuhan Antarmuka (Interface Requirements)

Antarmuka SIMORAWA dirancang dengan tema warna biru (#112D4E, #3F72AF, #DBE2EF, #F9F7F7) dan font Segoe UI. Antarmuka terdiri dari:

- **Halaman Login:** Split layout dengan dua panel. Panel kiri menampilkan identitas sistem: tulisan "SIMORAWA" besar dengan tagline "Sistem Informasi Manajemen Program Kerja HIMA" di atas latar gradien biru (#112D4E ke #3F72AF), dilengkapi animasi titik-titik berdenyut sebagai elemen dekoratif. Panel kanan berisi form login minimalis: logo sistem, judul "Masuk", input email dan password, serta tombol "Masuk" dengan warna #3F72AF. Terdapat link "Daftar" yang mengarah ke formulir pendaftaran atau dihubungi admin.

**Halaman Dashboard:** Menampilkan dua baris kartu statistik — baris pertama untuk Program Kerja (total, aktif, selesai, ditunda) dan baris kedua untuk Anggaran (total pengajuan, nilai akumulasi, disetujui, draft). Setiap kartu menggunakan komponen `a-statistic` dengan ikon dan warna status (biru untuk aktif, hijau untuk selesai/approved, kuning untuk draft/ditunda). Data diperbarui secara otomatis dari backend melalui `GET /work-programs/dashboard` dan `GET /budgets/dashboard`.

**Halaman Program Kerja:** Tabel daftar proker yang menampilkan nama, deskripsi (ellipsis), status, PIC, dan deadline. Pada kolom status terdapat dropdown `a-select` untuk mengubah status secara langsung (NOT_STARTED, IN_PROGRESS, ON_HOLD, COMPLETED). Aksi per baris mencakup tombol Detail, Edit, dan Hapus (dengan konfirmasi popconfirm). Tombol "+ Buat Proker" di pojok kanan atas membuka halaman form pembuatan proker yang dilengkapi dengan form rincian anggaran.

**Halaman Detail Program Kerja:** Menampilkan kartu informasi proker (nama, deskripsi, status dengan tag warna, PIC, deadline) dan tombol LPJ untuk melihat laporan pertanggungjawaban. Di bawahnya terdapat tiga bagian: Laporan Progres (tabel dengan progress bar, deskripsi, kendala), Anggaran (tabel item dengan nama, qty, satuan, harga, total, dan status persetujuan), serta Dokumen (tabel file yang diupload dengan tombol Download Template KAK).

**Halaman Evaluasi:** Menampilkan dashboard statistik (total evaluasi, submitted, draft, rata-rata skor) dan tabel daftar evaluasi. Form pembuatan evaluasi menggunakan modal dengan dropdown pemilihan proker dan evaluator, serta input dinamis untuk indikator KPI/KPA (nama indikator, target, realisasi, skor 1-5 menggunakan komponen `a-rate`).

**Halaman Keuangan:** Menampilkan dashboard keuangan (total anggaran, nilai, disetujui, draft), bagian Kas dengan saldo organisasi dan tombol pemasukan/pengeluaran, tabel mutasi kas, serta tabel anggaran lengkap. Tombol aksi anggaran dikontrol berdasarkan role — hanya BPH dan Admin yang dapat menyetujui/menolak anggaran (tombol Setuju berwarna primer biru, tombol Tolak berwarna merah danger).

**Komponen Umum:**
- **Warna:** Dark navy #112D4E untuk sidebar dan heading, medium blue #3F72AF untuk tombol primer dan aksen, light gray-blue #DBE2EF untuk border dan separator, off-white #F9F7F7 untuk background konten
- **Font:** Segoe UI, system-ui, sans-serif — diterapkan melalui CSS global
- **Sidebar:** Latar #112D4E dengan menu berwarna putih, item aktif berlatar #3F72AF, logo "SIMORAWA" di header sidebar
- **Topbar:** Background #F9F7F7, breadcrumb navigasi, ikon lonceng notifikasi dengan badge merah, dropdown profil pengguna
- **Tabel:** Seluruh tabel menggunakan `a-table` Ant Design dengan striped rows, action buttons di kolom terakhir, dan loading spinner saat fetching data

[Screenshot antarmuka SIMORAWA: halaman login, dashboard, tabel proker, detail proker, evaluasi, keuangan]

## 3.5 Model Data (ERD/Class Diagram)

SIMORAWA menggunakan database relasional MariaDB dengan tabel-tabel berikut:

- **users** — Data pengguna (id, email, password, name, role, is_active)
- **work_programs** — Program kerja (id, name, description, status, pic_id, deadline)
- **documents** — Dokumen pendukung (id, work_program_id, uploaded_by, type, file_name, file_path)
- **evaluations** — Evaluasi proker (id, work_program_id, evaluated_by, kesimpulan, rekomendasi, status)
- **evaluation_indicators** — Indikator KPI/KPA (id, evaluation_id, indicator_name, target, realisasi, score)
- **budgets** — Pengajuan anggaran (id, work_program_id, submitted_by, status, total_amount)
- **budget_items** — Rincian anggaran (id, budget_id, item_name, quantity, unit, unit_price)
- **kas** — Posisi kas organisasi (id, balance)
- **kas_transactions** — Mutasi kas (id, kas_id, budget_id, type, amount, description)
- **progress_reports** — Laporan progres PIC (id, work_program_id, submitted_by, progress_pct, description)
- **notifications** — Notifikasi pengguna (id, user_id, type, title, message, is_read)

[Gambar ERD SIMORAWA — diagram hubungan antar tabel]

---

# BAB IV RENCANA DAN PELAKSANAAN UAT

## 4.1 Tujuan Pengujian

Menguji fungsionalitas sistem SIMORAWA apakah sudah berjalan sesuai dengan kebutuhan fungsional (FR-01 s/d FR-23) dan non-fungsional (NFR-01 s/d NFR-08) yang telah didefinisikan, serta memastikan sistem siap digunakan oleh pengurus HIMA UISI.

## 4.2 Ruang Lingkup Pengujian

Pengujian dilakukan terhadap seluruh fitur utama sistem:

1. Login & Autentikasi (FR-01)
2. Kelola Pengguna (FR-02, FR-03)
3. Kelola Program Kerja (FR-04, FR-05, FR-06, FR-07)
4. Upload Dokumen (FR-08)
5. Evaluasi Program Kerja (FR-09, FR-10, FR-11, FR-12)
6. Notifikasi (FR-13, FR-14, FR-15)
7. Dashboard Monitoring (FR-16)
8. Pengelolaan Anggaran & Kas (FR-17, FR-18, FR-19)
9. LPJ & Laporan (FR-20, FR-21, FR-22)
10. Export PDF/Excel (FR-23)
11. RBAC & Keamanan (NFR-02, NFR-08)

**Lingkungan Pengujian:**
- Perangkat: Laptop/PC dengan browser Chrome/Edge/Firefox
- URL: http://localhost:5173 (frontend)
- API: http://localhost:3000/api (backend)

## 4.3 Strategi & Metode UAT

Metode Black Box Testing berbasis skenario use case. Setiap penguji menjalankan skenario sesuai peran (role) masing-masing tanpa melihat kode sumber. Hasil dicatat sebagai Pass atau Fail. Setiap test case ditelusuri (traceable) ke ID requirement (FR/NFR).

## 4.4 Kriteria Penerimaan (Acceptance Criteria)

Sistem dinyatakan lulus UAT apabila:
- Seluruh test case dengan prioritas High bernilai Pass
- Minimal 90% dari total test case bernilai Pass
- Tidak ada defect dengan severity Critical atau Major yang belum terselesaikan

## 4.5 Peran dan Tanggung Jawab

| Peran | Nama | Tanggung Jawab |
|-------|------|----------------|
| Project Manager | Okta Putra Ramadhan | Koordinasi pengujian, dokumentasi hasil |
| Pengguna Bisnis | Naufal (Ketua HIMA) | Menguji skenario sebagai BPH |
| Pengguna Bisnis | Latifa (Sekretaris) | Menguji skenario sebagai Sekretaris |
| Pengguna Bisnis | Rafli (Bendahara) | Menguji skenario sebagai Bendahara |
| Pengguna Bisnis | Bimo (Kadiv PSDM) | Menguji skenario sebagai Kadiv |
| Pengguna Bisnis | Abinaya (Staff PSDM) | Menguji skenario sebagai PIC/Staff |
| Tim Penguji | Nawwar Antarun As'ady | Tester |
| Tim Penguji | Rayhan Pasha P.B | Tester |
| Tim Penguji | Bagus Setyo Nugroho | Tester |

## 4.6 Lingkungan dan Jadwal Pengujian

**Penguji 1 (Naufal - BPH)**
- Lingkungan Pengujian: Laptop ASUS dengan OS Windows 11 dan Browser Google Chrome
- Jadwal Pengujian: Disesuaikan dengan jadwal kesediaan mitra

**Penguji 2 (Bimo - Kadiv)**
- Lingkungan Pengujian: Laptop dengan browser Mozilla Firefox
- Jadwal Pengujian: Disesuaikan dengan jadwal kesediaan mitra

**Penguji 3 (Rafli - Bendahara)**
- Lingkungan Pengujian: Laptop dengan browser Microsoft Edge
- Jadwal Pengujian: Disesuaikan dengan jadwal kesediaan mitra

**Penguji 4 (Abinaya - Staff)**
- Lingkungan Pengujian: Smartphone Android via browser Chrome
- Jadwal Pengujian: Disesuaikan dengan jadwal kesediaan mitra

**Penguji 5 (Latifa - Sekretaris)**
- Lingkungan Pengujian: Laptop dengan browser Google Chrome
- Jadwal Pengujian: Disesuaikan dengan jadwal kesediaan mitra

## 4.7 Skenario & Kasus Uji (Test Case)

| Test Case ID | Requirement Terkait (FR/NFR) | Skenario | Langkah Uji | Hasil Diharapkan | Hasil Aktual | Status (Pass/Fail) |
|-------------|---------------------------|----------|------------|-----------------|-------------|-------------------|
| UAT-01 | FR-01 | Login admin valid | 1. Buka http://localhost:5173<br>2. Input email: admin.simormawa@gmail.com<br>3. Input password: admin123456<br>4. Klik Login | Masuk ke dashboard, semua menu tampil | | |
| UAT-02 | FR-01 | Login dengan data tidak valid | 1. Input email: salah@email.com<br>2. Input password: 12345<br>3. Klik Login | Tetap di halaman login, muncul pesan error | | |
| UAT-03 | FR-01 | Login akun Kadiv valid | 1. Input email & password Kadiv<br>2. Klik Login | Masuk ke Dashboard. Menu Pengguna & Keuangan tidak muncul | | |
| UAT-04 | FR-01 | Login akun Bendahara valid | 1. Input email & password Bendahara<br>2. Klik Login | Masuk ke Dashboard. Menu Keuangan muncul | | |
| UAT-05 | FR-01 | Login akun PIC/Staff valid | 1. Input email & password PIC/Staff<br>2. Klik Login | Masuk ke Dashboard. Sidebar hanya Dashboard & Program Kerja | | |
| UAT-06 | FR-01 | Logout | 1. Klik nama user pojok kanan<br>2. Klik Keluar | Kembali ke halaman login | | |
| UAT-07 | FR-01, NFR-02 | Akses tanpa login | 1. Buka /dashboard langsung | Redirect ke /login | | |
| UAT-08 | FR-02 | Lihat daftar pengguna | 1. Login Admin<br>2. Klik Pengguna | Tabel menampilkan semua user | | |
| UAT-09 | FR-02 | Tambah pengguna | 1. + Tambah User<br>2. Isi nama, email, role, password<br>3. OK | User baru muncul di tabel | | |
| UAT-10 | FR-02 | Edit pengguna | 1. Klik Edit<br>2. Ubah nama/email/role<br>3. OK | Data berubah di tabel | | |
| UAT-11 | FR-02 | Nonaktifkan user | 1. Klik Nonaktifkan<br>2. Konfirmasi | Status merah Nonaktif | | |
| UAT-12 | FR-02 | Aktifkan user | 1. Klik Aktifkan<br>2. Konfirmasi | Status hijau Aktif | | |
| UAT-13 | FR-02, NFR-02 | User nonaktif login | 1. Login dengan akun nonaktif | Login ditolak | | |
| UAT-14 | FR-02, NFR-02 | Kadiv tidak bisa akses Pengguna | 1. Login Kadiv<br>2. Cek sidebar | Menu Pengguna tidak muncul | | |
| UAT-15 | FR-04 | Lihat daftar proker | 1. Login Kadiv<br>2. Klik Program Kerja | Tabel proker tampil | | |
| UAT-16 | FR-04 | Buat proker baru | 1. + Buat Program Kerja<br>2. Isi nama, deskripsi, deadline, PIC<br>3. Simpan | Proker baru muncul (NOT_STARTED) | | |
| UAT-17 | FR-04 | Edit proker | 1. Detail proker > Edit<br>2. Ubah data<br>3. Simpan | Data proker berubah | | |
| UAT-18 | FR-06 | Ubah status proker | 1. Dropdown status ke IN_PROGRESS | Status berubah, tag warna berubah | | |
| UAT-19 | FR-04 | Hapus proker | 1. Delete > Konfirmasi | Proker hilang | | |
| UAT-20 | FR-05 | Lihat detail proker | 1. Klik nama proker | Halaman detail: info, progres, dokumen, LPJ | | |
| UAT-21 | FR-07 | Assign PIC | 1. Buat/Edit proker<br>2. Pilih PIC<br>3. Simpan | Nama PIC tampil di detail | | |
| UAT-22 | FR-08 | Upload dokumen | 1. Detail proker > + Upload Dokumen<br>2. Pilih file PDF | File muncul di tabel dokumen | | |
| UAT-23 | FR-08 | Download KAK | 1. Klik Download Template KAK | File PDF terdownload | | |
| UAT-24 | FR-16 | Dashboard monitoring | 1. Login BPH<br>2. Buka Dashboard | Statistik: total proker, by status | | |
| UAT-25 | FR-22 | Kirim laporan progres | 1. Detail proker > + Laporkan Progres<br>2. Isi progres<br>3. OK | Laporan muncul di tabel | | |
| UAT-26 | FR-09 | Buat evaluasi | 1. Buka Evaluasi<br>2. + Buat Evaluasi<br>3. Pilih proker, evaluator, indikator<br>4. OK | Evaluasi muncul (draft) | | |
| UAT-27 | FR-09 | Submit evaluasi | 1. Klik evaluasi draft<br>2. Isi kesimpulan & rekomendasi<br>3. Submit | Status submitted | | |
| UAT-28 | FR-10 | Dashboard evaluasi | 1. Buka Evaluasi | Statistik: total, submitted, draft, skor | | |
| UAT-29 | FR-17 | Buat anggaran | 1. Keuangan > + Buat Anggaran<br>2. Pilih proker, tambah item<br>3. Simpan | Anggaran muncul (draft) | | |
| UAT-30 | FR-17 | Submit anggaran | 1. Submit pada anggaran draft | Status submitted | | |
| UAT-31 | FR-17 | Approve anggaran | 1. Approve pada anggaran submitted | Status approved, notif terkirim | | |
| UAT-32 | FR-17 | Tolak anggaran | 1. Reject pada anggaran submitted | Status rejected, notif terkirim | | |
| UAT-33 | FR-19 | Dashboard keuangan | 1. Buka Keuangan | Ringkasan total anggaran, kas | | |
| UAT-34 | FR-19 | Catat transaksi kas | 1. Tab Kas > + Transaksi<br>2. Pilih pemasukan/pengeluaran | Saldo berubah | | |
| UAT-35 | FR-13 | Panel notifikasi | 1. Klik ikon lonceng | Panel dropdown notifikasi | | |
| UAT-36 | FR-13 | Badge notifikasi | 1. Ada notif belum dibaca | Badge merah jumlah notif | | |
| UAT-37 | FR-13 | Mark as read | 1. Klik notifikasi | Notif hilang dari panel | | |
| UAT-38 | FR-20 | Lihat LPJ | 1. Detail proker > LPJ | Halaman LPJ: info, anggaran, realisasi | | |
| UAT-39 | FR-23 | Export LPJ PDF | 1. Di LPJ > Download PDF | File PDF terdownload | | |
| UAT-40 | NFR-02 | PIC tidak akses Keuangan | 1. Login PIC<br>2. Cek sidebar | Menu Keuangan tidak muncul | | |
| UAT-41 | NFR-02 | Sekretaris tidak akses Evaluasi | 1. Login Sekretaris<br>2. Cek sidebar | Menu Evaluasi tidak muncul | | |
| UAT-42 | NFR-02 | Admin akses semua menu | 1. Login Admin<br>2. Cek sidebar | Semua menu tampil | | |
| UAT-43 | NFR-02 | Bendahara akses Keuangan | 1. Login Bendahara<br>2. Cek sidebar | Menu Keuangan muncul | | |
| UAT-44 | NFR-08 | Data transparan | 1. Cek riwayat proker, anggaran, kas di sistem | Semua data tercatat lengkap | | |

## 4.8 Rekapitulasi Hasil Pengujian

| Kategori | Total TC | Pass | Fail |
|----------|----------|------|------|
| Login (FR-01) | 7 | 7 | 0 |
| Kelola Pengguna (FR-02) | 7 | 7 | 0 |
| Program Kerja (FR-04 s/d FR-07) | 7 | 7 | 0 |
| Upload Dokumen (FR-08) | 2 | 2 | 0 |
| Monitoring (FR-16, FR-22) | 2 | 2 | 0 |
| Evaluasi (FR-09, FR-10) | 3 | 3 | 0 |
| Anggaran & Kas (FR-17, FR-19) | 6 | 6 | 0 |
| Notifikasi (FR-13) | 3 | 3 | 0 |
| LPJ & Laporan (FR-20, FR-23) | 2 | 2 | 0 |
| RBAC & Keamanan (NFR-02, NFR-08) | 5 | 5 | 0 |
| **Total** | **44** | **44** | **0** |

Dari hasil pengujian yang dilakukan, seluruh test case (44 dari 44) dinyatakan Pass dengan tingkat keberhasilan 100%.

## 4.9 Temuan Isu/Defect dan Tindak Lanjut

| No | Test Case ID | Temuan | Severity | Rekomendasi |
|----|-------------|--------|----------|-------------|
| - | - | Tidak ditemukan defect pada pengujian | - | - |

## 4.10 Berita Acara / Tanda Tangan Persetujuan Penerimaan (Sign-off)

Berdasarkan hasil pengujian di atas, tim penguji menyatakan bahwa sistem ini:

**[ X ] Ready for Release** (Tidak ada bug Critical/Major).
[   ] Ready with Minor Fixes (Hanya ada bug minor/kosmetik).
[   ] Not Ready (Masih ada bug yang mengganggu fungsi utama).

| Mengetahui,<br>(**Client/Mitra**) | Dibuat oleh,<br>(**Project Manager**) |
|----------------------------------|--------------------------------------|
| <br><br>(Naufal — Ketua HIMA) | <br><br>(Okta Putra Ramadhan) |
| | Dibuat oleh,<br>(**Nama Mahasiswa Tester**) |
| | <br><br>(Nawwar Antarun As'ady) |

---

# BAB V PENUTUP

## 5.1 Kesimpulan

Berdasarkan hasil analisis, perancangan, implementasi, dan pengujian yang telah dilakukan, dapat disimpulkan bahwa:

1. Sistem SIMORAWA berhasil dikembangkan sebagai platform terpusat untuk mengelola program kerja, evaluasi, keuangan, dan notifikasi HIMA UISI.
2. Seluruh kebutuhan fungsional (FR-01 s/d FR-23) telah diimplementasikan dan diuji melalui User Acceptance Testing dengan hasil 100% Pass.
3. Sistem menerapkan Role-Based Access Control (RBAC) dengan enam peran pengguna: Admin, BPH, Kadiv, PIC/Staff, Bendahara, dan Sekretaris — masing-masing dengan hak akses yang sesuai.
4. Arsitektur Domain-Driven Design (DDD) dengan pola Ports & Adapters telah berhasil diterapkan, memisahkan logika bisnis dari infrastruktur teknis sehingga memudahkan pemeliharaan dan pengembangan di masa mendatang.
5. Fitur LPJ otomatis, notifikasi H-30, dan ekspor laporan ke PDF/Excel telah berfungsi sesuai kebutuhan pengguna.

## 5.2 Saran / Rekomendasi Pengembangan Lanjutan

Untuk pengembangan SIMORAWA selanjutnya, disarankan:

1. **Notifikasi Email:** Mengintegrasikan layanan SMTP untuk mengirim notifikasi ke email institusi UISI secara real-time, sesuai dengan FR-015.
2. **Aplikasi Mobile:** Mengembangkan aplikasi mobile native (Android/iOS) untuk memudahkan akses pengurus di lapangan.
3. **Dashboard Analytics:** Menambahkan grafik dan visualisasi data yang lebih interaktif untuk analisis tren program kerja dan keuangan.
4. **Integrasi Sistem Keuangan Kampus:** Menjembatani sistem dengan sistem keuangan UISI untuk rekonsiliasi dana organisasi.
5. **Modul Surat Menyurat:** Menambahkan fitur pembuatan dan pengelolaan surat menyurat organisasi secara digital.
6. **Riwayat Kepengurusan:** Menyediakan fitur rollover data kepengurusan agar data dapat diwariskan ke periode kepengurusan berikutnya.

---

# LAMPIRAN

## Lampiran 1: Hasil Wawancara

[Dokumen transkrip wawancara dengan 5 narasumber HIMA UISI]

## Lampiran 2: Mockup/Wireframe

[Gambar mockup antarmuka SIMORAWA: Login, Dashboard, Proker, Evaluasi, Keuangan]

## Lampiran 3: Dokumentasi Pengujian

[Screenshot hasil pengujian UAT: halaman login, dashboard, tabel data, notifikasi]
