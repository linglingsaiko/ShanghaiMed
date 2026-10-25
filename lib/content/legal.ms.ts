import type { LegalDoc } from './types'

// Bahasa Malaysia legal / policy content. Brand names, registration numbers,
// email and legal identifiers retained in Latin; Western (0-9) digits used.

export const legalMsContact = {
  company: 'Shanghai Keling Information Technology Co., Ltd.',
  address: 'Bilik 101, Tingkat 1, No. 2555 Changyang Road, Daerah Yangpu, Shanghai, China',
  email: 'hello@shanghaimedhealth.com',
  label: 'E-mel:',
}

export const legalMs: Record<string, LegalDoc> = {
  privacy: {
    title: 'Dasar Privasi',
    lastUpdated: 'Kemaskini terakhir: 12 Oktober 2026',
    sections: [
      {
        title: '1. Siapa kami',
        body: [
          'ShanghaiMed dikendalikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), sebuah syarikat liabiliti terhad yang berdaftar di Shanghai, China, nombor pendaftaran 91310110MAKDNY7H7W. Alamat berdaftar kami ialah Bilik 101, Tingkat 1, No. 2555 Changyang Road, Daerah Yangpu, Shanghai. Kami menyediakan perkhidmatan penyelarasan perjalanan perubatan dan navigasi pesakit untuk pesakit antarabangsa yang mendapatkan rawatan perubatan di Shanghai.',
          'Dasar Privasi ini menerangkan cara kami mengumpul, menggunakan, mendedahkan dan melindungi maklumat peribadi, termasuk maklumat berkaitan kesihatan, apabila anda menggunakan laman web kami (shanghaimedhealth.com) atau menggunakan perkhidmatan kami. Dengan menggunakan laman web atau perkhidmatan kami, anda bersetuju dengan Dasar ini.',
        ],
      },
      {
        title: '2. Maklumat yang kami kumpul',
        subsections: [
          { sub: 'Butiran identiti dan hubungan', items: ['Nama, alamat e-mel, nombor telefon, kewarganegaraan, butiran pasport atau ID kebangsaan (di mana diperlukan untuk visa atau pendaftaran hospital), dan maklumat hubungan kecemasan.'] },
          { sub: 'Maklumat kesihatan', items: ['Rekod perubatan, laporan, imej, diagnosis dan sejarah rawatan yang anda berikan secara sukarela kepada kami supaya kami dapat menilai kes anda dan memadankan anda dengan hospital dan pakar yang sesuai. Maklumat kesihatan adalah data peribadi sensitif dan diproses hanya dengan persetujuan jelas anda.'] },
          { sub: 'Maklumat tempahan dan perjalanan', items: ['Tarikh perjalanan pilihan, butiran penginapan dan berkaitan visa yang diperlukan untuk menyelaraskan lawatan anda.'] },
          { sub: 'Maklumat pembayaran', items: ['Kami tidak menyimpan nombor kad kredit atau debit penuh di pelayan kami. Pembayaran kad diproses oleh penyedia perkhidmatan pembayaran berlesen (seperti Airwallex dan/atau PayPal), yang mematuhi Standard Keselamatan Data Industri Kad Pembayaran (PCI DSS).'] },
          { sub: 'Maklumat teknikal', items: ['Alamat IP, jenis pelayar, maklumat peranti dan data penggunaan yang dikumpul melalui kuki dan alat serupa untuk memastikan laman web selamat dan berfungsi.'] },
        ],
      },
      {
        title: '3. Cara kami menggunakan maklumat anda',
        items: [
          'Menilai kes anda dan memadankan hospital serta pakar;',
          'Menjadualkan temujanji, tafsiran dan pengiringan di lokasi;',
          'Menyokong permohonan visa perubatan dan logistik perjalanan;',
          'Memproses yuran penyelarasan perkhidmatan dan mengeluarkan invois;',
          'Berkomunikasi dengan anda sebelum, semasa dan selepas lawatan anda;',
          'Mematuhi kewajipan undang-undang, perakaunan, cukai dan pengawalseliaan.',
        ],
      },
      {
        title: '4. Kepada siapa kami berkongsi maklumat',
        items: [
          'Hospital awam berlesen dan doktor yang merawat anda di China yang akan menjaga anda, secara ketat mengikut keperluan sahaja;',
          'Pemproses pembayaran berlesen untuk mengutip yuran perkhidmatan;',
          'Penyedia visa, perjalanan dan penginapan di mana perlu untuk mengatur lawatan anda;',
          'Penasihat profesional dan pihak berkuasa kerajaan di mana diperlukan oleh undang-undang China atau undang-undang yang terpakai.',
        ],
        closing: 'Kami tidak menjual maklumat peribadi anda. Kami tidak berkongsi maklumat anda dengan pihak ketiga untuk tujuan pemasaran.',
      },
      {
        title: '5. Pemindahan data antarabangsa',
        body: ['Untuk menyampaikan perkhidmatan kami, maklumat anda dipindahkan ke dan diproses di tanah besar China. Kami menggunakan perlindungan kontrak dan teknikal yang sesuai untuk melindungi maklumat dalam transit dan semasa disimpan, selaras dengan keperluan perlindungan data yang terpakai.'],
      },
      {
        title: '6. Pengekalan data',
        body: ['Kami mengekalkan maklumat peribadi dan kesihatan selama yang diperlukan untuk menyampaikan perkhidmatan dan untuk memenuhi kewajipan pengekalan undang-undang, cukai, perakaunan dan rekod perubatan, selepas itu ia dipadamkan atau dianonimkan dengan selamat.'],
      },
      {
        title: '7. Hak anda',
        body: ['anda boleh meminta akses kepada, pembetulan, atau pemadaman maklumat peribadi anda (tertakluk kepada kewajipan pengekalan undang-undang), dan anda boleh menarik balik persetujuan terhadap pemprosesan pada bila-bila masa dengan menghubungi kami. Kami akan bertindak balas dalam tempoh yang munasabah seperti yang dikehendaki oleh undang-undang.'],
      },
      {
        title: '8. Keselamatan',
        body: ['Kami menggunakan perlindungan pentadbiran, teknikal dan fizikal — termasuk penghantaran yang disulitkan (HTTPS), kawalan akses mengikut keperluan sahaja, dan semakan keselamatan berkala — untuk melindungi maklumat anda. Tiada kaedah penghantaran atau penyimpanan yang 100% selamat, tetapi kami mengambil langkah yang munasabah bersesuaian dengan kepekaan data tersebut.'],
      },
      {
        title: '9. Kuki',
        body: ['Kami menggunakan kuki penting untuk memastikan laman web berfungsi dan mungkin menggunakan kuki analitik terhad untuk memahami cara pelawat menggunakan laman tersebut. anda boleh mengawal kuki melalui tetapan pelayar anda; melumpuhkan kuki penting boleh menjejaskan fungsi laman web.'],
      },
      {
        title: '10. Kanak-kanak',
        body: ['Perkhidmatan kami tidak ditujukan kepada kanak-kanak di bawah umur 18 tahun. Maklumat mengenai kanak-kanak bawah umur yang mengembara bersama pesakit atau merupakan pesakit sendiri diproses hanya dengan persetujuan ibu bapa atau penjaga yang sah.'],
      },
      {
        title: '11. Perubahan kepada Dasar ini',
        body: ['Kami mungkin mengemas kini Dasar ini dari semasa ke semasa. Tarikh di bahagian atas halaman menunjukkan kemaskini terkini. Perubahan penting akan diketengahkan di laman web.'],
      },
      { title: '12. Hubungi', contact: true },
    ],
  },

  terms: {
    title: 'Syarat Perkhidmatan',
    lastUpdated: 'Kemaskini terakhir: 12 Oktober 2026',
    sections: [
      {
        title: '1. Siapa kami',
        body: ['ShanghaiMed dikendalikan oleh Shanghai Keling Information Technology Co., Ltd. (上海可玲信息技术有限公司), sebuah syarikat liabiliti terhad yang berdaftar di Shanghai, China di bawah nombor pendaftaran 91310110MAKDNY7H7W. ShanghaiMed ialah perkhidmatan penyelarasan perjalanan perubatan dan navigasi pesakit. Kami BUKAN hospital, klinik atau institusi perubatan.'],
      },
      {
        title: '2. Penerimaan syarat',
        body: ['Dengan mengakses https://shanghaimedhealth.com ("Laman Web") atau menggunakan perkhidmatan ShanghaiMed, termasuk pembayaran sebarang deposit atau yuran koordinasi, anda bersetuju untuk terikat dengan Syarat Perkhidmatan ini serta Dasar Privasi kami. Jika anda tidak bersetuju, sila jangan gunakan Laman Web atau perkhidmatan kami.'],
      },
      {
        title: '3. Perkhidmatan kami',
        body: ['ShanghaiMed mengatur dan menyelaraskan, bagi pihak anda:'],
        items: [
          'Semakan dan terjemahan profesional rekod perubatan;',
          'Memadankan kes anda dengan hospital awam China dan pakar berlesen yang sesuai;',
          'Penjadualan temujanji dan anggaran kos;',
          'Sokongan jemputan visa perubatan dan logistik perjalanan/penginapan;',
          'Pengiringan dan tafsiran dwi-bahasa secara bersemuka semasa lawatan hospital;',
          'Penyelarasan susulan selepas lawatan.',
        ],
      },
      {
        title: '4. Penafian perubatan penting',
        callout: 'Penafian perubatan penting',
        items: [
          'ShanghaiMed TIDAK menyediakan diagnosis perubatan, rawatan, pembedahan, preskripsi, ujian atau sebarang perkhidmatan klinikal. Semua keputusan klinikal, diagnosis dan rawatan dibuat secara bebas oleh hospital yang merawat dan doktor berlesennya di bawah tanggungjawab dan lesen mereka sendiri.',
          'Maklumat yang diberikan melalui Laman Web atau kakitangan kami adalah untuk penyelarasan, perancangan dan maklumat am sahaja dan bukan pengganti nasihat perubatan profesional, diagnosis atau rawatan daripada doktor yang bertauliah.',
          'Hasil perubatan, masa menunggu, pelan rawatan dan kos tidak boleh dijamin. Diagnosis muktamad, pelan rawatan dan yuran ditentukan oleh hospital yang merawat selepas penilaian bersemuka.',
          'Dalam kecemasan perubatan, hubungi perkhidmatan kecemasan tempatan anda dengan segera. Di tanah besar China, dail 120 untuk ambulans dan rawatan kecemasan.',
        ],
      },
      {
        title: '5. Penglibatan, sebut harga dan pembayaran',
        items: [
          'Sebut harga bertulis dan pelan perkhidmatan akan diberikan kepada anda sebelum sebarang pembayaran perlu dibuat.',
          'Deposit tempahan diperlukan untuk memastikan temujanji dan memulakan koordinasi. Terma khusus, termasuk jumlah deposit dan syarat-syarat yang berkenaan, diperincikan dalam perjanjian perkhidmatan individu anda.',
          'Yuran penyelarasan boleh dibayar melalui pautan pembayaran kad atau kaedah pindahan bank antarabangsa yang kami sediakan. Yuran hospital dan klinikal dibayar terus kepada hospital yang merawat dan tidak sekali-kali dikutip atau dipegang oleh ShanghaiMed.',
          'Invois dikeluarkan oleh Shanghai Keling Information Technology Co., Ltd. mengikut undang-undang China.',
        ],
      },
      {
        title: '6. Tanggungjawab anda',
        items: [
          'Memberikan maklumat, rekod perubatan dan dokumen identiti/visa yang tepat, lengkap dan tulen;',
          'Mendapatkan visa dan dokumen perjalanan yang sah untuk masuk ke China; mendapatkan insurans perjalanan dan/atau perubatan yang sesuai sebagaimana yang anda anggap wajar;',
          'Membuat keputusan anda sendiri, dalam perundingan dengan doktor yang merawat, tentang sama ada untuk meneruskan sebarang rawatan yang disyorkan oleh hospital;',
          'Membayar caj hospital dan kos perjalanan, penginapan dan sara hidup anda sendiri secara terus;',
          'Mematuhi undang-undang Republik Rakyat China dan peraturan hospital yang anda lawati.',
        ],
      },
      {
        title: '7. Ketersediaan perkhidmatan dan tingkah laku',
        body: ['Kami boleh menolak atau menghentikan perkhidmatan sekiranya berlaku tingkah laku yang tidak selamat, menyalahi undang-undang, kasar atau penipuan, atau di mana permintaan adalah di luar skop penyelarasan kami — contohnya permintaan untuk mendapatkan bahan terkawal, ubat preskripsi sahaja atau peranti perubatan, atau permintaan untuk memudahkan aktiviti klinikal tidak berlesen.'],
      },
      {
        title: '8. Pembatalan dan penjadualan semula',
        body: ['Terma pembatalan dan penjadualan semula diperincikan dalam perjanjian perkhidmatan individu anda. anda harus mengesahkan tempahan perjalanan hanya selepas temujanji hospital disahkan secara bertulis oleh ShanghaiMed.'],
      },
      {
        title: '9. Harta intelek',
        body: ['Kandungan laman web, penjenamaan, bahan dan dokumen perkhidmatan adalah milik Shanghai Keling Information Technology Co., Ltd. dan tidak boleh disalin, dihasilkan semula atau diedarkan semula tanpa kebenaran bertulis kami terlebih dahulu.'],
      },
      {
        title: '10. Pautan pihak ketiga dan laman web hospital',
        body: ['Laman Web mungkin mengandungi pautan ke laman web pihak ketiga, termasuk hospital dan penyedia perjalanan. Kami tidak bertanggungjawab ke atas kandungan, ketepatan atau amalan tapak pihak ketiga. Perkhidmatan yang dipautkan disediakan oleh pihak ketiga yang bebas di bawah syarat mereka sendiri.'],
      },
      {
        title: '11. Had liabiliti',
        items: [
          'Setakat maksimum yang dibenarkan oleh undang-undang yang terpakai, jumlah liabiliti agregat Shanghai Keling Information Technology Co., Ltd. berkaitan dengan perkhidmatan penyelarasan kami adalah terhad kepada yuran penyelarasan yang sebenarnya telah dibayar oleh anda kepada kami.',
          'Kami tidak bertanggungjawab ke atas hasil klinikal, atau ke atas sebarang tindakan atau peninggalan hospital, doktor, pihak berkuasa visa, syarikat penerbangan, hotel atau pihak ketiga yang lain.',
          'Kami tidak bertanggungjawab ke atas peristiwa force majeure (termasuk tetapi tidak terhad kepada bencana alam, wabak, tindakan kerajaan, gangguan pengangkutan atau kekacauan awam) yang menghalang atau melambatkan penyampaian perkhidmatan.',
          'Kami tidak bertanggungjawab ke atas kerugian tidak langsung, berbangkit atau punitif, termasuk kehilangan keuntungan, kehilangan peluang atau tekanan emosi.',
          'Tiada apa-apa dalam Syarat ini mengecualikan liabiliti yang tidak boleh dikecualikan di bawah undang-undang yang terpakai, termasuk liabiliti bagi kematian atau kecederaan peribadi yang disebabkan oleh kecuaian kami, penipuan, atau sebarang liabiliti lain yang tidak boleh dihadkan oleh undang-undang.',
        ],
      },
      {
        title: '12. Tanggung rugi',
        body: ['anda bersetuju untuk menanggung rugi ShanghaiMed terhadap kerugian, tuntutan atau liabiliti yang timbul daripada pelanggaran anda sendiri terhadap Syarat ini, pemberian maklumat palsu atau mengelirukan oleh anda, atau keputusan anda mengenai rawatan klinikal atau perjalanan.'],
      },
      {
        title: '13. Undang-undang dan bahasa yang mengawal',
        body: ['Syarat ini ditadbir oleh undang-undang Republik Rakyat China. Versi Bahasa Inggeris ini disediakan untuk kemudahan anda; sekiranya berlaku sebarang ketidakselarasan, versi bahasa China akan diguna pakai setakat yang dikehendaki oleh undang-undang yang terpakai.'],
      },
      {
        title: '14. Penyelesaian pertikaian',
        body: ['Pihak-pihak akan terlebih dahulu cuba menyelesaikan sebarang pertikaian melalui rundingan suci hati dalam tempoh 30 hari dari notis bertulis. Jika tidak diselesaikan, pertikaian akan dikemukakan kepada Mahkamah Rakyat yang berwibawa di Daerah Yangpu, Shanghai, China (atau mahkamah lain yang mempunyai bidang kuasa statutori atas pilihan plaintif).'],
      },
      {
        title: '15. Perubahan kepada Syarat ini',
        body: ['Kami mungkin mengemas kini Syarat ini dari semasa ke semasa. Versi yang diterbitkan di Laman Web pada tarikh anda menggunakan perkhidmatan kami terpakai untuk penglibatan tersebut. Penggunaan berterusan Laman Web selepas perubahan disiarkan merupakan penerimaan Syarat yang dikemas kini.'],
      },
      { title: '16. Hubungi', contact: true },
    ],
  },

  refund: {
    title: 'Polisi Bayaran Balik',
    lastUpdated: 'Kemaskini terakhir: 25 Oktober 2026',
    sections: [
      {
        title: '1. Komitmen kami terhadap ketelusan',
        body: [
          'Kami percaya bahawa anda patut tahu dengan tepat apa yang anda bayar — dan apa yang berlaku jika keadaan tidak berjalan seperti yang dirancang — sebelum anda membuat sebarang komitmen.',
          'Berikut adalah cara proses kami berfungsi:',
        ],
        items: [
          'Anda menerima pelan rawatan lengkap, cadangan hospital, dan anggaran kos berperincian — sebelum sebarang bayaran diminta.',
          'Deposit tempahan hanya diperlukan selepas anda menyemak dan mengesahkan pelan anda secara bertulis.',
          'Perjanjian perkhidmatan individu anda — termasuk jumlah deposit, skop perkhidmatan, dan terma bayaran balik tertentu — disediakan dan ditandatangani sebelum sebarang bayaran dibuat.',
          'Yuran hospital dan klinik sentiasa dibayar terus kepada hospital rawatan. ShanghaiMed tidak mengutip atau menyimpan yuran perubatan.',
        ],
      },
      {
        title: '2. Prinsip bayaran balik umum',
        body: [
          'Kami mengendalikan bayaran balik dengan adil dan telus. Satu prinsip terpakai merentas semua situasi: kos yang telah ditanggung (komitmen pihak ketiga dan kerja koordinasi yang telah disiapkan) ditolak pada kos sebenar, dan baki selebihnya dikembalikan.',
          '«Koordinasi bermula» apabila kami pertama kali melaksanakan kerja koordinasi bagi pihak anda — contohnya: menterjemah rekod perubatan anda, menghubungi hospital, atau menjadualkan janji temu.',
        ],
        table: {
          headers: ['Situasi', 'Pendekatan bayaran balik'],
          rows: [
            { cells: ['Jika anda membatalkan sebelum koordinasi bermula', 'Deposit dikembalikan sepenuhnya, tolak yuran pemprosesan pembayaran (biasanya 2–4%).'] },
            { cells: ['Jika anda membatalkan selepas koordinasi bermula', 'Kos sebenar yang telah ditanggung bagi pihak anda — penjadualan janji temu, terjemahan rekod perubatan, koordinasi pentadbiran — ditolak pada kos sebenar. Baki selebihnya dikembalikan dengan pecahan berperincian.'] },
            { cells: ['Jika hospital menolak kes anda', 'Baki selebihnya dikembalikan tolak kos sebenar yang ditanggung sehingga titik tersebut.'] },
            { cells: ['Jika pelan rawatan didapati tidak sesuai', 'Baki selebihnya dikembalikan tolak kos sebenar yang ditanggung sehingga titik tersebut.'] },
            { cells: ['Jika visa anda ditolak', 'Tiada pihak yang bersalah. Komitmen pihak ketiga yang telah dikunci bagi pihak anda (contohnya, pengangkutan khas, janji temu diagnostik yang ditempah awal) ditolak pada kos sebenar; kerja koordinasi yang disiapkan ditolak pada kos sebenar; baki selebihnya dikembalikan.'] },
            { cells: ['Force majeure', 'Bencana alam, wabak, sekatan perjalanan kerajaan, dan peristiwa serupa di luar kawalan kedua-dua pihak dikendalikan di bawah prinsip yang sama: kos pihak ketiga pada kos, kerja koordinasi pada kos, baki dikembalikan.'] },
          ],
        },
      },
      {
        title: '3. Komitmen pihak ketiga yang tidak boleh dikembalikan',
        body: [
          'Sesetengah perkhidmatan memerlukan kami untuk mengamankan tempahan dengan penyedia pihak ketiga terlebih dahulu. Sebaik sahaja tempahan ini dikunci, kos yang berkaitan tidak boleh dikembalikan, kerana pihak ketiga telah menempah sumber bagi pihak anda. Ini termasuk:',
        ],
        items: [
          'Pengangkutan perubatan khas atau kenderaan boleh diakses yang disusun khusus untuk lawatan anda;',
          'Janji temu diagnostik atau makmal yang ditempah awal dengan slot terhad;',
          'Sebarang komitmen pihak ketiga lain yang memerlukan tempahan awal dan dinyatakan secara berperincian dalam perjanjian perkhidmatan anda.',
        ],
        closing: 'Perkara ini sentiasa didedahkan dalam perjanjian perkhidmatan individu anda sebelum pembayaran. Anda akan melihat dengan tepat item mana yang tidak boleh dikembalikan sebelum anda menandatangani.',
      },
      {
        title: '4. Perjanjian perkhidmatan individu anda mengawal',
        body: [
          'Prinsip di atas mencerminkan pendekatan umum kami. Terma bayaran balik khusus anda — termasuk jumlah deposit, item boleh dikembalikan dan tidak boleh dikembalikan, garis masa, dan syarat yang berkenaan — dinyatakan secara terperinci dalam perjanjian perkhidmatan individu anda.',
          'Perjanjian ini:',
        ],
        items: [
          'Disediakan selepas pelan rawatan anda disahkan;',
          'Dihantar kepada anda untuk semakan sebelum sebarang bayaran perlu dibayar;',
          'Ditandatangani oleh kedua-dua pihak sebelum koordinasi bermula.',
        ],
        closing: 'Sekiranya terdapat perbezaan antara polisi umum ini dan perjanjian perkhidmatan bertanda tangan anda, perjanjian perkhidmatan diutamakan.',
      },
      {
        title: '5. Cara memohon bayaran balik',
        body: [
          'Untuk memohon bayaran balik, hubungi kami secara bertulis melalui e-mel di hello@shanghaimedhealth.com atau melalui saluran sokongan WhatsApp khusus anda. Sila sertakan:',
        ],
        items: [
          'Nama penuh dan rujukan tempahan anda;',
          'Sebab permohonan bayaran balik;',
          'Sebarang dokumen sokongan yang berkaitan (contohnya, notis penolakan visa, penilaian perubatan).',
        ],
        closing: 'Kami mengakui permohonan bayaran balik dalam tempoh 2 hari perniagaan dan memproses bayaran balik yang diluluskan dalam tempoh 5 hari perniagaan.',
      },
      { title: '6. Hubungi', contact: true },
    ],
  },
}
