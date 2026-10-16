'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface Credential {
  title: string
  detail: string
  category: string
}

interface ExperienceItem {
  area: string
  detail: string
}

const credentialsData: Record<'en' | 'ja' | 'ar' | 'ru', Credential[]> = {
  en: [
    {
      title: 'ISPN — International Standards for Professional Nurses',
      detail: 'International certification for registered nurses, issued by the International Society of Nurses in Cancer Care and affiliated bodies',
      category: 'Nursing License',
    },
    {
      title: 'Senior Registered Nurse',
      detail: 'Senior-level professional title within China’s national health professional ranking system, awarded by the Shanghai Municipal Health Commission',
      category: 'Professional Title',
    },
    {
      title: 'JLPT N1 — Japanese-Language Proficiency Test, Level N1',
      detail: 'Highest level of Japanese language certification, issued by the Japan Foundation and Japan Educational Exchanges and Services',
      category: 'Language Certification',
    },
    {
      title: 'Registered Nurse (RN), China',
      detail: 'Licensed by the Shanghai Municipal Health Commission',
      category: 'Nursing License',
    },
  ],
  ja: [
    {
      title: 'ISPN — International Standards for Professional Nurses',
      detail: '国際看護師向けの国際認定。国際がん看護学会（ISNCC）および関連機関により授与。',
      category: '看護師免許',
    },
    {
      title: '上級看護師',
      detail: '中国の国家衛生専門技術資格制度における上級の専門職称号。上海市衛生健康委員会より授与。',
      category: '専門職称号',
    },
    {
      title: 'JLPT N1 — 日本語能力試験 最高レベル',
      detail: '日本語能力試験の最高レベル。国際交流基金および日本国際教育支援協会より授与。',
      category: '語学資格',
    },
    {
      title: '登録看護師（RN）、中国',
      detail: '上海市衛生健康委員会より看護師執業資格を取得。',
      category: '看護師免許',
    },
  ],
  ar: [
    {
      title: 'ISPN — المعايير الدولية للممرضين المهنيين',
      detail: 'شهادة دولية للممرضين المسجلين، تصدرها الجمعية الدولية لممرضي رعاية السرطان والجهات المنتسبة إليها',
      category: 'رخصة تمريض',
    },
    {
      title: 'ممرضة مسجلة كبيرة (主管护师)',
      detail: 'لقب مهني رفيع ضمن نظام التصنيف الوطني الصيني للكوادر الصحية، تمنحه لجنة شنغهاي البلدية للصحة',
      category: 'لقب مهني',
    },
    {
      title: 'JLPT N1 — اختبار كفاءة اللغة اليابانية، المستوى N1',
      detail: 'أعلى مستوى في شهادة اللغة اليابانية، تصدره مؤسسة اليابان وخدمات التبادل التعليمي اليابانية',
      category: 'شهادة لغوية',
    },
    {
      title: 'ممرضة مسجلة (RN)، الصين',
      detail: 'مرخصة من لجنة شنغهاي البلدية للصحة',
      category: 'رخصة تمريض',
    },
  ],
  ru: [
    {
      title: 'ISPN — Международные стандарты для профессиональных медсестёр',
      detail: 'Международная сертификация для дипломированных медсестёр, выдается Международным обществом медсестёр в области онкологической помощи и связанными организациями',
      category: 'Медицинская лицензия',
    },
    {
      title: 'Медсестра высшей категории (主管护师)',
      detail: 'Высшее профессиональное звание в национальной китайской системе квалификации медицинских работников, присуждается Шанхайской муниципальной комиссией по здравоохранению',
      category: 'Профессиональное звание',
    },
    {
      title: 'JLPT N1 — Экзамен по японскому языку, уровень N1',
      detail: 'Высший уровень сертификации японского языка, выдается Japan Foundation и Japan Educational Exchanges and Services',
      category: 'Языковой сертификат',
    },
    {
      title: 'Дипломированная медсестра (RN), Китай',
      detail: 'Лицензия выдана Шанхайской муниципальной комиссией по здравоохранению',
      category: 'Медицинская лицензия',
    },
  ],
}

