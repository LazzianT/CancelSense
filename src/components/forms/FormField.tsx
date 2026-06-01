import type { PropsWithChildren } from 'react';

type FormFieldProps = PropsWithChildren<{
  className?: string;
  description?: string;
  htmlFor: string;
  label: string;
}>;

export function FormField({ children, className = '', description, htmlFor, label }: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div>
        <label className="text-sm font-black text-slate-700" htmlFor={htmlFor}>
          {label}
        </label>
        {description ? <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
