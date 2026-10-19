'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface FaqItem {
  q: string
  a: React.ReactNode
}

/* ==================== English Version ==================== */

const enFaqs: FaqItem[] = [
  {
    q: 'How much does medical treatment cost in Shanghai compared to the US?',
    a: (
      <>
        <p className="mb-4">
          Medical procedures in Shanghai cost <strong>50-80% less</strong> than in the US. Here are specific examples:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Procedure</th>
                <th className="border border-gray-300 px-4 py-2 text-left">US Cost</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Shanghai Cost</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Savings</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Knee replacement', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Cardiac bypass', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['MRI scan (3T)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Dental implant (per tooth)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['IVF cycle', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Cataract surgery', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Comprehensive health checkup', '$2,000-$5,000', '$300-$600', '88%'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          ShanghaiMed's companion service packages are <strong>$1,000 for 3 days</strong> (Essential Care) or{' '}
          <strong>$1,650 for 5 days</strong> (Complex Care), which cover hospital coordination, bilingual escort,
          translation, and logistics. Hospital treatment costs are billed separately at local rates.
        </p>
      </>
    ),
  },
  {
    q: 'Is medical tourism in Shanghai safe for international patients?',
    a: (
      <>
        <p className="mb-4"><strong>Yes.</strong> Shanghai's top hospitals meet international safety standards:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Fudan University) — Grade 3A (China&apos;s highest hospital rating), 24 international insurance partners</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — Grade 3A, national leader in hematology and CAR-T cell therapy, National EMR Level 7</li>
          <li><strong>Zhongshan Hospital</strong> (Fudan University) — Grade 3A, independent international patient building</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (SJTU) — Grade 3A, national center for dental, oral, and plastic surgery</li>
          <li><strong>Longhua Hospital</strong> (Shanghai University of TCM) — Grade 3A, official TCM medical tourism pilot hospital</li>
        </ul>
        <p>
          These hospitals use the <strong>same medical equipment</strong> (Siemens, GE Healthcare, Philips) and{' '}
          <strong>same implant brands</strong> (Stryker, Zimmer, Straumann) found in US hospitals. Many senior physicians
          have trained at Johns Hopkins, Mayo Clinic, and Cleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'Which hospitals in Shanghai does ShanghaiMed work with?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed partners with <strong>14 public Grade-A medical tourism pilot hospitals</strong> and{' '}
          <strong>5 private international hospitals</strong> — a total of 19 institutions covering every medical specialty:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Hospital</th>
                <th className="border border-gray-300 px-4 py-2 text-left">University</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Key Specialty</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Neurosurgery #1, Dermatology #1'],
                ["Children's Hospital", 'Fudan University', 'Neonatology, Pediatric Surgery'],
                ['Ruijin Hospital', 'SJTU', 'Hematology (CAR-T), Endocrinology'],
                ['Shanghai General Hospital', '—', 'Ophthalmology, ENT, Urology'],
                ['Zhongshan Hospital', 'Fudan University', 'Cardiovascular, General Surgery'],
                ['Renji Hospital', 'SJTU', 'Gastroenterology #1, Reproductive Medicine'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Traditional Chinese Medicine'],
                ['IPMCH', 'China Welfare Institute', 'Reproductive Medicine, Obstetrics'],
                ["Shanghai Children's Medical Center", 'SJTU', 'Pediatric Cardiac Surgery'],
                ["Sixth People's Hospital", '—', 'Orthopedics (limb replantation since 1963)'],
                ['First Maternity & Infant Hospital', '—', 'Obstetrics, Fetal Medicine'],
                ['Xinhua Hospital', 'SJTU', 'Pediatrics, Dermatology'],
                ['Huadong Hospital', 'Fudan University', 'Geriatric Medicine, Health Screening'],
                ["Ninth People's Hospital", 'SJTU', 'Dental #1, Plastic Surgery #1'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Plus 5 private international hospitals: Jiahui International (Mass General affiliation), United Family,
          ParkwayHealth, SinoUnited Health (Mayo Clinic collaboration and second opinion services), and Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Do doctors in Shanghai speak English?',
    a: (
      <>
        <p className="mb-4">
          Many senior doctors at Shanghai's top hospitals have <strong>international training and speak English</strong>.
          Physicians regularly publish in English-language medical journals and attend international conferences.
        </p>
        <p className="mb-4">
          To guarantee zero communication gaps, ShanghaiMed provides <strong>professional bilingual medical companions</strong> (English-Chinese) who:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Accompany you to every appointment</li>
          <li>Translate medical terminology accurately</li>
          <li>Help with hospital paperwork and navigation</li>
          <li>Ensure you fully understand your diagnosis, treatment plan, and medication</li>
        </ul>
        <p>All medical documents, treatment plans, and prescriptions are <strong>translated into English</strong> for your records.</p>
      </>
    ),
  },
  {
    q: 'How do I get a medical visa for China?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed assists with the <strong>complete visa process</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Initial consultation</strong> (free, remote via video call)</li>
          <li><strong>Medical invitation letter</strong> — issued by the partner hospital after consultation</li>
          <li><strong>Visa application</strong> — you submit the invitation letter to the Chinese embassy/consulate</li>
          <li><strong>Processing time</strong> — typically 2-4 weeks</li>
          <li><strong>Document support</strong> — ShanghaiMed provides translation of all required documents</li>
        </ol>
        <p>
          China offers a <strong>240-hour transit visa exemption</strong> for citizens of 54 countries (including the US, UK,
          Canada, Australia, and most EU nations), which may be sufficient for shorter medical trips.
        </p>
      </>
    ),
  },
  {
    q: 'What is included in the ShanghaiMed service package?',
    a: (
      <>
        <p className="mb-2"><strong>Essential Care Package — $1,000 / 3 days</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Hospital appointment scheduling (1 hospital)</li>
          <li>Bilingual medical escort (English-Chinese)</li>
          <li>Medical translation at all appointments</li>
          <li>Local transportation to/from hospital</li>
          <li>AI-powered pre-consultation and cost estimation</li>
        </ul>
        <p className="mb-2"><strong>Complex Care Package — $1,650 / 5 days</strong></p>
        <p className="mb-1">Everything in Essential Care, plus:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Multi-hospital coordination (2+ hospitals)</li>
          <li>Specialist appointment booking</li>
          <li>Post-treatment follow-up (30 days, remote video check-ups)</li>
          <li>Visa assistance and airport pickup</li>
        </ul>
        <p>
          <strong>What's NOT included</strong> (billed separately by hospital at local rates): Hospital treatment costs
          (surgery, medication, lab tests), accommodation, and international flights.
        </p>
      </>
    ),
  },
  {
    q: 'Can I combine medical treatment with tourism in Shanghai?',
    a: (
      <>
        <p className="mb-4">
          <strong>Absolutely — this is ShanghaiMed's core philosophy.</strong> Shanghai is China's most international city with:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>The Bund</strong> — iconic waterfront promenade</li>
          <li><strong>Yu Garden</strong> — 400-year-old classical Chinese garden</li>
          <li><strong>Shanghai Tower</strong> — 2nd tallest building in the world (632m)</li>
          <li><strong>Shanghai Disneyland</strong> — Disney's largest castle globally</li>
          <li><strong>French Concession</strong> — tree-lined streets with cafes and boutiques</li>
        </ul>
        <p>
          Many patients schedule a <strong>medical appointment on Day 1-2</strong>, then spend the remaining days exploring
          the city. ShanghaiMed helps you integrate medical appointments into your travel itinerary so you don't waste
          vacation time.
        </p>
      </>
    ),
  },
  {
    q: 'What medical procedures are most popular for medical tourists in Shanghai?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Procedures</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Savings</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Top Hospital</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Orthopedic surgery', 'Knee/hip replacement, spine surgery', '80%', "Sixth People's / Huashan"],
                ['Plastic surgery', 'Rhinoplasty, facial reconstruction', '70-80%', "Ninth People's Hospital"],
                ['Dental treatment', 'Implants, crowns, orthodontics', '70-80%', "Ninth People's Hospital"],
                ['TCM', 'Acupuncture, herbal therapy, Tuina', '75-80%', 'Longhua Hospital'],
                ['Cancer treatment', 'Chemotherapy, CAR-T, immunotherapy', '60-80%', 'Ruijin / Huashan'],
                ['Cardiac surgery', 'Bypass, valve replacement', '80%', 'Zhongshan Hospital'],
                ['Fertility treatment', 'IVF, ICSI', '75%', 'Renji / IPMCH'],
                ['Health screening', 'Full-day executive checkup', '88%', 'Huadong Hospital'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: 'Can I use my international health insurance?',
    a: (
      <>
        <p className="mb-4">
          Yes. ShanghaiMed partner hospitals have <strong>direct settlement agreements</strong> with major international
          insurers. Coverage ranges from 8 to 24 insurers per hospital:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 insurance partners</li>
          <li>Shanghai Children's Medical Center — 23 insurance partners</li>
          <li>Ruijin Hospital — 21 insurance partners</li>
          <li>Renji Hospital — 20 insurance partners</li>
        </ul>
        <p>
          Accepted insurers include <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS,</strong> and more.
          ShanghaiMed assists with insurance verification and direct settlement before your trip.
        </p>
      </>
    ),
  },
  {
    q: 'What happens after my medical treatment in Shanghai?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed provides <strong>comprehensive post-treatment follow-up</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Remote video check-ups</strong> with your treating doctor (Complex Care)</li>
          <li><strong>Translated medical records</strong> — full discharge summary, test results, and medication list in English</li>
          <li><strong>Medication guidance</strong> — dosage instructions, side effects, and interaction warnings</li>
          <li><strong>Recovery planning</strong> — personalized timeline and activity recommendations</li>
          <li><strong>Home-country coordination</strong> — we share your medical records with your primary care physician (with consent)</li>
          <li><strong>Ongoing support</strong> — our team remains available for questions after you return home</li>
        </ul>
        <p>For Complex Care patients, follow-up continues for <strong>30 days</strong> after treatment.</p>
      </>
    ),
  },
]

/* ==================== Japanese Version ==================== */

const jaFaqs: FaqItem[] = [
  {
    q: '上海での医療費はアメリカと比べてどのくらい安いですか？',
    a: (
      <>
        <p className="mb-4">
          上海での医療処置費はアメリカに比べて<strong>50～80%安く</strong>なります。具体的な例は以下の通りです：
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">治療内容</th>
                <th className="border border-gray-300 px-4 py-2 text-left">米国の費用</th>
                <th className="border border-gray-300 px-4 py-2 text-left">上海の費用</th>
                <th className="border border-gray-300 px-4 py-2 text-left">節約率</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['膝関節置換術', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['心臓バイパス手術', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['MRI検査（3T）', '$1,200-$3,000', '$200-$400', '90%'],
                ['インプラント（1本あたり）', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['体外受精（1周期）', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['白内障手術', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['総合健康診断', '$2,000-$5,000', '$300-$600', '88%'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          ShanghaiMedの付き添いサービスパッケージは<strong>3日間$1,000</strong>（エッセンシャルケア）または{' '}
          <strong>5日間$1,650</strong>（コンプレックスケア）で、病院手配、バイリンガル付き添い、翻訳、移動サポートが含まれます。
          病院での治療費は別途、現地価格で請求されます。
        </p>
      </>
    ),
  },
  {
    q: '上海への医療ツーリズムは国際患者にとって安全ですか？',
    a: (
      <>
        <p className="mb-4"><strong>はい。</strong>上海の一流病院は国際的な安全基準を満たしています：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong>（復旦大学）— 三級甲等（中国最高の病院評価）、24の国際保険会社と提携</li>
          <li><strong>Ruijin Hospital</strong>（上海交通大学）— 三級甲等、血液内科・CAR-T細胞療法の全国的リーダー、電子カルテレベル7</li>
          <li><strong>Zhongshan Hospital</strong>（復旦大学）— 三級甲等、独立した国際患者専用棟を完備</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong>（上海交通大学）— 三級甲等、歯科・口腔外科・形成外科の国家センター</li>
          <li><strong>Longhua Hospital</strong>（上海中医薬大学）— 三級甲等、中医薬医療ツーリズム公式パイロット病院</li>
        </ul>
        <p>
          これらの病院は米国の病院と<strong>同じ医療機器</strong>（Siemens、GE Healthcare、Philips）や{' '}
          <strong>同じインプラントブランド</strong>（Stryker、Zimmer、Straumann）を使用しています。上級医師の多くは
          Johns Hopkins、Mayo Clinic、Cleveland Clinicで研修を積んでいます。
        </p>
      </>
    ),
  },
  {
    q: 'ShanghaiMedは上海のどの病院と提携していますか？',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMedは<strong>医療ツーリズム指定の公立三級甲等病院14院</strong>および{' '}
          <strong>民営国際病院5院</strong>と提携しており、計19の医療機関がすべての診療科をカバーしています：
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">病院</th>
                <th className="border border-gray-300 px-4 py-2 text-left">大学</th>
                <th className="border border-gray-300 px-4 py-2 text-left">主な専門分野</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', '復旦大学', '脳神経外科 第1位、皮膚科 第1位'],
                ["Children's Hospital", '復旦大学', '新生児科、小児外科'],
                ['Ruijin Hospital', '上海交通大学', '血液内科（CAR-T）、内分泌内科'],
                ['Shanghai General Hospital', '—', '眼科、耳鼻咽喉科、泌尿器科'],
                ['Zhongshan Hospital', '復旦大学', '循環器内科、一般外科'],
                ['Renji Hospital', '上海交通大学', '消化器内科 第1位、生殖医学'],
                ['Longhua Hospital', '上海中医薬大学', '伝統中国医学'],
                ['IPMCH（国際和平妇幼保健院）', '中国福利会', '生殖医学、産科'],
                ["Shanghai Children's Medical Center", '上海交通大学', '小児心臓外科'],
                ['第六人民医院', '—', '整形外科（1963年より断肢再植）'],
                ['第一産婦人科病院', '—', '産科、胎児医学'],
                ['Xinhua Hospital', '上海交通大学', '小児科、皮膚科'],
                ['Huadong Hospital', '復旦大学', '老年医学、健康診断'],
                ['第九人民医院', '上海交通大学', '歯科 第1位、形成外科 第1位'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          さらに民営国際病院5院：Jiahui International（Mass General提携）、United Family、ParkwayHealth、
          SinoUnited Health（Mayo Clinicネットワーク）、Raffles Hospitalとも提携しています。
        </p>
      </>
    ),
  },
  {
    q: '上海の医師は英語を話せますか？',
    a: (
      <>
        <p className="mb-4">
          上海の一流病院の上級医師の多くは<strong>海外研修の経験があり、英語を話すことができます</strong>。
          医師たちは英語の医学誌に定期的に論文を発表し、国際学会にも参加しています。
        </p>
        <p className="mb-4">
          コミュニケーションの齟齬を完全になくすため、ShanghaiMedは<strong>英語・中国語バイリンガルの専門メディカルコンパニオン</strong>を派遣し、以下をサポートします：
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>すべての診察への付き添い</li>
          <li>医療用語の正確な通訳</li>
          <li>病院の書類手続きと案内のサポート</li>
          <li>診断内容、治療計画、薬についての完全な理解の確保</li>
        </ul>
        <p>すべての医療文書、治療計画、処方箋は<strong>英語に翻訳</strong>してお渡しします。</p>
      </>
    ),
  },
  {
    q: '中国の医療ビザはどのように取得しますか？',
    a: (
      <>
        <p className="mb-4">ShanghaiMedは<strong>ビザ取得の全プロセス</strong>をサポートします：</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>初回相談</strong>（無料、ビデオ通話によるオンライン対応）</li>
          <li><strong>医療招待状</strong>— 相談後、提携病院が発行</li>
          <li><strong>ビザ申請</strong>— 招待状を中国大使館・領事館に提出</li>
          <li><strong>処理期間</strong>— 通常2～4週間</li>
          <li><strong>書類サポート</strong>— ShanghaiMedが必要書類の翻訳を提供</li>
        </ol>
        <p>
          中国は54か国（米国、英国、カナダ、オーストラリア、EU主要国を含む）の国民に{' '}
          <strong>240時間（10日間）の通過ビザ免除</strong>を提供しており、短期の医療渡航には十分な場合もあります。
        </p>
      </>
    ),
  },
  {
    q: 'ShanghaiMedのサービスパッケージには何が含まれていますか？',
    a: (
      <>
        <p className="mb-2"><strong>エッセンシャルケアパッケージ — $1,000 / 3日間</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>病院の予約手配（1病院）</li>
          <li>英語・中国語バイリンガルのメディカル付き添い</li>
          <li>全診察での医療通訳</li>
          <li>病院までの送迎</li>
          <li>AIによる事前相談と費用見積もり</li>
        </ul>
        <p className="mb-2"><strong>コンプレックスケアパッケージ — $1,650 / 5日間</strong></p>
        <p className="mb-1">エッセンシャルケアの内容に加えて：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>複数病院の手配（2病院以上）</li>
          <li>専門医の予約</li>
          <li>治療後のフォローアップ（30日間、リモートビデオ診察）</li>
          <li>ビザサポートと空港送迎</li>
        </ul>
        <p>
          <strong>含まれないもの</strong>（病院が現地価格で別途請求）：病院での治療費（手術、薬剤、検査）、
          宿泊費、国際航空券。
        </p>
      </>
    ),
  },
  {
    q: '上海で治療と観光を組み合わせることはできますか？',
    a: (
      <>
        <p className="mb-4">
          <strong>もちろんです。これはShanghaiMedのコア理念です。</strong>上海は中国で最も国際的な都市です：
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>外灘（ザ・バンド）</strong>— 上海を象徴するウォーターフロント</li>
          <li><strong>豫園</strong>— 400年の歴史を持つ中国古典庭園</li>
          <li><strong>上海タワー</strong>— 世界第2位の高さ（632m）</li>
          <li><strong>上海ディズニーランド</strong>— 世界最大のディズニー城</li>
          <li><strong>旧フランス租界</strong>— 並木道とカフェ、ブティックが並ぶ街並み</li>
        </ul>
        <p>
          多くの患者は<strong>1～2日目に医療予約</strong>を入れ、残りの日数で街を観光されています。
          ShanghaiMedは医療予約を旅程に組み込むお手伝いをし、休暇の時間を無駄にしません。
        </p>
      </>
    ),
  },
  {
    q: '上海で医療ツーリズム患者に最も人気のある治療は何ですか？',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">カテゴリー</th>
                <th className="border border-gray-300 px-4 py-2 text-left">主な治療</th>
                <th className="border border-gray-300 px-4 py-2 text-left">節約率</th>
                <th className="border border-gray-300 px-4 py-2 text-left">代表的な病院</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['整形外科手術', '膝・股関節置換、脊椎手術', '80%', '第六人民医院 / Huashan'],
                ['形成外科', '鼻形成術、顔面再建', '70-80%', '第九人民医院'],
                ['歯科治療', 'インプラント、クラウン、矯正', '70-80%', '第九人民医院'],
                ['伝統中国医学（TCM）', '鍼灸、漢方療法、推拿', '75-80%', 'Longhua Hospital'],
                ['がん治療', '化学療法、CAR-T、免疫療法', '60-80%', 'Ruijin / Huashan'],
                ['心臓外科', 'バイパス、弁置換', '80%', 'Zhongshan Hospital'],
                ['不妊治療', '体外受精、顕微授精', '75%', 'Renji / IPMCH'],
                ['健康診断', '終日のエグゼクティブ健診', '88%', 'Huadong Hospital'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: '国際医療保険は利用できますか？',
    a: (
      <>
        <p className="mb-4">
          はい。ShanghaiMed提携病院は主要な国際保険会社と<strong>直結精算（ダイレクト・セットルメント）契約</strong>を締結しています。
          病院ごとに8～24社の保険に対応しています：
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24の保険提携</li>
          <li>Shanghai Children's Medical Center — 23の保険提携</li>
          <li>Ruijin Hospital — 21の保険提携</li>
          <li>Renji Hospital — 20の保険提携</li>
        </ul>
        <p>
          対応保険会社は<strong>MSH、Bupa、Cigna、Aetna、AXA、Allianz、AIA、International SOS</strong>など。
          ShanghaiMedは渡航前の保険確認と直結精算のお手伝いをします。
        </p>
      </>
    ),
  },
  {
    q: '上海での治療後はどのようなサポートがありますか？',
    a: (
      <>
        <p className="mb-4">ShanghaiMedは<strong>充実した治療後フォローアップ</strong>を提供します：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>リモートビデオ診察</strong>— 担当医とのフォローアップ（コンプレックスケア）</li>
          <li><strong>翻訳済み医療記録</strong>— 退院時サマリー、検査結果、服薬リストの英語版</li>
          <li><strong>服薬指導</strong>— 用法・用量、副作用、併用注意薬の情報</li>
          <li><strong>回復計画</strong>— 個別の回復スケジュールと活動の推奨</li>
          <li><strong>帰国後の連携</strong>—（同意のもと）主治医に医療記録を共有</li>
          <li><strong>継続サポート</strong>— 帰国後も質問に対応するチーム体制</li>
        </ul>
        <p>コンプレックスケアの患者様には、治療後<strong>30日間</strong>フォローアップが継続されます。</p>
      </>
    ),
  },
]

/* ==================== Russian Version ==================== */

const ruFaqs: FaqItem[] = [
  {
    q: 'Сколько стоит лечение в Шанхае по сравнению с США?',
    a: (
      <>
        <p className="mb-4">
          Медицинские процедуры в Шанхае стоят на <strong>50–80% дешевле</strong>, чем в США. Конкретные примеры:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Процедура</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Стоимость в США</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Стоимость в Шанхае</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Экономия</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Замена коленного сустава', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Аортокоронарное шунтирование', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['МРТ (3 Тл)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Дентальный имплантат (на один зуб)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['Цикл ЭКО (IVF)', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Операция по удалению катаракты', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Комплексный чек-ап', '$2,000-$5,000', '$300-$600', '88%'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Пакеты консьерж-сопровождения ShanghaiMed стоят <strong>$1,000 за 3 дня</strong> (Essential Care) или{' '}
          <strong>$1,650 за 5 дней</strong> (Complex Care), они включают координацию с больницей, двуязычное сопровождение,
          перевод и логистику. Стоимость лечения в больнице оплачивается отдельно по местным тарифам.
        </p>
      </>
    ),
  },
  {
    q: 'Безопасно ли медицинское путешествие в Шанхай для иностранных пациентов?',
    a: (
      <>
        <p className="mb-4"><strong>Да.</strong> Ведущие больницы Шанхая соответствуют международным стандартам безопасности:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Fudan University) — Grade 3A (высшая категория больниц Китая), 24 международных страховых партнёра</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — Grade 3A, национальный лидер в гематологии и CAR-T-клеточной терапии, National EMR Level 7</li>
          <li><strong>Zhongshan Hospital</strong> (Fudan University) — Grade 3A, отдельный международный пациентский корпус</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (SJTU) — Grade 3A, национальный центр стоматологии, челюстно-лицевой и пластической хирургии</li>
          <li><strong>Longhua Hospital</strong> (Shanghai University of TCM) — Grade 3A, официальная пилотная больница медицинского туризма ТКМ</li>
        </ul>
        <p>
          Эти больницы используют <strong>то же медицинское оборудование</strong> (Siemens, GE Healthcare, Philips) и{' '}
          <strong>те же бренды имплантатов</strong> (Stryker, Zimmer, Straumann), что и больницы США. Многие ведущие врачи
          стажировались в Johns Hopkins, Mayo Clinic и Cleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'С какими больницами Шанхая сотрудничает ShanghaiMed?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed сотрудничает с <strong>14 государственными больницами класса А — пилотами медицинского туризма</strong> и{' '}
          <strong>5 частными международными больницами</strong> — всего 19 учреждений, покрывающих все медицинские специальности:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Больница</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Университет</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ключевая специальность</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Нейрохирургия №1, дерматология №1'],
                ["Children's Hospital", 'Fudan University', 'Неонатология, детская хирургия'],
                ['Ruijin Hospital', 'SJTU', 'Гематология (CAR-T), эндокринология'],
                ['Shanghai General Hospital', '—', 'Офтальмология, ЛОР, урология'],
                ['Zhongshan Hospital', 'Fudan University', 'Кардиология, общая хирургия'],
                ['Renji Hospital', 'SJTU', 'Гастроэнтерология №1, репродуктивная медицина'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Традиционная китайская медицина'],
                ['IPMCH', 'China Welfare Institute', 'Репродуктивная медицина, акушерство'],
                ["Shanghai Children's Medical Center", 'SJTU', 'Детская кардиохирургия'],
                ["Sixth People's Hospital", '—', 'Ортопедия (реплантация конечностей с 1963 г.)'],
                ['First Maternity & Infant Hospital', '—', 'Акушерство, фетальная медицина'],
                ['Xinhua Hospital', 'SJTU', 'Педиатрия, дерматология'],
                ['Huadong Hospital', 'Fudan University', 'Гериатрия, медосмотры'],
                ["Ninth People's Hospital", 'SJTU', 'Стоматология №1, пластическая хирургия №1'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Плюс 5 частных международных больниц: Jiahui International (партнёрство с Mass General), United Family,
          ParkwayHealth, SinoUnited Health (сотрудничество с Mayo Clinic и услуги «второго мнения») и Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Говорят ли врачи в Шанхае по-английски?',
    a: (
      <>
        <p className="mb-4">
          Многие ведущие врачи топовых больниц Шанхая прошли <strong>международную стажировку и говорят по-английски</strong>.
          Врачи регулярно публикуются в англоязычных медицинских журналах и участвуют в международных конференциях.
        </p>
        <p className="mb-4">
          Чтобы полностью исключить языковой барьер, ShanghaiMed предоставляет <strong>профессиональных двуязычных медицинских сопровождающих</strong> (англо-китайских), которые:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Сопровождают вас на каждом приёме</li>
          <li>Точно переводят медицинскую терминологию</li>
          <li>Помогают с больничными документами и навигацией</li>
          <li>Гарантируют, что вы полностью понимаете диагноз, план лечения и назначения</li>
        </ul>
        <p>Все медицинские документы, планы лечения и рецепты <strong>переводятся на английский язык</strong> для вашего архива.</p>
      </>
    ),
  },
  {
    q: 'Как получить медицинскую визу в Китай?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed помогает с <strong>полным процессом оформления визы</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Первичная консультация</strong> (бесплатно, удалённо по видеосвязи)</li>
          <li><strong>Медицинское приглашение</strong> — оформляется партнёрской больницей после консультации</li>
          <li><strong>Подача на визу</strong> — вы предоставляете приглашение в посольство/консульство Китая</li>
          <li><strong>Срок рассмотрения</strong> — обычно 2–4 недели</li>
          <li><strong>Документальная поддержка</strong> — ShanghaiMed обеспечивает перевод всех необходимых документов</li>
        </ol>
        <p>
          Китай предоставляет <strong>240-часовой безвизовый транзит</strong> гражданам 54 стран (включая США, Великобританию,
          Канаду, Австралию и большинство стран ЕС), которого может быть достаточно для коротких медицинских поездок.
        </p>
      </>
    ),
  },
  {
    q: 'Что включено в пакет услуг ShanghaiMed?',
    a: (
      <>
        <p className="mb-2"><strong>Пакет Essential Care — $1,000 / 3 дня</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Запись на приём в больницу (1 больница)</li>
          <li>Двуязычное медицинское сопровождение (английский–китайский)</li>
          <li>Медицинский перевод на всех приёмах</li>
          <li>Местный трансфер в/из больницы</li>
          <li>AI-навигатор: предварительная консультация и оценка стоимости</li>
        </ul>
        <p className="mb-2"><strong>Пакет Complex Care — $1,650 / 5 дней</strong></p>
        <p className="mb-1">Всё, что включено в Essential Care, плюс:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Координация в нескольких больницах (2+ больниц)</li>
          <li>Запись к профильным специалистам</li>
          <li>Последующее наблюдение после лечения (30 дней, удалённые видеоприёмы)</li>
          <li>Визовая поддержка и встреча в аэропорту</li>
        </ul>
        <p>
          <strong>Что НЕ включено</strong> (оплачивается отдельно больнице по местным тарифам): стоимость лечения
          (операция, лекарства, лабораторные анализы), проживание и международные перелёты.
        </p>
      </>
    ),
  },
  {
    q: 'Можно ли совместить лечение с туризмом в Шанхае?',
    a: (
      <>
        <p className="mb-4">
          <strong>Безусловно — в этом и заключается основная философия ShanghaiMed.</strong> Шанхай — самый международный город Китая, где можно посетить:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Набережную Вайтань (The Bund)</strong> — знаковая прибрежная променада</li>
          <li><strong>Сад Юй (Yu Garden)</strong> — классический китайский сад возрастом 400 лет</li>
          <li><strong>Шанхайскую башню</strong> — второе по высоте здание в мире (632 м)</li>
          <li><strong>Shanghai Disneyland</strong> — самый большой замок Disney в мире</li>
          <li><strong>Французскую концессию</strong> — тенистые улицы с кафе и бутиками</li>
        </ul>
        <p>
          Многие пациенты планируют <strong>медицинский приём на 1–2-й день</strong>, а оставшиеся дни посвящают осмотру города.
          ShanghaiMed помогает встроить медицинские приёмы в ваш маршрут, чтобы вы не теряли время отпуска.
        </p>
      </>
    ),
  },
  {
    q: 'Какие медицинские процедуры наиболее популярны у медицинских туристов в Шанхае?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Категория</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Процедуры</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Экономия</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ведущая больница</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Ортопедическая хирургия', 'Замена коленного/тазобедренного сустава, хирургия позвоночника', '80%', "Sixth People's / Huashan"],
                ['Пластическая хирургия', 'Ринопластика, реконструкция лица', '70-80%', "Ninth People's Hospital"],
                ['Стоматология', 'Имплантаты, коронки, ортодонтия', '70-80%', "Ninth People's Hospital"],
                ['ТКМ', 'Иглоукалывание, фитотерапия, туйна', '75-80%', 'Longhua Hospital'],
                ['Лечение онкологических заболеваний', 'Химиотерапия, CAR-T, иммунотерапия', '60-80%', 'Ruijin / Huashan'],
                ['Кардиохирургия', 'Шунтирование, замена клапанов', '80%', 'Zhongshan Hospital'],
                ['Лечение бесплодия', 'ЭКО (IVF), ИКСИ (ICSI)', '75%', 'Renji / IPMCH'],
                ['Медицинский осмотр', 'Дневной executive-чек-ап', '88%', 'Huadong Hospital'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: 'Можно ли использовать международную медицинскую страховку?',
    a: (
      <>
        <p className="mb-4">
          Да. Партнёрские больницы ShanghaiMed имеют <strong>договоры прямого урегулирования счетов</strong> с крупнейшими международными
          страховыми компаниями. Каждая больница принимает от 8 до 24 страховщиков:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 страховых партнёра</li>
          <li>Shanghai Children's Medical Center — 23 страховых партнёра</li>
          <li>Ruijin Hospital — 21 страховой партнёр</li>
          <li>Renji Hospital — 20 страховых партнёров</li>
        </ul>
        <p>
          Принимаемые страховые компании включают <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS</strong> и других.
          ShanghaiMed помогает с проверкой страхового покрытия и прямым урегулированием счетов до вашей поездки.
        </p>
      </>
    ),
  },
  {
    q: 'Что происходит после завершения лечения в Шанхае?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed обеспечивает <strong>комплексное сопровождение после лечения</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Удалённые видеоконсультации</strong> с лечащим врачом (Complex Care)</li>
          <li><strong>Переведённые медицинские документы</strong> — полная выписка, результаты анализов и список лекарств на английском языке</li>
          <li><strong>Консультации по приёму лекарств</strong> — инструкции по дозировке, побочные эффекты и предупреждения о взаимодействии</li>
          <li><strong>План восстановления</strong> — индивидуальный график и рекомендации по физической активности</li>
          <li><strong>Координация с врачом на родине</strong> — (с вашего согласия) мы передаём медицинские документы вашему лечащему врачу</li>
          <li><strong>Постоянная поддержка</strong> — наша команда остаётся на связи для вопросов после вашего возвращения домой</li>
        </ul>
        <p>Для пациентов пакета Complex Care последующее наблюдение продолжается в течение <strong>30 дней</strong> после лечения.</p>
      </>
    ),
  },
]

const mnFaqs: FaqItem[] = [
  {
    q: 'Шанхайд эмчлүүлэх нь АНУ-тай харьцуулахад ямар үнэтэй вэ?',
    a: (
      <>
        <p className="mb-4">
          Шанхайн эрүүл мэндийн журам АНУ-тай харьцуулахад <strong>50–80% хямд</strong> байдаг. Тодорхой жишээ:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Журам</th>
                <th className="border border-gray-300 px-4 py-2 text-left">АНУ-ын үнэ</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Шанхайн үнэ</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Хэмнэлт</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Өвдөгний үе солих', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Зүрхний титэм судас залгах', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['MRI (3 Тл)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Шүдний суулгац (нэг шүд)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['IVF үргүйдлийн эмчилгээний мөчлөг', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Нүдний болор авах мэс засал', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Иж бүрэн эрүүл мэндийн үзлэг', '$2,000-$5,000', '$300-$600', '88%'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          ShanghaiMed консьерж үйлчилгээний багц <strong>3 өдөр $1,000</strong> (Үндсэн асрамж) эсвэл{' '}
          <strong>5 өдөр $1,650</strong> (Нарийн төвөгтэй асрамж) бөгөөд эмнэлгийн зохицуулалт, 2 хэлтэй дагалдан явах,
          орчуулга, логистик багтана. Эмнэлгийн эмчилгээний төлбөрийг орон нутгийн тарифаар тусад нь төлнө.
        </p>
      </>
    ),
  },
  {
    q: 'Гадаад өвчтөнд Шанхайд эрүүл мэндийн аялал хийхэд аюулгүй юу?',
    a: (
      <>
        <p className="mb-4"><strong>Тийм.</strong> Шанхайн тэргүүлэх эмнэлгүүд олон улсын аюулгүй байдлын стандартад нийцдэг:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Fudan University) — Grade 3A (Хятадын эмнэлгийн дээд зэрэглэл), 24 олон улсын даатгалын түнш</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — Grade 3A, цус судлал ба CAR-T эсийн эмчилгээний үндэсний тэргүүлэгч, National EMR Level 7</li>
          <li><strong>Zhongshan Hospital</strong> (Fudan University) — Grade 3A, олон улсын өвчтөний тусгай байр</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (SJTU) — Grade 3A, шүд, нүүр ам, гоёл сайхны мэс заслын үндэсний төв</li>
          <li><strong>Longhua Hospital</strong> (Shanghai University of TCM) — Grade 3A, УАУ-ын эрүүл мэндийн аяллын албан ёсны туршилтын эмнэлэг</li>
        </ul>
        <p>
          Эдгээр эмнэлгүүд АНУ-ын эмнэлгүүдэд ашигладаг <strong>ижил эрүүл мэндийн тоног төхөөрөмж</strong> (Siemens, GE Healthcare, Philips) болон{' '}
          <strong>ижил имплантын брэндүүдийг</strong> (Stryker, Zimmer, Straumann) ашигладаг. Олон тэргүүлэх эмч нар
          Johns Hopkins, Mayo Clinic, Cleveland Clinic-д мэргэжил дээшлүүлсэн.
        </p>
      </>
    ),
  },
  {
    q: 'ShanghaiMed ямар Шанхайн эмнэлгүүдтэй хамтран ажилладаг вэ?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed <strong>А зэрэглэлийн эрүүл мэндийн аяллын туршилтын 14 төрийн эмнэлэг</strong> болон{' '}
          <strong>5 хувийн олон улсын эмнэлэг</strong> — нийт 19 байгууллагатай хамтран ажиллаж, бүх эрүүл мэндийн мэргэжлийг хамарна:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Эмнэлэг</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Их сургууль</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Гол мэргэжил</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Мэдрэлийн мэс засал №1, арьс өвчин №1'],
                ["Children's Hospital", 'Fudan University', 'Нярайн анагаах ухаан, хүүхдийн мэс засал'],
                ['Ruijin Hospital', 'SJTU', 'Цус судлал (CAR-T), дотор шүүрэл'],
                ['Shanghai General Hospital', '—', 'Нүд, чих хамар хоолой, шээсний зам'],
                ['Zhongshan Hospital', 'Fudan University', 'Зүрх судас, ерөнхий мэс засал'],
                ['Renji Hospital', 'SJTU', 'Хоол боловсруулах зам №1, нөхөн үржихүй'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Уламжлалт Хятад анагаах ухаан'],
                ['IPMCH', 'China Welfare Institute', 'Нөхөн үржихүй, эх барих'],
                ["Shanghai Children's Medical Center", 'SJTU', 'Хүүхдийн зүрхний мэс засал'],
                ["Sixth People's Hospital", '—', 'Яс шарас (1963 оноос мөч нөхөн суулгалт)'],
                ['First Maternity & Infant Hospital', '—', 'Эх барих, ургийн анагаах ухаан'],
                ['Xinhua Hospital', 'SJTU', 'Хүүхэд судлал, арьс өвчин'],
                ['Huadong Hospital', 'Fudan University', 'Ахмад настан, эрүүл мэндийн үзлэг'],
                ["Ninth People's Hospital", 'SJTU', 'Шүд №1, гоёл сайхны мэс засал №1'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Дээрээс нь 5 хувийн олон улсын эмнэлэг: Jiahui International (Mass General-тай түншлэл), United Family,
          ParkwayHealth, SinoUnited Health (Mayo Clinic-тэй хамтын ажиллагаа ба «хоёр дахь санал» үйлчилгээ) болон Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Шанхайн эмч нар англиар ярьдаг уу?',
    a: (
      <>
        <p className="mb-4">
          Шанхайн тэргүүлэх эмнэлгүүдийн олон эмч нар <strong>олон улсын мэргэжил дээшлүүлэлт хийсэн бөгөөд англиар ярьдаг</strong>.
          Эмч нар англи хэлний эрүүл мэндийн сэтгүүлд тогтмол нийтлэл бичиж, олон улсын хуралд оролцдог.
        </p>
        <p className="mb-4">
          Хэлний бэрхшээлийг бүрэн арилгахын тулд ShanghaiMed <strong>мэргэжлийн 2 хэлтэй эрүүл мэндийн дагалдан явагчдыг</strong> (англи-хятад) үзүүлдэг ба тэд дараах зүйлсийг хийнэ:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Уулзалт бүрт таныг дагалдана</li>
          <li>Эрүүл мэндийн нэр томьёог үнэн зөв орчуулна</li>
          <li>Эмнэлгийн бичиг баримт болон хөтөч байдлаар тусална</li>
          <li>Онош, эмчилгээний төлөвлөгөө, жорыг бүрэн ойлгоход тусална</li>
        </ul>
        <p>Бүх эрүүл мэндийн бичиг баримт, эмчилгээний төлөвлөгөө, жор таны архивт зориулан <strong>англи хэл рүү орчуулагдана</strong>.</p>
      </>
    ),
  },
  {
    q: 'Хятадад эрүүл мэндийн визийг хэрхэн авах вэ?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed <strong>виз авах бүрэн үйл явцад</strong> тусална:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Анхны зөвлөгөө</strong> (үнэгүй, зайнаас видео)</li>
          <li><strong>Эрүүл мэндийн урилга</strong> — зөвлөгөөний дараа түнш эмнэлэг гаргана</li>
          <li><strong>Виз мэдүүлэх</strong> — урилгыг Хятадын элчин/консулд өгнө</li>
          <li><strong>Хянан шийдвэрлэх хугацаа</strong> — ихэвчлэн 2–4 долоо хоног</li>
          <li><strong>Баримт бичгийн дэмжлэг</strong> — шаардлагатай бүх бичиг баримтын орчуулгыг ShanghaiMed хангана</li>
        </ol>
        <p>
          Хятад нь 54 орны иргэдэд (АНУ, Их Британи, Канад, Австрали, ЕХ-ны ихэнх орон зэрэг) <strong>240 цагийн визгүй дамжин өнгөрөх</strong> боломж олгодог бөгөөд энэ нь богино эрүүл мэндийн аялалд хангалттай байж болно.
        </p>
      </>
    ),
  },
  {
    q: 'ShanghaiMed-ийн үйлчилгээний багцад юу багтдаг вэ?',
    a: (
      <>
        <p className="mb-2"><strong>Үндсэн асрамжийн багц — $1,000 / 3 өдөр</strong></p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Эмнэлэгт уулзалт товлох (1 эмнэлэг)</li>
          <li>2 хэлтэй эрүүл мэндийн дагалдан явах (англи-хятад)</li>
          <li>Бүх уулзалт дээр эрүүл мэндийн орчуулга</li>
          <li>Орон нутгийн эмнэлэг рүү/ээс тээвэр</li>
          <li>AI навигатор: урьдчилсан зөвлөгөө ба зардлын тооцоо</li>
        </ul>
        <p className="mb-2"><strong>Нарийн төвөгтэй асрамжийн багц — $1,650 / 5 өдөр</strong></p>
        <p className="mb-1">Үндсэн асрамжид багтсан бүх зүйлс, дээр нь:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Олон эмнэлгийн зохицуулалт (2+ эмнэлэг)</li>
          <li>Мэргэшсэн мэргэжилтэн дээр очих товлолт</li>
          <li>Эмчилгээний дараах хяналт (30 хоног, зайнаас видео уулзалт)</li>
          <li>Визний дэмжлэг, нисэх онгоцны буудлаас тосох</li>
        </ul>
        <p>
          <strong>Багтахгүй зүйлс</strong> (эмнэлэгт орон нутгийн тарифаар тусад нь төлнө): эмчилгээний зардал
          (мэс засал, эм, лабораторийн шинжилгээ), байрлал болон олон улсын нислэг.
        </p>
      </>
    ),
  },
  {
    q: 'Шанхайд эмчилгээгээ аялал жуулчлалтай хослуулж болох уу?',
    a: (
      <>
        <p className="mb-4">
          <strong>Мэдээж — энэ нь ShanghaiMed-ийн үндсэн философи юм.</strong> Шанхай бол Хятадын хамгийн олон улсын хот бөгөөд дараах газруудаар зочилж болно:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Бунд (The Bund)</strong> — алдартай далайн эргийн зугаалгын газар</li>
          <li><strong>Юй цэцэрлэг (Yu Garden)</strong> — 400 жилийн түүхтэй сонгодог хятад цэцэрлэг</li>
          <li><strong>Шанхай цамхаг</strong> — дэлхийн хоёр дахь өндөр барилга (632 м)</li>
          <li><strong>Shanghai Disneyland</strong> — дэлхийн хамгийн том Disney шилтгээн</li>
          <li><strong>Францын концесс</strong> — кафе, дэлгүүр бүхий сүүдэрлэг гудамжууд</li>
        </ul>
        <p>
          Олон өвчтөн <strong>эхний 1–2 өдөр эрүүл мэндийн уулзалтаа</strong> төлөвлөж, үлдсэн өдрүүдэд хотын үзэмжээр зочилдог.
          ShanghaiMed таны амралтын цагийг үрэхгүй байхаар эрүүл мэндийн уулзалтуудыг маршрутад тань тохируулан оруулахад тусална.
        </p>
      </>
    ),
  },
  {
    q: 'Шанхайд эрүүл мэндийн жуулчдын дунд ямар эрүүл мэндийн журам түгээмэл байдаг вэ?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Ангилал</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Журам</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Хэмнэлт</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Тэргүүлэх эмнэлэг</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Яс шарасны мэс засал', 'Өвдөг/түнхний үе солих, нурууны мэс засал', '80%', "Sixth People's / Huashan"],
                ['Гоёл сайхны мэс засал', 'Хамар засах, нүүрний нөхөн сэргээлт', '70-80%', "Ninth People's Hospital"],
                ['Шүдний эмчилгээ', 'Суулгац, титэм, гажиг засал', '70-80%', "Ninth People's Hospital"],
                ['УАУ', 'Зүү төөнүүр, ургамлын эм, туйна массаж', '75-80%', 'Longhua Hospital'],
                ['Хавдрын эмчилгээ', 'Хими эмчилгээ, CAR-T, дархлаа эмчилгээ', '60-80%', 'Ruijin / Huashan'],
                ['Зүрхний мэс засал', 'Шунт тавих, хавхлага солих', '80%', 'Zhongshan Hospital'],
                ['Үргүйдлийн эмчилгээ', 'IVF, ICSI', '75%', 'Renji / IPMCH'],
                ['Эрүүл мэндийн үзлэг', 'Өдрийн удирдах ажилтны үзлэг', '88%', 'Huadong Hospital'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    q: 'Олон улсын эрүүл мэндийн даатгал ашиглаж болох уу?',
    a: (
      <>
        <p className="mb-4">
          Тийм. ShanghaiMed-ийн түнш эмнэлгүүд томоохон олон улсын даатгалын компаниудтай <strong>шууд төлбөр тооцооны гэрээтэй</strong>.
          Эмнэлэг бүр 8-аас 24 даатгагч хүлээн авдаг:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 даатгалын түнш</li>
          <li>Shanghai Children&apos;s Medical Center — 23 даатгалын түнш</li>
          <li>Ruijin Hospital — 21 даатгалын түнш</li>
          <li>Renji Hospital — 20 даатгалын түнш</li>
        </ul>
        <p>
          Хүлээн авах даатгалын компаниудад <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS</strong> болон бусад багтана.
          ShanghaiMed таны аяллын өмнө даатгалын хамрах хүрээг шалгах, шууд төлбөр тооцоонд тусална.
        </p>
      </>
    ),
  },
  {
    q: 'Шанхайд эмчилгээ дууссаны дараа юу болдог вэ?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed <strong>эмчилгээний дараах иж бүрэн дагалдан явах</strong> үйлчилгээ үзүүлнэ:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Эмчлэгч эмчтэй <strong>зайнаас видео зөвлөгөө</strong> (Нарийн төвөгтэй асрамж)</li>
          <li><strong>Орчуулагдсан эрүүл мэндийн баримт бичгүүд</strong> — иж бүрэн гарах бичиг, шинжилгээний хариу, эмийн жагсаалт англи хэл дээр</li>
          <li><strong>Эм хэрэглэх зөвлөгөө</strong> — тун, гаж нөлөө, харилцан үйлчлэлийн сэрэмжлүүлэг</li>
          <li><strong>Эдгэрэх төлөвлөгөө</strong> — хувь хүний хуваарь, биеийн тамирын зөвлөмж</li>
          <li><strong>Эх орны эмчтэй зохицуулалт</strong> — (таны зөвшөөрлөөр) эрүүл мэндийн баримт бичгийг таны эмчлэгч эмчид илгээнэ</li>
          <li><strong>Тогтмол дэмжлэг</strong> — гэртээ буцаж ирсний дараа ч асуултад хариулахын тулд манай баг холбоотой байна</li>
        </ul>
        <p>Нарийн төвөгтэй асрамжийн багцын өвчтнүүдийн хувьд эмчилгээний дараах хяналт <strong>30 хоног</strong> үргэлжилнэ.</p>
      </>
    ),
  },
]

/* ==================== Component ==================== */

const FaqContent: React.FC = () => {
  const { language, t } = useLanguage()
  const isJa = language === 'ja'
  const isRu = language === 'ru'
  const isMn = language === 'mn'
  const faqs: FaqItem[] = isJa ? jaFaqs : isRu ? ruFaqs : isMn ? mnFaqs : enFaqs

  const ctaKey = 'faqPage.cta'
  const ctaTitle = t(`${ctaKey}.title`)
  const defaultCta = {
    title: 'Still have questions?',
    text: 'Get a free, no-obligation consultation with ShanghaiMed. Our team responds within 24 hours.',
    email: 'Email Us',
    form: 'Contact Form',
  }
  const tCta = {
    title: ctaTitle !== `${ctaKey}.title` ? ctaTitle : defaultCta.title,
    text: t(`${ctaKey}.text`) !== `${ctaKey}.text` ? t(`${ctaKey}.text`) : defaultCta.text,
    email: t(`${ctaKey}.email`) !== `${ctaKey}.email` ? t(`${ctaKey}.email`) : defaultCta.email,
    form: t(`${ctaKey}.form`) !== `${ctaKey}.form` ? t(`${ctaKey}.form`) : defaultCta.form,
  }
  const cta = isJa
    ? {
        title: 'まだご質問がありますか？',
        text: 'ShanghaiMedの無料相談をご利用ください。24時間以内にご返信いたします。',
        email: 'メールで問い合わせる',
        form: 'お問い合わせフォーム',
      }
    : (isRu || isMn)
    ? tCta
    : defaultCta

  return (
    <div className="space-y-8 max-w-4xl">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 pb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Q{index + 1}: {faq.q}
          </h2>
          <div className="text-gray-700 leading-relaxed">
            {faq.a}
          </div>
        </div>
      ))}

      <div className="mt-16 bg-blue-50 rounded-lg p-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-primary mb-4">{cta.title}</h2>
        <p className="text-gray-600 mb-6">{cta.text}</p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@shanghaimedhealth.com"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
          >
            {cta.email}
          </a>
          <a
            href="/#contact"
            className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            {cta.form}
          </a>
        </div>
      </div>
    </div>
  )
}

export default FaqContent
