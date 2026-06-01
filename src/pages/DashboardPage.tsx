import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../components/ui/GlassPanel';
import { PredictionForm } from '../components/prediction/PredictionForm';
import { PredictionResultCard } from '../components/prediction/PredictionResultCard';
import { AnalyticsSection } from '../components/analytics/AnalyticsSection';
import { BrandLogo } from '../components/brand/BrandLogo';
import { requestPrediction } from '../services/predictionService';
import type { PredictionFormValues, PredictionResult } from '../types/prediction';

const initialPredictionResult: PredictionResult = {
  predictionStatus: 'Dibatalkan',
  probability: 0.87,
  recommendation: 'Lakukan konfirmasi ulang atau tawarkan strategi retensi untuk menjaga booking.',
  riskLevel: 'High Risk',
};

const riskStatePreviews: PredictionResult[] = [
  initialPredictionResult,
  {
    predictionStatus: 'Perlu Dipantau',
    probability: 0.56,
    recommendation: 'Pantau perubahan booking dan kondisi reservasi sebelum tanggal kedatangan.',
    riskLevel: 'Medium Risk',
  },
  {
    predictionStatus: 'Tidak Dibatalkan',
    probability: 0.18,
    recommendation: 'Lanjutkan proses konfirmasi standar.',
    riskLevel: 'Low Risk',
  },
];

export function DashboardPage() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult>(initialPredictionResult);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [resultAnimationKey, setResultAnimationKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handlePredictionSubmit(values: PredictionFormValues) {
    setIsPredicting(true);
    setPredictionError(null);

    try {
      const result = await requestPrediction(values);
      setPredictionResult(result);
      setResultAnimationKey((currentKey) => currentKey + 1);
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    } catch (error) {
      setPredictionError(
        error instanceof Error
              ? error.message
              : 'Prediksi belum bisa diproses. Silakan coba lagi.',
      );
    } finally {
      setIsPredicting(false);
    }
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-7xl scroll-mt-28 flex-col gap-6"
      id="dashboard"
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <GlassPanel className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          className="absolute right-8 top-8 hidden h-28 w-28 rounded-[2rem] bg-[#F1F5F9] shadow-neo-inset lg:block"
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          animate={{ y: [0, 7, 0] }}
          className="absolute bottom-8 right-32 hidden h-16 w-16 rounded-3xl bg-gradient-to-br from-orange-300 to-sky-300 shadow-neo-soft lg:block"
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <BrandLogo />
              <div>
                <p className="text-xl font-black tracking-tight text-slate-800">CancelSense</p>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
                  XGBoost Cancellation Intelligence
                </p>
              </div>
            </div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">Prediksi Pembatalan. Lindungi Pendapatan.</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-800 sm:text-5xl">
              Dashboard machine learning untuk membaca risiko pembatalan booking hotel.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-500">
              CancelSense membantu tim hotel menilai risiko reservasi lebih cepat melalui pengalaman
              dashboard yang ringan, modern, dan ditenagai model XGBoost.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <HeroMetric label="Input Model" value="10" />
            <HeroMetric label="Kurs ADR" value="17,5K" />
            <HeroMetric label="Model" value="XGB" />
          </div>
        </div>
      </GlassPanel>

      <motion.div
        className="grid gap-7 xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.65fr)]"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <GlassPanel className="scroll-mt-28 p-6 lg:p-8" id="prediction">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Prediksi</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-800">Form Risiko Booking</h3>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Masukkan atribut booking untuk menghasilkan estimasi risiko pembatalan dari model
            prediksi CancelSense.
          </p>
          <PredictionForm
            error={predictionError}
            isLoading={isPredicting}
            onSubmit={handlePredictionSubmit}
          />
        </GlassPanel>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <div
            className="scroll-mt-28"
            id="result"
            key={resultAnimationKey}
            ref={resultRef}
          >
            <PredictionResultCard
              isHighlighted={resultAnimationKey > 0}
              isLoading={isPredicting}
              result={predictionResult}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <GlassPanel className="scroll-mt-28 p-6 lg:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Status Risiko</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-800">Sistem Visual Risiko</h3>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-slate-500">
            Tiga tingkat risiko dibuat terpisah agar pembacaan status lebih jelas dan tidak menumpuk
            dengan hasil prediksi utama.
          </p>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {riskStatePreviews.map((result) => (
            <PredictionResultCard compact key={result.riskLevel} result={result} />
          ))}
        </div>
        </GlassPanel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.12 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <GlassPanel className="p-6 lg:p-8">
          <AnalyticsSection />
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
}

type HeroMetricProps = {
  label: string;
  value: string;
};

function HeroMetric({ label, value }: HeroMetricProps) {
  return (
    <motion.div
      className="rounded-[1.5rem] bg-[#F1F5F9] p-5 shadow-neo-soft"
      transition={{ duration: 0.22, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-800">{value}</p>
    </motion.div>
  );
}
