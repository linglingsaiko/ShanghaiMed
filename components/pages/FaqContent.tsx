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
          ShanghaiMed offers a <strong>free no-obligation initial consultation</strong>, a standalone{' '}
          <strong>on-site hospital escort at $50/hour</strong> (booked and paid by the hour; English–Chinese
          interpretation; other languages available at additional cost), and three concierge service packages:{' '}
          <strong>$500 for 1 day (daytime)</strong> (Health Checkup Concierge, for 1-day health checkup programs only),{' '}
          <strong>$1,000 for 3 days (daytime)</strong> (Essential Care Concierge — required for all specialist
          consultations and medical conditions), and <strong>$1,650 for 5 days (daytime)</strong> (Surgery &amp;
          Extended Care Concierge — required for surgery and inpatient procedures). Additional companion hours beyond
          package days are available at <strong>$50/hour</strong>. Airport pickup &amp; drop-off uses a standard
          sedan; larger groups requiring 7-seaters, wheelchair vans, or child seats are arranged at additional cost.
          All packages include English–Chinese on-site medical interpretation (the Japanese-language version of this
          page lists Japanese–Chinese interpretation); interpretation in other languages is arranged on request at
          local market rates, quoted during consultation. Emergency on-site support is available <strong>24/7 for an
          additional fee</strong> — <strong>$300 emergency call-out (includes first 4 hours), then $100/hour</strong>.
          Hospital and clinic treatment costs (including health checkup packages starting from ~$700) are billed
          separately at local rates; ShanghaiMed does not charge hospital commissions.
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
          To guarantee zero communication gaps, ShanghaiMed provides <strong>professional English–Chinese medical
          companions</strong> (Japanese–Chinese in the Japanese-language version) who:
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
        <p className="mb-2"><strong>Free Initial Consultation — $0</strong></p>
        <p className="mb-1">No-obligation decision-stage conversation — 4 services:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Medical needs assessment</li>
          <li>Hospital &amp; specialist recommendations</li>
          <li>Estimated medical budget</li>
          <li>Insurance guidance</li>
        </ul>
        <p className="mb-2"><strong>On-site Hospital Escort — $50/hour</strong></p>
        <p className="mb-1">Booked and paid by the hour; available standalone or as an add-on to any package. 4 services:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>On-site companion at the hospital</li>
          <li>English–Chinese on-site medical interpretation (other languages at additional cost)</li>
          <li>On-site queue, payment, and medication pickup assistance</li>
          <li>Check-in message on visit day</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>Note:</strong> Hourly escort does NOT include appointment scheduling, doctor matching, airport pickup, report translation, visa support, insurance pre-authorization, interpretation in languages other than English, or post-visit follow-up — those are covered by concierge packages. For in-depth treatment planning or multi-appointment journeys, a concierge package is required.
        </p>
        <p className="mb-2"><strong>Health Checkup Concierge — $500 / 1 day (daytime)</strong></p>
        <p className="mb-1">13 concierge services — for 1-day health checkup programs only:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>1 full day of on-site ISPN-registered nurse accompaniment (daytime)</li>
          <li>Airport pickup &amp; drop-off</li>
          <li>Hotel coordination assistance</li>
          <li>English–Chinese on-site medical interpretation at the clinic</li>
          <li>Health checkup report translation and result explanation</li>
          <li>Doctor appointment scheduling</li>
          <li>Medication pickup &amp; delivery</li>
          <li>Hospital &amp; specialist matching</li>
          <li>Local transportation, payment, and on-the-ground guidance</li>
          <li>Dedicated WhatsApp support throughout your stay</li>
          <li>Visa invitation letter support</li>
          <li>30-day post-checkup remote follow-up</li>
          <li>Insurance support</li>
        </ul>
        <p className="mb-2"><strong>Essential Care Concierge — $1,000 / 3 days (daytime) ✓ Most commonly chosen</strong></p>
        <p className="mb-1">13 concierge services — required for all specialist consultations and medical conditions:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>3 full days of on-site ISPN-registered nurse accompaniment (daytime)</li>
          <li>Airport pickup &amp; drop-off</li>
          <li>Hotel coordination assistance</li>
          <li>English–Chinese on-site medical interpretation at all appointments</li>
          <li>Medical report translation and summaries</li>
          <li>Doctor appointment scheduling</li>
          <li>Medication pickup &amp; delivery</li>
          <li>Hospital &amp; specialist matching</li>
          <li>Local transportation, payment, and on-the-ground guidance</li>
          <li>Dedicated WhatsApp support throughout your stay</li>
          <li>Visa invitation letter support</li>
          <li>30-day post-care remote follow-up</li>
          <li>Insurance support · pre-authorization</li>
        </ul>
        <p className="mb-2"><strong>Surgery &amp; Extended Care Concierge — $1,650 / 5 days (daytime)</strong></p>
        <p className="mb-1">16 concierge services — required for surgery, inpatient procedures, and extended treatment plans. Includes all Essential Care services plus surgery-specific support:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>5 full days of on-site nurse accompaniment (daytime) — pre-op, surgery day &amp; post-op</li>
          <li>Airport pickup &amp; drop-off</li>
          <li>Hotel &amp; extended-stay coordination</li>
          <li>English–Chinese on-site medical interpretation (including surgery day)</li>
          <li>Full medical document translation &amp; surgical briefing</li>
          <li>Surgeon appointment &amp; pre-admission coordination</li>
          <li>Pre-surgery preparation &amp; admission coordination</li>
          <li>Medication pickup &amp; delivery</li>
          <li>Hospital &amp; surgeon matching</li>
          <li>Inpatient check-ins during hospital stay</li>
          <li>Local transportation, payment/billing assistance, and on-the-ground guidance</li>
          <li>Dedicated WhatsApp support throughout your stay</li>
          <li>Medical visa invitation letter support</li>
          <li>Family communication &amp; progress updates</li>
          <li>60-day post-care remote follow-up</li>
          <li>Insurance · pre-authorization &amp; surgical deposit coordination</li>
        </ul>
        <p className="mb-2"><strong>Emergency on-site support — available 24/7 for an additional fee</strong></p>
        <p className="mb-4">
          <strong>$300 emergency call-out (available 24/7, includes first 4 hours), then $100/hour.</strong>{' '}
          Emergency support covers urgent after-hours, weekend, or acute-care situations where on-site nurse
          accompaniment is needed outside the planned concierge schedule. In a life-threatening medical emergency,
          call 120 (China's national ambulance number) first.
        </p>
        <p>
          <strong>What's NOT included</strong> (billed separately at local rates): Medical treatment costs paid directly to hospitals/clinics (doctor consultations, tests, medication, procedures, and health checkup packages starting from ~$700), accommodation, international flights, interpretation in languages other than English (Japanese in the Japanese version), and vehicle upgrades for larger groups. ShanghaiMed does not charge hospital commissions.
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
          ShanghaiMed provides insurance support including policy benefit checks and pre-authorization letters. Where direct
          billing is available we coordinate with the hospital on your behalf; otherwise patients pay the hospital directly
          and claim reimbursement with our documentation support.
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
          <li><strong>Remote video check-ups</strong> with your treating doctor</li>
          <li><strong>Translated medical records</strong> — full discharge summary, test results, and medication list in English</li>
          <li><strong>Medication guidance</strong> — dosage instructions, side effects, and interaction warnings</li>
          <li><strong>Recovery planning</strong> — personalized timeline and activity recommendations</li>
          <li><strong>Home-country coordination</strong> — we share your medical records with your primary care physician (with consent)</li>
          <li><strong>Ongoing support</strong> — our team remains available for questions after you return home</li>
        </ul>
        <p>Follow-up continues for <strong>30 days</strong> after your treatment (60 days for surgery packages).</p>
      </>
    ),
  },
  {
    q: 'Is the initial consultation really free? What does it cover?',
    a: (
      <>
        <p className="mb-4">
          <strong>Yes.</strong> The initial consultation with Sara via WhatsApp is completely free and carries no
          obligation. On the call, we assess your medical needs, recommend suitable hospitals and specialists, give you a
          realistic budget estimate for treatment, and explain how insurance works.
        </p>
        <p>
          This is a decision-stage conversation; on-site services (nurse accompaniment, appointment booking, verbal
          interpretation) begin once you book an hourly escort or a concierge package.
        </p>
      </>
    ),
  },
  {
    q: 'Can I book just an on-site hospital escort without a full concierge package?',
    a: (
      <>
        <p className="mb-4">
          <strong>Yes.</strong> On-site hospital escort is available as a standalone service at <strong>$50/hour</strong>,
          booked and paid by the hour. It is also available as an add-on to any concierge package for extra hours or
          additional appointments. This is for patients who have already booked their own doctor appointment and only
          need an English–Chinese medical companion on-site for queues, payment, medication pickup, and basic
          on-the-spot questions.
        </p>
        <p className="mb-4">
          Interpretation is <strong>English–Chinese</strong> (Japanese–Chinese in the Japanese-language version);
          other languages are arranged on request at additional cost, quoted during consultation.
        </p>
        <p>
          Hourly escort does <strong>NOT</strong> include appointment scheduling, doctor matching, airport pickup,
          report translation, visa support, insurance pre-authorization, or post-visit follow-up — those are covered by
          concierge packages ($500/$1,000/$1,650).
        </p>
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
          ShanghaiMedでは<strong>無料・義務なしの初回コンサルテーション</strong>、<strong>院内時間制同伴サービス$50/時間</strong>（最低2時間、英中通訳のみ）、そして3つのコンシェルジュパッケージを提供しています：<strong>1日間（日中）$500</strong>（健康診断コンシェルジュ、1日人間ドックプログラム専用）、<strong>3日間（日中）$1,000</strong>（エッセンシャルケア・コンシェルジュ、すべての専門科受診・疾患に必須）、<strong>5日間（日中）$1,650</strong>（手術・延長ケア・コンシェルジュ、手術・入院・長期治療に必須）。パッケージ日数を超える追加同伴時間は<strong>$50/時間</strong>で承ります。空港送迎は標準セダン車です。車椅子対応バン、7人乗り車など特別車両は追加料金がかかります。英語以外の言語での通訳は通訳者手配料が別途かかります。病院・クリニックでの治療費（約$700からの人間ドックパッケージを含む）は別途現地価格で請求され、ShanghaiMedは病院からのコミッションを一切受け取りません。
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
        <p className="mb-2"><strong>無料初回コンサルテーション — $0</strong></p>
        <p className="mb-1">義務なしの意思決定段階のご相談 — 4サービス：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>医療ニーズの評価</li>
          <li>病院・専門医のご提案</li>
          <li>想定医療費のお見積り</li>
          <li>保険のご案内</li>
        </ul>
        <p className="mb-2"><strong>院内同伴サービス — $50/時間（最低2時間）</strong></p>
        <p className="mb-1">すでにご自身で診察予約を済ませた方向けの単体サービス — 4サービス：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>病院内での同伴スタッフ</li>
          <li>英中現地医療通訳（その他の言語は追加料金）</li>
          <li>院内での順番待ち・会計・薬の受け取り補助</li>
          <li>受診当日のチェックインメッセージ</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>ご注意：</strong>同伴スタッフは必ずしも資格を持つ看護師ではありません。時間制同伴には診察予約、医師マッチング、空港送迎、レポート翻訳、ビザサポート、保険事前承認、英語以外の言語、受診後フォローアップは<strong>含まれません</strong>。これらはコンシェルジュパッケージに含まれます。
        </p>
        <p className="mb-2"><strong>健康診断コンシェルジュ — $500 / 1日間（日中）</strong></p>
        <p className="mb-1">人間ドック・健康診断専用（1日間パッケージのみ）。13のコンシェルジュサービスがすべて含まれます：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN認定日中通訳看護師による1日間の現地同行（日中）</li>
          <li>空港送迎（到着・出発）</li>
          <li>ホテル調整支援</li>
          <li>クリニックでの二言語医療通訳</li>
          <li>人間ドックレポート翻訳・結果説明</li>
          <li>医師の予約調整</li>
          <li>薬の受け取り・調整支援</li>
          <li>病院・専門医マッチング</li>
          <li>現地移動・支払い・実務ガイド</li>
          <li>滞在期間中の専用WhatsAppサポート</li>
          <li>医療ビザ招聘状サポート</li>
          <li>健診後30日間リモートフォローアップ</li>
          <li>保険サポート</li>
        </ul>
        <p className="mb-2"><strong>エッセンシャルケア・コンシェルジュ — $1,000 / 3日間（日中） ✓ 最も選ばれています</strong></p>
        <p className="mb-1">すべての専門科受診・疾患に必須。13のコンシェルジュサービス：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN認定日中通訳看護師による3日間の現地同行（日中）</li>
          <li>空港送迎（標準セダン。特別車両は追加料金）・ホテル調整</li>
          <li>全診察での二言語医療通訳</li>
          <li>診療レポート翻訳・薬の受け取り支援</li>
          <li>病院・専門医マッチング・予約調整</li>
          <li>現地での移動・支払い・実務ガイド</li>
          <li>WhatsApp専用サポート・医療ビザ招聘状サポート</li>
          <li>保険サポート、治療後30日間リモートフォローアップ</li>
        </ul>
        <p className="mb-2"><strong>手術・延長ケア・コンシェルジュ — $1,650 / 5日間（日中）</strong></p>
        <p className="mb-1">手術・入院・長期治療に必須。エッセンシャルケアの全13サービスに加え、手術特有のサポート3点を含む計16サービス：</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN認定日中通訳看護師による5日間の現地同行（日中）— 術前・手術当日・術後</li>
          <li>空港送迎（標準セダン。特別車両は追加料金）・長期宿泊調整</li>
          <li>手術当日を含む二言語医療通訳</li>
          <li>医療文書全文翻訳・手術サマリー</li>
          <li>執刀医予約・入院前調整</li>
          <li>術前準備・入院手続き調整</li>
          <li>薬の受け取り・術後処方箋調整</li>
          <li>病院・執刀医マッチング</li>
          <li>入院中の病室訪問</li>
          <li>現地移動・支払い・実務ガイド</li>
          <li>滞在期間中の専用WhatsAppサポート</li>
          <li>医療ビザ招聘状サポート</li>
          <li>ご家族とのコミュニケーション・経過報告</li>
          <li>治療後60日間リモートフォローアップ</li>
          <li>保険・手術デポジット調整</li>
        </ul>
        <p>
          <strong>含まれないもの</strong>（現地価格で別途支払い）：病院・クリニックへ直接支払う医療費（診察料・検査料・薬代・処置費、および$700からの人間ドックパッケージ）、宿泊費、国際航空券。救急医療サービスはコンシェルジュパッケージに含まれません。緊急時は直ちに120番に通報し、最寄りの病院へ搬送してください。
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
          ShanghaiMedは保険の福利厚生内容確認や事前承認状（プレオーソライゼーションレター）の取得など保険サポートを提供します。ダイレクトビリングが可能な場合は病院と調整し、対応していない場合は当社の書類作成サポートのもと病院に直接お支払いいただき、保険会社へ請求いただけます。
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
          <li><strong>リモートビデオ診察</strong>— 担当医とのフォローアップ</li>
          <li><strong>翻訳済み医療記録</strong>— 退院時サマリー、検査結果、服薬リストの英語版</li>
          <li><strong>服薬指導</strong>— 用法・用量、副作用、併用注意薬の情報</li>
          <li><strong>回復計画</strong>— 個別の回復スケジュールと活動の推奨</li>
          <li><strong>帰国後の連携</strong>—（同意のもと）主治医に医療記録を共有</li>
          <li><strong>継続サポート</strong>— 帰国後も質問に対応するチーム体制</li>
        </ul>
        <p>治療後<strong>30日間</strong>フォローアップが継続されます。</p>
      </>
    ),
  },
  {
    q: '無料コンサルテーションには何が含まれますか？予約の義務はありますか？',
    a: (
      <>
        <p className="mb-4">
          無料コンサルテーションは<strong>義務なし</strong>のビデオ通話で、医療ニーズの評価、適切な病院・専門医のご提案、想定医療費のお見積り、保険のご案内の4サービスを提供します。予約を確定する義務はなく、話を聞いてから判断いただけます。
        </p>
        <p>
          空港送迎、予約手配、現地同伴、診察の予約はコンシェルジュパッケージまたは時間制同伴サービスで提供されます。
        </p>
      </>
    ),
  },
  {
    q: '$50/時間の時間制同伴サービスは単体で利用できますか？何が含まれていないのですか？',
    a: (
      <>
        <p className="mb-4">
          はい、時間制同伴は<strong>単体でご購入いただけます</strong>（最低2時間）。すでにご自身で診察予約を済ませ、当日の通訳と院内ガイドだけが必要な方向けです。同伴者は必ずしも資格を持つ看護師ではありません。通訳は英中のみです（その他の言語は追加料金）。
        </p>
        <p className="mb-4">
          時間制同伴には以下は<strong>含まれません</strong>：診察予約、医師マッチング、空港送迎、医療レポート翻訳、ビザ招聘状サポート、保険事前承認、英語以外の言語での通訳、受診後フォローアップ。これらのサービスが必要な場合はコンシェルジュパッケージをお選びください。
        </p>
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
          ShanghaiMed предлагает <strong>бесплатную ни к чему не обязывающую вводную консультацию</strong>, <strong>почасовое сопровождение в больнице $50/час</strong> (минимум 2 часа, только англо-китайский перевод) и три пакета консьерж-сервиса: <strong>$500 за 1 день (днём)</strong> (Консьерж для чек-апа — только для однодневных программ медицинских осмотров), <strong>$1,000 за 3 дня (днём)</strong> (Базовый уход — обязателен для всех консультаций специалистов и заболеваний) и <strong>$1,650 за 5 дней (днём)</strong> (Консьерж для хирургии — обязателен для операций, госпитализаций и длительных программ лечения). Дополнительные часы сопровождения сверх дней пакета доступны по <strong>$50/час</strong>. Трансфер из/в аэропорт предоставляется на стандартном седане; специальные транспортные средства (автомобили для инвалидных колясок, 7-местные автомобили и т. д.) оплачиваются дополнительно. Перевод на языки, кроме английского, требует отдельного переводчика за дополнительную плату. Стоимость лечения в больнице или клинике (включая пакеты чек-апа от ~$700) оплачивается отдельно по местным тарифам; ShanghaiMed не получает комиссий от больниц.
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
        <p className="mb-2"><strong>Бесплатная вводная консультация — $0</strong></p>
        <p className="mb-1">Ни к чему не обязывающая консультация для принятия решения — 4 услуги:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Оценка ваших медицинских потребностей</li>
          <li>Рекомендации по больницам и специалистам</li>
          <li>Ориентировочная оценка медицинских расходов</li>
          <li>Консультация по страховке</li>
        </ul>
        <p className="mb-2"><strong>Почасовое сопровождение в больнице — $50/час (минимум 2 часа)</strong></p>
        <p className="mb-1">Отдельная услуга для пациентов, которые уже записались на приём самостоятельно — 4 услуги:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Сопровождающий на территории больницы</li>
          <li>Англо-китайский медицинский перевод на приёме (другие языки — дополнительная плата)</li>
          <li>Помощь с очередями, оплатой и получением лекарств в больнице</li>
          <li>Check-in сообщение в день приёма</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>Важно:</strong> сопровождающий не обязательно является лицензированной медсестрой. Почасовое сопровождение <strong>НЕ включает</strong> запись на приём, подбор врача, трансфер из аэропорта, перевод медицинских заключений, визовую поддержку, предавторизацию по страховке, перевод на языки кроме английского и пост-лечебное наблюдение. Эти услуги предоставляются в рамках пакетов консьержа.
        </p>
        <p className="mb-2"><strong>Консьерж для чек-апа — $500 / 1 день (днём)</strong></p>
        <p className="mb-1">Только для однодневных программ чек-апа. Включает все 13 услуг консьерж-сервиса:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>1 день очного сопровождения ISPN-сертифицированной медсестры со знанием английского и китайского (днём)</li>
          <li>Встреча и проводы в аэропорту</li>
          <li>Координация отеля</li>
          <li>Двуязычный медицинский перевод в клинике</li>
          <li>Перевод отчёта чек-апа и разъяснение результатов</li>
          <li>Запись на приём к врачу</li>
          <li>Помощь с получением лекарств и координация назначений</li>
          <li>Подбор больницы и специалиста</li>
          <li>Помощь с транспортом, оплатой и ориентацией на месте</li>
          <li>Выделенная линия поддержки в WhatsApp на время поездки</li>
          <li>Поддержка с медицинским приглашением на визу</li>
          <li>30 дней пост-чекапного удалённого наблюдения</li>
          <li>Страховая поддержка</li>
        </ul>
        <p className="mb-2"><strong>Консьерж «Базовый уход» — $1,000 / 3 дня (днём) ✓ Выбирается чаще всего</strong></p>
        <p className="mb-1">Обязателен для всех консультаций специалистов и заболеваний. Включает 13 услуг:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>3 дня очного сопровождения ISPN-сертифицированной медсестры со знанием английского и китайского (днём)</li>
          <li>Встреча и проводы в аэропорту (стандартный седан; специальные автомобили за дополнительную плату), координация отеля</li>
          <li>Двуязычный медицинский перевод на всех приёмах</li>
          <li>Перевод медицинских заключений, помощь с получением лекарств</li>
          <li>Подбор больницы и специалиста, запись на приёмы</li>
          <li>Помощь с транспортом, оплатой и ориентацией на месте</li>
          <li>Выделенная поддержка в WhatsApp, поддержка с медицинским приглашением на визу</li>
          <li>Страховая поддержка, 30 дней пост-лечебного удалённого наблюдения</li>
        </ul>
        <p className="mb-2"><strong>Консьерж для хирургии и длительного лечения — $1,650 / 5 дней (днём)</strong></p>
        <p className="mb-1">Обязателен для операций, госпитализаций и длительных программ лечения. Включает все 13 услуг «Базового ухода» плюс 3 специализированные хирургические услуги, всего 16:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>5 дней очного сопровождения ISPN-сертифицированной медсестры со знанием английского и китайского (днём) — до, в день и после операции</li>
          <li>Встреча и проводы в аэропорту (стандартный седан; специальные автомобили за дополнительную плату), координация долгосрочного проживания</li>
          <li>Двуязычный медицинский перевод включая день операции</li>
          <li>Полный перевод медицинских документов, включая хирургическое заключение</li>
          <li>Запись к хирургу, координация предоперационной подготовки</li>
          <li>Предоперационная подготовка и координация госпитализации</li>
          <li>Помощь с получением лекарств, координация послеоперационных назначений</li>
          <li>Подбор больницы и хирурга</li>
          <li>Визиты в палату во время госпитализации</li>
          <li>Помощь с транспортом, оплатой и ориентацией на месте</li>
          <li>Выделенная линия поддержки в WhatsApp на время поездки</li>
          <li>Поддержка с медицинским приглашением на визу</li>
          <li>Общение с семьёй и обновления о ходе лечения</li>
          <li>60 дней пост-лечебного удалённого наблюдения</li>
          <li>Страховая поддержка и координация хирургического депозита</li>
        </ul>
        <p>
          <strong>Что НЕ включено</strong> (оплачивается напрямую по местным тарифам): медицинские расходы в больнице/клинике (консультации врачей, анализы, лекарства, процедуры и пакеты чек-апа от ~$700), проживание и международные перелёты. Экстренная медицинская помощь не покрывается пакетами консьержа. При неотложной ситуации немедленно звоните 120 и обращайтесь в ближайшую больницу.
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
          ShanghaiMed предоставляет страховую поддержку, помогая проверить покрытие по вашему полису и получить письма предавторизации. Если прямой биллинг доступен, мы координируем его с больницей; если нет — вы оплачиваете услуги напрямую больнице и подаёте заявление на возмещение с нашей документальной поддержкой.
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
          <li><strong>Удалённые видеоконсультации</strong> с лечащим врачом</li>
          <li><strong>Переведённые медицинские документы</strong> — полная выписка, результаты анализов и список лекарств на английском языке</li>
          <li><strong>Консультации по приёму лекарств</strong> — инструкции по дозировке, побочные эффекты и предупреждения о взаимодействии</li>
          <li><strong>План восстановления</strong> — индивидуальный график и рекомендации по физической активности</li>
          <li><strong>Координация с врачом на родине</strong> — (с вашего согласия) мы передаём медицинские документы вашему лечащему врачу</li>
          <li><strong>Постоянная поддержка</strong> — наша команда остаётся на связи для вопросов после вашего возвращения домой</li>
        </ul>
        <p>Последующее наблюдение продолжается в течение <strong>30 дней</strong> после лечения.</p>
      </>
    ),
  },
  {
    q: 'Что включает бесплатная консультация? Обязательно ли потом что-то заказывать?',
    a: (
      <>
        <p className="mb-4">
          Бесплатная консультация проводится по видеосвязи и <strong>ни к чему вас не обязывает</strong>. Вы получите оценку медицинских потребностей, рекомендации по больницам и специалистам, ориентировочную оценку расходов и консультацию по страховке — всего 4 услуги. Вы не обязаны бронировать пакет после консультации.
        </p>
        <p>
          Трансфер из аэропорта, запись на приёмы, очное сопровождение и организация приёма предоставляются в рамках консьерж-пакетов или почасового сопровождения.
        </p>
      </>
    ),
  },
  {
    q: 'Можно ли заказать почасовое сопровождение отдельно? Что оно НЕ включает?',
    a: (
      <>
        <p className="mb-4">
          Да, почасовое сопровождение продаётся <strong>отдельно</strong> (минимум 2 часа). Это подходит пациентам, которые уже сами записались на приём и нуждаются только в переводчике и навигации по больнице в день визита. Сопровождающий не обязательно является лицензированной медсестрой. Перевод только англо-китайский (другие языки — за дополнительную плату).
        </p>
        <p className="mb-4">
          Почасовое сопровождение <strong>НЕ включает</strong>: запись на приём, подбор врача, трансфер из аэропорта, перевод медицинских заключений, визовую поддержку, предавторизацию по страховке, перевод на языки кроме английского и пост-лечебное наблюдение. Если вам нужны эти услуги, выберите один из консьерж-пакетов.
        </p>
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
          ShanghaiMed <strong>үнэгүй, ямар нэгэн үүрэг хүлээлгүй анхны зөвлөгөө</strong>, <strong>цагийн дагалдан явах үйлчилгээ $50/цаг</strong> (хамгийн багадаа 2 цаг, зөвхөн англи-хятад орчуулга) болон 3 консьерж багцыг санал болгодог: <strong>1 өдөр $500</strong> (Эрүүл мэндийн үзлэгийн консьерж, зөвхөн 1 өдрийн эрүүл мэндийн үзлэгт), <strong>3 өдөр $1,000</strong> (Үндсэн асрамжийн консьерж, бүх мэргэжлийн эмчийн үзлэг ба өвчлөлд шаардлагатай) болон <strong>5 өдөр $1,650</strong> (Мэс засал ба уртасгасан асрамжийн консьерж, мэс засал, хэвтэн эмчлүүлэх, уртасгасан эмчилгээнд шаардлагатай). Багцын өдрөөс хэтэрсэн нэмэлт цагийг <strong>$50/цаг</strong>-аар авах боломжтой. Нисэх буудлын тосож, хүргэх нь стандарт седан машинаар; тэргэнцрийн тэрэг, 7 хүний суудалтай машин гэх мэт тусгай тээврийн хэрэгсэл нэмэлт төлбөртэй. Англи хэлнээс бусад хэл дээрх орчуулга нь орчуулагчийг нэмэлт төлбөрөөр авах шаардлагатай. Эмнэлэг, клиникийн эмчилгээний зардал (~$700-аас эхлэх эрүүл мэндийн үзлэгийн багц орно) орон нутгийн тарифаар тусад нь төлөгдөнө; ShanghaiMed эмнэлгүүдээс комисс авдаггүй.
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
        <p className="mb-2"><strong>Үнэгүй анхны зөвлөгөө — $0</strong></p>
        <p className="mb-1">Шийдвэр гаргах үе шатанд зориулсан ямар нэгэн үүрэг хүлээлгүй зөвлөгөө — 4 үйлчилгээ:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Эрүүл мэндийн хэрэгцээний үнэлгээ</li>
          <li>Эмнэлэг ба мэргэжлийн эмчийн санал</li>
          <li>Эмнэлгийн зардлын ойролцоо тооцоолол</li>
          <li>Даатгалын зөвлөгөө</li>
        </ul>
        <p className="mb-2"><strong>Эмнэлэг дэх цагийн дагалдан явах — $50/цаг (хамгийн багадаа 2 цаг)</strong></p>
        <p className="mb-1">Аль хэдийн өөрсдөө цаг захиалсан хүмүүст зориулсан бие даасан үйлчилгээ — 4 үйлчилгээ:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Эмнэлгийн байр дотор дагалдан явагч</li>
          <li>Англи-хятад эмнэлгийн орчуулга (бусад хэл — нэмэлт төлбөр)</li>
          <li>Эмнэлэг дэх дараалал, төлбөр, эм хүлээн авахад туслах</li>
          <li>Уулзалтын өдрийн check-in зурвас</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>Анхаар:</strong> Дагалдан явагч нь заавал лицензтэй сувилагч байх албагүй. Цагийн дагалдан явахад <strong>дараах зүйлс БАГТАХГҮЙ</strong>: цаг захиалга, эмч сонгох, нисэх буудлын тосолт, эмнэлгийн тайлангийн орчуулга, визний дэмжлэг, даатгалын урьдчилсан зөвшөөрөл, англи хэлнээс бусад хэл дээрх орчуулга, эмчилгээний дараах хяналт. Эдгээр үйлчилгээ консьерж багцад багтана.
        </p>
        <p className="mb-2"><strong>Эрүүл мэндийн үзлэгийн консьерж — $500 / 1 өдөр (өдрийн цагаар)</strong></p>
        <p className="mb-1">Зөвхөн 1 өдрийн эрүүл мэндийн үзлэгийн хөтөлбөрт зориулагдсан. Консьержийн 13 үйлчилгээ бүгд багтана:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагчийн 1 өдөр биечлэн дагалдан явах (өдрийн цагаар)</li>
          <li>Нисэх буудлаас тосох, хүргэж өгөх</li>
          <li>Буудлын зохицуулалтын дэмжлэг</li>
          <li>Клиник дээр хоёр хэлний эмнэлгийн орчуулга</li>
          <li>Үзлэгийн тайлан орчуулах, үр дүн тайлбарлах</li>
          <li>Эмчийн цаг захиалга</li>
          <li>Эм хүлээн авах, жорын зохицуулалтын туслалцаа</li>
          <li>Эмнэлэг ба мэргэжлийн эмч сонгох</li>
          <li>Орон нутгийн тээвэр, төлбөр, чиглүүлэгч</li>
          <li>Аяллын үеийн тусгай WhatsApp дэмжлэг</li>
          <li>Эмнэлгийн визний урилгын дэмжлэг</li>
          <li>Үзлэгийн дараах 30 хоногийн зайнаас хяналт</li>
          <li>Даатгалын дэмжлэг</li>
        </ul>
        <p className="mb-2"><strong>Үндсэн асрамжийн консьерж — $1,000 / 3 өдөр (өдрийн цагаар) ✓ Хамгийн их сонгогддог багц</strong></p>
        <p className="mb-1">Бүх мэргэжлийн эмчийн үзлэг ба өвчлөлд шаардлагатай. 13 үйлчилгээ:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагчийн 3 өдөр биечлэн дагалдан явах (өдрийн цагаар)</li>
          <li>Нисэх буудлаас тосох, хүргэж өгөх (стандарт седан; тусгай машин нэмэлт төлбөр), буудлын зохицуулалт</li>
          <li>Бүх уулзалт дээр хоёр хэлний эмнэлгийн орчуулга</li>
          <li>Эмнэлгийн тайлан орчуулах, эм хүлээн авах туслалцаа</li>
          <li>Эмнэлэг ба мэргэжлийн эмч сонгох, цаг захиалга</li>
          <li>Орон нутгийн тээвэр, төлбөр, чиглүүлэгч</li>
          <li>Тусгай WhatsApp дэмжлэг, эмнэлгийн визний урилгын дэмжлэг</li>
          <li>Даатгалын дэмжлэг, эмчилгээний дараах 30 хоногийн зайнаас хяналт</li>
        </ul>
        <p className="mb-2"><strong>Мэс засал ба уртасгасан асрамжийн консьерж — $1,650 / 5 өдөр (өдрийн цагаар)</strong></p>
        <p className="mb-1">Мэс засал, хэвтэн эмчлүүлэх, уртасгасан эмчилгээнд шаардлагатай. Үндсэн асрамжийн 13 үйлчилгээнээс гадна мэс заслын 3 тусгай дэмжлэг, нийт 16 үйлчилгээ:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>ISPN гэрчилгээтэй англи, хятад хэлтэй сувилагчийн 5 өдөр биечлэн дагалдан явах (өдрийн цагаар) — мэс заслын өмнөх, өдөр, дараах</li>
          <li>Нисэх буудлаас тосох, хүргэж өгөх (стандарт седан; тусгай машин нэмэлт төлбөр), урт хугацааны байрлалын зохицуулалт</li>
          <li>Мэс заслын өдрийг оролцуулан хоёр хэлний эмнэлгийн орчуулга</li>
          <li>Эмнэлгийн баримт бичгийн бүрэн орчуулга, мэс заслын тайлан</li>
          <li>Мэс засалч эмчийн цаг захиалга, хэвтэхээс өмнөх зохицуулалт</li>
          <li>Мэс заслын өмнөх бэлтгэл ба хэвтэн эмчлүүлэх зохицуулалт</li>
          <li>Эм хүлээн авах, мэс заслын дараах жорын зохицуулалт</li>
          <li>Эмнэлэг ба мэс засалч сонгох</li>
          <li>Хэвтэх үеийн өрөөнд эргэлт</li>
          <li>Орон нутгийн тээвэр, төлбөр, чиглүүлэгч</li>
          <li>Аяллын үеийн тусгай WhatsApp дэмжлэг</li>
          <li>Эмнэлгийн визний урилгын дэмжлэг</li>
          <li>Гэр бүлийнхэнтэй харилцах ба явцын мэдээллээр хангах</li>
          <li>Эмчилгээний дараах 60 хоногийн зайнаас хяналт</li>
          <li>Даатгал ба мэс заслын барьцааны зохицуулалт</li>
        </ul>
        <p>
          <strong>Багтахгүй зүйлс</strong> (орон нутгийн тарифаар шууд төлнө): эмнэлэг/клиникт төлөх эмнэлгийн зардал (эмчийн зөвлөгөө, шинжилгээ, эм, эмчилгээ, ~$700-аас эхлэх эрүүл мэндийн үзлэгийн багц), байрлал болон олон улсын нислэг. Яаралтай тусламжийн эмнэлгийн үйлчилгээ консьерж багцад багтахгүй. Яаралтай тохиолдолд 120 руу нэн даруй залгаж, хамгийн ойрын эмнэлэгт хандана уу.
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
          ShanghaiMed даатгалын дэмжлэг үзүүлж, таны бодлогын хамрах хүрээг шалгаж, урьдчилсан зөвшөөрлийн захидал авахад тусална. Шууд төлбөр тооцоо хийх боломжтой бол бид эмнэлэгтэй зохицуулна; боломжгүй бол та эмнэлэгт шууд төлж, манай баримт бичгийн дэмжлэгээр даатгалд нөхөн төлбөр хүснэ.
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
          <li>Эмчлэгч эмчтэй <strong>зайнаас видео зөвлөгөө</strong></li>
          <li><strong>Орчуулагдсан эрүүл мэндийн баримт бичгүүд</strong> — иж бүрэн гарах бичиг, шинжилгээний хариу, эмийн жагсаалт англи хэл дээр</li>
          <li><strong>Эм хэрэглэх зөвлөгөө</strong> — тун, гаж нөлөө, харилцан үйлчлэлийн сэрэмжлүүлэг</li>
          <li><strong>Эдгэрэх төлөвлөгөө</strong> — хувь хүний хуваарь, биеийн тамирын зөвлөмж</li>
          <li><strong>Эх орны эмчтэй зохицуулалт</strong> — (таны зөвшөөрлөөр) эрүүл мэндийн баримт бичгийг таны эмчлэгч эмчид илгээнэ</li>
          <li><strong>Тогтмол дэмжлэг</strong> — гэртээ буцаж ирсний дараа ч асуултад хариулахын тулд манай баг холбоотой байна</li>
        </ul>
        <p>Эмчилгээний дараах хяналт <strong>30 хоног</strong> үргэлжилнэ.</p>
      </>
    ),
  },
  {
    q: 'Үнэгүй зөвлөгөөнд юу багтдаг вэ? Зайлшгүй ямар нэгэн зүйл захиалах шаардлагатай юу?',
    a: (
      <>
        <p className="mb-4">
          Үнэгүй зөвлөгөө видео дуудлагаар явагдах бөгөөд <strong>таныг ямар нэгэн зүйлд үүрэг хүлээлгэхгүй</strong>. Та эрүүл мэндийн хэрэгцээний үнэлгээ, эмнэлэг ба мэргэжлийн эмчийн санал, зардлын ойролцоо тооцоолол, даатгалын зөвлөгөө — 4 үйлчилгээг авна. Зөвлөгөөний дараа зайлшгүй багц захиалах шаардлагагүй.
        </p>
        <p>
          Нисэх буудлын тосолт, цаг захиалга, биечлэн дагалдан явах, уулзалт зохион байгуулах үйлчилгээг консьерж багц эсвэл цагийн дагалдан явах үйлчилгээнд үзүүлнэ.
        </p>
      </>
    ),
  },
  {
    q: 'Цагийн дагалдан явах үйлчилгээг дангаар захиалж болох уу? Юу багтдаггүй вэ?',
    a: (
      <>
        <p className="mb-4">
          Тийм, цагийн дагалдан явахыг <strong>дангаар захиалж</strong> болно (хамгийн багадаа 2 цаг). Энэ нь өөрсдөө цаг захиалчихсан, тухайн өдөр зөвхөн орчуулагч ба эмнэлэг доторх чиглүүлэгч хэрэгтэй хүмүүст тохиромжтой. Дагалдан явагч нь заавал лицензтэй сувилагч байх албагүй. Орчуулга зөвхөн англи-хятад (бусад хэл — нэмэлт төлбөр).
        </p>
        <p className="mb-4">
          Цагийн дагалдан явахад <strong>дараах зүйлс БАГТАХГҮЙ</strong>: цаг захиалга, эмч сонгох, нисэх буудлын тосолт, эмнэлгийн тайлан орчуулга, визний дэмжлэг, даатгалын урьдчилсан зөвшөөрөл, англи хэлнээс бусад хэл дээрх орчуулга, эмчилгээний дараах хяналт. Хэрэв танд эдгээр үйлчилгээ хэрэгтэй бол консьерж багцаас сонгоно уу.
        </p>
      </>
    ),
  },
]

