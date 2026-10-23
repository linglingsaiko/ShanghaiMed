// Bahasa Malaysia translations for research library study fields.
// Paper titles, journal names and PMIDs remain in English (research.ms.ts
// only maps id → {type, population, focus, finding, limitation}).

export interface StudyMsFields {
  type: string
  population: string
  focus: string
  finding: string
  limitation: string
}

export const researchMsUi = {
  badge: 'Rujukan Terbuka',
  title: 'Perjalanan Perubatan ke China: Perpustakaan Penyelidikan',
  intro:
    'kajian semakan rakan setara dan sumber data rasmi tentang pengalaman pesakit antarabangsa, kualiti penjagaan kesihatan, dan pelancongan perubatan di China. Setiap entri disahkan terhadap penerbitan asalnya, dengan ringkasan yang merangkumi jenis kajian, saiz sampel, penemuan utama, dan batasan yang dinyatakan.',
  lastReviewed:
    'Semakan dan pengesahan terakhir: 10 Oktober 2026 · Setiap entri telah disemak silang dengan rekod PubMed asal atau penerbitan rasmi.',
  whyTitle: 'Mengapa halaman ini wujud',
  whyP1:
    'Pelancongan perubatan ke China adalah salah satu topik yang paling banyak dibincangkan dalam perjalanan kesihatan global — dan salah satu yang paling kurang bersumber. Dakwaan tentang penjimatan kos, kedudukan kualiti, dan hasil pesakit diedarkan secara meluas tanpa rujukan yang boleh dikesan. Angka sering diambil daripada satu sumber promosi dan dipersembahkan sebagai fakta yang telah muktamad.',
  whyP2:
    'Perpustakaan ini dibina untuk pesakit, wartawan, penulis kesihatan, doktor, dan penyelidik yang memerlukan rekod primer dan bukannya dakwaan yang diulang. Setiap entri menghala ke penerbitan yang kami buka dan semak; tiada apa di sini dimasukkan berdasarkan kekuatan ringkasan sekunder semata-mata. Penemuan diungkapkan dengan bahasa berhemat ("berkaitan dengan", "boleh mengurangkan") kerana itulah yang disokong oleh reka bentuk kajian asas, dan setiap entri membawa sekurang-kurangnya satu batasan yang dinyatakan supaya kelemahan bergerak bersama-sama dengan angka.',
  whyNote:
    'Apa yang halaman ini bukan: Ia bukan garis panduan klinikal, bukan carian sistematik lengkap kesusasteraan, dan bukan nasihat perubatan. Kemasukan kajian di sini bermakna kajian itu wujud dan melaporkan apa yang kami huraikan — bukan bahawa penemuannya adalah muktamad.',
  disclaimerTitle: 'Penafian',
  disclaimer:
    'Perpustakaan penyelidikan ini diselenggara oleh ShanghaiMed untuk tujuan maklumat sahaja. Ia tidak merupakan nasihat perubatan, diagnosis, atau cadangan rawatan. Kemasukan kajian tidak bermakna pengesahan terhadap kesimpulannya. Pesakit yang mempertimbangkan rawatan perubatan di China harus berunding dengan penyedia penjagaan kesihatan yang bertauliah dan mengesahkan semua maklumat secara bebas. ShanghaiMed mungkin mendapat manfaat daripada pesakit yang memilih untuk menggunakan perkhidmatannya selepas membaca halaman ini.',
  disclaimerSee:
    'Lihat',
  disclaimerPolicy: 'Dasar Editorial',
  disclaimerGlossary: 'Glosari Pelancongan Perubatan',
  disclaimerHow: 'untuk cara kami mengendalikan penyumberan, pembetulan, dan konflik kepentingan.',
  crossTitle: 'Penyelidikan di sebalik artikel',
  crossBody:
    'Setiap artikel yang kami terbitkan berlandaskan bukti semakan rakan setara. Kajian di atas membentuk asas bukti untuk',
  crossBlog: 'panduan blog',
  crossTail:
    'kami tentang memilih hospital, memahami kos, bersedia untuk lawatan pergigian atau TCM, dan mengemudi insurans. Baca panduan dahulu, kemudian kesan setiap dakwaan kembali kepada penyelidikan asal.',
  viewOriginal: 'Lihat penerbitan asal',
  categoryLabels: {
    all: 'Semua',
    'patient-experience': 'Pengalaman Pesakit',
    'medical-tourism': 'Pelancongan Perubatan',
    'quality-safety': 'Kualiti & Keselamatan',
    'cost-value': 'Kos & Nilai',
    tcm: 'Perubatan Tradisional China',
    dental: 'Pergigian',
    checkup: 'Pemeriksaan Kesihatan',
  } as Record<string, string>,
  fieldLabels: {
    type: 'Jenis Kajian',
    population: 'Populasi / N',
    finding: 'Penemuan Utama',
    limitation: 'Batasan',
  },
}

