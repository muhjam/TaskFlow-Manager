# **Frontend Developer Take-Home Test: TaskFlow Manager (Offline Mock)**

Halo\! Terima kasih telah melamar posisi Frontend Developer. Tugas ini dirancang untuk melihat kemampuan teknis Anda dalam membangun aplikasi web modern menggunakan ekosistem React. Kami lebih mengutamakan struktur kode, abstraksi logika, dan pemahaman tentang pengelolaan data asinkron.

## **1\. Deskripsi Proyek**

Anda diminta untuk membangun aplikasi manajemen tugas (To-Do List) bernama **TaskFlow Manager**. Aplikasi ini harus berfungsi sepenuhnya secara **offline**, namun mensimulasikan perilaku server sungguhan (latensi, error, dan autentikasi).bo

## **2\. Tech Stack Wajib**

* **Framework:** React (Vite) \+ typescript  
* **Styling:** Tailwind CSS  
* **Global State Management:** Zustand / Context React  
* **Data Fetching:** Axios \+ TanStack Query (React Query)  
* **Storage:** LocalStorage (sebagai pengganti Database)  
* **React Hook Form \+ zod** ( validasi input )

## **3\. Requirement Fitur**

### **A. Autentikasi (Mock Offline)**

* Halaman Login dengan validasi kredensial (hardcoded).  
* Gunakan **Zustand** untuk menyimpan sesi user.  
* Implementasikan **Persistence**: Jika halaman di-refresh, user tidak otomatis logout (simpan token/sesi di LocalStorage).  
* **Private Route**: Halaman dashboard hanya bisa diakses setelah login.

### **B. Task Management (CRUD)**

* **Fetch Data:** Tampilkan daftar tugas dari LocalStorage menggunakan React Query.  
* **Simulasi Latensi:** Gunakan *setTimeout* (800ms \- 1s) pada Mock API untuk mensimulasikan loading state di UI.  
* **Create, Update, Delete:** Implementasikan fitur menambah tugas, menandai selesai, dan menghapus tugas.  
* **Optimistic Updates:** Sangat disarankan untuk memberikan pengalaman UI yang instan saat melakukan mutasi data.

### **C. Global Search & Filter**

* Gunakan **Zustand** untuk mengelola state filter (Semua, Selesai, Belum Selesai) dan kata kunci pencarian.  
* Pastikan filter berfungsi dengan baik pada daftar tugas yang ditampilkan.

## **4\. Advanced Optional Task: Multi-Select & Bulk Actions**

Tugas ini bersifat opsional namun sangat disarankan untuk menunjukkan kemampuan pengelolaan state yang lebih kompleks:

* **Selection State:** Kemampuan memilih beberapa tugas sekaligus menggunakan checkbox.  
* **Bulk Actions:** Tombol untuk menghapus atau menyelesaikan banyak tugas sekaligus yang muncul secara kondisional saat ada item yang dipilih.  
* **Select All:** Logika untuk memilih semua item yang sedang tampil berdasarkan filter aktif.

## **5\. Requirement Teknis (Data Layer)**

Anda wajib membuat abstraksi "Mock API" menggunakan Axios Mock Adapter atau pembungkus Promise manual. Kami ingin melihat bagaimana Anda memisahkan logika UI dari logika pengambilan data.

* Gunakan **Axios Interceptors** untuk mensimulasikan pengecekan token/auth header.  
* Tangani **Error State** (misal: simulasi gagal login atau gagal simpan data) dan tampilkan feedback yang sesuai di UI (Toast/Alert).

## **6\. Kriteria Penilaian**

| Kriteria | Bobot | Detail   |
| :---- | :---: | :---- |
| Architectural Abstraction | 35% | Pemisahan antara komponen UI, store (Zustand), dan lapisan Mock API. |
| State & Async Mastery | 30% | Penggunaan React Query (caching, loading/error states) dan sinkronisasi dengan LocalStorage. |
| Code Quality | 20% | Clean code, penamaan variabel yang jelas, dan efisiensi komponen. |
| UI/UX (Tailwind) | 15% | Responsivitas layout dan kerapihan antarmuka. |

## **7\. Instruksi Pengumpulan**

1. Unggah kode Anda ke repositori GitHub (Public).  
2. Sertakan file **README.md** yang menjelaskan cara menjalankan aplikasi, struktur folder, serta asumsi atau tantangan yang dihadapi.  
3. (Opsional) Deploy aplikasi ke Vercel atau Netlify.  
4. Kirim link repository ke email itdev@mocmilenial.com

Selamat mengerjakan\!

