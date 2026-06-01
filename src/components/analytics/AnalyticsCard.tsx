import type { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

type AnalyticsCardProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
}>;

export function AnalyticsCard({ children, eyebrow, title }: AnalyticsCardProps) {
  return (
    <motion.article
      className="rounded-[2.5rem] border border-white/40 bg-[#F1F5F9] p-8 shadow-[12px_12px_24px_#cbd5e1,-12px_-12px_24px_#ffffff]"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="text-[11px] font-black uppercase tracking-[0.25em] text-sky-500/70">{eyebrow}</p>
      <h4 className="mt-2 text-2xl font-black text-slate-700 tracking-tighter">{title}</h4>
      <div className="mt-8">{children}</div>
    </motion.article>
  );
}
