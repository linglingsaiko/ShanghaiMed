'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const en = {
  title: 'About ShanghaiMed',
  hero: 'Independent medical coordination for international patients in Shanghai.',
  intro:
    "ShanghaiMed helps people from around the world navigate Shanghai's healthcare system — from a first online question to appointments, translation, and follow-up.",
  whoTitle: 'Who We Are',
  who: "We are an independent medical concierge — not a hospital, and not a referral network. We don't belong to any hospital group, and we don't limit you to a fixed list of partners. We recommend hospitals and doctors based on your condition, because that's what determines a good outcome.",
  founderTitle: 'Our Founder',
  founderIntro:
    'ShanghaiMed was founded by Sara Ma (legal name: Lingling Ma / 马玲玲), a registered nurse with over a decade of experience in premium healthcare operations in Shanghai.',
  founderCreds: [
    'Registered Nurse (RN), China',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'Trilingual: Chinese, English, Japanese',
  ],
  founderBio:
    'Sara has spent more than ten years coordinating care for international patients: routine consultations, complex surgery coordination, medical records, and the hundred small problems that decide whether a trip succeeds.',
  doTitle: 'What We Do',
  doItems: [
    'A free first consultation on WhatsApp to understand your situation',
    'Matching you with the right hospital and specialist for your condition',
    'Appointment scheduling and coordination',
    'Medical translation and on-site accompaniment',
    'Medical records preparation and second opinions',
    'Transparent cost estimates before you commit',
  ],
  aiTitle: 'Self-Serve AI Tools',
  ai: 'Not everyone needs full coordination. Self-serve tools like MediMatch let you research and match Shanghai hospitals and specialists on your own — do your own homework first, then decide whether you want our help. More self-serve tools on the way.',
  commitmentsTitle: 'How We Work — Four Commitments',
  commitments: [
    { h: 'Independent.', b: 'We charge a transparent service fee and take no commissions from hospitals.' },
    { h: 'Your money goes to the hospital.', b: 'Medical fees are paid directly to the hospital, never through us.' },
    { h: 'Honest about outcomes.', b: 'We don\'t promise cures or "the best in the world." We tell you what the evidence and the hospital actually say.' },
    { h: 'Condition-first.', b: 'We recommend the hospital that fits your diagnosis, not the one that pays us.' },
  ],
  scopeTitle: 'A Note on Scope',
  scope:
    'ShanghaiMed provides coordination and translation, not medical diagnosis or treatment. All medical decisions are made by you and your licensed physicians.',
}

const ja = {
  title: 'ShanghaiMedについて',
  hero: '上海で海外からの患者さまを支援する、独立した医療コーディネーション。',
  intro:
    'ShanghaiMedは、初めてのオンライン相談から予約、通訳、フォローアップまで、世界中の方々が上海の医療制度をスムーズに利用できるよう支援します。',
  whoTitle: '私たちについて',
  who: '私たちは独立した医療コンシェルジュであり、病院でも紹介ネットワークでもありません。特定の病院グループに所属せず、決まった提携先リストに限定することもありません。患者さまの病状に基づいて病院と医師をご提案します。より良い結果には、病状との適合性が重要だと考えるからです。',
  founderTitle: '創業者',
  founderIntro:
    'ShanghaiMedは、上海で10年以上にわたりハイエンド医療の運営経験を持つ登録看護師、Sara Ma (legal name: Lingling Ma / 马玲玲) によって創設されました。',
  founderCreds: [
    '登録看護師（RN）、中国',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    '中国語・英語・日本語の3か国語',
  ],
  founderBio:
    'Saraは10年以上にわたり、海外からの患者さまの診察予約、複雑な手術の調整、診療記録の準備を支援し、渡航医療を滞りなく進めるうえで欠かせない細かな課題にも対応してきました。',
  doTitle: '私たちのサービス',
  doItems: [
    'WhatsAppでの無料初回相談で、ご状況をお聞きします',
    '病状に適した病院と専門医をご提案します',
    '診察予約と各種調整',
    '医療通訳と現地での付き添い',
    '診療記録の準備とセカンドオピニオンの調整',
    'ご決断前に、費用の透明性の高いお見積もりを提示します',
  ],
  aiTitle: 'セルフサービスAIツール',
  ai: 'すべての方に包括的なコーディネーションが必要なわけではありません。MediMatchなどのセルフサービスツールを使えば、上海の病院や専門医をご自身で調べ、比較できます。まずご自身で情報を確認し、そのうえで私たちの支援が必要かどうかをご判断ください。今後もセルフサービスツールを追加予定です。',
  commitmentsTitle: '私たちの仕事の進め方 — 4つの約束',
  commitments: [
    { h: '独立した運営。', b: '透明性の高いサービス料金をいただき、病院からのコミッションは受け取りません。' },
    { h: '医療費は病院へ。', b: '医療費は私たちを介さず、病院に直接お支払いいただきます。' },
    { h: '治療結果について誠実に。', b: '治癒や「世界最高」をお約束することはありません。医学的根拠と病院からの実際の説明をお伝えします。' },
    { h: '病状を最優先に。', b: '私たちに支払いのある病院ではなく、診断内容に適した病院をご提案します。' },
  ],
  scopeTitle: 'サービス範囲について',
  scope:
    'ShanghaiMedが提供するのは、医療コーディネーションと通訳であり、診断や治療ではありません。医療に関する決定はすべて、患者さまご自身と資格を持つ担当医師が行います。',
}

