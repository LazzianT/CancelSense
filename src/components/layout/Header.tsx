import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { navigationItems } from '../../config/navigation';

export function Header() {
  const currentDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <header className="px-4 py-5 sm:px-6 lg:px-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-5 rounded-[1.75rem] bg-[#F1F5F9] p-4 shadow-neo-soft xl:flex-row xl:items-center xl:justify-between"
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="flex min-w-0 items-center gap-3">
            <BrandLogo size="sm" />
            <div>
              <p className="text-xl font-black tracking-tight text-slate-800">CancelSense</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-sky-600">
                Prediksi XGBoost Machine Learning
              </p>
            </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex gap-2 overflow-x-auto" aria-label="Navigasi utama">
            {navigationItems.map(({ href, icon: Icon, label }, index) => (
              <motion.a
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-orange-300 ${
                  index === 0
                    ? 'bg-[#F1F5F9] text-sky-600 shadow-neo-inset'
                    : 'bg-[#F1F5F9] text-slate-500 shadow-neo-soft hover:text-orange-500'
                }`}
                href={href}
                key={label}
                onClick={(event) => handleNavClick(event, href)}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="flex w-fit items-center gap-2 rounded-2xl bg-[#F1F5F9] px-4 py-2.5 text-sm font-bold text-slate-500 shadow-neo-soft"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.18 }}
          >
            <CalendarDays className="h-4 w-4 text-orange-500" aria-hidden="true" />
            {currentDate}
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
