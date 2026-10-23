// Bahasa Malaysia glossary terms. Term names keep recognised
// Latin acronyms/standards (ISO, JCI, RCT, EBM...); definitions translated.

import type { GlossaryTerm } from './glossary.ar'

export const glossaryMsCategories = [
  'Peranan Industri',
  'Hospital & Kualiti',
  'Perjalanan & Perundangan',
  'Kewangan & Insurans',
  'Kesinambungan Penjagaan',
  'Kejururawatan & Bahasa',
  'Jenis Rawatan',
  'Kandungan & Penyelidikan',
]

export const glossaryMs: GlossaryTerm[] = [
  // ─── Industry Roles ───
  {
    term: 'Medical Tourism Facilitator',
    aliases: ['Medical Travel Facilitator', 'MTF'],
    category: 'Peranan Industri',
    definition:
      'Syarikat atau profesional yang menyelaraskan perjalanan perubatan rentas sempadan untuk pesakit — termasuk pemilihan hospital dan doktor, penjadualan temujanji, terjemahan rekod perubatan, logistik, tafsiran, dan susulan selepas rawatan. Peranan ini ditakrifkan secara rasmi oleh piawaian antarabangsa ISO 22525:2020.',
    context:
      'Fasilitator yang sah mengenakan bayaran perkhidmatan yang telus. Fasilitator yang bereputasi tidak menggantikan pertimbangan klinikal doktor dan tidak menerima komisen terpendam daripada hospital.',
  },
  {
    term: 'Medical Tourism Broker',
    category: 'Peranan Industri',
    definition:
      'Pengantara yang model perniagaan utamanya adalah memadankan pesakit dengan penyedia sebagai pertukaran komisen atau bayaran rujukan, selalunya tanpa mengendalikan sendiri lapisan penyelarasan di tapak, terjemahan, atau pengurusan penjagaan.',
    context:
      'Perbezaan broker–fasilitator adalah perbezaan model perniagaan, bukan gelaran undang-undang. Penghalaan berasaskan komisen boleh mewujudkan konflik kepentingan antara hasil pengantara dan padanan terbaik untuk pesakit. Pesakit harus bertanya kepada mana-mana pengantara bagaimana mereka dibayar.',
  },
  {
    term: 'Concierge Medicine',
    category: 'Peranan Industri',
    definition:
      'Model perkhidmatan di mana pesakit membayar yuran untuk penyelarasan yang diperibadikan, akses lebih pantas, sokongan berdedikasi, dan kemudahan yang ditingkatkan — berasingan daripada bayaran yang dikenakan oleh hospital untuk rawatan perubatan itu sendiri.',
    context:
      'Pakej penyelarasan ShanghaiMed mengikuti model concierge: bayaran membeli penjadualan, navigasi, terjemahan, dan logistik; bil perubatan dibayar terus ke hospital.',
  },
  {
    term: 'Case Manager',
    aliases: ['Patient Coordinator', 'Medical Concierge'],
    category: 'Peranan Industri',
    definition:
      'Orang yang bertanggungjawab menyusun perjalanan setiap pesakit dari awal hingga akhir — temujanji, dokumen, perpindahan antara jabatan dan susulan — supaya pesakit tidak perlu mengemudi sistem penjagaan kesihatan yang asing itu bersendirian.',
  },

  // ─── Hospitals & Quality ───
  {
    term: 'Grade 3A Hospital',
    aliases: ['Grade 3A', '三甲', 'Class 3A', '3A Hospital'],
    category: 'Hospital & Kualiti',
    definition:
      'Peringkat tertinggi dalam sistem klasifikasi hospital rasmi China, yang ditadbir oleh Suruhanjaya Kesihatan Kebangsaan China. Hospital Grade 3A dinilai berdasarkan keupayaan klinikal, volum pakar, teknologi, penyelidikan, pengajaran, dan pengurusan kualiti.',
    context:
      'Terdapat kira-kira 1,800 hospital Grade 3A di seluruh China. Kebanyakan hospital universiti Shanghai yang diiktiraf di peringkat antarabangsa memegang penarafan ini, yang merupakan penanda keupayaan hospital yang paling berguna ketika berada di tanah besar China.',
  },
  {
    term: 'Accreditation',
    category: 'Hospital & Kualiti',
    definition:
      'Penilaian rasmi terhadap organisasi penjagaan kesihatan berdasarkan piawaian kualiti dan keselamatan yang diterbitkan, yang dijalankan oleh badan bebas. Akreditasi kebangsaan (seperti sistem Grade 3A China) dan akreditasi antarabangsa adalah sistem yang berbeza.',
    context:
      'Akreditasi menggambarkan proses dan keupayaan institusi; ia tidak menjamin hasil rawatan individu. Pesakit harus mengesahkan bahawa akreditasi adalah terkini, kerana beberapa program telah berubah atau ditutup.',
  },
  {
    term: 'JCI',
    aliases: ['Joint Commission International'],
    category: 'Hospital & Kualiti',
    definition:
      'Satu program akreditasi hospital antarabangsa utama yang dahulu. Akreditasi JCI pernah dipegang oleh sejumlah hospital China, tetapi JCI menghentikan perkhidmatan akreditasi di tanah besar China pada April 2023; oleh itu tiada akreditasi JCI baharu dikeluarkan di sana.',
    context:
      'Sijil JCI lama tidak bermakna hospital itu kini diakreditasi JCI. Untuk keupayaan semasa di China, penarafan Grade 3A dan data rasmi semasa adalah rujukan yang boleh dipercayai.',
  },
  {
    term: 'ISQua',
    aliases: ['International Society for Quality in Health Care'],
    category: 'Hospital & Kualiti',
    definition:
      'Badan antarabangsa yang menilai dan mengiktiraf organisasi akreditasi itu sendiri. Sistem akreditasi kebangsaan yang diiktiraf ISQua bermakna piawaian hospital negara itu memenuhi keperluan yang diterima di peringkat antarabangsa.',
  },
  {
    term: 'Clinical Outcome',
    category: 'Hospital & Kualiti',
    definition:
      'Hasil rawatan perubatan yang boleh diukur — seperti kelangsungan hidup, kadar komplikasi, pengampunan, kemasukan semula, atau pemulihan fungsi. Hasil adalah bukti kualiti yang lebih kukuh berbanding ukuran proses atau kemudahan semata-mata.',
    context:
      'Tuntutan tentang hasil harus dirujuk kepada kajian khusus dengan populasi dan tempoh susulan yang ditentukan, dan dibandingkan dengan penanda aras yang sesuai.',
  },
  {
    term: 'Evidence-Based Medicine',
    aliases: ['EBM'],
    category: 'Hospital & Kualiti',
    definition:
      'Amalan membuat keputusan klinikal dengan mengintegrasikan penyelidikan semakan rakan setara terbaik yang sedia ada, kepakaran klinikal, dan keadaan serta keutamaan pesakit individu.',
  },

  // ─── Travel & Legal ───
  {
    term: 'Inbound Medical Tourism',
    category: 'Perjalanan & Perundangan',
    definition:
      'Perjalanan masuk ke sesebuah negara oleh pesakit asing khusus untuk menerima rawatan perubatan di sana. China secara sejarahnya merupakan pasaran sumber (keluar) tetapi semakin berkembang sebagai destinasi masuk.',
  },
  {
    term: 'Outbound Medical Tourism',
    category: 'Perjalanan & Perundangan',
    definition:
      'Pesakit meninggalkan negara asal mereka untuk mendapatkan rawatan perubatan di luar negara, biasanya didorong oleh kos, masa menunggu, ketersediaan, atau kepakaran.',
  },
  {
    term: 'Medical Visa',
    category: 'Perjalanan & Perundangan',
    definition:
      'Visa yang dikeluarkan untuk tujuan menerima rawatan perubatan, biasanya disokong oleh surat jemputan atau pengesahan daripada hospital yang merawat dan kadang-kadang oleh organisasi pemudah cara.',
  },
  {
    term: 'Visa-Free Transit',
    aliases: ['240-Hour Transit Visa Exemption', 'Transit Without Visa'],
    category: 'Perjalanan & Perundangan',
    definition:
      'Dasar yang membenarkan warga asing yang layak memasuki negara untuk tempoh terhad tanpa visa semasa transit ke negara atau wilayah ketiga. China menawarkan pengecualian visa transit 240 jam kepada warga negara daripada senarai negara yang ditetapkan.',
    context:
      'Kelayakan, tempoh dan kawasan yang dibenarkan boleh berubah dan berbeza mengikut tempat masuk dan kewarganegaraan; dasar visa rasmi semasa harus sentiasa diperiksa sebelum perjalanan.',
  },
  {
    term: 'Informed Consent',
    category: 'Perjalanan & Perundangan',
    definition:
      'Proses di mana pesakit, setelah dimaklumkan tentang manfaat, risiko, alternatif dan ketidakpastian sesuatu prosedur, bersetuju secara sukarela untuk rawatan. Terjemahan yang tepat adalah penting untuk persetujuan termaklum merentasi halangan bahasa.',
  },
  {
    term: 'Medical Records Translation',
    category: 'Perjalanan & Perundangan',
    definition:
      'Terjemahan dokumen klinikal — sejarah perubatan, ringkasan keluar hospital, laporan pengimejan, keputusan makmal dan senarai ubat — antara bahasa pesakit dan bahasa hospital yang merawat. Terjemahan perubatan memerlukan penguasaan terminologi klinikal, bukan sekadar kefasiran dwi-bahasa umum.',
  },

  // ─── Money & Insurance ───
  {
    term: 'Direct Billing',
    aliases: ['Cashless Settlement', 'Direct Settlement'],
    category: 'Kewangan & Insurans',
    definition:
      'Pengaturan di mana hospital menyelesaikan caj yang layak terus dengan syarikat insurans, supaya pesakit tidak perlu membayar dahulu dan kemudian menuntut bayaran balik. Ia memerlukan hospital mempunyai perjanjian dengan penanggung insurans tersebut.',
    context:
      'Perlindungan adalah khusus untuk penanggung insurans dan hospital. Pesakit harus mengesahkan pra-kebenaran dan skop tepat perkhidmatan yang dilindungi sebelum rawatan, kerana bukan semua kos semestinya diselesaikan secara langsung.',
  },
  {
    term: 'Fee-for-Service',
    category: 'Kewangan & Insurans',
    definition:
      'Model pembayaran di mana setiap perkhidmatan perubatan — konsultasi, ujian, prosedur atau ubat — dibil secara berasingan, bukannya digabungkan ke dalam satu pakej tetap.',
  },
  {
    term: 'Out-of-Pocket Cost',
    category: 'Kewangan & Insurans',
    definition:
      'Bahagian perbelanjaan perubatan yang dibayar terus oleh pesakit, termasuk kos yang tidak dilindungi oleh insurans, boleh ditolak, dan perbelanjaan bukan perubatan seperti perjalanan dan penginapan.',
  },
  {
    term: 'Transparent Pricing',
    category: 'Kewangan & Insurans',
    definition:
      'Maklumat yang jelas dan diterbitkan tentang apa yang setiap pihak caj — membezakan bayaran perkhidmatan fasilitator daripada bayaran perubatan hospital, yang dibayar secara berasingan dan mengikut kadar hospital sendiri.',
  },
  {
    term: 'Commission',
    category: 'Kewangan & Insurans',
    definition:
      'Bayaran yang dibuat kepada pengantara untuk menghalakan atau merujuk pesakit kepada penyedia tertentu. Komisen yang tidak didedahkan boleh bercanggah dengan padanan pesakit yang objektif dan merupakan kebimbangan etika utama dalam perjalanan perubatan.',
  },

  // ─── Care Continuity ───
  {
    term: 'Continuity of Care',
    category: 'Kesinambungan Penjagaan',
    definition:
      'Pengurusan rawatan pesakit yang koheren dan tidak terganggu merentasi penyedia, lokasi dan masa — amat penting apabila penjagaan merentasi sempadan negara dan melibatkan susulan selepas pesakit pulang ke tanah air.',
  },
  {
    term: 'Post-Operative Care',
    aliases: ['Post-op Care'],
    category: 'Kesinambungan Penjagaan',
    definition:
      'Penjagaan perubatan dan kejururawatan selepas pembedahan, termasuk penjagaan luka, pemantauan komplikasi, pengurusan kesakitan, pemulihan dan temujanji susulan. Perancangan untuk penjagaan selepas pembedahan — termasuk selepas pesakit pulang ke tanah air — ialah pertimbangan keselamatan utama dalam pelancongan perubatan.',
  },
  {
    term: 'Complication',
    category: 'Kesinambungan Penjagaan',
    definition:
      'Masalah perubatan yang tidak diingini dan tidak dijangka yang timbul semasa atau selepas rawatan, seperti jangkitan, pendarahan atau kegagalan peranti. Semua prosedur membawa risiko komplikasi, dan menguruskannya jauh dari rumah boleh menjadi sukar dan mahal.',
  },
  {
    term: 'Discharge Summary',
    category: 'Kesinambungan Penjagaan',
    definition:
      'Laporan klinikal yang disediakan apabila pesakit keluar dari hospital, yang mendokumenkan diagnosis, rawatan, prosedur, ubat-ubatan dan arahan susulan. Ringkasan keluar yang diterjemahkan adalah teras kepada kesinambungan penjagaan yang selamat di negara asal.',
  },
  {
    term: 'Medical Escort',
    aliases: ['Bilingual Medical Companion'],
    category: 'Kesinambungan Penjagaan',
    definition:
      'Profesional terlatih secara klinikal yang padan dari segi bahasa, yang mengiringi pesakit ke temujanji, mentafsir komunikasi perubatan dengan tepat, membantu navigasi hospital dan urusan pentadbiran, serta memastikan pesakit memahami diagnosis dan pelan rawatan.',
  },

  // ─── Nursing & Language ───
  {
    term: 'ISPN',
    aliases: ['International Standards for Professional Nurses'],
    category: 'Kejururawatan & Bahasa',
    definition:
      'Kelayakan antarabangsa untuk jururawat berdaftar, yang mengesahkan pengetahuan kejururawatan dan piawaian profesional berdasarkan keperluan yang dirujuk di peringkat antarabangsa. Ia berbeza daripada lesen kejururawatan kebangsaan.',
  },
  {
    term: 'Registered Nurse',
    aliases: ['RN'],
    category: 'Kejururawatan & Bahasa',
    definition:
      'Jururawat yang memegang lesen sah untuk berlatih selepas menamatkan pendidikan dan peperiksaan yang diperlukan. Di China, lesen kejururawatan dikeluarkan melalui sistem pihak berkuasa kesihatan kebangsaan; gelaran seperti jururawat kanan atau ketua jururawat mencerminkan ranking profesional selanjutnya.',
  },
  {
    term: 'Medical Interpreter',
    category: 'Kejururawatan & Bahasa',
    definition:
      'Jurubahasa pakar yang terlatih dalam terminologi klinikal, etika, kerahsiaan dan ketepatan untuk pertemuan penjagaan kesihatan. Tafsiran perubatan berbeza daripada kebolehan dwi-bahasa perbualan, dan kesilapan boleh menjejaskan keselamatan secara langsung.',
  },

  // ─── Treatment Types ───
  {
    term: 'Traditional Chinese Medicine',
    aliases: ['TCM', '中医'],
    category: 'Jenis Rawatan',
    definition:
      'Sistem perubatan yang dibangunkan di China yang merangkumi akupunktur, perubatan herba, urutan tuina, bekam dan terapi berkaitan, berteraskan kerangka diagnostiknya sendiri. Beberapa intervensi TCM telah dikaji dalam ujian klinikal moden manakala yang lain masih dalam penyiasatan.',
  },
  {
    term: 'Executive Health Screening',
    aliases: ['Health Checkup', 'Comprehensive Health Screening'],
    category: 'Jenis Rawatan',
    definition:
      'Program pemeriksaan pencegahan yang diselaraskan — pengimejan, ujian makmal dan semakan pakar — selalunya diselesaikan dalam satu lawatan atau hari, digunakan untuk pengesanan awal dan penilaian kesihatan.',
  },
  {
    term: 'CAR-T Therapy',
    aliases: ['Chimeric Antigen Receptor T-Cell Therapy'],
    category: 'Jenis Rawatan',
    definition:
      'Satu bentuk imunoterapi di mana sel imun pesakit sendiri diubah suai secara genetik untuk mengenal pasti dan menyerang sel kanser. Ia adalah rawatan yang kompleks dan khusus yang ditawarkan di pusat-pusat terpilih yang maju.',
  },
  {
    term: 'Telemedicine',
    aliases: ['Telehealth', 'Remote Consultation'],
    category: 'Jenis Rawatan',
    definition:
      'Penyampaian konsultasi klinikal atau susulan dari jauh melalui video atau saluran digital yang lain. Teleperubatan berguna untuk konsultasi awal dan susulan selepas perjalanan, tetapi ia tidak boleh menggantikan pemeriksaan atau rawatan bersemuka apabila pemeriksaan secara fizikal diperlukan.',
  },

  // ─── Content & Research ───
  {
    term: 'Peer Review',
    category: 'Kandungan & Penyelidikan',
    definition:
      'Penilaian manuskrip penyelidikan oleh pakar bebas dalam bidang berkenaan sebelum penerbitan. Kajian semakan rakan setara secara umumnya dianggap sebagai bukti yang lebih kukuh berbanding bahan yang tidak disemak atau bahan promosi.',
  },
  {
    term: 'Systematic Review',
    category: 'Kandungan & Penyelidikan',
    definition:
      'Kaedah penyelidikan yang mengenal pasti, menilai dan mensintesis semua kajian yang layak mengenai soalan yang ditentukan menggunakan kaedah yang telah ditetapkan dan boleh dihasilkan semula. Ia berbeza daripada tinjauan naratif tradisional.',
  },
  {
    term: 'Randomized Controlled Trial',
    aliases: ['RCT'],
    category: 'Kandungan & Penyelidikan',
    definition:
      'Kajian di mana peserta diagihkan secara rawak kepada kumpulan intervensi atau kumpulan kawalan, yang mengurangkan bias dan memberikan beberapa bukti terkuat tentang sama ada rawatan menyebabkan sesuatu kesan.',
  },
  {
    term: 'E-E-A-T',
    category: 'Kandungan & Penyelidikan',
    definition:
      'Pengalaman, Kepakaran, Kewibawaan dan Kebolehpercayaan — rangka kerja yang digunakan untuk menilai kredibiliti maklumat dalam talian, diterapkan dengan lebih ketat terhadap kesihatan dan topik "Your Money or Your Life" yang lain.',
  },
  {
    term: 'YMYL',
    aliases: ['Your Money or Your Life'],
    category: 'Kandungan & Penyelidikan',
    definition:
      'Kategori kandungan dalam talian yang boleh menjejaskan kesihatan, keselamatan, kewangan atau kebajikan seseorang. Maklumat kesihatan dan perubatan dianggap sebagai YMYL dan dipegang pada piawaian ketepatan, kewibawaan dan kepercayaan yang lebih tinggi.',
  },
  {
    term: 'Structured Data',
    aliases: ['Schema.org Markup', 'JSON-LD'],
    category: 'Kandungan & Penyelidikan',
    definition:
      'Kod piawai yang boleh dibaca mesin yang membantu enjin carian dan sistem AI memahami entiti dan hubungan pada halaman — seperti organisasi, orang, kajian atau istilah yang ditentukan.',
  },
]

