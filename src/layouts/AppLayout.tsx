import type { PropsWithChildren } from 'react';
import { Header } from '../components/layout/Header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F1F5F9] text-slate-700">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_10%_8%,_rgba(251,146,60,0.18),_transparent_28%),radial-gradient(circle_at_88%_12%,_rgba(56,189,248,0.20),_transparent_30%),linear-gradient(135deg,_#ffffff_0%,_#f1f5f9_52%,_#eaf2fb_100%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,_transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,_transparent_1px)] bg-[size:72px_72px] opacity-35" />
      <div className="relative min-h-screen p-4 sm:p-5 lg:p-6">
        <main className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1500px] flex-col rounded-[2rem] bg-[#F1F5F9] shadow-neo">
          <Header />
          <div className="flex-1 px-4 pb-5 pt-4 sm:px-6 lg:px-8 lg:pb-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
