# Rencana Implementasi TaskFlow Manager

Dokumen ini menjelaskan langkah-langkah untuk membangun aplikasi **TaskFlow Manager** sesuai dengan spesifikasi dan desain yang diberikan.

## 1. Persiapan Proyek
- [ ] Inisialisasi proyek menggunakan Vite + React + TypeScript.
- [ ] Instalasi dependencies utama:
  - `tailwindcss`, `postcss`, `autoprefixer` (Styling)
  - `zustand` (Client State)
  - `@tanstack/react-query`, `axios` (Server State & API)
  - `react-hook-form`, `zod`, `@hookform/resolvers` (Form Validation)
  - `lucide-react` (Icons)
  - `react-router-dom` (Routing)
  - `clsx`, `tailwind-merge` (Utility styling)
- [ ] Konfigurasi Tailwind CSS dengan tema **Productive Serenity**.

## 2. Struktur Proyek (Folder Structure)
Mengikuti konvensi `kebab-case` dan penggunaan `index.tsx` / `index.ts` di setiap folder:

```text
src/
├── api/
│   ├── client/
│   │   └── index.ts          # Axios instance & interceptors
│   └── mock/
│       └── index.ts          # Simulasi API endpoints & latency
├── components/
│   ├── ui/                   # Shared UI components
│   │   ├── button/
│   │   │   └── index.tsx
│   │   ├── input/
│   │   │   └── index.tsx
│   │   ├── card/
│   │   │   └── index.tsx
│   │   └── badge/
│   │       └── index.tsx
│   └── layout/
│       ├── navbar/
│       │   └── index.tsx
│       └── sidebar/
│           └── index.tsx
├── features/                 # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form/
│   │   │   │   └── index.tsx
│   │   │   └── register-form/
│   │   │       └── index.tsx
│   │   ├── hooks/
│   │   │   └── use-auth/
│   │   │       └── index.ts
│   │   ├── services/
│   │   │   └── index.ts
│   │   └── store/
│   │       └── index.ts
│   └── tasks/
│       ├── components/
│       │   ├── task-board/   # Kanban View
│       │   │   └── index.tsx
│       │   ├── task-list/    # List View
│       │   │   └── index.tsx
│       │   └── task-item/
│       │       └── index.tsx
│       ├── hooks/
│       │   ├── use-tasks/
│       │   │   └── index.ts
│       │   └── use-task-mutations/
│       │       └── index.ts
│       ├── services/
│       │   └── index.ts
│       └── store/            # Zustand for filters/search
│           └── index.ts
├── hooks/                    # Global reusable hooks
│   └── use-debounce/
│       └── index.ts
├── providers/
│   ├── query-provider/
│   │   └── index.tsx
│   └── auth-provider/
│       └── index.tsx
├── types/
│   ├── auth.ts
│   ├── task.ts
│   └── index.ts
└── utils/
    ├── storage/              # LocalStorage helpers
    │   └── index.ts
    └── cn/                   # Tailwind class merger
        └── index.ts
```

## 3. Skema Database (LocalStorage Structure)
Karena aplikasi ini offline, kita akan mensimulasikan database di `LocalStorage` dengan struktur JSON berikut:

### A. Key: `taskflow_users`
Menyimpan daftar user terdaftar.
```typescript
Array<{
  id: string;          // UUID
  email: string;       // Unique
  password: string;    // Hashed (simulated)
  name: string;
  createdAt: string;   // ISO Date
}>
```

### B. Key: `taskflow_tasks`
Menyimpan semua tugas yang dibuat oleh user.
```typescript
Array<{
  id: string;          // UUID
  userId: string;      // Relasi ke user id
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}>
```

### C. Key: `taskflow_auth_session`
Menyimpan sesi aktif user.
```typescript
{
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
```

## 4. Implementasi Data Layer (Mock API)
- [ ] Buat `apiClient` menggunakan Axios.
- [ ] Implementasikan interceptors untuk simulasi auth token.
- [ ] Buat fungsi Mock API dengan `setTimeout` (800ms - 1s) untuk simulasi latensi.
- [ ] Gunakan LocalStorage sebagai database utama.

## 5. Fitur Autentikasi
- [ ] **Store**: Buat `useAuthStore` dengan Zustand untuk menyimpan sesi user (persist ke LocalStorage).
- [ ] **Pages**: 
  - Login (validasi kredensial hardcoded).
  - Register (simpan user baru ke LocalStorage).
  - Forgot Password (sederhana).
- [ ] **Security**: Implementasikan `PrivateRoute` untuk melindungi halaman dashboard.

## 6. Fitur Task Management (CRUD)
- [ ] **Hooks**: Buat custom hooks `useTasks`, `useCreateTask`, `useUpdateTask`, `useDeleteTask` menggunakan React Query.
- [ ] **Optimistic Updates**: Implementasikan update instan pada UI saat mutasi data.
- [ ] **Views**:
  - List View: Daftar tugas standar.
  - Kanban View: Mode papan dengan kolom (Todo, In Progress, Done).
- [ ] **Search & Filter**: Integrasikan pencarian dan filter (Status) menggunakan Zustand.

## 7. Fitur Lanjutan (Opsional tapi Disarankan)
- [ ] **Multi-Select**: State untuk memilih banyak tugas.
- [ ] **Bulk Actions**: Hapus atau selesaikan banyak tugas sekaligus.
- [ ] **Select All**: Logika untuk memilih semua item yang tampil.

## 8. Desain & UI/UX
- [ ] Implementasikan tema **Productive Serenity**:
  - Warna: Primary Blue (#3B82F6), Surface (#F9FAFB), dll.
  - Tipografi: Inter font.
  - Spacing: Kelipatan 4px.
  - Elevation: Ambient shadows untuk kartu.
- [ ] Pastikan layout responsif (Mobile First).

## 9. Finalisasi
- [ ] Jalankan linting dan build checks.
- [ ] Buat README.md yang komprehensif.
- [ ] Pengujian manual untuk alur offline dan sinkronisasi LocalStorage.
