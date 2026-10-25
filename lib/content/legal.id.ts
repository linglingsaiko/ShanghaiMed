import type { LegalDoc } from './types'

// Bahasa Indonesia legal / policy content. Brand names, registration numbers,
// email and legal identifiers retained in Latin; Western (0-9) digits used.

export const legalIdContact = {
  company: 'Shanghai Keling Information Technology Co., Ltd.',
  address: 'Kamar 101, Lantai 1, No. 2555 Jalan Changyang, Distrik Yangpu, Shanghai, Tiongkok',
  email: 'hello@shanghaimedhealth.com',
  label: 'Email:',
}

export const legalId: Record<string, LegalDoc> = {
  privacy: {
    title: 'Kebijakan Privasi',
    lastUpdated: 'Terakhir diperbarui: 12 Oktober 2026',
    sections: [
      {
        title: '1. Siapa kami',
        body: [
          'ShanghaiMed dioperasikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), sebuah perseroan terbatas yang terdaftar di Shanghai, Tiongkok, nomor registrasi 91310110MAKDNY7H7W. Alamat terdaftar kami adalah Kamar 101, Lantai 1, No. 2555 Jalan Changyang, Distrik Yangpu, Shanghai. Kami menyediakan layanan koordinasi perjalanan medis dan navigasi pasien untuk pasien internasional yang mencari perawatan medis di Shanghai.',
          'Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi, termasuk informasi terkait kesehatan, saat Anda menggunakan situs web kami (shanghaimedhealth.com) atau menggunakan layanan kami. Dengan menggunakan situs web atau layanan kami, Anda menyetujui Kebijakan ini.',
        ],
      },
      {
        title: '2. Informasi yang kami kumpulkan',
        subsections: [
          { sub: 'Data identitas dan kontak', items: ['Nama, alamat email, nomor telepon, kewarganegaraan, rincian paspor atau identitas nasional (jika diperlukan untuk visa atau pendaftaran rumah sakit), dan informasi kontak darurat.'] },
          { sub: 'Informasi kesehatan', items: ['Rekam medis, laporan, citra, diagnosis, dan riwayat pengobatan yang Anda berikan secara sukarela kepada kami agar kami dapat menilai kasus Anda dan mencocokkan Anda dengan rumah sakit serta spesialis yang sesuai. Informasi kesehatan adalah data pribadi yang sensitif dan hanya diproses dengan persetujuan eksplisit Anda.'] },
          { sub: 'Informasi pemesanan dan perjalanan', items: ['Tanggal perjalanan yang diinginkan, rincian akomodasi, dan hal-hal terkait visa yang diperlukan untuk mengoordinasikan kunjungan Anda.'] },
          { sub: 'Informasi pembayaran', items: ['Kami tidak menyimpan nomor kartu kredit atau debit lengkap di server kami. Pembayaran kartu diproses oleh penyedia layanan pembayaran berlisensi (seperti Airwallex dan/atau PayPal), yang mematuhi Standar Keamanan Data Industri Kartu Pembayaran (PCI DSS).'] },
          { sub: 'Informasi teknis', items: ['Alamat IP, jenis peramban, informasi perangkat, dan data penggunaan yang dikumpulkan melalui cookie dan alat serupa untuk menjaga situs tetap aman dan berfungsi.'] },
        ],
      },
      {
        title: '3. Bagaimana kami menggunakan informasi Anda',
        items: [
          'Menilai kasus Anda dan mencocokkan rumah sakit serta spesialis;',
          'Menjadwalkan janji temu, interpretasi, dan pendampingan di lokasi;',
          'Mendukung permohonan visa medis dan logistik perjalanan;',
          'Memproses biaya koordinasi layanan dan menerbitkan faktur;',
          'Berkomunikasi dengan Anda sebelum, selama, dan setelah kunjungan Anda;',
          'Memenuhi kewajiban hukum, akuntansi, pajak, dan peraturan.',
        ],
      },
      {
        title: '4. Kepada siapa kami membagikan informasi',
        items: [
          'Rumah sakit publik berlisensi dan dokter yang merawat Anda di Tiongkok, secara ketat berdasarkan kebutuhan untuk mengetahui;',
          'Pemroses pembayaran berlisensi untuk menagih biaya layanan;',
          'Penyedia visa, perjalanan, dan akomodasi jika diperlukan untuk mengatur kunjungan Anda;',
          'Penasihat profesional dan otoritas pemerintah jika diwajibkan oleh hukum Tiongkok atau hukum yang berlaku.',
        ],
        closing: 'Kami tidak menjual informasi pribadi Anda. Kami tidak membagikan informasi Anda kepada pihak ketiga untuk tujuan pemasaran.',
      },
      {
        title: '5. Transfer data internasional',
        body: ['Untuk menyampaikan layanan kami, informasi Anda ditransfer ke dan diproses di Tiongkok daratan. Kami menggunakan pengamanan kontraktual dan teknis yang sesuai untuk melindungi informasi dalam transit dan saat disimpan, selaras dengan persyaratan perlindungan data yang berlaku.'],
      },
      {
        title: '6. Retensi data',
        body: ['Kami menyimpan informasi pribadi dan kesehatan selama diperlukan untuk menyampaikan layanan dan untuk memenuhi kewajiban retensi hukum, pajak, akuntansi, dan rekam medis, setelah itu informasi akan dihapus atau dianonimkan secara aman.'],
      },
      {
        title: '7. Hak-hak Anda',
        body: ['Anda dapat meminta akses ke, koreksi atas, atau penghapusan informasi pribadi Anda (tergantung pada kewajiban retensi hukum), dan Anda dapat menarik persetujuan terhadap pemrosesan kapan saja dengan menghubungi kami. Kami akan merespons dalam jangka waktu yang wajar sebagaimana diwajibkan oleh hukum.'],
      },
      {
        title: '8. Keamanan',
        body: ['Kami menggunakan pengamanan administratif, teknis, dan fisik — termasuk transmisi terenkripsi (HTTPS), kontrol akses berdasarkan kebutuhan untuk mengetahui, dan tinjauan keamanan rutin — untuk melindungi informasi Anda. Tidak ada metode transmisi atau penyimpanan yang 100% aman, tetapi kami mengambil langkah-langkah yang wajar sesuai dengan sensitivitas data.'],
      },
      {
        title: '9. Cookie',
        body: ['Kami menggunakan cookie esensial untuk menjaga situs web tetap berfungsi dan dapat menggunakan cookie analitik terbatas untuk memahami bagaimana pengunjung menggunakan situs. Anda dapat mengontrol cookie melalui pengaturan peramban; menonaktifkan cookie esensial dapat memengaruhi fungsi situs.'],
      },
      {
        title: '10. Anak-anak',
        body: ['Layanan kami tidak ditujukan untuk anak-anak di bawah usia 18 tahun. Informasi mengenai anak di bawah umur yang bepergian dengan pasien atau merupakan pasien sendiri hanya diproses dengan persetujuan orang tua atau wali yang sah.'],
      },
      {
        title: '11. Perubahan pada Kebijakan ini',
        body: ['Kami dapat memperbarui Kebijakan ini dari waktu ke waktu. Tanggal di bagian atas halaman menunjukkan pembaruan terakhir. Perubahan material akan ditonjolkan di situs.'],
      },
      { title: '12. Kontak', contact: true },
    ],
  },

  terms: {
    title: 'Syarat Layanan',
    lastUpdated: 'Terakhir diperbarui: 12 Oktober 2026',
    sections: [
      {
        title: '1. Siapa kami',
        body: ['ShanghaiMed dioperasikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), perseroan terbatas yang terdaftar di Shanghai, Tiongkok dengan nomor registrasi 91310110MAKDNY7H7W. ShanghaiMed adalah layanan koordinasi perjalanan medis dan navigasi pasien. Kami BUKAN rumah sakit, klinik, atau institusi medis.'],
      },
      {
        title: '2. Penerimaan syarat',
        body: ['Dengan mengakses https://shanghaimedhealth.com ("Situs Web") atau menggunakan layanan ShanghaiMed, termasuk pembayaran deposit apa pun atau biaya koordinasi, Anda setuju untuk terikat oleh Syarat Layanan ini serta Kebijakan Privasi kami. Jika Anda tidak setuju, mohon jangan menggunakan Situs Web atau layanan kami.'],
      },
      {
        title: '3. Layanan kami',
        body: ['ShanghaiMed mengatur dan mengoordinasikan, atas nama Anda:'],
        items: [
          'Peninjauan dan penerjemahan profesional rekam medis;',
          'Mencocokkan kasus Anda dengan rumah sakit publik Tiongkok dan spesialis berlisensi yang sesuai;',
          'Penjadwalan janji temu dan estimasi biaya;',
          'Dukungan surat undangan visa medis dan logistik perjalanan/akomodasi;',
          'Pendampingan dan interpretasi bilingual secara tatap muka selama kunjungan rumah sakit;',
          'Koordinasi tindak lanjut pasca kunjungan.',
        ],
      },
      {
        title: '4. Penafian medis penting',
        callout: 'Penafian medis penting',
        items: [
          'ShanghaiMed TIDAK memberikan diagnosis medis, pengobatan, pembedahan, resep, pengujian, atau layanan klinis apa pun. Semua keputusan klinis, diagnosis, dan pengobatan dibuat secara independen oleh rumah sakit yang merawat dan dokter berlisensinya di bawah tanggung jawab dan lisensi mereka sendiri.',
          'Informasi yang diberikan melalui Situs Web atau staf kami adalah untuk koordinasi, perencanaan, dan informasi umum saja dan bukan pengganti saran medis profesional, diagnosis, atau pengobatan dari dokter yang berkualifikasi.',
          'Hasil medis, waktu tunggu, rencana pengobatan, dan biaya tidak dapat dijamin. Diagnosis akhir, rencana pengobatan, dan biaya ditentukan oleh rumah sakit yang merawat setelah evaluasi tatap muka.',
          'Dalam keadaan darurat medis, segera hubungi layanan darurat setempat. Di Tiongkok daratan, hubungi 120 untuk ambulans dan perawatan darurat.',
        ],
      },
      {
        title: '5. Pengikatan, penawaran, dan pembayaran',
        items: [
          'Penawaran tertulis dan rencana layanan akan diberikan kepada Anda sebelum pembayaran apa pun jatuh tempo.',
          'Deposit pemesanan diperlukan untuk mengamankan janji temu dan memulai koordinasi. Ketentuan spesifik, termasuk jumlah deposit dan ketentuan yang berlaku, dirinci dalam perjanjian layanan individu Anda.',
          'Biaya koordinasi dapat dibayar melalui tautan pembayaran kartu atau metode transfer bank internasional yang kami sediakan. Biaya rumah sakit dan klinis dibayarkan langsung ke rumah sakit yang merawat dan tidak pernah dikumpulkan atau disimpan oleh ShanghaiMed.',
          'Faktur diterbitkan oleh Shanghai Keling Information Technology Co., Ltd. sesuai dengan hukum Tiongkok.',
        ],
      },
      {
        title: '6. Tanggung jawab Anda',
        items: [
          'Memberikan informasi, rekam medis, dan dokumen identitas/visa yang akurat, lengkap, dan asli;',
          'Memperoleh visa dan dokumen perjalanan yang sah untuk masuk ke Tiongkok; memperoleh asuransi perjalanan dan/atau medis yang sesuai sebagaimana Anda anggap tepat;',
          'Membuat keputusan sendiri, dalam konsultasi dengan dokter yang merawat, tentang apakah akan melanjutkan pengobatan apa pun yang direkomendasikan oleh rumah sakit;',
          'Membayar biaya rumah sakit serta biaya perjalanan, akomodasi, dan hidup Anda sendiri secara langsung;',
          'Mematuhi hukum Republik Rakyat Tiongkok dan peraturan rumah sakit yang Anda kunjungi.',
        ],
      },
      {
        title: '7. Ketersediaan layanan dan perilaku',
        body: ['Kami dapat menolak atau menghentikan layanan jika terjadi perilaku yang tidak aman, melanggar hukum, kasar, atau penipuan, atau jika permintaan berada di luar cakupan koordinasi kami — misalnya permintaan untuk mencari zat yang dikendalikan, obat resep saja atau perangkat medis, atau permintaan untuk memfasilitasi aktivitas klinis tanpa izin.'],
      },
      {
        title: '8. Pembatalan dan penjadwalan ulang',
        body: ['Ketentuan pembatalan dan penjadwalan ulang dirinci dalam perjanjian layanan individu Anda. Anda sebaiknya mengonfirmasi pemesanan perjalanan hanya setelah janji temu rumah sakit dikonfirmasi secara tertulis oleh ShanghaiMed.'],
      },
      {
        title: '9. Kekayaan intelektual',
        body: ['Konten situs web, merek dagang, materi, dan dokumen layanan adalah milik Shanghai Keling Information Technology Co., Ltd. dan tidak boleh disalin, direproduksi, atau didistribusikan ulang tanpa izin tertulis kami sebelumnya.'],
      },
      {
        title: '10. Tautan pihak ketiga dan situs web rumah sakit',
        body: ['Situs Web mungkin berisi tautan ke situs web pihak ketiga, termasuk rumah sakit dan penyedia perjalanan. Kami tidak bertanggung jawab atas konten, akurasi, atau praktik situs pihak ketiga. Layanan yang ditautkan disediakan oleh pihak ketiga independen di bawah syarat mereka sendiri.'],
      },
      {
        title: '11. Batasan tanggung jawab',
        items: [
          'Sejauh maksimum yang diizinkan oleh hukum yang berlaku, total tanggung jawab agregat Shanghai Keling Information Technology Co., Ltd. terkait dengan layanan koordinasi kami terbatas pada biaya koordinasi yang benar-benar telah dibayar oleh Anda kepada kami.',
          'Kami tidak bertanggung jawab atas hasil klinis, atau atas tindakan atau kelalaian rumah sakit, dokter, otoritas visa, maskapai penerbangan, hotel, atau pihak ketiga lainnya.',
          'Kami tidak bertanggung jawab atas peristiwa force majeure (termasuk namun tidak terbatas pada bencana alam, epidemi, tindakan pemerintah, gangguan transportasi, atau kerusuhan sipil) yang mencegah atau menunda penyampaian layanan.',
          'Kami tidak bertanggung jawab atas kerugian tidak langsung, konsekuensial, atau hukuman, termasuk kehilangan keuntungan, kehilangan peluang, atau tekanan emosional.',
          'Tidak ada dalam Syarat ini yang mengecualikan tanggung jawab yang tidak dapat dikecualikan berdasarkan hukum yang berlaku, termasuk tanggung jawab atas kematian atau cedera pribadi yang disebabkan oleh kelalaian kami, penipuan, atau tanggung jawab lain yang tidak dapat dibatasi oleh hukum.',
        ],
      },
      {
        title: '12. Ganti rugi',
        body: ['Anda setuju untuk mengganti kerugian ShanghaiMed atas kerugian, tuntutan, atau liabilitas yang timbul dari pelanggaran Anda sendiri terhadap Syarat ini, pemberian informasi palsu atau menyesatkan oleh Anda, atau keputusan Anda mengenai pengobatan klinis atau perjalanan.'],
      },
      {
        title: '13. Hukum dan bahasa yang mengatur',
        body: ['Syarat ini diatur oleh hukum Republik Rakyat Tiongkok. Versi Bahasa Inggris ini disediakan untuk kenyamanan Anda; jika terjadi ketidaksesuaian, versi bahasa Tiongkok yang berlaku sejauh yang diwajibkan oleh hukum yang berlaku.'],
      },
      {
        title: '14. Penyelesaian sengketa',
        body: ['Para pihak akan terlebih dahulu berupaya menyelesaikan sengketa melalui negosiasi itikad baik dalam waktu 30 hari sejak pemberitahuan tertulis. Jika tidak terselesaikan, sengketa akan diajukan ke Pengadilan Rakyat yang berwenang di Distrik Yangpu, Shanghai, Tiongkok (atau pengadilan lain yang memiliki yurisdiksi menurut undang-undang atas pilihan penggugat).'],
      },
      {
        title: '15. Perubahan pada Syarat ini',
        body: ['Kami dapat memperbarui Syarat ini dari waktu ke waktu. Versi yang diterbitkan di Situs Web pada tanggal Anda menggunakan layanan kami berlaku untuk pengikatan tersebut. Penggunaan Situs Web secara berkelanjutan setelah perubahan diposting merupakan penerimaan atas Syarat yang diperbarui.'],
      },
      { title: '16. Kontak', contact: true },
    ],
  },

  refund: {
    title: 'Kebijakan Pengembalian Dana',
    lastUpdated: 'Terakhir diperbarui: 25 Oktober 2026',
    sections: [
      {
        title: '1. Komitmen kami terhadap transparansi',
        body: [
          'Kami percaya bahwa Anda berhak tahu persis apa yang Anda bayar — dan apa yang terjadi jika segala sesuatu tidak berjalan sesuai rencana — sebelum Anda berkomitmen pada apapun.',
          'Berikut adalah cara proses kami berfungsi:',
        ],
        items: [
          'Anda menerima rencana perawatan lengkap, rekomendasi rumah sakit, dan rincian estimasi biaya — sebelum pembayaran apapun diminta.',
          'Deposit pemesanan hanya diperlukan setelah Anda meninjau dan mengkonfirmasi rencana Anda secara tertulis.',
          'Perjanjian layanan individu Anda — termasuk jumlah deposit, cakupan layanan, dan ketentuan pengembalian dana spesifik — disiapkan dan ditandatangani sebelum pembayaran apapun dilakukan.',
          'Biaya rumah sakit dan klinik selalu dibayar langsung ke rumah sakit yang menangani. ShanghaiMed tidak mengumpulkan atau menyimpan biaya medis.',
        ],
      },
      {
        title: '2. Prinsip pengembalian dana umum',
        body: [
          'Kami menangani pengembalian dana secara adil dan transparan. Satu prinsip berlaku di semua situasi: biaya yang telah dikeluarkan (komitmen pihak ketiga dan pekerjaan koordinasi yang telah diselesaikan) dipotong pada biaya aktual, dan sisa saldo dikembalikan.',
          '«Koordinasi dimulai» ketika kami pertama kali melaksanakan pekerjaan koordinasi atas nama Anda — contohnya: menerjemahkan catatan medis Anda, menghubungi rumah sakit, atau menjadwalkan janji temu.',
        ],
        table: {
          headers: ['Situasi', 'Pendekatan pengembalian'],
          rows: [
            { cells: ['Jika Anda membatalkan sebelum koordinasi dimulai', 'Deposit dikembalikan sepenuhnya, dikurangi biaya pemrosesan pembayaran (biasanya 2–4%).'] },
            { cells: ['Jika Anda membatalkan setelah koordinasi dimulai', 'Biaya aktual yang telah dikeluarkan atas nama Anda — penjadwalan janji temu, terjemahan catatan medis, koordinasi administratif — dipotong pada biaya aktual. Sisa saldo dikembalikan dengan rincian terperinci.'] },
            { cells: ['Jika rumah sakit menolak kasus Anda', 'Sisa saldo dikembalikan dikurangi biaya aktual yang dikeluarkan hingga titik tersebut.'] },
            { cells: ['Jika rencana perawatan dianggap tidak sesuai', 'Sisa saldo dikembalikan dikurangi biaya aktual yang dikeluarkan hingga titik tersebut.'] },
            { cells: ['Jika visa Anda ditolak', 'Tidak ada pihak yang bersalah. Komitmen pihak ketiga yang telah dikunci atas nama Anda (misalnya, transportasi khusus, janji temu diagnostik yang dipesan sebelumnya) dipotong pada biaya aktual; pekerjaan koordinasi yang diselesaikan dipotong pada biaya aktual; sisa saldo dikembalikan.'] },
            { cells: ['Force majeure', 'Bencana alam, wabah, pembatasan perjalanan pemerintah, dan peristiwa serupa di luar kendali kedua belah pihak ditangani berdasarkan prinsip yang sama: biaya pihak ketiga pada biaya aktual, pekerjaan koordinasi pada biaya aktual, sisa dikembalikan.'] },
          ],
        },
      },
      {
        title: '3. Komitmen pihak ketiga yang tidak dapat dikembalikan',
        body: [
          'Beberapa layanan mengharuskan kami mengamankan pemesanan dengan penyedia pihak ketiga sebelumnya. Setelah pemesanan ini dikunci, biaya yang terkait tidak dapat dikembalikan, karena pihak ketiga telah memesan sumber daya atas nama Anda. Ini meliputi:',
        ],
        items: [
          'Transportasi medis khusus atau kendaraan aksesibel yang disusun khusus untuk kunjungan Anda;',
          'Janji temu diagnostik atau laboratorium yang dipesan sebelumnya dengan slot terbatas;',
          'Komitmen pihak ketiga lainnya yang memerlukan pemesanan sebelumnya dan dirincikan secara jelas dalam perjanjian layanan Anda.',
        ],
        closing: 'Pos-pos ini selalu diungkapkan dalam perjanjian layanan individu Anda sebelum pembayaran. Anda akan melihat dengan tepat pos mana yang tidak dapat dikembalikan sebelum Anda menandatangani.',
      },
      {
        title: '4. Perjanjian layanan individu Anda berlaku',
        body: [
          'Prinsip-prinsip di atas mencerminkan pendekatan umum kami. Ketentuan pengembalian dana spesifik Anda — termasuk jumlah deposit, pos yang dapat dan tidak dapat dikembalikan, jangka waktu, dan kondisi yang berlaku — dirinci dalam perjanjian layanan individu Anda.',
          'Perjanjian ini:',
        ],
        items: [
          'Disiapkan setelah rencana perawatan Anda dikonfirmasi;',
          'Dikirim kepada Anda untuk ditinjau sebelum pembayaran jatuh tempo;',
          'Ditandatangani oleh kedua belah pihak sebelum koordinasi dimulai.',
        ],
        closing: 'Jika terdapat perbedaan antara kebijakan umum ini dan perjanjian layanan yang Anda tandatangani, perjanjian layanan mendahului.',
      },
      {
        title: '5. Cara mengajukan pengembalian dana',
        body: [
          'Untuk mengajukan pengembalian dana, hubungi kami secara tertulis melalui email di hello@shanghaimedhealth.com atau melalui saluran dukungan WhatsApp khusus Anda. Mohon sertakan:',
        ],
        items: [
          'Nama lengkap dan referensi pemesanan Anda;',
          'Alasan pengajuan pengembalian dana;',
          'Dokumen pendukung yang relevan (misalnya, pemberitahuan penolakan visa, penilaian medis).',
        ],
        closing: 'Kami mengakui permohonan pengembalian dana dalam waktu 2 hari kerja dan memproses pengembalian dana yang disetujui dalam waktu 5 hari kerja.',
      },
      { title: '6. Kontak', contact: true },
    ],
  },
}
