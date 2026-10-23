// Bahasa Indonesia glossary terms. Term names keep recognised
// Latin acronyms/standards (ISO, JCI, RCT, EBM...); definitions translated.

import type { GlossaryTerm } from './glossary.ar'

export const glossaryIdCategories = [
  'Peran Industri',
  'Rumah Sakit & Kualitas',
  'Perjalanan & Hukum',
  'Keuangan & Asuransi',
  'Kesinambungan Perawatan',
  'Keperawatan & Bahasa',
  'Jenis Perawatan',
  'Konten & Penelitian',
]

export const glossaryId: GlossaryTerm[] = [
  // ─── Industry Roles ───
  {
    term: 'Medical Tourism Facilitator',
    aliases: ['Medical Travel Facilitator', 'MTF'],
    category: 'Peran Industri',
    definition:
      'Perusahaan atau profesional yang mengoordinasikan perjalanan medis lintas batas pasien — termasuk pemilihan rumah sakit dan dokter, penjadwalan janji temu, penerjemahan rekam medis, logistik, interpretasi, dan tindak lanjut pasca-pengobatan. Peran ini didefinisikan secara formal oleh standar internasional ISO 22525:2020.',
    context:
      'Fasilitator mengenakan biaya layanan yang transparan. Fasilitator bereputasi tidak menggantikan penilaian klinis dokter dan tidak menerima komisi yang tidak diungkapkan dari rumah sakit.',
  },
  {
    term: 'Medical Tourism Broker',
    category: 'Peran Industri',
    definition:
      'Perantara yang model utamanya adalah mencocokkan pasien dengan penyedia dengan imbalan komisi atau biaya rujukan, seringkali tanpa mengoperasikan sendiri lapisan koordinasi di lapangan, penerjemahan, atau manajemen perawatan.',
    context:
      'Perbedaan broker–fasilitator adalah perbedaan model bisnis, bukan gelar hukum. Perutean berbasis komisi dapat menciptakan konflik kepentingan antara pendapatan perantara dan kecocokan terbaik bagi pasien. Pasien sebaiknya menanyakan kepada perantara mana pun bagaimana mereka dibayar.',
  },
  {
    term: 'Concierge Medicine',
    category: 'Peran Industri',
    definition:
      'Model layanan di mana pasien membayar biaya untuk koordinasi personal, akses lebih cepat, dukungan berdedikasi, dan kenyamanan yang ditingkatkan — terpisah dari biaya yang dikenakan rumah sakit untuk perawatan medis itu sendiri.',
    context:
      'Paket koordinasi ShanghaiMed mengikuti model concierge: biaya membeli penjadwalan, navigasi, penerjemahan, dan logistik; tagihan medis dibayar langsung ke rumah sakit.',
  },
  {
    term: 'Case Manager',
    aliases: ['Patient Coordinator', 'Medical Concierge'],
    category: 'Peran Industri',
    definition:
      'Orang yang bertanggung jawab mengatur perjalanan pasien individu dari awal hingga akhir — janji temu, dokumen, serah terima antar departemen, dan tindak lanjut — sehingga pasien tidak menavigasi sistem perawatan kesehatan yang asing sendirian.',
  },

  // ─── Hospitals & Quality ───
  {
    term: 'Grade 3A Hospital',
    aliases: ['Grade 3A', '三甲', 'Class 3A', '3A Hospital'],
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Tingkat tertinggi dalam sistem klasifikasi rumah sakit resmi Tiongkok, yang dikelola oleh Komisi Kesehatan Nasional. Rumah sakit Grade 3A dievaluasi berdasarkan kemampuan klinis, volume spesialis, teknologi, penelitian, pengajaran, dan manajemen kualitas.',
    context:
      'Terdapat sekitar 1.800 rumah sakit Grade 3A di seluruh Tiongkok. Sebagian besar rumah sakit universitas Shanghai yang diakui secara internasional memegang peringkat ini, yang merupakan penanda kemampuan rumah sakit paling berguna saat ini di Tiongkok daratan.',
  },
  {
    term: 'Accreditation',
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Evaluasi formal terhadap organisasi layanan kesehatan berdasarkan standar kualitas dan keselamatan yang dipublikasikan, yang dilakukan oleh badan independen. Akreditasi nasional (seperti sistem Grade 3A Tiongkok) dan akreditasi internasional adalah sistem yang berbeda.',
    context:
      'Akreditasi menjelaskan proses dan kemampuan institusi; itu tidak menjamin hasil perawatan individu. Pasien harus memverifikasi bahwa akreditasi masih berlaku, karena beberapa program telah berubah atau ditutup.',
  },
  {
    term: 'JCI',
    aliases: ['Joint Commission International'],
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Program akreditasi rumah sakit internasional utama yang dahulu. Akreditasi JCI pernah dipegang oleh sejumlah rumah sakit Tiongkok, tetapi JCI menghentikan bisnis akreditasi di Tiongkok daratan pada April 2023, sehingga tidak ada akreditasi JCI baru yang dikeluarkan di sana.',
    context:
      'Sertifikat JCI historis tidak berarti rumah sakit tersebut saat ini terakreditasi JCI. Untuk kemampuan terkini di Tiongkok, peringkat Grade 3A dan data resmi saat ini adalah referensi yang dapat diandalkan.',
  },
  {
    term: 'ISQua',
    aliases: ['International Society for Quality in Health Care'],
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Badan internasional yang mengevaluasi dan mengakui organisasi akreditasi itu sendiri. Sistem akreditasi nasional yang diakui ISQua berarti standar rumah sakit negara tersebut memenuhi persyaratan yang diterima secara internasional.',
  },
  {
    term: 'Clinical Outcome',
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Hasil perawatan medis yang terukur — seperti kelangsungan hidup, tingkat komplikasi, remisi, rawat inap ulang, atau pemulihan fungsi. Hasil adalah bukti kualitas yang lebih kuat daripada ukuran proses atau fasilitas saja.',
    context:
      'Klaim tentang hasil harus dilacak ke studi spesifik dengan populasi dan periode tindak lanjut yang ditetapkan, dan dibandingkan dengan tolok ukur yang sesuai.',
  },
  {
    term: 'Evidence-Based Medicine',
    aliases: ['EBM'],
    category: 'Rumah Sakit & Kualitas',
    definition:
      'Praktik pengambilan keputusan klinis dengan mengintegrasikan penelitian telaah sejawat terbaik yang tersedia, keahlian klinis, dan keadaan serta preferensi pasien individu.',
  },

  // ─── Travel & Legal ───
  {
    term: 'Inbound Medical Tourism',
    category: 'Perjalanan & Hukum',
    definition:
      'Perjalanan masuk ke suatu negara oleh pasien asing yang secara khusus bertujuan untuk menerima perawatan medis di sana. Tiongkok secara historis merupakan pasar sumber (keluar) namun semakin berkembang sebagai destinasi masuk.',
  },
  {
    term: 'Outbound Medical Tourism',
    category: 'Perjalanan & Hukum',
    definition:
      'Pasien meninggalkan negara asal mereka untuk mendapatkan perawatan medis di luar negeri, biasanya dimotivasi oleh biaya, waktu tunggu, ketersediaan, atau keahlian.',
  },
  {
    term: 'Medical Visa',
    category: 'Perjalanan & Hukum',
    definition:
      'Visa yang dikeluarkan untuk tujuan menerima perawatan medis, biasanya didukung oleh surat undangan atau konfirmasi dari rumah sakit yang merawat dan terkadang oleh organisasi fasilitator.',
  },
  {
    term: 'Visa-Free Transit',
    aliases: ['240-Hour Transit Visa Exemption', 'Transit Without Visa'],
    category: 'Perjalanan & Hukum',
    definition:
      'Kebijakan yang mengizinkan warga negara asing yang memenuhi syarat untuk memasuki negara dalam jangka waktu terbatas tanpa visa saat transit ke negara atau wilayah ketiga. Tiongkok menawarkan pengecualian visa transit 240 jam bagi warga negara dari daftar negara yang ditentukan.',
    context:
      'Kelayakan, durasi, dan area yang diizinkan dapat berubah dan bervariasi menurut titik masuk dan kewarganegaraan; kebijakan visa resmi terkini harus selalu diperiksa sebelum bepergian.',
  },
  {
    term: 'Informed Consent',
    category: 'Perjalanan & Hukum',
    definition:
      'Proses di mana pasien, setelah diberitahu tentang manfaat, risiko, alternatif, dan ketidakpastian suatu prosedur, secara sukarela menyetujui pengobatan. Penerjemahan yang akurat sangat penting untuk persetujuan terinformasi melintasi hambatan bahasa.',
  },
  {
    term: 'Medical Records Translation',
    category: 'Perjalanan & Hukum',
    definition:
      'Penerjemahan dokumen klinis — riwayat, ringkasan keluar, laporan pencitraan, hasil laboratorium, dan daftar obat — antara bahasa pasien dan bahasa rumah sakit yang merawat. Penerjemahan medis memerlukan penguasaan terminologi klinis, bukan kefasihan bilingual umum.',
  },

  // ─── Money & Insurance ───
  {
    term: 'Direct Billing',
    aliases: ['Cashless Settlement', 'Direct Settlement'],
    category: 'Keuangan & Asuransi',
    definition:
      'Pengaturan di mana rumah sakit menyelesaikan biaya yang memenuhi syarat langsung dengan perusahaan asuransi, sehingga pasien tidak membayar di muka dan kemudian menuntut penggantian. Ini memerlukan rumah sakit untuk memiliki perjanjian dengan perusahaan asuransi tersebut.',
    context:
      'Cakupan bersifat spesifik untuk perusahaan asuransi dan rumah sakit. Pasien harus mengonfirmasi pra-otorisasi dan cakupan tepat layanan yang ditanggung sebelum pengobatan, karena tidak semua biaya harus diselesaikan secara langsung.',
  },
  {
    term: 'Fee-for-Service',
    category: 'Keuangan & Asuransi',
    definition:
      'Model pembayaran di mana setiap layanan medis — konsultasi, tes, prosedur, atau obat — ditagih secara terpisah, daripada digabungkan dalam satu paket tetap.',
  },
  {
    term: 'Out-of-Pocket Cost',
    category: 'Keuangan & Asuransi',
    definition:
      'Bagian dari biaya medis yang dibayar langsung oleh pasien, termasuk biaya yang tidak ditanggung asuransi, pengurangan (deductible), dan biaya non-medis seperti perjalanan dan akomodasi.',
  },
  {
    term: 'Transparent Pricing',
    category: 'Keuangan & Asuransi',
    definition:
      'Informasi yang jelas dan dipublikasikan tentang apa yang dikenakan oleh setiap pihak — membedakan biaya layanan fasilitator dari biaya medis rumah sakit, yang dibayar terpisah dan sesuai tarif rumah sakit sendiri.',
  },
  {
    term: 'Commission',
    category: 'Keuangan & Asuransi',
    definition:
      'Pembayaran yang diberikan kepada perantara untuk mengarahkan atau merujuk pasien ke penyedia tertentu. Komisi yang tidak diungkapkan dapat bertentangan dengan pencocokan pasien yang objektif dan merupakan perhatian etis utama dalam perjalanan medis.',
  },

  // ─── Care Continuity ───
  {
    term: 'Continuity of Care',
    category: 'Kesinambungan Perawatan',
    definition:
      'Manajemen perawatan pasien yang koheren dan tidak terputus lintas penyedia, lokasi, dan waktu — sangat penting ketika perawatan melintasi batas negara dan melibatkan tindak lanjut setelah pasien pulang ke rumah.',
  },
  {
    term: 'Post-Operative Care',
    aliases: ['Post-op Care'],
    category: 'Kesinambungan Perawatan',
    definition:
      'Perawatan medis dan keperawatan setelah pembedahan, termasuk perawatan luka, pemantauan komplikasi, manajemen nyeri, rehabilitasi, dan janji temu tindak lanjut. Perencanaan untuk perawatan pascaoperasi — termasuk setelah pulang ke rumah — merupakan pertimbangan keselamatan kunci dalam wisata medis.',
  },
  {
    term: 'Complication',
    category: 'Kesinambungan Perawatan',
    definition:
      'Masalah medis yang tidak diinginkan dan tidak disengaja yang muncul selama atau setelah pengobatan, seperti infeksi, perdarahan, atau kegagalan perangkat. Semua prosedur mengandung beberapa risiko komplikasi, dan mengelolanya jauh dari rumah bisa menjadi sulit dan mahal.',
  },
  {
    term: 'Discharge Summary',
    category: 'Kesinambungan Perawatan',
    definition:
      'Laporan klinis yang disiapkan ketika pasien keluar dari rumah sakit, yang mendokumentasikan diagnosis, pengobatan, prosedur, obat-obatan, dan instruksi tindak lanjut. Ringkasan keluar yang diterjemahkan sangat penting untuk kesinambungan perawatan yang aman di negara asal.',
  },
  {
    term: 'Medical Escort',
    aliases: ['Bilingual Medical Companion'],
    category: 'Kesinambungan Perawatan',
    definition:
      'Profesional terlatih secara klinis yang cocok secara bahasa yang menemani pasien ke janji temu, menafsirkan komunikasi medis secara akurat, membantu navigasi rumah sakit dan urusan administrasi, serta membantu memastikan pasien memahami diagnosis dan rencana pengobatan.',
  },

  // ─── Nursing & Language ───
  {
    term: 'ISPN',
    aliases: ['International Standards for Professional Nurses'],
    category: 'Keperawatan & Bahasa',
    definition:
      'Kredensial internasional untuk perawat terdaftar, yang memverifikasi pengetahuan keperawatan dan standar profesional terhadap persyaratan yang dirujuk secara internasional. Ini berbeda dari lisensi keperawatan nasional.',
  },
  {
    term: 'Registered Nurse',
    aliases: ['RN'],
    category: 'Keperawatan & Bahasa',
    definition:
      'Perawat yang memegang lisensi praktik terkini setelah menyelesaikan pendidikan dan ujian yang diperlukan. Di Tiongkok, lisensi keperawatan dikeluarkan melalui sistem otoritas kesehatan nasional; gelar seperti perawat senior atau perawat jaga mencerminkan peringkat profesional lebih lanjut.',
  },
  {
    term: 'Medical Interpreter',
    category: 'Keperawatan & Bahasa',
    definition:
      'Penerjemah spesialis yang terlatih dalam terminologi klinis, etika, kerahasiaan, dan akurasi untuk pertemuan layanan kesehatan. Penerjemahan medis berbeda dari kemampuan bilingual percakapan, dan kesalahan dapat langsung memengaruhi keselamatan.',
  },

  // ─── Treatment Types ───
  {
    term: 'Traditional Chinese Medicine',
    aliases: ['TCM', '中医'],
    category: 'Jenis Perawatan',
    definition:
      'Sistem pengobatan yang dikembangkan di Tiongkok yang mencakup akupunktur, pengobatan herbal, pijat tuina, bekam, dan terapi terkait, berlandaskan kerangka diagnostiknya sendiri. Beberapa intervensi TCM telah dipelajari dalam uji klinis modern sementara yang lain masih dalam penyelidikan.',
  },
  {
    term: 'Executive Health Screening',
    aliases: ['Health Checkup', 'Comprehensive Health Screening'],
    category: 'Jenis Perawatan',
    definition:
      'Program pemeriksaan pencegahan yang terkoordinasi — pencitraan, tes laboratorium, dan tinjauan spesialis — seringkali diselesaikan dalam satu kunjungan atau hari, digunakan untuk deteksi dini dan penilaian kesehatan.',
  },
  {
    term: 'CAR-T Therapy',
    aliases: ['Chimeric Antigen Receptor T-Cell Therapy'],
    category: 'Jenis Perawatan',
    definition:
      'Bentuk imunoterapi di mana sel imun pasien sendiri direkayasa untuk mengenali dan menyerang sel kanker. Ini adalah pengobatan kompleks dan khusus yang ditawarkan di pusat-pusat maju terpilih.',
  },
  {
    term: 'Telemedicine',
    aliases: ['Telehealth', 'Remote Consultation'],
    category: 'Jenis Perawatan',
    definition:
      'Penyampaian konsultasi klinis atau tindak lanjut dari jarak jauh melalui video atau sarana digital lainnya. Telemedisin bermanfaat untuk konsultasi awal dan tindak lanjut pasca-perjalanan, tetapi tidak dapat menggantikan pemeriksaan tatap muka atau pengobatan ketika hal tersebut diperlukan.',
  },

  // ─── Content & Research ───
  {
    term: 'Peer Review',
    category: 'Konten & Penelitian',
    definition:
      'Evaluasi naskah penelitian oleh pakar independen di bidang tersebut sebelum publikasi. Studi telaah sejawat umumnya dianggap sebagai bukti yang lebih kuat daripada materi yang tidak ditinjau atau promosi.',
  },
  {
    term: 'Systematic Review',
    category: 'Konten & Penelitian',
    definition:
      'Metode penelitian yang mengidentifikasi, menilai, dan mensintesis semua studi yang memenuhi syarat pada pertanyaan yang ditentukan menggunakan metode yang telah ditetapkan sebelumnya dan dapat direproduksi. Ini berbeda dari tinjauan naratif tradisional.',
  },
  {
    term: 'Randomized Controlled Trial',
    aliases: ['RCT'],
    category: 'Konten & Penelitian',
    definition:
      'Studi di mana partisipan dialokasikan secara acak ke kelompok intervensi atau kelompok kontrol, mengurangi bias dan memberikan beberapa bukti terkuat tentang apakah pengobatan menyebabkan efek.',
  },
  {
    term: 'E-E-A-T',
    category: 'Konten & Penelitian',
    definition:
      'Pengalaman, Keahlian, Otoritatif, dan Kepercayaan — kerangka kerja yang digunakan untuk menilai kredibilitas informasi online, diterapkan dengan sangat ketat pada kesehatan dan topik "Your Money or Your Life" lainnya.',
  },
  {
    term: 'YMYL',
    aliases: ['Your Money or Your Life'],
    category: 'Konten & Penelitian',
    definition:
      'Kategori konten online yang dapat memengaruhi kesehatan, keselamatan, keuangan, atau kesejahteraan seseorang. Informasi kesehatan dan medis diperlakukan sebagai YMYL dan dipegang pada standar akurasi, otoritas, dan kepercayaan yang lebih tinggi.',
  },
  {
    term: 'Structured Data',
    aliases: ['Schema.org Markup', 'JSON-LD'],
    category: 'Konten & Penelitian',
    definition:
      'Kode standar yang dapat dibaca mesin yang membantu mesin pencari dan sistem AI memahami entitas dan hubungan pada halaman — seperti organisasi, orang, studi, atau istilah yang didefinisikan.',
  },
]