const ar = {
  title: 'نبذة عن ShanghaiMed',
  hero: 'تنسيق طبي مستقل للمرضى الدوليين في شنغهاي.',
  intro:
    'تساعد ShanghaiMed الأشخاص من جميع أنحاء العالم على التعامل مع نظام الرعاية الصحية في شنغهاي — بدءًا من أول سؤال عبر الإنترنت وحتى حجز المواعيد والترجمة والمتابعة.',
  whoTitle: 'من نحن',
  who: 'نحن خدمة كونسيرج طبية مستقلة، ولسنا مستشفى أو شبكة إحالة. لا نتبع أي مجموعة مستشفيات، ولا نقصر خياراتك على قائمة ثابتة من الشركاء. نوصي بالمستشفيات والأطباء بناءً على حالتك، لأن ملاءمتهم للتشخيص عامل مهم في جودة المسار العلاجي.',
  founderTitle: 'مؤسِّستنا',
  founderIntro:
    'أسست Sara Ma (legal name: Lingling Ma / 马玲玲) منصة ShanghaiMed، وهي ممرضة مسجلة تتمتع بخبرة تزيد على عشر سنوات في إدارة عمليات الرعاية الصحية الراقية في شنغهاي.',
  founderCreds: [
    'ممرضة مسجلة (RN)، الصين',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'تتحدث ثلاث لغات: الصينية والإنجليزية واليابانية',
  ],
  founderBio:
    'أمضت Sara أكثر من عشر سنوات في تنسيق رعاية المرضى الدوليين: الاستشارات الروتينية، وتنسيق العمليات الجراحية المعقدة، والسجلات الطبية، ومعالجة العديد من التفاصيل الصغيرة التي تؤثر في سير رحلة العلاج بسلاسة.',
  doTitle: 'ما الذي نقدمه',
  doItems: [
    'استشارة أولى مجانية عبر WhatsApp لفهم وضعك',
    'مطابقتك مع المستشفى والأخصائي المناسبين لحالتك',
    'حجز المواعيد وتنسيقها',
    'الترجمة الطبية والمرافقة في موقع الرعاية',
    'إعداد السجلات الطبية وتنسيق الآراء الطبية الثانية',
    'تقديرات واضحة للتكاليف قبل أن تتخذ قرارك',
  ],
  aiTitle: 'أدوات ذكاء اصطناعي للخدمة الذاتية',
  ai: 'لا يحتاج الجميع إلى تنسيق شامل. تتيح لك أدوات الخدمة الذاتية مثل MediMatch البحث عن مستشفيات وأخصائيين في شنغهاي ومطابقتهم مع احتياجاتك بنفسك. ابدأ بإجراء بحثك الخاص، ثم قرر ما إذا كنت ترغب في مساعدتنا. سنضيف المزيد من أدوات الخدمة الذاتية قريبًا.',
  commitmentsTitle: 'كيف نعمل — أربعة التزامات',
  commitments: [
    { h: 'استقلالية.', b: 'نفرض رسوم خدمة شفافة ولا نتلقى أي عمولات من المستشفيات.' },
    { h: 'أموالك تذهب إلى المستشفى.', b: 'تُدفع الرسوم الطبية مباشرة إلى المستشفى، ولا تمر عبرنا أبدًا.' },
    { h: 'الصدق بشأن النتائج.', b: 'لا نَعِد بالشفاء أو بأننا «الأفضل في العالم». نوضح لك ما تقوله الأدلة وما يوضحه المستشفى فعليًا.' },
    { h: 'الحالة أولًا.', b: 'نوصي بالمستشفى الذي يناسب تشخيصك، لا بالمستشفى الذي يدفع لنا.' },
  ],
  scopeTitle: 'توضيح بشأن نطاق الخدمة',
  scope:
    'تقدم ShanghaiMed خدمات التنسيق والترجمة، ولا تقدم التشخيص الطبي أو العلاج. تتخذ أنت وأطباؤك المرخصون جميع القرارات الطبية.',
}

