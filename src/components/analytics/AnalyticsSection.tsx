import { CancellationRatioCard } from './CancellationRatioCard';
import { FeatureImportanceCard } from './FeatureImportanceCard';
import type { CancellationRatioData, FeatureImportanceData } from '../../types/analytics';

const mockCancellationRatio: CancellationRatioData = {
  canceled: 37,
  notCanceled: 63,
};

const mockFeatureImportance: FeatureImportanceData[] = [
  { feature: 'Lead Time', importance: 86 },
  { feature: 'Tipe Deposit', importance: 74 },
  { feature: 'Segmen Pasar', importance: 61 },
  { feature: 'Pembatalan Sebelumnya', importance: 49 },
  { feature: 'Permintaan Khusus', importance: 38 },
];

export function AnalyticsSection() {
  return (
    <section className="scroll-mt-28 space-y-10" id="analytics">
      <div className="space-y-4">
        <p className="inline-block rounded-xl bg-[#F1F5F9] px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500 shadow-[4px_4px_8px_#cbd5e1,-4px_-4px_8px_#ffffff]">
          Mesin Analitik
        </p>
        <h3 className="text-4xl font-black tracking-tighter text-slate-700">Ringkasan Insight</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 font-bold uppercase tracking-widest opacity-60">
          Visualisasi ringkas untuk memahami pola pembatalan dan sinyal fitur paling berpengaruh.
        </p>
      </div>

      <div className="grid gap-10 2xl:grid-cols-2">
        <CancellationRatioCard data={mockCancellationRatio} />
        <FeatureImportanceCard data={mockFeatureImportance} />
      </div>
    </section>
  );
}
