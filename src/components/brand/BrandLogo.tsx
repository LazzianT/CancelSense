import { motion } from 'framer-motion';

type BrandLogoProps = {
  size?: 'sm' | 'md';
};

const sizeClass = {
  md: 'h-14 w-14 rounded-[1.25rem]',
  sm: 'h-11 w-11 rounded-2xl',
};

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  return (
    <motion.div
      aria-label="Logo CancelSense"
      className={`relative flex shrink-0 items-center justify-center bg-[#F1F5F9] shadow-neo-soft ${sizeClass[size]}`}
      whileHover={{ rotate: -2, scale: 1.04 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="absolute inset-2 rounded-[1rem] bg-gradient-to-br from-orange-400 via-orange-300 to-sky-300 shadow-neo-inset" />
      <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full bg-[#F1F5F9] shadow-neo-soft">
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path
            d="M7 20.5c3.2-7.7 8.7-9.9 18-9.1"
            stroke="#0284C7"
            strokeLinecap="round"
            strokeWidth="3.2"
          />
          <path
            d="M8 21c3.8.9 8.2-.1 12.7-3.2"
            stroke="#F97316"
            strokeLinecap="round"
            strokeWidth="3.2"
          />
          <circle cx="23.5" cy="10.8" fill="#0F172A" r="2.4" />
        </svg>
      </div>
    </motion.div>
  );
}