const ru = {
  title: 'О ShanghaiMed',
  hero: 'Независимая медицинская координация для иностранных пациентов в Шанхае.',
  intro:
    'ShanghaiMed помогает людям со всего мира ориентироваться в системе здравоохранения Шанхая — от первого онлайн-вопроса до записи на приём, перевода и последующего сопровождения.',
  whoTitle: 'Кто мы',
  who: 'Мы — независимый медицинский консьерж-сервис, а не больница и не реферальная сеть. Мы не принадлежим ни одной больничной группе и не ограничиваем вас фиксированным списком партнёров. Мы рекомендуем больницы и врачей с учётом вашего заболевания, поскольку соответствие клиники диагнозу важно для результата лечения.',
  founderTitle: 'Наша основательница',
  founderIntro:
    'ShanghaiMed основала Sara Ma (legal name: Lingling Ma / 马玲玲) — дипломированная медсестра с более чем десятилетним опытом организации медицинских услуг премиум-класса в Шанхае.',
  founderCreds: [
    'Дипломированная медсестра (RN), Китай',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'Три языка: китайский, английский и японский',
  ],
  founderBio:
    'Более десяти лет Sara координирует лечение иностранных пациентов: плановые консультации, организацию сложных операций, подготовку медицинских документов и решение множества небольших, но важных вопросов, от которых зависит успех поездки.',
  doTitle: 'Что мы делаем',
  doItems: [
    'Бесплатная первичная консультация в WhatsApp, чтобы понять вашу ситуацию',
    'Подбор больницы и профильного специалиста с учётом вашего заболевания',
    'Запись на приём и координация',
    'Медицинский перевод и личное сопровождение',
    'Подготовка медицинских документов и организация получения второго мнения',
    'Прозрачная предварительная оценка расходов до принятия вами решения',
  ],
  aiTitle: 'Инструменты ИИ для самостоятельной работы',
  ai: 'Полная координация нужна не всем. Инструменты для самостоятельной работы, такие как MediMatch, позволяют самому изучать больницы и специалистов Шанхая и подбирать подходящие варианты. Сначала проведите собственное исследование, а затем решите, нужна ли вам наша помощь. Вскоре появятся новые инструменты для самостоятельной работы.',
  commitmentsTitle: 'Как мы работаем — четыре обязательства',
  commitments: [
    { h: 'Независимость.', b: 'Мы взимаем прозрачную плату за услуги и не получаем комиссионных от больниц.' },
    { h: 'Ваши деньги поступают в больницу.', b: 'Медицинские услуги оплачиваются непосредственно больнице, а не через нас.' },
    { h: 'Честность о результатах.', b: 'Мы не обещаем выздоровления или «лучшего в мире» лечения. Мы передаём вам информацию из научных источников и фактические пояснения больницы.' },
    { h: 'Диагноз прежде всего.', b: 'Мы рекомендуем больницу, которая подходит при вашем диагнозе, а не ту, которая платит нам.' },
  ],
  scopeTitle: 'О границах наших услуг',
  scope:
    'ShanghaiMed обеспечивает координацию и перевод, но не ставит диагнозы и не проводит лечение. Все медицинские решения принимаете вы и ваши лицензированные врачи.',
}

