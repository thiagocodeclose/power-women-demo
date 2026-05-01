// @ts-nocheck
import type { Metadata } from 'next';

import { KorivaLivePreview } from '@/components/KorivaLivePreview';
export const metadata: Metadata = {
  title: "POWER Women's Gym — Strength & Empowerment Training | Brooklyn, NY",
  description:
    "Brooklyn's premier women's strength gym. Train strong, build confidence, and join a community of women who lift each other up — literally.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getKorivaConfig();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body>{children}<KorivaLivePreview /></body>
    </html>
  );
}
