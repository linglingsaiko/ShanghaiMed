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
        body: ['Dengan mengakses https://shanghaimedhealth.com ("Situs Web") atau menggunakan layanan ShanghaiMed, termasuk pembayaran deposit atau biaya koordinasi apa pun, Anda setuju untuk terikat oleh Syarat Layanan ini serta Kebijakan Privasi dan Kebijakan Pengembalian Dana kami. Jika Anda tidak setuju, mohon jangan menggunakan Situs Web atau layanan kami.'],
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
          'Deposit pemesanan diperlukan untuk mengamankan slot spesialis, janji temu rumah sakit, ketersediaan penerjemah, dan jendela perjalanan yang disepakati. Pengikatan hanya dikonfirmasi setelah Deposit diterima oleh ShanghaiMed. Ketentuan deposit dan pengembalian dana diatur dalam Kebijakan Pengembalian Dana kami.',
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
        body: ['Ketentuan pembatalan dan penjadwalan ulang diatur dalam Kebijakan Pengembalian Dana kami. Anda sebaiknya mengonfirmasi pemesanan perjalanan hanya setelah janji temu rumah sakit dikonfirmasi secara tertulis oleh ShanghaiMed.'],
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
    lastUpdated: 'Terakhir diperbarui: 12 Oktober 2026',
    sections: [
      {
        title: '1. Ruang lingkup',
        body: [
          'Kebijakan Pengembalian Dana ini berlaku untuk biaya koordinasi layanan yang dikenakan oleh ShanghaiMed (Shanghai Keling Information Technology Co., Ltd.). Kebijakan ini TIDAK berlaku untuk biaya yang dikenakan langsung oleh rumah sakit, dokter, klinik, atau penyedia pihak ketiga lainnya (misalnya pemeriksaan, pengobatan, obat-obatan, pendaftaran, atau deposit rumah sakit), yang dibayar oleh pasien langsung ke rumah sakit yang merawat sesuai aturan pengembalian dana dan penagihan rumah sakit itu sendiri.',
          'ShanghaiMed tidak pernah menerima atau menyimpan biaya rumah sakit atau klinis. Kami tidak dapat mengeluarkan pengembalian dana untuk jumlah yang dibayar langsung ke rumah sakit; permintaan pengembalian dana untuk biaya rumah sakit harus diajukan ke rumah sakit secara langsung.',
        ],
      },
      {
        title: '2. Dua kategori biaya',
        items: [
          { lead: 'Biaya koordinasi ShanghaiMed', text: '— biaya yang kami kenakan untuk peninjauan kasus, penerjemahan rekam medis, pencocokan rumah sakit/spesialis, penjadwalan janji temu, dukungan visa dan logistik, pendampingan bilingual, dan koordinasi tindak lanjut. Dikumpulkan oleh Shanghai Keling Information Technology Co., Ltd.' },
          { lead: 'Biaya rumah sakit / klinis', text: '— semua biaya medis, pemeriksaan, pengobatan, obat-obatan, dan rumah sakit yang dibayar langsung oleh pasien ke rumah sakit yang merawat. ShanghaiMed tidak mengumpulkan atau menyimpan dana ini dan tidak bertanggung jawab atas keputusan pengembalian dana rumah sakit.' },
        ],
      },
      {
        title: '3. Deposit pemesanan',
        body: ['Deposit pemesanan yang tidak dapat dikembalikan ("Deposit") diperlukan untuk mengunci slot spesialis, janji temu rumah sakit, ketersediaan penerjemah, dan jendela perjalanan yang disepakati.'],
        items: [
          'Setelah pekerjaan koordinasi dimulai (misalnya penerjemahan rekam medis, pencocokan rumah sakit/spesialis, pemesanan janji temu, atau dukungan surat undangan visa telah dilakukan), Deposit tidak dapat dikembalikan, karena slot dan sumber daya pihak ketiga telah dipesan atas nama Anda dan tidak dapat dilepaskan ke pasien lain.',
          'Jika ShanghaiMed tidak dapat menyediakan layanan yang disepakati karena alasan yang disebabkan oleh kami, Deposit akan dikembalikan sepenuhnya.',
        ],
      },
      {
        title: '4. Pembatalan oleh pasien',
        items: [
          { lead: 'Lebih dari 30 hari sebelum tanggal mulai layanan yang dijadwalkan, sebelum pekerjaan koordinasi apa pun dimulai:', text: ' Deposit dapat dikembalikan dikurangi biaya pihak ketiga yang tidak dapat dipulihkan yang telah dikeluarkan dan biaya pemrosesan pembayaran yang tidak dapat dipulihkan.' },
          { lead: 'Dalam 30 hari dari tanggal mulai layanan yang dijadwalkan, atau setelah pekerjaan koordinasi dimulai:', text: ' Deposit tidak dapat dikembalikan; sisa saldo untuk layanan yang belum disampaikan dapat dikembalikan sebagian atas kebijakan kami berdasarkan pekerjaan yang telah diselesaikan.' },
          { lead: 'Tidak hadir atau perubahan mendadak yang tidak dapat diakomodasi oleh rumah sakit:', text: ' biaya koordinasi tidak dapat dikembalikan.' },
        ],
      },
      {
        title: '5. Penjadwalan ulang',
        body: ['Kami akan melakukan upaya yang wajar untuk menjadwalkan ulang kunjungan Anda satu kali tanpa biaya koordinasi tambahan, tergantung pada ketersediaan rumah sakit dan spesialis. Jika penjadwalan ulang memerlukan pekerjaan koordinasi baru yang signifikan atau biaya pihak ketiga baru, kami akan memberi tahu Anda sebelumnya.'],
      },
      {
        title: '6. Penolakan visa',
        body: ['Penolakan visa tidak secara otomatis memberi hak atas pengembalian dana. Jika dokumen dukungan visa yang kami berikan sudah benar dan lengkap, ketentuan Deposit standar di atas berlaku. Dalam kasus penolakan visa, kami akan, jika memungkinkan, menjadwalkan ulang layanan satu kali tanpa biaya koordinasi tambahan.'],
      },
      {
        title: '7. Alasan medis',
        body: ['Jika Anda tidak dapat melakukan perjalanan karena alasan medis (didukung oleh dokumentasi dari dokter yang merawat Anda), kami akan mempertimbangkan pengembalian dana sebagian berdasarkan kasus per kasus setelah dikurangi biaya pihak ketiga yang telah dikeluarkan. Kami tidak bertanggung jawab atas perubahan kondisi klinis yang muncul antara pemesanan dan kunjungan Anda.'],
      },
      {
        title: '8. Biaya pemrosesan dan mata uang',
        body: ['Biaya dan beban yang dikenakan oleh penyedia pembayaran (pemrosesan kartu, konversi mata uang, atau biaya bank/wire transfer) tidak dapat dipulihkan dan dapat dipotong dari pengembalian dana yang disetujui. Pengembalian dana akan dilakukan dalam mata uang pembayaran asli ke metode pembayaran asli, biasanya dalam waktu 10–20 hari kerja setelah persetujuan.'],
      },
      {
        title: '9. Tagihan balik (chargeback)',
        body: ['Kami bertujuan untuk menyelesaikan masalah apa pun secara langsung dan cepat. Jika Anda tidak puas dengan aspek layanan kami, silakan hubungi kami sebelum memulai chargeback kartu agar kami dapat bekerja sama dengan Anda untuk mengatasi masalah tersebut. Chargeback tidak mengesampingkan Kebijakan ini dan dapat memengaruhi jumlah yang akhirnya jatuh tempo setelah peninjauan oleh jaringan pembayaran.'],
      },
      {
        title: '10. Cara meminta pengembalian dana',
        body: ['Kirim email ke hello@shanghaimedhealth.com dengan nama lengkap Anda, referensi pemesanan, dan alasan permintaan pengembalian dana. Kami akan mengonfirmasi permintaan Anda dalam 5 hari kerja dan memberikan keputusan setelah peninjauan.'],
      },
      {
        title: '11. Perubahan pada Kebijakan ini',
        body: ['Kami dapat memperbarui Kebijakan Pengembalian Dana ini dari waktu ke waktu. Versi yang berlaku pada tanggal Anda membayar Deposit berlaku untuk pengikatan tersebut kecuali perubahan diwajibkan oleh hukum.'],
      },
      { title: '12. Kontak', contact: true },
    ],
  },
}
