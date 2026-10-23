import type { LegalDoc } from './types'

// Bahasa Indonesia editorial policy content

export const editorialId: LegalDoc = {
  title: 'Kebijakan Editorial',
  lastUpdated: 'Terakhir diperbarui: 10 Oktober 2026',
  sections: [
    {
      title: '1. Komitmen Kami',
      body: ['ShanghaiMed menerbitkan konten kesehatan dan perjalanan medis untuk membantu pasien internasional membuat keputusan yang terinformasi tentang mencari perawatan medis di Tiongkok. Kami berkomitmen pada akurasi, transparansi, dan standar komunikasi kesehatan tertinggi. Kebijakan ini menjelaskan bagaimana kami meneliti, menulis, meninjau, dan mengoreksi konten kami.'],
    },
    {
      title: '2. Standar Konten',
      subsections: [
        {
          sub: 'Standar Penelitian',
          items: [
            'Setiap klaim kesehatan didukung oleh setidaknya satu sumber yang dapat diverifikasi, dengan mengutamakan publikasi telaah sejawat yang terindeks di PubMed, Cochrane Library, atau basis data yang setara.',
            'Kami mengutamakan sumber dari institusi medis yang diakui: NIH, WHO, CDC, pusat medis akademik utama, dan lembaga kesehatan pemerintah.',
            'Klaim statistik (persentase, angka kelangsungan hidup, angka biaya) dirujuk ke sumber primer. Kami tidak mengutip statistik dari ringkasan sekunder tanpa verifikasi.',
            'Keterbatasan penelitian dinyatakan bersama temuan. Kami tidak menyajikan hubungan asosiasi sebagai hubungan sebab-akibat.',
          ],
        },
        {
          sub: 'Standar Penulisan',
          items: [
            'Bahasa yang hati-hati: Kami menggunakan "berasosiasi dengan", "dapat mengurangi", "penelitian menunjukkan" alih-alih "membuktikan", "menjamin", atau "menyembuhkan". Ini mencerminkan apa yang sungguh-sungguh didukung oleh bukti yang mendasarinya.',
            'Tidak ada janji mutlak: Kami tidak menerbitkan klaim seperti "menghilangkan rasa sakit sepenuhnya", "keberhasilan terjamin", atau "bebas risiko". Semua prosedur medis mengandung risiko, dan kami menyatakannya.',
            'Jujur tentang keterbatasan: Setiap artikel tentang perawatan medis di Tiongkok mencakup keterbatasan, risiko, atau tantangan yang diketahui di samping manfaatnya. Kami percaya pasien yang terinformasi membuat keputusan yang lebih baik.',
            'Perspektif keputusan pasien: Konten ditulis dari sudut pandang apa yang perlu diketahui pasien untuk mengambil keputusan — bukan dari sudut pandang apa yang kami ingin mereka pilih.',
          ],
        },
      ],
    },
    {
      title: '3. Klasifikasi Sumber',
      body: ['Setiap klaim dalam konten kami dilacak ke sumber primer. Kami mengklasifikasikan sumber ke dalam tiga tingkatan untuk membantu pembaca mengevaluasi kekuatan bukti yang mendasarinya:'],
      table: {
        headers: ['Tingkat', 'Jenis Sumber', 'Contoh'],
        rows: [
          { tier: 'Tier 1', tierColor: 'bg-green-100 text-green-800', cells: ['Publikasi telaah sejawat', 'Jurnal terindeks PubMed, Cochrane Library, JAMA, Lancet, BMJ, Frontiers, jurnal MDPI'] },
          { tier: 'Tier 2', tierColor: 'bg-blue-100 text-blue-800', cells: ['Data pemerintah & institusi', 'Komisi Kesehatan Nasional, WHO, NIH, CDC, komisi kesehatan kota, laporan resmi rumah sakit'] },
          { tier: 'Tier 3', tierColor: 'bg-amber-100 text-amber-800', cells: ['Sumber industri terverifikasi & sumber sekunder kredibel', 'Harga rumah sakit yang dipublikasikan, presentasi konferensi, institusi akademik terakreditasi, analisis industri bereputasi'] },
        ],
      },
      note: 'Entri Perpustakaan Penelitian kami menampilkan tingkatan sumber dalam setiap kutipan. Jika memungkinkan, kami mengutamakan sumber Tier 1. Statistik pemerintah (Tier 2) digunakan ketika data primer hanya tersedia melalui saluran resmi. Kami menghindari mengandalkan sepenuhnya pada laporan media atau karya opini.',
      highlightLead: 'Rincian Perpustakaan Penelitian saat ini:',
      highlightText: ' 17 Tier 1 (telaah sejawat) · 5 Tier 2 (pemerintah/institusi) · 8 Tier 3 (industri/lainnya)',
    },
    {
      title: '4. Akurasi Medis',
      items: [
        'Istilah klinis diverifikasi terhadap referensi medis standar.',
        'Kualifikasi rumah sakit dijelaskan menggunakan sistem klasifikasi resmi Tiongkok (Grade 3A / 三甲). Kami tidak menggunakan tanda akreditasi yang sudah tidak berlaku.',
        'Nama obat, nama prosedur, dan nama perangkat medis diverifikasi sebelum publikasi.',
        'Angka biaya bersumber dari harga rumah sakit yang dipublikasikan, laporan pemerintah, atau data industri terverifikasi. Di mana estimasi digunakan, hal tersebut diberi label demikian.',
      ],
    },
    {
      title: '5. Konflik Kepentingan',
      body: ['ShanghaiMed adalah perusahaan fasilitator wisata medis. Kami memperoleh pendapatan ketika pasien memilih untuk menggunakan layanan koordinasi kami. Hal ini menciptakan konflik kepentingan yang melekat, yang kami kelola sebagai berikut:'],
      items: [
        'Kami mengenakan biaya layanan yang transparan kepada pasien. Kami tidak menerima komisi dari rumah sakit.',
        'Konten editorial kami ditulis untuk menginformasikan, bukan untuk mengarahkan pasien ke rumah sakit atau perawatan tertentu.',
        'Ketika kami menyebutkan layanan kami sendiri, hal tersebut diidentifikasi dengan jelas. Konten editorial dan konten promosi tidak dicampuradukkan.',
        'Perpustakaan Penelitian kami mencakup studi dengan temuan yang mungkin tidak sejalan dengan kepentingan komersial kami (misalnya, studi yang menyoroti masalah privasi atau kesenjangan layanan).',
      ],
    },
    {
      title: '6. Koreksi & Siklus Peninjauan',
      body: [
        'Kami sangat mengutamakan akurasi. Jika Anda mengidentifikasi kesalahan dalam konten kami — kesalahan faktual, statistik yang sudah usang, istilah medis yang salah, atau penokohan temuan studi yang keliru — silakan kirim email ke info@shanghaimedhealth.com dengan subjek "Editorial Correction". Koreksi akan ditinjau dalam waktu 5 hari kerja; kesalahan yang terverifikasi akan diperbaiki dengan catatan revisi bertanggal, dan kami menyimpan catatan publik tentang koreksi signifikan.',
        'Semua artikel ditinjau untuk akurasi medis sebelum dipublikasikan. Statistik dan data harga diverifikasi ulang setiap 6 bulan. Konten yang sensitif waktu (kebijakan visa, perjanjian asuransi, program rumah sakit) ditinjau setiap triwulan. Setiap artikel menampilkan tanggal publikasi dan peninjauan terakhirnya.',
      ],
    },
    {
      title: '7. Hal yang Kami Tidak Lakukan',
      items: [
        'Kami tidak memberikan saran medis, diagnosis, atau rekomendasi pengobatan. Konten kami bersifat informasional saja.',
        'Kami tidak menjamin hasil pengobatan. Kedokteran mengandung ketidakpastian yang melekat.',
        'Kami tidak menerima pembayaran dari rumah sakit atau perusahaan farmasi untuk liputan editorial.',
        'Kami tidak menerbitkan cerita pasien atau rincian kasus tanpa persetujuan tertulis eksplisit dari pasien.',
      ],
    },
    {
      title: 'Tentang ShanghaiMed',
      boxed: true,
      body: [
        'ShanghaiMed dioperasikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息科技术有限公司), terdaftar di Shanghai, Tiongkok. Kami adalah fasilitator wisata medis — kami mengoordinasikan janji temu rumah sakit, penerjemahan rekam medis, logistik, dan tindak lanjut pascaoperasi untuk pasien internasional yang mencari pengobatan di Shanghai.',
        'Tim kami membawa pengalaman lebih dari satu dekade dalam operasi layanan kesehatan premium di Tiongkok. Kami mengenakan biaya layanan concierge yang transparan dan tidak mengambil komisi dari rumah sakit. Tagihan medis dibayarkan langsung ke rumah sakit sesuai tarif mereka sendiri.',
      ],
    },
  ],
}
