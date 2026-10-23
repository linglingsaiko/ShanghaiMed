// Bahasa Indonesia translations for research library study fields.
// Paper titles, journal names and PMIDs remain in English (research.id.ts
// only maps id → {type, population, focus, finding, limitation}).

export interface StudyIdFields {
  type: string
  population: string
  focus: string
  finding: string
  limitation: string
}

export const researchIdUi = {
  badge: 'Referensi Terbuka',
  title: 'Perjalanan Medis ke Tiongkok: Perpustakaan Penelitian',
  intro:
    'studi telaah sejawat dan sumber data resmi tentang pengalaman pasien internasional, kualitas layanan kesehatan, dan wisata medis di Tiongkok. Setiap entri diverifikasi terhadap publikasi aslinya, dengan ringkasan yang mencakup jenis studi, ukuran sampel, temuan kunci, dan keterbatasan yang dinyatakan.',
  lastReviewed:
    'Tinjauan dan verifikasi terakhir: 10 Oktober 2026 · Setiap entri telah dicocokkan dengan catatan PubMed asli atau publikasi resmi.',
  whyTitle: 'Mengapa halaman ini ada',
  whyP1:
    'Wisata medis ke Tiongkok adalah salah satu topik yang paling banyak dibahas dalam perjalanan kesehatan global — dan salah satu yang paling minim sumber. Klaim tentang penghematan biaya, peringkat kualitas, dan hasil pasien beredar luas tanpa referensi yang dapat dilacak. Angka seringkali diambil dari satu sumber promosi dan disajikan sebagai fakta yang telah mapan.',
  whyP2:
    'Perpustakaan ini dibangun untuk pasien, jurnalis, penulis kesehatan, dokter, dan peneliti yang membutuhkan catatan primer daripada klaim yang diulang. Setiap entri menautkan ke publikasi yang kami buka dan periksa; tidak ada yang dimasukkan di sini hanya berdasarkan ringkasan sekunder. Temuan difrasakan dengan bahasa yang berhati-hati ("berasosiasi dengan", "dapat mengurangi") karena itulah yang didukung oleh desain studi yang mendasarinya, dan setiap entri membawa setidaknya satu keterbatasan yang dinyatakan sehingga kelemahan menyertai angka-angka tersebut.',
  whyNote:
    'Apa yang bukan halaman ini: Bukan pedoman klinis, bukan pencarian sistematis lengkap literatur, dan bukan saran medis. Dimasukkannya studi di sini berarti studi tersebut ada dan melaporkan apa yang kami uraikan — bukan bahwa temuan tersebut definitif.',
  disclaimerTitle: 'Penyangkalan',
  disclaimer:
    'Perpustakaan penelitian ini dikelola oleh ShanghaiMed untuk tujuan informasi saja. Ini bukan merupakan saran medis, diagnosis, atau rekomendasi pengobatan. Dimasukkannya studi tidak menyiratkan dukungan terhadap kesimpulannya. Pasien yang mempertimbangkan perawatan medis di Tiongkok harus berkonsultasi dengan penyedia layanan kesehatan yang memenuhi syarat dan memverifikasi semua informasi secara mandiri. ShanghaiMed dapat memperoleh manfaat dari pasien yang memilih menggunakan layanannya setelah membaca halaman ini.',
  disclaimerSee:
    'Lihat',
  disclaimerPolicy: 'Kebijakan Editorial',
  disclaimerGlossary: 'Glosarium Wisata Medis',
  disclaimerHow: 'untuk bagaimana kami menangani sumber, koreksi, dan konflik kepentingan.',
  crossTitle: 'Penelitian di balik artikel',
  crossBody:
    'Setiap artikel yang kami terbitkan berlandaskan bukti telaah sejawat. Studi-studi di atas membentuk basis bukti untuk',
  crossBlog: 'panduan blog',
  crossTail:
    'kami tentang memilih rumah sakit, memahami biaya, bersiap untuk kunjungan gigi atau TCM, dan menavigasi asuransi. Baca panduan terlebih dahulu, lalu telusuri setiap klaim kembali ke penelitian asli.',
  viewOriginal: 'Lihat publikasi asli',
  categoryLabels: {
    all: 'Semua',
    'patient-experience': 'Pengalaman Pasien',
    'medical-tourism': 'Wisata Medis',
    'quality-safety': 'Kualitas & Keamanan',
    'cost-value': 'Biaya & Nilai',
    tcm: 'Pengobatan Tradisional Tiongkok',
    dental: 'Kedokteran Gigi',
    checkup: 'Pemeriksaan Kesehatan',
  } as Record<string, string>,
  fieldLabels: {
    type: 'Jenis Studi',
    population: 'Populasi / N',
    finding: 'Temuan Kunci',
    limitation: 'Keterbatasan',
  },
}