const mn = {
  title: 'ShanghaiMed-ийн тухай',
  hero: 'Шанхай дахь олон улсын өвчтөнүүдэд зориулсан бие даасан эрүүл мэндийн зохицуулалт.',
  intro:
    'ShanghaiMed нь дэлхийн өнцөг булан бүрээс ирсэн хүмүүст Шанхайн эрүүл мэндийн системд танилцахад нь тусалдаг — анхны онлайн асуултаас эхлээд уулзалт товлох, орчуулга, дараагийн хяналт хүртэл.',
  whoTitle: 'Бид хэн бэ',
  who: 'Бид бол бие даасан эрүүл мэндийн консьерж үйлчилгээ бөгөөд эмнэлэг ч биш, чиглүүлэх сүлжээ ч биш. Бид аль нэг эмнэлгийн группд харьяалагддаггүй, тодорхой түншүүдийн жагсаалтаар таны сонголтыг хязгаарладаггүй. Бид таны өвчний байдалд үндэслэн эмнэлэг, эмчийг санал болгодог. Учир нь оноштой нийцэх нь эмчилгээний сайн үр дүнд чухал гэж бид үздэг.',
  founderTitle: 'Манай үүсгэн байгуулагч',
  founderIntro:
    'ShanghaiMed-ийг Шанхайд өндөр түвшний эрүүл мэндийн үйлчилгээний удирдлагын чиглэлээр арван гаруй жилийн туршлагатай бүртгэлтэй сувилагч Sara Ma (legal name: Lingling Ma / 马玲玲) үүсгэн байгуулсан.',
  founderCreds: [
    'Бүртгэлтэй сувилагч (RN), Хятад',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'Хятад, англи, япон гэсэн гурван хэлээр ярьдаг',
  ],
  founderBio:
    'Sara олон улсын өвчтөнүүдийн эмчилгээг арван гаруй жил зохицуулж ирсэн: ердийн зөвлөгөө, нарийн төвөгтэй мэс заслын зохицуулалт, эмнэлгийн бичиг баримт, мөн аялал амжилттай болоход нөлөөлдөг олон жижиг асуудлыг шийдэж ирсэн.',
  doTitle: 'Бидний хийдэг зүйл',
  doItems: [
    'Таны байдлыг ойлгохын тулд WhatsApp-аар үнэгүй анхны зөвлөгөө өгөх',
    'Өвчний байдалд тань тохирох эмнэлэг, мэргэжлийн эмчийг тааруулах',
    'Уулзалт товлох, зохицуулалт хийх',
    'Эмнэлгийн орчуулга болон газар дээр нь дагалдах',
    'Эмнэлгийн бичиг баримт бэлтгэх, эмчийн хоёр дахь санал авах зохицуулалт',
    'Та шийдвэр гаргахаасаа өмнө зардлын ил тод урьдчилсан тооцоо өгөх',
  ],
  aiTitle: 'Өөрөө ашиглах AI хэрэгслүүд',
  ai: 'Хүн бүрд бүрэн зохицуулалт хэрэгтэй байдаггүй. MediMatch зэрэг өөрөө ашиглах хэрэгслээр та Шанхайн эмнэлэг, мэргэжлийн эмч нарыг өөрөө судалж, өөртөө тохирох сонголтыг хийж болно. Эхлээд өөрөө мэдээллээ судлаад, дараа нь бидний тусламж хэрэгтэй эсэхээ шийдээрэй. Цаашид өөрөө ашиглах шинэ хэрэгслүүд нэмэгдэнэ.',
  commitmentsTitle: 'Бидний ажиллах зарчим — Дөрвөн амлалт',
  commitments: [
    { h: 'Бие даасан.', b: 'Бид ил тод үйлчилгээний хөлс авдаг бөгөөд эмнэлгүүдээс шимтгэл авдаггүй.' },
    { h: 'Таны мөнгө эмнэлэгт очно.', b: 'Эмчилгээний төлбөрийг биднээр дамжуулалгүй шууд эмнэлэгт төлнө.' },
    { h: 'Үр дүнгийн талаар шударга.', b: 'Бид эдгэрэх эсвэл «дэлхийн хамгийн сайн» гэж амладаггүй. Шинжлэх ухааны нотолгоо болон эмнэлгийн бодит тайлбарыг танд хүргэнэ.' },
    { h: 'Өвчний байдал түрүүнд.', b: 'Бидэнд төлбөр өгдөг эмнэлгийг биш, таны оношид тохирох эмнэлгийг санал болгодог.' },
  ],
  scopeTitle: 'Үйлчилгээний хамрах хүрээний тухай',
  scope:
    'ShanghaiMed нь зохицуулалт болон орчуулгын үйлчилгээ үзүүлдэг бөгөөд оношлогоо, эмчилгээ хийдэггүй. Эрүүл мэндтэй холбоотой бүх шийдвэрийг та болон таны лицензтэй эмч нар гаргана.',
}