const experienceData: Record<'en' | 'ja' | 'ar' | 'ru', ExperienceItem[]> = {
  en: [
    {
      area: 'International Patient Coordination',
      detail: 'Coordinated end-to-end medical journeys for patients from the Middle East, Southeast Asia, Europe, North America, and other regions — from initial consultation through discharge and post-operative follow-up.',
    },
    {
      area: 'Hospital Navigation & Medical Translation',
      detail: 'Provided real-time medical interpretation in English, Japanese, and Mandarin for international patients at Shanghai Grade 3A (三甲) hospitals. Additional languages supported through vetted professional translators.',
    },
    {
      area: 'Premium Healthcare Operations',
      detail: "Over 10 years of operational management at Shanghai's leading private medical institutions — designing care workflows, optimizing patient experience, and coordinating cross-departmental medical programmes.",
    },
    {
      area: 'Medical Tourism Operations',
      detail: 'Built operational workflows covering visa guidance, insurance direct billing (Cigna, Allianz, AXA, Bupa), accommodation coordination, and AI-powered 24/7 patient support via Navi, our medical navigator.',
    },
  ],
  ja: [
    {
      area: '国際患者コーディネーション',
      detail: '中東、東南アジア、ヨーロッパ、北米などの患者を対象に、初回相談から退院・術後フォローアップまで、受診の全行程を調整。',
    },
    {
      area: '病院案内・医療通訳',
      detail: '上海の三級甲等（三甲）病院で、国際患者向けに英語・日本語・中国語のリアルタイム医療通訳を提供。その他の言語は、審査済みの専門通訳者を手配可能。',
    },
    {
      area: 'ハイエンド医療機関の運営',
      detail: '上海を代表する民間医療機関で10年以上の運営管理経験。診療フローの設計、患者体験の改善、部門横断的な医療プログラムの調整を担当。',
    },
    {
      area: '医療観光オペレーション',
      detail: 'ビザ案内、保険の直接請求（Cigna、Allianz、AXA、Bupa）、宿泊手配、医療ナビゲーター「Navi」によるAI 24時間サポートまで、業務フローを構築。',
    },
  ],
  ar: [
    {
      area: 'تنسيق المرضى الدوليين',
      detail: 'نسّقت رحلات طبية متكاملة للمرضى من الشرق الأوسط وجنوب شرق آسيا وأوروبا وأمريكا الشمالية ومناطق أخرى — من الاستشارة الأولى حتى الخروج من المستشفى ومتابعة ما بعد الجراحة.',
    },
    {
      area: 'الإرشاد داخل المستشفيات والترجمة الطبية',
      detail: 'قدّمت ترجمة طبية فورية بالإنجليزية واليابانية والماندرين للمرضى الدوليين في مستشفيات شنغهاي من الفئة 3A (三甲). وتُدعَم لغات إضافية عبر مترجمين مهنيين معتمدين.',
    },
    {
      area: 'إدارة عمليات الرعاية الصحية الراقية',
      detail: 'أكثر من 10 سنوات في الإدارة التشغيلية لدى أبرز المؤسسات الطبية الخاصة في شنغهاي — تصميم مسارات الرعاية، وتحسين تجربة المريض، وتنسيق البرامج الطبية العابرة للأقسام.',
    },
    {
      area: 'عمليات السياحة العلاجية',
      detail: 'بنيت مسارات تشغيلية تشمل إرشاد التأشيرات، والدفع المباشر للتأمين (Cigna وAllianz وAXA وBupa)، وتنسيق الإقامة، ودعم المرضى بالذكاء الاصطناعي على مدار الساعة عبر Navi، موجّهتنا الطبية.',
    },
  ],
  ru: [
    {
      area: 'Координация международных пациентов',
      detail: 'Координировала комплексные лечебные поездки для пациентов из стран Ближнего Востока, Юго-Восточной Азии, Европы, Северной Америки и других регионов — от первичной консультации до выписки и послеоперационного наблюдения.',
    },
    {
      area: 'Сопровождение в больницах и медицинский перевод',
      detail: 'Обеспечивала устный медицинский перевод на английский, японский и китайский языки для международных пациентов в шанхайских больницах высшей категории 3A (三甲). Дополнительные языки — через проверенных профессиональных переводчиков.',
    },
    {
      area: 'Операционное управление в премиальной медицине',
      detail: 'Более 10 лет операционного управления в ведущих частных медицинских учреждениях Шанхая — проектирование маршрутов лечения, оптимизация пациентского опыта и координация межотделенческих медицинских программ.',
    },
    {
      area: 'Операции медицинского туризма',
      detail: 'Выстроила операционные процессы: консультации по визам, прямое страховое урегулирование (Cigna, Allianz, AXA, Bupa), организация проживания и круглосуточная ИИ-поддержка пациентов через нашего медицинского навигатора Navi.',
    },
  ],
}

