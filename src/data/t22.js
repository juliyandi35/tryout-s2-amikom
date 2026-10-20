// [topik, soal, [opsi A-D], indeks jawaban benar, pembahasan]
// Modul TKA 09 (Set B): Interpretasi Data (tabel dan grafik ditulis dalam teks)
const T1 = 'Produksi pabrik (ton) per bulan:\nJanuari = 40 | Februari = 55 | Maret = 65 | April = 50 | Mei = 70'
const T2 = 'Biaya hidup bulanan seorang mahasiswa (ribu rupiah):\nSewa = 900 | Makan = 1.200 | Transportasi = 300 | Pulsa = 100 | Lainnya = 500'
const T3 = 'Nilai ujian enam siswa:\n60 | 70 | 70 | 80 | 90 | 90'
const T4 = 'Penjualan dua produk (unit) per kuartal:\nProduk A: K1 = 100 | K2 = 120 | K3 = 150 | K4 = 130\nProduk B: K1 = 90 | K2 = 110 | K3 = 100 | K4 = 160'
const T5 = 'Jumlah pendaftar per jalur seleksi:\nPrestasi = 300 | Reguler = 500 | Beasiswa = 100 | Transfer = 100'
const T6 = 'Suhu harian (°C):\nSenin = 28 | Selasa = 30 | Rabu = 29 | Kamis = 33 | Jumat = 31'