const ms = {
  title: 'Perihal ShanghaiMed',
  hero: 'Penyelarasan perubatan bebas untuk pesakit antarabangsa di Shanghai.',
  intro:
    'ShanghaiMed membantu orang dari seluruh dunia menavigasi sistem penjagaan kesihatan di Shanghai — daripada soalan pertama dalam talian sehinggalah temujanji, penterjemahan dan susulan.',
  whoTitle: 'Siapa Kami',
  who: 'Kami ialah concierge perubatan bebas — bukan hospital dan bukan rangkaian rujukan. Kami tidak tergolong dalam mana-mana kumpulan hospital dan tidak mengehadkan anda kepada senarai rakan kongsi yang tetap. Kami mengesyorkan hospital dan doktor berdasarkan keadaan perubatan anda, kerana kesesuaian dengan diagnosis penting untuk hasil rawatan yang baik.',
  founderTitle: 'Pengasas Kami',
  founderIntro:
    'ShanghaiMed diasaskan oleh Sara Ma (legal name: Lingling Ma / 马玲玲), seorang jururawat berdaftar dengan lebih sedekad pengalaman dalam operasi penjagaan kesihatan premium di Shanghai.',
  founderCreds: [
    'Jururawat Berdaftar (RN), China',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'Tiga bahasa: Bahasa China, Inggeris dan Jepun',
  ],
  founderBio:
    'Sara telah menghabiskan lebih sepuluh tahun menyelaraskan penjagaan pesakit antarabangsa: konsultasi rutin, penyelarasan pembedahan kompleks, rekod perubatan, dan pelbagai perkara kecil yang mempengaruhi kelancaran perjalanan rawatan.',
  doTitle: 'Apa Yang Kami Lakukan',
  doItems: [
    'Konsultasi pertama percuma di WhatsApp untuk memahami keadaan anda',
    'Memadankan anda dengan hospital dan pakar yang sesuai mengikut keadaan perubatan anda',
    'Penjadwalan dan penyelarasan temujanji',
    'Penterjemahan perubatan dan pengiringan di lokasi',
    'Penyediaan rekod perubatan dan pendapat kedua',
    'Anggaran kos yang telus sebelum anda membuat keputusan',
  ],
  aiTitle: 'Alat AI Layan Diri',
  ai: 'Tidak semua orang memerlukan penyelarasan penuh. Alat layan diri seperti MediMatch membolehkan anda membuat penyelidikan dan memadankan hospital serta pakar di Shanghai sendiri. Buat semakan sendiri terlebih dahulu, kemudian tentukan sama ada anda memerlukan bantuan kami. Lebih banyak alat layan diri akan menyusul.',
  commitmentsTitle: 'Cara Kami Bekerja — Empat Komitmen',
  commitments: [
    { h: 'Bebas.', b: 'Kami mengenakan yuran perkhidmatan yang telus dan tidak menerima komisen daripada hospital.' },
    { h: 'Wang anda dibayar kepada hospital.', b: 'Yuran perubatan dibayar terus kepada hospital dan tidak pernah melalui kami.' },
    { h: 'Jujur tentang hasil rawatan.', b: 'Kami tidak menjanjikan penyembuhan atau rawatan "terbaik di dunia". Kami menyampaikan apa yang dinyatakan oleh bukti dan penjelasan sebenar hospital.' },
    { h: 'Keadaan perubatan diutamakan.', b: 'Kami mengesyorkan hospital yang sesuai dengan diagnosis anda, bukan hospital yang membayar kami.' },
  ],
  scopeTitle: 'Nota Mengenai Skop Perkhidmatan',
  scope:
    'ShanghaiMed menyediakan penyelarasan dan penterjemahan, bukan diagnosis atau rawatan perubatan. Semua keputusan perubatan dibuat oleh anda dan doktor anda yang berlesen.',
}

