import { AnalyticsCard } from './AnalyticsCard';
import { motion } from 'framer-motion';
import type { FeatureImportanceData } from '../../types/analytics';

type FeatureImportanceCardProps = {
  data: FeatureImportanceData[];
};

export function FeatureImportanceCard({ data }: FeatureImportanceCardProps) {
  return (
    <AnalyticsCard eyebrow="Pengaruh Fitur" title="Sinyal penting model">
      <div className="space-y-7">
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            key={item.feature}
            transition={{ duration: 0.28, delay: index * 0.04, ease: 'easeOut' }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F1F5F9] shadow-[3px_3px_6px_#cbd5e1,-3px_-3px_6px_#ffffff] text-[10px] font-black text-orange-500">
                  {index + 1}
                </span>
                <p className="truncate text-sm font-bold text-slate-600">{item.feature}</p>
              </div>
              <p className="text-sm font-black text-slate-700">{item.importance}%</p>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-[#F1F5F9] shadow-[inset_4px_4px_8px_#cbd5e1,inset_-4px_-4px_8px_#ffffff] p-1">
              <motion.div
                animate={{ width: `${item.importance}%` }}
                className="h-full rounded-full bg-gradient-to-r from-sky-300 to-orange-400 shadow-[2px_0_6px_rgba(251,146,60,0.3)] transition-all duration-1000 ease-out"
                initial={{ width: 0 }}
                transition={{ duration: 0.65, delay: index * 0.05, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