const text = {
  ar: {
    role: 'المؤسِّسة وكبيرة موظفي المرافقة الطبية',
    intro:
      'ممرضة مسجلة حاصلة على شهادة ISPN، وممرضة مسجلة كبيرة، ومؤسِّسة ShanghaiMed. تتمتع بأكثر من عقد من الخبرة العملية في إدارة عمليات الرعاية الصحية الراقية وإرشاد المرضى الدوليين عبر منظومة شنغهاي الصحية — من الاستشارات الروتينية إلى تنسيق الجراحات المعقدة.',
    whyTitle: 'لماذا أسستُ ShanghaiMed',
    whyP1:
      'أمضيت أكثر من عشر سنوات أعمل داخل منظومة الرعاية الصحية الراقية في شنغهاي — أنسّق رعاية المرضى الدوليين، وأجتاز البيروقراطية المستشفية نيابةً عنهم، وأشاهد المشكلات نفسها القابلة للتفادي تتكرر: مرضى يصلون بلا سجلات مترجمة، أو يُوجَّهون إلى القسم الخطأ، أو يدفعون أكثر من اللازم مقابل خدمات لا يحتاجونها، أو يغادرون دون فهم تعليمات خروجهم.',
    whyP2:
      'كانت المستشفيات ممتازة. لم تكن الفجوة في الجودة الطبية إطلاقًا — بل كانت في غياب شخص يفهم الجانب السريري وجانب المريض معًا، ويستطيع ربطهما بلغة المريض نفسها.',
    whyP3:
      'وُجدت ShanghaiMed لسد هذه الفجوة. نفرض رسوم خدمة شفافة، ولا نأخذ أي عمولة من المستشفيات، ونتعامل مع كل مريض كما كنتُ سأعامل فردًا من عائلتي يجتاز منظومة غير مألوفة في بلد أجنبي.',
    credentialsTitle: 'المؤهلات المهنية',
    verifiedTitle: 'شهادات موثَّقة',
    nurseCertName: 'شهادة مزاولة مهنة التمريض',
    ispnCertName: 'شهادة إنجاز ISPN',
    certFootnote: 'انقر لعرض الشهادات الموثَّقة. حُجبت المعلومات الحساسة حمايةً للخصوصية.',
    experienceTitle: 'مجالات الخبرة',
    companyTitle: 'عن الشركة',
    companyP1:
      'تُدير ShanghaiMed شركةُ Shanghai Keling Information Technology Co., Ltd. المسجلة في شنغهاي بالصين.',
    companyP2:
      'نحن جهة تيسير سياحة طبية متكاملة الخدمات — ولسنا وسطاء. نفرض على المرضى رسوم خدمة مرافقة شفافة ولا نأخذ أي عمولة من المستشفيات. وتُدفع الفواتير الطبية مباشرة إلى المستشفى بالأسعار المعلنة لديها.',
    registeredName: 'الاسم المسجل',
    registeredAddress: 'العنوان المسجل',
    legalRepresentative: 'الممثل القانوني',
    languages: 'اللغات',
    ctaTitle: 'لديك سؤال؟',
    ctaBody: 'أقرأ كل رسالة شخصيًا. لا فريق مبيعات ولا نصوص جاهزة.',
    ctaButton: 'تواصل معنا',
  },
  en: {
    role: 'Founder & Chief Concierge',
    intro:
      "ISPN-certified registered nurse, senior registered nurse and founder of ShanghaiMed. Over a decade of hands-on experience in premium healthcare operations and guiding international patients through Shanghai's healthcare system — from routine consultations to complex surgical coordination.",
    whyTitle: 'Why I Founded ShanghaiMed',
    whyP1:
      "I spent over ten years working inside Shanghai's premium healthcare system — coordinating care for international patients, navigating hospital bureaucracy on their behalf, and watching the same preventable problems repeat: patients arriving without translated records, being routed to the wrong department, overpaying for services they didn't need, or leaving without understanding their own discharge instructions.",
    whyP2:
      "The hospitals were excellent. The gap was never medical quality — it was the absence of someone who understood both the clinical side and the patient's side, and who could bridge them in the patient's own language.",
    whyP3:
      "ShanghaiMed exists to close that gap. We charge a transparent service fee, take zero commission from hospitals, and treat every patient the way I would treat a family member navigating an unfamiliar system in a foreign country.",
    credentialsTitle: 'Professional Credentials',
    verifiedTitle: 'Verified Credentials',
    nurseCertName: 'Nurse Practicing Certificate',
    ispnCertName: 'ISPN Certificate of Achievement',
    certFootnote: 'Click to view verified credentials. Sensitive information redacted for privacy.',
    experienceTitle: 'Areas of Experience',
    companyTitle: 'About the Company',
    companyP1:
      'ShanghaiMed is operated by Shanghai Keling Information Technology Co., Ltd., a company registered in Shanghai, China.',
    companyP2:
      "We are a full-service medical tourism facilitator — not a broker. We charge patients a transparent concierge service fee and take zero commission from hospitals. Medical bills are paid directly to the hospital at the hospital's own published rates.",
    registeredName: 'Registered Name',
    registeredAddress: 'Registered Address',
    legalRepresentative: 'Legal Representative',
    languages: 'Languages',
    ctaTitle: 'Have a question?',
    ctaBody: 'I read every message personally. No sales team, no scripts.',
    ctaButton: 'Get in Touch',
  },
  ja: {
    role: '創業者・チーフコンシェルジュ',
    intro:
      'ISPN認定看護師、ShanghaiMed創業者。10年以上にわたり、ハイエンド医療機関の運営と、国際患者の上海での受診サポートに実務で携わってきました。日常的な診察から複雑な手術調整まで対応します。',
    whyTitle: 'ShanghaiMedを創業した理由',
    whyP1:
      '私は10年以上、上海のハイエンド医療の現場で働いてきました。国際患者の受診を調整し、病院の手続きを代行する中で、同じ「防げたはずの問題」が繰り返されるのを目の当たりにしてきました。翻訳された診療記録を持たずに来院する患者、誤った科に回される患者、不要なサービスに過剰な費用を払う患者、退院時の指示を理解できないまま帰宅する患者——。',
    whyP2:
      '病院は優れていました。問題は医療の質では決してなく、医療側と患者側の双方を理解し、患者自身の言葉でその橋渡しをできる人がいなかったことです。',
    whyP3:
      'ShanghaiMedはその溝を埋めるために存在します。透明性のあるサービス料をいただき、病院からのコミッションは一切受け取りません。見慣れない異国の医療制度を利用するすべての患者を、家族をサポートするように対応します。',
    credentialsTitle: '保有資格',
    verifiedTitle: '資格証明（確認済み）',
    nurseCertName: '看護師執業証書',
    ispnCertName: 'ISPN資格認定証',
    certFootnote: 'クリックすると資格証明をご確認いただけます。個人情報はプライバシー保護のため黒塗り処理しています。',
    experienceTitle: '経験分野',
    companyTitle: '会社情報',
    companyP1:
      'ShanghaiMedは、中国上海で登記されたShanghai Keling Information Technology Co., Ltd.により運営されています。',
    companyP2:
      '私たちは総合的な医療観光ファシリテーターであり、ブローカーではありません。患者様からは透明なコンシェルジュサービス料をいただき、病院からのコミッションは一切受け取りません。医療費は、病院が公表する料金で直接病院にお支払いいただきます。',
    registeredName: '登記名',
    registeredAddress: '登録住所',
    legalRepresentative: '法定代表人',
    languages: '対応言語',
    ctaTitle: 'ご質問がありますか？',
    ctaBody: 'すべてのメッセージに私自身が目を通しています。営業チームも台本もありません。',
    ctaButton: 'お問い合わせ',
  },
  ru: {
    role: 'Основатель и главный консьерж',
    intro:
      'Дипломированная медсестра с международной сертификацией ISPN, медсестра высшей категории и основатель ShanghaiMed. Более десяти лет практического опыта в операционном управлении премиальной медициной и сопровождении международных пациентов в системе здравоохранения Шанхая — от плановых консультаций до координации сложных хирургических операций.',
    whyTitle: 'Почему я основала ShanghaiMed',
    whyP1:
      'Более десяти лет я работала внутри шанхайской системы премиальной медицины — координировала лечение международных пациентов, проходила вместо них больничную бюрократию и видела одни и те же предотвратимые проблемы: пациенты приезжают без переведённых медицинских записей, попадают не в то отделение, переплачивают за ненужные услуги или уезжают, не понимая собственных инструкций по выписке.',
    whyP2:
      'Больницы были превосходны. Проблема никогда не заключалась в качестве медицины — она была в отсутствии человека, который понимает и клиническую сторону, и сторону пациента и способен соединить их на родном языке пациента.',
    whyP3:
      'ShanghaiMed существует, чтобы закрыть этот разрыв. Мы берём прозрачную сервисную плату, не получаем комиссий от больниц и относимся к каждому пациенту так, как я относилась бы к члену семьи, попадающему в незнакомую систему в чужой стране.',
    credentialsTitle: 'Профессиональные квалификации',
    verifiedTitle: 'Подтверждённые сертификаты',
    nurseCertName: 'Сертификат права осуществления медсестринской практики',
    ispnCertName: 'Сертификат об успешном прохождении ISPN',
    certFootnote: 'Нажмите, чтобы просмотреть подтверждённые квалификации. Конфиденциальная информация скрыта для защиты персональных данных.',
    experienceTitle: 'Сфера опыта',
    companyTitle: 'О компании',
    companyP1:
      'ShanghaiMed управляется компанией Shanghai Keling Information Technology Co., Ltd., зарегистрированной в Шанхае, Китай.',
    companyP2:
      'Мы — полноценный фасилитатор медицинского туризма, а не брокер. Мы берём с пациентов прозрачную плату за консьерж-услуги и не получаем никаких комиссий от больниц. Медицинские счета оплачиваются напрямую больнице по её собственным опубликованным тарифам.',
    registeredName: 'Зарегистрированное наименование',
    registeredAddress: 'Юридический адрес',
    legalRepresentative: 'Законный представитель',
    languages: 'Языки',
    ctaTitle: 'Есть вопрос?',
    ctaBody: 'Я лично читаю каждое сообщение. Никаких отделов продаж и готовых скриптов.',
    ctaButton: 'Связаться с нами',
  },
}

