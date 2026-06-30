# TaskFlow Manager

Aplikasi manajemen tugas (To-Do List) berbasis web yang berjalan **offline** dengan simulasi API server. Dibangun sebagai Frontend Developer Take-Home Test dengan fokus pada arsitektur kode, pemisahan concern, dan pengelolaan state asinkron.

**Dikerjakan oleh:** Muhamad Jamaludin

---

## Fitur Utama

- **Autentikasi (Mock Offline)** — Login, Register, Forgot Password, dan Change Password
- **Task Management (CRUD)** — Tambah, ubah status, dan hapus tugas
- **Tampilan List & Kanban** — Drag-and-drop antar kolom status
- **Search & Filter** — Pencarian dan filter berdasarkan status
- **Dark / Light Mode** — Toggle tema dari menu profil
- **Optimistic Updates** — UI langsung bereaksi saat mutasi data
- **Session Persistence** — Sesi login tetap tersimpan setelah refresh halaman

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | React 19 + Vite + TypeScript |
| Styling | Tailwind CSS v4 |
| Server State | TanStack Query (React Query) |
| Client State | Zustand |
| Form & Validasi | React Hook Form + Zod |
| HTTP Client | Axios (dengan interceptors) |
| Drag & Drop | @dnd-kit |
| Storage | LocalStorage |

---

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js v18 atau lebih baru
- npm

### Instalasi & Development

```bash
# Clone repository
git clone <url-repository>
cd taskflow-manager

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

### Perintah Lainnya

```bash
npm run build    # Build production
npm run preview  # Preview build production
npm run lint     # Jalankan ESLint
```

### Cara Menggunakan

1. Buka aplikasi di browser.
2. **Register** akun baru, atau login jika sudah pernah mendaftar.
3. Setelah login, Anda akan diarahkan ke **Dashboard**.
4. Kelola tugas melalui tampilan **List** atau **Kanban**.
5. Gunakan tombol **+** di pojok kanan bawah untuk menambah tugas baru.
6. Untuk reset password: Login → **Forgot Password?** → isi email → ubah password di halaman berikutnya.

> **Catatan:** Tidak ada akun default. Pengguna harus mendaftar terlebih dahulu. Data disimpan di LocalStorage browser.

---

## Struktur Folder

```
taskflow-manager/
├── public/                     # Asset statis
├── src/
│   ├── api/
│   │   ├── client/             # Axios instance & interceptors
│   │   └── mock/               # Mock API layer (LocalStorage)
│   ├── components/
│   │   └── ui/                 # Komponen UI reusable
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       ├── confirm-modal/
│   │       ├── empty-state/
│   │       ├── input/          # Input, Select, TextArea, DatePicker, ButtonSelect
│   │       ├── modal/
│   │       └── tabs/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/     # Login, Register, Change Password form
│   │   │   ├── services/       # Auth service layer
│   │   │   └── store/          # Zustand auth session (persisted)
│   │   └── tasks/
│   │       ├── components/     # TaskList, TaskItem, TaskBoard
│   │       ├── hooks/          # useTasks, useTaskMutations (React Query)
│   │       ├── services/       # Task service layer
│   │       └── store/          # Zustand filter & view mode
│   ├── hooks/
│   │   └── use-theme-store/    # Zustand theme (dark/light)
│   ├── pages/                  # Route-level pages
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── providers/              # React Query provider
│   ├── types/                  # TypeScript interfaces
│   ├── utils/
│   │   ├── cn/                 # clsx + tailwind-merge helper
│   │   └── storage/            # LocalStorage utility
│   ├── App.tsx                 # Routing & route guards
│   ├── index.css               # Tailwind theme & global styles
│   └── main.tsx                # Entry point
├── index.html
├── package.json
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

### Konvensi Penamaan

- Folder menggunakan **kebab-case**
- Setiap folder komponen/logic memiliki file `index.tsx` atau `index.ts`
- Server state di-wrap dalam custom hooks React Query
- Client state global menggunakan Zustand

---

## Skema LocalStorage

| Key | Deskripsi |
|-----|-----------|
| `taskflow_users` | Data pengguna (email, password, name) |
| `taskflow_tasks` | Data tugas per user |
| `taskflow_auth_session` | Token & sesi user aktif |
| `taskflow_theme` | Preferensi tema (light/dark) |

---

## Asumsi

1. **Mock API** — Aplikasi tidak terhubung ke backend sungguhan. Semua operasi CRUD dan auth disimulasikan melalui LocalStorage dengan delay ~800ms untuk meniru latensi jaringan.
2. **Autentikasi sederhana** — Password disimpan plain-text di LocalStorage karena ini hanya proof-of-concept offline, bukan production-ready auth.
3. **Forgot Password** — Tidak ada pengiriman email nyata. Setelah validasi email, user langsung diarahkan ke halaman change password.
4. **Single User Session** — Satu browser = satu sesi aktif. Data task terikat pada `userId` yang sedang login.
5. **Desain** — UI mengacu pada design system "Productive Serenity" dengan palet warna netral (broken white / abu-abu) untuk kenyamanan visual.

---

## Tantangan yang Dihadapi

Alhamdulillah, secara keseluruhan pengerjaan aplikasi ini **tidak terlalu sulit** bagi saya. Beberapa hal teknis memang muncul selama proses development ,seperti konfigurasi Tailwind CSS v4, penyesuaian drag-and-drop pada Kanban, dan implementasi optimistic updates. Namun semuanya dapat diselesaikan dengan relatif cepat.

Hal yang paling membantu proses pengerjaan ini:
1. **Stitch with Google**: Digunakan sebagai referensi awal untuk desain UI, sehingga saya tidak perlu memulai dari nol dalam merancang tampilan.
2. **Cursor**: AI-powered editor yang sangat membantu mempercepat implementasi, debugging, dan iterasi kode.
3. **Pemahaman fundamental**: Pemahaman dasar terhadap tools modern (React, TypeScript, state management, arsitektur folder) dan prinsip development yang baik membuat alur pengerjaan menjadi lebih **efisien dan terstruktur**.

Dengan kombinasi ketiga hal tersebut, saya bisa fokus pada kualitas arsitektur kode dan pengalaman pengguna, bukan hanya mengejar agar fitur selesai.
---