export const glossaryIdUi = {
  badge: 'Referensi',
  title: 'Glosarium Wisata Medis',
  intro:
    'definisi bahasa sederhana untuk istilah-istilah yang dihadapi pasien saat mengatur perawatan medis di luar negeri — siapa melakukan apa, bagaimana rumah sakit digradasi, bagaimana pembayaran dan asuransi bekerja, dan apa yang dibutuhkan untuk kesinambungan perawatan yang aman.',
  introPrefix: '',
  lastReviewed: 'Terakhir ditinjau: 10 Oktober 2026',
  aka: 'Juga dikenal sebagai:',
  goDeeper: 'Pelajari lebih dalam',
  researchLink: 'Perpustakaan Penelitian',
  researchDesc: ' — studi telaah sejawat di balik klaim tentang perjalanan medis ke Tiongkok.',
  editorialLink: 'Kebijakan Editorial',
  editorialDesc: ' — bagaimana kami menyumberi, menilai, dan mengoreksi informasi.',
  founderLink: 'Tentang Pendiri',
  founderDesc: ' — latar belakang klinis dan operasional di balik ShanghaiMed.',
  blogLink: 'Blog',
  blogDesc: ' — panduan praktis untuk pasien yang mempertimbangkan pengobatan di Shanghai.',
  disclaimer:
    'Glosarium ini disediakan untuk tujuan informasi umum dan bukan merupakan saran medis, hukum, atau asuransi. Ketentuan visa dan asuransi bervariasi menurut kewarganegaraan, perusahaan asuransi, dan kebijakan terkini; verifikasi rincian terhadap sumber resmi sebelum bepergian.',
}
