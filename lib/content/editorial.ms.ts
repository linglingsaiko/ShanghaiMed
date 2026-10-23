import type { LegalDoc } from './types'

// Bahasa Malaysia editorial policy content

export const editorialMs: LegalDoc = {
  title: 'Dasar Editorial',
  lastUpdated: 'Kemaskini terakhir: 10 Oktober 2026',
  sections: [
    {
      title: '1. Komitmen Kami',
      body: ['ShanghaiMed menerbitkan kandungan kesihatan dan perjalanan perubatan untuk membantu pesakit antarabangsa membuat keputusan termaklum tentang mendapatkan rawatan perubatan di China. Kami komited terhadap ketepatan, ketelusan, dan piawaian komunikasi kesihatan tertinggi. Dasar ini menerangkan cara kami menyelidik, menulis, menyemak dan membetulkan kandungan kami.'],
    },
    {
      title: '2. Piawaian Kandungan',
      subsections: [
        {
          sub: 'Piawaian Penyelidikan',
          items: [
            'Setiap tuntutan kesihatan disokong oleh sekurang-kurangnya satu sumber yang boleh disahkan, dengan keutamaan kepada penerbitan semakan rakan setara yang diindeks dalam PubMed, Cochrane Library, atau pangkalan data yang setara.',
            'Kami mengutamakan sumber daripada institusi perubatan yang diiktiraf: NIH, WHO, CDC, pusat perubatan akademik utama, dan agensi kesihatan kerajaan.',
            'Tuntutan statistik (peratusan, kadar kelangsungan hidup, angka kos) dikesan kepada sumber asalnya. Kami tidak memetik statistik daripada ringkasan sekunder tanpa pengesahan.',
            'Batasan kajian dinyatakan bersama penemuan. Kami tidak mengemukakan perkaitan sebagai sebab-akibat.',
          ],
        },
        {
          sub: 'Piawaian Penulisan',
          items: [
            'Bahasa berhemat: Kami menggunakan "dikaitkan dengan", "boleh mengurangkan", "kajian mencadangkan" berbanding "membuktikan", "menjamin", atau "menyembuhkan". Ini mencerminkan apa yang benar-benar disokong oleh bukti asas.',
            'Tiada janji mutlak: Kami tidak menerbitkan tuntutan seperti "menghapuskan kesakitan sepenuhnya", "kejayaan terjamin", atau "tanpa risiko". Semua prosedur perubatan membawa risiko, dan kami menyatakan sedemikian.',
            'Jujur tentang kelemahan: Setiap artikel mengenai rawatan perubatan di China menyertakan batasan, risiko atau cabaran yang diketahui bersama dengan manfaatnya. Kami percaya pesakit yang termaklum membuat keputusan yang lebih baik.',
            'Perspektif keputusan pesakit: Kandungan ditulis dari perspektif apa yang pesakit perlu tahu untuk membuat keputusan — bukan dari perspektif apa yang kami mahu mereka pilih.',
          ],
        },
      ],
    },
    {
      title: '3. Klasifikasi Sumber',
      body: ['Setiap tuntutan dalam kandungan kami dikesan kepada sumber utama. Kami mengklasifikasikan sumber kepada tiga peringkat untuk membantu pembaca menilai kekuatan bukti asas:'],
      table: {
        headers: ['Peringkat', 'Jenis Sumber', 'Contoh'],
        rows: [
          { tier: 'Tier 1', tierColor: 'bg-green-100 text-green-800', cells: ['Penerbitan semakan rakan setara', 'Jurnal berindeks PubMed, Cochrane Library, JAMA, Lancet, BMJ, Frontiers, jurnal MDPI'] },
          { tier: 'Tier 2', tierColor: 'bg-blue-100 text-blue-800', cells: ['Data kerajaan & institusi', 'Suruhanjaya Kesihatan Kebangsaan, WHO, NIH, CDC, suruhanjaya kesihatan perbandaran, laporan rasmi hospital'] },
          { tier: 'Tier 3', tierColor: 'bg-amber-100 text-amber-800', cells: ['Sumber industri yang disahkan & sumber sekunder yang boleh dipercayai', 'Harga hospital yang diumumkan, pembentangan persidangan, institusi akademik bertauliah, analisis industri yang bereputasi'] },
        ],
      },
      note: 'Entri Perpustakaan Penyelidikan kami memaparkan peringkat sumber dalam setiap petikan. Jika boleh, kami mengutamakan sumber Tier 1. Statistik kerajaan (Tier 2) digunakan apabila data primer hanya tersedia melalui saluran rasmi. Kami mengelak daripada bergantung sepenuhnya pada laporan media atau karya pendapat.',
      highlightLead: 'Pecahan Perpustakaan Penyelidikan semasa:',
      highlightText: ' 17 Tier 1 (semakan rakan setara) · 5 Tier 2 (kerajaan/institusi) · 8 Tier 3 (industri/lain-lain)',
    },
    {
      title: '4. Ketepatan Perubatan',
      items: [
        'Istilah klinikal disahkan dengan rujukan perubatan piawai.',
        'Kelayakan hospital dihuraikan menggunakan sistem klasifikasi rasmi China (Grade 3A / 三甲). Kami tidak menggunakan tanda akreditasi yang sudah tidak sah lagi.',
        'Nama ubat, prosedur dan peranti perubatan disahkan sebelum diterbitkan.',
        'Angka kos diperoleh daripada harga hospital yang diumumkan, laporan kerajaan, atau data industri yang disahkan. Jika anggaran digunakan, ia dilabelkan dengan jelas.',
      ],
    },
    {
      title: '5. Konflik Kepentingan',
      body: ['ShanghaiMed ialah syarikat pemudah cara pelancongan perubatan. Kami memperoleh pendapatan apabila pesakit memilih untuk menggunakan perkhidmatan penyelarasan kami. Ini mewujudkan konflik kepentingan semula jadi yang kami uruskan seperti berikut:'],
      items: [
        'Kami mengenakan bayaran perkhidmatan yang telus kepada pesakit. Kami tidak menerima komisen daripada hospital.',
        'Kandungan editorial kami ditulis untuk memberi maklumat, bukan untuk mengarahkan pesakit ke hospital atau rawatan tertentu.',
        'Apabila kami menyebut perkhidmatan kami sendiri, perkara itu dikenal pasti dengan jelas. Kandungan editorial dan kandungan promosi tidak dicampuradukkan.',
        'Perpustakaan Penyelidikan kami merangkumi kajian dengan penemuan yang mungkin tidak sejajar dengan kepentingan komersial kami (contohnya, kajian yang mengetengahkan kebimbangan privasi atau jurang perkhidmatan).',
      ],
    },
    {
      title: '6. Pembetulan & Kitaran Semakan',
      body: [
        'Kami memandang serius akan ketepatan. Jika anda mengenal pasti kesilapan dalam mana-mana kandungan kami — kesilapan fakta, statistik lapuk, istilah perubatan yang salah, atau pencirian penemuan kajian yang tidak tepat — sila e-mel info@shanghaimedhealth.com dengan tajuk "Editorial Correction". Pembetulan akan disemak dalam tempoh 5 hari bekerja; kesilapan yang disahkan akan dibetulkan dengan nota semakan bertarikh, dan kami mengekalkan rekod awam bagi pembetulan penting.',
        'Semua artikel disemak untuk ketepatan perubatan sebelum diterbitkan. Statistik dan data harga disahkan semula setiap 6 bulan. Kandungan sensitif masa (dasar visa, perjanjian insurans, program hospital) disemak setiap suku tahun. Setiap artikel memaparkan tarikh penerbitan dan tarikh semakan terakhirnya.',
      ],
    },
    {
      title: '7. Perkara yang Kami Tidak Lakukan',
      items: [
        'Kami tidak memberikan nasihat perubatan, diagnosis atau cadangan rawatan. Kandungan kami adalah untuk maklumat sahaja.',
        'Kami tidak menjamin hasil rawatan. Perubatan melibatkan ketidakpastian yang wujud.',
        'Kami tidak menerima bayaran daripada hospital atau syarikat farmaseutikal untuk liputan editorial.',
        'Kami tidak menerbitkan kisah pesakit atau butiran kes tanpa kebenaran bertulis yang jelas daripada pesakit.',
      ],
    },
    {
      title: 'Tentang ShanghaiMed',
      boxed: true,
      body: [
        'ShanghaiMed dikendalikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息科技术有限公司), berdaftar di Shanghai, China. Kami ialah pemudah cara pelancongan perubatan — kami menyelaraskan temujanji hospital, terjemahan rekod perubatan, logistik, dan susulan selepas pembedahan untuk pesakit antarabangsa yang mendapatkan rawatan di Shanghai.',
        'Pasukan kami membawa pengalaman lebih sedekad dalam operasi penjagaan kesihatan premium di China. Kami mengenakan bayaran perkhidmatan concierge yang telus dan tidak mengambil komisen daripada hospital. Bil perubatan dibayar terus ke hospital mengikut kadar mereka sendiri.',
      ],
    },
  ],
}
