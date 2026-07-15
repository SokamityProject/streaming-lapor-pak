# Streaming Lapor Pak

Aplikasi Android yang membungkus website **https://tv.laporpak.my.to** menggunakan [Capacitor](https://capacitorjs.com/). APK dibangun otomatis di cloud lewat **GitHub Actions** — tidak perlu Android Studio di komputermu.

## Cara membuat APK (langkah demi langkah)

### 1. Buat repository di GitHub
1. Masuk ke https://github.com dan klik **New repository**.
2. Beri nama, misal `streaming-lapor-pak`, lalu **Create repository**.

### 2. Upload proyek ini ke repo
Buka terminal di dalam folder ini, lalu jalankan (ganti URL dengan repo milikmu):

```bash
git init
git add .
git commit -m "Proyek awal Streaming Lapor Pak"
git branch -M main
git remote add origin https://github.com/USERNAME/streaming-lapor-pak.git
git push -u origin main
```

> Atau cara paling mudah tanpa terminal: di halaman repo GitHub, klik
> **Add file > Upload files**, lalu seret semua isi folder ini (termasuk folder
> `.github`), dan **Commit**.

### 3. Tunggu build otomatis
- Begitu file terupload, buka tab **Actions** di repo GitHub-mu.
- Workflow **Build APK** akan berjalan otomatis (± 3–5 menit).
- Jika tidak jalan otomatis, klik workflow **Build APK** > **Run workflow**.

### 4. Unduh APK
- Setelah workflow selesai (centang hijau), klik run tersebut.
- Di bagian bawah halaman, pada **Artifacts**, unduh **StreamingLaporPak-APK**.
- Ekstrak file zip → di dalamnya ada `StreamingLaporPak.apk`.

### 5. Pasang di HP Android
- Pindahkan `StreamingLaporPak.apk` ke HP, buka filenya.
- Izinkan **"Install dari sumber tidak dikenal"** bila diminta.
- Selesai — aplikasi akan membuka website secara langsung.

## Catatan
- Ini menghasilkan **APK debug** (untuk pemakaian pribadi/uji coba). Untuk
  distribusi ke Play Store, dibutuhkan APK/AAB yang **ditandatangani (signed)**.
- Aplikasi membutuhkan koneksi internet karena memuat konten dari website.
- Untuk mengganti nama app, URL, atau ikon, edit file `capacitor.config.json`.

## Struktur file
```
.
├── capacitor.config.json      # Konfigurasi app (nama, URL tujuan)
├── package.json               # Dependensi Capacitor
├── www/index.html             # Layar loading saat app dibuka
└── .github/workflows/build-apk.yml   # Skrip build otomatis di cloud
```
