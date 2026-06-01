import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { PredictionResult, RiskLevel } from '../../types/prediction';

type RiskVariant = {
  accent: string;
  background: string;
  bar: string;
  icon: LucideIcon;
  label: string;
  text: string;
};

const riskVariants: Record<RiskLevel, RiskVariant> = {
  'High Risk': {
    accent: 'bg-[#F1F5F9] text-orange-600 shadow-neo-soft',
    background: 'from-orange-100 via-white to-sky-100',
    bar: 'bg-orange-400',
    icon: ShieldAlert,
    label: 'RISIKO PEMBATALAN TINGGI',
    text: 'text-orange-600',
  },
  'Medium Risk': {
    accent: 'bg-[#F1F5F9] text-amber-600 shadow-neo-soft',
    background: 'from-amber-100 via-white to-sky-100',
    bar: 'bg-amber-400',
    icon: AlertTriangle,
    label: 'RISIKO PEMBATALAN SEDANG',
    text: 'text-amber-600',
  },
  'Low Risk': {
    accent: 'bg-[#F1F5F9] text-sky-600 shadow-neo-soft',
    background: 'from-sky-100 via-white to-orange-50',
    bar: 'bg-sky-400',
    icon: CheckCircle2,
    label: 'RISIKO PEMBATALAN RENDAH',
    text: 'text-sky-600',
  },
};

const riskLabel: Record<RiskLevel, string> = {
  'High Risk': 'Risiko Tinggi',
  'Medium Risk': 'Risiko Sedang',
  'Low Risk': 'Risiko Rendah',
};

type PredictionResultCardProps = {
  compact?: boolean;
  isHighlighted?: boolean;
  isLoading?: boolean;
  result: PredictionResult;
};

export function PredictionResultCard({
  compact = false,
  isHighlighted = false,
  isLoading = false,
  result,
}: PredictionResultCardProps) {
  const variant = riskVariants[result.riskLevel];
  const Icon = variant.icon;
  const probabilityPercent = Math.round(result.probability * 100);

  if (compact) {
    return (
      <motion.article
        className="rounded-3xl bg-[#F1F5F9] p-4 shadow-neo-soft"
        transition={{ duration: 0.2, ease: 'easeOut' }}
        whileHover={{ y: -3, scale: 1.01 }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`text-sm font-semibold ${variant.text}`}>{riskLabel[result.riskLevel]}</p>
            <p className="mt-1 text-2xl font-black text-slate-800">{probabilityPercent}%</p>
          </div>
          <div className={`rounded-2xl p-2 ${variant.accent}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F1F5F9] p-0.5 shadow-neo-inset">
          <motion.div
            animate={{ width: `${probabilityPercent}%` }}
            className={`h-full rounded-full ${variant.bar}`}
            initial={{ width: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      animate={{
        opacity: 1,
        scale: isHighlighted ? [1, 1.015, 1] : 1,
        y: 0,
      }}
      className={`relative overflow-hidden rounded-[2rem] bg-[#F1F5F9] shadow-neo ${
        isHighlighted ? 'ring-4 ring-orange-300/35' : ''
      }`}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#F1F5F9]/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 rounded-full bg-[#F1F5F9] px-4 py-2 text-sm font-black text-sky-600 shadow-neo-soft">
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
                className="h-2.5 w-2.5 rounded-full bg-orange-400"
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
              Memperbarui profil risiko
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className={`bg-gradient-to-br ${variant.background} p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Hasil Prediksi</p>
            <h3 className={`mt-3 text-2xl font-black tracking-tight ${variant.text}`}>
              {variant.label}
            </h3>
          </div>
          <div className={`rounded-2xl p-3 ${variant.accent}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-500">Probabilitas Pembatalan</p>
              <p className="mt-1 text-5xl font-black tracking-tight text-slate-800">
                {probabilityPercent}%
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${variant.accent}`}>
              {riskLabel[result.riskLevel]}
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#F1F5F9] p-1 shadow-neo-inset">
            <motion.div
              animate={{ width: `${probabilityPercent}%` }}
              className={`h-full rounded-full ${variant.bar}`}
              initial={{ width: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-[#F1F5F9] p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Status</p>
          <p className="mt-2 text-base font-black text-slate-800">{result.predictionStatus}</p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Rekomendasi
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{result.recommendation}</p>
        </div>
      </div>
    </motion.article>
  );
}
