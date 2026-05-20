# Issue: Inisialisasi Proyek Backend dengan Bun, ElysiaJS, Drizzle ORM, dan MySQL

## Deskripsi
Buat sebuah proyek backend baru dari nol menggunakan **Bun** sebagai runtime, **ElysiaJS** sebagai web framework, **Drizzle ORM** sebagai Object-Relational Mapper, dan **MySQL** sebagai database utama. Proyek ini akan menjadi fondasi untuk layanan backend API yang cepat, type-safe, dan modern.

---

## Tech Stack & Dependensi
- **Runtime**: Bun (versi terbaru/LTS)
- **Web Framework**: ElysiaJS
- **ORM**: Drizzle ORM & Drizzle Kit (untuk migrasi)
- **Database**: MySQL (bisa menggunakan Docker atau server local)
- **Driver Database**: `mysql2` (atau driver yang direkomendasikan untuk Drizzle + MySQL)

---

## Rencana Implementasi (High-Level)

### Tahap 1: Setup Proyek & Inisialisasi Bun
1. Inisialisasi proyek baru menggunakan Bun:
   ```bash
   bun init
   ```
2. Instal dependensi utama:
   - Web framework: `elysia`
   - ORM: `drizzle-orm`
   - Driver: `mysql2`
3. Instal dependensi pengembangan (*Dev Dependencies*):
   - `drizzle-kit` (untuk mengelola migrasi schema database)
   - `@types/bun` (jika belum otomatis terinstall)

### Tahap 2: Konfigurasi Environment & Struktur Folder
1. Buat file `.env` dan `.env.example` untuk menyimpan konfigurasi:
   - Database Connection String / Credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`)
   - Aplikasi Port (`PORT`)
2. Struktur folder yang disarankan (High-Level):
   ```text
   ├── src/
   │   ├── db/          # Konfigurasi database & schema Drizzle
   │   ├── routes/      # Defenisi routes ElysiaJS
   │   ├── controllers/ # Logika bisnis / handlers
   │   └── index.ts     # Entry point aplikasi
   ├── drizzle.config.ts# Konfigurasi Drizzle Kit
   ├── .env
   └── package.json
   ```

### Tahap 3: Konfigurasi Database & Drizzle ORM
1. Buat file konfigurasi koneksi database menggunakan driver MySQL.
2. Definisikan schema database awal (contoh: tabel `users` sederhana dengan field `id`, `name`, `email`, `created_at`, `updated_at`).
3. Setup file `drizzle.config.ts` untuk mengarahkan ke schema folder dan menentukan target database MySQL.
4. Pastikan script migrasi tersedia di `package.json`:
   - `db:generate` (untuk membuat file migrasi dari schema)
   - `db:push` atau `db:migrate` (untuk mengaplikasikan perubahan schema ke database)

### Tahap 4: Inisialisasi ElysiaJS & Routing
1. Buat server Elysia dasar pada `src/index.ts` yang mendengarkan pada port dari `.env`.
2. Setup *Health Check* route (misal: `GET /health`) untuk memastikan server berjalan dengan baik.
3. Integrasikan koneksi Drizzle database ke dalam context Elysia (bisa menggunakan decorator atau plugin) agar query database dapat diakses dengan mudah di dalam route handler.
4. Buat contoh CRUD route sederhana untuk schema tabel yang telah didefinisikan (misal: `GET /users` dan `POST /users`) menggunakan Drizzle ORM untuk interaksi databasenya.

---

## Rencana Verifikasi & Pengujian
- [ ] **Verifikasi Setup**: Jalankan `bun dev` dan pastikan tidak ada error kompilasi/runtime.
- [ ] **Koneksi Database**: Jalankan generate dan push migrasi Drizzle untuk memastikan schema berhasil dibuat di database MySQL.
- [ ] **Endpoint Test**: Lakukan request ke `GET /health` dan endpoint CRUD yang dibuat (menggunakan `curl`, Bruno, Postman, atau Elysia's internal fetcher) dan pastikan responnya sesuai (200 OK).