// id → Malay field translations. Title/source/pmid/url stay English.
export const researchMs: Record<number, StudyMsFields> = {
  1: {
    type: 'Tinjauan keratan rentas',
    population: '171 pesakit luar (92 China + 79 antarabangsa) di Hospital Renji, Shanghai',
    focus: 'Permintaan & kepuasan pesakit',
    finding:
      'Pesakit antarabangsa menilai proses rawatan perubatan tertinggi (min 4.56/5). Kelayakan institusi merupakan kawasan "permintaan tinggi, kepuasan rendah" yang paling biasa, mencadangkan ruang untuk penambahbaikan dalam mengkomunikasikan kelayakan hospital.',
    limitation: 'Reka bentuk keratan rentas satu pusat; penemuan mungkin tidak digeneralisasikan kepada hospital bukan akademik.',
  },
  2: {
    type: 'Kualitatif (kumpulan fokus)',
    population: '24 pelanggan antarabangsa dari 9 negara + 4 penyedia penjagaan kesihatan di Hospital Sir Run Run Shaw, Universiti Zhejiang',
    focus: 'Pengenalpastian keperluan kesihatan',
    finding:
      'Enam keperluan utama dikenal pasti: privasi dan kerahsiaan, komunikasi berkesan, penjagaan sensitif budaya, persekitaran yang menyenangkan, penjagaan dan prosedur berkelayakan, dan penghormatan. Privasi merupakan kebimbangan yang paling kerap ditekankan.',
    limitation: 'Reka bentuk kualitatif satu pusat; penemuan mencerminkan persepsi, bukan hasil yang diukur.',
  },
  3: {
    type: 'Tinjauan keratan rentas',
    population: '164 pelajar antarabangsa Asia merentasi 3 bandar (Beijing, Nanning, Baise)',
    focus: 'Penentu kepuasan',
    finding:
      'Kepuasan keseluruhan terhadap perkhidmatan perubatan China (8.04/10) adalah jauh lebih tinggi berbanding di negara asal pelajar (6.96/10). Kemudahan pendaftaran, kualiti kemudahan, dan responsif kakitangan merupakan pemacu kepuasan utama.',
    limitation: 'Tiga bandar sahaja; populasi pelajar mungkin tidak mewakili pelancong perubatan umum; tiada ukuran hasil klinikal.',
  },
  4: {
    type: 'Analisis kandungan',
    population: '10 testimoni video daripada pesakit asing (9,033 patah perkataan yang ditranskripsikan)',
    focus: 'Komunikasi & sentimen',
    finding:
      'Pesakit asing memuji kecekapan penjagaan kesihatan, ketersediaan masuk tanpa temujanji, dan kos berpatutan. Perlindungan privasi semasa pemeriksaan merupakan kebimbangan yang dicatatkan.',
    limitation: 'Sampel kecil; kandungan dalam talian yang dipilih sendiri mungkin cenderung positif; tidak diindeks PubMed.',
  },
  5: {
    type: 'Tinjauan keratan rentas',
    population: '654 pendatang dari 75 negara yang menetap di Chengdu',
    focus: 'Penggunaan perkhidmatan pergigian',
    finding:
      '15.6% pendatang mengalami masalah pergigian di China tetapi tidak melawat doktor gigi. Tinggal di Chengdu selama sekurang-kurangnya 10.5 bulan ialah ambang yang membezakan tingkah laku lawatan doktor gigi. Pendatang wanita dan mereka yang mempunyai tabiat flos pergigian lebih cenderung mendapatkan penjagaan.',
    limitation: 'Satu bandar (Chengdu); keratan rentas; masalah pergigian yang dilaporkan sendiri tanpa pengesahan klinikal.',
  },
  6: {
    type: 'Kaedah campuran (kumpulan fokus + tinjauan)',
    population: '352 profesional pelancongan perubatan; data pesakit dari China, Rusia, Jepun (160 responden China)',
    focus: 'Keutamaan pesakit negara sasaran',
    finding:
      'Pesakit China yang melawat Korea terutamanya mendapatkan perubatan dalaman (35%), pemeriksaan kesihatan (21%), dan pembedahan plastik (21%). Pesakit China menunjukkan kesetiaan yang kuat kepada institusi yang mereka lawati secara tetap. Kualiti penjagaan kesihatan dan sumber pelancongan dinilai penting dan memuaskan.',
    limitation: 'Dijalankan di Busan, Korea; penemuan mencerminkan konteks pelancongan perubatan Korea, bukan khusus untuk China.',
  },
  7: {
    type: 'Tinjauan nasional yang ditauliahkan kerajaan',
    population: 'Pesakit asing dari pelbagai negara (China, Mongolia, Timur Tengah, CIS, AS, Rusia)',
    focus: 'Kepuasan pesakit peringkat nasional',
    finding:
      'Kepuasan keseluruhan ialah 89.9%. Pesakit China melaporkan kepuasan 83.6% — yang terendah dalam kalangan kewarganegaraan yang ditinjau — dengan teknologi perubatan sebagai keutamaan utama mereka. Pesakit CIS melaporkan kepuasan tertinggi (93.8%).',
    limitation: 'Data khusus Korea; mungkin tidak mencerminkan pengalaman pesakit di China; metrik kepuasan berbeza mengikut metodologi tinjauan.',
  },
  8: {
    type: 'Tinjauan keratan rentas',
    population: '315 pelancong perubatan antarabangsa di China',
    focus: 'Pemacu niat kunjungan semula',
    finding:
      'Kualiti perubatan yang dirasakan dan kepercayaan kepada doktor merupakan peramal terkuat sama ada pelancong perubatan akan kembali ke China untuk rawatan masa depan.',
    limitation: 'Keratan rentas; niat yang dilaporkan sendiri dan bukannya tingkah laku yang diukur.',
  },
  9: {
    type: 'Tinjauan literatur sistematik + kajian kes',
    population: 'Tinjauan literatur + Zon Perintis Pelancongan Perubatan Antarabangsa Hainan Boao Lecheng',
    focus: 'Transformasi industri',
    finding:
      'China sedang beralih daripada pengeksport pelancongan perubatan kepada destinasi. 850+ institusi perubatan merentasi 57 bandar kini menawarkan perkhidmatan perubatan antarabangsa, didorong oleh kelebihan kos, daya tarikan TCM, dan sokongan dasar.',
    limitation: 'Tidak diindeks PubMed; metodologi tinjauan mungkin terlepas sumber bukan bahasa Inggeris.',
  },
  10: {
    type: 'Analisis kecekapan profesional (analisis kandungan tematik)',
    population: '30 pakar penjagaan kesihatan',
    focus: 'Kecekapan & piawaian MTF',
    finding:
      'Mengenal pasti 14 tema dan 35 kecekapan MTF yang berbeza merentasi pengetahuan, kemahiran kakitangan, dan kebolehan khusus pekerjaan. Fasilitator perkhidmatan penuh menyediakan skop terluas: logistik perjalanan, pemilihan doktor, penjagaan selepas pembedahan, terjemahan, dan bimbingan budaya. ISO 22525:2020 menyediakan piawaian antarabangsa untuk peranan MTF.',
    limitation: 'Model kecekapan berdasarkan pendapat pakar, bukan data hasil pesakit.',
  },
  11: {
    type: 'Kualitatif (etnografi + temu bual)',
    population: 'Syarikat pemudah cara penjagaan kesihatan komersial dan pekerja mereka',
    focus: 'Dinamik broker vs fasilitator',
    finding:
      'Fasilitator komersial menduduki kedudukan yang berpengaruh tetapi kurang difahami dalam sistem penjagaan kesihatan. Tahap kawalan yang berbeza-beza ke atas lokasi, jenis, kos, dan pengalaman penyediaan penjagaan kesihatan mewujudkan potensi konflik kepentingan antara hasil fasilitator dan kebajikan pesakit.',
    limitation: 'Kualitatif; memberi tumpuan kepada syarikat fasilitasi secara umum, bukan khusus China.',
  },
  12: {
    type: 'Analisis dasar (Kumpulan Penyelidikan Pelancongan Perubatan Universiti Simon Fraser)',
    population: 'Analisis laman web fasilitator dan amalan industri',
    focus: 'Komunikasi risiko & persetujuan termaklum',
    finding:
      'Hanya 17.6% laman web fasilitator Kanada menangani risiko yang mungkin berlaku. Hanya 4.9% menangani penjagaan selepas pembedahan, 1.1% jalan undang-undang, 2.2% komplikasi. Fasilitator secara sistematik menekankan manfaat sambil memperkecilkan risiko, yang berpotensi menjejaskan persetujuan termaklum.',
    limitation: 'Konteks Kanada; data dari 2011; metodologi analisis laman web; amalan industri mungkin telah berkembang.',
  },
  13: {
    type: 'Tinjauan literatur',
    population: 'Pangkalan data PubMed, Scopus, Google Scholar (tetingkap tinjauan 15 tahun)',
    focus: 'Trend pelancongan perubatan & pergigian global',
    finding:
      'Penjimatan kos ialah motivasi utama pesakit (75% responden). Akses kepada teknologi maju (60%) dan masa menunggu yang lebih singkat (55%) menyusul. Kebimbangan kualiti penjagaan (50%) dan kesukaran dalam penjagaan selepas pembedahan (40%) merupakan cabaran yang paling banyak dilaporkan.',
    limitation: 'Tidak diindeks PubMed; tinjauan sumber sekunder; data peratusan daripada tinjauan agregat dengan metodologi yang berbeza-beza.',
  },
  14: {
    type: 'Statistik kerajaan',
    population: 'Data peringkat nasional daripada Suruhanjaya Kesihatan Kebangsaan China',
    focus: 'Jumlah perkhidmatan & pertumbuhan',
    finding:
      'Hospital yang ditetapkan utama menerima 1.28 juta lawatan pesakit antarabangsa pada 2025. Jumlah pesakit antarabangsa meningkat 73.6% dalam tempoh tiga tahun. 850+ institusi perubatan di 57 bandar menyediakan perkhidmatan perubatan antarabangsa.',
    limitation: 'Data yang dilaporkan kerajaan; metodologi dan piawaian pengesahan tidak diaudit secara bebas.',
  },
  15: {
    type: 'Data program kerajaan',
    population: '22 hospital awam perintis di Shanghai',
    focus: 'Hasil program',
    finding:
      'Perkhidmatan perubatan antarabangsa Shanghai melebihi 300,000 lawatan pada H1 2024. Jabatan antarabangsa Hospital Ruijin sahaja mengendalikan ~150,000 lawatan pesakit luar, dengan lawatan pesakit asing berkembang ~15% tahun ke tahun.',
    limitation: 'Data yang dilaporkan program; merangkumi kedua-dua penduduk ekspatriat dan pelancong perubatan.',
  },
  16: {
    type: 'Kajian semula carta retrospektif',
    population: '91 pesakit yang menjalani pembedahan bariatrik di luar negara dan hadir di pusat akademik AS berhampiran sempadan Mexico',
    focus: 'Kadar komplikasi & kos pengurusan',
    finding:
      'Kebocoran anastomosis/garisan staples berlaku dalam 33.0% pesakit — jauh lebih tinggi daripada kadar nasional AS <1%. 56.0% memerlukan kemasukan hospital, 19.8% memerlukan ICU. Caj hospital min untuk pengurusan kebocoran: $424,976 setiap pesakit. Kematian keseluruhan: 3.3%.',
    limitation: 'Satu pusat; hanya menangkap pesakit yang kembali dengan komplikasi; penyebut sebenar semua pelancong perubatan tidak diketahui; kadar komplikasi mungkin dianggarkan terlalu tinggi.',
  },
  17: {
    type: 'Analisis kos retrospektif',
    population: '30 pesakit yang hadir dengan komplikasi daripada pembedahan kosmetik yang dilakukan di luar negara',
    focus: 'Kos pengurusan komplikasi',
    finding:
      'Jangkitan tapak pembedahan ialah komplikasi yang paling biasa. Kos pengurusan min: $5,852 setiap pesakit. Iran merupakan destinasi yang paling kerap dilawati. Penjimatan kos daripada pembedahan di luar negara sering dinafikan oleh perbelanjaan pengurusan komplikasi.',
    limitation: 'Satu pusat di Bahrain; sampel kecil; hanya menangkap kes komplikasi; fokus pembedahan kosmetik mungkin tidak digeneralisasikan kepada prosedur lain.',
  },
  18: {
    type: 'Pembentangan persidangan (Forum Antarabangsa BMJ mengenai Kualiti & Keselamatan dalam Penjagaan Kesihatan)',
    population: 'Piawaian Akreditasi Hospital Kelas 3A China (183 kriteria, edisi 2020) dan Piawaian Akreditasi Hospital Antarabangsa China (CIHA, edisi 2021)',
    focus: 'Evolusi sistem akreditasi hospital',
    finding:
      'Piawaian Kelas 3A China adalah komprehensif (183 kriteria merangkumi tanggungjawab sosial, kawalan kualiti, amalan klinikal, pengurusan teknologi). Edisi CIHA 2021 telah diperakui oleh ISQua-EEA pada 2022, memperoleh 97% merentasi 66 kriteria — mencapai pengiktirafan antarabangsa penuh bagi sistem akreditasi hospital China.',
    limitation: 'Pembentangan persidangan, bukan penerbitan semakan rakan setara; piawaian akreditasi menghuraikan proses, bukan hasil klinikal.',
  },
  19: {
    type: 'Analisis dasar',
    population: 'Kira-kira 1,795 hospital Grade 3A di China (sehingga akhir 2023)',
    focus: 'Sistem klasifikasi hospital',
    finding:
      'Grade 3A ialah klasifikasi hospital tertinggi China, yang ditadbir oleh Suruhanjaya Kesihatan Kebangsaan. Piawaian edisi 2025 menekankan keupayaan klinikal, volum pembedahan Kelas IV, Indeks Campuran Kes (CMI), dan penunjuk kawalan kualiti untuk onkologi, kawalan jangkitan, dan radiologi. JCI menutup perniagaan akreditasi China pada April 2023 — tiada akreditasi baharu sedang dikeluarkan.',
    limitation: 'Analisis dasar; akreditasi menghuraikan keupayaan institusi, bukan kualiti doktor individu atau hasil pesakit.',
  },
  20: {
    type: 'Analisis industri',
    population: 'Data harga yang diterbitkan daripada jabatan antarabangsa hospital',
    focus: 'Perbezaan kos',
    finding:
      'Terapi sel CAR-T: $40,000–$80,000 di China berbanding $400,000+ di AS (penjimatan 80–90%). Terapi proton: $30,000–$55,000 berbanding $100,000–$200,000 (penjimatan 70–80%). Penggantian lutut: $8,000–$15,000 berbanding $30,000–$70,000 (penjimatan 70–85%).',
    limitation: 'Julat anggaran; kos sebenar berbeza mengikut kerumitan kes, peringkat hospital, dan perlindungan insurans.',
  },
  21: {
    type: 'Tinjauan literatur (data sekunder)',
    population: 'Tinjauan literatur pelancongan perubatan termasuk jadual perbandingan kos daripada Herrick (2007)',
    focus: 'Faktor pemilihan destinasi & perbandingan kos',
    finding:
      'Kos pembedahan di destinasi pelancongan perubatan adalah 30–70% lebih rendah daripada AS, dengan beberapa prosedur sehingga 80% lebih rendah. Perbandingan contoh: Pintasan Jantung — Malaysia $12,000 berbanding AS $130,000; Penggantian Lutut — Thailand $10,000 berbanding AS $40,000; Penggantian Pinggul — India $7,100 berbanding AS $43,000.',
    limitation: 'Data dari 2007–2012; harga telah berubah dengan ketara; metodologi tinjauan sekunder; tidak termasuk harga khusus China.',
  },
  22: {
    type: 'Kajian kohort (retrospektif)',
    population: '356 pesakit arthroplasti lutut di Hospital H (penduduk Hong Kong yang dirawat di tanah besar China)',
    focus: 'Tempoh tinggal & kos kemasukan hospital',
    finding:
      'Pesakit Hong Kong mempunyai tempoh tinggal yang lebih pendek, tempoh tinggal selepas pembedahan yang lebih pendek, dan kos kemasukan hospital yang lebih rendah berbanding pesakit bukan tempatan domestik — menterbalikkan corak "dwi-tinggi" tipikal. Tiada jangkitan yang diperoleh di hospital direkodkan. Tempoh tinggal menjadi pengantara sepenuhnya perbezaan kos.',
    limitation: 'Satu hospital; hanya kos pesakit dalam yang dirakam (tidak termasuk pengangkutan, penginapan, pemulihan selepas keluar); tiada data susulan jangka panjang.',
  },
  23: {
    type: 'Laporan kes',
    population: 'Kes pesakit individu (pembedahan kosmetik di Mexico)',
    focus: 'Kos tersembunyi komplikasi pelancongan perubatan',
    finding:
      'Seorang pesakit menjalani pelbagai prosedur kosmetik di Mexico dengan harga bawah $5,000. Komplikasi daripada prosedur tersebut memerlukan rawatan meluas di AS, menjadikan jumlah kos penjagaan melebihi $77,000 — 15 kali ganda kos prosedur asal.',
    limitation: 'Laporan kes tunggal; tidak boleh digeneralisasikan; mewakili senario terburuk, bukan hasil tipikal.',
  },
  24: {
    type: 'Analisis industri',
    population: 'Harga yang diterbitkan daripada jabatan antarabangsa hospital Grade 3A di Shanghai dan Beijing',
    focus: 'Perbezaan kos pemeriksaan kesihatan',
    finding:
      'Pemeriksaan kesihatan eksekutif komprehensif di jabatan antarabangsa hospital awam terkemuka China biasanya berharga $300–$1,200, berbanding $2,500–$8,000 untuk panel bayaran persendirian yang setara di AS. Pengimejan seluruh badan dan kerja penanda biologi diselesaikan dalam 4–8 jam, selalunya dengan hasil hari yang sama.',
    limitation: 'Kandungan pakej berbeza antara penyedia; perbandingan harga utama mungkin tidak mencerminkan panel ujian yang sama; kos perjalanan dan penginapan tidak termasuk.',
  },
  25: {
    type: 'Analisis kos retrospektif',
    population: '30 pesakit di pusat tertiari di Bahrain',
    focus: 'Beban ekonomi komplikasi',
    finding:
      'Pengurusan komplikasi untuk pembedahan kosmetik yang dilakukan di luar negara menelan kos purata $5,852 setiap pesakit, dengan jumlah unjuran perbelanjaan $175,000 kepada sistem penjagaan kesihatan Bahrain. Destinasi yang paling biasa ialah Iran. Penjimatan kos daripada pembedahan di luar negara sering dinafikan oleh pengurusan komplikasi.',
    limitation: 'Satu pusat; sampel kecil; hanya menangkap kes komplikasi; fokus pembedahan kosmetik.',
  },
  26: {
    type: 'RCT pelbagai pusat (6 hospital peringkat tertiari di China)',
    population: '216 pesakit dengan skiatik kronik daripada cakera terhernia (110 akupunktur + 110 akupunktur palsu)',
    focus: 'Keberkesanan akupunktur untuk skiatik kronik',
    finding:
      'Kumpulan akupunktur menunjukkan pengurangan kesakitan yang jauh lebih besar (VAS: -30.8 mm berbanding -14.9 mm, P<.001) dan peningkatan fungsi (ODI: -13.0 berbanding -4.9 mata, P<.001) berbanding akupunktur palsu. Manfaat berterusan melalui susulan 52 minggu. Tiada kejadian buruk yang serius berlaku.',
    limitation: 'Dijalankan hanya di hospital China; populasi pesakit adalah orang China; hasil mungkin tidak digeneralisasikan kepada etnik atau tetapan penjagaan kesihatan lain.',
  },
  27: {
    type: 'Ujian terkawal plasebo terbuta',
    population: '60 pesakit dengan IBS yang mantap di hospital pengajar Eropah',
    focus: 'Keberkesanan akupunktur untuk IBS',
    finding:
      'Tiada perbezaan signifikan secara statistik antara akupunktur (tindak balas 40.7%) dan akupunktur palsu (tindak balas 31.2%). Kedua-dua kumpulan bertambah baik dengan ketara daripada garis dasar, mencadangkan kesan plasebo/konteks yang kuat. Akupunktur tradisional China secara relatifnya tidak berkesan untuk IBS dalam tetapan hospital Eropah ini.',
    limitation: 'Sampel kecil (N=60); satu pusat; tetapan Eropah mungkin tidak mencerminkan hasil di hospital TCM China dengan penjagaan bersepadu.',
  },
  28: {
    type: 'Tinjauan literatur',
    population: 'Pelbagai kajian mengenai pengantarabangsaan TCM',
    focus: 'Daya tarikan & bukti TCM',
    finding:
      'Terapi TCM (akupunktur, urutan tuina, perubatan herba) semakin dicari oleh pesakit antarabangsa untuk pengurusan penyakit kronik dan pemulihan. Peranan TCM dalam pelancongan perubatan global semakin berkembang sebagai kelebihan daya saing yang tersendiri untuk China.',
    limitation: 'Banyak kajian asas diterbitkan hanya dalam pangkalan data China; kualiti metodologi berbeza-beza; keberkesanan TCM untuk banyak keadaan masih dalam penyiasatan.',
  },
  29: {
    type: 'Protokol RCT (pelbagai pusat, antarabangsa)',
    population: 'Pendaftaran terancang merentasi tapak di China dan Jepun (Universiti Tokyo Ariake)',
    focus: 'Akupunktur untuk gejala kardiovaskular',
    finding:
      'Protokol menghuraikan kesan analgesik fisiologi akupunktur yang diperhatikan dalam pesakit China dengan angina stabil. Mekanisme yang dicadangkan melibatkan pengawalan turun sistem saraf autonomi. Kerjasama antarabangsa merangkumi institusi penyelidikan Jepun, mencerminkan penyelidikan TCM rentas sempadan yang semakin berkembang.',
    limitation: 'Protokol sahaja — hasil belum diterbitkan pada masa entri ini; penemuan adalah awal.',
  },
  30: {
    type: 'Analisis dasar',
    population: 'Dokumen dasar kerajaan China dan laporan industri',
    focus: 'TCM sebagai pembeza pelancongan perubatan',
    finding:
      'Kerajaan China telah meletakkan TCM sebagai cadangan jualan unik untuk pelancongan perubatan masuk. Dasar TCM nasional (2021–2035) secara eksplisit menyokong perkhidmatan TCM antarabangsa. Zon perintis Hainan Boao Lecheng mengintegrasikan TCM dengan pelancongan perubatan konvensional. TCM disebut sebagai faktor utama yang membezakan China daripada Thailand, India, dan Turki.',
    limitation: 'Analisis dasar; sumber kerajaan mungkin melebih-lebihkan peranan TCM; bukti klinikal untuk banyak rawatan TCM masih terhad mengikut piawaian Barat.',
  },
  31: {
    type: 'Kajian kohort retrospektif',
    population: '90 subjek, 428 implan di pejabat pergigian swasta di luar bandar China; susulan min 453 hari',
    focus: 'Kemandirian implan dan kehilangan tulang marginal dalam populasi China luar bandar',
    finding:
      'Terapi implan pergigian menunjukkan kadar kemandirian yang tinggi (100%) dan kehilangan tulang marginal yang minimum (min 0.10 mm). Umur, lokasi implan (rahang bawah > rahang atas), dan diameter implan yang lebih lebar dikaitkan dengan peningkatan kehilangan tulang.',
    limitation: 'Satu amalan swasta di luar bandar China; reka bentuk retrospektif; tiada perbandingan dengan populasi bandar.',
  },
  32: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan komprehensif bahan pergigian berasaskan zirkonia daripada PubMed dan Web of Science',
    focus: 'Sifat, klasifikasi, dan aplikasi pergigian seramik zirkonia',
    finding:
      'Seramik zirkonia menunjukkan sifat mekanikal yang unggul, ketahanan, dan ketelusan yang semakin baik untuk pemulihan pergigian. Cabaran kekal dalam mengimbangi rintangan degradasi suhu rendah dengan kekuatan mekanikal dan estetika.',
    limitation: 'Tinjauan naratif tanpa meta-analisis; tidak memberikan perbandingan kuantitatif hasil klinikal merentasi generasi zirkonia.',
  },
  33: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan kajian mengenai hiperlipidemia dan osseointegrasi implan pergigian',
    focus: 'Kesan hiperlipidemia terhadap kejayaan implan dan strategi pengurangan',
    finding:
      'Hiperlipidemia boleh menjejaskan metabolisme tulang dan menghalang osseointegrasi melalui pengawalan saling adiposit, osteoblas, dan osteoklas. Kaedah penghantaran ubat tempatan (salutan statin, hidrogel, nanopartikel) pada permukaan implan boleh menggalakkan osseointegrasi dalam persekitaran hiperlipidemik.',
    limitation: 'Artikel tinjauan; kebanyakan bukti daripada kajian haiwan; terjemahan klinikal sistem penghantaran ubat baharu masih terhad.',
  },
  34: {
    type: 'Tinjauan literatur',
    population: 'Tinjauan teknik penjanaan semula tulang untuk penempatan implan pergigian',
    focus: 'Pencantuman tulang, penjanaan semula tulang berpandu, peningkatan lantai sinus, dan osteogenesis distraksi',
    finding:
      'Pembedahan rekonstruktif diperlukan sebelum penempatan implan untuk menjana semula kecacatan tulang. Pencantuman tulang kekal sebagai standard emas, selalunya digabungkan dengan penjanaan semula tulang berpandu menggunakan membran penghalang. Peningkatan lantai sinus dan distraksi tulang ialah teknik tambahan untuk senario klinikal tertentu.',
    limitation: 'Tinjauan naratif daripada pengarang amalan swasta; tiada sintesis bukti sistematik atau meta-analisis.',
  },
  35: {
    type: 'Tinjauan sistematik dan meta-analisis',
    population: '12 kajian (8 RCT, 4 kohort); 456 implan ARP berbanding 459 implan IIP',
    focus: 'Kadar kejayaan implan membandingkan penempatan tertunda dengan pemeliharaan rabung berbanding penempatan segera',
    finding:
      'Implan yang diletakkan melalui protokol pemeliharaan rabung alveolar (ARP) menunjukkan kadar kejayaan yang jauh lebih tinggi (98.68%) berbanding penempatan implan segera (IIP, 95.21%) (RR 1.03, 95% CI 1.01-1.06, P=0.008).',
    limitation: 'Bilangan kajian yang dimasukkan terhad; heterogeniti dalam protokol pembedahan dan tempoh susulan; kebanyakan kajian dari pusat tunggal.',
  },
  36: {
    type: 'Tinjauan sistematik dan meta-analisis',
    population: '35 kajian; 4,363 mahkota tunggal logam-seramik dan 912 zirkonia yang disokong implan; susulan minimum 3 tahun',
    focus: 'Kadar kemandirian dan komplikasi 5 tahun mahkota zirkonia berbanding logam-seramik',
    finding:
      'Kadar kemandirian 5 tahun adalah setanding: 98.3% untuk logam-seramik berbanding 97.6% untuk mahkota zirkonia. Mahkota zirkonia menunjukkan kurang komplikasi estetik tetapi lebih banyak patah bahan secara signifikan (2.1% berbanding 0.2%).',
    limitation: 'Tiada kajian mengenai mahkota zirkonia monolitik baharu yang memenuhi kriteria kemasukan; kes zirkonia yang agak sedikit tersedia untuk analisis.',
  },
  37: {
    type: 'Penyelidikan asal',
    population: 'Pembangunan dan pengesahan sistem AI untuk perancangan implan berasaskan CBCT',
    focus: 'Penilaian praoperasi berbantukan AI morfologi tulang alveolar untuk pembedahan implan',
    finding:
      'Perancangan berbantukan AI boleh menilai morfologi tulang alveolar dengan tepat daripada imej CBCT, berpotensi meningkatkan ketepatan pembedahan dan mengurangkan kebergantungan pengendali. Sistem menunjukkan kebolehlaksanaan untuk integrasi klinikal.',
    limitation: 'Teknologi peringkat awal; pengesahan terhad kepada data retrospektif; hasil klinikal prospektif belum dilaporkan.',
  },
  38: {
    type: 'Kajian terkawal rawak',
    population: '60 peserta dengan TMD; akupunktur berbanding akupunktur palsu, 3 sesi/minggu selama 4 minggu',
    focus: 'Akupunktur untuk kesakitan gangguan sendi temporomandibular',
    finding:
      'Akupunktur memberikan pengurangan kesakitan yang jauh lebih besar berbanding palsu pada minggu ke-4 (MD -1.49, 95% CI -2.32 hingga -0.65, P<0.001) dengan kesan berterusan pada minggu ke-8. Peningkatan dalam fungsi rahang, kesejahteraan emosi, dan kualiti tidur juga diperhatikan.',
    limitation: 'Saiz sampel kecil (n=60); satu pusat di Beijing; protokol akupunktur palsu mungkin tidak mengawal sepenuhnya untuk plasebo.',
  },
  39: {
    type: 'Meta-analisis data pesakit individu',
    population: '20,827 pesakit daripada 39 RCT; kesakitan muskuloskeletal kronik, osteoartritis, sakit kepala, sakit bahu',
    focus: 'Saiz kesan dan kegigihan akupunktur untuk kesakitan kronik',
    finding:
      'Akupunktur adalah lebih baik daripada kawalan palsu dan tanpa akupunktur untuk semua keadaan kesakitan (P<0.001), dengan kesan kira-kira 0.5 SD berbanding tanpa kawalan dan 0.2 SD berbanding palsu. Kesan rawatan berterusan dari semasa ke semasa dengan hanya ~15% penurunan pada 1 tahun.',
    limitation: 'Saiz kesan sebahagiannya didorong oleh jenis kumpulan kawalan; tidak dapat memisahkan sepenuhnya kesan jarum khusus daripada faktor kontekstual/plasebo.',
  },
  40: {
    type: 'Ujian terkawal rawak silang',
    population: '60 pesakit dengan neuropati periferal yang disebabkan oleh kemoterapi (CIPN)',
    focus: 'Akupunktur untuk CIPN menggunakan kajian pengaliran saraf sebagai hasil utama',
    finding:
      'Akupunktur meningkatkan amplitud saraf deria sural dan halaju pengaliran secara signifikan (saiz kesan 0.55 dan 0.49). Peningkatan subjektif dalam kesakitan terbakar, kekejangan, kebas, dan ketidakstabilan gaya berjalan juga dilaporkan.',
    limitation: 'Satu pusat di Jerman (dengan kerjasama Shanghai); tiada susulan jangka panjang melebihi 28 minggu; reka bentuk silang mungkin membawa kesan bawaan baki.',
  },
  41: {
    type: 'Tinjauan sistematik Cochrane',
    population: '33 kajian (8,270 peserta) membandingkan akupunktur dengan palsu, tiada rawatan, atau penjagaan biasa',
    focus: 'Akupunktur untuk sakit pinggang bawah tidak spesifik kronik',
    finding:
      'Bukti kepastian rendah mencadangkan akupunktur boleh memberikan kelegaan kesakitan jangka pendek yang kecil berbanding palsu (MD -9.22 pada VAS 0-100). Bukti kepastian sederhana menunjukkan kelegaan kesakitan dan peningkatan fungsi yang penting secara klinikal berbanding tiada rawatan.',
    limitation: 'Kebanyakan kajian mempunyai risiko bias prestasi yang tinggi; bukti diturunkan kepada kepastian rendah/sangat rendah disebabkan oleh bias, ketidakkonsistenan, dan ketidaktepatan.',
  },
  42: {
    type: 'Tinjauan sistematik dan meta-analisis',
    population: '14 RCT, 793 pesakit dengan kesakitan berkaitan endometriosis',
    focus: 'Keberkesanan akupunktur untuk kesakitan endometriosis, paras CA-125, dan saiz nodul',
    finding:
      'Akupunktur menunjukkan pengurangan yang ketara dalam keterukan kesakitan (SMD -1.10, P<0.001), meningkatkan kadar tindak balas (RR 1.25, P=0.02), dan menurunkan paras CA-125 serum (SMD -0.62, P=0.024) berbanding kawalan.',
    limitation: 'Kajian yang dimasukkan mempunyai kelemahan reka bentuk dan kualiti; intervensi kawalan berbeza-beza (plasebo, TCM, perubatan Barat); RCT berkualiti tinggi terhad.',
  },
  43: {
    type: 'Tinjauan sistematik dan meta-analisis',
    population: '16 RCT, 1,124 peserta dengan kesakitan kanser',
    focus: 'Akupunktur untuk kesakitan kanser berbanding tiada rawatan, palsu, atau penjagaan biasa',
    finding:
      'Akupunktur adalah lebih berkesan daripada tiada rawatan (SMD -0.90), akupunktur palsu (SMD -1.10), dan penjagaan biasa (SMD -1.16) dalam mengurangkan kesakitan kanser.',
    limitation: 'Kualiti rendah dan saiz sampel kecil beberapa kajian; jenis dan peringkat kanser yang heterogen; pelaporan kejadian buruk yang terhad.',
  },
  44: {
    type: 'Tinjauan sistematik Cochrane',
    population: '28 ujian, 3,960 wanita (13 akupunktur, 15 akutekanan)',
    focus: 'Akupunktur/akutekanan untuk pengurusan kesakitan semasa bersalin',
    finding:
      'Akupunktur boleh meningkatkan kepuasan dengan kelegaan kesakitan (RR 2.38 berbanding palsu) dan mengurangkan penggunaan analgesia farmakologi (RR 0.75 berbanding palsu). Akutekanan berkemungkinan mengurangkan kadar pembedahan caesarean berbanding palsu (RR 0.44).',
    limitation: 'Tiada kajian pada risiko bias rendah pada semua domain; kepastian bukti sangat rendah untuk kebanyakan perbandingan; heterogeniti dalam protokol akupunktur.',
  },
  45: {
    type: 'Kajian keratan rentas',
    population: '10,733,975 dewasa berumur 20+ dari semua 31 wilayah di China; pangkalan data pemeriksaan kesihatan 2017-2022',
    focus: 'Prevalens nasional aterosklerosis karotid dan variasi serantau',
    finding:
      'Dianggarkan 26.2% mempunyai penebalan intima-media karotid dan 21.0% mempunyai plak karotid. Prevalens lebih tinggi pada dewasa yang lebih tua, lelaki, China utara, dan mereka yang mempunyai hipertensi, diabetes, atau dislipidemia.',
    limitation: 'Populasi pemeriksaan kesihatan mungkin tidak mewakili populasi umum (bias pemilihan); reka bentuk keratan rentas menghadkan inferens kausal.',
  },
  46: {
    type: 'Kajian kohort retrospektif',
    population: 'Populasi pemeriksaan kesihatan di Hospital West China, 2006-2017; 10,259 calon saringan tidak layak',
    focus: 'Hasil saringan kanser paru-paru CT dos rendah pada calon tidak layak berbanding layak',
    finding:
      '64.13% peserta pemeriksaan kesihatan tidak layak mengikut garis panduan nasional, namun 39.04% mempunyai saringan positif. Kadar biopsi positif palsu adalah lebih tinggi pada calon tidak layak (7.69%) berbanding layak (2.47%).',
    limitation: 'Satu pusat di West China; reka bentuk retrospektif; kriteria kelayakan berdasarkan garis panduan 2018 mungkin tidak mencerminkan amalan semasa.',
  },
  47: {
    type: 'Kajian keratan rentas',
    population: '2,788,206 dewasa dari pusat pemeriksaan kesihatan merentasi 30 wilayah, 2017-2023',
    focus: 'Prevalens Lipoprotein(a) dan perkaitan dengan aterosklerosis subklinikal pelbagai tapak',
    finding:
      'Prevalens Lp(a) tinggi (>30 mg/dL) ialah 18.67%. Lp(a) yang lebih tinggi dikaitkan dengan peningkatan kemungkinan penebalan intima-media karotid, plak karotid, infark otak, dan kalsifikasi arteri koronari, dengan perkaitan yang lebih kuat untuk penglibatan pelbagai tapak.',
    limitation: 'Reka bentuk keratan rentas; Lp(a) diukur dengan asai berbeza; tidak dapat mewujudkan kausaliti; bias pemilihan populasi pemeriksaan kesihatan.',
  },
  48: {
    type: 'Emulasi percubaan sasaran (kohort pemerhatian)',
    population: '4,972,228 dewasa berumur 40+ yang menyertai pemeriksaan kesihatan dengan saringan kemurungan di Taiwan, 2013-2019',
    focus: 'Kesan saringan kemurungan dalam pemeriksaan kesihatan terhadap kadar rawatan dan hasil',
    finding:
      'Individu yang disaring mempunyai kadar kemurungan yang baru dirawat yang lebih tinggi (HR 1.63) dan risiko kemasukan hospital psikiatri yang lebih rendah (HR 0.93). Walau bagaimanapun, hanya 10.8% individu yang positif saringan menerima rawatan dalam tempoh kajian.',
    limitation: 'Kajian Taiwan, bukan tanah besar China; reka bentuk pemerhatian; saringan mungkin mengesan kes ringan tanpa manfaat klinikal yang jelas; hasil bunuh diri tidak pasti.',
  },
  49: {
    type: 'Kajian berasaskan pendaftaran',
    population: '46,978 kes kanser paru-paru insiden dan 34,475 kematian daripada ~3.21 juta populasi di Kawasan Baharu Pudong, Shanghai',
    focus: 'Lebih diagnosis kanser paru-paru yang disebabkan oleh pengenalan CT dos rendah dalam populasi risiko purata',
    finding:
      'Pengenalan LDCT dalam populasi risiko purata mungkin telah menyebabkan lebih diagnosis kanser paru-paru yang ketara. Kajian mengkuantifikasi insiden berlebihan berbanding trend yang dijangka, mencadangkan penggunaan LDCT secara meluas dalam pemeriksaan kesihatan memerlukan kriteria saringan yang lebih disasarkan.',
    limitation: 'Satu daerah (Pudong, Shanghai); data pendaftaran tidak dapat membezakan kanser yang dikesan saringan daripada kanser yang dikesan gejala pada peringkat individu.',
  },
  50: {
    type: 'Kajian kohort retrospektif',
    population: '33,639 pemeriksa fizikal di pusat pemeriksaan besar di China, 2017-2019',
    focus: 'Nilai kritikal dalam pemeriksaan kesihatan dan perkaitannya dengan risiko penyakit kronik',
    finding:
      'Nilai kritikal dalam pemeriksaan kesihatan menunjukkan perkaitan yang signifikan dengan risiko penyakit kronik dan kanser. Analisis evolusi dinamik mendedahkan corak pengelompokan biomarker yang boleh membantu stratifikasi risiko awal.',
    limitation: 'Satu pusat pemeriksaan; reka bentuk retrospektif; ambang nilai kritikal mungkin berbeza merentasi makmal.',
  },
}
