# SELAYAR BISA — Portal Inovasi BPS Kepulauan Selayar

Website katalog ringkas, modern, minimalis, dan responsif yang menghimpun seluruh inovasi digital serta tautan panduan operasional di lingkungan **Badan Pusat Statistik (BPS) Kabupaten Kepulauan Selayar (Satker 7301)**.

Dikelola oleh **[@ridsonap](https://github.com/ridsonap)**.

---

## 🌟 Daftar Inovasi

| Inovasi | Kategori | Akses Langsung | Panduan & Repository |
| :--- | :--- | :--- | :--- |
| **PUSAT 7301** | Tata Naskah & Administrasi | [s.bps.go.id/pusat7301](https://s.bps.go.id/pusat7301) | [GitHub @ridsonap/pusat7301](https://github.com/ridsonap/pusat7301) |
| **SLS Finder Selayar** | WebGIS & Geospasial | [Buka SLSelayar](https://ridsonap.github.io/SLSelayar/) | [GitHub @ridsonap/SLSelayar](https://github.com/ridsonap/SLSelayar) |
| **BUMAKO** | Master Komoditas SPDT NTP 2026 | [Buka BUMAKO](https://ridsonap.github.io/bumako/) | [GitHub @ridsonap/bumako](https://github.com/ridsonap/bumako) |
| **SIPH Sulsel** | Analisis Inflasi & Harga Pangan | [Buka SIPH](https://ridsonap.github.io/siph/) | [GitHub @ridsonap/siph](https://github.com/ridsonap/siph) |
| **Sampel SPDT** | Pergantian Sampel DSRT 7301 | [sampel-spdt.vercel.app](https://sampel-spdt.vercel.app) | [GitHub @ridsonap/sampel-spdt](https://github.com/ridsonap/sampel-spdt) |

---

## 🚀 Fitur Utama

- **Minimalist & Zero Dependency:** Murni Static HTML5, modern CSS3, dan Vanilla JavaScript tanpa framework berat.
- **Fast Instant Search:** Pencarian instan kata kunci inovasi, nama subsektor, atau kegunaan.
- **Category Filter Pills:** Filter cepat berdasarkan kategori teknis (Administrasi, Geospasial, Survei Pertanian, Analisis Harga).
- **Dark & Light Mode:** Mendukung switch tema gelap/terang otomatis mengikuti preferensi OS atau manual via toggle.
- **Copy Link Action:** Tombol cepat salin tautan langsung ke clipboard beserta toast konfirmasi.
- **Fully Responsive:** Tampilan rapi dan nyaman diakses lewat smartphone, tablet, maupun layar desktop.

---

## 📂 Struktur Berkas

```text
selayarbisa/
├── index.html       # Antarmuka web utama
├── style.css        # Tata letak, tokens desain, dark/light theme & responsivitas
├── app.js           # Logika interaktif pencarian, filter, tema, dan salin tautan
└── README.md        # Dokumentasi proyek
```

---

## 🌐 Cara Menjalankan & Deploy

### 1. Jalankan Lokal
Cukup buka file `index.html` langsung di browser, atau jalankan static server lokal:
```bash
# Menggunakan Python
python3 -m http.server 8080
```
Buka `http://localhost:8080` di browser.

### 2. Deploy ke GitHub Pages (100% Gratis)
1. Buat repository baru di GitHub dengan nama `selayarbisa`.
2. Push direktori ini ke branch `main`:
   ```bash
   cd /mnt/data/Project/selayarbisa
   git init
   git add .
   git commit -m "feat: initial commit selayar bisa portal inovasi"
   git branch -M main
   git remote add origin https://github.com/ridsonap/selayarbisa.git
   git push -u origin main
   ```
3. Buka **Settings > Pages** pada repository GitHub, pilih branch `main` folder `/(root)`.
4. Website akan langsung aktif di `https://ridsonap.github.io/selayarbisa/`.