export default function FounderContent() {
  const { language } = useLanguage()
  // ja/ar/ru fully translated; mn falls back to English (YMYL)
  const lang = language === 'ja' ? 'ja' : language === 'ar' ? 'ar' : language === 'ru' ? 'ru' : 'en'
  const t = text[lang]
  const credentials = credentialsData[lang]
  const experience = experienceData[lang]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/images/sara-ma-headshot.jpg"
                alt="Sara Ma — Founder of ShanghaiMed"
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-teal-100 shadow-md"
                priority
              />
            </div>
            <div>
              <p className="text-sm text-teal-600 font-medium mb-2">{t.role}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sara Ma</h1>
              <p className="text-lg text-gray-500">Ma Lingling</p>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl">{t.intro}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Why I founded ShanghaiMed */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.whyTitle}</h2>
          <div className="prose prose-gray max-w-none">
            <p>{t.whyP1}</p>
            <p>{t.whyP2}</p>
            <p>{t.whyP3}</p>
          </div>
        </section>

        {/* Professional Credentials */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.credentialsTitle}</h2>
          <div className="space-y-4">
            {credentials.map((cred) => (
              <div key={cred.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                    {cred.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{cred.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{cred.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Images */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.verifiedTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/images/certificate-nurse-redacted.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.nurseCertName}</p>
                  <p className="text-xs text-gray-500">
                    {language === 'ja' ? '上海市衛生健康委員会' : language === 'ar' ? 'لجنة شنغهاي البلدية للصحة' : language === 'ru' ? 'Шанхайская муниципальная комиссия по здравоохранению' : 'Shanghai Municipal Health Commission'}
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a
                href="/images/certificate-ispn-redacted.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-lg hover:border-teal-300 hover:bg-teal-50/30 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.ispnCertName}</p>
                  <p className="text-xs text-gray-500">CGFNS International (2017)</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">{t.certFootnote}</p>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.experienceTitle}</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.area}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{exp.area}</h3>
                <p className="text-sm text-gray-600">{exp.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company */}
        <section className="bg-white rounded-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.companyTitle}</h2>
          <div className="prose prose-gray max-w-none">
            <p>{t.companyP1}</p>
            <p>{t.companyP2}</p>
          </div>
          <div className="mt-6 pt-6 border-t grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <dt className="font-medium text-gray-900">{t.registeredName}</dt>
              <dd>Shanghai Keling Information Technology Co., Ltd.</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.registeredAddress}</dt>
              <dd>{language === 'ja' ? '長陽路2555号1階101室' : language === 'ar' ? 'الغرفة 101، الطابق الأول، رقم 2555 طريق تشانغيانغ' : language === 'ru' ? 'Комната 101, 1-й этаж, д. 2555, дорога Чанъян' : 'Room 101, Floor 1, No. 2555 Changyang Road'}</dd>
              <dd>{language === 'ja' ? '中国上海市楊浦区' : language === 'ar' ? 'منطقة يانغبو، شنغهاي، الصين' : language === 'ru' ? 'район Янпу, Шанхай, Китай' : 'Yangpu District, Shanghai, China'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.legalRepresentative}</dt>
              <dd>Ma Lingling</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">{t.languages}</dt>
              <dd>{language === 'ja' ? '英語・中国語・日本語' : language === 'ar' ? 'الإنجليزية، الصينية، اليابانية' : language === 'ru' ? 'английский, китайский, японский' : 'English, 中文, 日本語'}</dd>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-teal-50 rounded-lg border border-teal-200 p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.ctaTitle}</h2>
          <p className="text-gray-600 mb-4">{t.ctaBody}</p>
          <a
            href="mailto:hello@shanghaimedhealth.com"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            {t.ctaButton}
          </a>
        </section>
      </div>
    </div>
  )
}