/* ==================== Arabic Version ==================== */

const arFaqs: FaqItem[] = [
  {
    q: 'كم تبلغ تكلفة العلاج الطبي في شنغهاي مقارنة بالولايات المتحدة؟',
    a: (
      <>
        <p className="mb-4">
          تكلف الإجراءات الطبية في شنغهاي <strong>أقل بنسبة 50–80%</strong> من تكلفتها في الولايات المتحدة. وفيما يلي أمثلة محددة:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">الإجراء</th>
                <th className="border border-gray-300 px-4 py-2 text-left">التكلفة في الولايات المتحدة</th>
                <th className="border border-gray-300 px-4 py-2 text-left">التكلفة في شنغهاي</th>
                <th className="border border-gray-300 px-4 py-2 text-left">التوفير</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['استبدال مفصل الركبة', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['جراحة المجازة القلبية', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['فحص التصوير بالرنين المغناطيسي (3T)', '$1,200-$3,000', '$200-$400', '90%'],
                ['زراعة الأسنان (لكل سن)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['دورة أطفال الأنابيب (IVF)', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['جراحة الساد (الكتاراكت)', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['فحص صحي شامل', '$2,000-$5,000', '$300-$600', '88%'],
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
          تقدم ShanghaiMed <strong>استشارة أولية مجانية دون أي التزام</strong>، وخدمة <strong>مرافقة داخل المستشفى مقابل 50 دولارًا للساعة</strong> (تُحجز وتُدفع بالساعة؛ الترجمة الفورية بين الإنجليزية والصينية؛ اللغات الأخرى متاحة بتكلفة إضافية)، وثلاث باقات خدمة كونسيرج:{' '}
          <strong>500 دولار ليوم واحد (نهارًا)</strong> (كونسيرج الفحص الصحي، لبرامج الفحص الصحي ليوم واحد فقط)،{' '}
          <strong>1,000 دولار لثلاثة أيام (نهارًا)</strong> (كونسيرج الرعاية الأساسية — مطلوب لجميع استشارات الأخصائيين والحالات المرضية)، و<strong>1,650 دولارًا لخمسة أيام (نهارًا)</strong> (كونسيرج الجراحة والرعاية الممتدة — مطلوب للجراحات والإجراءات التي تتطلب التنويم). ساعات المرافقة الإضافية التي تتجاوز أيام الباقة متاحة مقابل <strong>50 دولارًا للساعة</strong>. خدمة الاستقبال والتوصيل من وإلى المطار تتم بسيارة سيدان قياسية؛ أما المجموعات الأكبر التي تتطلب سيارات بسبعة مقاعد أو سيارات مجهزة للكراسي المتحركة أو مقاعد أطفال فتُرتَّب بتكلفة إضافية. تشمل جميع الباقات الترجمة الفورية الطبية بين الإنجليزية والصينية في الموقع؛ وتُرتب الترجمة بلغات أخرى عند الطلب بأسعار السوق المحلية، ويُحدد السعر أثناء الاستشارة. الدعم الطارئ في الموقع متاح <strong>على مدار الساعة طوال أيام الأسبوع مقابل رسوم إضافية</strong> — <strong>300 دولار للاستدعاء الطارئ (يشمل أول 4 ساعات)، ثم 100 دولار للساعة</strong>. تُفوتر تكاليف العلاج في المستشفيات والعيادات (بما في ذلك باقات الفحص الصحي ابتداءً من ~700 دولار) بشكل منفصل بأسعار محلية؛ ولا تفرض ShanghaiMed أي عمولات على المستشفيات.
        </p>
      </>
    ),
  },
  {
    q: 'هل السياحة العلاجية في شنغهاي آمنة للمرضى الدوليين؟',
    a: (
      <>
        <p className="mb-4"><strong>نعم.</strong> تلبي كبرى مستشفيات شنغهاي معايير السلامة الدولية:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (جامعة فودان) — الدرجة 3A (أعلى تصنيف للمستشفيات في الصين)، 24 شريك تأمين دولي</li>
          <li><strong>Ruijin Hospital</strong> (جامعة شنغهاي جياو تونغ) — الدرجة 3A، رائد وطني في أمراض الدم والعلاج بالخلايا CAR-T، المستوى 7 من السجل الطبي الإلكتروني الوطني</li>
          <li><strong>Zhongshan Hospital</strong> (جامعة فودان) — الدرجة 3A، مبنى مستقل للمرضى الدوليين</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (جامعة شنغهاي جياو تونغ) — الدرجة 3A، مركز وطني لطب وجراحة الأسنان والوجه والفكين والجراحة التجميلية</li>
          <li><strong>Longhua Hospital</strong> (جامعة شنغهاي للطب الصيني التقليدي) — الدرجة 3A، مستشفى تجريبي رسمي للسياحة العلاجية بالطب الصيني التقليدي</li>
        </ul>
        <p>
          تستخدم هذه المستشفيات <strong>نفس المعدات الطبية</strong> (Siemens، GE Healthcare، Philips) و{' '}
          <strong>نفس العلامات التجارية للزرعات</strong> (Stryker، Zimmer، Straumann) الموجودة في المستشفيات الأمريكية. وقد تلقى العديد من كبار الأطباء
          تدريبًا في Johns Hopkins وMayo Clinic وCleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'ما هي المستشفيات في شنغهاي التي تتعامل معها ShanghaiMed؟',
    a: (
      <>
        <p className="mb-4">
          تتعاون ShanghaiMed مع <strong>14 مستشفى حكومي من الدرجة A مرخصًا للسياحة العلاجية</strong> و{' '}
          <strong>5 مستشفيات دولية خاصة</strong> — بإجمالي 19 مؤسسة تغطي جميع التخصصات الطبية:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">المستشفى</th>
                <th className="border border-gray-300 px-4 py-2 text-left">الجامعة</th>
                <th className="border border-gray-300 px-4 py-2 text-left">التخصص الرئيسي</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'جراحة الأعصاب #1، الأمراض الجلدية #1'],
                ["Children's Hospital", 'Fudan University', 'حديثو الولادة، جراحة الأطفال'],
                ['Ruijin Hospital', 'SJTU', 'أمراض الدم (CAR-T)، الغدد الصماء'],
                ['Shanghai General Hospital', '—', 'طب العيون، الأنف والأذن والحنجرة، المسالك البولية'],
                ['Zhongshan Hospital', 'Fudan University', 'أمراض القلب والأوعية الدموية، الجراحة العامة'],
                ['Renji Hospital', 'SJTU', 'أمراض الجهاز الهضمي #1، الطب التناسلي'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'الطب الصيني التقليدي'],
                ['IPMCH', 'China Welfare Institute', 'الطب التناسلي، أمراض النساء والتوليد'],
                ["Shanghai Children's Medical Center", 'SJTU', 'جراحة القلب للأطفال'],
                ["Sixth People's Hospital", '—', 'جراحة العظام (إعادة زرع الأطراف منذ 1963)'],
                ['First Maternity & Infant Hospital', '—', 'أمراض النساء والتوليد، طب الجنين'],
                ['Xinhua Hospital', 'SJTU', 'طب الأطفال، الأمراض الجلدية'],
                ['Huadong Hospital', 'Fudan University', 'طب الشيخوخة، الفحص الصحي'],
                ["Ninth People's Hospital", 'SJTU', 'طب الأسنان #1، الجراحة التجميلية #1'],
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
          بالإضافة إلى 5 مستشفيات دولية خاصة: Jiahui International (تابع لـ Mass General)، وUnited Family، و
          ParkwayHealth، وSinoUnited Health (تعاون مع Mayo Clinic وخدمات الرأي الطبي الثاني)، ومستشفى Raffles.
        </p>
      </>
    ),
  },
  {
    q: 'هل يتحدث الأطباء في شنغهاي اللغة الإنجليزية؟',
    a: (
      <>
        <p className="mb-4">
          خضع العديد من كبار الأطباء في كبرى مستشفيات شنغهاي <strong>لتدريب دولي ويتحدثون الإنجليزية</strong>.
          وينشر الأطباء بانتظام في المجلات الطبية الناطقة بالإنجليزية ويحضرون المؤتمرات الدولية.
        </p>
        <p className="mb-4">
          لضمان عدم وجود أي فجوة في التواصل، توفر ShanghaiMed <strong>مرافقين طبيين محترفين يتحدثون الإنجليزية
          والصينية</strong> يقومون بما يلي:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>مرافقتك في كل موعد طبي</li>
          <li>ترجمة المصطلحات الطبية بدقة</li>
          <li>المساعدة في الأوراق والتنقل داخل المستشفى</li>
          <li>ضمان فهمك الكامل لتشخيصك وخطة العلاج والأدوية</li>
        </ul>
        <p>تُترجم جميع الوثائق الطبية وخطط العلاج والوصفات الطبية <strong>إلى الإنجليزية</strong> لسجلاتك.</p>
      </>
    ),
  },
  {
    q: 'كيف أحصل على تأشيرة طبية للصين؟',
    a: (
      <>
        <p className="mb-4">تساعدك ShanghaiMed في <strong>إجراءات التأشيرة كاملة</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>استشارة أولية</strong> (مجانية، عن بُعد عبر مكالمة فيديو)</li>
          <li><strong>خطاب دعوة طبية</strong> — يصدره المستشفى الشريك بعد الاستشارة</li>
          <li><strong>تقديم طلب التأشيرة</strong> — تقدم خطاب الدعوة إلى السفارة أو القنصلية الصينية</li>
          <li><strong>مدة المعالجة</strong> — عادة من 2 إلى 4 أسابيع</li>
          <li><strong>دعم الوثائق</strong> — توفر ShanghaiMed ترجمة لجميع الوثائق المطلوبة</li>
        </ol>
        <p>
          تقدم الصين <strong>إعفاءً من التأشيرة للعبور لمدة 240 ساعة</strong> لمواطني 54 دولة (بما في ذلك الولايات المتحدة والمملكة
          المتحدة وكندا وأستراليا ومعظم دول الاتحاد الأوروبي)، وهو ما قد يكون كافيًا للرحلات الطبية القصيرة.
        </p>
      </>
    ),
  },
  {
    q: 'ما الذي تشمله باقة خدمات ShanghaiMed؟',
    a: (
      <>
        <p className="mb-2"><strong>استشارة أولية مجانية — 0 دولار</strong></p>
        <p className="mb-1">محادثة في مرحلة اتخاذ القرار دون أي التزام — 4 خدمات:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>تقييم الاحتياجات الطبية</li>
          <li>توصيات بالمستشفيات والأخصائيين</li>
          <li>تقدير الميزانية الطبية</li>
          <li>إرشادات التأمين</li>
        </ul>
        <p className="mb-2"><strong>مرافقة داخل المستشفى — 50 دولارًا للساعة</strong></p>
        <p className="mb-1">تُحجز وتُدفع بالساعة؛ متاحة بشكل مستقل أو كإضافة لأي باقة. 4 خدمات:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>مرافقة في الموقع داخل المستشفى</li>
          <li>ترجمة طبية فورية بين الإنجليزية والصينية في الموقع (اللغات الأخرى بتكلفة إضافية)</li>
          <li>مساعدة في الطوابير والدفع واستلام الأدوية في الموقع</li>
          <li>رسالة تسجيل الوصول في يوم الزيارة</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>ملاحظة:</strong> لا تشمل المرافقة بالساعة جدولة المواعيد، أو اختيار الطبيب، أو الاستقبال من المطار، أو ترجمة التقارير، أو دعم التأشيرة، أو التصريح المسبق من التأمين، أو الترجمة بلغات أخرى غير الإنجليزية، أو المتابعة بعد الزيارة — تغطيها باقات الكونسيرج. بالنسبة لخطط العلاج المتعمقة أو الرحلات متعددة المواعيد، يلزم باقة كونسيرج.
        </p>
        <p className="mb-2"><strong>كونسيرج الفحص الصحي — 500 دولار / يوم واحد (نهارًا)</strong></p>
        <p className="mb-1">13 خدمة كونسيرج — فقط لبرامج الفحص الصحي ليوم واحد:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>يوم كامل من مرافقة ممرضة مسجلة لدى ISPN في الموقع (نهارًا)</li>
          <li>الاستقبال والتوصيل من وإلى المطار</li>
          <li>المساعدة في تنسيق الفندق</li>
          <li>ترجمة طبية فورية بين الإنجليزية والصينية في الموقع في العيادة</li>
          <li>ترجمة تقرير الفحص الصحي وشرح النتائج</li>
          <li>جدولة مواعيد الطبيب</li>
          <li>استلام الأدوية وتوصيلها</li>
          <li>مطابقة المستشفى والأخصائي</li>
          <li>النقل المحلي والدفع والإرشاد على الأرض</li>
          <li>دعم مخصص عبر WhatsApp طوال فترة إقامتك</li>
          <li>دعم خطاب دعوة التأشيرة</li>
          <li>متابعة عن بُعد لمدة 30 يومًا بعد الفحص</li>
          <li>دعم التأمين</li>
        </ul>
        <p className="mb-2"><strong>كونسيرج الرعاية الأساسية — 1,000 دولار / 3 أيام (نهارًا) ✓ الأكثر اختيارًا</strong></p>
        <p className="mb-1">13 خدمة كونسيرج — مطلوب لجميع استشارات الأخصائيين والحالات المرضية:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>3 أيام كاملة من مرافقة ممرضة مسجلة لدى ISPN في الموقع (نهارًا)</li>
          <li>الاستقبال والتوصيل من وإلى المطار</li>
          <li>المساعدة في تنسيق الفندق</li>
          <li>ترجمة طبية فورية بين الإنجليزية والصينية في الموقع في جميع المواعيد</li>
          <li>ترجمة التقارير الطبية وملخصاتها</li>
          <li>جدولة مواعيد الطبيب</li>
          <li>استلام الأدوية وتوصيلها</li>
          <li>مطابقة المستشفى والأخصائي</li>
          <li>النقل المحلي والدفع والإرشاد على الأرض</li>
          <li>دعم مخصص عبر WhatsApp طوال فترة إقامتك</li>
          <li>دعم خطاب دعوة التأشيرة</li>
          <li>متابعة عن بُعد لمدة 30 يومًا بعد العلاج</li>
          <li>دعم التأمين · التصريح المسبق</li>
        </ul>
        <p className="mb-2"><strong>كونسيرج الجراحة والرعاية الممتدة — 1,650 دولارًا / 5 أيام (نهارًا)</strong></p>
        <p className="mb-1">16 خدمة كونسيرج — مطلوب للجراحات والإجراءات التي تتطلب التنويم وخطط العلاج الممتدة. تشمل جميع خدمات الرعاية الأساسية بالإضافة إلى خدمات خاصة بالجراحة:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>5 أيام كاملة من مرافقة ممرضة في الموقع (نهارًا) — قبل الجراحة وفي يومها وبعدها</li>
          <li>الاستقبال والتوصيل من وإلى المطار</li>
          <li>تنسيق الفندق والإقامة الممتدة</li>
          <li>ترجمة طبية فورية بين الإنجليزية والصينية في الموقع (بما في ذلك يوم الجراحة)</li>
          <li>الترجمة الكاملة للوثائق الطبية والإحاطة الجراحية</li>
          <li>موعد الجراح وتنسيق ما قبل التنويم</li>
          <li>التحضير قبل الجراحة وتنسيق التنويم</li>
          <li>استلام الأدوية وتوصيلها</li>
          <li>مطابقة المستشفى والجراح</li>
          <li>زيارات دورية للمريض أثناء الإقامة في المستشفى</li>
          <li>النقل المحلي والمساعدة في الدفع والفوترة والإرشاد على الأرض</li>
          <li>دعم مخصص عبر WhatsApp طوال فترة إقامتك</li>
          <li>دعم خطاب دعوة التأشيرة الطبية</li>
          <li>التواصل مع العائلة وتحديثات التقدم</li>
          <li>متابعة عن بُعد لمدة 60 يومًا بعد العلاج</li>
          <li>التأمين · التصريح المسبق وتنسيق الوديعة الجراحية</li>
        </ul>
        <p className="mb-2"><strong>دعم طارئ في الموقع — متاح على مدار الساعة طوال أيام الأسبوع مقابل رسوم إضافية</strong></p>
        <p className="mb-4">
          <strong>300 دولار للاستدعاء الطارئ (متاح على مدار الساعة طوال أيام الأسبوع، ويشمل أول 4 ساعات)، ثم 100 دولار للساعة.</strong>{' '}
          يغطي الدعم الطارئ الحالات العاجلة خارج ساعات العمل أو في عطلات نهاية الأسبوع أو حالات الرعاية الحادة التي تتطلب مرافقة ممرضة
          في الموقع خارج جدول الكونسيرج المخطط. في حالة الطوارئ الطبية المهددة للحياة، اتصل أولاً بالرقم 120 (رقم الإسعاف الوطني في الصين).
        </p>
        <p>
          <strong>ما هو غير مشمول</strong> (يُفوتر بشكل منفصل بأسعار محلية): تكاليف العلاج الطبي المدفوعة مباشرة للمستشفيات أو العيادات (استشارات الأطباء، والفحوصات، والأدوية، والإجراءات، وباقات الفحص الصحي ابتداءً من ~700 دولار)، والإقامة، والرحلات الجوية الدولية، والترجمة بلغات أخرى غير الإنجليزية، وترقية المركبات للمجموعات الأكبر. لا تفرض ShanghaiMed أي عمولات على المستشفيات.
        </p>
      </>
    ),
  },
  {
    q: 'هل يمكنني الجمع بين العلاج الطبي والسياحة في شنغهاي؟',
    a: (
      <>
        <p className="mb-4">
          <strong>بالتأكيد — هذه هي الفلسفة الأساسية لـ ShanghaiMed.</strong> شنغهاي هي المدينة الأكثر عالمية في الصين وتضم:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>The Bund (واجهة نهر وايتان)</strong> — ممشى مائي شهير على ضفاف النهر</li>
          <li><strong>حديقة يو (Yu Garden)</strong> — حديقة صينية تقليدية عمرها 400 عام</li>
          <li><strong>برج شنغهاي (Shanghai Tower)</strong> — ثاني أطول مبنى في العالم (632 مترًا)</li>
          <li><strong>ديزني لاند شنغهاي (Shanghai Disneyland)</strong> — أكبر قلعة ديزني في العالم</li>
          <li><strong>الحي الفرنسي (French Concession)</strong> — شوارع تصطف على جانبيها الأشجار مع المقاهي والمتاجر</li>
        </ul>
        <p>
          يحدد العديد من المرضى <strong>موعدًا طبيًا في اليوم الأول أو الثاني</strong>، ثم يقضون الأيام المتبقية في استكشاف
          المدينة. تساعدك ShanghaiMed في دمج المواعيد الطبية في خط سير رحلتك حتى لا تضيع وقت إجازتك.
        </p>
      </>
    ),
  },
  {
    q: 'ما هي الإجراءات الطبية الأكثر شيوعًا لدى السياح العلاجيين في شنغهاي؟',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">الفئة</th>
                <th className="border border-gray-300 px-4 py-2 text-left">الإجراءات</th>
                <th className="border border-gray-300 px-4 py-2 text-left">التوفير</th>
                <th className="border border-gray-300 px-4 py-2 text-left">أفضل مستشفى</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['جراحة العظام', 'استبدال الركبة أو الورك، جراحة العمود الفقري', '80%', "Sixth People's / Huashan"],
                ['الجراحة التجميلية', 'تجميل الأنف، إعادة بناء الوجه', '70-80%', "Ninth People's Hospital"],
                ['علاج الأسنان', 'الزرعات، التيجان، تقويم الأسنان', '70-80%', "Ninth People's Hospital"],
                ['الطب الصيني التقليدي', 'الوخز بالإبر، العلاج بالأعشاب، التدليك الطبي (توينا)', '75-80%', 'Longhua Hospital'],
                ['علاج السرطان', 'العلاج الكيميائي، CAR-T، العلاج المناعي', '60-80%', 'Ruijin / Huashan'],
                ['جراحة القلب', 'المجازة، استبدال الصمامات', '80%', 'Zhongshan Hospital'],
                ['علاج الخصوبة', 'أطفال الأنابيب (IVF)، الحقن المجهري (ICSI)', '75%', 'Renji / IPMCH'],
                ['الفحص الصحي', 'فحص تنفيذي ليوم كامل', '88%', 'Huadong Hospital'],
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
    q: 'هل يمكنني استخدام تأميني الصحي الدولي؟',
    a: (
      <>
        <p className="mb-4">
          نعم. لدى المستشفيات الشريكة لـ ShanghaiMed <strong>اتفاقيات تسوية مباشرة</strong> مع كبرى شركات التأمين
          الدولية. ويتراوح عدد شركات التأمين المغطاة من 8 إلى 24 شركة لكل مستشفى:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 شريك تأمين</li>
          <li>Shanghai Children&apos;s Medical Center — 23 شريك تأمين</li>
          <li>Ruijin Hospital — 21 شريك تأمين</li>
          <li>Renji Hospital — 20 شريك تأمين</li>
        </ul>
        <p>
          تشمل شركات التأمين المقبولة <strong>MSH، Bupa، Cigna، Aetna، AXA، Allianz، AIA، International SOS</strong> وغيرها.
          توفر ShanghaiMed دعمًا تأمينيًا يشمل فحص مزايا الوثيقة وخطابات التصريح المسبق. وحيثما تتوفر الفوترة
          المباشرة، ننسق مع المستشفى نيابة عنك؛ وإلا يدفع المريض للمستشفى مباشرة ويطالب بالسداد مع دعمنا بالوثائق.
        </p>
      </>
    ),
  },
  {
    q: 'ماذا يحدث بعد انتهاء علاجي الطبي في شنغهاي؟',
    a: (
      <>
        <p className="mb-4">توفر ShanghaiMed <strong>متابعة شاملة بعد العلاج</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>متابعة عن بُعد عبر الفيديو</strong> مع طبيبك المعالج</li>
          <li><strong>سجلات طبية مترجمة</strong> — ملخص الخروج الكامل ونتائج الفحوصات وقائمة الأدوية بالإنجليزية</li>
          <li><strong>إرشادات الأدوية</strong> — تعليمات الجرعات والآثار الجانبية وتحذيرات التفاعلات</li>
          <li><strong>خطة التعافي</strong> — جدول زمني مخصص وتوصيات بالأنشطة</li>
          <li><strong>التنسيق مع بلد الإقامة</strong> — نشارك سجلاتك الطبية مع طبيبك العام (بموافقتك)</li>
          <li><strong>دعم مستمر</strong> — يظل فريقنا متاحًا للإجابة على أسئلتك بعد عودتك إلى المنزل</li>
        </ul>
        <p>تستمر المتابعة لمدة <strong>30 يومًا</strong> بعد العلاج (60 يومًا لباقات الجراحة).</p>
      </>
    ),
  },
  {
    q: 'هل الاستشارة الأولية مجانية حقًا؟ وماذا تشمل؟',
    a: (
      <>
        <p className="mb-4">
          <strong>نعم.</strong> الاستشارة الأولية مع سارة عبر WhatsApp مجانية تمامًا ودون أي التزام.
          خلال المكالمة، نقوم بتقييم احتياجاتك الطبية، ونوصي بالمستشفيات والأخصائيين المناسبين، ونقدم لك
          تقديرًا واقعيًا لميزانية العلاج، ونشرح كيفية عمل التأمين.
        </p>
        <p>
          هذه محادثة في مرحلة اتخاذ القرار؛ تبدأ الخدمات في الموقع (مرافقة الممرضة، جدولة المواعيد، الترجمة
          الشفهية) بمجرد حجز مرافقة بالساعة أو باقة كونسيرج.
        </p>
      </>
    ),
  },
  {
    q: 'هل يمكنني حجز مرافقة داخل المستشفى فقط دون باقة كونسيرج كاملة؟',
    a: (
      <>
        <p className="mb-4">
          <strong>نعم.</strong> تتوفر مرافقة المستشفى في الموقع كخدمة مستقلة مقابل <strong>50 دولارًا للساعة</strong>،
          تُحجز وتُدفع بالساعة. وهي متاحة أيضًا كإضافة لأي باقة كونسيرج لساعات إضافية أو
          مواعيد إضافية. هذه الخدمة مخصصة للمرضى الذين حجزوا موعدهم الطبي بأنفسهم بالفعل و
          يحتاجون فقط إلى مرافق طبي يتحدث الإنجليزية والصينية في الموقع للطوابير والدفع واستلام الأدوية
          والأسئلة الأساسية في المكان.
        </p>
        <p className="mb-4">
          الترجمة تكون <strong>بين الإنجليزية والصينية</strong>؛
          وتُرتب اللغات الأخرى عند الطلب بتكلفة إضافية، ويُحدد السعر أثناء الاستشارة.
        </p>
        <p>
          لا تشمل المرافقة بالساعة <strong>إطلاقًا</strong> جدولة المواعيد، أو اختيار الطبيب، أو الاستقبال من المطار،
          أو ترجمة التقارير، أو دعم التأشيرة، أو التصريح المسبق من التأمين، أو المتابعة بعد الزيارة — تغطيها
          باقات الكونسيرج (500/1,000/1,650 دولارًا).
        </p>
      </>
    ),
  },
]

/* ==================== Bahasa Malaysia Version ==================== */

const msFaqs: FaqItem[] = [
  {
    q: 'Berapakah kos rawatan perubatan di Shanghai berbanding dengan AS?',
    a: (
      <>
        <p className="mb-4">
          Prosedur perubatan di Shanghai menelan kos <strong>50-80% kurang</strong> berbanding di AS. Berikut ialah contoh khusus:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Prosedur</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Kos AS</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Kos Shanghai</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Penjimatan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Penggantian lutut', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Pintasan jantung', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['Imbasan MRI (3T)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Implan pergigian (setiap gigi)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['Kitaran IVF', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Pembedahan katarak', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Pemeriksaan kesihatan komprehensif', '$2,000-$5,000', '$300-$600', '88%'],
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
          ShanghaiMed menawarkan <strong>konsultasi awal percuma tanpa obligasi</strong>, perkhidmatan
          <strong> pengiring hospital di lokasi secara berasingan pada $50/jam</strong> (ditempah dan dibayar mengikut jam;
          tafsiran Inggeris–Cina; bahasa lain tersedia dengan kos tambahan), dan tiga pakej perkhidmatan concierge:{' '}
          <strong>$500 untuk 1 hari (siang hari)</strong> (Health Checkup Concierge, untuk program pemeriksaan kesihatan
          1 hari sahaja), <strong>$1,000 untuk 3 hari (siang hari)</strong> (Essential Care Concierge — diperlukan untuk
          semua konsultasi pakar dan keadaan perubatan), dan <strong>$1,650 untuk 5 hari (siang hari)</strong> (Surgery
          &amp; Extended Care Concierge — diperlukan untuk pembedahan dan prosedur pesakit dalam). Jam pengiring tambahan
          melebihi hari pakej tersedia pada <strong>$50/jam</strong>. Pengambilan &amp; penghantaran lapangan terbang
          menggunakan sedan standard; kumpulan yang lebih besar yang memerlukan kenderaan 7 tempat duduk, van kerusi
          roda, atau tempat duduk kanak-kanak diatur dengan kos tambahan. Semua pakej termasuk tafsiran perubatan
          Inggeris–Cina di lokasi; tafsiran dalam bahasa lain diatur atas permintaan pada kadar pasaran tempatan, yang
          disebut harga semasa konsultasi. Sokongan kecemasan di lokasi tersedia <strong>24/7 dengan bayaran tambahan</strong>
          — <strong>panggilan kecemasan $300 (termasuk 4 jam pertama), kemudian $100/jam</strong>. Kos rawatan hospital dan
          klinik (termasuk pakej pemeriksaan kesihatan bermula daripada ~$700) dibil secara berasingan pada kadar tempatan;
          ShanghaiMed tidak mengenakan komisen hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Adakah pelancongan perubatan di Shanghai selamat untuk pesakit antarabangsa?',
    a: (
      <>
        <p className="mb-4"><strong>Ya.</strong> Hospital terkemuka Shanghai memenuhi piawaian keselamatan antarabangsa:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Universiti Fudan) — Grade 3A (penarafan hospital tertinggi China), 24 rakan kongsi insurans antarabangsa</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — Grade 3A, peneraju kebangsaan dalam hematologi dan terapi sel CAR-T, EMR Nasional Tahap 7</li>
          <li><strong>Zhongshan Hospital</strong> (Universiti Fudan) — Grade 3A, bangunan pesakit antarabangsa yang berasingan</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (SJTU) — Grade 3A, pusat kebangsaan untuk pembedahan pergigian, mulut, dan plastik</li>
          <li><strong>Longhua Hospital</strong> (Universiti TCM Shanghai) — Grade 3A, hospital perintis pelancongan perubatan TCM rasmi</li>
        </ul>
        <p>
          Hospital-hospital ini menggunakan <strong>peralatan perubatan yang sama</strong> (Siemens, GE Healthcare, Philips) dan{' '}
          <strong>jenama implan yang sama</strong> (Stryker, Zimmer, Straumann) yang terdapat di hospital AS. Ramai doktor kanan
          telah berlatih di Johns Hopkins, Mayo Clinic, dan Cleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'Hospital manakah di Shanghai yang bekerjasama dengan ShanghaiMed?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed bekerjasama dengan <strong>14 hospital awam perintis pelancongan perubatan Gred A</strong> dan{' '}
          <strong>5 hospital antarabangsa swasta</strong> — sejumlah 19 institusi meliputi setiap kepakaran perubatan:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Hospital</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Universiti</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Kepakaran Utama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Neurosurgeri #1, Dermatologi #1'],
                ["Children's Hospital", 'Fudan University', 'Neonatologi, Pembedahan Pediatrik'],
                ['Ruijin Hospital', 'SJTU', 'Hematologi (CAR-T), Endokrinologi'],
                ['Shanghai General Hospital', '—', 'Oftalmologi, ENT, Urologi'],
                ['Zhongshan Hospital', 'Fudan University', 'Kardiovaskular, Pembedahan Am'],
                ['Renji Hospital', 'SJTU', 'Gastroenterologi #1, Perubatan Reproduktif'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Perubatan Tradisional Cina'],
                ['IPMCH', 'China Welfare Institute', 'Perubatan Reproduktif, Obstetrik'],
                ["Shanghai Children's Medical Center", 'SJTU', 'Pembedahan Jantung Pediatrik'],
                ["Sixth People's Hospital", '—', 'Ortopedik (pemindahan anggota sejak 1963)'],
                ['First Maternity & Infant Hospital', '—', 'Obstetrik, Perubatan Fetus'],
                ['Xinhua Hospital', 'SJTU', 'Pediatrik, Dermatologi'],
                ['Huadong Hospital', 'Fudan University', 'Perubatan Geriatrik, Pemeriksaan Kesihatan'],
                ["Ninth People's Hospital", 'SJTU', 'Pergigian #1, Pembedahan Plastik #1'],
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
          Ditambah 5 hospital antarabangsa swasta: Jiahui International (gabungan Mass General), United Family,
          ParkwayHealth, SinoUnited Health (kolaborasi Mayo Clinic dan perkhidmatan pendapat kedua), dan Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Adakah doktor di Shanghai bertutur dalam bahasa Inggeris?',
    a: (
      <>
        <p className="mb-4">
          Ramai doktor kanan di hospital terkemuka Shanghai mempunyai <strong>latihan antarabangsa dan bertutur dalam bahasa Inggeris</strong>.
          Doktor kerap menerbitkan dalam jurnal perubatan berbahasa Inggeris dan menghadiri persidangan antarabangsa.
        </p>
        <p className="mb-4">
          Untuk menjamin tiada jurang komunikasi, ShanghaiMed menyediakan <strong>pendamping perubatan
          Inggeris–Cina profesional</strong> yang:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Mengiringi anda ke setiap temujanji</li>
          <li>Menterjemah terminologi perubatan dengan tepat</li>
          <li>Membantu dengan kertas kerja hospital dan navigasi</li>
          <li>Memastikan anda memahami sepenuhnya diagnosis, pelan rawatan, dan ubat-ubatan anda</li>
        </ul>
        <p>Semua dokumen perubatan, pelan rawatan, dan preskripsi <strong>diterjemahkan ke dalam bahasa Inggeris</strong> untuk rekod anda.</p>
      </>
    ),
  },
  {
    q: 'Bagaimanakah saya mendapatkan visa perubatan untuk China?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed membantu dengan <strong>proses visa yang lengkap</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Konsultasi awal</strong> (percuma, dari jauh melalui panggilan video)</li>
          <li><strong>Surat jemputan perubatan</strong> — dikeluarkan oleh hospital rakan kongsi selepas konsultasi</li>
          <li><strong>Permohonan visa</strong> — anda menyerahkan surat jemputan kepada kedutaan/konsulat China</li>
          <li><strong>Masa pemprosesan</strong> — biasanya 2-4 minggu</li>
          <li><strong>Sokongan dokumen</strong> — ShanghaiMed menyediakan terjemahan semua dokumen yang diperlukan</li>
        </ol>
        <p>
          China menawarkan <strong>pengecualian visa transit 240 jam</strong> untuk warganegara 54 negara (termasuk AS, UK,
          Kanada, Australia, dan kebanyakan negara EU), yang mungkin mencukupi untuk perjalanan perubatan yang lebih singkat.
        </p>
      </>
    ),
  },
  {
    q: 'Apakah yang termasuk dalam pakej perkhidmatan ShanghaiMed?',
    a: (
      <>
        <p className="mb-2"><strong>Konsultasi Awal Percuma — $0</strong></p>
        <p className="mb-1">Perbualan peringkat keputusan tanpa obligasi — 4 perkhidmatan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Penilaian keperluan perubatan</li>
          <li>Cadangan hospital &amp; pakar</li>
          <li>Anggaran belanjawan perubatan</li>
          <li>Panduan insurans</li>
        </ul>
        <p className="mb-2"><strong>Pengiring Hospital di Lokasi — $50/jam</strong></p>
        <p className="mb-1">Ditempah dan dibayar mengikut jam; tersedia secara kendiri atau sebagai tambahan kepada mana-mana pakej. 4 perkhidmatan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Pendamping di lokasi di hospital</li>
          <li>Tafsiran perubatan Inggeris–Cina di lokasi (bahasa lain dengan kos tambahan)</li>
          <li>Bantuan beratur, pembayaran, dan pengambilan ubat di lokasi</li>
          <li>Mesej daftar masuk pada hari lawatan</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>Nota:</strong> Pengiring setiap jam TIDAK termasuk penjadualan temujanji, padanan doktor, pengambilan lapangan terbang, terjemahan laporan, sokongan visa, pra-kebenaran insurans, tafsiran dalam bahasa selain Inggeris, atau susulan selepas lawatan — tersebut diliputi oleh pakej concierge. Untuk perancangan rawatan mendalam atau perjalanan berbilang temujanji, pakej concierge diperlukan.
        </p>
        <p className="mb-2"><strong>Health Checkup Concierge — $500 / 1 hari (siang hari)</strong></p>
        <p className="mb-1">13 perkhidmatan concierge — untuk program pemeriksaan kesihatan 1 hari sahaja:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>1 hari penuh pengiringan jururawat berdaftar ISPN di lokasi (siang hari)</li>
          <li>Pengambilan &amp; penghantaran lapangan terbang</li>
          <li>Bantuan penyelarasan hotel</li>
          <li>Tafsiran perubatan Inggeris–Cina di klinik</li>
          <li>Terjemahan laporan pemeriksaan kesihatan dan penjelasan keputusan</li>
          <li>Penjadualan temujanji doktor</li>
          <li>Pengambilan &amp; penghantaran ubat</li>
          <li>Padanan hospital &amp; pakar</li>
          <li>Pengangkutan tempatan, pembayaran, dan bimbingan di lapangan</li>
          <li>Sokongan WhatsApp berdedikasi sepanjang penginapan anda</li>
          <li>Sokongan surat jemputan visa</li>
          <li>Susulan jauh 30 hari selepas pemeriksaan</li>
          <li>Sokongan insurans</li>
        </ul>
        <p className="mb-2"><strong>Essential Care Concierge — $1,000 / 3 hari (siang hari) ✓ Paling biasa dipilih</strong></p>
        <p className="mb-1">13 perkhidmatan concierge — diperlukan untuk semua konsultasi pakar dan keadaan perubatan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>3 hari penuh pengiringan jururawat berdaftar ISPN di lokasi (siang hari)</li>
          <li>Pengambilan &amp; penghantaran lapangan terbang</li>
          <li>Bantuan penyelarasan hotel</li>
          <li>Tafsiran perubatan Inggeris–Cina di semua temujanji</li>
          <li>Terjemahan dan ringkasan laporan perubatan</li>
          <li>Penjadualan temujanji doktor</li>
          <li>Pengambilan &amp; penghantaran ubat</li>
          <li>Padanan hospital &amp; pakar</li>
          <li>Pengangkutan tempatan, pembayaran, dan bimbingan di lapangan</li>
          <li>Sokongan WhatsApp berdedikasi sepanjang penginapan anda</li>
          <li>Sokongan surat jemputan visa</li>
          <li>Susulan jauh 30 hari selepas penjagaan</li>
          <li>Sokongan insurans · pra-kebenaran</li>
        </ul>
        <p className="mb-2"><strong>Surgery &amp; Extended Care Concierge — $1,650 / 5 hari (siang hari)</strong></p>
        <p className="mb-1">16 perkhidmatan concierge — diperlukan untuk pembedahan, prosedur pesakit dalam, dan pelan rawatan lanjutan. Termasuk semua perkhidmatan Essential Care serta sokongan khusus pembedahan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>5 hari penuh pengiringan jururawat di lokasi (siang hari) — pra-op, hari pembedahan &amp; pasca-op</li>
          <li>Pengambilan &amp; penghantaran lapangan terbang</li>
          <li>Penyelarasan hotel &amp; penginapan lanjutan</li>
          <li>Tafsiran perubatan Inggeris–Cina (termasuk hari pembedahan)</li>
          <li>Terjemahan dokumen perubatan penuh &amp; taklimat pembedahan</li>
          <li>Temujanji pakar bedah &amp; penyelarasan pra-kemasukan</li>
          <li>Persediaan pra-pembedahan &amp; penyelarasan kemasukan</li>
          <li>Pengambilan &amp; penghantaran ubat</li>
          <li>Padanan hospital &amp; pakar bedah</li>
          <li>Lawatan pesakit dalam semasa penginapan hospital</li>
          <li>Pengangkutan tempatan, bantuan pembayaran/bil, dan bimbingan di lapangan</li>
          <li>Sokongan WhatsApp berdedikasi sepanjang penginapan anda</li>
          <li>Sokongan surat jemputan visa perubatan</li>
          <li>Komunikasi keluarga &amp; kemas kini kemajuan</li>
          <li>Susulan jauh 60 hari selepas penjagaan</li>
          <li>Insurans · pra-kebenaran &amp; penyelarasan deposit pembedahan</li>
        </ul>
        <p className="mb-2"><strong>Sokongan kecemasan di lokasi — tersedia 24/7 dengan bayaran tambahan</strong></p>
        <p className="mb-4">
          <strong>$300 panggilan kecemasan (tersedia 24/7, termasuk 4 jam pertama), kemudian $100/jam.</strong>{' '}
          Sokongan kecemasan meliputi situasi selepas waktu kerja, hujung minggu, atau penjagaan akut yang memerlukan
          pengiringan jururawat di lokasi di luar jadual concierge yang dirancang. Dalam kecemasan perubatan yang mengancam nyawa,
          hubungi 120 (nombor ambulans nasional China) dahulu.
        </p>
        <p>
          <strong>Apa yang TIDAK termasuk</strong> (dibil secara berasingan pada kadar tempatan): Kos rawatan perubatan yang dibayar terus ke hospital/klinik (konsultasi doktor, ujian, ubat-ubatan, prosedur, dan pakej pemeriksaan kesihatan bermula daripada ~$700), penginapan, penerbangan antarabangsa, tafsiran dalam bahasa selain Inggeris, dan naik taraf kenderaan untuk kumpulan yang lebih besar. ShanghaiMed tidak mengenakan komisen hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Bolehkah saya menggabungkan rawatan perubatan dengan pelancongan di Shanghai?',
    a: (
      <>
        <p className="mb-4">
          <strong>Sudah tentu — inilah falsafah teras ShanghaiMed.</strong> Shanghai ialah bandar paling antarabangsa di China dengan:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>The Bund</strong> — persiaran tepi air ikonik</li>
          <li><strong>Yu Garden</strong> — taman Cina klasik berusia 400 tahun</li>
          <li><strong>Shanghai Tower</strong> — bangunan kedua tertinggi di dunia (632m)</li>
          <li><strong>Shanghai Disneyland</strong> — istana Disney terbesar di dunia</li>
          <li><strong>French Concession</strong> — jalan yang dibarisi pokok dengan kafe dan butik</li>
        </ul>
        <p>
          Ramai pesakit menjadualkan <strong>temujanji perubatan pada Hari 1-2</strong>, kemudian menghabiskan baki hari meneroka
          bandar. ShanghaiMed membantu anda mengintegrasikan temujanji perubatan ke dalam jadual perjalanan anda supaya anda tidak
          membuang masa percutian.
        </p>
      </>
    ),
  },
  {
    q: 'Apakah prosedur perubatan yang paling popular untuk pelancong perubatan di Shanghai?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Prosedur</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Penjimatan</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Hospital Utama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pembedahan ortopedik', 'Penggantian lutut/pinggul, pembedahan tulang belakang', '80%', "Sixth People's / Huashan"],
                ['Pembedahan plastik', 'Rinoplasti, pembinaan semula muka', '70-80%', "Ninth People's Hospital"],
                ['Rawatan pergigian', 'Implan, mahkota, ortodontik', '70-80%', "Ninth People's Hospital"],
                ['TCM', 'Akupunktur, terapi herba, Tuina', '75-80%', 'Longhua Hospital'],
                ['Rawatan kanser', 'Kemoterapi, CAR-T, imunoterapi', '60-80%', 'Ruijin / Huashan'],
                ['Pembedahan jantung', 'Pintasan, penggantian injap', '80%', 'Zhongshan Hospital'],
                ['Rawatan kesuburan', 'IVF, ICSI', '75%', 'Renji / IPMCH'],
                ['Pemeriksaan kesihatan', 'Pemeriksaan eksekutif sehari penuh', '88%', 'Huadong Hospital'],
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
    q: 'Bolehkah saya menggunakan insurans kesihatan antarabangsa saya?',
    a: (
      <>
        <p className="mb-4">
          Ya. Hospital rakan kongsi ShanghaiMed mempunyai <strong>perjanjian penyelesaian terus</strong> dengan penanggung insurans
          antarabangsa utama. Perlindungan berkisar dari 8 hingga 24 penanggung insurans setiap hospital:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 rakan kongsi insurans</li>
          <li>Shanghai Children&apos;s Medical Center — 23 rakan kongsi insurans</li>
          <li>Ruijin Hospital — 21 rakan kongsi insurans</li>
          <li>Renji Hospital — 20 rakan kongsi insurans</li>
        </ul>
        <p>
          Penanggung insurans yang diterima termasuk <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS,</strong> dan banyak lagi.
          ShanghaiMed menyediakan sokongan insurans termasuk semakan manfaat polisi dan surat pra-kebenaran. Di mana penyelesaian
          terus tersedia kami menyelaraskan dengan hospital bagi pihak anda; jika tidak pesakit membayar hospital secara terus
          dan menuntut pembayaran balik dengan sokongan dokumentasi kami.
        </p>
      </>
    ),
  },
  {
    q: 'Apakah yang berlaku selepas rawatan perubatan saya di Shanghai?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed menyediakan <strong>susulan selepas rawatan yang komprehensif</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Pemeriksaan video dari jauh</strong> dengan doktor yang merawat anda</li>
          <li><strong>Rekod perubatan yang diterjemahkan</strong> — ringkasan keluar penuh, keputusan ujian, dan senarai ubat dalam bahasa Inggeris</li>
          <li><strong>Panduan ubat-ubatan</strong> — arahan dos, kesan sampingan, dan amaran interaksi</li>
          <li><strong>Perancangan pemulihan</strong> — garis masa peribadi dan cadangan aktiviti</li>
          <li><strong>Penyelarasan negara asal</strong> — kami berkongsi rekod perubatan anda dengan doktor penjagaan primer anda (dengan persetujuan)</li>
          <li><strong>Sokongan berterusan</strong> — pasukan kami kekal tersedia untuk soalan selepas anda pulang ke rumah</li>
        </ul>
        <p>Susulan berterusan selama <strong>30 hari</strong> selepas rawatan anda (60 hari untuk pakej pembedahan).</p>
      </>
    ),
  },
  {
    q: 'Adakah konsultasi awal benar-benar percuma? Apakah yang diliputinya?',
    a: (
      <>
        <p className="mb-4">
          <strong>Ya.</strong> Konsultasi awal dengan Sara melalui WhatsApp adalah benar-benar percuma dan tidak membawa
          sebarang obligasi. Semasa panggilan, kami menilai keperluan perubatan anda, mengesyorkan hospital dan pakar yang sesuai,
          memberikan anggaran belanjawan yang realistik untuk rawatan, dan menerangkan cara insurans berfungsi.
        </p>
        <p>
          Ini ialah perbualan peringkat keputusan; perkhidmatan di lokasi (pengiringan jururawat, tempahan temujanji,
          tafsiran lisan) bermula sebaik sahaja anda menempah pengiring setiap jam atau pakej concierge.
        </p>
      </>
    ),
  },
  {
    q: 'Bolehkah saya menempah pengiring hospital di lokasi sahaja tanpa pakej concierge penuh?',
    a: (
      <>
        <p className="mb-4">
          <strong>Ya.</strong> Pengiring hospital di lokasi tersedia sebagai perkhidmatan kendiri pada <strong>$50/jam</strong>,
          ditempah dan dibayar mengikut jam. Ia juga tersedia sebagai tambahan kepada mana-mana pakej concierge untuk jam tambahan
          atau temujanji tambahan. Ini adalah untuk pesakit yang telah menempah temujanji doktor mereka sendiri dan hanya
          memerlukan pendamping perubatan Inggeris–Cina di lokasi untuk beratur, pembayaran, pengambilan ubat, dan soalan
          asas di lokasi.
        </p>
        <p className="mb-4">
          Tafsiran adalah <strong>Inggeris–Cina</strong>;
          bahasa lain diatur atas permintaan dengan kos tambahan, yang disebut harga semasa konsultasi.
        </p>
        <p>
          Pengiring setiap jam <strong>TIDAK</strong> termasuk penjadualan temujanji, padanan doktor, pengambilan lapangan terbang,
          terjemahan laporan, sokongan visa, pra-kebenaran insurans, atau susulan selepas lawatan — tersebut diliputi oleh
          pakej concierge ($500/$1,000/$1,650).
        </p>
      </>
    ),
  },
]

/* ==================== Bahasa Indonesia Version ==================== */

const idFaqs: FaqItem[] = [
  {
    q: 'Berapa biaya pengobatan medis di Shanghai dibandingkan dengan AS?',
    a: (
      <>
        <p className="mb-4">
          Prosedur medis di Shanghai berbiaya <strong>50-80% lebih murah</strong> dibandingkan di AS. Berikut adalah contoh spesifik:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Prosedur</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Biaya AS</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Biaya Shanghai</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Penghematan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Penggantian lutut', '$30,000-$50,000', '$5,000-$10,000', '80%'],
                ['Bypass jantung', '$80,000-$150,000', '$11,000-$21,000', '80%'],
                ['Pemindaian MRI (3T)', '$1,200-$3,000', '$200-$400', '90%'],
                ['Implan gigi (per gigi)', '$4,000-$6,000', '$800-$1,200', '80%'],
                ['Siklus IVF', '$12,000-$15,000', '$3,000-$5,000', '75%'],
                ['Operasi katarak', '$3,500-$6,000', '$1,000-$2,000', '70%'],
                ['Pemeriksaan kesehatan komprehensif', '$2,000-$5,000', '$300-$600', '88%'],
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
          ShanghaiMed menawarkan <strong>konsultasi awal gratis tanpa kewajiban</strong>, layanan
          <strong> pendamping rumah sakit di lokasi mandiri seharga $50/jam</strong> (dipesan dan dibayar per jam;
          interpretasi Inggris–Tiongkok; bahasa lain tersedia dengan biaya tambahan), dan tiga paket layanan concierge:{' '}
          <strong>$500 untuk 1 hari (siang hari)</strong> (Health Checkup Concierge, khusus untuk program pemeriksaan kesehatan
          1 hari), <strong>$1,000 untuk 3 hari (siang hari)</strong> (Essential Care Concierge — diperlukan untuk
          semua konsultasi spesialis dan kondisi medis), dan <strong>$1,650 untuk 5 hari (siang hari)</strong> (Surgery
          &amp; Extended Care Concierge — diperlukan untuk pembedahan dan prosedur rawat inap). Jam pendamping tambahan
          di luar hari paket tersedia dengan tarif <strong>$50/jam</strong>. Penjemputan &amp; pengantaran bandara
          menggunakan sedan standar; rombongan lebih besar yang membutuhkan kendaraan 7 kursi, van kursi roda, atau kursi
          anak diatur dengan biaya tambahan. Semua paket mencakup interpretasi medis
          Inggris–Tiongkok di lokasi; interpretasi dalam bahasa lain diatur atas permintaan dengan tarif pasar lokal, yang
          dikutip selama konsultasi. Dukungan darurat di lokasi tersedia <strong>24/7 dengan biaya tambahan</strong>
          — <strong>panggilan darurat $300 (termasuk 4 jam pertama), kemudian $100/jam</strong>. Biaya perawatan rumah sakit dan
          klinik (termasuk paket pemeriksaan kesehatan mulai dari ~$700) ditagih terpisah sesuai tarif lokal;
          ShanghaiMed tidak mengenakan komisi rumah sakit.
        </p>
      </>
    ),
  },
  {
    q: 'Apakah wisata medis di Shanghai aman untuk pasien internasional?',
    a: (
      <>
        <p className="mb-4"><strong>Ya.</strong> Rumah sakit terkemuka Shanghai memenuhi standar keamanan internasional:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Huashan Hospital</strong> (Universitas Fudan) — Grade 3A (peringkat rumah sakit tertinggi Tiongkok), 24 mitra asuransi internasional</li>
          <li><strong>Ruijin Hospital</strong> (SJTU) — Grade 3A, pemimpin nasional dalam hematologi dan terapi sel CAR-T, EMR Nasional Level 7</li>
          <li><strong>Zhongshan Hospital</strong> (Universitas Fudan) — Grade 3A, gedung pasien internasional yang berdiri sendiri</li>
          <li><strong>Shanghai Ninth People&apos;s Hospital</strong> (SJTU) — Grade 3A, pusat nasional untuk bedah gigi, mulut, dan plastik</li>
          <li><strong>Longhua Hospital</strong> (Universitas TCM Shanghai) — Grade 3A, rumah sakit percontohan wisata medis TCM resmi</li>
        </ul>
        <p>
          Rumah sakit-rumah sakit ini menggunakan <strong>peralatan medis yang sama</strong> (Siemens, GE Healthcare, Philips) dan{' '}
          <strong>merek implan yang sama</strong> (Stryker, Zimmer, Straumann) yang ditemukan di rumah sakit AS. Banyak dokter senior
          telah berlatih di Johns Hopkins, Mayo Clinic, dan Cleveland Clinic.
        </p>
      </>
    ),
  },
  {
    q: 'Rumah sakit mana di Shanghai yang bekerja sama dengan ShanghaiMed?',
    a: (
      <>
        <p className="mb-4">
          ShanghaiMed bermitra dengan <strong>14 rumah sakit publik percontohan wisata medis Grade-A</strong> dan{' '}
          <strong>5 rumah sakit internasional swasta</strong> — total 19 institusi mencakup setiap spesialisasi medis:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Rumah Sakit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Universitas</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Spesialisasi Utama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Huashan Hospital', 'Fudan University', 'Bedah Saraf #1, Dermatologi #1'],
                ["Children's Hospital", 'Fudan University', 'Neonatologi, Bedah Anak'],
                ['Ruijin Hospital', 'SJTU', 'Hematologi (CAR-T), Endokrinologi'],
                ['Shanghai General Hospital', '—', 'Oftalmologi, THT, Urologi'],
                ['Zhongshan Hospital', 'Fudan University', 'Kardiovaskular, Bedah Umum'],
                ['Renji Hospital', 'SJTU', 'Gastroenterologi #1, Kedokteran Reproduksi'],
                ['Longhua Hospital', 'Shanghai Univ. of TCM', 'Pengobatan Tradisional Tiongkok'],
                ['IPMCH', 'China Welfare Institute', 'Kedokteran Reproduksi, Obstetri'],
                ["Shanghai Children's Medical Center", 'SJTU', 'Bedah Jantung Anak'],
                ["Sixth People's Hospital", '—', 'Ortopedi (replantasi anggota sejak 1963)'],
                ['First Maternity & Infant Hospital', '—', 'Obstetri, Kedokteran Janin'],
                ['Xinhua Hospital', 'SJTU', 'Pediatri, Dermatologi'],
                ['Huadong Hospital', 'Fudan University', 'Kedokteran Geriatri, Skrining Kesehatan'],
                ["Ninth People's Hospital", 'SJTU', 'Gigi #1, Bedah Plastik #1'],
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
          Ditambah 5 rumah sakit internasional swasta: Jiahui International (afiliasi Mass General), United Family,
          ParkwayHealth, SinoUnited Health (kolaborasi Mayo Clinic dan layanan pendapat kedua), dan Raffles Hospital.
        </p>
      </>
    ),
  },
  {
    q: 'Apakah dokter di Shanghai berbicara bahasa Inggris?',
    a: (
      <>
        <p className="mb-4">
          Banyak dokter senior di rumah sakit terkemuka Shanghai memiliki <strong>pelatihan internasional dan berbicara bahasa Inggris</strong>.
          Dokter secara rutin menerbitkan artikel di jurnal medis berbahasa Inggris dan menghadiri konferensi internasional.
        </p>
        <p className="mb-4">
          Untuk menjamin tidak ada kesenjangan komunikasi, ShanghaiMed menyediakan <strong>pendamping medis
          Inggris–Tiongkok profesional</strong> yang:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Mendampingi Anda ke setiap janji temu</li>
          <li>Menerjemahkan terminologi medis secara akurat</li>
          <li>Membantu urusan administrasi rumah sakit dan navigasi</li>
          <li>Memastikan Anda memahami sepenuhnya diagnosis, rencana pengobatan, dan obat-obatan Anda</li>
        </ul>
        <p>Semua dokumen medis, rencana pengobatan, dan resep <strong>diterjemahkan ke dalam bahasa Inggris</strong> untuk catatan Anda.</p>
      </>
    ),
  },
  {
    q: 'Bagaimana cara mendapatkan visa medis untuk Tiongkok?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed membantu <strong>proses visa secara lengkap</strong>:</p>
        <ol className="list-decimal pl-6 mb-4 space-y-1">
          <li><strong>Konsultasi awal</strong> (gratis, jarak jauh melalui panggilan video)</li>
          <li><strong>Surat undangan medis</strong> — dikeluarkan oleh rumah sakit mitra setelah konsultasi</li>
          <li><strong>Pengajuan visa</strong> — Anda menyerahkan surat undangan ke kedutaan/konsulat Tiongkok</li>
          <li><strong>Waktu pemrosesan</strong> — biasanya 2-4 minggu</li>
          <li><strong>Dukungan dokumen</strong> — ShanghaiMed menyediakan terjemahan semua dokumen yang diperlukan</li>
        </ol>
        <p>
          Tiongkok menawarkan <strong>pengecualian visa transit 240 jam</strong> untuk warga negara dari 54 negara (termasuk AS, Inggris,
          Kanada, Australia, dan sebagian besar negara UE), yang mungkin cukup untuk perjalanan medis yang lebih singkat.
        </p>
      </>
    ),
  },
  {
    q: 'Apa yang termasuk dalam paket layanan ShanghaiMed?',
    a: (
      <>
        <p className="mb-2"><strong>Konsultasi Awal Gratis — $0</strong></p>
        <p className="mb-1">Percakapan tahap keputusan tanpa kewajiban — 4 layanan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Penilaian kebutuhan medis</li>
          <li>Rekomendasi rumah sakit &amp; spesialis</li>
          <li>Estimasi anggaran medis</li>
          <li>Panduan asuransi</li>
        </ul>
        <p className="mb-2"><strong>Pendamping Rumah Sakit di Lokasi — $50/jam</strong></p>
        <p className="mb-1">Dipesan dan dibayar per jam; tersedia secara mandiri atau sebagai tambahan untuk paket mana pun. 4 layanan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Pendamping di lokasi di rumah sakit</li>
          <li>Interpretasi medis Inggris–Tiongkok di lokasi (bahasa lain dengan biaya tambahan)</li>
          <li>Bantuan antrean, pembayaran, dan pengambilan obat di lokasi</li>
          <li>Pesan check-in pada hari kunjungan</li>
        </ul>
        <p className="mb-4 text-sm text-amber-700 bg-amber-50 p-3 rounded">
          <strong>Catatan:</strong> Pendamping per jam TIDAK termasuk penjadwalan janji temu, pencocokan dokter, penjemputan bandara, penerjemahan laporan, dukungan visa, pra-otorisasi asuransi, interpretasi dalam bahasa selain Inggris, atau tindak lanjut pasca-kunjungan — hal-hal tersebut dicakup oleh paket concierge. Untuk perencanaan pengobatan mendalam atau perjalanan dengan banyak janji temu, paket concierge diperlukan.
        </p>
        <p className="mb-2"><strong>Health Checkup Concierge — $500 / 1 hari (siang hari)</strong></p>
        <p className="mb-1">13 layanan concierge — khusus untuk program pemeriksaan kesehatan 1 hari:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>1 hari penuh pendampingan perawat terdaftar ISPN di lokasi (siang hari)</li>
          <li>Penjemputan &amp; pengantaran bandara</li>
          <li>Bantuan koordinasi hotel</li>
          <li>Interpretasi medis Inggris–Tiongkok di klinik</li>
          <li>Penerjemahan laporan pemeriksaan kesehatan dan penjelasan hasil</li>
          <li>Penjadwalan janji temu dokter</li>
          <li>Pengambilan &amp; pengantaran obat</li>
          <li>Pencocokan rumah sakit &amp; spesialis</li>
          <li>Transportasi lokal, pembayaran, dan bimbingan di lapangan</li>
          <li>Dukungan WhatsApp khusus selama Anda menginap</li>
          <li>Dukungan surat undangan visa</li>
          <li>Tindak lanjut jarak jauh 30 hari setelah pemeriksaan</li>
          <li>Dukungan asuransi</li>
        </ul>
        <p className="mb-2"><strong>Essential Care Concierge — $1,000 / 3 hari (siang hari) ✓ Paling sering dipilih</strong></p>
        <p className="mb-1">13 layanan concierge — diperlukan untuk semua konsultasi spesialis dan kondisi medis:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>3 hari penuh pendampingan perawat terdaftar ISPN di lokasi (siang hari)</li>
          <li>Penjemputan &amp; pengantaran bandara</li>
          <li>Bantuan koordinasi hotel</li>
          <li>Interpretasi medis Inggris–Tiongkok di semua janji temu</li>
          <li>Penerjemahan dan ringkasan laporan medis</li>
          <li>Penjadwalan janji temu dokter</li>
          <li>Pengambilan &amp; pengantaran obat</li>
          <li>Pencocokan rumah sakit &amp; spesialis</li>
          <li>Transportasi lokal, pembayaran, dan bimbingan di lapangan</li>
          <li>Dukungan WhatsApp khusus selama Anda menginap</li>
          <li>Dukungan surat undangan visa</li>
          <li>Tindak lanjut jarak jauh 30 hari setelah perawatan</li>
          <li>Dukungan asuransi · pra-otorisasi</li>
        </ul>
        <p className="mb-2"><strong>Surgery &amp; Extended Care Concierge — $1,650 / 5 hari (siang hari)</strong></p>
        <p className="mb-1">16 layanan concierge — diperlukan untuk pembedahan, prosedur rawat inap, dan rencana pengobatan yang diperpanjang. Mencakup semua layanan Essential Care ditambah dukungan khusus pembedahan:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>5 hari penuh pendampingan perawat di lokasi (siang hari) — pra-op, hari pembedahan &amp; pasca-op</li>
          <li>Penjemputan &amp; pengantaran bandara</li>
          <li>Koordinasi hotel &amp; penginapan jangka panjang</li>
          <li>Interpretasi medis Inggris–Tiongkok (termasuk hari pembedahan)</li>
          <li>Penerjemahan dokumen medis lengkap &amp; pengarahan bedah</li>
          <li>Janji temu dokter bedah &amp; koordinasi pra-pendaftaran</li>
          <li>Persiapan pra-pembedahan &amp; koordinasi pendaftaran</li>
          <li>Pengambilan &amp; pengantaran obat</li>
          <li>Pencocokan rumah sakit &amp; dokter bedah</li>
          <li>Kunjungan rawat inap selama di rumah sakit</li>
          <li>Transportasi lokal, bantuan pembayaran/tagihan, dan bimbingan di lapangan</li>
          <li>Dukungan WhatsApp khusus selama Anda menginap</li>
          <li>Dukungan surat undangan visa medis</li>
          <li>Komunikasi keluarga &amp; pembaruan perkembangan</li>
          <li>Tindak lanjut jarak jauh 60 hari setelah perawatan</li>
          <li>Asuransi · pra-otorisasi &amp; koordinasi deposit bedah</li>
        </ul>
        <p className="mb-2"><strong>Dukungan darurat di lokasi — tersedia 24/7 dengan biaya tambahan</strong></p>
        <p className="mb-4">
          <strong>$300 panggilan darurat (tersedia 24/7, mencakup 4 jam pertama), kemudian $100/jam.</strong>{' '}
          Dukungan darurat mencakup situasi setelah jam kerja, akhir pekan, atau perawatan akut yang membutuhkan
          pendampingan perawat di lokasi di luar jadwal concierge yang direncanakan. Dalam keadaan darurat medis yang mengancam jiwa,
          hubungi 120 (nomor ambulans nasional Tiongkok) terlebih dahulu.
        </p>
        <p>
          <strong>Apa yang TIDAK termasuk</strong> (ditagih terpisah sesuai tarif lokal): Biaya pengobatan medis yang dibayar langsung ke rumah sakit/klinik (konsultasi dokter, tes, obat-obatan, prosedur, dan paket pemeriksaan kesehatan mulai dari ~$700), akomodasi, penerbangan internasional, interpretasi dalam bahasa selain Inggris, dan upgrade kendaraan untuk rombongan yang lebih besar. ShanghaiMed tidak mengenakan komisi rumah sakit.
        </p>
      </>
    ),
  },
  {
    q: 'Dapatkah saya menggabungkan pengobatan medis dengan wisata di Shanghai?',
    a: (
      <>
        <p className="mb-4">
          <strong>Tentu saja — inilah filosofi inti ShanghaiMed.</strong> Shanghai adalah kota paling internasional di Tiongkok dengan:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>The Bund</strong> — kawasan pejalan kaki tepi sungai yang ikonik</li>
          <li><strong>Yu Garden</strong> — taman klasik Tiongkok berusia 400 tahun</li>
          <li><strong>Shanghai Tower</strong> — gedung tertinggi kedua di dunia (632m)</li>
          <li><strong>Shanghai Disneyland</strong> — istana Disney terbesar di dunia</li>
          <li><strong>French Concession</strong> — jalan-jalan dengan deretan pohon, kafe, dan butik</li>
        </ul>
        <p>
          Banyak pasien menjadwalkan <strong>janji temu medis pada Hari 1-2</strong>, kemudian menghabiskan hari-hari tersisa menjelajahi
          kota. ShanghaiMed membantu Anda mengintegrasikan janji temu medis ke dalam rencana perjalanan sehingga Anda tidak
          membuang waktu liburan.
        </p>
      </>
    ),
  },
  {
    q: 'Prosedur medis apa yang paling populer untuk wisatawan medis di Shanghai?',
    a: (
      <>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Prosedur</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Penghematan</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Rumah Sakit Utama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Bedah ortopedi', 'Penggantian lutut/pinggul, bedah tulang belakang', '80%', "Sixth People's / Huashan"],
                ['Bedah plastik', 'Rinoplasti, rekonstruksi wajah', '70-80%', "Ninth People's Hospital"],
                ['Perawatan gigi', 'Implan, mahkota, ortodontik', '70-80%', "Ninth People's Hospital"],
                ['TCM', 'Akupunktur, terapi herbal, Tuina', '75-80%', 'Longhua Hospital'],
                ['Pengobatan kanker', 'Kemoterapi, CAR-T, imunoterapi', '60-80%', 'Ruijin / Huashan'],
                ['Bedah jantung', 'Bypass, penggantian katup', '80%', 'Zhongshan Hospital'],
                ['Perawatan kesuburan', 'IVF, ICSI', '75%', 'Renji / IPMCH'],
                ['Skrining kesehatan', 'Pemeriksaan eksekutif sehari penuh', '88%', 'Huadong Hospital'],
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
    q: 'Dapatkah saya menggunakan asuransi kesehatan internasional saya?',
    a: (
      <>
        <p className="mb-4">
          Ya. Rumah sakit mitra ShanghaiMed memiliki <strong>perjanjian penyelesaian langsung</strong> dengan perusahaan asuransi
          internasional utama. Cakupan berkisar dari 8 hingga 24 perusahaan asuransi per rumah sakit:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Huashan Hospital — 24 mitra asuransi</li>
          <li>Shanghai Children&apos;s Medical Center — 23 mitra asuransi</li>
          <li>Ruijin Hospital — 21 mitra asuransi</li>
          <li>Renji Hospital — 20 mitra asuransi</li>
        </ul>
        <p>
          Perusahaan asuransi yang diterima mencakup <strong>MSH, Bupa, Cigna, Aetna, AXA, Allianz, AIA, International SOS,</strong> dan banyak lagi.
          ShanghaiMed menyediakan dukungan asuransi termasuk pengecekan manfaat polis dan surat pra-otorisasi. Di mana penyelesaian
          langsung tersedia, kami berkoordinasi dengan rumah sakit atas nama Anda; selain itu pasien membayar rumah sakit secara langsung
          dan mengajukan klaim penggantian dengan dukungan dokumentasi kami.
        </p>
      </>
    ),
  },
  {
    q: 'Apa yang terjadi setelah pengobatan medis saya di Shanghai?',
    a: (
      <>
        <p className="mb-4">ShanghaiMed menyediakan <strong>tindak lanjut pasca-pengobatan yang komprehensif</strong>:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Pemeriksaan video jarak jauh</strong> dengan dokter yang merawat Anda</li>
          <li><strong>Rekam medis yang diterjemahkan</strong> — ringkasan keluar lengkap, hasil tes, dan daftar obat dalam bahasa Inggris</li>
          <li><strong>Panduan pengobatan</strong> — instruksi dosis, efek samping, dan peringatan interaksi</li>
          <li><strong>Perencanaan pemulihan</strong> — garis waktu personal dan rekomendasi aktivitas</li>
          <li><strong>Koordinasi di negara asal</strong> — kami membagikan rekam medis Anda kepada dokter perawatan primer Anda (dengan persetujuan)</li>
          <li><strong>Dukungan berkelanjutan</strong> — tim kami tetap tersedia untuk pertanyaan setelah Anda pulang ke rumah</li>
        </ul>
        <p>Tindak lanjut berlangsung selama <strong>30 hari</strong> setelah pengobatan Anda (60 hari untuk paket pembedahan).</p>
      </>
    ),
  },
  {
    q: 'Apakah konsultasi awal benar-benar gratis? Apa saja yang dicakupnya?',
    a: (
      <>
        <p className="mb-4">
          <strong>Ya.</strong> Konsultasi awal dengan Sara melalui WhatsApp benar-benar gratis dan tidak membawa
          kewajiban apa pun. Dalam panggilan tersebut, kami menilai kebutuhan medis Anda, merekomendasikan rumah sakit dan spesialis yang sesuai,
          memberikan estimasi anggaran yang realistis untuk pengobatan, dan menjelaskan cara kerja asuransi.
        </p>
        <p>
          Ini adalah percakapan tahap keputusan; layanan di lokasi (pendampingan perawat, pemesanan janji temu,
          interpretasi lisan) dimulai setelah Anda memesan pendamping per jam atau paket concierge.
        </p>
      </>
    ),
  },
  {
    q: 'Dapatkah saya memesan hanya pendamping rumah sakit di lokasi tanpa paket concierge lengkap?',
    a: (
      <>
        <p className="mb-4">
          <strong>Ya.</strong> Pendamping rumah sakit di lokasi tersedia sebagai layanan mandiri dengan tarif <strong>$50/jam</strong>,
          dipesan dan dibayar per jam. Layanan ini juga tersedia sebagai tambahan untuk paket concierge mana pun untuk jam tambahan
          atau janji temu tambahan. Ini diperuntukkan bagi pasien yang sudah memesan janji temu dokter sendiri dan hanya
          membutuhkan pendamping medis Inggris–Tiongkok di lokasi untuk antrean, pembayaran, pengambilan obat, dan pertanyaan
          mendasar di lokasi.
        </p>
        <p className="mb-4">
          Interpretasi adalah <strong>Inggris–Tiongkok</strong>;
          bahasa lain diatur atas permintaan dengan biaya tambahan, yang dikutip selama konsultasi.
        </p>
        <p>
          Pendamping per jam <strong>TIDAK</strong> termasuk penjadwalan janji temu, pencocokan dokter, penjemputan bandara,
          penerjemahan laporan, dukungan visa, pra-otorisasi asuransi, atau tindak lanjut pasca-kunjungan — hal-hal tersebut dicakup oleh
          paket concierge ($500/$1,000/$1,650).
        </p>
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
  const isAr = language === 'ar'
  const isMs = language === 'ms'
  const isId = language === 'id'
  const faqs: FaqItem[] = isJa ? jaFaqs : isAr ? arFaqs : isMs ? msFaqs : isId ? idFaqs : isRu ? ruFaqs : isMn ? mnFaqs : enFaqs

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
    : (isRu || isMn || isAr || isMs || isId)
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