// id → Indonesian field translations. Title/source/pmid/url stay English.
export const researchId: Record<number, StudyIdFields> = {
  1: {
    type: 'Survei potong lintang',
    population: '171 pasien rawat jalan (92 Tiongkok + 79 internasional) di Rumah Sakit Renji, Shanghai',
    focus: 'Permintaan & kepuasan pasien',
    finding:
      'Pasien internasional menilai proses perawatan medis paling tinggi (rata-rata 4.56/5). Kualifikasi institusi adalah area "permintaan tinggi, kepuasan rendah" yang paling umum, menunjukkan ruang untuk perbaikan dalam mengomunikasikan kredensial rumah sakit.',
    limitation: 'Desain potong lintang satu pusat; temuan mungkin tidak dapat digeneralisasi ke rumah sakit non-akademik.',
  },
  2: {
    type: 'Kualitatif (kelompok fokus)',
    population: '24 klien internasional dari 9 negara + 4 penyedia layanan kesehatan di Rumah Sakit Sir Run Run Shaw, Universitas Zhejiang',
    focus: 'Identifikasi kebutuhan kesehatan',
    finding:
      'Enam kebutuhan utama diidentifikasi: privasi dan kerahasiaan, komunikasi yang efektif, perawatan sensitif budaya, lingkungan yang menyenangkan, perawatan dan prosedur berkualitas, serta rasa hormat. Privasi adalah perhatian yang paling sering ditekankan.',
    limitation: 'Desain kualitatif satu pusat; temuan mencerminkan persepsi, bukan hasil yang terukur.',
  },
  3: {
    type: 'Survei potong lintang',
    population: '164 mahasiswa internasional Asia di 3 kota (Beijing, Nanning, Baise)',
    focus: 'Determinan kepuasan',
    finding:
      'Kepuasan keseluruhan terhadap layanan medis Tiongkok (8.04/10) secara signifikan lebih tinggi dibandingkan di negara asal mahasiswa (6.96/10). Kemudahan pendaftaran, kualitas fasilitas, dan responsivitas staf adalah pendorong kepuasan utama.',
    limitation: 'Hanya tiga kota; populasi mahasiswa mungkin tidak mewakili wisatawan medis umum; tidak ada pengukuran hasil klinis.',
  },
  4: {
    type: 'Analisis konten',
    population: '10 testimoni video dari pasien asing (9.033 kata yang ditranskripsikan)',
    focus: 'Komunikasi & sentimen',
    finding:
      'Pasien asing memuji efisiensi layanan kesehatan, ketersediaan kunjungan tanpa janji temu, dan biaya yang terjangkau. Perlindungan privasi selama pemeriksaan menjadi perhatian yang dicatat.',
    limitation: 'Sampel kecil; konten daring yang dipilih sendiri dapat condong positif; tidak terindeks PubMed.',
  },
  5: {
    type: 'Survei potong lintang',
    population: '654 imigran dari 75 negara yang tinggal di Chengdu',
    focus: 'Pemanfaatan layanan gigi',
    finding:
      '15,6% imigran mengalami masalah gigi di Tiongkok tetapi tidak mengunjungi dokter gigi. Tinggal di Chengdu selama minimal 10,5 bulan adalah ambang yang membedakan perilaku kunjungan dokter gigi. Imigran perempuan dan mereka yang memiliki kebiasaan benang gigi lebih cenderung mencari perawatan.',
    limitation: 'Satu kota (Chengdu); potong lintang; masalah gigi yang dilaporkan sendiri tanpa verifikasi klinis.',
  },
  6: {
    type: 'Metode campuran (kelompok fokus + survei)',
    population: '352 profesional wisata medis; data pasien dari Tiongkok, Rusia, Jepang (160 responden Tiongkok)',
    focus: 'Preferensi pasien negara sasaran',
    finding:
      'Pasien Tiongkok yang berkunjung ke Korea terutama mencari pengobatan penyakit dalam (35%), pemeriksaan kesehatan (21%), dan bedah plastik (21%). Pasien Tiongkok menunjukkan loyalitas yang kuat terhadap institusi yang mereka kunjungi secara rutin. Kualitas layanan kesehatan dan sumber daya pariwisata dinilai penting dan memuaskan.',
    limitation: 'Dilakukan di Busan, Korea; temuan mencerminkan konteks wisata medis Korea, bukan khusus Tiongkok.',
  },
  7: {
    type: 'Survei nasional yang ditugaskan pemerintah',
    population: 'Pasien asing dari berbagai negara (Tiongkok, Mongolia, Timur Tengah, CIS, AS, Rusia)',
    focus: 'Kepuasan pasien tingkat nasional',
    finding:
      'Kepuasan keseluruhan adalah 89,9%. Pasien Tiongkok melaporkan kepuasan 83,6% — terendah di antara kewarganegaraan yang disurvei — dengan teknologi medis sebagai prioritas utama mereka. Pasien CIS melaporkan kepuasan tertinggi (93,8%).',
    limitation: 'Data spesifik Korea; mungkin tidak mencerminkan pengalaman pasien di Tiongkok; metrik kepuasan bervariasi menurut metodologi survei.',
  },
  8: {
    type: 'Survei potong lintang',
    population: '315 wisatawan medis internasional di Tiongkok',
    focus: 'Pendorong niat kunjungan ulang',
    finding:
      'Kualitas medis yang dirasakan dan kepercayaan pada dokter adalah prediktor terkuat apakah wisatawan medis akan kembali ke Tiongkok untuk pengobatan di masa mendatang.',
    limitation: 'Potong lintang; niat yang dilaporkan sendiri, bukan perilaku yang terukur.',
  },
  9: {
    type: 'Tinjauan literatur sistematis + studi kasus',
    population: 'Tinjauan literatur + Zona Percontohan Wisata Medis Internasional Hainan Boao Lecheng',
    focus: 'Transformasi industri',
    finding:
      'Tiongkok sedang bertransisi dari pengekspor wisata medis menjadi destinasi. 850+ institusi medis di 57 kota kini menawarkan layanan medis internasional, didorong oleh keunggulan biaya, daya tarik TCM, dan dukungan kebijakan.',
    limitation: 'Tidak terindeks PubMed; metodologi tinjauan mungkin melewatkan sumber non-bahasa Inggris.',
  },
  10: {
    type: 'Analisis kompetensi profesional (analisis konten tematik)',
    population: '30 pakar layanan kesehatan',
    focus: 'Kompetensi & standar MTF',
    finding:
      'Mengidentifikasi 14 tema dan 35 kompetensi MTF yang berbeda di seluruh pengetahuan, keterampilan personal, dan kemampuan spesifik pekerjaan. Fasilitator layanan penuh menyediakan cakupan terluas: logistik perjalanan, pemilihan dokter, perawatan pascaoperasi, penerjemahan, dan bimbingan budaya. ISO 22525:2020 memberikan standar internasional untuk peran MTF.',
    limitation: 'Model kompetensi berdasarkan pendapat pakar, bukan data hasil pasien.',
  },
  11: {
    type: 'Kualitatif (etnografi + wawancara)',
    population: 'Perusahaan fasilitasi layanan kesehatan komersial dan pekerjanya',
    focus: 'Dinamika broker vs fasilitator',
    finding:
      'Fasilitator komersial menempati posisi yang berpengaruh namun kurang dipahami dalam sistem layanan kesehatan. Berbagai tingkat kendali atas lokasi, jenis, biaya, dan pengalaman penyediaan layanan kesehatan menciptakan potensi konflik kepentingan antara pendapatan fasilitator dan kesejahteraan pasien.',
    limitation: 'Kualitatif; berfokus pada perusahaan fasilitasi secara umum, bukan spesifik Tiongkok.',
  },
  12: {
    type: 'Analisis kebijakan (Kelompok Riset Wisata Medis Universitas Simon Fraser)',
    population: 'Analisis situs web fasilitator dan praktik industri',
    focus: 'Komunikasi risiko & persetujuan terinformasi',
    finding:
      'Hanya 17,6% situs web fasilitator Kanada membahas kemungkinan risiko. Hanya 4,9% membahas perawatan pascaoperasi, 1,1% jalur hukum, 2,2% komplikasi. Fasilitator secara sistematis menekankan manfaat sambil mengecilkan risiko, berpotensi merusak persetujuan terinformasi.',
    limitation: 'Konteks Kanada; data dari 2011; metodologi analisis situs web; praktik industri mungkin telah berkembang.',
  },
  13: {
    type: 'Tinjauan literatur',
    population: 'Basis data PubMed, Scopus, Google Scholar (jangka tinjauan 15 tahun)',
    focus: 'Tren wisata medis & gigi global',
    finding:
      'Penghematan biaya adalah motivasi utama pasien (75% responden). Akses ke teknologi maju (60%) dan waktu tunggu yang lebih singkat (55%) menyusul. Kekhawatiran kualitas perawatan (50%) dan kesulitan dalam perawatan pascaoperasi (40%) adalah tantangan yang paling banyak dilaporkan.',
    limitation: 'Tidak terindeks PubMed; tinjauan sumber sekunder; data persentase dari survei agregat dengan metodologi yang bervariasi.',
  },
  14: {
    type: 'Statistik pemerintah',
    population: 'Data tingkat nasional dari Komisi Kesehatan Nasional Tiongkok',
    focus: 'Volume layanan & pertumbuhan',
    finding:
      'Rumah sakit yang ditunjuk utama menerima 1,28 juta kunjungan pasien internasional pada tahun 2025. Volume pasien internasional tumbuh 73,6% selama tiga tahun. 850+ institusi medis di 57 kota menyediakan layanan medis internasional.',
    limitation: 'Data yang dilaporkan pemerintah; metodologi dan standar verifikasi tidak diaudit secara independen.',
  },
  15: {
    type: 'Data program pemerintah',
    population: '22 rumah sakit publik percontohan di Shanghai',
    focus: 'Hasil program',
    finding:
      'Layanan medis internasional Shanghai melebihi 300.000 kunjungan pada H1 2024. Departemen internasional Rumah Sakit Ruijin saja menangani ~150.000 kunjungan rawat jalan, dengan kunjungan pasien asing tumbuh ~15% tahun ke tahun.',
    limitation: 'Data yang dilaporkan program; mencakup penduduk ekspatriat dan wisatawan medis.',
  },
  16: {
    type: 'Tinjauan rekam medis retrospektif',
    population: '91 pasien yang menjalani operasi bariatrik di luar negeri dan datang ke pusat akademik AS di dekat perbatasan Meksiko',
    focus: 'Tingkat komplikasi & biaya penanganan',
    finding:
      'Kebocoran anastomosis/garis jahitan terjadi pada 33,0% pasien — jauh lebih tinggi daripada tingkat nasional AS <1%. 56,0% memerlukan rawat inap, 19,8% memerlukan ICU. Biaya rumah sakit rata-rata untuk penanganan kebocoran: $424.976 per pasien. Mortalitas keseluruhan: 3,3%.',
    limitation: 'Satu pusat; hanya menangkap pasien yang kembali dengan komplikasi; penyebut sebenarnya dari semua wisatawan medis tidak diketahui; tingkat komplikasi kemungkinan dilebih-lebihkan.',
  },
  17: {
    type: 'Analisis biaya retrospektif',
    population: '30 pasien yang datang dengan komplikasi dari operasi kosmetik yang dilakukan di luar negeri',
    focus: 'Biaya penanganan komplikasi',
    finding:
      'Infeksi lokasi bedah adalah komplikasi yang paling umum. Biaya penanganan rata-rata: $5.852 per pasien. Iran adalah destinasi yang paling sering dikunjungi. Penghematan biaya dari operasi di luar negeri seringkali dihilangkan oleh biaya penanganan komplikasi.',
    limitation: 'Satu pusat di Bahrain; sampel kecil; hanya menangkap kasus komplikasi; fokus bedah kosmetik mungkin tidak dapat digeneralisasi ke prosedur lain.',
  },
  18: {
    type: 'Presentasi konferensi (Forum Internasional BMJ tentang Kualitas & Keamanan dalam Layanan Kesehatan)',
    population: 'Standar Akreditasi Rumah Sakit Kelas 3A Tiongkok (183 kriteria, edisi 2020) dan Standar Akreditasi Rumah Sakit Internasional Tiongkok (CIHA, edisi 2021)',
    focus: 'Evolusi sistem akreditasi rumah sakit',
    finding:
      'Standar Kelas 3A Tiongkok bersifat komprehensif (183 kriteria mencakup tanggung jawab sosial, kendali mutu, praktik klinis, manajemen teknologi). Edisi CIHA 2021 disertifikasi oleh ISQua-EEA pada tahun 2022, meraih skor 97% di 66 kriteria — mencapai pengakuan internasional penuh atas sistem akreditasi rumah sakit Tiongkok.',
    limitation: 'Presentasi konferensi, bukan publikasi telaah sejawat; standar akreditasi menjelaskan proses, bukan hasil klinis.',
  },
  19: {
    type: 'Analisis kebijakan',
    population: 'Sekitar 1.795 rumah sakit Grade 3A di Tiongkok (hingga akhir 2023)',
    focus: 'Sistem klasifikasi rumah sakit',
    finding:
      'Grade 3A adalah klasifikasi rumah sakit tertinggi di Tiongkok, yang dikelola oleh Komisi Kesehatan Nasional. Standar edisi 2025 menekankan kemampuan klinis, volume bedah Kelas IV, Case Mix Index (CMI), dan indikator kendali mutu untuk onkologi, pengendalian infeksi, dan radiologi. JCI menutup bisnis akreditasi Tiongkok pada April 2023 — tidak ada akreditasi baru yang dikeluarkan.',
    limitation: 'Analisis kebijakan; akreditasi menjelaskan kemampuan institusi, bukan kualitas dokter individu atau hasil pasien.',
  },
  20: {
    type: 'Analisis industri',
    population: 'Data harga yang dipublikasikan dari departemen internasional rumah sakit',
    focus: 'Perbedaan biaya',
    finding:
      'Terapi sel CAR-T: $40.000–$80.000 di Tiongkok dibandingkan $400.000+ di AS (penghematan 80–90%). Terapi proton: $30.000–$55.000 dibandingkan $100.000–$200.000 (penghematan 70–80%). Penggantian lutut: $8.000–$15.000 dibandingkan $30.000–$70.000 (penghematan 70–85%).',
    limitation: 'Rentang estimasi; biaya aktual bervariasi berdasarkan kompleksitas kasus, tingkatan rumah sakit, dan cakupan asuransi.',
  },
  21: {
    type: 'Tinjauan literatur (data sekunder)',
    population: 'Tinjauan literatur wisata medis termasuk tabel perbandingan biaya dari Herrick (2007)',
    focus: 'Faktor pemilihan destinasi & perbandingan biaya',
    finding:
      'Biaya operasi di destinasi wisata medis adalah 30–70% lebih rendah daripada AS, dengan beberapa prosedur hingga 80% lebih rendah. Perbandingan contoh: Bypass Jantung — Malaysia $12.000 vs AS $130.000; Penggantian Lutut — Thailand $10.000 vs AS $40.000; Penggantian Pinggul — India $7.100 vs AS $43.000.',
    limitation: 'Data dari 2007–2012; harga telah berubah secara signifikan; metodologi tinjauan sekunder; tidak mencakup harga spesifik Tiongkok.',
  },
  22: {
    type: 'Studi kohort (retrospektif)',
    population: '356 pasien artroplasti lutut di Rumah Sakit H (penduduk Hong Kong yang dirawat di Tiongkok daratan)',
    focus: 'Lama tinggal & biaya rawat inap',
    finding:
      'Pasien Hong Kong memiliki lama tinggal yang lebih singkat, lama tinggal pascaoperasi yang lebih singkat, dan biaya rawat inap yang lebih rendah dibandingkan pasien non-lokal domestik — membalikkan pola "dual-tinggi" yang khas. Tidak ada infeksi yang didapat di rumah sakit yang tercatat. Lama tinggal menjadi mediator penuh perbedaan biaya.',
    limitation: 'Satu rumah sakit; hanya biaya rawat inap yang ditangkap (tidak termasuk transportasi, akomodasi, rehabilitasi setelah pulang); tidak ada data tindak lanjut jangka panjang.',
  },
  23: {
    type: 'Laporan kasus',
    population: 'Kasus pasien individu (operasi kosmetik di Meksiko)',
    focus: 'Biaya tersembunyi komplikasi wisata medis',
    finding:
      'Seorang pasien menjalani beberapa prosedur kosmetik di Meksiko dengan biaya di bawah $5.000. Komplikasi dari prosedur tersebut memerlukan perawatan luas di AS, membengkakkan total biaya perawatan menjadi lebih dari $77.000 — 15 kali lipat biaya prosedur asli.',
    limitation: 'Laporan kasus tunggal; tidak dapat digeneralisasi; mewakili skenario terburuk, bukan hasil tipikal.',
  },
  24: {
    type: 'Analisis industri',
    population: 'Harga yang dipublikasikan dari departemen internasional rumah sakit Grade 3A di Shanghai dan Beijing',
    focus: 'Perbedaan biaya pemeriksaan kesehatan',
    finding:
      'Pemeriksaan kesehatan eksekutif komprehensif di departemen internasional rumah sakit publik terkemuka Tiongkok biasanya berharga $300–$1.200, dibandingkan dengan $2.500–$8.000 untuk panel bayar pribadi yang setara di AS. Pencitraan seluruh tubuh dan pemeriksaan biomarker diselesaikan dalam 4–8 jam, seringkali dengan hasil di hari yang sama.',
    limitation: 'Isi paket bervariasi antar penyedia; perbandingan harga utama mungkin tidak mencerminkan panel tes yang identik; biaya perjalanan dan akomodasi tidak termasuk.',
  },
  25: {
    type: 'Analisis biaya retrospektif',
    population: '30 pasien di pusat tersier di Bahrain',
    focus: 'Beban ekonomi komplikasi',
    finding:
      'Penanganan komplikasi untuk operasi kosmetik yang dilakukan di luar negeri menelan biaya rata-rata $5.852 per pasien, dengan total proyeksi biaya $175.000 bagi sistem layanan kesehatan Bahrain. Destinasi yang paling umum adalah Iran. Penghematan biaya dari operasi di luar negeri seringkali dihilangkan oleh penanganan komplikasi.',
    limitation: 'Satu pusat; sampel kecil; hanya menangkap kasus komplikasi; fokus bedah kosmetik.',
  },
  26: {
    type: 'RCT multisenter (6 rumah sakit tingkat tersier di Tiongkok)',
    population: '216 pasien dengan skiatika kronis akibat herniasi diskus (110 akupunktur + 110 akupunktur tiruan)',
    focus: 'Efektivitas akupunktur untuk skiatika kronis',
    finding:
      'Kelompok akupunktur menunjukkan pengurangan nyeri yang secara signifikan lebih besar (VAS: -30,8 mm vs -14,9 mm, P<0,001) dan perbaikan fungsi (ODI: -13,0 vs -4,9 poin, P<0,001) dibandingkan akupunktur tiruan. Manfaat bertahan melalui tindak lanjut 52 minggu. Tidak ada kejadian buruk serius yang terjadi.',
    limitation: 'Hanya dilakukan di rumah sakit Tiongkok; populasi pasien adalah orang Tiongkok; hasil mungkin tidak dapat digeneralisasi ke etnis atau pengaturan layanan kesehatan lain.',
  },
  27: {
    type: 'Uji coba terkontrol plasebo tersembunyi',
    population: '60 pasien dengan IBS yang mapan di rumah sakit pendidikan Eropa',
    focus: 'Efektivitas akupunktur untuk IBS',
    finding:
      'Tidak ada perbedaan signifikan secara statistik antara akupunktur (respons 40,7%) dan akupunktur tiruan (respons 31,2%). Kedua kelompok membaik secara signifikan dari baseline, menunjukkan efek plasebo/kontekstual yang kuat. Akupunktur tradisional Tiongkok relatif tidak efektif untuk IBS dalam pengaturan rumah sakit Eropa ini.',
    limitation: 'Sampel kecil (N=60); satu pusat; pengaturan Eropa mungkin tidak mencerminkan hasil di rumah sakit TCM Tiongkok dengan perawatan terintegrasi.',
  },
  28: {
    type: 'Tinjauan literatur',
    population: 'Berbagai studi tentang internasionalisasi TCM',
    focus: 'Daya tarik & bukti TCM',
    finding:
      'Terapi TCM (akupunktur, pijat tuina, obat herbal) semakin dicari oleh pasien internasional untuk manajemen penyakit kronis dan rehabilitasi. Peran TCM dalam wisata medis global tumbuh sebagai keunggulan kompetitif yang khas bagi Tiongkok.',
    limitation: 'Banyak studi yang mendasari diterbitkan hanya dalam basis data Tiongkok; kualitas metodologis bervariasi; efektivitas TCM untuk banyak kondisi masih dalam penyelidikan.',
  },
  29: {
    type: 'Protokol RCT (multisenter, internasional)',
    population: 'Rencana pendaftaran di berbagai situs di Tiongkok dan Jepang (Universitas Tokyo Ariake)',
    focus: 'Akupunktur untuk gejala kardiovaskular',
    finding:
      'Protokol menjelaskan efek analgesik fisiologis akupunktur yang diamati pada pasien Tiongkok dengan angina stabil. Mekanisme yang diusulkan melibatkan downregulation sistem saraf otonom. Kolaborasi internasional mencakup lembaga penelitian Jepang, mencerminkan penelitian TCM lintas batas yang berkembang.',
    limitation: 'Hanya protokol — hasil belum dipublikasikan pada saat entri ini; temuan bersifat awal.',
  },
  30: {
    type: 'Analisis kebijakan',
    population: 'Dokumen kebijakan pemerintah Tiongkok dan laporan industri',
    focus: 'TCM sebagai pembeda wisata medis',
    finding:
      'Pemerintah Tiongkok telah memposisikan TCM sebagai proposisi penjualan unik untuk wisata medis masuk. Kebijakan TCM nasional (2021–2035) secara eksplisit mendukung layanan TCM internasional. Zona percontohan Hainan Boao Lecheng mengintegrasikan TCM dengan wisata medis konvensional. TCM disebut sebagai faktor kunci yang membedakan Tiongkok dari Thailand, India, dan Turki.',
    limitation: 'Analisis kebijakan; sumber pemerintah dapat melebih-lebihkan peran TCM; bukti klinis untuk banyak pengobatan TCM masih terbatas menurut standar Barat.',
  },
  31: {
    type: 'Studi kohort retrospektif',
    population: '90 subjek, 428 implan di praktik gigi swasta di Tiongkok pedesaan; tindak lanjut rata-rata 453 hari',
    focus: 'Kelangsungan implan dan kehilangan tulang marginal pada populasi Tiongkok pedesaan',
    finding:
      'Terapi implan gigi menunjukkan tingkat kelangsungan hidup yang tinggi (100%) dan kehilangan tulang marginal yang minimal (rata-rata 0,10 mm). Usia, lokasi implan (mandibula > maksila), dan diameter implan yang lebih lebar berasosiasi dengan peningkatan kehilangan tulang.',
    limitation: 'Satu praktik swasta di pedesaan Tiongkok; desain retrospektif; tidak ada perbandingan dengan populasi perkotaan.',
  },
  32: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan komprehensif bahan gigi berbasis zirkonia dari PubMed dan Web of Science',
    focus: 'Sifat, klasifikasi, dan aplikasi gigi keramik zirkonia',
    finding:
      'Keramik zirkonia menunjukkan sifat mekanis yang unggul, daya tahan, dan transparansi yang semakin baik untuk restorasi gigi. Tantangan tetap ada dalam menyeimbangkan ketahanan degradasi suhu rendah dengan kekuatan mekanis dan estetika.',
    limitation: 'Tinjauan naratif tanpa meta-analisis; tidak memberikan perbandingan kuantitatif hasil klinis lintas generasi zirkonia.',
  },
  33: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan studi tentang hiperlipidemia dan osseointegrasi implan gigi',
    focus: 'Dampak hiperlipidemia pada keberhasilan implan dan strategi mitigasi',
    finding:
      'Hiperlipidemia dapat memengaruhi metabolisme tulang dan menghambat osseointegrasi melalui regulasi timbal balik adiposit, osteoblas, dan osteoklas. Metode penghantaran obat lokal (pelapisan statin, hidrogel, nanopartikel) pada permukaan implan dapat mempromosikan osseointegrasi dalam lingkungan hiperlipidemik.',
    limitation: 'Artikel tinjauan; sebagian besar bukti dari studi hewan; penerjemahan klinis sistem penghantaran obat baru masih terbatas.',
  },
  34: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan teknik regenerasi tulang untuk penempatan implan gigi',
    focus: 'Cangkok tulang, regenerasi tulang terpandu, elevasi dasar sinus, dan osteogenesis distraksi',
    finding:
      'Bedah rekonstruktif diperlukan sebelum penempatan implan untuk meregenerasi defek tulang. Cangkok tulang tetap menjadi standar emas, seringkali dikombinasikan dengan regenerasi tulang terpandu menggunakan membran penghalang. Elevasi dasar sinus dan distraksi tulang adalah teknik tambahan untuk skenario klinis tertentu.',
    limitation: 'Tinjauan naratif dari penulis praktik swasta; tidak ada sintesis bukti sistematis atau meta-analisis.',
  },
  35: {
    type: 'Tinjauan sistematis dan meta-analisis',
    population: '12 studi (8 RCT, 4 kohort); 456 implan ARP vs 459 implan IIP',
    focus: 'Tingkat keberhasilan implan membandingkan penempatan tertunda dengan pelestarian rabung vs penempatan segera',
    finding:
      'Implan yang ditempatkan melalui protokol pelestarian rabung alveolar (ARP) menunjukkan tingkat keberhasilan yang secara signifikan lebih tinggi (98,68%) dibandingkan penempatan implan segera (IIP, 95,21%) (RR 1,03, 95% CI 1,01-1,06, P=0,008).',
    limitation: 'Keterbatasan jumlah studi yang disertakan; heterogenitas dalam protokol bedah dan durasi tindak lanjut; sebagian besar studi dari pusat tunggal.',
  },
  36: {
    type: 'Tinjauan sistematis dan meta-analisis',
    population: '35 studi; 4.363 mahkota tunggal logam-keramik dan 912 zirkonia yang disangga implan; tindak lanjut minimal 3 tahun',
    focus: 'Tingkat kelangsungan hidup dan komplikasi 5 tahun mahkota zirkonia vs logam-keramik',
    finding:
      'Tingkat kelangsungan hidup 5 tahun sebanding: 98,3% untuk logam-keramik vs 97,6% untuk mahkota zirkonia. Mahkota zirkonia menunjukkan lebih sedikit komplikasi estetika tetapi secara signifikan lebih banyak patah material (2,1% vs 0,2%).',
    limitation: 'Tidak ada studi tentang mahkota zirkonia monolitik baru yang memenuhi kriteria inklusi; relatif sedikit kasus zirkonia yang tersedia untuk analisis.',
  },
  37: {
    type: 'Penelitian orisinal',
    population: 'Pengembangan dan validasi sistem AI untuk perencanaan implan berbasis CBCT',
    focus: 'Penilaian praoperasi berbantuan AI morfologi tulang alveolar untuk bedah implan',
    finding:
      'Perencanaan berbantuan AI dapat menilai morfologi tulang alveolar secara akurat dari citra CBCT, berpotensi meningkatkan presisi bedah dan mengurangi ketergantungan operator. Sistem menunjukkan kelayakan untuk integrasi klinis.',
    limitation: 'Teknologi tahap awal; validasi terbatas pada data retrospektif; hasil klinis prospektif belum dilaporkan.',
  },
  38: {
    type: 'Uji coba terkontrol acak',
    population: '60 partisipan dengan TMD; akupunktur vs akupunktur tiruan, 3 sesi/minggu selama 4 minggu',
    focus: 'Akupunktur untuk nyeri gangguan sendi temporomandibular',
    finding:
      'Akupunktur memberikan pengurangan nyeri yang secara signifikan lebih besar dibandingkan tiruan pada minggu ke-4 (MD -1,49, 95% CI -2,32 hingga -0,65, P<0,001) dengan efek yang bertahan pada minggu ke-8. Peningkatan fungsi rahang, kesejahteraan emosional, dan kualitas tidur juga diamati.',
    limitation: 'Ukuran sampel kecil (n=60); satu pusat di Beijing; protokol akupunktur tiruan mungkin tidak sepenuhnya mengontrol plasebo.',
  },
  39: {
    type: 'Meta-analisis data pasien individu',
    population: '20.827 pasien dari 39 RCT; nyeri muskuloskeletal kronis, osteoartritis, sakit kepala, nyeri bahu',
    focus: 'Ukuran efek dan persistensi akupunktur untuk nyeri kronis',
    finding:
      'Akupunktur lebih unggul daripada kontrol tiruan dan tanpa akupunktur untuk semua kondisi nyeri (P<0,001), dengan efek sekitar 0,5 SD vs tanpa kontrol dan 0,2 SD vs tiruan. Efek pengobatan bertahan dari waktu ke waktu dengan hanya ~15% penurunan pada 1 tahun.',
    limitation: 'Ukuran efek sebagian didorong oleh jenis kelompok kontrol; tidak dapat sepenuhnya memisahkan efek penusukan jarum spesifik dari faktor kontekstual/plasebo.',
  },
  40: {
    type: 'Uji coba terkontrol acak silang',
    population: '60 pasien dengan neuropati perifer akibat kemoterapi (CIPN)',
    focus: 'Akupunktur untuk CIPN menggunakan studi konduksi saraf sebagai hasil utama',
    finding:
      'Akupunktur secara signifikan meningkatkan amplitudo saraf sensorik sural dan kecepatan konduksi (ukuran efek 0,55 dan 0,49). Perbaikan subjektif pada nyeri terbakar, kram, mati rasa, dan ketidakstabilan gaya berjalan juga dilaporkan.',
    limitation: 'Satu pusat di Jerman (dengan kolaborasi Shanghai); tidak ada tindak lanjut jangka panjang melebihi 28 minggu; desain silang dapat membawa efek sisa residual.',
  },
  41: {
    type: 'Tinjauan sistematis Cochrane',
    population: '33 studi (8.270 partisipan) membandingkan akupunktur dengan tiruan, tanpa pengobatan, atau perawatan biasa',
    focus: 'Akupunktur untuk nyeri punggung bawah nonspesifik kronis',
    finding:
      'Bukti kepastian rendah menunjukkan akupunktur dapat memberikan peredaan nyeri jangka pendek yang kecil dibandingkan tiruan (MD -9,22 pada VAS 0-100). Bukti kepastian sedang menunjukkan peredaan nyeri yang penting secara klinis dan perbaikan fungsi dibandingkan tanpa pengobatan.',
    limitation: 'Sebagian besar studi memiliki risiko bias performa yang tinggi; bukti diturunkan ke kepastian rendah/sangat rendah karena bias, inkonsistensi, dan ketidaktepatan.',
  },
  42: {
    type: 'Tinjauan sistematis dan meta-analisis',
    population: '14 RCT, 793 pasien dengan nyeri terkait endometriosis',
    focus: 'Efektivitas akupunktur untuk nyeri endometriosis, kadar CA-125, dan ukuran nodul',
    finding:
      'Akupunktur menunjukkan pengurangan yang signifikan dalam keparahan nyeri (SMD -1,10, P<0,001), meningkatkan tingkat respons (RR 1,25, P=0,02), dan menurunkan kadar CA-125 serum (SMD -0,62, P=0,024) dibandingkan kontrol.',
    limitation: 'Studi yang disertakan memiliki kelemahan desain dan kualitas; intervensi kontrol bervariasi (plasebo, TCM, pengobatan Barat); RCT berkualitas tinggi terbatas.',
  },
  43: {
    type: 'Tinjauan sistematis dan meta-analisis',
    population: '16 RCT, 1.124 partisipan dengan nyeri kanker',
    focus: 'Akupunktur untuk nyeri kanker vs tanpa pengobatan, tiruan, atau perawatan biasa',
    finding:
      'Akupunktur lebih efektif daripada tanpa pengobatan (SMD -0,90), akupunktur tiruan (SMD -1,10), dan perawatan biasa (SMD -1,16) dalam mengurangi nyeri kanker.',
    limitation: 'Kualitas rendah dan ukuran sampel kecil beberapa studi; tipe dan stadium kanker yang heterogen; pelaporan kejadian merugikan yang terbatas.',
  },
  44: {
    type: 'Tinjauan sistematis Cochrane',
    population: '28 uji coba, 3.960 wanita (13 akupunktur, 15 akutekanan)',
    focus: 'Akupunktur/akutekanan untuk manajemen nyeri persalinan',
    finding:
      'Akupunktur dapat meningkatkan kepuasan dengan peredaan nyeri (RR 2,38 vs tiruan) dan mengurangi penggunaan analgesia farmakologis (RR 0,75 vs tiruan). Akutekanan kemungkinan mengurangi angka operasi caesar dibandingkan tiruan (RR 0,44).',
    limitation: 'Tidak ada studi pada risiko bias rendah di semua domain; kepastian bukti sangat rendah untuk sebagian besar perbandingan; heterogenitas dalam protokol akupunktur.',
  },
  45: {
    type: 'Studi potong lintang',
    population: '10.733.975 dewasa berusia 20+ dari seluruh 31 provinsi di Tiongkok; basis data pemeriksaan kesehatan 2017-2022',
    focus: 'Prevalens nasional aterosklerosis karotis dan variasi regional',
    finding:
      'Diperkirakan 26,2% memiliki penebalan intima-media karotid dan 21,0% memiliki plak karotid. Prevalens lebih tinggi pada dewasa yang lebih tua, laki-laki, Tiongkok utara, dan mereka yang memiliki hipertensi, diabetes, atau dislipidemia.',
    limitation: 'Populasi pemeriksaan kesehatan mungkin tidak mewakili populasi umum (bias seleksi); desain potong lintang membatasi inferensi kausal.',
  },
  46: {
    type: 'Studi kohort retrospektif',
    population: 'Populasi pemeriksaan kesehatan di Rumah Sakit West China, 2006-2017; 10.259 calon skrining tidak memenuhi syarat',
    focus: 'Hasil skrining kanker paru CT dosis rendah pada calon tidak layak vs layak',
    finding:
      '64,13% peserta pemeriksaan kesehatan tidak memenuhi syarat menurut pedoman nasional, namun 39,04% memiliki skrining positif. Tingkat biopsi positif palsu lebih tinggi pada calon tidak layak (7,69%) dibandingkan layak (2,47%).',
    limitation: 'Satu pusat di West China; desain retrospektif; kriteria kelayakan berdasarkan pedoman 2018 mungkin tidak mencerminkan praktik terkini.',
  },
  47: {
    type: 'Studi potong lintang',
    population: '2.788.206 dewasa dari pusat pemeriksaan kesehatan di 30 provinsi, 2017-2023',
    focus: 'Prevalens Lipoprotein(a) dan asosiasinya dengan aterosklerosis subklinis multisitus',
    finding:
      'Prevalens Lp(a) tinggi (>30 mg/dL) adalah 18,67%. Lp(a) yang lebih tinggi berasosiasi dengan peningkatan odds penebalan intima-media karotid, plak karotid, infark otak, dan kalsifikasi arteri koroner, dengan asosiasi yang lebih kuat untuk keterlibatan multisitus.',
    limitation: 'Desain potong lintang; Lp(a) diukur dengan asai yang berbeda; tidak dapat menetapkan kausalitas; bias seleksi populasi pemeriksaan kesehatan.',
  },
  48: {
    type: 'Emulasi uji coba sasaran (kohort observasional)',
    population: '4.972.228 dewasa berusia 40+ yang mengikuti pemeriksaan kesehatan dengan skrining depresi di Taiwan, 2013-2019',
    focus: 'Dampak skrining depresi dalam pemeriksaan kesehatan terhadap tingkat pengobatan dan hasil',
    finding:
      'Individu yang diskrining memiliki tingkat depresi baru diobati yang lebih tinggi (HR 1,63) dan risiko rawat inap psikiatri yang lebih rendah (HR 0,93). Namun, hanya 10,8% individu yang positif skrining menerima pengobatan selama periode studi.',
    limitation: 'Studi Taiwan, bukan Tiongkok daratan; desain observasional; skrining dapat mendeteksi kasus ringan tanpa manfaat klinis yang jelas; hasil bunuh diri tidak pasti.',
  },
  49: {
    type: 'Studi berbasis registri',
    population: '46.978 kasus kanker paru insiden dan 34.475 kematian dari ~3,21 juta populasi di Kawasan Baru Pudong, Shanghai',
    focus: 'Overdiagnosis kanker paru akibat diperkenalkannya Computed Tomography dosis rendah pada populasi risiko rata-rata',
    finding:
      'Diperkenalkannya LDCT pada populasi risiko rata-rata mungkin telah menyebabkan overdiagnosis kanker paru yang substansial. Studi mengkuantifikasi insiden berlebih relatif terhadap tren yang diharapkan, menunjukkan bahwa penggunaan LDCT secara luas dalam pemeriksaan kesehatan memerlukan kriteria skrining yang lebih tepat sasaran.',
    limitation: 'Satu distrik (Pudong, Shanghai); data registri tidak dapat membedakan kanker yang terdeteksi skrining dari kanker yang terdeteksi gejala pada tingkat individu.',
  },
  50: {
    type: 'Studi kohort retrospektif',
    population: '33.639 pemeriksa fisik di pusat pemeriksaan besar di Tiongkok, 2017-2019',
    focus: 'Nilai kritis dalam pemeriksaan kesehatan dan asosiasinya dengan risiko penyakit kronis',
    finding:
      'Nilai kritis dalam pemeriksaan kesehatan menunjukkan asosiasi yang signifikan dengan risiko penyakit kronis dan kanker. Analisis evolusi dinamis mengungkap pola pengelompokan biomarker yang dapat membantu stratifikasi risiko dini.',
    limitation: 'Satu pusat pemeriksaan; desain retrospektif; ambang nilai kritis dapat bervariasi di berbagai laboratorium.',
  },
}
