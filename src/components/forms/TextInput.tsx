import type { InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = '', ...props }: TextInputProps) {
  return (
    <input
      className={`h-12 w-full rounded-2xl bg-[#F1F5F9] px-4 text-sm font-bold text-slate-700 shadow-neo-inset outline-none transition placeholder:text-slate-400 focus:text-sky-700 focus:ring-2 focus:ring-sky-300/50 ${className}`}
      {...props}
    />
  );
}
