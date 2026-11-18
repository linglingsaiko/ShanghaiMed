import { redirect } from 'next/navigation';

const LANG_FILE: Record<string, string> = {
  ja: 'index_ja.html',
  ar: 'index_ar.html',
  ru: 'index_ru.html',
  mn: 'index_mn.html',
  ms: 'index_ms.html',
  id: 'index_id.html',
};

export default function MedicalRecordsPage({ params }: { params: { lang: string } }) {
  const file = LANG_FILE[params.lang] || 'index_en.html';
  redirect(`/medical-records/${file}`);
}
