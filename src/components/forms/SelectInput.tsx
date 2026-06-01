import type { SelectHTMLAttributes } from 'react';
import type { SelectOption } from '../../types/prediction';

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
};

export function SelectInput({ className = '', options, ...props }: SelectInputProps) {
  return (
    <select
      className={`h-12 w-full rounded-2xl bg-[#F1F5F9] px-4 text-sm font-bold text-slate-700 shadow-neo-inset outline-none transition focus:text-sky-700 focus:ring-2 focus:ring-sky-300/50 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option className="bg-white text-slate-700" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
