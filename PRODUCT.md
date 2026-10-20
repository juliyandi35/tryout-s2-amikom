# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Satu pengguna: pemilik aplikasi sendiri, yang mempersiapkan diri untuk Tes Kemampuan Akademik (TKA) masuk kuliah di AMIKOM. Belajar mandiri, sesi pendek harian dan sesekali simulasi 60 menit, di ponsel maupun laptop dengan bobot sama. Tidak ada akun, server, atau pengguna lain. Jenjang dan jurusan belum ditetapkan (sebelumnya sempat S2 Informatika; belum dikonfirmasi).

## Product Purpose
Ruang latihan TKA pribadi: mengerjakan soal kemampuan umum (bukan materi kurikulum), melihat pembahasan, menemukan topik yang lemah, dan menutup kelemahan itu sampai siap tes. Berhasil bila nilai tiap topik naik dan simulasi terasa seperti tes sungguhan.

## Positioning
Bukan bank soal umum: aplikasi ini mengikuti kelemahan pemiliknya sendiri. Ia mencatat riwayat di perangkat, menyusun latihan dari topik terlemah, dan menyimpan buku kesalahan dengan penyebab tiap kesalahan.

## Operating Context
Dipakai di sela waktu (ponsel) dan di sesi panjang (laptop). Soal berisi teks panjang (bacaan, tabel data dalam teks). Simulasi berjalan dengan timer. Data hanya di localStorage browser.

## Capabilities and Constraints
- 26 modul TKA (13 topik, Set A dan Set B) dan 10 Simulasi TKA (52 soal, 60 menit), mode ujian (timer, pembahasan setelah selesai) dan mode latihan (pembahasan langsung).
- 13 topik: sinonim/antonim, analogi, pemahaman bacaan, silogisme, penalaran analitis, deret, aritmetika, penalaran kuantitatif, interpretasi data, figural/spasial, melengkapi kalimat, penalaran kritis, Bahasa Indonesia. Tidak ada soal Bahasa Inggris.
- Latihan soal lemah (topik akurasi < 85%) dan Buku kesalahan (penyebab, tanda paham, latihan ulang).
- Riwayat, hasil, dan pembahasan per sesi; cheat sheet PDF terpisah.
- React 18 + Vite, tanpa backend. Konten soal ada di `src/data`. Semua teks antarmuka berbahasa Indonesia.
- Jenjang dan jurusan: belum diputuskan.

## Brand Commitments
Nama tampilan saat ini "Ruang Belajar" (ruangbelajar) dan judul tab "Latihan TKA AMIKOM". Tidak ada logo atau aset merek lain.

## Evidence on Hand
774 soal asli beserta pembahasan di `src/data`. Tidak ada testimoni, statistik pengguna, atau klaim kelulusan, dan tidak boleh dibuat-buat.

## Product Principles
1. Fokus belajar: layar tidak boleh bersaing dengan soal; soal dan pembahasan selalu yang paling terbaca.
2. Ukur kelemahan, jangan cuma skor: tampilkan topik lemah dan kesalahan berulang sebelum angka rata-rata.
3. Sama baiknya di ponsel dan laptop: sesi ujian dan membaca soal panjang nyaman di keduanya.
4. Jujur soal data: tidak ada klaim, angka, atau pencapaian yang tidak benar-benar berasal dari riwayat pengguna.
5. Pembahasan mengajar, bukan sekadar menyalahkan.

## Accessibility & Inclusion
Teks soal panjang harus terbaca nyaman (kontras, ukuran, lebar baris). Bisa dioperasikan dengan keyboard, fokus terlihat, dan hormati `prefers-reduced-motion`.
