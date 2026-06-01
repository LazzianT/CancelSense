import type { ComponentPropsWithoutRef } from 'react';

type GlassPanelProps = ComponentPropsWithoutRef<'section'>;

export function GlassPanel({ children, className = '', ...props }: GlassPanelProps) {
  return (
    <section
      className={`rounded-[2rem] bg-[#F1F5F9] shadow-neo ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
