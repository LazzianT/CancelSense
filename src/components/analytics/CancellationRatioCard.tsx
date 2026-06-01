import { AnalyticsCard } from './AnalyticsCard';
import { motion } from 'framer-motion';
import type { CancellationRatioData } from '../../types/analytics';

type CancellationRatioCardProps = {
  data: CancellationRatioData;
};

export function CancellationRatioCard({ data }: CancellationRatioCardProps) {
  const total = data.canceled + data.notCanceled;
  const canceledPercent = Math.round((data.canceled / total) * 100);
  const notCanceledPercent = 100 - canceledPercent;

  return (
    <AnalyticsCard eyebrow="Intelijen Data" title="Rasio Pembatalan Booking">
      <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div
          aria-label={`${canceledPercent}% dibatalkan dan ${notCanceledPercent}% tidak dibatalkan`}
          className="relative mx-auto h-44 w-44 rounded-full shadow-[12px_12px_24px_#cbd5e1,-12px_-12px_24px_#ffffff] p-3 flex items-center justify-center bg-[#F1F5F9]"
          role="img"
        >
          <motion.div
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            className="h-full w-full rounded-full transition-all duration-1000 ease-out"
            initial={{ opacity: 0, rotate: -8, scale: 0.96 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              background: `conic-gradient(#f97316 0 ${canceledPercent}%, #7dd3fc ${canceledPercent}% 100%)`,
            }}
          />
          <div className="absolute inset-8 rounded-full bg-[#F1F5F9] shadow-[inset_8px_8px_16px_#cbd5e1,inset_-8px_-8px_16px_#ffffff] flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-slate-800">{canceledPercent}%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
              Dibatalkan
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <RatioLegendItem label="Dibatalkan" tone="brand" value={`${canceledPercent}%`} />
          <RatioLegendItem label="Tidak Dibatalkan" tone="neutral" value={`${notCanceledPercent}%`} />
          <div className="rounded-2xl bg-[#F1F5F9] shadow-[inset_4px_4px_8px_#cbd5e1,inset_-4px_-4px_8px_#ffffff] p-4">
            <p className="text-xs leading-relaxed text-slate-500 font-medium italic">
              Rasio contoh berdasarkan konteks masalah pembatalan booking hotel.
            </p>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
}

type RatioLegendItemProps = {
  label: string;
  tone: 'brand' | 'neutral';
  value: string;
};

function RatioLegendItem({ label, tone, value }: RatioLegendItemProps) {
  const dotClass = tone === 'brand' ? 'bg-orange-400' : 'bg-sky-200';

  return (
    <motion.div
      className="flex cursor-default items-center justify-between gap-4 rounded-xl bg-[#F1F5F9] px-4 py-3 shadow-[6px_6px_12px_#cbd5e1,-6px_-6px_12px_#ffffff]"
      transition={{ duration: 0.18 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full shadow-sm ${dotClass}`} />
        <span className="text-sm font-bold text-slate-500">{label}</span>
      </div>
      <span className="text-sm font-black text-slate-800">{value}</span>
    </motion.div>
  );
}