export default [
  ['dat', `${T1}\n\nBulan dengan produksi tertinggi adalah…`, ['Februari', 'Maret', 'April', 'Mei'], 3, 'Produksi tertinggi 70 ton pada bulan Mei.'],
  ['dat', `${T1}\n\nTotal produksi lima bulan adalah…`, ['270 ton', '280 ton', '290 ton', '300 ton'], 1, '40 + 55 + 65 + 50 + 70 = 280 ton.'],
  ['dat', `${T1}\n\nRata-rata produksi per bulan adalah…`, ['52 ton', '54 ton', '56 ton', '58 ton'], 2, '280 ÷ 5 = 56 ton.'],
  ['dat', `${T1}\n\nBanyak bulan dengan produksi di atas rata-rata adalah…`, ['1 bulan', '2 bulan', '3 bulan', '4 bulan'], 1, 'Rata-rata 56. Di atasnya: Maret (65) dan Mei (70).'],
  ['dat', `${T1}\n\nPersentase kenaikan produksi dari Januari ke Februari adalah…`, ['30%', '37,5%', '40%', '45%'], 1, '(55 − 40)/40 = 37,5%.'],
  ['dat', `${T1}\n\nPerbandingan produksi Januari dengan Mei adalah…`, ['3 : 5', '4 : 7', '5 : 8', '2 : 3'], 1, '40 : 70 = 4 : 7.'],
  ['dat', `${T2}\n\nTotal biaya hidup per bulan adalah…`, ['Rp2.800.000', 'Rp3.000.000', 'Rp3.200.000', 'Rp3.500.000'], 1, '900 + 1.200 + 300 + 100 + 500 = 3.000 ribu = Rp3.000.000.'],
  ['dat', `${T2}\n\nPersentase biaya makan terhadap total adalah…`, ['30%', '35%', '40%', '45%'], 2, '1.200 ÷ 3.000 = 40%.'],
  ['dat', `${T2}\n\nSudut juring untuk biaya sewa pada diagram lingkaran adalah…`, ['90°', '108°', '120°', '135°'], 1, '900/3.000 = 30%; 30% × 360° = 108°.'],
  ['dat', `${T2}\n\nSelisih biaya makan dan biaya transportasi adalah…`, ['Rp700.000', 'Rp800.000', 'Rp900.000', 'Rp1.000.000'], 2, '1.200 − 300 = 900 ribu.'],
  ['dat', `${T2}\n\nJika biaya transportasi naik 50%, total biaya hidup per bulan menjadi…`, ['Rp3.050.000', 'Rp3.100.000', 'Rp3.150.000', 'Rp3.300.000'], 2, 'Kenaikan 50% × 300 = 150 ribu. Total baru 3.150 ribu.'],
  ['dat', `${T2}\n\nBiaya dengan persentase terkecil terhadap total adalah…`, ['Sewa', 'Transportasi', 'Pulsa', 'Lainnya'], 2, 'Pulsa hanya 100 ribu, terkecil di antara kelima pos.'],
  ['dat', `${T3}\n\nMedian dari nilai tersebut adalah…`, ['70', '75', '80', '85'], 1, 'Data terurut dengan 6 nilai: median = (70 + 80)/2 = 75.'],
  ['dat', `${T3}\n\nRata-rata nilai (dibulatkan satu desimal) adalah…`, ['75,0', '76,7', '78,3', '80,0'], 1, 'Jumlah 460 ÷ 6 ≈ 76,7.'],
  ['dat', `${T3}\n\nJangkauan data tersebut adalah…`, ['20', '30', '40', '50'], 1, '90 − 60 = 30.'],
  ['dat', `${T3}\n\nBanyak siswa yang nilainya di atas median adalah…`, ['2 siswa', '3 siswa', '4 siswa', '5 siswa'], 1, 'Median 75; nilai di atasnya adalah 80, 90, 90, yaitu 3 siswa.'],
  ['dat', `${T4}\n\nTotal penjualan Produk A selama setahun adalah…`, ['480 unit', '500 unit', '520 unit', '540 unit'], 1, '100 + 120 + 150 + 130 = 500 unit.'],
  ['dat', `${T4}\n\nTotal penjualan Produk B selama setahun adalah…`, ['440 unit', '450 unit', '460 unit', '470 unit'], 2, '90 + 110 + 100 + 160 = 460 unit.'],
  ['dat', `${T4}\n\nKuartal dengan selisih penjualan Produk A dan B terbesar adalah…`, ['K1', 'K2', 'K3', 'K4'], 2, 'Selisih: K1 = 10, K2 = 10, K3 = 50, K4 = 30. Terbesar K3.'],
  ['dat', `${T4}\n\nPersentase kenaikan penjualan Produk B dari K3 ke K4 adalah…`, ['40%', '50%', '60%', '70%'], 2, '(160 − 100)/100 = 60%.'],
  ['dat', `${T4}\n\nRata-rata penjualan Produk A per kuartal adalah…`, ['120 unit', '125 unit', '130 unit', '135 unit'], 1, '500 ÷ 4 = 125 unit.'],
  ['dat', `${T5}\n\nPersentase pendaftar jalur reguler adalah…`, ['40%', '45%', '50%', '55%'], 2, 'Total 1.000. 500/1.000 = 50%.'],
  ['dat', `${T5}\n\nPerbandingan pendaftar jalur prestasi dengan beasiswa adalah…`, ['2 : 1', '3 : 1', '4 : 1', '5 : 2'], 1, '300 : 100 = 3 : 1.'],
  ['dat', `${T5}\n\nJika 40% pendaftar jalur prestasi diterima, banyak yang diterima adalah…`, ['100 orang', '110 orang', '120 orang', '150 orang'], 2, '40% × 300 = 120 orang.'],
  ['dat', `${T5}\n\nSudut juring untuk jalur prestasi pada diagram lingkaran adalah…`, ['90°', '100°', '108°', '120°'], 2, '300/1.000 = 30%; 30% × 360° = 108°.'],
  ['dat', `${T5}\n\nSelisih pendaftar jalur reguler dan prestasi adalah…`, ['100 orang', '150 orang', '200 orang', '250 orang'], 2, '500 − 300 = 200 orang.'],
  ['dat', `${T6}\n\nHari dengan kenaikan suhu terbesar dibanding hari sebelumnya adalah…`, ['Selasa', 'Rabu', 'Kamis', 'Jumat'], 2, 'Kenaikan: Selasa +2, Rabu −1, Kamis +4, Jumat −2. Terbesar pada Kamis.'],
  ['dat', `${T6}\n\nRata-rata suhu selama lima hari adalah…`, ['29,8 °C', '30,2 °C', '30,6 °C', '31,0 °C'], 1, '(28 + 30 + 29 + 33 + 31) ÷ 5 = 151 ÷ 5 = 30,2 °C.'],
  ['dat', `${T6}\n\nBanyak hari dengan suhu di atas rata-rata adalah…`, ['1 hari', '2 hari', '3 hari', '4 hari'], 1, 'Rata-rata 30,2. Di atasnya: Kamis (33) dan Jumat (31).'],
]