const id = {
  title: 'Tentang ShanghaiMed',
  hero: 'Koordinasi medis independen untuk pasien internasional di Shanghai.',
  intro:
    'ShanghaiMed membantu orang-orang dari seluruh dunia menavigasi sistem layanan kesehatan di Shanghai — mulai dari pertanyaan awal secara online hingga janji temu, penerjemahan, dan tindak lanjut.',
  whoTitle: 'Siapa Kami',
  who: 'Kami adalah layanan concierge medis independen — bukan rumah sakit dan bukan jaringan rujukan. Kami tidak berafiliasi dengan grup rumah sakit mana pun dan tidak membatasi Anda pada daftar mitra yang tetap. Kami merekomendasikan rumah sakit dan dokter berdasarkan kondisi medis Anda, karena kesesuaian dengan diagnosis penting untuk hasil perawatan yang baik.',
  founderTitle: 'Pendiri Kami',
  founderIntro:
    'ShanghaiMed didirikan oleh Sara Ma (legal name: Lingling Ma / 马玲玲), seorang perawat terdaftar dengan pengalaman lebih dari satu dekade dalam operasional layanan kesehatan premium di Shanghai.',
  founderCreds: [
    'Perawat Terdaftar (RN), Tiongkok',
    'BSN, Shanghai Jiao Tong University School of Medicine',
    'MBA Executive Education, Shanghai Jiao Tong University',
    'ISPN — International Standards for Professional Nurses',
    'Tiga bahasa: Mandarin, Inggris, Jepang',
  ],
  founderBio:
    'Sara telah menghabiskan lebih dari sepuluh tahun mengoordinasikan perawatan pasien internasional: konsultasi rutin, koordinasi operasi kompleks, rekam medis, dan berbagai persoalan kecil yang memengaruhi kelancaran perjalanan medis.',
  doTitle: 'Apa yang Kami Lakukan',
  doItems: [
    'Konsultasi awal gratis melalui WhatsApp untuk memahami situasi Anda',
    'Mencocokkan Anda dengan rumah sakit dan spesialis yang tepat sesuai kondisi medis Anda',
    'Penjadwalan dan koordinasi janji temu',
    'Penerjemahan medis dan pendampingan di lokasi',
    'Persiapan rekam medis dan koordinasi opini medis kedua',
    'Perkiraan biaya yang transparan sebelum Anda mengambil keputusan',
  ],
  aiTitle: 'Alat AI Mandiri',
  ai: 'Tidak semua orang membutuhkan koordinasi penuh. Alat mandiri seperti MediMatch memungkinkan Anda meneliti dan mencocokkan rumah sakit serta spesialis di Shanghai sendiri. Lakukan riset Anda terlebih dahulu, lalu putuskan apakah Anda membutuhkan bantuan kami. Lebih banyak alat mandiri akan segera tersedia.',
  commitmentsTitle: 'Cara Kami Bekerja — Empat Komitmen',
  commitments: [
    { h: 'Independen.', b: 'Kami mengenakan biaya layanan yang transparan dan tidak menerima komisi dari rumah sakit.' },
    { h: 'Uang Anda dibayarkan ke rumah sakit.', b: 'Biaya medis dibayarkan langsung ke rumah sakit, tidak pernah melalui kami.' },
    { h: 'Jujur tentang hasil.', b: 'Kami tidak menjanjikan kesembuhan atau perawatan "terbaik di dunia". Kami menyampaikan apa yang dikemukakan oleh bukti dan penjelasan aktual dari rumah sakit.' },
    { h: 'Mengutamakan kondisi medis.', b: 'Kami merekomendasikan rumah sakit yang sesuai dengan diagnosis Anda, bukan rumah sakit yang membayar kami.' },
  ],
  scopeTitle: 'Catatan tentang Ruang Lingkup Layanan',
  scope:
    'ShanghaiMed menyediakan koordinasi dan penerjemahan, bukan diagnosis atau perawatan medis. Semua keputusan medis dibuat oleh Anda dan dokter Anda yang berlisensi.',
}

const translations: Record<string, typeof en> = { en, ja, ar, ru, mn, ms, id }

export default function AboutContent() {
  const { language } = useLanguage()
  const t = translations[language] || translations.en
  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12">
      <div className="section-container max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
        <p className="text-xl text-teal-700 font-medium mb-6">{t.hero}</p>
        <p className="text-gray-600 mb-10">{t.intro}</p>

        <section className="bg-white rounded-lg border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.whoTitle}</h2>
          <p className="text-gray-600">{t.who}</p>
        </section>

        <section className="bg-white rounded-lg border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.founderTitle}</h2>
          <p className="text-gray-600 mb-4">{t.founderIntro}</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
            {t.founderCreds.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="text-gray-600">{t.founderBio}</p>
        </section>

        <section className="bg-white rounded-lg border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.doTitle}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {t.doItems.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.aiTitle}</h2>
          <p className="text-gray-600">
            {t.ai.split('MediMatch').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <Link href="/medical-records" className="text-teal-700 font-medium hover:underline">MediMatch</Link>
                )}
              </React.Fragment>
            ))}
          </p>
        </section>

        <section className="bg-white rounded-lg border p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.commitmentsTitle}</h2>
          <ul className="space-y-3">
            {t.commitments.map((c) => (
              <li key={c.h} className="text-gray-600">
                <span className="font-semibold text-gray-900">{c.h}</span> {c.b}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.scopeTitle}</h2>
          <p className="text-gray-600">{t.scope}</p>
        </section>
      </div>
    </div>
  )
}