export const glossaryMsUi = {
  badge: 'Rujukan',
  title: 'Glosari Pelancongan Perubatan',
  intro:
    'definisi dalam bahasa mudah bagi istilah yang dihadapi pesakit apabila mengatur rawatan perubatan di luar negara — siapa buat apa, bagaimana hospital digredkan, bagaimana pembayaran dan insurans berfungsi, serta apa yang diperlukan untuk kesinambungan penjagaan yang selamat.',
  introPrefix: '',
  lastReviewed: 'Semakan terakhir: 10 Oktober 2026',
  aka: 'Juga dikenali sebagai:',
  goDeeper: 'Dengan lebih mendalam',
  researchLink: 'Perpustakaan Penyelidikan',
  researchDesc: ' — kajian semakan rakan setara di sebalik tuntutan tentang perjalanan perubatan ke China.',
  editorialLink: 'Dasar Editorial',
  editorialDesc: ' — cara kami memilih sumber, menggred, dan membetulkan maklumat.',
  founderLink: 'Tentang Pengasas',
  founderDesc: ' — latar belakang klinikal dan operasi di sebalik ShanghaiMed.',
  blogLink: 'Blog',
  blogDesc: ' — panduan praktikal untuk pesakit yang mempertimbangkan rawatan di Shanghai.',
  disclaimer:
    'Glosari ini disediakan untuk tujuan maklumat umum dan tidak merupakan nasihat perubatan, perundangan atau insurans. Syarat visa dan insurans berbeza mengikut kewarganegaraan, penanggung insurans dan dasar semasa; sahkan butiran dengan sumber rasmi sebelum mengembara.',
}
