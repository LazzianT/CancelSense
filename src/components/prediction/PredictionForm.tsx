import { useState } from 'react';
import type { FormEvent, PropsWithChildren } from 'react';
import { ArrowRight, BedDouble, CalendarClock, CreditCard, Sparkles, UserRoundCog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { FormField } from '../forms/FormField';
import { SelectInput } from '../forms/SelectInput';
import { TextInput } from '../forms/TextInput';
import type { PredictionFormValues, SelectOption } from '../../types/prediction';

export const defaultPredictionValues: PredictionFormValues = {
  lead_time: 45,
  deposit_type: 'No Deposit',
  market_segment: 'Online TA',
  customer_type: 'Transient',
  previous_cancellations: 0,
  booking_changes: 0,
  total_of_special_requests: 1,
  adr: 2100000,
  stays_in_weekend_nights: 1,
  stays_in_week_nights: 2,
};

const depositTypeOptions: SelectOption[] = [
  { label: 'No Deposit', value: 'No Deposit' },
  { label: 'Non Refund', value: 'Non Refund' },
  { label: 'Refundable', value: 'Refundable' },
];

const marketSegmentOptions: SelectOption[] = [
  { label: 'Online TA', value: 'Online TA' },
  { label: 'Offline TA/TO', value: 'Offline TA/TO' },
  { label: 'Direct', value: 'Direct' },
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Groups', value: 'Groups' },
  { label: 'Complementary', value: 'Complementary' },
  { label: 'Aviation', value: 'Aviation' },
];

const customerTypeOptions: SelectOption[] = [
  { label: 'Transient', value: 'Transient' },
  { label: 'Transient-Party', value: 'Transient-Party' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Group', value: 'Group' },
];

type PredictionFormProps = {
  error?: string | null;
  isLoading?: boolean;
  onSubmit: (values: PredictionFormValues) => void | Promise<void>;
};

type NumericFieldName =
  | 'lead_time'
  | 'previous_cancellations'
  | 'booking_changes'
  | 'total_of_special_requests'
  | 'adr'
  | 'stays_in_weekend_nights'
  | 'stays_in_week_nights';

export function PredictionForm({ error, isLoading = false, onSubmit }: PredictionFormProps) {
  const [values, setValues] = useState<PredictionFormValues>(defaultPredictionValues);

  function updateNumericValue(field: NumericFieldName, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value === '' ? 0 : Number(value),
    }));
  }

  function updateTextValue(field: 'deposit_type' | 'market_segment' | 'customer_type', value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSubmit(values);
  }

  return (
    <form className="mt-8 space-y-7" onSubmit={handleSubmit}>
      <div className="grid gap-5 2xl:grid-cols-2">
        <FormSection
          icon={CalendarClock}
          subtitle="Data awal reservasi sebelum tamu datang."
          title="Informasi Pemesanan"
        >
          <FormField
            description="Jumlah hari dari tanggal reservasi dibuat sampai tanggal check-in. Semakin panjang jaraknya, pola risiko biasanya bisa berbeda."
            htmlFor="lead_time"
            label="Lead Time"
          >
            <TextInput
              id="lead_time"
              min={0}
              name="lead_time"
              onChange={(event) => updateNumericValue('lead_time', event.target.value)}
              type="number"
              value={values.lead_time}
            />
          </FormField>

          <FormField
            description="Jenis kebijakan pembayaran awal untuk booking, misalnya tanpa deposit, non-refundable, atau refundable."
            htmlFor="deposit_type"
            label="Tipe Deposit"
          >
            <SelectInput
              id="deposit_type"
              name="deposit_type"
              onChange={(event) => updateTextValue('deposit_type', event.target.value)}
              options={depositTypeOptions}
              value={values.deposit_type}
            />
          </FormField>
        </FormSection>

        <FormSection
          icon={UserRoundCog}
          subtitle="Segmentasi pasar dan jenis pelanggan."
          title="Profil Pelanggan"
        >
          <FormField
            description="Sumber atau kanal asal booking, seperti online travel agent, direct booking, corporate, atau grup."
            htmlFor="market_segment"
            label="Segmen Pasar"
          >
            <SelectInput
              id="market_segment"
              name="market_segment"
              onChange={(event) => updateTextValue('market_segment', event.target.value)}
              options={marketSegmentOptions}
              value={values.market_segment}
            />
          </FormField>

          <FormField
            description="Kategori pelanggan berdasarkan pola reservasi, misalnya transient, contract, group, atau transient-party."
            htmlFor="customer_type"
            label="Tipe Pelanggan"
          >
            <SelectInput
              id="customer_type"
              name="customer_type"
              onChange={(event) => updateTextValue('customer_type', event.target.value)}
              options={customerTypeOptions}
              value={values.customer_type}
            />
          </FormField>
        </FormSection>

        <FormSection
          icon={CreditCard}
          subtitle="Riwayat perubahan dan sinyal perilaku reservasi."
          title="Perilaku Reservasi"
        >
          <FormField
            description="Jumlah booking terdahulu dari pelanggan yang pernah dibatalkan."
            htmlFor="previous_cancellations"
            label="Pembatalan Sebelumnya"
          >
            <TextInput
              id="previous_cancellations"
              min={0}
              name="previous_cancellations"
              onChange={(event) => updateNumericValue('previous_cancellations', event.target.value)}
              type="number"
              value={values.previous_cancellations}
            />
          </FormField>

          <FormField
            description="Jumlah perubahan yang terjadi pada reservasi, seperti tanggal, kamar, atau detail booking lain."
            htmlFor="booking_changes"
            label="Perubahan Booking"
          >
            <TextInput
              id="booking_changes"
              min={0}
              name="booking_changes"
              onChange={(event) => updateNumericValue('booking_changes', event.target.value)}
              type="number"
              value={values.booking_changes}
            />
          </FormField>

          <FormField
            className="sm:col-span-2"
            description="Jumlah permintaan khusus dari tamu, misalnya preferensi kamar, parkir, atau kebutuhan tambahan."
            htmlFor="total_of_special_requests"
            label="Permintaan Khusus"
          >
            <TextInput
              id="total_of_special_requests"
              min={0}
              name="total_of_special_requests"
              onChange={(event) => updateNumericValue('total_of_special_requests', event.target.value)}
              type="number"
              value={values.total_of_special_requests}
            />
          </FormField>
        </FormSection>

        <FormSection
          icon={BedDouble}
          subtitle="Nilai transaksi dan durasi menginap."
          title="Harga & Durasi Menginap"
        >
          <FormField
            description="Rata-rata tarif harian dalam Rupiah. Backend otomatis mengonversi ke USD dengan kurs Rp17.500 per USD."
            htmlFor="adr"
            label="ADR (Rupiah)"
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-orange-500">
                Rp
              </span>
              <TextInput
                className="pl-12"
                id="adr"
                min={0}
                name="adr"
                onChange={(event) => updateNumericValue('adr', event.target.value)}
                step="1000"
                type="number"
                value={values.adr}
              />
            </div>
          </FormField>

          <FormField
            description="Jumlah malam menginap pada akhir pekan, umumnya Sabtu atau Minggu."
            htmlFor="stays_in_weekend_nights"
            label="Malam Akhir Pekan"
          >
            <TextInput
              id="stays_in_weekend_nights"
              min={0}
              name="stays_in_weekend_nights"
              onChange={(event) => updateNumericValue('stays_in_weekend_nights', event.target.value)}
              type="number"
              value={values.stays_in_weekend_nights}
            />
          </FormField>

          <FormField
            className="sm:col-span-2"
            description="Jumlah malam menginap pada hari kerja selain akhir pekan."
            htmlFor="stays_in_week_nights"
            label="Malam Hari Kerja"
          >
            <TextInput
              id="stays_in_week_nights"
              min={0}
              name="stays_in_week_nights"
              onChange={(event) => updateNumericValue('stays_in_week_nights', event.target.value)}
              type="number"
              value={values.stays_in_week_nights}
            />
          </FormField>
        </FormSection>
      </div>

      <motion.div
        className="rounded-[1.75rem] bg-[#F1F5F9] p-4 shadow-neo-inset sm:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F9] text-orange-500 shadow-neo-soft">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">Siap hitung risiko?</p>
              <p className={error ? 'mt-1 text-sm font-bold text-rose-500' : 'mt-1 text-sm font-semibold text-slate-500'}>
                {error ?? 'Klik tombol utama untuk melihat hasil prediksi di panel sebelah kanan.'}
              </p>
            </div>
          </div>
          <motion.button
            className="group relative flex h-14 min-w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-sky-300 px-7 text-sm font-black uppercase tracking-[0.12em] text-slate-950 shadow-[0_18px_42px_rgba(249,115,22,0.24),0_10px_28px_rgba(56,189,248,0.16)] outline-none transition focus-visible:ring-4 focus-visible:ring-orange-300/50 disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-72 lg:min-w-80"
            disabled={isLoading}
            type="submit"
            whileHover={isLoading ? undefined : { y: -3, scale: 1.01 }}
            whileTap={isLoading ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-white/30 transition duration-700 group-hover:left-[120%]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="relative"
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: 6 }}
                key={isLoading ? 'loading' : 'idle'}
                transition={{ duration: 0.18 }}
              >
                {isLoading ? 'Memproses...' : 'Prediksi Risiko'}
              </motion.span>
            </AnimatePresence>
            <motion.span
              animate={isLoading ? { opacity: [0.45, 1, 0.45] } : { opacity: 1 }}
              className="relative"
              transition={{ duration: 1.1, repeat: isLoading ? Infinity : 0 }}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
}

type FormSectionProps = PropsWithChildren<{
  icon: LucideIcon;
  subtitle: string;
  title: string;
}>;

function FormSection({ children, icon: Icon, subtitle, title }: FormSectionProps) {
  return (
    <motion.section
      className="rounded-[1.75rem] bg-[#F1F5F9] p-5 shadow-neo-soft"
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1F5F9] text-orange-500 shadow-neo-inset">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-black tracking-tight text-slate-800">{title}</h4>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </motion.section>
  );
}
