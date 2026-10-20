// [topik, soal, [opsi A-D], indeks jawaban benar, pembahasan]
// Modul TKA 09: Interpretasi Data (tabel dan grafik ditulis dalam teks)
const T1 = 'Penjualan (unit) per kuartal:\nKuartal I = 120 | Kuartal II = 150 | Kuartal III = 90 | Kuartal IV = 140'
const T2 = 'Jumlah pengunjung perpustakaan (orang):\nSenin = 80 | Selasa = 100 | Rabu = 120 | Kamis = 60 | Jumat = 90'
const T3 = 'Nilai ujian lima siswa:\nAdi = 70 | Budi = 85 | Citra = 90 | Dewi = 75 | Eka = 80'
const T4 = 'Anggaran sebuah kampus tahun ini (total Rp800 juta):\nOperasional 40% | Riset 25% | Beasiswa 20% | Lainnya 15%'
const T5 = 'Pendapatan (juta rupiah):\n2021 = 200 | 2022 = 250 | 2023 = 300 | 2024 = 270'

export default [
  ['dat', `${T1}\n\nKuartal dengan penjualan tertinggi adalah…`, ['Kuartal I', 'Kuartal II', 'Kuartal III', 'Kuartal IV'], 1, 'Penjualan tertinggi 150 unit pada Kuartal II.'],
  ['dat', `${T1}\n\nTotal penjualan selama setahun adalah…`, ['480 unit', '500 unit', '520 unit', '540 unit'], 1, '120 + 150 + 90 + 140 = 500 unit.'],
  ['dat', `${T1}\n\nRata-rata penjualan per kuartal adalah…`, ['115 unit', '120 unit', '125 unit', '130 unit'], 2, '500 ÷ 4 = 125 unit.'],
  ['dat', `${T1}\n\nPenurunan penjualan dari Kuartal II ke Kuartal III adalah…`, ['30%', '35%', '40%', '45%'], 2, 'Turun 60 dari 150, yaitu 60/150 = 40%.'],
  ['dat', `${T1}\n\nPersentase penjualan Kuartal IV terhadap total setahun adalah…`, ['24%', '26%', '28%', '30%'], 2, '140 ÷ 500 = 0,28 = 28%.'],
  ['dat', `${T2}\n\nSelisih pengunjung terbanyak dan tersedikit adalah…`, ['40 orang', '50 orang', '60 orang', '70 orang'], 2, 'Terbanyak 120 (Rabu), tersedikit 60 (Kamis). Selisih 60 orang.'],
  ['dat', `${T2}\n\nRata-rata pengunjung per hari adalah…`, ['85 orang', '90 orang', '95 orang', '100 orang'], 1, '(80 + 100 + 120 + 60 + 90) ÷ 5 = 450 ÷ 5 = 90 orang.'],
  ['dat', `${T2}\n\nHari yang jumlah pengunjungnya di atas rata-rata adalah…`, ['Senin dan Kamis', 'Selasa dan Rabu', 'Rabu dan Jumat', 'Senin dan Jumat'], 1, 'Rata-rata 90. Yang di atas 90 adalah Selasa (100) dan Rabu (120); Jumat tepat 90.'],
  ['dat', `${T2}\n\nPersentase pengunjung hari Selasa terhadap total seminggu adalah…`, ['18%', '20%', '22%', '25%'], 2, '100 ÷ 450 ≈ 22,2%, mendekati 22%.'],
  ['dat', `${T2}\n\nJika pengunjung Kamis naik 50%, berapa jumlahnya?`, ['80 orang', '90 orang', '100 orang', '110 orang'], 1, '60 × 1,5 = 90 orang.'],
  ['dat', `${T3}\n\nRata-rata nilai kelima siswa adalah…`, ['78', '80', '82', '84'], 1, '(70 + 85 + 90 + 75 + 80) ÷ 5 = 400 ÷ 5 = 80.'],
  ['dat', `${T3}\n\nNilai tengah (median) dari data tersebut adalah…`, ['75', '80', '85', '90'], 1, 'Urut: 70, 75, 80, 85, 90. Nilai tengahnya 80.'],
  ['dat', `${T3}\n\nBanyak siswa yang nilainya di atas rata-rata adalah…`, ['1 siswa', '2 siswa', '3 siswa', '4 siswa'], 1, 'Rata-rata 80. Di atas 80: Budi (85) dan Citra (90).'],
  ['dat', `${T3}\n\nSelisih nilai tertinggi dan terendah (jangkauan) adalah…`, ['15', '20', '25', '30'], 1, '90 − 70 = 20.'],
  ['dat', `${T3}\n\nJika setiap nilai ditambah 5, rata-rata baru menjadi…`, ['80', '83', '85', '90'], 2, 'Penambahan konstan menggeser rata-rata dengan jumlah yang sama: 80 + 5 = 85.'],
  ['dat', `${T4}\n\nAnggaran untuk riset adalah…`, ['Rp160 juta', 'Rp200 juta', 'Rp240 juta', 'Rp320 juta'], 1, '25% × 800 juta = 200 juta.'],
  ['dat', `${T4}\n\nSelisih anggaran operasional dan beasiswa adalah…`, ['Rp120 juta', 'Rp140 juta', 'Rp160 juta', 'Rp180 juta'], 2, '40% − 20% = 20% dari 800 juta = 160 juta.'],
  ['dat', `${T4}\n\nSudut juring untuk beasiswa pada diagram lingkaran adalah…`, ['54°', '60°', '72°', '90°'], 2, '20% × 360° = 72°.'],
  ['dat', `${T4}\n\nJika anggaran riset dinaikkan Rp40 juta dari pos operasional, persentase riset menjadi…`, ['27%', '28%', '30%', '32%'], 2, 'Riset menjadi 200 + 40 = 240 juta, yaitu 240/800 = 30%.'],
  ['dat', `${T4}\n\nPos dengan anggaran terkecil adalah…`, ['Operasional', 'Riset', 'Beasiswa', 'Lainnya'], 3, 'Pos "Lainnya" hanya 15%, terkecil di antara keempat pos.'],
  ['dat', `${T5}\n\nKenaikan pendapatan dari 2021 ke 2023 adalah…`, ['30%', '40%', '50%', '60%'], 2, '(300 − 200)/200 = 50%.'],
  ['dat', `${T5}\n\nPendapatan tahun 2024 dibandingkan 2023 mengalami…`, ['Kenaikan 10%', 'Penurunan 10%', 'Kenaikan 30%', 'Penurunan 30%'], 1, '(270 − 300)/300 = −10%, yaitu turun 10%.'],
  ['dat', `${T5}\n\nRata-rata pendapatan 2021–2024 adalah…`, ['245', '255', '260', '270'], 1, '(200 + 250 + 300 + 270) ÷ 4 = 1020 ÷ 4 = 255 juta.'],
  ['dat', `${T5}\n\nTahun dengan persentase kenaikan pendapatan tertinggi dibanding tahun sebelumnya adalah…`, ['2021', '2022', '2023', '2024'], 1, 'Kenaikan 2022 = 50/200 = 25%; 2023 = 50/250 = 20%; 2024 turun; 2021 tidak punya tahun pembanding. Tertinggi pada 2022.'],
  ['dat', `${T5}\n\nPerbandingan pendapatan 2021 dengan 2023 adalah…`, ['2 : 3', '3 : 2', '4 : 5', '5 : 6'], 0, '200 : 300 = 2 : 3.'],
  ['dat', 'Tabel jumlah mahasiswa per program studi:\nInformatika = 240 | Sistem Informasi = 160 | Teknik Komputer = 100 | Bisnis Digital = 100\n\nPersentase mahasiswa Informatika adalah…', ['35%', '40%', '45%', '50%'], 1, 'Total 600. 240 ÷ 600 = 40%.'],
  ['dat', 'Tabel jumlah mahasiswa per program studi:\nInformatika = 240 | Sistem Informasi = 160 | Teknik Komputer = 100 | Bisnis Digital = 100\n\nPerbandingan Sistem Informasi terhadap Teknik Komputer adalah…', ['3 : 2', '8 : 5', '5 : 4', '2 : 1'], 1, '160 : 100 = 8 : 5.'],
  ['dat', 'Grafik garis suhu harian (°C): Senin 30, Selasa 32, Rabu 31, Kamis 35, Jumat 33.\n\nHari dengan kenaikan suhu terbesar dibanding hari sebelumnya adalah…', ['Selasa', 'Rabu', 'Kamis', 'Jumat'], 2, 'Kenaikan: Selasa +2, Rabu −1, Kamis +4, Jumat −2. Terbesar pada Kamis.'],
  ['dat', 'Dua toko mencatat penjualan (unit):\nToko A: Jan 50, Feb 60, Mar 70\nToko B: Jan 80, Feb 70, Mar 60\n\nTotal penjualan kedua toko selama Januari–Maret adalah…', ['380 unit', '390 unit', '400 unit', '410 unit'], 1, 'Toko A = 180 dan Toko B = 210. Total = 390 unit.'],
  ['dat', 'Tabel waktu tempuh (menit) ke kampus oleh enam mahasiswa: 15, 20, 20, 25, 30, 50.\n\nUkuran pemusatan yang paling baik menggambarkan data tersebut karena adanya nilai ekstrem 50 adalah…', ['Rata-rata', 'Median', 'Jangkauan', 'Jumlah'], 1, 'Median (22,5) lebih tahan terhadap nilai ekstrem dibanding rata-rata (26,7).'],
]
