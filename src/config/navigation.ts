import { BarChart3, Gauge, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const navigationItems: NavigationItem[] = [
  {
    href: '#dashboard',
    icon: Gauge,
    label: 'Dasbor',
  },
  {
    href: '#prediction',
    icon: Sparkles,
    label: 'Prediksi',
  },
  {
    href: '#analytics',
    icon: BarChart3,
    label: 'Analitik',
  },
];
